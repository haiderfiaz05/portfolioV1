"use client";

import * as React from "react";

import { gsap } from "@/lib/gsap";
import { useLoader } from "@/components/providers/loader-provider";
import { profile } from "@/lib/data";
import { useReducedMotion } from "@/hooks/use-media-query";

/**
 * Counting intro. Deliberately short (~1.2s) and plays on every load.
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

    if (reduce) {
      const id = requestAnimationFrame(done);
      return () => cancelAnimationFrame(id);
    }

    const ctx = gsap.context(() => {
      const counter = { value: 0 };
      const setPct = () => {
        const v = Math.round(counter.value);
        if (counterRef.current)
          counterRef.current.textContent = String(v).padStart(3, "0");
        if (barRef.current)
          barRef.current.style.transform = `scaleX(${counter.value / 100})`;
      };

      const tl = gsap.timeline({ onComplete: () => setHidden(true) });

      tl.to(counter, {
        value: 100,
        duration: 0.9,
        ease: "power2.inOut",
        onUpdate: setPct,
      })
        .to(".pl-fade", { opacity: 0, y: -12, duration: 0.22, stagger: 0.03 })
        // eyelids: top strips lift up, bottom strips drop down, opening
        // from the center strip outward — reads as an eye opening rather
        // than a straight curtain wipe.
        .to(
          ".pl-lid-top",
          {
            yPercent: -101,
            duration: 0.62,
            ease: "power4.inOut",
            stagger: { each: 0.045, from: "center" },
            onStart: () => setReady(true),
          },
          "-=0.05",
        )
        .to(
          ".pl-lid-bottom",
          {
            yPercent: 101,
            duration: 0.62,
            ease: "power4.inOut",
            stagger: { each: 0.045, from: "center" },
          },
          "<",
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
      <div className="absolute inset-0 flex flex-col">
        <div className="flex h-1/2 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="pl-lid-top gpu h-full flex-1 bg-[linear-gradient(160deg,var(--primary),var(--accent))]"
            />
          ))}
        </div>
        <div className="flex h-1/2 w-full">
          {Array.from({ length: 6 }).map((_, i) => (
            <span
              key={i}
              className="pl-lid-bottom gpu h-full flex-1 bg-[linear-gradient(340deg,var(--primary),var(--accent))]"
            />
          ))}
        </div>
      </div>

      <div className="relative flex w-full max-w-2xl flex-col items-center gap-6 px-6">
        <p className="pl-fade font-mono text-[11px] uppercase tracking-[0.45em] text-white/80">
          {profile.name}
        </p>

        <div className="pl-fade flex items-baseline gap-1.5">
          <span
            ref={counterRef}
            className="text-6xl font-semibold tabular-nums tracking-tighter text-white sm:text-8xl"
          >
            000
          </span>
          <span className="text-lg font-light text-white/70">%</span>
        </div>

        <div className="pl-fade h-px w-full max-w-xs overflow-hidden bg-white/25">
          <span
            ref={barRef}
            className="block h-full w-full origin-left scale-x-0 bg-white"
          />
        </div>
      </div>
    </div>
  );
}
