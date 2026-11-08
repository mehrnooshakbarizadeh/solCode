"use client";
import { useRef, type CSSProperties, type ReactNode } from "react";

export default function TiltCard({ children, className = "", style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div
      ref={ref} style={style} className={`tilt ${className}`}
      onMouseMove={(e) => {
        const el = ref.current!, r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
        el.style.transform = `perspective(700px) rotateY(${x * 12}deg) rotateX(${-y * 12}deg) translateY(-4px)`;
      }}
      onMouseLeave={() => { ref.current!.style.transform = ""; }}
    >
      {children}
    </div>
  );
}
