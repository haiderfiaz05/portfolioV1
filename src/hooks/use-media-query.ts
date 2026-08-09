"use client";

import * as React from "react";

const noop = () => () => {};

/**
 * matchMedia objects are cached per query — `getSnapshot` runs on every render
 * and every store notification, and building a fresh MediaQueryList each time
 * is pure waste (several components subscribe to the same few queries).
 */
const cache = new Map<string, MediaQueryList>();

function mql(query: string) {
  let m = cache.get(query);
  if (!m) {
    m = window.matchMedia(query);
    cache.set(query, m);
  }
  return m;
}

/** SSR-safe media query hook (no setState-in-effect). */
export function useMediaQuery(query: string) {
  const subscribe = React.useCallback(
    (onChange: () => void) => {
      const m = mql(query);
      m.addEventListener("change", onChange);
      return () => m.removeEventListener("change", onChange);
    },
    [query],
  );

  const getSnapshot = React.useCallback(() => mql(query).matches, [query]);

  return React.useSyncExternalStore(subscribe, getSnapshot, () => false);
}

export const useReducedMotion = () =>
  useMediaQuery("(prefers-reduced-motion: reduce)");

export const useFinePointer = () => useMediaQuery("(pointer: fine)");

/** true only after hydration — replaces the classic `mounted` state flag. */
export function useMounted() {
  return React.useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}
