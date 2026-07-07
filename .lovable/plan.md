# Optimización de carga de imágenes OMMI

Sin tocar layout, textos, orden ni componentes visuales. Solo peso de assets, formato y atributos de carga.

## Diagnóstico

`public/` pesa ~200 MB y casi todo son PNG grandes servidos en la home:

| Carpeta | Peso | Uso en Home |
|---|---|---|
| `ommi_bottle_number/` | 74 MB | fichas de producto (no en home) |
| `ommi_other/` | 75 MB | Conjuntos, Destacados, Instagram, video |
| `ommi_tubes_number/` | 40 MB | `TubeRack` del CatalogStage |
| `ommi_bottle_carrusel/` | 13 MB | `BottleCarousel` del CatalogStage |
| `ommi_other/OMMI.mp4` | 20 MB | sección Instagram (fuera de viewport inicial) |

Ejemplos: `OMMI Discobery Set Noche .png` 8.3 MB, `OMMI Dia.png` 7.6 MB, cada botella ~1.9 MB, cada tubo ~1.6 MB. Solo hay 2 `.webp` en todo `public/`. Ningún `<img>` usa `loading="lazy"`.

## Cambios

### 1. Conversión masiva PNG → WebP (mismo nombre, misma ruta)

Script único con `cwebp` (vía `nix-shell -p libwebp`) recorriendo `public/ommi_bottle_carrusel`, `public/ommi_tubes_number`, `public/ommi_bottle_number`, `public/ommi_other`:

- `cwebp -q 82 -m 6 archivo.png -o archivo.webp` (calidad visual equivalente, ~85–90% menos peso).
- Se elimina el `.png` original tras verificar que el `.webp` existe y pesa > 0.
- Se conserva el nombre exacto (incluyendo espacios y mayúsculas) para que los helpers ya existentes sigan resolviendo la ruta con solo cambiar la extensión.
- `OMMI.mp4` no se toca (es video); se optimiza su carga en el paso 3.

### 2. Actualizar referencias a `.webp`

Reemplazar la extensión `.png` por `.webp` en los puntos donde se construye la URL, sin renombrar variables ni cambiar estructura:

- `src/data/ommiCatalog.ts`: helpers `bottleCarouselAssetPath`, `tubeAssetPath`, `bottleAssetPath`, y los `switch` de `linePresentationAsset` / `discoverySetAssetPath` (11 rutas de `ommi_other/*.png`).
- `src/components/sections/ConjuntosOmmiSection.tsx`: `bottleSrc`, `discoverySrc`.
- `src/components/sections/ExpandedOmmiSections.tsx`: `/ommi_other/OMMI%20Firma.png`.
- `src/pages/InfoPage.tsx`: fallback `/ommi_other/OMMI Firma.png`.
- `src/App.tsx`: las ~14 entradas `src: '/ommi_other/....png'`.

Total: sustitución textual `.png` → `.webp` acotada a esas rutas.

### 3. Atributos de carga

- `BottleCarousel` / `BottleAvatar`: la botella `position="active"` conserva carga eager (LCP). Las demás (`previous`, `next`) reciben `loading="lazy"` y `decoding="async"`.
- `TubeRack`: todas las imágenes de tubos → `loading="lazy"` `decoding="async"` (aparecen tras rotar/scroll).
- `ConjuntosOmmiSection` (banners + combo): `loading="lazy"` `decoding="async"`.
- `ExpandedOmmiSections` (featured cards, Instagram `OMMI Firma`): `loading="lazy"` `decoding="async"`.
- Video `OMMI.mp4`: añadir `preload="none"` y `poster` (usando el `.webp` de `OMMI Firma`) para no descargar 20 MB en la carga inicial. Sigue `autoPlay muted loop playsInline`; el navegador cargará el video al entrar en viewport / al reproducirse.
- `CatalogShowcaseCard` (páginas de catálogo, no home): `loading="lazy"` `decoding="async"` para no bloquear si se navega.

### 4. Verificación

- `bun run build` verde.
- Playwright a `http://localhost:8080/` (390×844 y 1440×900): screenshot para confirmar que la home se ve idéntica y no hay imágenes rotas.
- Grep final: `rg "\.png" src/ public/` no debe devolver referencias huérfanas dentro de `ommi_*`.
- Comparativa de peso: reportar `du -sh public/ommi_*` antes/después.

## Fuera de alcance

- Ningún cambio de layout, tipografía, colores, textos, orden de secciones ni de componentes.
- No se migra a Lovable Assets (CDN) en este plan: se mantiene todo servido desde `/public` con rutas absolutas como pide la instrucción 4.
- `ommi_bottle_number/` y `ommi_tubes_number/` se convierten igual porque se usan en fichas y en TubeRack (lazy), reduciendo peso futuro sin cambiar rutas.
