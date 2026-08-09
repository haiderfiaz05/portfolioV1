"use client";

import * as React from "react";

import { useFinePointer, useReducedMotion } from "@/hooks/use-media-query";

const LERP = 0.18;

/**
 * Trailing cursor ring.
 *
 * The old version created a fresh `gsap.to()` on every single mousemove event
 * (hundreds per second of tween allocation) and ran `closest()` alongside it.
 * This drives one rAF loop, writes transforms directly, and parks itself when
 * the pointer stops moving.
 */
export function Cursor() {
  const dot = React.useRef<HTMLDivElement>(null);
  const ring = React.useRef<HTMLDivElement>(null);
  const enabled = useFinePointer();
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (!enabled || reduced) return;
    const d = dot.current;
    const r = ring.current;
    if (!d || !r) return;

    const target = { x: -100, y: -100 };
    const pos = { x: -100, y: -100 };
    let hovering = false;
    let raf = 0;
    let idleFrames = 0;
    let running = false;

    const frame = () => {
      pos.x += (target.x - pos.x) * LERP;
      pos.y += (target.y - pos.y) * LERP;

      d.style.transform = `translate3d(${target.x}px, ${target.y}px, 0)`;
      r.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) scale(${
        hovering ? 1.85 : 1
      })`;

      const settled =
        Math.abs(target.x - pos.x) < 0.15 && Math.abs(target.y - pos.y) < 0.15;
      idleFrames = settled ? idleFrames + 1 : 0;

      if (idleFrames > 8) {
        running = false;
        return;
      }
      raf = requestAnimationFrame(frame);
    };

    const wake = () => {
      if (running) return;
      running = true;
      idleFrames = 0;
      raf = requestAnimationFrame(frame);
    };

    let pending = false;
    const onMove = (e: MouseEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      wake();

      // hover test is throttled to one per frame, not one per event
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => {
        pending = false;
        const next = !!(e.target as HTMLElement)?.closest?.(
          "a,button,[data-cursor='hover']",
        );
        if (next !== hovering) {
          hovering = next;
          r.dataset.hover = String(next);
          wake();
        }
      });
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;

  return (
    <>
      <div
        ref={dot}
        className="pointer-events-none fixed left-0 top-0 z-[150] -ml-[3px] -mt-[3px] size-1.5 rounded-full bg-primary"
      />
      <div
        ref={ring}
        data-hover="false"
        className="pointer-events-none fixed left-0 top-0 z-[150] -ml-4 -mt-4 size-8 rounded-full border border-primary/60 transition-colors duration-300 data-[hover=true]:border-accent"
      />
    </>
  );
}
