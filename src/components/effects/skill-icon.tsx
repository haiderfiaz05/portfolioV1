import * as React from "react";
import type { IconType } from "react-icons";

import { cn } from "@/lib/utils";

/** Anything with a brand mark — a Skill, a Signature entry, etc. */
type Marked = {
  icon: IconType;
  color: string;
  mono?: boolean;
};

/**
 * Renders a brand icon in its own colour — except for near-black marks
 * (Next.js, shadcn, React Native, LangChain) which follow the theme so
 * they stay visible in dark mode.
 */
export function SkillIcon({
  skill,
  className,
}: {
  skill: Marked;
  className?: string;
}) {
  const Icon = skill.icon;
  return (
    <Icon
      className={cn(className, skill.mono && "text-foreground")}
      style={skill.mono ? undefined : { color: skill.color }}
    />
  );
}
