## Diagnóstico

No es solo renderizado. Cuando el cilindro rota, los tubos periféricos viajan verticalmente hasta ~`stageHeight * 0.44` px desde el centro (fórmula en `getTubeCylinderState` de `TubeRack.tsx`). En mobile el shell mide ~360-460px de alto, así que los tubos en tránsito recorren ±200px y se salen del área visible del cilindro (y del row del grid `.catalog-stage: minmax(0, 55svh)`), aunque en reposo el central se ve completo.

Además, en tránsito el tubo central baja de `scale 1.1` a `baseScale`, lo que refuerza la sensación de "no está completo".

## Cambios

### 1. `src/components/catalog-stage/TubeRack.tsx` — radio responsivo

En `getTubeCylinderState`, aceptar un segundo parámetro `isCompactViewport: boolean` (o leer `window.innerWidth`) y reducir el radio vertical y la rotación en mobile:

- `radiusY` compact: `Math.min(Math.max(120, stageHeight * 0.28), stageHeight * 0.32)` (antes 0.44-0.46).
- `radiusZ` compact: `Math.max(110, stageHeight * 0.14)`.
- `rotateX` compact: `-angleDeg * 0.35` (antes 0.55) para que los tubos periféricos no se inclinen tanto y no crezcan hacia afuera.
- Mantener `scale` central `1.1` en reposo; en tránsito subir el `baseScale` mínimo del centro a `0.9` para que nunca se vea "cortado" mientras rota.

Detectar viewport con un pequeño `useEffect` + `matchMedia('(max-width: 640px)')` guardado en state (`isCompact`), y pasarlo a `getTubeCylinderState`.

### 2. `src/index.css` — asegurar que no clipea ningún ancestro en mobile

Dentro de `@media (max-width: 640px)`:
- `.catalog-stage { overflow: visible; }` para que el row del grid no recorte el cilindro cuando los tubos viajan.
- `.tube-cylinder-shell` sube `min-height` a `clamp(400px, 100vw, 520px)` para dar aire vertical al recorrido reducido.
- Confirmar `overflow: visible` en `.tube-cylinder-stage` y `.tube-cylinder-track` (ya está).

### 3. Sin cambios en desktop

Los ajustes de radio/rotación/scale sólo se aplican cuando `isCompact` es `true`. Desktop conserva la fórmula original.

## Verificación

Playwright 390×844:
- Screenshot inicial del cilindro en reposo (central completo).
- Simular scroll/rueda sobre el cilindro para forzar rotación y capturar mid-transition → confirmar que el tubo central sigue completo y los vecinos no se cortan arriba/abajo.
- Screenshot 1440×900 → confirmar desktop sin cambios.
