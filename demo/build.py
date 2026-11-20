"""Bundle the spectator demo into one offline HTML file."""

import base64
import json
from pathlib import Path


def image_url(path):
    contents = base64.b64encode(path.read_bytes()).decode("ascii")
    return f"data:image/webp;base64,{contents}"


source = Path(__file__).resolve().parent
project = source.parent
field = project / "dist" / "assets" / "ha-nguon.webp"
assets = {
    "field": image_url(field),
    "intro": image_url(source / "assets" / "canal.webp"),
    "meeting": image_url(source / "assets" / "meeting.webp"),
}
template = (source / "index.template.html").read_text(encoding="utf-8")
html = (
    template.replace("/* DEMO_STYLES */", (source / "demo.css").read_text(encoding="utf-8"))
    .replace("/* DEMO_IMAGES */", "const DEMO_IMAGES = " + json.dumps(assets) + ";")
    .replace("/* DEMO_SCRIPT */", (source / "demo.js").read_text(encoding="utf-8"))
)
output = project / "Dat-Lanh-Demo.html"
output.write_text(html, encoding="utf-8")
print(f"{output} ({output.stat().st_size:,} bytes)")
