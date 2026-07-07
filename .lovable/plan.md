## Objetivo

Que las fotos del sitio (botellas, tubos, hero, secciones) se vean/carguen más rápido, sobre todo en mobile.

## Diagnóstico

Total actual de imágenes en `public/`: ~28 MB.

- `public/ommi_other/` → **23 MB** (los hero de línea/discovery: 140–300 KB cada uno).
- `public/ommi_bottle_number/` → 4.5 MB (~80–140 KB cada uno).
- `public/ommi_bottle_carrusel/` → 557 KB.
- `public/ommi_tubes_number/` → 754 KB (tubos ~30 KB, ya ok).

Aunque todo es `.webp`, en mobile 3G/4G se nota porque:

1. Los cards de secciones cargan hero grandes (200–300 KB) inmediatamente.
2. `BottleCarousel` y `LineIndicator` importan las 7 botellas de una vez.
3. `TubeRack` renderiza 13 `<img>` en el DOM aunque solo se vean 5–7.
4. Ningún `<img>` tiene `width`/`height` ni `decoding="async"`; el hero de portada no está *preloaded*.
5. Se sirven desde `public/`, sin CDN; cada request pasa por el servidor de la app.

## Plan de mejoras (en orden de impacto)

### 1. Recomprimir `public/ommi_other/` (mayor ganancia, ~15 MB menos)

Reencodear los `.webp` grandes a calidad ~72 con `cwebp`/`sharp`, apuntando a:

- Cards de secciones (hero de línea): máx 1200 px de ancho, ~80–120 KB.
- Hero interno (`herointerno1/2.webp`): máx 1600 px, ~120 KB.
- Discovery sets: máx 1200 px, ~100 KB.

Objetivo: bajar la carpeta de 23 MB → ~5 MB sin pérdida visible.

### 2. Migrar `public/` a CDN de Lovable Assets

Aplicar el skill `migrate-to-assets` sobre los `.webp` >100 KB. Beneficio:

- Se sirven desde CDN global con cache agresivo (mucho más rápido que el server actual).
- El repo baja de ~28 MB a casi nada.
- Se reemplazan referencias en `src/data/ommiCatalog.ts`, `src/data/ommiContent.ts` y componentes por punteros `.asset.json`.

### 3. Atributos de performance en todos los `<img>`

En `BottleAvatar`, `TubeRack`, `BottleCarousel`, `LineIndicator`, `CatalogShowcaseCard`, `ExpandedOmmiSections`, etc.:

- Añadir `width` y `height` explícitos (evita reflow y acelera decoding).
- `decoding="async"` en todos.
- `loading="lazy"` en los que están fuera del viewport inicial (secciones, cards).
- `fetchpriority="high"` en la botella activa del carrusel y el hero.

### 4. Preload del LCP

En `index.html`, agregar `<link rel="preload" as="image" href="..." fetchpriority="high">` para la botella activa inicial (Firma) y el hero de home, para que el navegador los pida en paralelo con el JS.

### 5. Reducir DOM de imágenes en `TubeRack`

`visibleOffsets` tiene 13 posiciones pero las de blur/opacidad baja no aportan. Bajar a 9 (offsets −4..+4) reduce ~30% de imágenes renderizadas por línea sin cambio visual perceptible, y las que quedan fuera se descargan on-demand cuando el usuario rota.

### 6. (Opcional) `srcset` responsive

Para los cards de sección generar 2 tamaños (mobile 640 px / desktop 1200 px) con `vite-imagetools` o pre-generados, y servir el correcto con `srcset` + `sizes`. Solo si tras 1–4 aún se ve lento en mobile.

## Verificación

- `bun run build` sin errores.
- Playwright con throttling: medir el peso total transferido en `/` antes/después (esperado: de ~5–7 MB inicial a <1.5 MB).
- Revisar en preview mobile que el carrusel y las secciones siguen viéndose iguales.
- Confirmar que no queda ningún `<img>` sin `decoding` o `width/height`.

## Archivos afectados (estimado)

- `public/ommi_other/*` (recomprimir + migrar a CDN).
- `public/ommi_bottle_number/*`, `public/ommi_bottle_carrusel/*` (migrar a CDN).
- `src/data/ommiCatalog.ts`, `src/data/ommiContent.ts` (rutas → `.asset.json`).
- `src/components/catalog-stage/*` (atributos `<img>`, reducir `visibleOffsets`).
- `src/components/sections/*` y `CatalogShowcaseCard.tsx` (`loading`, `decoding`, `width/height`).
- `index.html` (preloads del LCP, meta tags si aplica).

## Pregunta antes de implementar

¿Aplico los **6 pasos** completos, o preferís que arranque solo con los pasos **1 + 2 + 3 + 4** (los de mayor impacto, sin tocar `visibleOffsets` ni `srcset`)? 

 Solo 1+2+3+4