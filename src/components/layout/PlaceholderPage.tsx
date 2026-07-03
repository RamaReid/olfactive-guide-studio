import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { BlueprintDecor } from "@/components/ommi/BlueprintDecor";

interface PlaceholderPageProps {
  eyebrow: string;
  title: string;
  copy: string;
}

export function PlaceholderPage({ eyebrow, title, copy }: PlaceholderPageProps) {
  return (
    <SectionShell variant="light" className="relative overflow-hidden">
      <BlueprintDecor
        className="pointer-events-none absolute right-0 top-1/2 h-[560px] w-[400px] -translate-y-1/2 text-graphite"
        opacity={0.06}
      />
      <div className="relative mx-auto flex max-w-2xl flex-col items-start gap-6 py-12">
        <div className="flex items-center gap-3 tracking-ui text-muted-foreground">
          <span className="h-px w-8 bg-gold" />
          {eyebrow}
        </div>
        <h1 className="font-display text-5xl leading-[1.05] sm:text-6xl">
          {title}
        </h1>
        <p className="max-w-xl text-base leading-relaxed text-muted-foreground">
          {copy}
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-graphite px-5 py-3 text-xs tracking-ui text-warm-white hover:bg-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Volver a Home
          </Link>
          <Link
            to="/discovery-sets"
            className="inline-flex items-center gap-2 border border-graphite px-5 py-3 text-xs tracking-ui text-graphite hover:bg-graphite hover:text-warm-white"
          >
            Ver Discovery Sets
          </Link>
        </div>
        <div className="mt-8 hairline w-full bg-warm-white p-5 text-xs tracking-ui text-muted-foreground">
          Sección en construcción — la home ya refleja la dirección visual OMMI.
        </div>
      </div>
    </SectionShell>
  );
}