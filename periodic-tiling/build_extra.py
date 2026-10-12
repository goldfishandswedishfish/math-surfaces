# Inline the Blender turntable frames (frames/apart, frames/together) as data URIs.
import base64, json, os
def frames(d):
    fd = os.path.join(here, "frames", d)
    return ["data:image/webp;base64," + base64.b64encode(open(os.path.join(fd, n), "rb").read()).decode() for n in sorted(os.listdir(fd)) if n.endswith(".webp")]
TT = [
    {"title": "Pulled apart", "tag": "16 copies of one tile", "frames": frames("apart")},
    {"title": "Pushed together", "tag": "no gaps, no overlaps", "frames": frames("together")},
]
html = html.replace("/*TURNTABLES*/", json.dumps(TT).replace("</", "<\\/"), 1)
