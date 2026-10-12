const $ = (id) => document.getElementById(id);
const css = (n) => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const dark = matchMedia("(prefers-color-scheme: dark)");
let C = {};
function readColors() {
  C = { fg: css("--foreground"), mut: css("--muted-foreground"), faint: css("--faint-foreground"), border: css("--border-strong"),
        hair: css("--hairline"), primary: css("--primary"), bad: css("--destructive"), good: css("--success"), card: css("--card"), muted: css("--muted"), mono: css("--mono") };
}
readColors();
function fitCanvas(cv) {
  const r = cv.getBoundingClientRect(), d = window.devicePixelRatio || 1;
  const w = Math.max(10, Math.round(r.width * d)), h = Math.max(10, Math.round(r.height * d));
  if (cv.width !== w || cv.height !== h) { cv.width = w; cv.height = h; }
  const ctx = cv.getContext("2d"); ctx.setTransform(1, 0, 0, 1, 0, 0); ctx.clearRect(0, 0, cv.width, cv.height); ctx.setTransform(d, 0, 0, d, 0, 0);
  return { ctx, w: r.width, h: r.height, d };
}
const mix = (color, a) => `color-mix(in srgb, ${color} ${Math.round(a * 100)}%, transparent)`;
const mod = (a, m) => ((a % m) + m) % m;
function rng(seed) { let s = seed >>> 0; return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
function segButtons(el, items, current, onPick) {
  el.textContent = "";
  items.forEach(([val, label]) => { const b = document.createElement("button"); b.textContent = label; b.setAttribute("aria-pressed", String(val === current)); b.onclick = () => onPick(val); el.appendChild(b); });
}
function wireFold(id) { const f = $(id); if (f) f.addEventListener("toggle", () => { f.querySelector(".fold-hint").textContent = f.open ? "hide" : "show"; }); }
function onResize(fn) { let t = 0; new ResizeObserver(() => { clearTimeout(t); t = setTimeout(fn, 50); }).observe(document.body); dark.addEventListener("change", () => { readColors(); fn(); }); }
function handshake() { if (window.traces && typeof window.traces.getTrace === "function") window.traces.getTrace().catch(() => {}); }
