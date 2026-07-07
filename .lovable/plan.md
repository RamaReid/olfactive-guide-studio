## Objetivo

Adaptar la **pantalla principal** al rango intermedio (teléfono en landscape + tablet chica, ~641-1023 px de ancho o alto ≤500 en landscape) siguiendo la misma filosofía que el mobile: sin chips de categoría, solo los dos cilindros y una explicación corta del perfume seleccionado. La única diferencia respecto a mobile es que aquí los cilindros van **uno al lado del otro** (aprovechando el ancho horizontal). Y en las grillas de secciones, usar **3 cards** por fila donde el ancho lo permite. Sin tocar mobile portrait ni desktop.

## Estado actual en ese rango (verificado con Playwright)

- El `.catalog-stage` usa el layout de desktop (columnas 55/45) → la botella hero queda cortada a la izquierda y el `line-indicator` se superpone.
- Los chips DÍA/NOCHE/PIEL/... aparecen y estorban en un espacio donde no caben.
- Las grillas de "Fragancias con presencia" y "Conjuntos" quedan en 1 columna (herencia del mobile) desaprovechando ancho.
- El banner de cookies tapa las CTAs.

## Cambios (solo `src/index.css`, sin tocar componentes)

Nuevo bloque:

```css
@media (min-width: 641px) and (max-width: 1023.98px),
       (orientation: landscape) and (max-height: 500px) and (max-width: 1023.98px) {
  /* ...reglas... */
}
```

### A. Escenario principal — dos cilindros lado a lado

- `.catalog-stage`: `grid-template-columns: 1fr 1fr; grid-template-rows: 1fr auto;` — columna izquierda = `BottleCarousel`, columna derecha = `TubeRack`, fila inferior (span 2) = descripción corta del perfume seleccionado.
- `.line-indicator`: `display: none` (igual que mobile).
- `.category-cylinder`, `.tube-cylinder-shell`: escalados para que quepan sin desbordar (`scale`/`max-height`).
- `.active-tube-description`: visible con `número + familia + inspirado en` (versión compacta, sin el párrafo largo).
- Botella activa e info del catálogo: `max-width` para que no se estire.

### B. Grillas de sección — 3 cards por fila

- `.ommi-featured-grid` (Destacados): `grid-template-columns: repeat(3, minmax(0, 1fr));` con `gap: 12px`.
- `.conjuntos-banner-list` (Conjuntos): 3 columnas cuando `min-width: 720px`, si no, 2. El combo grande sigue full-width.
- `.ommi-explore-grid`: 3 columnas.

### C. Chrome (header + cookie banner)

- `.floating-header`: `padding-block` reducido para no comer alto en landscape.
- `.cookie-consent`: en `max-height <= 520px`, pill compacto bottom-right (`max-width: 360px`), en vez de barra full-width que tapa CTAs.

## Verificación

- Playwright a **667×375, 844×390, 1024×600, 820×1180**: dos cilindros visibles lado a lado, descripción corta debajo, sin chips, sin overflow, cookie banner discreto.
- Screenshots antes/después a **375×667 (mobile portrait)** y **1440×900 (desktop)**: sin cambios visuales.
- `bun run build` sin errores.

## Archivos afectados

- `src/index.css` únicamente.

¿Aplico?
