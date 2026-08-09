"use client";

import * as React from "react";
import { GraduationCap, Rocket, BrainCircuit, Clock, Users } from "lucide-react";

import { profile, currently } from "@/lib/data";
import { Reveal } from "@/components/effects/reveal";
import { SectionHeading } from "@/components/effects/section-heading";
import { LocalTime } from "@/components/effects/local-time";

const traits = [
  {
    icon: Rocket,
    title: "Ships production work",
    body: "Two apps live on the App Store, a marketplace in production, internal tooling used by a 40-person team.",
  },
  {
    icon: BrainCircuit,
    title: "AI past the demo",
    body: "RAG, LangChain and Chroma DB semantic search running in production — not a notebook experiment.",
  },
  {
    icon: Users,
    title: "Built for handover",
    body: "Shared component libraries, peer review, and code the next engineer can actually pick up.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading
            eyebrow="About"
            title={
              <>
                I care how it{" "}
                <span className="text-gradient">feels to use</span>, not just
                whether it builds.
              </>
            }
          />

          {/* status card */}
          <Reveal delay={120} className="mt-8">
            <div className="surface hairline relative overflow-hidden rounded-2xl p-5">
              <div className="pointer-events-none absolute -left-8 -top-8 size-32 rounded-full bg-[radial-gradient(circle,var(--glow-b),transparent_70%)]" />
              <div className="relative flex items-start gap-3">
                <span className="relative mt-1.5 flex size-2 shrink-0">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                  <span className="relative inline-flex size-2 rounded-full bg-accent" />
                </span>
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                    Currently
                  </p>
                  <p className="mt-1.5 text-sm font-semibold tracking-tight">
                    {currently.role}
                  </p>
                  <p className="text-sm text-primary">{currently.company}</p>
                  <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                    {currently.focus}
                  </p>

                  <div className="mt-3.5 flex items-center gap-2 border-t border-border/60 pt-3 text-[12px] text-muted-foreground">
                    <Clock className="size-3.5 text-accent" />
                    <span>
                      {profile.location.split(",")[0]} ·{" "}
                      <LocalTime
                        timeZone={currently.timeZone}
                        className="font-mono tabular-nums text-foreground"
                      />
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>

        <div className="flex flex-col gap-10">
          <Reveal stagger className="flex flex-col gap-5">
            {profile.about.map((p) => (
              <p
                key={p.slice(0, 24)}
                className="text-pretty text-[15px] leading-8 text-muted-foreground sm:text-[17px]"
              >
                {p}
              </p>
            ))}
          </Reveal>

          {/* traits — numbered rows rather than another card grid */}
          <Reveal stagger className="flex flex-col">
            {traits.map((t, i) => (
              <div
                key={t.title}
                className="group flex gap-4 border-t border-border/60 py-5 transition-colors duration-300 sm:gap-6"
              >
                <span className="pt-1 font-mono text-[11px] tabular-nums text-muted-foreground/70">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <span className="flex size-9 shrink-0 items-center justify-center rounded-xl border border-border/70 bg-secondary/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-primary/40 group-hover:bg-primary/5">
                  <t.icon className="size-4 text-primary" />
                </span>

                <div className="min-w-0">
                  <h3 className="text-[15px] font-semibold tracking-tight">
                    {t.title}
                  </h3>
                  <p className="mt-1 text-[13.5px] leading-relaxed text-muted-foreground">
                    {t.body}
                  </p>
                </div>
              </div>
            ))}
          </Reveal>

          {/* education strip */}
          <Reveal>
            <div className="surface hairline flex flex-wrap items-center justify-between gap-4 rounded-2xl px-5 py-4">
              <div className="flex items-center gap-3">
                <GraduationCap className="size-5 text-accent" />
                <div>
                  <p className="text-sm font-semibold tracking-tight">
                    BSCS — The University of Lahore
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Sep 2022 – Jun 2026, alongside full-time engineering
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-primary/10 px-3 py-1 font-mono text-xs font-medium text-primary">
                CGPA 3.55
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
