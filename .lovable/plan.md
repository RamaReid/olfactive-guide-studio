## Problema

En el rango intermedio la "botella" del home no cambió de tamaño. El cambio anterior tocó `--tube-item-width`, que controla los **tubos** de la columna derecha (`TubeRack`), no la **botella** de la columna izquierda (`BottleCarousel` → `.category-cylinder-shell`).

## Causa

La botella del cilindro está escalada por:

```css
/* src/index.css línea 2391-2394, dentro del media intermedio */
.category-cylinder-shell {
  transform: scale(0.375);
  transform-origin: center;
}
```

Ese `scale(0.375)` es lo que define su tamaño visible. `--tube-item-width` no la afecta.

## Solución (solo `src/index.css`, solo media intermedio)

1. Escalar la botella ×1.25:

```text
Antes:   transform: scale(0.375);
Después: transform: scale(0.469);   /* 0.375 × 1.25 */
```

2. Revertir el cambio previo de `--tube-item-width` a su valor original para dejar los tubos como estaban:

```text
Antes (actual): --tube-item-width: clamp(275px, 37.5vw, 400px);
Después:        --tube-item-width: clamp(220px, 30vw, 320px);
```

Los tubos vuelven a su tamaño original; solo crece la botella del cilindro.

## Fuera de alcance

- No se toca desktop, mobile portrait ni tablet estándar.
- No se toca la grid de cards (3 columnas en internas ya aplicada, se mantiene).
- No se toca ningún componente TSX.

## Verificación

Playwright a 768×674:
- Home: la botella del cilindro se ve claramente más grande (≈+25%). Tubos de la derecha sin cambios respecto al estado original.
- Internas (`/perfumes/firma`, etc.): sin regresión, 3 cards por fila intactas.

A 1440×900 y 390×844: sin cambios.

## Archivos

- `src/index.css` (único archivo modificado).
