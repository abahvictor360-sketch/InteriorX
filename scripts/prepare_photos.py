"""Copy the client-supplied photos into public/images under semantic names, optimised for the web.

Usage: python3 scripts/prepare_photos.py <uploads_dir> <out_dir>
"""
import os
import sys

from PIL import Image, ImageFilter

SRC, OUT = sys.argv[1], sys.argv[2]
os.makedirs(OUT, exist_ok=True)

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
}

for src, (name, frac) in PHOTOS.items():
    im = Image.open(os.path.join(SRC, src)).convert("RGB")
    if frac:
        w, h = im.size
        im = im.crop((int(frac[0] * w), int(frac[1] * h), int(frac[2] * w), int(frac[3] * h)))
    # gentle 2x upscale so the photos stay crisp on large / retina screens
    im = im.resize((im.width * 2, im.height * 2), Image.LANCZOS)
    im = im.filter(ImageFilter.UnsharpMask(radius=1.6, percent=60, threshold=2))
    im.save(os.path.join(OUT, f"{name}.jpg"), quality=82, optimize=True, progressive=True)
    print(name, im.size)
