## Objetivo

1. Ocultar la barra de scroll vertical de la derecha (sin desactivar el scroll).
2. En "Destacados" (mobile), mostrar 2 cards paralelas de igual altura y ancho, respetando la proporción interna del desktop (badges → media grande centrada → copy).

## Cambios

### 1. `src/index.css` — ocultar scrollbar vertical global

Agregar al bloque base (fuera de media queries), aplicable a todos los viewports:

```css
html, body {
  scrollbar-width: none;        /* Firefox */
  -ms-overflow-style: none;     /* Edge legacy */
}
html::-webkit-scrollbar,
body::-webkit-scrollbar {
  width: 0;
  height: 0;
  display: none;                /* Chromium / Safari */
}
```

El scroll sigue funcionando con rueda, gesto y teclado; sólo desaparece la barra visible.

### 2. `src/index.css` — Destacados en 2 columnas paralelas dentro de `@media (max-width: 640px)`

- `.ommi-featured-grid`
  - `grid-template-columns: repeat(2, minmax(0, 1fr));` (ya está)
  - `gap: 10px;`
  - `align-items: stretch;` para igualar alturas.
- `.ommi-featured-card`
  - `min-height: 0;` (quitar los 470px heredados que rompen la proporción en mobile).
  - `padding: 10px;`
  - `gap: 8px;`
  - `grid-template-rows: auto 1fr auto;` (misma estructura que desktop).
  - `aspect-ratio: 3 / 5;` para mantener la proporción vertical del desktop.
  - `overflow: hidden;` explícito para que la imagen no desborde.
- `.ommi-featured-media`
  - `min-height: 0;`
  - `aspect-ratio: 1 / 1;` (media cuadrada centrada).
- `.ommi-featured-media img`
  - `width: 100%;`
  - `max-height: 100%;`
  - `transform: scale(1);` (quitar `scale(1.12)` que desbordaba la card).

### 3. Sin cambios en desktop

Los ajustes de Destacados viven íntegramente dentro de `@media (max-width: 640px)`. La ocultación de scrollbar aplica también en desktop, según el pedido explícito.

## Verificación

Playwright 390×844:
- Screenshot inicial → confirmar ausencia de scrollbar vertical a la derecha.
- Scroll hasta Destacados → confirmar 2 cards paralelas de igual altura, con la misma jerarquía visual que desktop (badges arriba, imagen centrada sin recorte, copy debajo) y sin scroll horizontal.

Playwright 1440×900:
- Screenshot home + Destacados → confirmar que desktop mantiene grid de 4 cards con `scale(1.12)` y que la barra vertical tampoco se muestra.
