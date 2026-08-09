"use client";

import * as React from "react";

import { gsap } from "@/lib/gsap";
import { useLoader } from "@/components/providers/loader-provider";
import { profile } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-media-query";

const SEEN_KEY = "hf:intro";

/**
 * Counting intro. Deliberately short (~1.2s) and only on the first view of a
 * session — an intro that outstays its welcome reads as a slow site, and the
 * old 4.3s version was most of the "load time" complaint.
 *
 * `setReady` fires as the panels start lifting, so the hero animation plays
 * *through* the wipe instead of waiting for it.
 */
export function Preloader() {
  const { setReady } = useLoader();
  const root = React.useRef<HTMLDivElement>(null);
  const counterRef = React.useRef<HTMLSpanElement>(null);
  const barRef = React.useRef<HTMLSpanElement>(null);
  const [hidden, setHidden] = React.useState(false);
  const reduce = useReducedMotion();

  React.useEffect(() => {
    const done = () => {
      setReady(true);
      setHidden(true);
    };

    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* private mode */
    }

    if (reduce || seen) {
      const id = requestAnimationFrame(done);
      return () => cancelAnimationFrame(id);
    }

    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      /* ignore */
    }

    const ctx = gsap.context(() => {
      const counter = { value: 0 };
      const tl = gsap.timeline({ onComplete: () => setHidden(true) });

      tl.to(counter, {
        value: 100,
        duration: 0.72,
        ease: "power2.inOut",
        onUpdate: () => {
          const v = Math.round(counter.value);
          if (counterRef.current)
            counterRef.current.textContent = String(v).padStart(3, "0");
          if (barRef.current)
            barRef.current.style.transform = `scaleX(${counter.value / 100})`;
        },
      })
        .to(".pl-fade", { opacity: 0, y: -12, duration: 0.22, stagger: 0.03 })
        .to(
          ".pl-panel",
          {
            yPercent: -101,
            duration: 0.58,
            ease: "power4.inOut",
            stagger: 0.045,
            // let the site start moving while the curtain is still lifting
            onStart: () => setReady(true),
          },
          "-=0.05",
        );
    }, root);

    return () => ctx.revert();
  }, [reduce, setReady]);

  if (hidden) return null;

  return (
    <div
      ref={root}
      aria-hidden
      data-intro="true"
      className="fixed inset-0 z-[200] flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 flex">
        {Array.from({ length: 6 }).map((_, i) => (
          <span key={i} className="pl-panel gpu h-full flex-1 bg-background" />
        ))}
      </div>

      <div className="relative flex w-full max-w-2xl flex-col items-center gap-6 px-6">
        <p className="pl-fade font-mono text-[11px] uppercase tracking-[0.45em] text-muted-foreground">
          {profile.name}
        </p>

        <div className="pl-fade flex items-baseline gap-1.5">
          <span
            ref={counterRef}
            className="text-gradient text-6xl font-semibold tabular-nums tracking-tighter sm:text-8xl"
          >
            000
          </span>
          <span className="text-lg font-light text-muted-foreground">%</span>
        </div>

        <div className="pl-fade h-px w-full max-w-xs overflow-hidden bg-border">
          <span
            ref={barRef}
            className="block h-full w-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--primary),var(--accent))]"
          />
        </div>
      </div>
    </div>
  );
}
