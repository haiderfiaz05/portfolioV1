"use client";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  gsap.defaults({ ease: "power3.out", duration: 0.9 });
  // mobile URL-bar show/hide fires a resize mid-scroll; without this a
  // pinned ScrollTrigger (the horizontal project rail) auto-refreshes and
  // visibly snaps back to its recalculated position.
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger };
