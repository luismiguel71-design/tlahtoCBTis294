import os
import math
from PIL import Image, ImageDraw, ImageFont
from pathlib import Path

icons_dir = Path(__file__).resolve().parents[2] / "apps" / "web" / "icons"
os.makedirs(icons_dir, exist_ok=True)

# Generate SVG
svg_content = '''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="100%" height="100%">
  <!-- White background -->
  <rect width="512" height="512" fill="#FFFFFF"/>
  <!-- Central solid black circle -->
  <circle cx="256" cy="256" r="200" fill="#000000"/>
  <!-- White outline microphone icon -->
  <g fill="none" stroke="#FFFFFF" stroke-width="18" stroke-linecap="round" stroke-linejoin="round">
    <!-- Mic capsule -->
    <rect x="216" y="146" width="80" height="150" rx="40" ry="40"/>
    <!-- Mic arc / stand holder -->
    <path d="M 170,246 A 86,86 0 0,0 342,246"/>
    <!-- Mic vertical stem -->
    <line x1="256" y1="332" x2="256" y2="376"/>
    <!-- Mic base horizontal line -->
    <line x1="210" y1="376" x2="302" y2="376"/>
  </g>
</svg>'''

with open(os.path.join(icons_dir, "icon.svg"), "w", encoding="utf-8") as f:
    f.write(svg_content)

def draw_vozzy_icon(size, circle_radius_ratio=0.78, background_color=(255,255,255), is_apple=False):
    # High resolution canvas for smooth anti-aliasing
    scale = 4
    canvas_size = size * scale
    img = Image.new("RGBA", (canvas_size, canvas_size), background_color + (255,))
    draw = ImageDraw.Draw(img)

    center = canvas_size / 2
    circle_radius = (canvas_size / 2) * circle_radius_ratio

    # Draw solid black circle
    left = center - circle_radius
    top = center - circle_radius
    right = center + circle_radius
    bottom = center + circle_radius
    draw.ellipse([left, top, right, bottom], fill=(0, 0, 0, 255))

    # Mic coordinates proportional to canvas_size
    stroke_w = int(canvas_size * 0.035)

    # Capsule: centered at (center, center - canvas_size * 0.08)
    capsule_w = canvas_size * 0.16
    capsule_h = canvas_size * 0.28
    cap_x1 = center - capsule_w / 2
    cap_y1 = center - capsule_h / 2 - canvas_size * 0.05
    cap_x2 = center + capsule_w / 2
    cap_y2 = cap_y1 + capsule_h
    cap_r = capsule_w / 2

    # Draw capsule outline
    draw.rounded_rectangle([cap_x1, cap_y1, cap_x2, cap_y2], radius=cap_r, outline=(255, 255, 255, 255), width=stroke_w)

    # Mic arc
    arc_r = canvas_size * 0.168
    arc_left = center - arc_r
    arc_top = center - arc_r - canvas_size * 0.01
    arc_right = center + arc_r
    arc_bottom = center + arc_r - canvas_size * 0.01
    draw.arc([arc_left, arc_top, arc_right, arc_bottom], start=0, end=180, fill=(255, 255, 255, 255), width=stroke_w)

    # Mic stem
    stem_y1 = arc_bottom - arc_r
    stem_y2 = stem_y1 + canvas_size * 0.085
    draw.line([(center, stem_y1), (center, stem_y2)], fill=(255, 255, 255, 255), width=stroke_w)

    # Mic base
    base_w = canvas_size * 0.18
    draw.line([(center - base_w/2, stem_y2), (center + base_w/2, stem_y2)], fill=(255, 255, 255, 255), width=stroke_w)

    # Downsample with Lanczos for smooth output
    img_resized = img.resize((size, size), Image.Resampling.LANCZOS)
    return img_resized

# Generate sizes:
# 192x192
icon_192 = draw_vozzy_icon(192, circle_radius_ratio=0.78)
icon_192.save(os.path.join(icons_dir, "icon-192.png"))

# 512x512 standard
icon_512 = draw_vozzy_icon(512, circle_radius_ratio=0.78)
icon_512.save(os.path.join(icons_dir, "icon-512.png"))

# 512x512 maskable (~80% circle area)
icon_maskable_512 = draw_vozzy_icon(512, circle_radius_ratio=0.72)
icon_maskable_512.save(os.path.join(icons_dir, "icon-maskable-512.png"))

# apple-touch-icon.png (180x180, solid white background)
apple_touch = draw_vozzy_icon(180, circle_radius_ratio=0.78, is_apple=True)
apple_touch.save(os.path.join(icons_dir, "apple-touch-icon.png"))

# favicon.png (32x32)
favicon = draw_vozzy_icon(32, circle_radius_ratio=0.82)
favicon.save(os.path.join(icons_dir, "favicon.png"))

print("Icons generated successfully!")
