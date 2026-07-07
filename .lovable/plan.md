# Ajustes tablet: centrado del texto y blur de base

Dos cambios pequeños sobre `src/index.css`, solo dentro del breakpoint intermedio (tablet / mobile landscape). No se toca desktop ni mobile portrait.

## 1. Alinear "Nº7 / Floral oriental dulce" en la pantalla

Actualmente el bloque `.catalog-stage .active-tube-description` está anclado a `left: 0` del contenedor del cilindro (columna del 45%), con `align-items: flex-start` y `text-align: left`. Eso lo deja pegado a la izquierda del stage, no al centro del viewport.

Cambio: anclar el texto al centro horizontal de la pantalla.

- `left: 50%` 
- `right: auto`
- `align-items: flex-start` y `text-align: left`. 
- `text-align: left`
- Mantener `bottom: clamp(4px, 1vh, 12px)` (base del texto = base del tubo más bajo)
- Mantener tipografía y line-height actuales

Resultado: "Nº 7" y "Floral oriental dulce" quedan alinedos desde el centro a la derecha del viewport, alineados por la base con el cilindro.

## 2. Blur de base que se desvanece al 25% de altura

Añadir una capa de blur anclada a la base del contenedor mayor (`.catalog-stage`), que empieza sólida abajo y se disuelve hacia arriba, terminando al 25% de la altura del stage.

Implementación con pseudo-elemento sobre `.catalog-stage`:

```text
.catalog-stage::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 25%;                    /* 25% desde la base */
  pointer-events: none;
  z-index: 3;                     /* sobre los tubos, bajo el texto */
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  mask-image: linear-gradient(
    to top,
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,0) 100%
  );
  -webkit-mask-image: linear-gradient(
    to top,
    rgba(0,0,0,1) 0%,
    rgba(0,0,0,0) 100%
  );
}
```

Notas:

- `.catalog-stage` ya es `position: relative`.
- El texto `.active-tube-description` recibe `z-index: 4` para quedar sobre el blur y permanecer nítido.
- El blur solo cubre el 25% inferior; el resto del stage queda intacto.
- Se aplica únicamente dentro del media query del rango intermedio (mobile landscape / tablet), fuera de ese rango se resetea con `backdrop-filter: none` y `content: none`.

## Verificación

Playwright headless con capturas en:

- 844×390 (mobile landscape)
- 768×1024 (tablet portrait)
- 1024×600 (tablet landscape)
- 375×667 (mobile portrait, no debe cambiar)
- 1440×900 (desktop, no debe cambiar)

Checks visuales:

- Texto centrado en el eje horizontal del viewport.
- Base del texto tocando la base del tubo más bajo.
- Franja inferior con blur sólido en la base que se desvanece progresivamente hasta desaparecer al 25% de altura del stage.

## Archivos

- `src/index.css` (único archivo modificado)