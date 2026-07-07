# OMMI Asset Library Spec

## Folder Structure

```text
public/ommi-assets/
├─ lines/
│  ├─ dia/
│  ├─ noche/
│  ├─ piel/
│  ├─ firma/
│  ├─ regalo/
│  ├─ mixto/
│  └─ discovery/
├─ decants/
├─ backgrounds/
├─ textures/
├─ labels/
└─ ui/
```

## Line Assets

Cada línea debe poder recibir:

```text
bottle-front.webp
bottle-back.webp
bottle-left.webp
bottle-right.webp
box-hint.webp
line-texture.webp
```

## Decant Assets

Los tubitos se nombran con número, línea y descriptor corto:

```text
decants/n81-firma-ambarado-luminoso.webp
decants/n44-noche-dulce-especiado.webp
decants/n40-firma-aromatico-amaderado.webp
```

## Rules

- Usar `.webp` como formato principal.
- Mantener fondos y texturas separados de botellas y tubitos.
- La ausencia de una imagen no debe romper el componente; el prototipo usa placeholders CSS.
- Las imágenes deben reforzar confianza, recordación y elección.
