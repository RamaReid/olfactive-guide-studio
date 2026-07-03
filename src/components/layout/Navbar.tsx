import { Link } from "@tanstack/react-router";
import { Menu, ShoppingBag } from "lucide-react";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { to: "/fragancias", label: "Fragancias" },
  { to: "/discovery-sets", label: "Discovery" },
  { to: "/regalo", label: "Regalo" },
  { to: "/seguridad-y-trazabilidad", label: "Seguridad" },
  { to: "/guia-olfativa", label: "Guía" },
] as const;

export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-divider/70 bg-[color-mix(in_oklab,var(--background)_88%,transparent)] backdrop-blur-md">
      <div className="container-ommi flex h-16 items-center justify-between md:h-20">
        <Link
          to="/"
          className="font-display text-2xl tracking-[0.24em] text-foreground"
          aria-label="OMMI · Inicio"
        >
          OMMI
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className={cn(
                "text-xs tracking-ui text-foreground/70 transition-colors hover:text-foreground",
              )}
              activeProps={{ className: "text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/finder"
            className="hidden items-center gap-2 border border-graphite bg-graphite px-4 py-2 text-[11px] tracking-ui text-warm-white transition-colors hover:bg-foreground md:inline-flex"
          >
            OMMI Finder
          </Link>
          <button
            type="button"
            aria-label="Carrito"
            className="relative grid h-10 w-10 place-items-center border border-divider text-foreground transition-colors hover:bg-warm-white"
          >
            <ShoppingBag className="h-4 w-4" strokeWidth={1.25} />
            <span className="absolute -right-1.5 -top-1.5 grid h-4 min-w-[16px] place-items-center rounded-full bg-gold px-1 text-[10px] font-medium text-graphite">
              0
            </span>
          </button>
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button
                type="button"
                className="grid h-10 w-10 place-items-center border border-divider text-foreground md:hidden"
                aria-label="Abrir menú"
              >
                <Menu className="h-4 w-4" strokeWidth={1.25} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 bg-background">
              <div className="flex h-full flex-col justify-between pt-6">
                <nav className="flex flex-col gap-1">
                  <span className="tracking-ui text-muted-foreground pb-4">
                    Navegación
                  </span>
                  {NAV_LINKS.map((l) => (
                    <Link
                      key={l.to}
                      to={l.to}
                      onClick={() => setOpen(false)}
                      className="border-b border-divider py-4 font-display text-2xl text-foreground"
                    >
                      {l.label}
                    </Link>
                  ))}
                </nav>
                <Link
                  to="/finder"
                  onClick={() => setOpen(false)}
                  className="mt-8 flex items-center justify-center bg-graphite px-4 py-3 text-xs tracking-ui text-warm-white"
                >
                  OMMI Finder
                </Link>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}