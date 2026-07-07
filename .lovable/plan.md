## Problema real

En el sitio **publicado** (`ommirama.lovable.app`), todas las imágenes de `public/ommi_other/*.webp` que tienen **espacios o paréntesis en el nombre del archivo** devuelven **HTTP 404**. Por eso se ve el ícono de imagen rota:

- Cards destacados de la home ("Fragancias con presencia")
- Combo "OMMI 100 ml + 3 Decants" de la sección Conjuntos
- Video hero de `ExpandedOmmiSections` (poster)
- `InfoPage` (fallback a `OMMI Firma.webp`)
- Cajas por línea en `ProductPage`

En el preview local no se notaba porque Vite dev-server sí sirve archivos con espacios; el hosting estático de Lovable no.

## Solución

Renombrar los 10 archivos a slugs sin espacios ni paréntesis, corregir de paso el typo "Discobery" → "discovery", y actualizar todas las referencias.

### Renombres (`public/ommi_other/`)

```
OMMI Dia.webp                        → ommi-dia.webp
OMMI Noche.webp                      → ommi-noche.webp
OMMi Piel.webp                       → ommi-piel.webp
OMMI Firma.webp                      → ommi-firma.webp
OMMI Regalo.webp                     → ommi-regalo.webp
OMMI Discobery Set dia.webp          → ommi-discovery-set-dia.webp
OMMI Discobery Set Noche .webp       → ommi-discovery-set-noche.webp
OMMI Discobery Set piel.webp         → ommi-discovery-set-piel.webp
OMMI Discobery Set Firma (2).webp    → ommi-discovery-set-firma.webp
OMMI Discobery Set Regalo.webp       → ommi-discovery-set-regalo.webp
```

Los archivos `herointerno1.webp` y `herointerno2.webp` ya están bien.

### Referencias a actualizar

- `src/data/ommiCatalog.ts` — funciones que devuelven las rutas (`categoryAssetPath` para cajas de línea y `discoverySetAssetPath` para los sets), líneas 88–120.
- `src/components/sections/ExpandedOmmiSections.tsx` — `src` del `<img>` en el video hero (línea 119) y `poster` del `<video>` (línea 130).
- `src/components/sections/ConjuntosOmmiSection.tsx` — `bottleSrc` y `discoverySrc` del combo (líneas 16–17).
- `src/pages/InfoPage.tsx` — fallback `/ommi_other/OMMI Firma.webp` (línea 31).

Ninguna otra sección referencia estos archivos por ruta literal.

## Verificación

1. `bun run build` sin errores.
2. Playwright contra `http://localhost:8080/`: `Array.from(document.images).filter(i => i.complete && i.naturalWidth === 0)` debe quedar vacío tras scroll completo.
3. Después de publicar, repetir el check contra `https://ommirama.lovable.app/` — no debe haber 404 de imágenes.

## ¿Aplico este cambio?
