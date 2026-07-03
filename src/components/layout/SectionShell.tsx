import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Variant = "light" | "alt" | "graphite" | "teal" | "champagne" | "warm";

interface SectionShellProps {
  variant?: Variant;
  children: ReactNode;
  className?: string;
  innerClassName?: string;
  as?: "section" | "div" | "header" | "footer";
  id?: string;
}

const variants: Record<Variant, string> = {
  light: "bg-background text-foreground",
  alt: "bg-background-alt text-foreground",
  warm: "bg-warm-white text-foreground",
  graphite: "bg-graphite text-warm-white",
  teal: "bg-teal text-warm-white",
  champagne: "bg-champagne text-foreground",
};

export function SectionShell({
  variant = "light",
  children,
  className,
  innerClassName,
  as: Tag = "section",
  id,
}: SectionShellProps) {
  return (
    <Tag
      id={id}
      className={cn("relative section-y", variants[variant], className)}
    >
      <div className={cn("container-ommi", innerClassName)}>{children}</div>
    </Tag>
  );
}