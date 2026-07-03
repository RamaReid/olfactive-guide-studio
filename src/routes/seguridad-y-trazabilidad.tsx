import { createFileRoute } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";

export const Route = createFileRoute("/seguridad-y-trazabilidad")({
  head: () => ({
    meta: [
      { title: "Seguridad y trazabilidad — OMMI" },
      {
        name: "description",
        content:
          "Concentración, lote, conservación, elaboración, envíos y cambios. La información técnica de OMMI, sin letra chica.",
      },
      { property: "og:title", content: "Seguridad y trazabilidad OMMI" },
    ],
  }),
  component: () => (
    <PlaceholderPage
      eyebrow="Seguridad y trazabilidad"
      title="Calidad visible. Información verificable."
      copy="Vamos a mostrar Extrait de Parfum, lote, conservación, elaboración, envíos protegidos, cambios y devoluciones, más un mockup de etiqueta trasera con toda la información regulatoria. Sección técnica en desarrollo."
    />
  ),
});