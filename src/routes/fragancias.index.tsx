import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/fragancias/")({
  head: () => ({
    meta: [
      { title: "Fragancias OMMI — Catálogo" },
      {
        name: "description",
        content:
          "Catálogo OMMI organizado por línea, familia olfativa, intensidad y uso. Elegí por momento, no por moda.",
      },
      { property: "og:title", content: "Fragancias OMMI" },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Catálogo"
      title="Fragancias OMMI, organizadas por intención."
      copy="Muy pronto vas a poder filtrar por línea, familia, intensidad, duración, uso y presentación. El catálogo completo llega junto con la ficha detallada por producto."
    />
  ),
});