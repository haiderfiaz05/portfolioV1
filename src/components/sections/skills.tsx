"use client";

import * as React from "react";
import { 
  ArrowUpRight, 
  Terminal, 
  Code2, 
  Palette, 
  Database, 
  Cloud, 
  Activity, 
  BrainCircuit, 
  Layers 
} from "lucide-react";

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

// Helper to resolve group filter icons
function getFilterIcon(filter: string) {
  switch (filter) {
    case "All":
      return <Layers className="size-3.5" />;
    case "Languages & Frameworks":
      return <Code2 className="size-3.5" />;
    case "Styling & UI":
      return <Palette className="size-3.5" />;
    case "Backend & APIs":
      return <Terminal className="size-3.5" />;
    case "Data & Cloud":
      return <Database className="size-3.5" />;
    case "State":
      return <Activity className="size-3.5" />;
    case "AI / ML":
      return <BrainCircuit className="size-3.5" />;
    default:
      return <Layers className="size-3.5" />;
  }
}

// Color-coding helper for category indicators
function getGroupColor(group: SkillGroup) {
  switch (group) {
    case "Languages & Frameworks":
      return "#3178C6";
    case "Styling & UI":
      return "#06B6D4";
    case "Backend & APIs":
      return "#10B981"; // green
    case "Data & Cloud":
      return "#FFCA28"; // amber
    case "State":
      return "#764ABC"; // purple
    case "AI / ML":
      return "#EC4899"; // pink
    default:
      return "var(--primary)";
  }
}

/* ------------------------------------------------------------------ */
/*  Signature stack — the hero tile                                     */
/* ------------------------------------------------------------------ */

