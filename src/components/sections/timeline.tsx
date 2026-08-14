"use client";

import * as React from "react";
import { Briefcase, GraduationCap, Sparkles } from "lucide-react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { timeline, type TimelineItem } from "@/lib/data";
import { SectionHeading } from "@/components/effects/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { useReducedMotion } from "@/hooks/use-media-query";

const ICONS = {
  work: Briefcase,
  education: GraduationCap,
  milestone: Sparkles,
} as const;

const KIND_LABEL = {
  work: "Role",
  education: "Study",
  milestone: "Milestone",
} as const;

function Node({ item, i }: { item: TimelineItem; i: number }) {
  const Icon = ICONS[item.kind];
  const isCurrent = item.period.toLowerCase().includes("present");

  return (
    <li className="relative pl-14 sm:pl-20">
      <span
        className={cn(
          "timeline-icon absolute left-[14px] top-2 flex size-9 items-center justify-center rounded-full border bg-background sm:left-[22px]",
          isCurrent ? "border-accent/60" : "border-border",
        )}
      >
        <Icon
          className={cn(
            "size-3.5",
            isCurrent ? "text-accent" : "text-primary",
          )}
        />
        {isCurrent ? (
          <span className="absolute inset-0 rounded-full border border-accent/60 animate-[pulse-ring_2.8s_ease-out_infinite]" />
        ) : null}
      </span>

      <div className="timeline-card group surface hairline flex flex-col gap-3 rounded-2xl p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 sm:p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[10.5px] uppercase tracking-[0.25em] text-muted-foreground">
            {String(i + 1).padStart(2, "0")} · {item.period}
          </span>
          <span
            className={cn(
              "rounded-full px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider",
              item.kind === "work"
                ? "bg-primary/10 text-primary"
                : "bg-accent/12 text-[color-mix(in_oklab,var(--accent)_72%,black)] dark:text-accent",
            )}
          >
            {KIND_LABEL[item.kind]}
          </span>
        </div>

        <div>
          <h3 className="text-pretty text-lg font-semibold leading-snug tracking-tight sm:text-xl">
            {item.title}
          </h3>
          <p className="mt-0.5 text-sm text-primary">{item.org}</p>
        </div>

        <ul className="flex flex-col gap-2">
          {item.points.map((p) => (
            <li
              key={p.slice(0, 20)}
              className="flex gap-2.5 text-[13.5px] leading-relaxed text-muted-foreground"
            >
              <span className="mt-[0.55rem] size-1 shrink-0 rounded-full bg-accent" />
              {p}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5 pt-1">
          {item.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border border-border/70 px-2.5 py-0.5 text-[11px] text-muted-foreground transition-colors duration-300 group-hover:border-primary/30"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </li>
  );
}

export function Timeline() {
  const root = React.useRef<HTMLElement>(null);
  const fillRef = React.useRef<HTMLSpanElement>(null);
  const dialRef = React.useRef<SVGCircleElement>(null);
  const pctRef = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (reduced) return;

    const ctx = gsap.context(() => {
      // ONE scroll-linked animation for the whole section, and it writes to
      // the DOM directly — the old version called setState on every scroll
      // frame, re-rendering the entire timeline ~60x/second.
      ScrollTrigger.create({
        trigger: ".tl-list",
        start: "top 72%",
        end: "bottom 78%",
        onUpdate: (self) => {
          const p = self.progress;
          if (fillRef.current)
            fillRef.current.style.transform = `scaleY(${p})`;
          if (dialRef.current)
            dialRef.current.style.strokeDasharray = `${p * 97.4} 97.4`;
          if (pctRef.current)
            pctRef.current.textContent = `${Math.round(p * 100)}%`;
        },
      });
    }, root);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="experience"
      ref={root}
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading
            eyebrow="Experience"
            title={
              <>
                Short track record,{" "}
                <span className="text-gradient">densely packed</span>.
              </>
            }
            description="Roles, milestones and study in order. The rail fills as you read."
          />

          <Reveal delay={140} className="mt-8">
            <div className="surface hairline flex items-center gap-4 rounded-2xl p-4">
              <div className="relative size-14 shrink-0">
                <svg viewBox="0 0 36 36" className="size-14 -rotate-90">
                  <circle
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="var(--border)"
                    strokeWidth="2.5"
                  />
                  <circle
                    ref={dialRef}
                    cx="18"
                    cy="18"
                    r="15.5"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeDasharray="0 97.4"
                  />
                </svg>
                <span
                  ref={pctRef}
                  className="absolute inset-0 flex items-center justify-center text-[11px] font-semibold tabular-nums"
                >
                  0%
                </span>
              </div>
              <p className="text-[13px] leading-relaxed text-muted-foreground">
                <span className="font-medium text-foreground">
                  Timeline progress
                </span>
                <br />
                Projects come next — and they scroll sideways.
              </p>
            </div>
          </Reveal>
        </div>

        <div className="relative">
          <span className="absolute left-[14px] top-0 h-full w-px bg-border sm:left-[22px]" />
          <span
            ref={fillRef}
            className="absolute left-[14px] top-0 h-full w-px origin-top scale-y-0 bg-[linear-gradient(180deg,var(--primary),var(--accent))] sm:left-[22px]"
          />

          <Reveal
            as="ol"
            stagger
            step={110}
            className="tl-list flex list-none flex-col gap-6"
          >
            {timeline.map((item, i) => (
              <Node key={item.id} item={item} i={i} />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
