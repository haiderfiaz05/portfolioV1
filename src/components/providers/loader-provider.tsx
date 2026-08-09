"use client";

import * as React from "react";

type LoaderState = {
  /** true once the intro counter has finished and the page is interactive */
  ready: boolean;
  setReady: (v: boolean) => void;
};

const LoaderContext = React.createContext<LoaderState>({
  ready: true,
  setReady: () => {},
});

export function LoaderProvider({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = React.useState(false);

  React.useEffect(() => {
    document.body.style.overflow = ready ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [ready]);

  const value = React.useMemo(() => ({ ready, setReady }), [ready]);

  return (
    <LoaderContext.Provider value={value}>{children}</LoaderContext.Provider>
  );
}

export const useLoader = () => React.useContext(LoaderContext);
