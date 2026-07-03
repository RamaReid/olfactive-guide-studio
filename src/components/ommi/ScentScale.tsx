import { cn } from "@/lib/utils";

interface ScentScaleProps {
  label: string;
  value: number;
  className?: string;
  tone?: "gold" | "graphite" | "light";
}

export function ScentScale({
  label,
  value,
  className,
  tone = "gold",
}: ScentScaleProps) {
  const activeBg =
    tone === "gold"
      ? "bg-[var(--gold)]"
      : tone === "graphite"
        ? "bg-[var(--graphite)]"
        : "bg-[var(--warm-white)]";
  const inactiveBg =
    tone === "light" ? "bg-white/20" : "bg-[var(--divider)]/60";
  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      <div className="flex items-center justify-between">
        <span className="tracking-ui text-muted-foreground">{label}</span>
        <span className="font-display text-sm">{value}/5</span>
      </div>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((i) => (
          <span
            key={i}
            className={cn(
              "h-[3px] flex-1 rounded-full transition-colors",
              i <= value ? activeBg : inactiveBg,
            )}
          />
        ))}
      </div>
    </div>
  );
}