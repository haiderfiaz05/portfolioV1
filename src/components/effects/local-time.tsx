"use client";

import * as React from "react";

import { useMounted } from "@/hooks/use-media-query";

/** Live clock for a timezone. Renders a stable placeholder until hydrated. */
export function LocalTime({
  timeZone,
  className,
}: {
  timeZone: string;
  className?: string;
}) {
  const mounted = useMounted();
  const [now, setNow] = React.useState<string>("--:--");

  React.useEffect(() => {
    if (!mounted) return;

    const fmt = new Intl.DateTimeFormat("en-GB", {
      timeZone,
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    const update = () => setNow(fmt.format(new Date()));
    update();
    const id = setInterval(update, 20_000);
    return () => clearInterval(id);
  }, [mounted, timeZone]);

  return (
    <span className={className} suppressHydrationWarning>
      {now}
    </span>
  );
}
