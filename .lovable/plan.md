## Análisis (lenguaje proyectual + Gestalt)

**Diagnóstico de la captura actual:**

1. **Proximidad rota** — los tubos están separados verticalmente porque `stageHeight` del `.tube-cylinder-shell` crece hasta ocupar toda la columna (~324px). El componente calcula la separación entre tubos como `radiusY = stageHeight * 0.44` (ver `TubeRack.tsx`, `getTubeCylinderState`). Cuanto más alto el shell, más lejos quedan los tubos entre sí → se pierde la lectura de "grupo/cilindro" y aparecen como piezas sueltas.

2. **Alineación quebrada** — la descripción vive centrada debajo del cilindro (`text-align: center`, en flujo). Rompe el eje vertical del contenido: no hay una línea invisible que unifique la "N" de Nº7 con la "L" de Floral y con el borde izquierdo del tubo visible. Falta el principio de **alineación común**.

3. **Continuidad interrumpida** — texto y cilindro están separados por padding vertical. En el diseño desktop la descripción está anclada a la **base** del cilindro (bottom-inside), no debajo. Compartir la línea base los convierte en una sola unidad visual (Gestalt: figura única, no dos figuras apiladas).

4. **Equilibrio** — el cilindro estirado con espacio muerto en el medio + descripción flotando sin ancla = peso visual mal distribuido. Se resuelve reduciendo la altura del cilindro (más densidad de tubos = más peso perceptivo del grupo) y bajando el texto al zócalo del mismo.

**Conclusión:** el home intermedio debe replicar la lógica **desktop** (dos columnas 55/45, descripción absolute anclada a la base interna del cilindro y alineada por el borde izquierdo del tubo visible), simplemente con **menos texto** (solo Nº + descriptor).

---

## Cambios (solo `src/index.css`)

### 1. Volver al layout tipo desktop en el rango intermedio

Reemplazar el grid 1fr/1fr por el mismo grid 55/45 del desktop:

```css
.catalog-stage {
  grid-template-columns: minmax(0, 55fr) minmax(0, 45fr);
  grid-template-rows: 1fr;
  column-gap: 0;
  padding: 0;
  height: min(100svh, 520px);
  min-height: min(100svh, 380px);
  max-height: 520px;
}
```

- `.selector-visual-stage` → columna 1 (botellas), como en desktop.
- `.selector-panel` → columna 2 (tubos + descripción), como en desktop.
- `.line-indicator { display: none }` — se mantiene (menos texto).

### 2. Cilindro más compacto para aumentar proximidad entre tubos

Bajar la altura útil del `.tube-cylinder-shell` fuerza a `getTubeCylinderState` a calcular un `radiusY` menor → tubos más juntos, cilindro más denso:

```css
.selector-panel {
  align-items: center;
  justify-content: center;
  padding: clamp(48px, 8vw, 72px) clamp(18px, 3vw, 32px)
           clamp(24px, 4vw, 40px);
}

.tube-cylinder-shell {
  --tube-item-width: clamp(220px, 28vw, 320px);
  --tube-visual-half-width: clamp(110px, 14vw, 160px);
  height: clamp(260px, 38vh, 340px);   /* antes ocupaba 100% ≈ 500px */
  min-height: 0;
  max-height: 100%;
}
```

Efecto: `radiusY ≈ 340 * 0.44 = 150px` (antes ~230px). La distancia vertical entre tubos consecutivos cae de ~40px a ~26px. Grupo perceptible como un único cilindro.

### 3. Descripción anclada a la base del cilindro, alineada al borde izquierdo del tubo

Volver a usar el mismo posicionamiento del desktop (líneas 669-684 de `index.css`), pero con menos contenido:

```css
.catalog-stage .active-tube-description {
  position: absolute;
  left: calc(50% - var(--tube-visual-half-width));
  bottom: clamp(12px, 3vh, 24px);
  z-index: 260;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-align: left;
  gap: 4px;
  max-width: min(80%, 320px);
  pointer-events: none;
}
```

- `left: calc(50% - var(--tube-visual-half-width))` → la "N" de Nº7 y la "F" de Floral quedan exactamente sobre la vertical del borde izquierdo del tubo central. Alineación común activada.
- `bottom` reducido → la base del texto comparte línea con la base visual del cilindro. Figura unificada.
- `align-items: flex-start` + `text-align: left` → todas las líneas comparten la misma vertical izquierda.

### 4. Solo Nº + descriptor (menos texto que desktop)

```css
.catalog-stage .active-tube-description .active-tube-meta,
.catalog-stage .active-tube-description p,
.catalog-stage .active-tube-description span:not(.active-tube-number) {
  display: none;
}

.catalog-stage .active-tube-description .active-tube-number {
  display: block;
  font-size: clamp(20px, 2.6vw, 28px);
  line-height: 1;
}

.catalog-stage .active-tube-description strong {
  display: block;
  font-size: clamp(18px, 2.2vw, 26px);
  line-height: 1.05;
}
```

Dos líneas exactas: `Nº7` / `Floral oriental dulce`.

### 5. Limpieza

Eliminar del bloque intermedio actual:
- `flex-direction: column` y `gap` de `.selector-panel` (vuelve al desktop).
- `height: auto`, `flex: 0 0 auto` y `padding` centrado de `.active-tube-description`.
- Overrides que ponían la descripción en el flujo debajo del cilindro.

### 6. Chrome (sin cambios)

`.floating-header`, `.ommi-cookie-bar` y grids de secciones a 3 columnas: se mantienen igual que hoy.

---

## Verificación (Playwright)

Capturas a: **844×390** (mobile landscape), **768×1024** (tablet portrait), **1024×600** (tablet landscape), **820×1180**, más **375×667** y **1440×900** como control.

Checklist visual en cada una:
1. Layout 55/45 (botellas izq, cilindro tubos der), sin chips.
2. Tubos visiblemente **más juntos** que en la captura actual — se lee como un cilindro, no como tubos sueltos.
3. `Nº7` y `Floral oriental dulce` **alineados a la izquierda** entre sí, sobre la vertical del borde izquierdo del tubo central.
4. La base del texto **comparte línea horizontal** con la base del cilindro (bottom inside, no debajo).
5. Sin descripción larga ni meta.
6. Desktop y mobile portrait sin cambios.

## Archivos

- `src/index.css` — único archivo. Sin cambios en componentes ni data.