## Problema

En el rango intermedio (viewport ≈768px como el actual 768×674), las páginas internas de catálogo de línea (`/perfumes/firma`, `/perfumes/regalo`, etc.) están renderizando **todas las cards en una sola fila**, apretadas y cortadas. Deben mostrar **3 cards por fila**.

## Causa

`.catalog-card` tiene `grid-column: span 3` sobre un grid de 12 columnas, pero en el rango intermedio no hay override, así que el grid queda con 12 columnas de ~55px cada una y las cards se comprimen hasta caber todas en una fila.

## Solución (solo `src/index.css`)

### 1. Cards a 3 columnas en rango intermedio (solo páginas internas)

Dentro del bloque `@media (min-width: 641px) and (max-width: 1120px), ...` añadir:

```css
.placeholder-page .catalog-grid {
  grid-template-columns: repeat(3, minmax(0, 1fr));
}
.placeholder-page .catalog-card {
  grid-column: auto;
}
```

Se usa `grid-template-columns: repeat(3, …)` (más robusto que solo cambiar el span) y se acota con `.placeholder-page` — wrapper que envuelve todas las páginas internas y no existe en el home — para no afectar el destacado del home.

```text
Antes (intermedio, /perfumes/firma)     Después
[c c c c c c c c c c c c] 12/fila       [ c ][ c ][ c ]  3/fila
                                        [ c ][ c ][ c ]
                                        [ c ][ c ][ c ]
                                        [ c ][ c ][ c ]
```

### 2. Botella del cilindro ×1.25 (solo home, solo rango intermedio)

En el mismo media-query, para el home:

```text
Antes:   --tube-item-width: clamp(220px, 30vw, 320px);
Después: --tube-item-width: clamp(275px, 37.5vw, 400px);
```

## Fuera de alcance

- No se toca desktop, mobile portrait ni tablet estándar.
- No se toca el home (cards del destacado sin cambios).
- No se toca ningún componente TSX.

## Verificación

Playwright a 768×674:
- `/perfumes/firma`, `/perfumes/regalo`, `/perfumes`, `/audiencia/:id`, `/discovery`: 3 cards por fila, misma proporción y alineación.
- Home: botella claramente más grande; cards del destacado y resto del layout intactos.

Y en 1440×900 + 390×844: sin cambios.

## Archivos

- `src/index.css` (único archivo modificado).
