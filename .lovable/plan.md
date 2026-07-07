## Objetivo

En el rango intermedio (teléfono landscape + tablet portrait + tablet landscape, 641–1120px) el `CatalogStage` se comporta como si fuera un móvil apaisado: mismo alto de contenedor, mismos cilindros a esa escala, y descripción corta (solo Nº y descriptor) debajo del cilindro derecho. El resto de la página fluye normalmente debajo.

## Cambios (solo `src/index.css`, aditivos)

### 1. Contenedor con altura tipo móvil apaisado

Dentro del media intermedio, forzar:

```css
.catalog-stage {
  height: clamp(360px, 56vw, 440px);   /* proporción ~mobile landscape */
  min-height: clamp(360px, 56vw, 440px);
  max-height: 440px;
  aspect-ratio: auto;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  grid-template-rows: auto minmax(0, 1fr);
  padding: 48px 12px 12px;
  overflow: hidden;
}
```

Sale del `100svh` que hoy hace que en tablet el stage ocupe toda la pantalla. Debajo del stage la página sigue fluyendo (secciones, footer).

### 2. Cilindros acotados al alto del contenedor

- `.selector-visual-stage` (col 1) y `.selector-panel` (col 2) ocupan solo la fila 2, `height: 100%`, `overflow: hidden`.
- `.category-cylinder-shell { transform: scale(0.42); transform-origin: center }`.
- `.tube-cylinder-shell`:
  - `min-height: 0` (quitar el `min-height: clamp(...)` que hoy lo empuja).
  - `height: 100%`.
  - `--tube-item-width: clamp(100px, 20vw, 160px)`.
  - `--tube-visual-half-width: clamp(50px, 10vw, 80px)`.
  - Elimina la regla que lo hacía crecer de arriba a abajo del stage completo — ahora el stage ya no es 100svh.

### 3. Descripción corta: SOLO Nº + descriptor, debajo del cilindro derecho

Revertir el `position: absolute` que la ponía abajo-izquierda. Vuelve al flujo dentro de `.selector-panel`, justo debajo de `.tube-cylinder-shell`.

- `.selector-panel { position: relative; overflow: visible; flex-direction: column; justify-content: center; gap: 8px }`.
- `.tube-cylinder-shell { position: relative }` (volver al default).
- `.catalog-stage .active-tube-description`:
  - `position: static` (quitar absolute).
  - `text-align: center`, `padding: 4px 12px 0`, `gap: 2px`, `max-width: 100%`.

Ocultar todo lo que no sea número + descriptor:
```css
.catalog-stage .active-tube-description .active-tube-meta,
.catalog-stage .active-tube-description p,
.catalog-stage .active-tube-description span:not(.active-tube-number) {
  display: none;
}
.catalog-stage .active-tube-description .active-tube-number { display: block; font-size: clamp(16px, 2.4vw, 22px) }
.catalog-stage .active-tube-description strong { display: block; font-size: clamp(14px, 2vw, 20px) }
```

Queda:
```
Nº7
Floral oriental dulce
```

### 4. Sin chips de categoría

`.line-indicator { display: none }` — se mantiene.

### 5. Limpieza de overrides previos

Eliminar del bloque intermedio:
- `.catalog-stage > .selector-panel { position: static !important }`
- `.catalog-stage .tube-cylinder-shell { position: static !important }`
- Regla que estiraba `.active-tube-description` con `position: absolute; left: 12px; bottom: 12px; width: min(52%, 420px)`.

### 6. Grids de secciones (sin cambios respecto a lo ya hecho)

Se mantienen `.ommi-featured-grid`, `.ommi-explore-grid`, `.conjuntos-banner-list` a 3 columnas.

### 7. Chrome

`.floating-header` y `.ommi-cookie-bar` — sin cambios respecto a lo ya hecho.

## Verificación (Playwright)

Capturas a: 844×390 (mobile landscape referencia), 768×1024 (tablet portrait), 1024×600 (tablet landscape), 820×1180, y 375×667 + 1440×900 como control.

Chequear en cada una:
1. `.catalog-stage` alto ≈ 400px (no 100svh en tablet).
2. Cilindro izquierdo (botellas) y cilindro derecho (tubos) visibles completos lado a lado.
3. Debajo del cilindro derecho: solo "Nº7" y "Floral oriental dulce", centrado, 2 líneas.
4. Debajo del stage, la página sigue con las secciones (ommi-featured, explore, etc.) a 3 columnas.
5. Sin chips DÍA/NOCHE.
6. Mobile portrait 375×667 y desktop 1440×900 sin cambios.

## Archivos

- `src/index.css` — único archivo modificado. Sin cambios en componentes React ni en data.