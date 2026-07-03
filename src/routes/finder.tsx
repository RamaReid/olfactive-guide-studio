import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/finder")({
  head: () => ({
    meta: [
      { title: "OMMI Finder — Encontrá tu fragancia" },
      {
        name: "description",
        content:
          "Guía olfativa de 5 pasos. Recibí tres recomendaciones OMMI según tu uso, intensidad y estilo.",
      },
      { property: "og:title", content: "OMMI Finder" },
      {
        property: "og:description",
        content: "Tres recomendaciones OMMI según tu uso, intensidad y estilo.",
      },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="OMMI Finder"
      title="Guía olfativa en cinco pasos."
      copy="Estamos afinando la lógica de recomendación. Muy pronto vas a poder responder cinco preguntas y recibir tres opciones OMMI: una segura, una con presencia y una exploratoria."
    />
  ),
});