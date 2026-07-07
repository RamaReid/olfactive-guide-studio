# Plan: Correcciones mobile consolidadas

## Alcance
Solo mobile (`@media (max-width: 640px)`). Desktop y tablet intactos.

## 1. Carrusel de botellas (infinito, 7 líneas)
- En `BottleCarousel.tsx`: agregar `data-distance={distance}` al botón.
- En `src/index.css` `@media (max-width: 640px)`: convertir el cilindro 3D en carrusel plano horizontal.
  - Card central (`data-distance="0"`): tamaño completo.
  - Dos cards vecinas (`data-distance="1"` y `"-1"`): asoman por detrás, más chicas, opacidad reducida, blur suave.
  - Resto: ocultas.
  - Loop infinito: se mantiene la lógica existente.

## 2. Ocultar LineIndicator en mobile
- `.line-indicator { display: none; }` dentro del mismo media query.
- Motivo: la categoría ya se lee en la etiqueta de la botella.

## 3. Cilindro de tubos más chico
- Reducir `--tube-item-width` a ~68vw y `min-height` del stage.
- Ocultar la referencia y la descripción larga; mostrar solo el número y la familia.
- Ocultar scrollbar horizontal del rack con `scrollbar-width: none` y `::-webkit-scrollbar { display: none }`.

## 4. Destacados: 2 cards por fila
- Cambiar `.ommi-featured-grid` a `grid-template-columns: repeat(2, minmax(0, 1fr))`.
- Reducir tipografía y padding interno proporcionalmente para respetar la forma del card de pantalla completa.

## Archivos a modificar
- `src/components/catalog-stage/BottleCarousel.tsx`
- `src/index.css`

## Verificación
Playwright a 390×844: screenshots de home completa, carrusel en 3 posiciones consecutivas, rack de tubos, sección Destacados. Screenshot 1440×900 para confirmar desktop sin cambios.
