"use client";
import { useEffect, useRef } from "react";

type P = { x: number; y: number; vx: number; vy: number };

export default function ParticleCanvas() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const cv = ref.current!, ctx = cv.getContext("2d")!, parent = cv.parentElement!;
    let W = 0, H = 0, raf = 0, mx = -999, my = -999, ps: P[] = [];
    const still = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const init = () => {
      W = cv.width = cv.offsetWidth; H = cv.height = cv.offsetHeight;
      ps = Array.from({ length: Math.min(80, Math.floor(W / 14)) }, () => ({ x: Math.random() * W, y: Math.random() * H, vx: Math.random() - .5, vy: Math.random() - .5 }));
    };
    const move = (e: MouseEvent) => { const r = cv.getBoundingClientRect(); mx = e.clientX - r.left; my = e.clientY - r.top; };
    const draw = () => {
      const cs = getComputedStyle(document.documentElement);
      const cols = ["--a", "--b", "--c", "--d"].map((v) => cs.getPropertyValue(v).trim());
      ctx.clearRect(0, 0, W, H);
      ps.forEach((p, i) => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        if (Math.hypot(p.x - mx, p.y - my) < 140) { p.x += (mx - p.x) * .02; p.y += (my - p.y) * .02; }
        ctx.fillStyle = cols[i % 4]; ctx.globalAlpha = .9; ctx.beginPath(); ctx.arc(p.x, p.y, 2.5, 0, 7); ctx.fill();
        for (let j = i + 1; j < ps.length; j++) {
          const q = ps[j], l = Math.hypot(p.x - q.x, p.y - q.y);
          if (l < 110) { ctx.strokeStyle = cols[i % 4]; ctx.globalAlpha = (1 - l / 110) * .35; ctx.beginPath(); ctx.moveTo(p.x, p.y); ctx.lineTo(q.x, q.y); ctx.stroke(); }
        }
      });
      if (!still) raf = requestAnimationFrame(draw);
    };
    init(); draw();
    addEventListener("resize", init); parent.addEventListener("mousemove", move);
    return () => { cancelAnimationFrame(raf); removeEventListener("resize", init); parent.removeEventListener("mousemove", move); };
  }, []);
  return <canvas ref={ref} aria-hidden="true" className="absolute inset-0 h-full w-full" />;
}
