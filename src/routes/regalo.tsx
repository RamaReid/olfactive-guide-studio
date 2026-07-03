import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/regalo")({
  head: () => ({
    meta: [
      { title: "Regalo OMMI — Fragancias para regalar sin equivocarse" },
      {
        name: "description",
        content:
          "Opciones OMMI pensadas para resolver regalos elegantes, seguros y fáciles de elegir.",
      },
      { property: "og:title", content: "Regalo OMMI" },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="OMMI Regalo"
      title="Regalá una fragancia sin equivocarte."
      copy="Sección dedicada a regalos seguros: kits con caja premium, guía de elección, cambio simple y cupón recuperable. En construcción."
    />
  ),
});