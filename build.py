"""Inline shared/base.css and shared/base.js into each <name>/template.html -> <name>/surface.html.
Mahler has its own build (mahler/build.py) for its Blender frames."""
import os, sys
root = os.path.dirname(os.path.abspath(__file__))
base_css = open(os.path.join(root, "shared/base.css")).read()
base_js = open(os.path.join(root, "shared/base.js")).read()
names = sys.argv[1:] or [d for d in sorted(os.listdir(root)) if os.path.isfile(os.path.join(root, d, "template.html")) and d != "mahler"]
for name in names:
    s = open(os.path.join(root, name, "template.html")).read()
    s = s.replace("/*BASE_CSS*/", base_css, 1).replace("/*BASE_JS*/", base_js, 1)
    extra = os.path.join(root, name, "build_extra.py")
    if os.path.exists(extra):
        ns = {"html": s, "here": os.path.join(root, name)}; exec(open(extra).read(), ns); s = ns["html"]
    open(os.path.join(root, name, "surface.html"), "w").write(s)
    print(f"{name}/surface.html {round(len(s.encode()) / 1024)} KB")
