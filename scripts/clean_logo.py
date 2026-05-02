from pathlib import Path

from PIL import Image


def main() -> None:
    path = Path(r"c:\Users\j\Desktop\매장비서\public\logo.png")
    img = Image.open(path).convert("RGBA")
    pixels = img.load()
    width, height = img.size

    for y in range(height):
        for x in range(width):
            r, g, b, a = pixels[x, y]
            # Remove white or near-white matte from the canvas.
            if a == 0:
                continue
            if r >= 245 and g >= 245 and b >= 245:
                pixels[x, y] = (255, 255, 255, 0)

    bbox = img.getbbox()
    if bbox:
        img = img.crop(bbox)

    img.save(path)
    print(f"cleaned: {path}")


if __name__ == "__main__":
    main()
