# Mobile: máximo 2 cards por fila en el resto de las páginas

Aplicar en mobile (≤640 px) el mismo criterio que ya usan los Destacados de la home: dos cards en paralelo, respetando la proporción interna de la card. Se toca únicamente el grid del catálogo (`.catalog-grid` / `.catalog-card`) — no se modifica ningún componente, texto, orden ni desktop.

## Páginas afectadas

Todas usan `.catalog-grid` + `CatalogShowcaseCard`:

- `src/pages/PerfumesPage.tsx` (grid de líneas)
- `src/pages/LineCatalogPage.tsx` (fragancias por línea)
- `src/pages/AudiencePerfumesPage.tsx` (por audiencia)
- `src/pages/DiscoveryPage.tsx` (discovery sets)

## Estado actual

- `.catalog-card { grid-column: span 3 }` sobre un grid `repeat(12, 1fr)`.
- En mobile (`@media max-width: 760px` y `1080px`) sigue en `span 3` → 4 cards por fila en 360–390 px, cards diminutas y desproporcionadas.

## Cambio

Un único bloque en `src/index.css` dentro de `@media (max-width: 640px)`:

```css
.catalog-grid {
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 10px;
  margin-top: 20px;
}

.catalog-card {
  grid-column: auto;
  padding: 10px;
  gap: 8px;
  min-height: 0;
  overflow: hidden;
}

.catalog-card .ommi-featured-media {
  aspect-ratio: 4 / 5;
  min-height: 0;
}

.catalog-card .ommi-featured-media img {
  width: 100%;
  max-height: 100%;
  transform: scale(1);
}
```

Se replican los valores ya usados por `.ommi-featured-card` en mobile para que las cards de catálogo tengan **exactamente la misma proporción interna** que las Destacadas de la home.

Entre 641–760 px se mantiene `span 3` como hoy (tablets pequeñas).

## Fuera de alcance

- Desktop / tablet: sin cambios.
- Nada de tipografía, textos, orden ni componentes.
- No se toca `.ommi-featured-grid` (ya está en 2 columnas).

## Verificación

- `bun run build` verde.
- Playwright 390×844 sobre `/perfumes`, `/perfumes/dia`, `/discovery` y `/perfumes/mujer` (o ruta equivalente por audiencia) para confirmar 2 cards por fila con la misma proporción que Destacados.
- Screenshot 1440×900 para confirmar que desktop no cambió.
