## Objetivo

En mobile (`@media (max-width: 640px)`):
1. El cilindro de tubos siempre se ve completo (nunca recortado arriba/abajo ni a los lados).
2. Los tubos se siguen repitiendo cuando la categoría no llena el cilindro (ya está implementado con `wrapIndex`, se conserva).
3. El número del tubo aparece también dentro de la descripción, no solo como badge grande separado.

## Cambios

### 1. `src/index.css` — bloque `@media (max-width: 640px)`

**Cilindro completo:**
- Quitar el `min-height: clamp(200px, 52vw, 280px)` que está recortando el cilindro.
- Dar al `.tube-cylinder-shell` una altura mínima suficiente para que los tubos periféricos no queden fuera: `min-height: clamp(360px, 92vw, 460px)`.
- Asegurar `overflow: visible` en `.tube-cylinder-stage` y `.tube-cylinder-track` (los tubos rotan en 3D y no deben ser clipeados por el contenedor).
- Reducir `--tube-item-width` a `clamp(150px, 48vw, 220px)` y `--tube-visual-half-width` proporcional, para que el tubo central + los dos vecinos siempre entren dentro del ancho de pantalla.
- Añadir `padding-inline: clamp(8px, 3vw, 16px)` al shell para respetar márgenes laterales.

**Número dentro de la descripción:**
- Mostrar de nuevo la línea `Categoría - Audiencia` (span oculto actualmente) prefijada con el número.
- Se implementa vía CSS + un pequeño cambio en `TubeRack.tsx` para incluir el número inline en el span (opción más limpia que un `::before` con `content: attr()`).

### 2. `src/components/catalog-stage/TubeRack.tsx`

- En el bloque `active-tube-description`, cambiar la primera línea `<span>` de categoría/audiencia para incluir el número:
  ```
  Nº{number} · {categoría} - {audiencia}
  ```
- El `.active-tube-number` grande sigue mostrándose en desktop; en mobile se puede ocultar (ya que el número queda inline en la descripción) para no duplicar.

### 3. Repetición de tubos (sin cambios de código)

`filteredFragrances` con `wrapIndex` ya rellena los 13 offsets repitiendo la categoría cuando `filteredFragrances.length < visibleOffsets.length`. Se deja tal cual.

## Verificación

Playwright a 390×844:
- Screenshot del cilindro en una categoría con pocos tubos (ej. no-mixto) → confirmar que se ven 3 tubos completos sin recorte, y que se repiten en los offsets externos.
- Screenshot de la descripción → confirmar que el número aparece dentro de la línea de descripción.
- Screenshot a 1440×900 → confirmar que desktop no cambió.
