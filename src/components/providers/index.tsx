"use client";

import * as React from "react";
import dynamic from "next/dynamic";

import { ThemeProvider } from "@/components/providers/theme-provider";
import { LoaderProvider } from "@/components/providers/loader-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Preloader } from "@/components/effects/preloader";
import { PatternBackground } from "@/components/effects/pattern-background";

// Neither renders markup — keeping them out of the first bundle shortens the
// hydration long-task, and they attach a beat later with no visual change.
const SmoothScroll = dynamic(
  () => import("@/components/effects/smooth-scroll").then((m) => m.SmoothScroll),
  { ssr: false },
);
const Cursor = dynamic(
  () => import("@/components/effects/cursor").then((m) => m.Cursor),
  { ssr: false },
);

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <LoaderProvider>
        <TooltipProvider>
          <PatternBackground />
          <SmoothScroll />
          <Preloader />
          <Cursor />
          {children}
        </TooltipProvider>
      </LoaderProvider>
    </ThemeProvider>
  );
}
