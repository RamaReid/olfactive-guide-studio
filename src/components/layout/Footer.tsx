import { Link } from "@tanstack/react-router";

export function Footer() {
  return (
    <footer className="border-t border-divider bg-background-alt">
      <div className="container-ommi py-16">
        <div className="grid gap-10 md:grid-cols-4">
          <div>
            <div className="font-display text-3xl tracking-[0.24em]">OMMI</div>
            <p className="mt-4 max-w-xs text-sm text-muted-foreground">
              Casa de fragancias accesible. Extrait de Parfum, trazabilidad
              por lote y sistema de elección olfativa.
            </p>
          </div>

          <FooterCol
            title="Fragancias"
            links={[
              { label: "Todas las fragancias", to: "/fragancias" },
              { label: "Discovery Sets", to: "/discovery-sets" },
              { label: "Regalo", to: "/regalo" },
              { label: "OMMI Finder", to: "/finder" },
            ]}
          />
          <FooterCol
            title="Ayuda"
            links={[
              { label: "Guía olfativa", to: "/guia-olfativa" },
              { label: "Seguridad y trazabilidad", to: "/seguridad-y-trazabilidad" },
              { label: "Cambios y devoluciones", to: "/seguridad-y-trazabilidad" },
              { label: "Envíos", to: "/seguridad-y-trazabilidad" },
            ]}
          />
          <FooterCol
            title="Legal"
            links={[
              { label: "Términos", to: "/seguridad-y-trazabilidad" },
              { label: "Privacidad", to: "/seguridad-y-trazabilidad" },
              { label: "Defensa del consumidor", to: "/seguridad-y-trazabilidad" },
              { label: "Referencias olfativas", to: "/seguridad-y-trazabilidad" },
            ]}
          />
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-divider pt-6 text-xs text-muted-foreground md:flex-row">
          <span>© {new Date().getFullYear()} OMMI · Elaborado en Argentina</span>
          <span className="tracking-ui">Extrait de Parfum · Trazabilidad por lote</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; to: string }[];
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="tracking-ui text-muted-foreground">{title}</span>
      <ul className="flex flex-col gap-2 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              to={l.to}
              className="text-foreground/80 transition-colors hover:text-foreground"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}