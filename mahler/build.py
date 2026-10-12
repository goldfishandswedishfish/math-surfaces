"""Inline Blender turntable frames into template.html -> surface.html."""
import base64, json, os, sys
here = os.path.dirname(os.path.abspath(__file__))
def frames(d):
    fd = os.path.join(here, "frames", d)
    return ["data:image/webp;base64," + base64.b64encode(open(os.path.join(fd, n), "rb").read()).decode()
            for n in sorted(os.listdir(fd)) if n.endswith(".webp")]
TT = [
    {"title": "Cube and octahedron", "product": "10.667", "caption": "On the floor: 4³/3! = 10.667. The cube's twin is the octahedron.", "frames": frames("cube")},
    {"title": "Icosahedron and dodecahedron", "product": "14.076", "caption": "Rounder, so higher: 14.076. The ball's ceiling is 17.546.", "frames": frames("ico")},
]
s = open(os.path.join(here, "template.html")).read()
s = s.replace("/*TURNTABLES*/", json.dumps(TT).replace("</", "<\\/"))
open(os.path.join(here, "surface.html"), "w").write(s)
print("surface.html", round(len(s.encode()) / 1024), "KB")
