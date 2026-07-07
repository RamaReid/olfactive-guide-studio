# Plan: Home responsive (mobile-first) sin tocar desktop

## Regla dura
El look actual en desktop (≥1024px de ancho) queda **idéntico**. Todos los cambios se aplican vía media queries `@media (max-width: 1023.98px)` o menores. No se modifica ninguna regla CSS existente que aplique en desktop, ni el markup que ya renderiza correctamente arriba de 1024px.

## Alcance (solo Home)
`CatalogStage`, `BottleCarousel`, `TubeRack`, `LineIndicator`, `FloatingHeader`, `ConjuntosOmmiSection`, `ExpandedOmmiSections`, `SiteFooter`.

Fuera: `LineCatalogPage`, `ProductPage`, `AudiencePerfumesPage`, `DiscoveryPage`, `InfoPage`, `PerfumesPage`.

## Estrategia
Mobile-first fluido **por debajo** de 1024px:
- Tablet: `@media (max-width: 1023.98px)` — layout de una columna, ajustes generales.
- Mobile: `@media (max-width: 640px)` — refinamientos de tipografía, spacing y orientación de rack.
- Dentro de cada bloque mobile/tablet se usa `clamp()` para escalar fluidamente sin más breakpoints.

Las reglas desktop existentes (fuera de media query) se dejan intactas; solo se **agregan** bloques nuevos al final de `src/index.css` (y `src/App.css` si aplica).

## Cambios por bloque (todos dentro de media queries <1024px)

### CatalogStage
- Grid pasa de 2 columnas a 1 columna apilada: BottleCarousel arriba (~55svh), TubeRack abajo con scroll interno.
- `min-height: 100svh` conservado.

### BottleCarousel
- Radio del carrusel reducido con `clamp()` para que las botellas laterales no queden cortadas.
- Se hace vía CSS custom property `--carousel-radius` leída desde el componente; el default desktop se mantiene 285px, solo cambia dentro de media query.

### TubeRack
- Mobile: rack horizontal con `scroll-snap-x` en vez de vertical.
- Tamaños con `clamp()`.

### FloatingHeader
- Padding y tipografía reducidos; nav colapsa a menú simple si no entra.

### ConjuntosOmmiSection + ExpandedOmmiSections
- Grids (`ommi-featured-grid`, `ommi-explore-grid`, `ommi-testimonial-grid`) pasan a 1–2 columnas con `auto-fit minmax`.
- `ommi-social-copy` / `ommi-social-media` apilan.
- Newsletter apila input y botón.
- Headings con `clamp()` dentro del media query.

### SiteFooter
- Columnas apilan; padding y tipografía reducidos.

## Detalles técnicos
- Cambios exclusivamente aditivos en `src/index.css` (bloque nuevo al final: "Responsive <1024px").
- Ajuste mínimo en `BottleCarousel.tsx`: leer el radio desde CSS var (`getComputedStyle`) para que el media query pueda achicarlo. Default y comportamiento desktop no cambian.
- Sin cambios de datos, rutas ni lógica.

## Verificación
Playwright headless a `localhost:8080`:
1. Screenshot en 1440×900 antes/después → diff visual = 0 diferencias en desktop.
2. Screenshots en 1024, 768, 375 para validar el responsive.
