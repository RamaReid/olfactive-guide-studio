import type { TrustItem } from "@/data/trust";
import { cn } from "@/lib/utils";

interface TrustCardProps {
  item: TrustItem;
  className?: string;
  variant?: "dark" | "light";
}

export function TrustCard({ item, className, variant = "dark" }: TrustCardProps) {
  const Icon = item.icon;
  const isDark = variant === "dark";
  return (
    <div
      className={cn(
        "flex h-full flex-col gap-4 p-7",
        isDark
          ? "border-t border-white/10 text-warm-white"
          : "border-t border-divider text-foreground",
        className,
      )}
    >
      <Icon
        className="h-6 w-6"
        style={{ color: isDark ? "var(--gold)" : "var(--amber)" }}
        strokeWidth={1.25}
      />
      <h3
        className={cn(
          "font-display text-xl leading-tight",
          isDark ? "text-warm-white" : "text-foreground",
        )}
      >
        {item.title}
      </h3>
      <p
        className={cn(
          "text-sm leading-relaxed",
          isDark ? "text-warm-white/70" : "text-muted-foreground",
        )}
      >
        {item.description}
      </p>
    </div>
  );
}