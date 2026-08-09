"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useFinePointer, useReducedMotion } from "@/hooks/use-media-query";

/**
 * Wraps a group of cards and paints a soft light that follows the cursor.
 * One element, one rAF write per frame, pure background-position work on a
 * single composited layer — the effect is free even over a large grid.
 */
export function Spotlight({
  children,
  className,
  size = 320,
}: {
  children: React.ReactNode;
  className?: string;
  size?: number;
}) {
  const ref = React.useRef<HTMLDivElement>(null);
  const glow = React.useRef<HTMLDivElement>(null);
  const fine = useFinePointer();
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    const g = glow.current;
    if (!el || !g || !fine || reduced) return;

    let raf = 0;
    let x = 0;
    let y = 0;
    let queued = false;

    const write = () => {
      queued = false;
      g.style.transform = `translate3d(${x - size / 2}px, ${y - size / 2}px, 0)`;
    };

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      x = e.clientX - rect.left;
      y = e.clientY - rect.top;
      if (queued) return;
      queued = true;
      raf = requestAnimationFrame(write);
    };

    const onEnter = () => (g.style.opacity = "1");
    const onLeave = () => (g.style.opacity = "0");

    el.addEventListener("mousemove", onMove, { passive: true });
    el.addEventListener("mouseenter", onEnter);
    el.addEventListener("mouseleave", onLeave);

    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseenter", onEnter);
      el.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
    };
  }, [fine, reduced, size]);

  return (
    <div ref={ref} className={cn("relative", className)}>
      {fine && !reduced ? (
        <div
          ref={glow}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 -z-0 rounded-full opacity-0 transition-opacity duration-300"
          style={{
            width: size,
            height: size,
            background:
              "radial-gradient(circle, color-mix(in oklab, var(--primary) 22%, transparent), transparent 68%)",
          }}
        />
      ) : null}
      <div className="relative z-[1]">{children}</div>
    </div>
  );
}
