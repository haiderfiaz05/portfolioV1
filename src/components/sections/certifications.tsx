"use client";

import * as React from "react";
import { ArrowUpRight } from "lucide-react";

import { certifications } from "@/lib/data";
import { Reveal } from "@/components/effects/reveal";
import { SectionHeading } from "@/components/effects/section-heading";

/**
 * Credentials as a ledger, not five identical cards. Each row opens a
 * gradient rail and slides its detail in on hover/focus.
 */
export function Certifications() {
  return (
    <section
      id="certifications"
      className="relative mx-auto w-full max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 sm:py-28"
    >
      <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-28 lg:h-fit">
          <SectionHeading
            eyebrow="Credentials"
            title={
              <>
                Trained where it{" "}
                <span className="text-gradient">actually counts</span>.
              </>
            }
            description="Formal coursework that backs the production work — heaviest on the AI and API side, because that's where the market is thinnest."
          />
        </div>

        <Reveal stagger step={80} className="flex flex-col">
          {certifications.map((c, i) => (
            <div
              key={c.title}
              data-cursor="hover"
              tabIndex={0}
              className="group relative flex items-start gap-4 border-t border-border/60 py-6 outline-none transition-colors duration-300 last:border-b sm:gap-7"
            >
              {/* gradient rail that grows on hover */}
              <span className="absolute left-0 top-0 h-px w-0 bg-[linear-gradient(90deg,var(--primary),var(--accent))] transition-[width] duration-500 ease-out group-hover:w-full group-focus-visible:w-full" />

              <span className="w-8 shrink-0 pt-1 font-mono text-[11px] tabular-nums text-muted-foreground/70 transition-colors duration-300 group-hover:text-primary">
                {String(i + 1).padStart(2, "0")}
              </span>

              <div className="min-w-0 flex-1">
                <h3 className="text-pretty text-base font-semibold leading-snug tracking-tight transition-transform duration-300 group-hover:translate-x-1 sm:text-lg">
                  {c.title}
                </h3>
                <p className="mt-1.5 text-[13.5px] leading-relaxed text-muted-foreground transition-transform duration-300 group-hover:translate-x-1">
                  {c.detail}
                </p>
              </div>

              <ArrowUpRight className="mt-1 size-4 shrink-0 -translate-x-1 text-primary opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100" />
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  );
}
