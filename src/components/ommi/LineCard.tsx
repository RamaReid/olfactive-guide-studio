import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Line } from "@/data/lines";
import { LineIcon } from "./LineIcon";
import { cn } from "@/lib/utils";

interface LineCardProps {
  line: Line;
  className?: string;
}

export function LineCard({ line, className }: LineCardProps) {
  const isDark = line.id === "noche" || line.id === "firma";
  return (
    <Link
      to="/fragancias"
      className={cn(
        "group relative flex h-full flex-col justify-between overflow-hidden p-8 transition-all duration-500",
        "hairline hover:shadow-[0_20px_60px_-30px_rgba(0,0,0,0.25)]",
        className,
      )}
      style={{
        background: `linear-gradient(150deg, ${line.palette.bg} 0%, ${line.palette.alt} 100%)`,
        color: line.palette.text,
        borderColor: isDark ? "rgba(255,249,239,0.14)" : "var(--divider)",
        minHeight: 340,
      }}
    >
      <div
        className="pointer-events-none absolute right-4 top-4 h-24 w-24 opacity-20 blur-2xl"
        style={{ background: line.palette.accent }}
      />
      <div className="relative flex items-start justify-between">
        <div
          className="grid h-14 w-14 place-items-center rounded-full"
          style={{
            border: `1px solid ${isDark ? "rgba(255,249,239,0.24)" : "var(--divider)"}`,
            color: isDark ? line.palette.accent : line.palette.deep,
          }}
        >
          <LineIcon line={line.id} size={28} />
        </div>
        <span className="tracking-ui opacity-70">Línea</span>
      </div>

      <div className="relative mt-10 flex flex-col gap-3">
        <h3 className="font-display text-3xl leading-none">
          {line.displayName}
        </h3>
        <p
          className="max-w-xs text-sm leading-relaxed"
          style={{ color: isDark ? "rgba(245,239,228,0.75)" : "var(--muted-foreground)" }}
        >
          {line.description}
        </p>
        <div className="mt-3 flex flex-wrap gap-2">
          {line.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border px-2.5 py-1 text-[11px]"
              style={{
                borderColor: isDark
                  ? "rgba(255,249,239,0.22)"
                  : "var(--divider)",
                color: isDark ? "rgba(245,239,228,0.85)" : "var(--foreground)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
        <div
          className="mt-6 inline-flex items-center gap-2 tracking-ui"
          style={{ color: isDark ? line.palette.accent : line.palette.deep }}
        >
          Explorar línea
          <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </div>
      </div>
    </Link>
  );
}