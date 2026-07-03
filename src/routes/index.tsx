import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div
      data-lovable-blank-page-placeholder
      className="flex min-h-[60vh] flex-col items-center justify-center gap-3 px-6 py-24 text-center"
    >
      <h1 className="text-3xl font-semibold tracking-tight">Blank canvas</h1>
      <p className="max-w-md text-sm text-muted-foreground">
        REPLACE this placeholder with your app's home page.
      </p>
    </div>
  );
}
