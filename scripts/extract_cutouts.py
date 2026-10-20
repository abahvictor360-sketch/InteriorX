"""Cut the transparent PNG assets (floor plan, house, designer portrait) out of the design mockup.

Backgrounds are removed with the ISNet segmentation model (the same one rembg uses), run via onnxruntime.
Usage:
    curl -L -o isnet.onnx https://github.com/danielgatis/rembg/releases/download/v0.0.0/isnet-general-use.onnx
    python3 scripts/extract_cutouts.py <mockup.jpg> <isnet.onnx> <out_dir>
"""
import os
import sys

import numpy as np
import onnxruntime as ort
from PIL import Image, ImageDraw, ImageFilter

SRC, MODEL, OUT = sys.argv[1], sys.argv[2], sys.argv[3]
os.makedirs(OUT, exist_ok=True)
mockup = Image.open(SRC).convert("RGB")
session = ort.InferenceSession(MODEL, providers=["CPUExecutionProvider"])

# name: crop box in mockup pixels
CUTOUTS = {
    "floorplan": (318, 1608, 712, 1832),
    "house": (44, 2706, 690, 2816),
    "designer": (133, 3744, 292, 3937),
}


def alpha_mask(img: Image.Image) -> Image.Image:
    x = np.asarray(img.resize((1024, 1024), Image.LANCZOS), dtype=np.float32)
    x = x / max(x.max(), 1e-6) - 0.5
    x = x.transpose(2, 0, 1)[None]
    pred = session.run(None, {session.get_inputs()[0].name: x})[0][0, 0]
    pred = (pred - pred.min()) / (pred.max() - pred.min() + 1e-6)
    # harden the soft prediction so solid objects don't come out semi-transparent
    pred = np.clip((pred - 0.15) / 0.35, 0, 1)
    mask = Image.fromarray((pred * 255).astype(np.uint8)).resize(img.size, Image.LANCZOS)
    return fill_holes(mask).filter(ImageFilter.GaussianBlur(0.8))


def fill_holes(mask: Image.Image) -> Image.Image:
    """Make every region not connected to the image border opaque (e.g. glass walls, floors)."""
    binary = mask.point(lambda a: 255 if a > 60 else 0)
    padded = Image.new("L", (binary.width + 2, binary.height + 2), 0)
    padded.paste(binary, (1, 1))
    ImageDraw.floodfill(padded, (0, 0), 128)
    outside = padded.crop((1, 1, binary.width + 1, binary.height + 1)).point(lambda a: 255 if a == 128 else 0)
    inside = outside.point(lambda a: 255 - a)
    return Image.fromarray(np.maximum(np.asarray(mask), np.asarray(inside)))


for name, box in CUTOUTS.items():
    crop = mockup.crop(box)
    big = crop.resize((crop.width * 3, crop.height * 3), Image.LANCZOS)
    big = big.filter(ImageFilter.UnsharpMask(radius=2, percent=70, threshold=2))
    cut = big.convert("RGBA")
    cut.putalpha(alpha_mask(big))
    cut = cut.crop(cut.getchannel("A").point(lambda a: 255 if a > 20 else 0).getbbox())
    cut.save(os.path.join(OUT, f"{name}.png"), optimize=True)
    print(name, cut.size)
