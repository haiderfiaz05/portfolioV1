"use client";

import * as React from "react";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/effects/reveal";

type Props = {
  eyebrow: string;
  title: React.ReactNode;
  description?: string;
  align?: "left" | "center";
  className?: string;
};

/** Reusable section header used by every vertical + horizontal section. */
export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
  className,
}: Props) {
  return (
    <Reveal
      stagger
      className={cn(
        "flex flex-col gap-3",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <span className="h-px w-8 bg-[linear-gradient(90deg,var(--primary),var(--accent))]" />
        <span className="font-mono text-[11px] uppercase tracking-[0.35em] text-muted-foreground">
          {eyebrow}
        </span>
      </div>
      <h2 className="text-balance text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground",
            align === "center" && "mx-auto",
          )}
        >
          {description}
        </p>
      ) : null}
    </Reveal>
  );
}
