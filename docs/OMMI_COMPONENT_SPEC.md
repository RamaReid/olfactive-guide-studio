# OMMI Component Spec

## Component

`CatalogStage` es el componente madre de la home.

```text
CatalogStage
├─ AmbientBackground
├─ FloatingHeader
├─ CategoryPrism
├─ BottleAvatar
├─ PackageHint
├─ TubeRack
└─ LineIndicator
```

## State

```ts
activeLineId: OmmiLineId
activeFragranceId: string | null
isBottleBackVisible: boolean
isDraggingBottle: boolean
```

## Synchronization

Cuando cambia `activeLineId`, cambian botella-avatar, caja insinuada, fondo, paleta, prisma y grupo activo del rack.

Cuando el rack enfoca una fragancia de otra línea, `activeLineId` cambia y la botella central toma esa línea.

## Interactions

- Prisma: rota entre siete líneas espaciales.
- Botella: flota, tiene parallax, permite frente/espalda y navega por click sin drag.
- Rack: lista tubitos horizontales, detecta foco por scroll y actualiza la línea.
- Responsive inicial: desktop primero; en mobile, botella arriba y rack horizontal abajo.
