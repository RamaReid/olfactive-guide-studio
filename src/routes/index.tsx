import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { SectionShell } from "@/components/layout/SectionShell";
import { BottleMock } from "@/components/ommi/BottleMock";
import { BlueprintDecor } from "@/components/ommi/BlueprintDecor";
import { LineCard } from "@/components/ommi/LineCard";
import { DiscoverySetCard } from "@/components/ommi/DiscoverySetCard";
import { TrustCard } from "@/components/ommi/TrustCard";
import { ProductCard } from "@/components/ommi/ProductCard";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { LINES } from "@/data/lines";
import { PRODUCTS, productsByLine } from "@/data/products";
import { DISCOVERY_SETS } from "@/data/discoverySets";
import { TRUST_ITEMS } from "@/data/trust";

export const Route = createFileRoute("/")({
  component: Home,
});

const MICRO_BENEFITS = [
  "Extrait de Parfum",
  "Decants para probar",
  "Trazabilidad por lote",
  "Cambios simples",
];

function Home() {
  const homeSets = DISCOVERY_SETS.filter((s) =>
    ["kit-dia", "kit-noche", "kit-regalo"].includes(s.id),
  );

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-background">
        <div className="container-ommi grid gap-14 pt-16 pb-24 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8 lg:pt-24 lg:pb-32">
          <div className="relative z-10 flex flex-col justify-center">
            <div className="flex items-center gap-3 tracking-ui text-muted-foreground">
              <span className="h-px w-8 bg-gold" />
              Casa de fragancias · Argentina
            </div>
            <h1 className="mt-6 font-display text-[44px] leading-[1.02] text-foreground sm:text-6xl lg:text-[86px]">
              Encontrá tu
              <br />
              <span className="italic text-graphite">fragancia OMMI.</span>
            </h1>
            <p className="mt-6 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              Fragancias de alta concentración, organizadas por momento,
              intensidad y estilo. Probá, compará y elegí sin comprar a ciegas.
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/finder"
                className="inline-flex items-center gap-2 bg-graphite px-6 py-3.5 text-xs tracking-ui text-warm-white transition-colors hover:bg-foreground"
              >
                Encontrar mi OMMI
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/discovery-sets"
                className="inline-flex items-center gap-2 border border-graphite px-6 py-3.5 text-xs tracking-ui text-graphite transition-colors hover:bg-graphite hover:text-warm-white"
              >
                Ver Discovery Sets
              </Link>
            </div>

            <ul className="mt-14 grid grid-cols-2 gap-3 border-t border-divider pt-6 sm:grid-cols-4">
              {MICRO_BENEFITS.map((b) => (
                <li
                  key={b}
                  className="flex items-start gap-2 text-xs text-muted-foreground"
                >
                  <Check
                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-amber"
                    strokeWidth={1.5}
                  />
                  <span className="leading-snug">{b}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="relative flex items-center justify-center">
            <BlueprintDecor
              className="absolute -right-6 -top-6 h-[560px] w-[400px] text-graphite lg:block"
              opacity={0.09}
            />
            <div
              className="absolute inset-x-4 top-8 bottom-8 rounded-[2px] hairline"
              style={{
                background:
                  "linear-gradient(160deg, var(--warm-white) 0%, var(--background-alt) 60%, var(--champagne) 100%)",
              }}
            />
            <BottleMock
              number="N°44"
              line="noche"
              size="xl"
              className="relative z-10 drop-shadow-[0_40px_60px_rgba(20,20,20,0.18)]"
            />
            <div className="absolute bottom-6 left-6 z-20 hidden max-w-[240px] flex-col gap-1 border-l-2 border-gold pl-3 sm:flex">
              <span className="tracking-ui text-muted-foreground">
                N°44 · Línea Noche
              </span>
              <span className="font-display text-lg text-foreground">
                Dulce, especiado e intenso.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ELEGÍ POR MOMENTO */}
      <SectionShell variant="warm">
        <SectionHeader
          eyebrow="Arquitectura OMMI"
          title="Elegí por momento, no por moda."
          copy="OMMI se organiza en cinco líneas según cuándo, cómo y con qué intención se usa un perfume. No por qué está de moda, sino por qué tiene sentido para vos."
        />
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {LINES.map((l, idx) => (
            <LineCard
              key={l.id}
              line={l}
              className={idx === 4 ? "lg:col-span-1" : undefined}
            />
          ))}
        </div>
      </SectionShell>

      {/* PROBÁ ANTES DE ELEGIR */}
      <SectionShell variant="champagne">
        <SectionHeader
          eyebrow="Discovery Sets"
          title="Probá antes de elegir."
          copy="Comprar perfume online no debería ser una apuesta. Probá en tu piel, descubrí tu perfil y usá el cupón para elegir tu frasco de 100 ml."
        />
        <div className="mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {homeSets.map((s) => (
            <DiscoverySetCard key={s.id} set={s} />
          ))}
        </div>
        <div className="mt-10 flex justify-center">
          <Link
            to="/discovery-sets"
            className="inline-flex items-center gap-2 border border-graphite px-6 py-3 text-xs tracking-ui text-graphite hover:bg-graphite hover:text-warm-white"
          >
            Ver todos los Discovery Sets <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </SectionShell>

      {/* CONFIANZA */}
      <SectionShell variant="graphite" className="relative overflow-hidden">
        <BlueprintDecor
          className="absolute -right-24 top-1/2 h-[600px] w-[420px] -translate-y-1/2 text-warm-white"
          opacity={0.06}
        />
        <div className="relative grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <div className="flex items-center gap-3 tracking-ui text-warm-white/60">
              <span className="h-px w-8 bg-gold" />
              Confianza verificable
            </div>
            <h2 className="mt-4 font-display text-4xl leading-tight text-warm-white sm:text-5xl">
              Calidad visible.
              <br />
              <span className="italic text-gold">Confianza verificable.</span>
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-warm-white/70">
              El perfume no se elige solo por promesa. Se elige con información
              clara: concentración, lote, conservación, trazabilidad y
              condiciones de cambio.
            </p>
            <Link
              to="/seguridad-y-trazabilidad"
              className="mt-8 inline-flex items-center gap-2 border border-gold/60 px-5 py-3 text-xs tracking-ui text-gold hover:bg-gold hover:text-graphite"
            >
              Ver seguridad y trazabilidad
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid gap-0 sm:grid-cols-2 lg:grid-cols-2">
            {TRUST_ITEMS.map((t) => (
              <TrustCard key={t.id} item={t} variant="dark" />
            ))}
          </div>
        </div>
      </SectionShell>

      {/* FRAGANCIAS DESTACADAS */}
      <SectionShell variant="light">
        <SectionHeader
          eyebrow="Catálogo curado"
          title="Fragancias destacadas."
          copy="Organizadas por línea, no por popularidad. Elegí desde la intención de uso, no desde el marketing."
        />
        <Tabs defaultValue="noche" className="mt-12">
          <TabsList className="mb-8 flex h-auto flex-wrap gap-2 rounded-none border border-divider bg-warm-white p-1">
            {LINES.map((l) => (
              <TabsTrigger
                key={l.id}
                value={l.id}
                className="rounded-none px-4 py-2 text-xs tracking-ui data-[state=active]:bg-graphite data-[state=active]:text-warm-white data-[state=active]:shadow-none"
              >
                {l.name}
              </TabsTrigger>
            ))}
          </TabsList>
          {LINES.map((l) => {
            const items = productsByLine(l.id);
            return (
              <TabsContent key={l.id} value={l.id} className="mt-0">
                {items.length === 0 ? (
                  <EmptyLine line={l.name} />
                ) : (
                  <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {items.map((p) => (
                      <ProductCard key={p.id} product={p} />
                    ))}
                  </div>
                )}
              </TabsContent>
            );
          })}
        </Tabs>
        <div className="mt-12 flex justify-center">
          <Link
            to="/fragancias"
            className="inline-flex items-center gap-2 text-xs tracking-ui text-graphite hover:text-amber"
          >
            Ver todas las {PRODUCTS.length} fragancias
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </SectionShell>

      {/* CTA FINAL */}
      <SectionShell variant="alt" className="relative overflow-hidden">
        <BlueprintDecor
          className="absolute -left-16 top-0 h-[520px] w-[380px] text-graphite"
          opacity={0.07}
        />
        <div className="relative mx-auto flex max-w-3xl flex-col items-center text-center">
          <span className="tracking-ui text-muted-foreground">OMMI Finder</span>
          <h2 className="mt-4 font-display text-4xl leading-tight sm:text-6xl">
            No compres a ciegas.
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground">
            Respondé la guía rápida y encontrá tres opciones OMMI según tu uso,
            intensidad y estilo. Una segura, una con presencia, una exploratoria.
          </p>
          <Link
            to="/finder"
            className="mt-8 inline-flex items-center gap-2 bg-graphite px-8 py-4 text-xs tracking-ui text-warm-white hover:bg-foreground"
          >
            Usar OMMI Finder
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </SectionShell>
    </>
  );
}

function SectionHeader({
  eyebrow,
  title,
  copy,
}: {
  eyebrow: string;
  title: string;
  copy: string;
}) {
  return (
    <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
      <div>
        <div className="flex items-center gap-3 tracking-ui text-muted-foreground">
          <span className="h-px w-8 bg-gold" />
          {eyebrow}
        </div>
        <h2 className="mt-4 font-display text-4xl leading-[1.05] sm:text-5xl">
          {title}
        </h2>
      </div>
      <p className="max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
        {copy}
      </p>
    </div>
  );
}

function EmptyLine({ line }: { line: string }) {
  return (
    <div className="hairline flex flex-col items-center gap-2 bg-warm-white p-16 text-center">
      <span className="tracking-ui text-muted-foreground">Próximamente</span>
      <p className="font-display text-2xl">
        Nuevas fragancias de la línea {line} en camino.
      </p>
    </div>
  );
}
