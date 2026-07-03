import { Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Ticket } from "lucide-react";
import type { DiscoverySet } from "@/data/discoverySets";
import { getLine } from "@/data/lines";
import { cn } from "@/lib/utils";

interface DiscoverySetCardProps {
  set: DiscoverySet;
  className?: string;
}

const formatARS = (n: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);

export function DiscoverySetCard({ set, className }: DiscoverySetCardProps) {
  const linePalette =
    set.line === "mix"
      ? {
          bg: "var(--background-alt)",
          alt: "var(--champagne)",
          accent: "var(--gold)",
          deep: "var(--graphite)",
        }
      : getLine(set.line).palette;

  return (
    <article
      className={cn(
        "group flex h-full flex-col bg-warm-white hairline transition-shadow duration-300 hover:shadow-[0_20px_60px_-40px_rgba(20,20,20,0.35)]",
        className,
      )}
    >
      {/* Caja mock */}
      <div
        className="relative flex h-48 items-center justify-center overflow-hidden"
        style={{
          background: `linear-gradient(140deg, ${linePalette.bg} 0%, ${linePalette.alt} 100%)`,
        }}
      >
        <svg
          viewBox="0 0 200 120"
          className="h-32 w-auto"
          fill="none"
          aria-hidden="true"
        >
          <rect
            x="20"
            y="20"
            width="160"
            height="80"
            fill="var(--warm-white)"
            stroke={linePalette.deep}
            strokeOpacity="0.35"
          />
          <line
            x1="20"
            y1="40"
            x2="180"
            y2="40"
            stroke={linePalette.accent}
            strokeWidth="1"
          />
          <text
            x="100"
            y="70"
            textAnchor="middle"
            fontFamily="'Cormorant Garamond', serif"
            fontSize="20"
            fill="var(--graphite)"
            letterSpacing="2"
          >
            OMMI
          </text>
          <text
            x="100"
            y="88"
            textAnchor="middle"
            fontFamily="'Inter', sans-serif"
            fontSize="6"
            letterSpacing="3"
            fill="var(--muted-foreground)"
          >
            DISCOVERY SET · {set.decants} DECANTS
          </text>
        </svg>
        <span className="absolute right-4 top-4 rounded-full bg-warm-white/90 px-2.5 py-1 text-[10px] tracking-ui text-graphite">
          {set.decants} decants
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 border-t border-divider p-6">
        <div>
          <span className="tracking-ui text-muted-foreground">Discovery Set</span>
          <h3 className="mt-1 font-display text-2xl leading-tight">
            {set.name}
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            {set.description}
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-3 border-t border-divider pt-4 text-xs">
          <div>
            <dt className="tracking-ui text-muted-foreground">Perfil</dt>
            <dd className="mt-0.5">{set.profile}</dd>
          </div>
          <div>
            <dt className="tracking-ui text-muted-foreground">Ocasión</dt>
            <dd className="mt-0.5">{set.occasion}</dd>
          </div>
        </dl>

        <div className="flex flex-wrap gap-4 border-t border-divider pt-4 text-xs text-muted-foreground">
          {set.includesGuide && (
            <span className="inline-flex items-center gap-1.5">
              <BookOpen className="h-3.5 w-3.5" strokeWidth={1.25} />
              Incluye guía
            </span>
          )}
          {set.includesCoupon && (
            <span className="inline-flex items-center gap-1.5">
              <Ticket className="h-3.5 w-3.5" strokeWidth={1.25} />
              Cupón 100 ml
            </span>
          )}
        </div>

        <div className="mt-auto flex flex-col gap-3 border-t border-divider pt-4">
          <div className="flex items-baseline justify-between">
            <div className="font-display text-xl">{formatARS(set.price)}</div>
            <div className="text-[11px] tracking-ui text-muted-foreground">
              Envío incluido AMBA
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to="/discovery-sets"
              className="flex-1 rounded-none bg-graphite py-2.5 text-center text-xs tracking-ui text-warm-white transition-colors hover:bg-foreground"
            >
              Elegir este set
            </Link>
            <Link
              to="/discovery-sets"
              className="inline-flex items-center gap-1 text-xs tracking-ui text-graphite hover:text-amber"
            >
              Ver fragancias <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}