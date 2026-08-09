"use client";

import * as React from "react";

import { gsap } from "@/lib/gsap";
import { skills } from "@/lib/data";
import { SkillIcon } from "@/components/effects/skill-icon";
import { useMediaQuery, useReducedMotion } from "@/hooks/use-media-query";

const CELL = 92; // px between pattern lines

type Traveler = {
  key: string;
  index: number;
  axis: "x" | "y";
  line: number;
  duration: number;
  delay: number;
  reverse: boolean;
};

/** deterministic pseudo-random so server and client agree and layout is stable */
function rand(seed: number) {
  const x = Math.sin(seed * 12.9898) * 43758.5453;
  return x - Math.floor(x);
}

/**
 * Fixed background: pattern lines + soft blue/teal light + skill icons that
 * ride the lines.
 *
 * Performance notes — this layer used to cost ~everything:
 *  - the three `blur-[120px]` blobs are now plain radial-gradients (a blur
 *    filter over a 560px element is re-rasterised constantly; a gradient is
 *    painted once)
 *  - the grid drift animated `background-position` (full repaint per frame);
 *    it now translates an oversized layer on the GPU
 *  - travelers dropped backdrop-blur + shadow, and only run on real pointers
 */
export function PatternBackground() {
  const root = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const canHover = useMediaQuery("(hover: hover)");

  const enableTravelers = isDesktop && canHover && !reduced;

  const travelers = React.useMemo<Traveler[]>(() => {
    if (!enableTravelers) return [];
    const count = 5;
    return Array.from({ length: count }, (_, i) => {
      const axis: "x" | "y" = i % 3 === 2 ? "x" : "y";
      return {
        key: `t-${i}`,
        index: (i * 3 + 2) % skills.length,
        axis,
        line: (2 + Math.floor(rand(i + 1) * 9)) * CELL,
        duration: 22 + rand(i + 7) * 16,
        delay: -rand(i + 13) * 24,
        reverse: rand(i + 21) > 0.5,
      };
    });
  }, [enableTravelers]);

  React.useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".traveler").forEach((el) => {
        const axis = el.dataset.axis as "x" | "y";
        const dur = Number(el.dataset.duration);
        const delay = Number(el.dataset.delay);
        const reverse = el.dataset.reverse === "true";
        const span =
          axis === "y" ? window.innerHeight + 200 : window.innerWidth + 200;
        const prop = axis === "y" ? "y" : "x";

        gsap.fromTo(
          el,
          { [prop]: reverse ? span : -200 },
          {
            [prop]: reverse ? -200 : span,
            duration: dur,
            delay,
            ease: "none",
            repeat: -1,
          },
        );
      });
    }, root);

    return () => ctx.revert();
  }, [reduced, travelers]);

  return (
    <div
      ref={root}
      aria-hidden
      className="gpu pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-background"
    >
      {/* soft light — gradients, not blur filters */}
      <div
        className="gpu absolute inset-0"
        style={{
          backgroundImage: `
            radial-gradient(60rem 40rem at 8% -10%, var(--glow-a), transparent 70%),
            radial-gradient(55rem 38rem at 105% 32%, var(--glow-b), transparent 70%),
            radial-gradient(50rem 36rem at 35% 108%, var(--glow-a), transparent 70%)`,
        }}
      />

      {/* pattern lines, oversized so the drift never shows an edge */}
      <div
        className="absolute"
        style={{
          inset: `-${CELL * 1.5}px`,
          maskImage:
            "radial-gradient(circle at 50% 30%, black 45%, transparent 92%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 30%, black 45%, transparent 92%)",
        }}
      >
        <div
          className="pattern-grid gpu absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
                              linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)`,
            backgroundSize: `${CELL}px ${CELL}px`,
          }}
        />
      </div>

      {/* skill icons riding the lines */}
      {travelers.map((t) => {
        const skill = skills[t.index];
        return (
          <div
            key={t.key}
            className="traveler gpu absolute flex size-8 items-center justify-center rounded-lg border border-border/60 bg-card/70 opacity-[0.3]"
            data-axis={t.axis}
            data-duration={t.duration}
            data-delay={t.delay}
            data-reverse={t.reverse}
            style={
              t.axis === "y"
                ? { left: t.line - 16, top: 0 }
                : { top: t.line - 16, left: 0 }
            }
          >
            <SkillIcon skill={skill} className="size-4" />
          </div>
        );
      })}
    </div>
  );
}
