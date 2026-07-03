import { createFileRoute, notFound } from "@tanstack/react-router";
import { PlaceholderPage } from "@/components/layout/PlaceholderPage";
import { getProduct } from "@/data/products";

export const Route = createFileRoute("/fragancias/$id")({
  loader: ({ params }) => {
    const product = getProduct(params.id);
    if (!product) throw notFound();
    return { product };
  },
  head: ({ loaderData }) => {
    const product = loaderData?.product;
    const title = product
      ? `${product.name} — ${product.family} · OMMI`
      : "Fragancia OMMI";
    const description = product?.description ?? "Fragancia OMMI.";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
      ],
    };
  },
  component: ProductPage,
});

function ProductPage() {
  const { product } = Route.useLoaderData();
  return (
    <PlaceholderPage
      eyebrow={`${product.name} · Línea ${product.line}`}
      title={`${product.name} — ${product.family}.`}
      copy={`${product.description} La ficha completa (intensidad, estela, duración, pirámide, "te va a gustar si" y "no te conviene si") llega en la próxima fase.`}
    />
  );
}