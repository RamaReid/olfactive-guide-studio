import { cn } from "@/lib/utils";

interface BlueprintDecorProps {
  className?: string;
  opacity?: number;
}

export function BlueprintDecor({
  className,
  opacity = 0.08,
}: BlueprintDecorProps) {
  return (
    <svg
      viewBox="0 0 400 560"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      className={cn("pointer-events-none select-none", className)}
      style={{ opacity }}
      aria-hidden="true"
    >
      <line x1="20" y1="20" x2="380" y2="20" strokeDasharray="2 4" />
      <line x1="20" y1="540" x2="380" y2="540" strokeDasharray="2 4" />
      <line x1="20" y1="20" x2="20" y2="540" strokeDasharray="2 4" />
      <line x1="380" y1="20" x2="380" y2="540" strokeDasharray="2 4" />
      <rect x="160" y="60" width="80" height="60" />
      <line x1="160" y1="90" x2="240" y2="90" />
      <rect x="180" y="120" width="40" height="24" />
      <rect x="110" y="144" width="180" height="320" rx="4" />
      <rect x="140" y="240" width="120" height="140" />
      <line x1="140" y1="280" x2="260" y2="280" />
      <line x1="150" y1="310" x2="230" y2="310" strokeDasharray="1 3" />
      <line x1="150" y1="330" x2="220" y2="330" strokeDasharray="1 3" />
      <line x1="150" y1="350" x2="200" y2="350" strokeDasharray="1 3" />
      <line x1="60" y1="144" x2="90" y2="144" />
      <line x1="60" y1="464" x2="90" y2="464" />
      <line x1="75" y1="144" x2="75" y2="464" strokeDasharray="1 3" />
      <text x="80" y="308" fontSize="8" fill="currentColor" stroke="none">
        100 ML · EXTRAIT
      </text>
      <line x1="110" y1="500" x2="290" y2="500" />
      <line x1="110" y1="495" x2="110" y2="505" />
      <line x1="290" y1="495" x2="290" y2="505" />
    </svg>
  );
}