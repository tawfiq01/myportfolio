"use client";

import { useRef } from "react";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

// Wrapper that makes its child gently follow the cursor and spring back on
// leave — the "magnetic button" effect used on all round CTAs.
export default function Magnetic({ children, className, strength = 0.3 }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      className={className}
      onMouseMove={(e) => {
        const el = ref.current;
        if (!el) return;
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left - r.width / 2) * strength;
        const y = (e.clientY - r.top - r.height / 2) * strength;
        el.style.transition = "transform 0.1s";
        el.style.transform = `translate(${x}px, ${y}px)`;
      }}
      onMouseLeave={() => {
        const el = ref.current;
        if (!el) return;
        el.style.transition = "transform 0.35s cubic-bezier(0.2, 0.6, 0.3, 1.4)";
        el.style.transform = "translate(0, 0)";
      }}
    >
      {children}
    </div>
  );
}
