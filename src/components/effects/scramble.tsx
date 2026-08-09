"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-media-query";

const GLYPHS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ/\\<>[]{}#$%&*+=";

/**
 * Cycles through phrases, decoding each one character by character.
 * One element, one rAF loop, and it stops between phrases.
 */
export function Scramble({
  phrases,
  interval = 2800,
  className,
}: {
  phrases: string[];
  interval?: number;
  className?: string;
}) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el || phrases.length === 0) return;

    if (reduced) {
      el.textContent = phrases[0];
      return;
    }

    let index = 0;
    let raf = 0;
    let timer: ReturnType<typeof setTimeout>;

    const render = (target: string) => {
      const start = performance.now();
      const duration = 520;

      const tick = (now: number) => {
        const p = Math.min((now - start) / duration, 1);
        const revealed = Math.floor(p * target.length);

        let out = target.slice(0, revealed);
        for (let i = revealed; i < target.length; i++) {
          out +=
            target[i] === " "
              ? " "
              : GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        el.textContent = out;

        if (p < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          el.textContent = target;
          timer = setTimeout(next, interval);
        }
      };
      raf = requestAnimationFrame(tick);
    };

    const next = () => {
      index = (index + 1) % phrases.length;
      render(phrases[index]);
    };

    el.textContent = phrases[0];
    timer = setTimeout(next, interval);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
    };
  }, [phrases, interval, reduced]);

  return (
    <span
      ref={ref}
      className={cn("inline-block", className)}
      suppressHydrationWarning
    >
      {phrases[0]}
    </span>
  );
}
