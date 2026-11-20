"""Bundle the spectator demo into one offline HTML file."""

from pathlib import Path


source = Path(__file__).resolve().parent
project = source.parent
template = (source / "index.template.html").read_text(encoding="utf-8")
html = (
    template.replace("/* DEMO_STYLES */", (source / "demo.css").read_text(encoding="utf-8"))
    .replace("/* PIXEL_ART */", (source / "pixel-art.js").read_text(encoding="utf-8"))
    .replace("/* DEMO_SCRIPT */", (source / "demo.js").read_text(encoding="utf-8"))
)
for name in ("index.html", "Dat-Lanh-Demo.html"):
    output = project / name
    output.write_text(html, encoding="utf-8")
    print(f"{output} ({output.stat().st_size:,} bytes)")
