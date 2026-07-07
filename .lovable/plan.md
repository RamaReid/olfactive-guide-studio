## Objetivo
Hacer que el cilindro de tubos en `TubeRack.tsx` rote más rápido al usar la rueda del mouse, sin cambiar la estructura visual ni el diseño.

## Contexto actual
En `src/components/catalog-stage/TubeRack.tsx` la rotación con rueda del mouse está controlada por:

- `wheelThrottleMs = 260` — tiempo mínimo entre giros.
- `wheelDeltaThreshold = 4` — delta mínimo del wheel para registrar un giro.
- `centerSettleDelayMs = 620` — duración de la animación de asentamiento del tubo central.
- Cada evento de wheel válido avanza o retrocede **un solo tubo**.

## Cambios propuestos para acelerar el movimiento
1. **Reducir `wheelThrottleMs`** de `260` a `120` ms para permitir giros más seguidos.
2. **Reducir `wheelDeltaThreshold`** de `4` a `2` para que movimientos pequeños de rueda también roten el cilindro.
3. **Agregar multiplicador de velocidad** basado en la intensidad del wheel:
   - Suave: 1 tubo.
   - Moderado: 2 tubos.
   - Fuerte: 3 tubos.
4. **Reducir `centerSettleDelayMs`** de `620` a `420` ms para que la animación de centrado termine más rápido.

## Verificación
- Ejecutar `bun run build`.
- Probar con Playwright en desktop (viewport 1280×1800) sobre `/perfumes` o `/perfumes/dia`, simulando eventos `wheel` de distinta intensidad.
- Confirmar que:
  - El cilindro rota más rápido.
  - Movimientos fuertes de rueda avanzan más de un tubo.
  - El scroll vertical de la página sigue funcionando fuera del área del cilindro.
  - No hay errores de consola.

## Archivos a modificar
- `src/components/catalog-stage/TubeRack.tsx`