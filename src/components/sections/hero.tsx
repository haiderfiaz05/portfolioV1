"use client";

import * as React from "react";
import Image from "next/image";
import { ArrowDown, MapPin } from "lucide-react";
import {
  FaLinkedinIn,
  FaEnvelope,
  FaArrowUpRightFromSquare,
} from "react-icons/fa6";

import { gsap } from "@/lib/gsap";
import { profile, stats } from "@/lib/data";
import { Magnetic } from "@/components/effects/magnetic";
import { Scramble } from "@/components/effects/scramble";
import { useLoader } from "@/components/providers/loader-provider";
import { useReducedMotion } from "@/hooks/use-media-query";

const ROLES = [
  "Full-Stack React Developer",
  "React Native Engineer",
  "Next.js + TypeScript",
  "GraphQL & PostgreSQL",
  "RAG / LangChain",
];

export function Hero() {
  const { ready } = useLoader();
  const root = React.useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  React.useEffect(() => {
    if (!ready || reduced) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(".hero-char", {
          yPercent: 115,
          duration: 0.85,
          stagger: 0.028,
        })
        .from(
          ".hero-line",
          { opacity: 0, y: 18, duration: 0.6, stagger: 0.07 },
          "-=0.55",
        )
        .from(
          ".hero-stat",
          { opacity: 0, y: 16, duration: 0.5, stagger: 0.06 },
          "-=0.4",
        )
        .from(
          ".hero-photo",
          { opacity: 0, y: 28, scale: 0.96, duration: 0.8 },
          "-=0.75",
        )
        .from(
          ".hero-card",
          { opacity: 0, y: 28, duration: 0.7 },
          "-=0.5",
        )
        .from(
          ".hero-code-line",
          { opacity: 0, x: -10, stagger: 0.05, duration: 0.4 },
          "-=0.45",
        )
        .from(".hero-cue", { opacity: 0, duration: 0.5 }, "-=0.2");

      gsap.to(".hero-inner", {
        yPercent: -8,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: root.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.5,
        },
      });

      gsap.to(".hero-cue-icon", {
        y: 8,
        repeat: -1,
        yoyo: true,
        duration: 1.2,
        ease: "sine.inOut",
      });
    }, root);

    return () => ctx.revert();
  }, [ready, reduced]);

  const chars = profile.name.split("");

  return (
    <section
      id="home"
      ref={root}
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28"
    >
      <div className="hero-inner mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-14">
        <div className="flex flex-col gap-6">
          <div className="hero-line flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-accent/12 py-1 pl-2 pr-3 text-xs font-medium text-[color-mix(in_oklab,var(--accent)_72%,black)] dark:text-accent">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              Available for new work
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-border/70 px-2.5 py-1 text-xs text-muted-foreground">
              <MapPin className="size-3" />
              {profile.location}
            </span>
          </div>

          <h1 className="text-[clamp(2.9rem,9vw,6.5rem)] font-semibold leading-[0.9] tracking-tighter">
            <span className="sr-only">{profile.name}</span>
            <span aria-hidden className="flex flex-wrap">
              {chars.map((c, i) => (
                <span key={i} className="overflow-hidden py-[0.06em]">
                  <span
                    className={`hero-char inline-block ${
                      i > 6 ? "text-gradient text-shimmer" : ""
                    }`}
                  >
                    {c === " " ? " " : c}
                  </span>
                </span>
              ))}
            </span>
          </h1>

          {/* rotating role */}
          <div className="hero-line flex h-6 items-center gap-3 font-mono text-[13px] sm:text-sm">
            <span className="text-accent">&gt;</span>
            <Scramble phrases={ROLES} className="text-muted-foreground" />
          </div>

          <p className="hero-line max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-lg">
            {profile.tagline}
          </p>

          <div className="hero-line flex flex-wrap items-center gap-2.5">
            <Magnetic className="w-full sm:w-auto">
              <a
                href="#work"
                className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(100deg,var(--primary),var(--accent))] px-6 text-sm font-medium text-primary-foreground shadow-[0_12px_30px_-14px_var(--primary)] transition-transform duration-300 hover:scale-[1.03] active:scale-[0.98] sm:w-auto"
              >
                View my work
                <FaArrowUpRightFromSquare className="size-3.5" />
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-border/70 bg-card/60 px-6 text-sm font-medium transition-all duration-300 hover:border-primary/50 hover:text-primary"
              >
                <FaEnvelope className="size-3.5" /> Email me
              </a>
            </Magnetic>
            <Magnetic>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="inline-flex size-12 items-center justify-center rounded-full border border-border/70 transition-all duration-300 hover:border-primary/50 hover:text-primary"
              >
                <FaLinkedinIn className="size-4" />
              </a>
            </Magnetic>
          </div>

          <dl className="mt-2 grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {stats.map((s) => (
              <div key={s.label} className="hero-stat flex flex-col gap-1">
                <dt className="text-gradient text-2xl font-semibold tracking-tight sm:text-3xl">
                  {s.value}
                </dt>
                <dd className="text-[10.5px] uppercase leading-tight tracking-wider text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative mx-auto w-full max-w-[440px] pb-3 lg:max-w-none">
          <div className="hero-photo relative mx-auto aspect-square w-[88%] overflow-hidden rounded-[2rem] border border-border/70 bg-secondary shadow-[0_30px_75px_-40px_var(--primary)] sm:w-[90%]">
            <Image
              src="/haidar-fiaz.png"
              alt="Portrait of Haidar Fiaz"
              fill
              priority
              sizes="(max-width: 640px) 80vw, (max-width: 1024px) 400px, 35vw"
              className="object-cover object-center"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
            <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-black/35 px-3 py-1.5 font-mono text-[11px] text-white backdrop-blur-sm sm:left-6 sm:top-6">
              Haidar Fiaz · Lahore, PK
            </span>
          </div>

          {/* A compact version of the original code card keeps the hero's visual language. */}
          <div className="hero-card surface-strong hairline relative z-10 -mt-10 ml-auto w-[92%] overflow-hidden rounded-2xl shadow-[0_24px_60px_-35px_var(--primary)] sm:-mt-12 sm:w-[88%]">
            <div className="flex items-center gap-2 border-b border-border/70 bg-secondary/40 px-4 py-3">
              <span className="size-2.5 rounded-full bg-[#ff5f57]" />
              <span className="size-2.5 rounded-full bg-[#febc2e]" />
              <span className="size-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-2 font-mono text-[11px] text-muted-foreground">
                haidar.config.ts
              </span>
            </div>
            <pre className="hide-scrollbar overflow-x-auto px-4 py-3 font-mono text-[11px] leading-5 sm:px-5 sm:text-[12px]">
              <code>
                <div className="hero-code-line">
                  <span className="text-primary">const</span> haidar{" "}
                  <span className="text-muted-foreground">= {"{"}</span>
                </div>
                <div className="hero-code-line">
                  {"  "}
                  <span className="text-accent">role</span>
                  <span className="text-muted-foreground">: </span>
                  <span className="text-primary">
                    &quot;Full-Stack React Developer&quot;
                  </span>
                  ,
                </div>
                <div className="hero-code-line">
                  {"  "}
                  <span className="text-accent">stack</span>
                  <span className="text-muted-foreground">: [</span>
                  <span className="text-primary">
                    &quot;next&quot;, &quot;ts&quot;, &quot;rn&quot;,
                    &quot;graphql&quot;
                  </span>
                  <span className="text-muted-foreground">],</span>
                </div>
                <div className="hero-code-line text-muted-foreground">
                  {"}"} <span className="animate-pulse text-accent">▍</span>
                </div>
              </code>
            </pre>
          </div>
        </div>
      </div>

      <a
        href="#about"
        className="hero-cue absolute bottom-6 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-[9.5px] uppercase tracking-[0.3em] text-muted-foreground transition-colors hover:text-foreground"
      >
        Scroll
        <ArrowDown className="hero-cue-icon size-4" />
      </a>
    </section>
  );
}
