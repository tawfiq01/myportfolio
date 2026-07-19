"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";

// Circle cursor in the tamalsen.dev style: a small accent dot glued to the
// pointer plus a trailing ring that eases behind it and grows over
// interactive elements. Fine-pointer devices only — touch screens never see
// it — and the native cursor stays visible.

function subscribePointerType(callback: () => void) {
  const mq = window.matchMedia("(pointer: fine)");
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(
    subscribePointerType,
    () => window.matchMedia("(pointer: fine)").matches,
    () => false,
  );

  useEffect(() => {
    if (!enabled) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let targetX = -100;
    let targetY = -100;
    let ringX = -100;
    let ringY = -100;
    let ringScale = 1;
    let targetScale = 1;
    let raf = 0;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      dot.style.transform = `translate(${targetX}px, ${targetY}px)`;
    };
    // Fade out when the pointer leaves the window.
    const onOut = (e: MouseEvent) => {
      if (!e.relatedTarget) {
        dot.style.opacity = "0";
        ring.style.opacity = "0";
      }
    };
    const onOver = (e: MouseEvent) => {
      const interactive = (e.target as Element | null)?.closest?.(
        "a, button, [role='button'], input, textarea, select, label",
      );
      targetScale = interactive ? 1.75 : 1;
    };
    const loop = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      ringScale += (targetScale - ringScale) * 0.16;
      ring.style.transform = `translate(${ringX}px, ${ringY}px) scale(${ringScale})`;
      raf = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseout", onOut);
    document.addEventListener("mouseover", onOver);
    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseout", onOut);
      document.removeEventListener("mouseover", onOver);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-4 -mt-4 h-8 w-8 rounded-full border border-accent opacity-0 transition-opacity duration-300"
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[90] -ml-[3px] -mt-[3px] h-1.5 w-1.5 rounded-full bg-accent opacity-0 transition-opacity duration-300"
      />
    </>
  );
}
