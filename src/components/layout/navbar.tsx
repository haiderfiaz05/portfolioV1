"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { navItems, profile } from "@/lib/data";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { Magnetic } from "@/components/effects/magnetic";
import { useLoader } from "@/components/providers/loader-provider";

export function Navbar() {
  const { ready } = useLoader();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const [active, setActive] = React.useState("#home");
  const barRef = React.useRef<HTMLSpanElement>(null);

  React.useEffect(() => {
    let queued = false;

    const read = () => {
      queued = false;
      const y = window.scrollY;
      setScrolled(y > 24);
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (barRef.current)
        barRef.current.style.transform = `scaleX(${max > 0 ? y / max : 0})`;
    };

    // one layout read + one style write per frame, never per scroll event
    const onScroll = () => {
      if (queued) return;
      queued = true;
      requestAnimationFrame(read);
    };

    read();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    const sections = navItems
      .map((n) => document.querySelector(n.href))
      .filter(Boolean) as Element[];

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: 0 },
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[120] transition-all duration-500",
        ready ? "translate-y-0 opacity-100" : "-translate-y-full opacity-0",
      )}
    >
      <div
        className={cn(
          "transition-all duration-500",
          scrolled ? "glass border-b border-border/70" : "bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-5 sm:px-8">
          <a href="#home" className="group flex items-center gap-2.5">
            <span className="relative flex size-8 items-center justify-center rounded-lg bg-[linear-gradient(135deg,var(--primary),var(--accent))] text-[13px] font-bold text-primary-foreground">
              HF
              <span className="absolute inset-0 rounded-lg border border-primary/40 animate-[pulse-ring_2.6s_ease-out_infinite]" />
            </span>
            <span className="hidden text-sm font-semibold tracking-tight sm:block">
              {profile.name}
            </span>
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground",
                    active === item.href && "text-foreground",
                  )}
                >
                  {item.label}
                  {active === item.href && (
                    <span className="absolute inset-x-3 -bottom-0.5 h-px bg-[linear-gradient(90deg,var(--primary),var(--accent))]" />
                  )}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <div className="hidden sm:block">
              <Magnetic strength={0.25}>
                <Button variant="gradient" size="sm" asChild>
                  <a href="#contact">Let&apos;s talk</a>
                </Button>
              </Magnetic>
            </div>
            <Button
              variant="outline"
              size="icon"
              className="md:hidden"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="size-4" /> : <Menu className="size-4" />}
            </Button>
          </div>
        </nav>

        {/* scroll progress */}
        <span className="block h-px w-full bg-transparent">
          <span
            ref={barRef}
            className="block h-px w-full origin-left scale-x-0 bg-[linear-gradient(90deg,var(--primary),var(--accent))]"
          />
        </span>
      </div>

      {/* mobile sheet */}
      <div
        className={cn(
          "glass overflow-hidden border-b border-border/70 transition-[max-height,opacity] duration-500 md:hidden",
          open ? "max-h-96 opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-5 py-4">
          {navItems.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-lg px-3 py-2.5 text-sm text-muted-foreground hover:bg-secondary hover:text-foreground"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
