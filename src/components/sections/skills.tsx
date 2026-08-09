"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  skills,
  signatureStack,
  proofStats,
  type SkillGroup,
} from "@/lib/data";
import { SkillIcon } from "@/components/effects/skill-icon";
import { SectionHeading } from "@/components/effects/section-heading";
import { Reveal } from "@/components/effects/reveal";
import { CountUp } from "@/components/effects/count-up";
import { Spotlight } from "@/components/effects/spotlight";
import { useReducedMotion } from "@/hooks/use-media-query";

const FILTERS: ("All" | SkillGroup)[] = [
  "All",
  "Languages & Frameworks",
  "Styling & UI",
  "Backend & APIs",
  "Data & Cloud",
  "State",
  "AI / ML",
];

/* ------------------------------------------------------------------ */
/*  Signature stack — the hero tile                                     */
/* ------------------------------------------------------------------ */

function SignatureTile() {
  const [active, setActive] = React.useState(0);

  return (
    <div className="edge-glow surface hairline relative overflow-hidden rounded-2xl p-6 sm:p-8">
      <div className="pointer-events-none absolute -right-10 -top-10 size-48 rounded-full bg-[radial-gradient(circle,var(--glow-a),transparent_70%)]" />

      <div className="relative flex items-center justify-between gap-4">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
            Signature stack
          </p>
          <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
            What I actually ship with
          </h3>
        </div>
        <span className="hidden shrink-0 rounded-full border border-border/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
          04
        </span>
      </div>

      <ul className="relative mt-6 flex flex-col">
        {signatureStack.map((s, i) => {
          const isActive = active === i;
          return (
            <li key={s.name}>
              <button
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                aria-expanded={isActive}
                className={cn(
                  "group w-full border-t border-border/60 py-4 text-left transition-colors duration-300",
                  i === 0 && "border-t-0 pt-0",
                )}
              >
                <div className="flex items-center gap-3.5">
                  <span
                    className={cn(
                      "flex size-10 shrink-0 items-center justify-center rounded-xl border border-border/70 transition-all duration-300",
                      isActive
                        ? "scale-105 border-primary/40 bg-primary/5"
                        : "bg-secondary/40",
                    )}
                  >
                    <SkillIcon skill={s} className="size-5" />
                  </span>

                  <span className="min-w-0 flex-1">
                    <span className="flex items-center gap-2">
                      <span className="truncate text-[15px] font-semibold tracking-tight">
                        {s.name}
                      </span>
                      <ArrowUpRight
                        className={cn(
                          "size-3.5 shrink-0 text-primary transition-all duration-300",
                          isActive
                            ? "translate-x-0 opacity-100"
                            : "-translate-x-1 opacity-0",
                        )}
                      />
                    </span>
                    <span className="mt-0.5 block truncate text-[13px] text-muted-foreground">
                      {s.role}
                    </span>
                  </span>
                </div>

                {/* shipped-in reveal */}
                <div
                  className={cn(
                    "grid transition-[grid-template-rows,opacity] duration-400 ease-out",
                    isActive
                      ? "grid-rows-[1fr] opacity-100"
                      : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="flex flex-wrap gap-1.5 pl-[3.375rem] pt-3">
                      {s.shippedIn.map((p) => (
                        <span
                          key={p}
                          className="rounded-full bg-accent/12 px-2.5 py-1 text-[11px] font-medium text-[color-mix(in_oklab,var(--accent)_72%,black)] dark:text-accent"
                        >
                          {p}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Proof tile — count-up numbers                                       */
/* ------------------------------------------------------------------ */

function ProofTile() {
  return (
    <div className="surface hairline relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-8">
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
          Receipts
        </p>
        <h3 className="mt-2 text-xl font-semibold tracking-tight sm:text-2xl">
          Not a tutorial stack
        </h3>
      </div>

      <dl className="relative mt-8 grid grid-cols-2 gap-x-4 gap-y-7">
        {proofStats.map((s) => (
          <div key={s.label}>
            <dt className="text-gradient text-3xl font-semibold tracking-tight sm:text-4xl">
              <CountUp to={s.value} suffix={s.suffix} />
            </dt>
            <dd className="mt-1 text-[11px] leading-tight text-muted-foreground">
              {s.label}
            </dd>
          </div>
        ))}
      </dl>

      <p className="relative mt-8 border-t border-border/60 pt-4 text-[13px] leading-relaxed text-muted-foreground">
        Every tool below has shipped something someone actually uses.
      </p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Marquee — two rows, opposite directions, transform only             */
/* ------------------------------------------------------------------ */

function MarqueeRow({
  reverse = false,
  duration = 44,
  offset = 0,
}: {
  reverse?: boolean;
  duration?: number;
  offset?: number;
}) {
  const row = React.useMemo(() => {
    const base = [...skills.slice(offset), ...skills.slice(0, offset)];
    return [...base, ...base];
  }, [offset]);

  return (
    <div className="flex w-max">
      <div
        className="flex w-max items-center gap-3 pr-3"
        style={{
          animation: `marquee-${reverse ? "r" : "l"} ${duration}s linear infinite`,
        }}
      >
        {row.map((s, i) => (
          <span
            key={`${s.name}-${i}`}
            className="flex shrink-0 items-center gap-2 rounded-full border border-border/60 bg-card/50 px-3.5 py-2"
          >
            <SkillIcon skill={s} className="size-4" />
            <span className="whitespace-nowrap text-[13px] font-medium text-muted-foreground">
              {s.name}
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */

export function Skills() {
  const [filter, setFilter] = React.useState<"All" | SkillGroup>("All");
  const reduced = useReducedMotion();

  const visible = React.useMemo(
    () => (filter === "All" ? skills : skills.filter((s) => s.group === filter)),
    [filter],
  );

  return (
    <section
      id="skills"
      className="relative scroll-mt-24 py-16 sm:py-28"
    >
      <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
        <SectionHeading
          eyebrow="Toolkit"
          title={
            <>
              Four things I&apos;m fast at,{" "}
              <span className="text-gradient">twenty I&apos;m fluent in</span>.
            </>
          }
          description="The signature four are what I reach for without thinking. Everything else is a tool that has shipped at least one real feature."
        />

        {/* bento */}
        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <SignatureTile />
          </Reveal>
          <Reveal delay={90} className="lg:col-span-5">
            <ProofTile />
          </Reveal>
        </div>

        {/* filter + grid */}
        <div className="mt-4">
          <div className="surface hairline rounded-2xl p-6 sm:p-8">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                Everything in rotation
              </p>
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground">
                {String(visible.length).padStart(2, "0")} / {skills.length}
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Filter tools by category"
              className="mt-5 flex flex-wrap gap-2"
            >
              {FILTERS.map((f) => {
                const on = filter === f;
                return (
                  <button
                    key={f}
                    role="tab"
                    aria-selected={on}
                    onClick={() => setFilter(f)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-xs font-medium transition-all duration-300",
                      on
                        ? "bg-[linear-gradient(100deg,var(--primary),var(--accent))] text-primary-foreground shadow-[0_8px_20px_-12px_var(--primary)]"
                        : "border border-border/70 text-muted-foreground hover:border-primary/40 hover:text-foreground",
                    )}
                  >
                    {f}
                  </button>
                );
              })}
            </div>

            <Spotlight className="mt-6">
              <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-5">
                {visible.map((s, i) => (
                  <div
                    key={s.name}
                    data-cursor="hover"
                    title={s.group}
                    className={cn(
                      "skill-chip group flex items-center gap-2.5 rounded-xl border border-border/60 bg-card/55 px-3 py-3",
                      "transition-transform duration-300 will-change-transform hover:-translate-y-1 hover:border-primary/40",
                    )}
                    style={
                      reduced
                        ? undefined
                        : {
                            animation: `chip-in .42s cubic-bezier(.22,1,.36,1) both`,
                            animationDelay: `${Math.min(i * 22, 400)}ms`,
                          }
                    }
                  >
                    <SkillIcon
                      skill={s}
                      className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110"
                    />
                    <span className="truncate text-[13px] font-medium">
                      {s.name}
                    </span>
                  </div>
                ))}
              </div>
            </Spotlight>
          </div>
        </div>
      </div>

      {/* full-bleed marquee */}
      <div
        className="mt-10 flex flex-col gap-3 overflow-hidden py-2"
        style={{
          maskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
          WebkitMaskImage:
            "linear-gradient(90deg, transparent, black 10%, black 90%, transparent)",
        }}
      >
        <MarqueeRow duration={52} />
        {/* second row is desktop-only — 80 animated chips is a lot to ask of a phone */}
        <div className="hidden sm:block">
          <MarqueeRow reverse duration={62} offset={7} />
        </div>
      </div>
    </section>
  );
}
