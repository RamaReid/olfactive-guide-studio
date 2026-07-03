import { cn } from "@/lib/utils";
import type { LineId } from "@/data/lines";
import { getLine } from "@/data/lines";

interface BottleMockProps {
  number: string;
  line: LineId;
  variant?: "bottle" | "boxed";
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
}

const sizes: Record<NonNullable<BottleMockProps["size"]>, string> = {
  sm: "h-40 w-32",
  md: "h-60 w-44",
  lg: "h-80 w-56",
  xl: "h-[520px] w-[360px]",
};

export function BottleMock({
  number,
  line,
  variant = "bottle",
  size = "md",
  className,
}: BottleMockProps) {
  const l = getLine(line);
  const glass = l.palette.alt;
  const accent = l.palette.accent;
  const deep = l.palette.deep;
  const label = l.palette.bg;
  const isDark = line === "noche" || line === "firma";
  const idSuffix = `${line}-${number.replace(/[^a-z0-9]/gi, "")}`;

  return (
    <div
      className={cn(
        "relative flex items-end justify-center",
        sizes[size],
        className,
      )}
      aria-label={`Frasco ${number} línea ${l.name}`}
    >
      {variant === "boxed" && (
        <div
          className="absolute inset-x-2 bottom-0 top-6 rounded-[2px] hairline"
          style={{
            background: `linear-gradient(180deg, ${label} 0%, ${l.palette.alt} 100%)`,
          }}
        />
      )}
      <svg
        viewBox="0 0 200 320"
        xmlns="http://www.w3.org/2000/svg"
        className="relative h-full w-auto"
        aria-hidden="true"
      >
        <ellipse cx="100" cy="308" rx="70" ry="6" fill="rgba(0,0,0,0.14)" />
        <rect x="70" y="10" width="60" height="40" rx="2" fill={deep} />
        <rect x="70" y="10" width="60" height="6" fill={accent} opacity="0.65" />
        <rect x="85" y="50" width="30" height="16" fill={deep} opacity="0.7" />
        <defs>
          <linearGradient id={`glass-${idSuffix}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={glass} stopOpacity="0.55" />
            <stop offset="50%" stopColor={glass} stopOpacity="0.95" />
            <stop offset="100%" stopColor={deep} stopOpacity="0.35" />
          </linearGradient>
        </defs>
        <rect
          x="30"
          y="66"
          width="140"
          height="230"
          rx="4"
          fill={`url(#glass-${idSuffix})`}
          stroke={deep}
          strokeOpacity="0.25"
          strokeWidth="0.8"
        />
        <rect x="40" y="76" width="6" height="200" fill="white" opacity="0.28" />
        <rect x="52" y="76" width="2" height="180" fill="white" opacity="0.18" />
        <rect
          x="52"
          y="140"
          width="96"
          height="120"
          fill={label}
          stroke={accent}
          strokeOpacity="0.6"
          strokeWidth="0.6"
        />
        <text
          x="100"
          y="180"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', serif"
          fontSize="30"
          fill={isDark ? deep : "#151515"}
          fontWeight={500}
          letterSpacing="2"
        >
          OMMI
        </text>
        <line
          x1="72"
          y1="192"
          x2="128"
          y2="192"
          stroke={accent}
          strokeWidth="0.6"
        />
        <text
          x="100"
          y="222"
          textAnchor="middle"
          fontFamily="'Cormorant Garamond', serif"
          fontSize="26"
          fill={isDark ? deep : "#242424"}
          fontStyle="italic"
        >
          {number}
        </text>
        <text
          x="100"
          y="246"
          textAnchor="middle"
          fontFamily="'Inter', sans-serif"
          fontSize="5"
          letterSpacing="2"
          fill="#5f564c"
        >
          EXTRAIT · 100 ML
        </text>
      </svg>
    </div>
  );
}