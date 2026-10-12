# math-surfaces

Interactive explainers for results in [openai/math](https://github.com/openai/math), each built as a single self-contained HTML file and hosted as a [Traces](https://traces.com) surface.

| Folder | Result | Surface key |
|---|---|---|
| `mahler/` | 087 · Mahler's conjecture | `mahler-shadow-twin` |
| `plane-coloring/` | 158 · The plane is not 5-colorable | `plane-coloring` |
| `heilbronn/` | 191 · Heilbronn triangle lower bound | `heilbronn-triangles` |
| `gaussian-moat/` | 028 · Gaussian moat | `gaussian-moat` |
| `periodic-tiling/` | 155 · No periodic tiling in 3D | `periodic-tiling` |

## Building

- `python3 build.py [name ...]` inlines `shared/base.css` and `shared/base.js` into `<name>/template.html` and writes `<name>/surface.html`. A folder's `build_extra.py`, if present, runs afterwards (e.g. to inline precomputed data).
- `plane-coloring/surface.html` is hand-written and has no template.
- `mahler/` has its own `build.py`, which inlines Blender turntable frames from `mahler/frames/`.

Surfaces are standalone pages: they complete the `window.traces.getTrace()` handshake and ignore the trace data.
