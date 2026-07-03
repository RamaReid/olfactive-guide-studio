import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/guia-olfativa")({
  head: () => ({
    meta: [
      { title: "Guía olfativa — OMMI" },
      {
        name: "description",
        content:
          "Cómo elegir tu perfume: intensidad, estela, duración, pirámide y familias olfativas explicadas.",
      },
      { property: "og:title", content: "Guía olfativa OMMI" },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Guía olfativa"
      title="Aprendé a elegir tu fragancia."
      copy="Concentración, intensidad, estela, duración, familias olfativas, aplicación y conservación. Contenido educativo en camino."
    />
  ),
});