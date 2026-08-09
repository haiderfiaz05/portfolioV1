"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

type RevealProps = Omit<React.ComponentProps<"div">, "ref"> & {
  /** animate each direct child in sequence instead of the wrapper */
  stagger?: boolean;
  /** ms between staggered children */
  step?: number;
  /** ms before the first child moves */
  delay?: number;
  as?: React.ElementType;
};

/**
 * Scroll reveal built on IntersectionObserver + a CSS transition.
 *
 * The previous version created a GSAP ScrollTrigger per instance (and called
 * ScrollTrigger.refresh() on every unmount). With ~15 of these on the page
 * that put dozens of scroll-linked animations in the frame loop. The browser
 * does this natively for free.
 */
export function Reveal({
  children,
  className,
  stagger = false,
  step = 70,
  delay = 0,
  as: Comp = "div",
  ...props
}: RevealProps) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const targets: HTMLElement[] = stagger
      ? (Array.from(el.children) as HTMLElement[])
      : [el];

    targets.forEach((t, i) => {
      t.classList.add("rv");
      t.style.setProperty("--rv-d", `${delay + i * step}ms`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          targets.forEach((t) => t.classList.add("rv-in"));
          io.disconnect();
        }
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [stagger, step, delay]);

  return (
    <Comp ref={ref} className={cn(className)} {...props}>
      {children}
    </Comp>
  );
}
