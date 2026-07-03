import { Link } from "@tanstack/react-router";
import type { Product } from "@/data/products";
import { getLine } from "@/data/lines";
import { BottleMock } from "./BottleMock";
import { ScentScale } from "./ScentScale";
import { cn } from "@/lib/utils";

interface ProductCardProps {
  product: Product;
  className?: string;
}

const formatARS = (n: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
  }).format(n);

export function ProductCard({ product, className }: ProductCardProps) {
  const line = getLine(product.line);
  return (
    <article
      className={cn(
        "group flex h-full flex-col bg-warm-white hairline transition-shadow duration-300 hover:shadow-[0_20px_60px_-40px_rgba(20,20,20,0.35)]",
        className,
      )}
    >
      <div
        className="relative flex items-end justify-center overflow-hidden px-6 pt-8 pb-4"
        style={{
          background: `linear-gradient(180deg, ${line.palette.bg} 0%, transparent 100%)`,
        }}
      >
        <span
          className="absolute left-4 top-4 rounded-full px-2.5 py-1 text-[10px] tracking-ui"
          style={{
            background: "var(--warm-white)",
            border: "1px solid var(--divider)",
            color: "var(--foreground)",
          }}
        >
          {line.displayName}
        </span>
        <BottleMock number={product.number} line={product.line} size="md" />
      </div>

      <div className="flex flex-1 flex-col gap-4 border-t border-divider p-6">
        <div className="flex flex-col gap-1">
          <span className="tracking-ui text-muted-foreground">
            {product.family}
          </span>
          <h3 className="font-display text-2xl leading-tight">
            {product.name}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {product.description}
          </p>
        </div>

        <ScentScale label="Intensidad" value={product.intensity} />

        <dl className="grid grid-cols-2 gap-x-4 gap-y-2 border-t border-divider pt-4 text-xs">
          <div>
            <dt className="tracking-ui text-muted-foreground">Duración</dt>
            <dd className="mt-0.5 font-medium">{product.duration}</dd>
          </div>
          <div>
            <dt className="tracking-ui text-muted-foreground">Uso</dt>
            <dd className="mt-0.5 font-medium">
              {product.useCases.slice(0, 2).join(" · ")}
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex flex-col gap-3 border-t border-divider pt-4">
          <div className="flex items-baseline justify-between">
            <div>
              <div className="font-display text-xl">
                {formatARS(product.price100ml)}
              </div>
              <div className="text-[11px] tracking-ui text-muted-foreground">
                Frasco 100 ml
              </div>
            </div>
            <div className="text-right">
              <div className="font-display text-base">
                {formatARS(product.priceDecant)}
              </div>
              <div className="text-[11px] tracking-ui text-muted-foreground">
                Decant
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Link
              to="/fragancias/$id"
              params={{ id: product.id }}
              className="flex-1 rounded-none bg-graphite py-2.5 text-center text-xs tracking-ui text-warm-white transition-colors hover:bg-foreground"
            >
              Ver fragancia
            </Link>
            <Link
              to="/discovery-sets"
              className="flex-1 rounded-none border border-graphite py-2.5 text-center text-xs tracking-ui text-graphite transition-colors hover:bg-graphite hover:text-warm-white"
            >
              Probar decant
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}