"""Copy the client-supplied photos into public/images under semantic names, optimised for the web.

Photos are upscaled 4x with the EDSR super-resolution model, then resized to web size.
Usage:
    curl -L -o EDSR_x4.pb https://raw.githubusercontent.com/Saafke/EDSR_Tensorflow/master/models/EDSR_x4.pb
    python3 scripts/prepare_photos.py <uploads_dir> <out_dir> <EDSR_x4.pb> [name ...]
"""
import os
import sys

import cv2
import numpy as np
from PIL import Image, ImageFilter

SRC, OUT, MODEL = sys.argv[1], sys.argv[2], sys.argv[3]
ONLY = set(sys.argv[4:])
MAX_SIDE = 2000  # longest edge served to the browser
os.makedirs(OUT, exist_ok=True)

sr = cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(MODEL)
sr.setModel("edsr", 4)


def upscale(im: Image.Image) -> Image.Image:
    big = sr.upsample(cv2.cvtColor(np.asarray(im), cv2.COLOR_RGB2BGR))
    big = Image.fromarray(cv2.cvtColor(big, cv2.COLOR_BGR2RGB))
    big.thumbnail((MAX_SIDE, MAX_SIDE), Image.LANCZOS)
    return big.filter(ImageFilter.UnsharpMask(radius=1.2, percent=40, threshold=3))


# source file -> (output name, optional crop box as fractions l, t, r, b)
PHOTOS = {
    "e7504cc0-image.jpg": ("hero", None),
    "2d1c70f7-image.jpg": ("about", (0, 0, 1, 0.9)),  # trims the studio watermark
    "874fdded-image.jpg": ("service-residential", None),
    "80ae7108-image.jpg": ("service-commercial", None),
    "e39ab565-image.jpg": ("service-consultation", None),
    "3b4cd59a-image.jpg": ("service-outdoor", None),
    "ff6e210a-image.jpg": ("service-renovation", None),
    "a16ada6f-image.jpg": ("project-1", None),
    "ce41d43c-image.jpg": ("project-2", None),
    "6dde1cae-image.jpg": ("project-3", None),
    "72a1d7df-image.jpg": ("project-4", None),
    "5e0a5c45-image.jpg": ("project-5", None),
    "f3e63544-image.jpg": ("panorama", None),
    "c6d99394-image.jpg": ("cta", None),
    "5640888c-image.jpg": ("blog-1", None),
    "1ccbe2bc-image.jpg": ("blog-2", None),
    "1fb501c6-image.jpg": ("blog-3", None),
    "df05524f-image.jpg": ("designer", None),
}

for src, (name, frac) in PHOTOS.items():
    if ONLY and name not in ONLY:
        continue
    im = Image.open(os.path.join(SRC, src)).convert("RGB")
    if frac:
        w, h = im.size
        im = im.crop((int(frac[0] * w), int(frac[1] * h), int(frac[2] * w), int(frac[3] * h)))
    im = upscale(im)
    im.save(os.path.join(OUT, f"{name}.jpg"), quality=84, optimize=True, progressive=True)
    print(name, im.size)
