"use client";

import * as React from "react";
import Lenis from "lenis";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { useLoader } from "@/components/providers/loader-provider";

/**
 * Lenis smooth scrolling, driven by the GSAP ticker so that every
 * ScrollTrigger (vertical timeline + horizontal project rail) stays in sync.
 */
export function SmoothScroll() {
  const { ready } = useLoader();
  const lenisRef = React.useRef<Lenis | null>(null);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const lenis = new Lenis({
      duration: 1.1,
      smoothWheel: true,
      lerp: 0.09,
      wheelMultiplier: 1,
      touchMultiplier: 1.6,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    // anchor links -> smooth scroll
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        'a[href^="#"]',
      ) as HTMLAnchorElement | null;
      if (!el) return;
      const id = el.getAttribute("href");
      if (!id || id === "#") return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target as HTMLElement, { offset: -70, duration: 1.4 });
    };
    document.addEventListener("click", onClick);

    return () => {
      document.removeEventListener("click", onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  React.useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis) return;
    if (ready) {
      lenis.start();
      requestAnimationFrame(() => ScrollTrigger.refresh());
    } else {
      lenis.stop();
    }
  }, [ready]);

  return null;
}
