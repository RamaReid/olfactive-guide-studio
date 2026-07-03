
# Plan Fase 1 OMMI — Home madre + sistema visual

Ejecutar únicamente la Fase 1. Fase 2 y Fase 3 quedan como rutas placeholder navegables (título + copy corto + link a home) para que Navbar no rompa; sin desarrollo real.

## 1. `src/styles.css` — sistema OMMI
- Reemplazar tokens shadcn por paleta OMMI en `oklch`, manteniendo `@theme inline` + `:root`.
- Globales: `--background` marfil `#F5EFE4`, `--background-alt` `#EFE3D2`, `--foreground` `#151515`, `--muted-foreground` `#5F564C`, `--graphite` `#242424`, `--gold` `#B89455`, `--amber` `#C47A32`, `--teal` `#0E4B4A`, `--divider` `#D7C7AD`, `--warm-white` `#FFF9EF`.
- Por línea (4 vars cada una: bg/alt/accent/deep) para Día, Noche, Piel, Firma, Regalo con las paletas del brief.
- Registrar en `@theme inline` como `--color-dia-bg`, etc. → utilities `bg-dia-bg`, `text-noche-deep`, `border-regalo-accent`.
- Tipografía: `--font-display` Cormorant Garamond, `--font-sans` Inter, `--radius: 0.25rem`.
- Utilities: `.hairline`, `.hairline-gold`, `.section-y`, `.container-ommi`, `.tracking-ui`.
- Fondo body → marfil, texto → carbón, borders → divider.

## 2. Fuentes y `__root.tsx`
- Head: preconnect + stylesheet Google Fonts (Cormorant Garamond 500/600 + Inter 400/500) vía `<link>`, meta title/description/og OMMI ("OMMI — Casa de fragancias" / "Fragancias de alta concentración organizadas por momento, intensidad y estilo. Probá antes de elegir.").
- Layout: `<Navbar />` + `<Outlet />` + `<Footer />` + `<WhatsAppFloat />` dentro de QueryClientProvider.

## 3. `src/data/`
Solo lo necesario para la home:
- `lines.ts` — 5 líneas (Día, Noche, Piel, Firma, Regalo) con nombre, descripción, tags, iconKey, paleta tokens.
- `products.ts` — 8 productos con schema completo del brief (N°41, 44, 81, 40, 43, 10, 5, 13).
- `discoverySets.ts` — 7 kits (schema completo del brief); la home usará 3.
- `trust.ts` — 6 TrustCards.

`finderQuestions.ts` no se crea en esta fase (Finder es placeholder).

## 4. Componentes OMMI (`src/components/ommi/`)
- `BlueprintDecor.tsx` — SVG frasco trazo fino opacity 0.08, para hero y fondos.
- `BottleMock.tsx` — placeholder editorial del frasco OMMI: botella rectangular, vidrio grueso, etiqueta sobria con N°, tapa geométrica; variante con caja rígida. Props: `number`, `line`, `variant?: 'bottle' | 'boxed'`, `size?`.
- `LineIcon.tsx` — 5 SVG propios inline (sol bajo, luna, línea orgánica/huella, sello monograma, caja).
- `LineCard.tsx` — fondo con paleta de la línea, LineIcon, nombre, descripción, 3 tags, CTA "Explorar línea".
- `ScentScale.tsx` — 5 segmentos finos, activos `--gold`, inactivos opacidad baja, label.
- `ProductCard.tsx` — BottleMock, N°, chip línea, familia, ScentScale intensidad, duración, uso, precio 100 ml + decant, CTAs "Ver fragancia" / "Probar en decant".
- `TrustCard.tsx` — ícono lineal (lucide) + título + copy sobrio, sobre fondo grafito/teal.
- `DiscoverySetCard.tsx` — nombre, placeholder caja SVG, decants, perfil, ocasión, "Incluye guía + cupón", CTAs "Elegir este set" / "Ver fragancias incluidas".

## 5. Layout global (`src/components/layout/`)
- `Navbar.tsx` — sticky, marfil translúcido con hairline inferior, logo OMMI display, links (Fragancias, Líneas dropdown, Discovery, Regalo, Seguridad), CTA Finder, carrito mock con contador (0). Sheet en mobile.
- `Footer.tsx` — 4 columnas sobrias: OMMI / Fragancias / Ayuda / Legal.
- `SectionShell.tsx` — variantes `light | alt | graphite | teal | champagne`; controla fondo, color de texto, padding vertical y max-width.
- `WhatsAppFloat.tsx` — botón discreto abajo-derecha con label "Soporte", sin popup.

## 6. `/` Home (pieza madre)
Secciones con `SectionShell`:
1. **Hero editorial** — split desktop: texto izq (título Cormorant 72–96 "Encontrá tu fragancia OMMI", subtítulo del brief, CTAs "Encontrar mi OMMI" + "Ver Discovery Sets") / composición BottleMock + BlueprintDecor der. Fila hairline con microbeneficios (Extrait de Parfum, Decants, Trazabilidad por lote, Compra segura).
2. **Elegí por momento** — grid 5 `LineCard`.
3. **Probá antes de elegir** — fondo champagne, 3 `DiscoverySetCard` (Día, Noche, Regalo Seguro) + CTA "Ver todos los Discovery Sets".
4. **Calidad visible. Confianza verificable.** — fondo grafito, grid `TrustCard`.
5. **Fragancias destacadas** — tabs OMMI (Día/Noche/Piel/Firma/Regalo) con `ProductCard` grid.
6. **No compres a ciegas** — CTA final al Finder.

Head propio con title/description/og únicos.

## 7. Rutas placeholder navegables
Crear archivos mínimos (title serif + copy corto "En construcción" + link "Volver a Home"), con `head()` único, para que los links del Navbar no rompan:
- `finder.tsx`
- `fragancias.index.tsx`
- `fragancias.$id.tsx`
- `discovery-sets.tsx`
- `regalo.tsx`
- `seguridad-y-trazabilidad.tsx`
- `guia-olfativa.tsx`

## Reglas transversales
- Solo tokens semánticos OMMI. Nada de `text-white`/`bg-black`/`bg-yellow`/`text-gray-*` hardcoded.
- Mobile first, `max-w-[1280px]`, paddings 20/64/96.
- `lucide-react` solo para utilitarios; los 5 íconos de línea son SVG propios.
- Sin banners rojos, popups, degradados neón, mármol, brillos exagerados, frascos ajenos, "Inspired by" como eje.

## Fuera de alcance de esta fase
Finder funcional, catálogo con filtros, ficha de producto detallada, discovery sets extendido, páginas de soporte con contenido real, backend, checkout, fotos reales.

## Criterio de aceptación
- Al abrir `/`, se percibe OMMI como casa de fragancias accesible con arquitectura propia, líneas diferenciadas, discovery sets y confianza verificable.
- Las 5 líneas se distinguen visualmente sin romper la familia OMMI.
- Navbar, Footer, WhatsAppFloat presentes y consistentes.
- Todas las rutas del Navbar responden (aunque secundarias sean placeholder).
- Sin errores TypeScript ni imports rotos.
