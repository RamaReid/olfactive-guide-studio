import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/discovery-sets")({
  head: () => ({
    meta: [
      { title: "Discovery Sets OMMI — Probá antes de elegir" },
      {
        name: "description",
        content:
          "Sets de descubrimiento por ocasión, intensidad y estilo. Probá en tu piel y elegí tu frasco con más seguridad.",
      },
      { property: "og:title", content: "Discovery Sets OMMI" },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Discovery Sets"
      title="Probá antes de elegir."
      copy="Los siete sets de descubrimiento OMMI (Día, Noche, Piel, Regalo Seguro, Invierno, Verano y Firma) ya están definidos y aparecen destacados en la home. La sección completa con detalle de cada kit llega enseguida."
    />
  ),
});