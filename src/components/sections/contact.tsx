"use client";

import * as React from "react";
import { Check, Copy, MapPin, Clock } from "lucide-react";
import { FaLinkedinIn, FaArrowUpRightFromSquare } from "react-icons/fa6";

import { profile, currently } from "@/lib/data";
import { cn } from "@/lib/utils";
import { Reveal } from "@/components/effects/reveal";
import { Magnetic } from "@/components/effects/magnetic";
import { LocalTime } from "@/components/effects/local-time";

export function Contact() {
  const [copied, setCopied] = React.useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* clipboard unavailable */
    }
  };

  return (
    <section
      id="contact"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-28"
    >
      <div className="surface hairline relative overflow-hidden rounded-[1.75rem] px-6 py-14 sm:px-14 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "radial-gradient(40rem 22rem at 10% 0%, var(--glow-a), transparent 70%), radial-gradient(38rem 22rem at 92% 100%, var(--glow-b), transparent 70%)",
          }}
        />

        <div className="relative flex flex-col items-center text-center">
          <Reveal stagger className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/60 px-3 py-1.5">
              <span className="relative flex size-1.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-accent opacity-70" />
                <span className="relative inline-flex size-1.5 rounded-full bg-accent" />
              </span>
              <span className="text-xs font-medium">
                Available for new work
              </span>
            </span>

            <h2 className="mt-6 text-balance text-4xl font-semibold leading-[1.05] tracking-tighter sm:text-6xl lg:text-7xl">
              Let&apos;s build
              <br />
              <span className="text-gradient">something real.</span>
            </h2>

            <p className="mt-5 max-w-lg text-pretty text-[15px] leading-relaxed text-muted-foreground">
              Full-time roles, contract work, or a product problem that needs
              someone who ships. Remote or Lahore-based.
            </p>
          </Reveal>

          {/* oversized email CTA */}
          <Reveal delay={180} className="mt-10 w-full">
            <Magnetic strength={0.18}>
              <a
                href={`mailto:${profile.email}`}
                data-cursor="hover"
                className="group inline-flex max-w-full items-center gap-3 rounded-full border border-border/70 bg-card/70 py-3 pl-5 pr-3 transition-all duration-300 hover:border-primary/50 hover:shadow-[0_20px_50px_-30px_var(--primary)] sm:py-4 sm:pl-8 sm:pr-4"
              >
                <span className="truncate text-[15px] font-medium tracking-tight sm:text-xl lg:text-2xl">
                  {profile.email}
                </span>
                <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(100deg,var(--primary),var(--accent))] text-primary-foreground transition-transform duration-300 group-hover:rotate-45 sm:size-11">
                  <FaArrowUpRightFromSquare className="size-3.5 sm:size-4" />
                </span>
              </a>
            </Magnetic>
          </Reveal>

          <Reveal
            delay={260}
            stagger
            className="mt-8 flex flex-wrap items-center justify-center gap-2.5"
          >
            <button
              onClick={copy}
              className={cn(
                "inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-[13px] font-medium transition-all duration-300",
                copied
                  ? "border-accent/50 text-accent"
                  : "text-muted-foreground hover:border-primary/40 hover:text-foreground",
              )}
            >
              {copied ? (
                <>
                  <Check className="size-3.5" /> Copied
                </>
              ) : (
                <>
                  <Copy className="size-3.5" /> Copy address
                </>
              )}
            </button>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border/70 px-4 py-2 text-[13px] font-medium text-muted-foreground transition-all duration-300 hover:border-primary/40 hover:text-foreground"
            >
              <FaLinkedinIn className="size-3.5 text-primary" /> LinkedIn
            </a>
          </Reveal>

          <Reveal
            delay={340}
            className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 border-t border-border/60 pt-6 text-xs text-muted-foreground"
          >
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="size-3.5" /> {profile.location}
            </span>
            <span className="inline-flex items-center gap-1.5">
              <Clock className="size-3.5" /> Local time{" "}
              <LocalTime
                timeZone={currently.timeZone}
                className="font-mono tabular-nums text-foreground"
              />
            </span>
            <span>Usually replies within a day</span>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