function SignatureTile() {
  const [active, setActive] = React.useState(0);
  const activeTech = signatureStack[active];

  // Dynamic values based on active state to create brand-focused glows
  const activeGlows = [
    { bg: "rgba(255, 255, 255, 0.04)", border: "rgba(255, 255, 255, 0.15)", glow: "rgba(255, 255, 255, 0.05)" }, // Next.js
    { bg: "rgba(97, 218, 251, 0.04)", border: "rgba(97, 218, 251, 0.25)", glow: "rgba(97, 218, 251, 0.1)" },    // React Native
    { bg: "rgba(225, 0, 152, 0.04)", border: "rgba(225, 0, 152, 0.25)", glow: "rgba(225, 0, 152, 0.1)" },    // GraphQL
    { bg: "rgba(52, 211, 153, 0.04)", border: "rgba(52, 211, 153, 0.25)", glow: "rgba(52, 211, 153, 0.1)" }   // LangChain
  ];

  return (
    <div className="edge-glow surface hairline relative overflow-hidden rounded-2xl p-6 sm:p-8 transition-all duration-500">
      <div 
        className="pointer-events-none absolute -right-20 -top-20 size-72 rounded-full blur-3xl transition-all duration-500" 
        style={{
          background: `radial-gradient(circle, ${activeGlows[active].glow} 0%, transparent 70%)`
        }}
      />

      <div className="relative flex items-center justify-between gap-4 border-b border-border/40 pb-4">
        <div>
          <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-primary/70">
            Core stack
          </p>
          <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
            What I actually ship with
          </h3>
        </div>
        <span className="hidden shrink-0 rounded-full border border-border/70 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:block">
          04
        </span>
      </div>

      <div className="relative mt-6 grid gap-6 md:grid-cols-12">
        {/* Selector Buttons */}
        <div className="flex flex-col gap-2 md:col-span-5">
          {signatureStack.map((s, i) => {
            const isActive = active === i;
            return (
              <button
                key={s.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                onClick={() => setActive(i)}
                className={cn(
                  "group relative flex w-full items-center gap-3.5 rounded-xl p-3 text-left transition-all duration-300 cursor-pointer",
                  isActive
                    ? "bg-secondary/70 border border-border/80 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.08)] dark:bg-secondary/30"
                    : "border border-transparent hover:bg-secondary/40",
                )}
              >
                {/* Active Indicator Accent line */}
                <div 
                  className={cn(
                    "absolute left-0 top-3 bottom-3 w-1 rounded-full transition-all duration-300",
                    isActive ? "bg-primary opacity-100 scale-y-100" : "bg-transparent opacity-0 scale-y-50"
                  )}
                />
                
                <span
                  className={cn(
                    "flex size-10 shrink-0 items-center justify-center rounded-lg border border-border/70 transition-all duration-300",
                    isActive
                      ? "scale-105 border-primary/30 bg-primary/10 shadow-[0_0_12px_-4px_var(--primary)]"
                      : "bg-secondary/40 group-hover:border-primary/20",
                  )}
                >
                  <SkillIcon skill={s} className="size-5" />
                </span>

                <span className="min-w-0 flex-1 pl-1">
                  <span className="truncate text-sm font-semibold tracking-tight block text-foreground">
                    {s.name}
                  </span>
                  <span className="truncate text-xs text-muted-foreground block mt-0.5">
                    {s.role}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Live Preview Console Screen */}
        <div 
          className="flex flex-col rounded-xl border p-4 transition-all duration-500 md:col-span-7 bg-card/40 backdrop-blur-sm shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]"
          style={{
            borderColor: activeGlows[active].border,
            background: `linear-gradient(135deg, ${activeGlows[active].bg}, rgba(0,0,0,0.02))`
          }}
        >
          {/* macOS controls mock */}
          <div className="flex items-center justify-between border-b border-border/30 pb-3 mb-4">
            <div className="flex gap-1.5">
              <span className="size-2 rounded-full bg-red-500/50" />
              <span className="size-2 rounded-full bg-yellow-500/50" />
              <span className="size-2 rounded-full bg-green-500/50" />
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-muted-foreground flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-green-500 animate-pulse" />
              sys_status: ready
            </span>
          </div>

          {/* Large dynamic icon display */}
          <div className="flex flex-1 flex-col items-center justify-center py-4 text-center">
            <div className="relative flex size-16 items-center justify-center rounded-2xl bg-secondary/80 border border-border/60 shadow-md">
              <div 
                className="absolute inset-0 rounded-2xl blur-md opacity-35 scale-125 animate-pulse" 
                style={{ backgroundColor: activeTech.mono ? "var(--foreground)" : activeTech.color }}
              />
              <SkillIcon skill={activeTech} className="size-8 relative z-10" />
            </div>

            <h4 className="mt-3 text-sm font-semibold tracking-tight text-foreground">
              {activeTech.name}
            </h4>
            <p className="mt-1 text-xs text-muted-foreground max-w-[200px]">
              {activeTech.role}
            </p>

            <div className="w-full mt-5 border-t border-border/30 pt-4 text-left">
              <span className="font-mono text-[9px] uppercase tracking-widest text-primary/70 block mb-2 font-medium">
                Shipped in Production
              </span>
              <div className="flex flex-wrap gap-1.5">
                {activeTech.shippedIn.map((p) => (
                  <span
                    key={p}
                    className="inline-flex items-center gap-1 rounded-full border border-border/40 bg-secondary/60 px-2.5 py-1 text-[10px] font-medium text-foreground transition-all duration-300 hover:border-primary/30"
                  >
                    <span className="size-1 rounded-full bg-primary" />
                    {p}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Proof tile — count-up numbers                                       */
/* ------------------------------------------------------------------ */

// Micro-visualizations for metrics cards
function StatVisual({ label }: { label: string }) {
  if (label.includes("Products")) {
    return (
      <div className="flex gap-1 mt-2">
        {[...Array(6)].map((_, i) => (
          <span 
            key={i} 
            className="size-1.5 rounded-sm bg-primary/30 dark:bg-primary/20 transition-all duration-500 group-hover:bg-primary group-hover:scale-110"
            style={{ transitionDelay: `${i * 50}ms` }}
          />
        ))}
      </div>
    );
  }
  if (label.includes("Apps")) {
    return (
      <div className="flex gap-1.5 mt-2 items-end h-4">
        <div className="w-2.5 h-4 rounded-[2px] border border-accent/40 bg-accent/5 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent">
          <div className="w-1 h-0.5 bg-accent/40 rounded-full" />
        </div>
        <div className="w-2.5 h-3 rounded-[2px] border border-accent/30 bg-accent/5 flex items-center justify-center transition-all duration-300 group-hover:-translate-y-1 group-hover:border-accent">
          <div className="w-1 h-0.5 bg-accent/30 rounded-full" />
        </div>
      </div>
    );
  }
  if (label.includes("People")) {
    return (
      <div className="flex gap-0.5 mt-2 items-end h-4">
        {[6, 12, 8, 14, 10].map((h, i) => (
          <span 
            key={i}
            className="w-1 bg-primary/25 rounded-t-sm transition-all duration-500 group-hover:bg-primary"
            style={{ 
              height: `${h}px`,
              transitionDelay: `${i * 40}ms`
            }}
          />
        ))}
      </div>
    );
  }
  return (
    <div className="relative size-4 mt-2 flex items-center justify-center">
      <span className="absolute inset-0 rounded-full border border-dashed border-accent/30 animate-[spin_8s_linear_infinite] group-hover:border-accent" />
      <span className="size-1.5 rounded-full bg-accent" />
    </div>
  );
}

function ProofTile() {
  return (
    <div className="surface hairline relative flex flex-col justify-between overflow-hidden rounded-2xl p-6 sm:p-8">
      <div className="dotgrid pointer-events-none absolute inset-0 opacity-40" />
      <div className="pointer-events-none absolute -left-10 -bottom-10 size-48 rounded-full bg-[radial-gradient(circle,var(--glow-b),transparent_70%)]" />

      <div className="relative">
        <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-accent-foreground/75 dark:text-accent">
          Receipts
        </p>
        <h3 className="mt-1 text-xl font-semibold tracking-tight sm:text-2xl">
          Not a tutorial stack
        </h3>
      </div>

      <div className="relative mt-6 grid grid-cols-2 gap-3.5">
        {proofStats.map((s) => (
          <div 
            key={s.label}
            className="group relative flex flex-col justify-between rounded-xl border border-border/50 bg-secondary/20 p-4 transition-all duration-300 hover:border-primary/30 hover:bg-secondary/40 hover:shadow-[0_4px_12px_-6px_rgba(0,0,0,0.05)]"
          >
            <div>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider block">
                {s.label.split(" ").slice(0, 2).join(" ")}
              </span>
              <span className="font-mono text-[9px] text-muted-foreground/60 uppercase block truncate">
                {s.label.split(" ").slice(2).join(" ")}
              </span>
            </div>
            
            <div className="mt-3 flex items-baseline justify-between gap-1.5">
              <span className="text-gradient text-3xl font-bold tracking-tight sm:text-4xl">
                <CountUp to={s.value} suffix={s.suffix} />
              </span>
              <StatVisual label={s.label} />
            </div>
          </div>
        ))}
      </div>

      <p className="relative mt-6 border-t border-border/40 pt-4 text-xs leading-relaxed text-muted-foreground flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-accent animate-pulse" />
        Every tool below has shipped in production.
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
              <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-primary/70">
                Everything in rotation
              </p>
              <span className="font-mono text-[10px] tabular-nums text-muted-foreground bg-secondary/50 px-2 py-0.5 rounded border border-border/40">
                {String(visible.length).padStart(2, "0")} / {skills.length}
              </span>
            </div>

            <div
              role="tablist"
              aria-label="Filter tools by category"
              className="mt-5 flex flex-wrap gap-1.5 border-b border-border/30 pb-4"
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
                      "flex items-center gap-1.5 rounded-lg px-3.5 py-1.5 text-[11px] font-medium transition-all duration-300 cursor-pointer border",
                      on
                        ? "bg-primary text-primary-foreground border-primary shadow-[0_4px_12px_-4px_rgba(var(--primary),0.2)]"
                        : "bg-secondary/40 text-muted-foreground hover:bg-secondary/70 hover:text-foreground border-border/45",
                    )}
                  >
                    {getFilterIcon(f)}
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
                    style={
                      {
                        animation: reduced
                          ? undefined
                          : `chip-in .42s cubic-bezier(.22,1,.36,1) both`,
                        animationDelay: reduced
                          ? undefined
                          : `${Math.min(i * 12, 300)}ms`,
                        "--brand-color": s.color,
                      } as React.CSSProperties
                    }
                    className={cn(
                      "skill-chip group flex items-center gap-3 rounded-xl border border-border/50 bg-secondary/20 px-3.5 py-3",
                      "transition-all duration-300 will-change-all hover:-translate-y-1 hover:border-[var(--brand-color)] hover:bg-secondary/40",
                      "hover:shadow-[0_8px_16px_-6px_var(--brand-color)] dark:hover:shadow-[0_8px_20px_-8px_var(--brand-color)]"
                    )}
                  >
                    <SkillIcon
                      skill={s}
                      className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-115 group-hover:rotate-[6deg]"
                    />
                    <span className="truncate text-xs font-semibold text-foreground/90">
                      {s.name}
                    </span>
                    <span 
                      className="size-1.5 rounded-full shrink-0 ml-auto opacity-40 group-hover:opacity-100 transition-opacity duration-300"
                      style={{ backgroundColor: getGroupColor(s.group) }}
                      title={s.group}
                    />
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
