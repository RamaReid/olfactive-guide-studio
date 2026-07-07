Objetivo: que el bloque de texto "Nº7 / Floral oriental dulce" se posicione horizontalmente con respecto a la pantalla, partiendo del centro y creciendo hacia la derecha, sin cambiar el blur inferior que sigue anclado al stage.

Alcance: solo el rango intermedio (`@media (min-width: 641px) and (max-width: 1120px), (orientation: landscape) and (max-height: 500px) and (max-width: 1120px)`) en `src/index.css`.

Cambios propuestos
------------------

1. `.catalog-stage .active-tube-description`
   - Cambiar el anclaje horizontal de "centro del stage" a "centro de la pantalla":
     - `left: 50vw;` (borde izquierdo del bloque en el centro del viewport)
     - `right: clamp(16px, 3vw, 40px);` (el bloque ocupa desde el centro hasta el margen derecho de la pantalla)
     - `width: auto;`
     - eliminar `max-width: min(80%, 320px);` para que realmente crezca hasta el borde derecho
   - Mantener alineación del contenido a la izquierda dentro del bloque:
     - `align-items: flex-start;`
     - `text-align: left;`
   - Mantener la base del texto sobre el blur del stage:
     - `bottom: clamp(4px, 1vh, 12px);`
     - `z-index: 260;`
   - Conservar tipografía y elementos visibles (`Nº` y `strong`; ocultar meta/párrafos/spans extra).

2. `.catalog-stage::after` (blur inferior)
   - No se modifica: sigue cubriendo el 25% inferior del stage y se disuelve hacia arriba.

Diagrama del resultado esperado
````text
+---------------------------------------------+
|                    STAGE                    |
|                                             |
|        [botellas]        [tubos]          |
|                            Nº7              |
|                            FLORAL           |
|                            ORIENTAL         |
|                            DULCE            |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~ blur 25% ~~~~~~~|
+---------------------------------------------+
|<---------- 50vw ---------->|<-- texto ------|
````

Verificación
------------
- Capturas en viewports intermedios: 844×390, 768×1024 y 1024×600.
- Comprobar que el texto inicia en el centro horizontal de la pantalla y crece hacia la derecha, sin salirse del stage ni tapar los tubos de forma excesiva.
- Confirmar que el blur inferior no cambia de posición ni intensidad.