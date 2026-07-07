## Ajustes al layout intermedio

Tres cambios chicos sobre lo que ya está funcionando, todos en `src/index.css` dentro del media `@media (min-width: 641px) and (max-width: 1120px), (orientation: landscape) and (max-height: 500px) and (max-width: 1120px)`.

### 1. Stage con aspect-ratio 21/9

Reemplazar el `height: min(100svh, 520px)` por proporción cinemascope, calculada sobre el ancho:

```css
.catalog-stage {
  aspect-ratio: 21 / 9;
  height: auto;
  min-height: 0;
  max-height: min(100svh, 520px);   /* safety cap si el ancho fuera enorme */
}
```

Alto resultante por viewport:

- 768×1024 → stage 768×329
- 844×390 → stage 844×362 (encaja en 390svh)
- 1024×600 → stage 1024×439
- 820×1180 → stage 820×351

### 2. Texto alineado al borde izquierdo del contenedor del cilindro (x = 0)

Ahora la descripción usa `left: calc(50% - var(--tube-visual-half-width))` (borde del tubo central). Cambiar a `left: 0` del `.tube-cylinder-shell`:

```css
.catalog-stage .active-tube-description {
  left: 0;
  right: auto;
  padding-left: clamp(6px, 1.5vw, 16px);   /* respirar del borde del panel */
  align-items: flex-start;
  text-align: left;
}
```

Así "N" (de Nº7) y "F" (de Floral) comparten exactamente la vertical del borde izquierdo del contenedor del cilindro (el `.tube-cylinder-shell`), independiente de dónde estén los tubos individuales.

### 3. Base del texto = base del tubo más bajo

Con `aspect-ratio 21/9` y `.tube-cylinder-shell { height: clamp(240px, 38vh, 340px) }`, el tubo más bajo queda a `centerY + radiusY + tubeHalfHeight`. En el shell centrado dentro del panel, la base del tubo más bajo cae aproximadamente al 88-92 % del alto del shell.

Cambiar `bottom: clamp(10px, 2vh, 20px)` (que dejaba margen debajo del tubo) por un `bottom` calculado para que la línea base del texto toque la base visual del tubo:

```css
.catalog-stage .active-tube-description {
  bottom: clamp(4px, 1vh, 12px);   /* pega el texto al zócalo del cilindro */
}
```

Y como la descripción tiene `line-height: 1.05` en `strong`, la última línea (Floral oriental dulce) apoya su base contra el borde inferior del último tubo visible. Si en las capturas queda ligeramente arriba/abajo, ajusto el `bottom` fino después de verificar (rango 0-16px).

## Verificación (Playwright, sin cookie)

Capturas a: **844×390**, **768×1024**, **1024×600**, **820×1180**, más **375×667** y **1440×900** de control.

Chequeo por captura:

1. Alto del `.catalog-stage` = width × 9/21 (± 1px).
2. Debajo del stage la página fluye normal (Conjuntos, etc.).
3. `Nº7` y `Floral oriental dulce` comparten vertical izquierda pegada al borde izquierdo del `.tube-cylinder-shell` (x ≈ padding del panel).
4. La base de "Floral oriental dulce" toca la base del último tubo del cilindro (sin gap notable).
5. Desktop 1440 y mobile 375 sin cambios.

## Archivos

- `src/index.css` — único archivo. Sin cambios en componentes ni data.

el cilindro de las botellas aumentar 1.25 tamano