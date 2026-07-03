import type { LineId } from "@/data/lines";
import { cn } from "@/lib/utils";

interface LineIconProps {
  line: LineId;
  className?: string;
  size?: number;
}

export function LineIcon({ line, className, size = 28 }: LineIconProps) {
  const common = {
    width: size,
    height: size,
    viewBox: "0 0 32 32",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: cn("shrink-0", className),
    "aria-hidden": true,
  };

  switch (line) {
    case "dia":
      return (
        <svg {...common}>
          <line x1="4" y1="24" x2="28" y2="24" />
          <path d="M8 24a8 8 0 0 1 16 0" />
          <line x1="16" y1="6" x2="16" y2="9" />
          <line x1="6" y1="14" x2="8.5" y2="15.5" />
          <line x1="26" y1="14" x2="23.5" y2="15.5" />
          <line x1="9" y1="8" x2="11" y2="10" />
          <line x1="23" y1="8" x2="21" y2="10" />
        </svg>
      );
    case "noche":
      return (
        <svg {...common}>
          <path d="M22 20a9 9 0 1 1-10-13 7 7 0 0 0 10 13z" />
        </svg>
      );
    case "piel":
      return (
        <svg {...common}>
          <path d="M6 20c2-6 6-10 10-10s8 4 10 10" />
          <path d="M9 22c2-4 5-7 9-7" strokeDasharray="1 2" />
          <path d="M13 24c2-3 4-5 8-5" strokeDasharray="1 2" />
        </svg>
      );
    case "firma":
      return (
        <svg {...common}>
          <rect x="6" y="6" width="20" height="20" />
          <path d="M11 16c0-3 2-5 5-5s5 2 5 5-2 5-5 5" />
          <line x1="16" y1="21" x2="16" y2="24" />
        </svg>
      );
    case "regalo":
      return (
        <svg {...common}>
          <rect x="5" y="12" width="22" height="16" />
          <line x1="5" y1="18" x2="27" y2="18" />
          <line x1="16" y1="12" x2="16" y2="28" />
          <path d="M12 12c-2-3 1-5 4-3s4-3 4 3" />
        </svg>
      );
  }
}