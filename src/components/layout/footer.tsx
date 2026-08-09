"use client";

import * as React from "react";
import { ArrowUp } from "lucide-react";

import { profile, navItems } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export function Footer() {
  return (
    <footer className="relative mx-auto w-full max-w-7xl px-5 pb-10 sm:px-8">
      <Separator className="mb-8" />
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="text-sm font-semibold tracking-tight">{profile.name}</p>
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} — Built with Next.js, TypeScript,
            Tailwind, shadcn/ui &amp; GSAP.
          </p>
        </div>

        <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1">
          {navItems.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>

        <Button variant="outline" size="icon" asChild aria-label="Back to top">
          <a href="#home">
            <ArrowUp className="size-4" />
          </a>
        </Button>
      </div>
    </footer>
  );
}
