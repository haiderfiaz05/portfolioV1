"use client";

import * as React from "react";
import { ArrowRight, MoveHorizontal } from "lucide-react";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";
import { projects, type Project } from "@/lib/data";
import { useMediaQuery, useReducedMotion } from "@/hooks/use-media-query";

function ProjectCard({ p, i }: { p: Project; i: number }) {
  return (
    <article
      data-cursor="hover"
      className="panel group surface-strong hairline relative flex h-[70vh] max-h-[600px] w-[85vw] shrink-0 flex-col overflow-hidden rounded-[1.5rem] transition-colors duration-500 hover:border-primary/40 sm:w-[540px] lg:w-[600px]"
    >
      {/* header visual */}
      <div className="relative h-36 shrink-0 overflow-hidden border-b border-border/70 sm:h-44">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(24rem 14rem at 18% 15%, ${p.accent}, transparent 65%),
                              radial-gradient(20rem 12rem at 88% 85%, var(--accent), transparent 65%)`,
            opacity: 0.3,
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(to right, var(--grid-line) 1px, transparent 1px),
                              linear-gradient(to bottom, var(--grid-line) 1px, transparent 1px)`,
            backgroundSize: "32px 32px",
          }}
        />

        <span className="panel-index gpu absolute -bottom-7 left-4 select-none text-[7.5rem] font-bold leading-none tracking-tighter text-foreground/[0.07]">
          {p.index}
        </span>

        <div className="absolute right-5 top-5 flex flex-col items-end gap-1.5">
          <span className="rounded-full border border-border/70 bg-background/60 px-2.5 py-0.5 text-[11px] text-muted-foreground">
            {p.year}
          </span>
          <span className="rounded-full border border-border/70 bg-background/60 px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-[0.28em] text-foreground/80">
            {p.subtitle}
          </span>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3.5 overflow-hidden p-6 sm:p-7">
        <div className="flex items-start justify-between gap-4">
          <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
            {p.title}
          </h3>
          <span className="mt-1.5 hidden font-mono text-[11px] tabular-nums text-muted-foreground sm:block">
            {String(i + 1).padStart(2, "0")}/
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>

        <p className="text-pretty text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
          {p.summary}
        </p>

        <ul className="hide-scrollbar flex flex-1 flex-col gap-2 overflow-y-auto pr-1">
          {p.points.map((pt) => (
            <li
              key={pt.slice(0, 22)}
              className="flex gap-2.5 text-[13px] leading-relaxed text-muted-foreground"
            >
              <span className="mt-[0.5rem] size-1 shrink-0 rounded-full bg-[linear-gradient(135deg,var(--primary),var(--accent))]" />
              {pt}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-1.5">
          {p.stack.map((s) => (
            <span
              key={s}
              className="rounded-full bg-accent/12 px-2.5 py-0.5 text-[11px] font-medium text-[color-mix(in_oklab,var(--accent)_72%,black)] dark:text-accent"
            >
              {s}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between border-t border-border/60 pt-3.5">
          {p.href ? (
            <a
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group/link inline-flex items-center gap-2 rounded-full bg-[linear-gradient(100deg,var(--primary),var(--accent))] px-4 py-2 text-[13px] font-medium text-primary-foreground transition-transform duration-300 hover:scale-[1.03]"
            >
              {p.linkLabel ?? "Open"}
              <FaArrowUpRightFromSquare className="size-3 transition-transform duration-300 group-hover/link:rotate-45" />
            </a>
          ) : (
            <span className="rounded-full border border-border/70 px-3 py-1.5 text-[11px] text-muted-foreground">
              Internal / private
            </span>
          )}
          <ArrowRight className="size-4 -translate-x-2 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const section = React.useRef<HTMLElement>(null);
  const track = React.useRef<HTMLDivElement>(null);
  const barRef = React.useRef<HTMLSpanElement>(null);
  const countRef = React.useRef<HTMLSpanElement>(null);
  const reduced = useReducedMotion();
  const richMotion = useMediaQuery("(min-width: 768px)");

  React.useEffect(() => {
    if (reduced) return;
    const host = section.current;
    if (!host) return;

    let ctx: gsap.Context | undefined;

    const build = () => {
      ctx = gsap.context(() => {
      const el = track.current;
      if (!el) return;
      const distance = () => Math.max(el.scrollWidth - window.innerWidth, 1);

      const tween = gsap.to(el, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: section.current,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 0.6,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          // direct DOM writes — no React re-render per scroll frame
          onUpdate: (self) => {
            const p = self.progress;
            if (barRef.current)
              barRef.current.style.transform = `scaleX(${p})`;
            if (countRef.current)
              countRef.current.textContent = String(
                Math.min(projects.length, Math.max(1, Math.ceil(p * projects.length))),
              ).padStart(2, "0");
          },
        },
      });

      // per-card depth is a desktop luxury — on phones the pin alone is plenty
      if (!richMotion) return;

      gsap.utils.toArray<HTMLElement>(".panel").forEach((panel) => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: panel,
            containerAnimation: tween,
            start: "left 95%",
            end: "right left",
            scrub: true,
          },
        });

        tl.fromTo(
          panel,
          { scale: 0.95, opacity: 0.55 },
          { scale: 1, opacity: 1, ease: "power2.out", duration: 0.35 },
        ).to(
          panel.querySelector(".panel-index"),
          { x: 110, ease: "none", duration: 1 },
          0,
        );
      });
      }, section);
    };

    // Creating a pinned ScrollTrigger forces layout. Defer it until the rail
    // is within ~1.5 screens instead of paying for it during hydration.
    const io = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        io.disconnect();
        build();
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(host);

    return () => {
      io.disconnect();
      ctx?.revert();
    };
  }, [reduced, richMotion]);

  return (
    <section id="work" ref={section} className="relative overflow-hidden">
      <div className="relative flex h-[100svh] flex-col justify-center">
        <div
          ref={track}
          className={cn(
            "gpu flex items-center gap-5 px-5 sm:gap-7 sm:px-8",
            reduced && "hide-scrollbar overflow-x-auto pb-6",
          )}
        >
          {/* intro panel */}
          <div className="flex h-[70vh] max-h-[600px] w-[78vw] shrink-0 flex-col justify-center gap-5 sm:w-[400px]">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-[linear-gradient(90deg,var(--primary),var(--accent))]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.35em] text-muted-foreground">
                Selected work
              </span>
            </div>
            <h2 className="text-balance text-4xl font-semibold leading-[1.02] tracking-tighter sm:text-5xl">
              Six products,
              <br />
              <span className="text-gradient">shipped sideways.</span>
            </h2>
            <p className="text-pretty text-[14px] leading-relaxed text-muted-foreground sm:text-[15px]">
              This section moves horizontally. Marketplaces, health apps,
              internal platforms and AI-powered tooling.
            </p>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <MoveHorizontal className="size-4 animate-[float-y_2.6s_ease-in-out_infinite] text-primary" />
              Keep scrolling
            </div>
          </div>

          {projects.map((p, i) => (
            <ProjectCard key={p.id} p={p} i={i} />
          ))}

          {/* outro panel */}
          <div className="flex h-[70vh] max-h-[600px] w-[78vw] shrink-0 flex-col justify-center gap-5 pr-5 sm:w-[400px] sm:pr-8">
            <h2 className="text-balance text-3xl font-semibold leading-tight tracking-tighter sm:text-4xl">
              That&apos;s the <span className="text-gradient">work</span>.
            </h2>
            <p className="text-[14px] leading-relaxed text-muted-foreground">
              Keep scrolling down for credentials and how to reach me.
            </p>
            <a
              href="#contact"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-border/70 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-primary/50 hover:text-primary"
            >
              Start a conversation <ArrowRight className="size-4" />
            </a>
          </div>
        </div>

        {/* progress */}
        <div className="pointer-events-none absolute inset-x-5 bottom-7 flex items-center gap-4 sm:inset-x-8">
          <span
            ref={countRef}
            className="font-mono text-[10px] tabular-nums uppercase tracking-[0.3em] text-muted-foreground"
          >
            01
          </span>
          <span className="relative h-px flex-1 overflow-hidden bg-border">
            <span
              ref={barRef}
              className="absolute inset-0 origin-left scale-x-0 bg-[linear-gradient(90deg,var(--primary),var(--accent))]"
            />
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
            {String(projects.length).padStart(2, "0")}
          </span>
        </div>
      </div>
    </section>
  );
}
