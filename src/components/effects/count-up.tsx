"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-media-query";

type Props = {
  to: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  className?: string;
};

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

/** Number that counts up the first time it scrolls into view. */
export function CountUp({
  to,
  suffix = "",
  prefix = "",
  duration = 1100,
  className,
}: Props) {
  const ref = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (reduced) {
      el.textContent = `${prefix}${to}${suffix}`;
      return;
    }

    let raf = 0;
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();

        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / duration, 1);
          el.textContent = `${prefix}${Math.round(easeOut(p) * to)}${suffix}`;
          if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );

    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, suffix, prefix, duration, reduced]);

  return (
    <span ref={ref} className={cn("tabular-nums", className)}>
      {prefix}0{suffix}
    </span>
  );
}
