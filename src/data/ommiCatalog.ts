export type OmmiLineId =
  | 'dia'
  | 'noche'
  | 'piel'
  | 'firma'
  | 'regalo'
  | 'mixto'
  | 'discovery'

export type OmmiEntryId = OmmiLineId

export type OmmiAudience = 'masculino' | 'femenino' | 'unisex'

export type OmmiLine = {
  id: OmmiEntryId
  name: string
  slug: string
  shortDescriptor: string
  olfactoryElements: string[]
  characterWords: string[]
  bottleAsset: string
  palette: {
    base: string
    primary: string
    secondary: string
    accent: string
    shadow: string
  }
  labelShape:
    | 'arc'
    | 'diagonal'
    | 'capsule'
    | 'seal'
    | 'ribbon'
    | 'split'
    | 'grid'
  assets: {
    bottleFront: string
    bottleBack: string
    bottleLeft: string
    bottleRight: string
    boxHint: string
    lineTexture: string
    bottleThreeQuarterLeft?: string
    bottleThreeQuarterRight?: string
    backgroundTexture?: string
  }
}

export type OmmiFragrance = {
  id: string
  number: string
  numericCode: number
  lineId: OmmiEntryId
  primaryEntryId: OmmiEntryId
  entryIds: OmmiEntryId[]
  categoryIds: OmmiEntryId[]
  audience: OmmiAudience
  slug: string
  family: string
  referenceName: string
  referenceBrand: string
  shortDescription: string
  descriptor: string
  inspiration: string
  notes: string
  status: string
  useCases: string[]
  inspirationText: string
  elements: string[]
  intensity: 'baja' | 'media' | 'alta'
  tubeAsset: string
  bottleAsset: string
  asset: {
    decantHorizontal: string
    bottleFront?: string
  }
}

const categoryAssetPath = (entryId: OmmiEntryId) =>
  `/ommi_bottle_carrusel/ommi_bottle_${entryId}.png`

const tubeAssetPath = (number: string) => `/ommi_tubes_number/t_N${number}.png`

const bottleAssetPath = (number: string) => `/ommi_bottle_number/b_N${number}.png`

const lineBoxAssetPath = (entryId: OmmiEntryId) => {
  switch (entryId) {
    case 'dia':
      return '/ommi_other/OMMI Dia.png'
    case 'noche':
      return '/ommi_other/OMMI Noche.png'
    case 'piel':
      return '/ommi_other/OMMi Piel.png'
    case 'firma':
      return '/ommi_other/OMMI Firma.png'
    case 'regalo':
      return '/ommi_other/OMMI Regalo.png'
    case 'mixto':
      return '/ommi_other/OMMI Firma.png'
    case 'discovery':
      return '/ommi_other/OMMI Discobery Set dia.png'
    default:
      return categoryAssetPath(entryId)
  }
}

export const discoverySetAssetPath = (entryId: OmmiEntryId) => {
  switch (entryId) {
    case 'dia':
      return '/ommi_other/OMMI Discobery Set dia.png'
    case 'noche':
      return '/ommi_other/OMMI Discobery Set Noche .png'
    case 'piel':
      return '/ommi_other/OMMI Discobery Set piel.png'
    case 'firma':
      return '/ommi_other/OMMI Discobery Set Firma (2).png'
    case 'regalo':
      return '/ommi_other/OMMI Discobery Set Regalo.png'
    default:
      return undefined
  }
}

const buildLineAssets = (entryId: OmmiEntryId): OmmiLine['assets'] => {
  const bottleAsset = categoryAssetPath(entryId)

  return {
    bottleFront: bottleAsset,
    bottleBack: bottleAsset,
    bottleLeft: bottleAsset,
    bottleRight: bottleAsset,
    boxHint: lineBoxAssetPath(entryId),
    lineTexture: bottleAsset,
    bottleThreeQuarterLeft: bottleAsset,
    bottleThreeQuarterRight: bottleAsset,
    backgroundTexture: bottleAsset,
  }
}

export const ommiLines: OmmiLine[] = [
  {
    id: 'dia',
    name: 'Día',
    slug: 'dia',
    shortDescriptor: 'Limpio, luminoso, activo',
    olfactoryElements: ['cítricos', 'té blanco', 'almizcle limpio'],
    characterWords: ['claro', 'ágil', 'fresco'],
    palette: {
      base: '#f7f1df',
      primary: '#f5c34b',
      secondary: '#7ac7b5',
      accent: '#ef7b45',
      shadow: '#53431e',
    },
    labelShape: 'arc',
    bottleAsset: categoryAssetPath('dia'),
    assets: buildLineAssets('dia'),
  },
  {
    id: 'noche',
    name: 'Noche',
    slug: 'noche',
    shortDescriptor: 'Denso, especiado, magnético',
    olfactoryElements: ['ámbar', 'cacao', 'maderas oscuras'],
    characterWords: ['intenso', 'seductor', 'profundo'],
    palette: {
      base: '#191216',
      primary: '#9b5c71',
      secondary: '#d28a43',
      accent: '#e7c07a',
      shadow: '#070507',
    },
    labelShape: 'diagonal',
    bottleAsset: categoryAssetPath('noche'),
    assets: buildLineAssets('noche'),
  },
  {
    id: 'piel',
    name: 'Piel',
    slug: 'piel',
    shortDescriptor: 'Íntimo, suave, cercano',
    olfactoryElements: ['almizcle', 'iris', 'madera cremosa'],
    characterWords: ['sutil', 'táctil', 'sereno'],
    palette: {
      base: '#efe3da',
      primary: '#c88f7a',
      secondary: '#d9b7a3',
      accent: '#7d6b63',
      shadow: '#3a2c28',
    },
    labelShape: 'capsule',
    bottleAsset: categoryAssetPath('piel'),
    assets: buildLineAssets('piel'),
  },
  {
    id: 'firma',
    name: 'Firma',
    slug: 'firma',
    shortDescriptor: 'Memorable, elegante, propio',
    olfactoryElements: ['resinas', 'bergamota', 'maderas pulidas'],
    characterWords: ['distintivo', 'preciso', 'persistente'],
    palette: {
      base: '#101716',
      primary: '#6bc5a7',
      secondary: '#d8c27a',
      accent: '#f2f0df',
      shadow: '#06100e',
    },
    labelShape: 'seal',
    bottleAsset: categoryAssetPath('firma'),
    assets: buildLineAssets('firma'),
  },
  {
    id: 'regalo',
    name: 'Regalo',
    slug: 'regalo',
    shortDescriptor: 'Seguro, amable, celebrable',
    olfactoryElements: ['frutas suaves', 'flores blancas', 'vainilla ligera'],
    characterWords: ['generoso', 'redondo', 'accesible'],
    palette: {
      base: '#f5edf3',
      primary: '#d66c96',
      secondary: '#87b7d8',
      accent: '#f2b84b',
      shadow: '#4f2a3a',
    },
    labelShape: 'ribbon',
    bottleAsset: categoryAssetPath('regalo'),
    assets: buildLineAssets('regalo'),
  },
  {
    id: 'mixto',
    name: 'Mixto',
    slug: 'mixto',
    shortDescriptor: 'Flexible, compartido, cambiante',
    olfactoryElements: ['pimienta rosa', 'cedro', 'cítrico verde'],
    characterWords: ['versátil', 'moderno', 'nítido'],
    palette: {
      base: '#18201d',
      primary: '#7aa873',
      secondary: '#8aa6c9',
      accent: '#f0d06d',
      shadow: '#07100b',
    },
    labelShape: 'split',
    bottleAsset: categoryAssetPath('mixto'),
    assets: buildLineAssets('mixto'),
  },
  {
    id: 'discovery',
    name: 'Discovery',
    slug: 'discovery',
    shortDescriptor: 'Explorar antes de elegir',
    olfactoryElements: ['muestras', 'contrastes', 'familias'],
    characterWords: ['curioso', 'comparativo', 'guiado'],
    palette: {
      base: '#111318',
      primary: '#7e91d6',
      secondary: '#d8a761',
      accent: '#e8e5d7',
      shadow: '#05060a',
    },
    labelShape: 'grid',
    bottleAsset: categoryAssetPath('discovery'),
    assets: buildLineAssets('discovery'),
  },
]

const buildDecantHorizontal = (
  number: string,
  entryId: OmmiEntryId,
  descriptor: string,
) => `/ommi-assets/decants/n${number}-${entryId}-${descriptor}.webp`

const fragrance = (
  fragranceData: Omit<
    OmmiFragrance,
    | 'numericCode'
    | 'categoryIds'
    | 'tubeAsset'
    | 'bottleAsset'
    | 'descriptor'
    | 'inspiration'
    | 'notes'
    | 'status'
    | 'lineId'
    | 'entryIds'
    | 'asset'
  > & {
    entryIds?: OmmiEntryId[]
    categoryIds?: OmmiEntryId[]
    status?: string
    asset?: {
      decantHorizontal: string
      bottleFront?: string
    }
  },
): OmmiFragrance => ({
  ...fragranceData,
  numericCode: Number(fragranceData.number),
  lineId: fragranceData.primaryEntryId,
  entryIds: fragranceData.entryIds ?? [fragranceData.primaryEntryId],
  categoryIds:
    fragranceData.categoryIds ??
    fragranceData.entryIds ??
    [fragranceData.primaryEntryId],
  tubeAsset: tubeAssetPath(fragranceData.number),
  bottleAsset: bottleAssetPath(fragranceData.number),
  descriptor: fragranceData.family,
  inspiration: `${fragranceData.referenceBrand} · ${fragranceData.referenceName}`,
  notes: fragranceData.elements.slice(0, 4).join(' · '),
  status: fragranceData.status ?? 'Disponible',
  asset: {
    decantHorizontal: tubeAssetPath(fragranceData.number),
    bottleFront: bottleAssetPath(fragranceData.number),
  },
})

export const ommiFragrances: OmmiFragrance[] = [
  fragrance({
    id: 'n1-my-way',
    number: '1',
    primaryEntryId: 'dia',
    entryIds: ['dia', 'firma', 'regalo'],
    audience: 'femenino',
    slug: 'my-way',
    family: 'Floral blanco luminoso',
    referenceName: 'My Way',
    referenceBrand: 'Giorgio Armani',
    shortDescription: 'Floral blanco luminoso con salida limpia.',
    useCases: ['día', 'oficina', 'eventos'],
    inspirationText: 'Floral blanco amable, moderno y expansivo.',
    elements: ['azahar', 'bergamota', 'tuberosa', 'jazmín', 'vainilla', 'cedro', 'almizcle blanco'],
    intensity: 'media',
    asset: { decantHorizontal: buildDecantHorizontal('1', 'dia', 'my-way') },
  }),
  fragrance({
    id: 'n2-la-vie-est-belle',
    number: '2',
    primaryEntryId: 'noche',
    entryIds: ['noche', 'firma', 'regalo'],
    audience: 'femenino',
    slug: 'la-vie-est-belle',
    family: 'Floral gourmand dulce',
    referenceName: 'La Vie Est Belle',
    referenceBrand: 'Lancôme',
    shortDescription: 'Floral gourmand dulce con iris y praliné.',
    useCases: ['salida', 'regalo', 'firma'],
    inspirationText: 'Dulzor reconocible con sensación de elegancia comercial.',
    elements: ['iris', 'pachuli', 'praliné', 'jazmín sambac', 'flor de azahar'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('2', 'noche', 'la-vie-est-belle') },
  }),
  fragrance({
    id: 'n3-good-girl',
    number: '3',
    primaryEntryId: 'noche',
    entryIds: ['noche', 'firma'],
    audience: 'femenino',
    slug: 'good-girl',
    family: 'Floral oriental dulce y oscuro',
    referenceName: 'Good Girl',
    referenceBrand: 'Carolina Herrera',
    shortDescription: 'Salida luminosa y secado profundo.',
    useCases: ['noche', 'cita', 'salida'],
    inspirationText: 'Contraste claro arriba y fondo oscuro en el secado.',
    elements: ['almendra', 'café', 'bergamota', 'limón', 'tuberosa', 'jazmín', 'azahar', 'rosa', 'tonka', 'cacao', 'vainilla'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('3', 'noche', 'good-girl') },
  }),
  fragrance({
    id: 'n4-scandal',
    number: '4',
    primaryEntryId: 'noche',
    entryIds: ['noche', 'firma'],
    audience: 'femenino',
    slug: 'scandal',
    family: 'Floral chipre gourmand',
    referenceName: 'Scandal',
    referenceBrand: 'Jean Paul Gaultier',
    shortDescription: 'Melosa, provocativa y de alta presencia.',
    useCases: ['salida', 'noche', 'clima fresco'],
    inspirationText: 'Una lectura dulce y melosa, con presencia alta.',
    elements: ['naranja sanguina', 'mandarina', 'miel', 'gardenia', 'azahar', 'jazmín', 'durazno', 'cera de abeja', 'caramelo', 'pachuli', 'regaliz'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('4', 'noche', 'scandal') },
  }),
  fragrance({
    id: 'n5-black-opium',
    number: '5',
    primaryEntryId: 'noche',
    entryIds: ['noche', 'firma'],
    audience: 'femenino',
    slug: 'black-opium',
    family: 'Vainilla café floral',
    referenceName: 'Black Opium',
    referenceBrand: 'Yves Saint Laurent',
    shortDescription: 'Nocturno, adictivo y urbano.',
    useCases: ['salida', 'bar', 'invierno'],
    inspirationText: 'Un perfil dulce y energético, pensado para la noche.',
    elements: ['pera', 'pimienta rosa', 'azahar', 'café', 'jazmín', 'almendra amarga', 'regaliz', 'vainilla', 'pachuli', 'cachemira', 'cedro'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('5', 'noche', 'black-opium') },
  }),
  fragrance({
    id: 'n6-jadore',
    number: '6',
    primaryEntryId: 'dia',
    entryIds: ['dia', 'firma', 'regalo'],
    audience: 'femenino',
    slug: 'jadore',
    family: 'Gran floral luminoso',
    referenceName: "J'adore",
    referenceBrand: 'Dior',
    shortDescription: 'Floral elegante, luminoso y clásico.',
    useCases: ['día', 'evento', 'regalo'],
    inspirationText: 'Una floralidad solar con presencia limpia.',
    elements: ['ylang-ylang', 'rosa damascena', 'jazmín grandiflorum', 'jazmín sambac'],
    intensity: 'media',
    asset: { decantHorizontal: buildDecantHorizontal('6', 'dia', 'jadore') },
  }),
  fragrance({
    id: 'n7-flowerbomb',
    number: '7',
    primaryEntryId: 'firma',
    entryIds: ['firma', 'regalo', 'noche'],
    audience: 'femenino',
    slug: 'flowerbomb',
    family: 'Floral oriental dulce',
    referenceName: 'Flowerbomb',
    referenceBrand: 'Viktor&Rolf',
    shortDescription: 'Floral intenso, dulce y reconocible.',
    useCases: ['firma', 'regalo', 'salida'],
    inspirationText: 'Una presencia floral dulce con buena proyección social.',
    elements: ['té', 'bergamota', 'osmanto', 'orquídea', 'jazmín', 'rosa', 'fresia', 'flor de naranjo', 'pachuli', 'almizcle', 'vainilla'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('7', 'firma', 'flowerbomb') },
  }),
  fragrance({
    id: 'n8-olympea',
    number: '8',
    primaryEntryId: 'noche',
    entryIds: ['noche', 'piel', 'firma'],
    audience: 'femenino',
    slug: 'olympea',
    family: 'Vainilla salada floral',
    referenceName: 'Olympea',
    referenceBrand: 'Rabanne',
    shortDescription: 'Salino, cálido y pegado a piel.',
    useCases: ['noche', 'verano nocturno', 'firma'],
    inspirationText: 'Una textura sensual con sal y vainilla bien marcadas.',
    elements: ['jazmín de agua', 'mandarina verde', 'flor de jengibre', 'vainilla', 'sal', 'ámbar gris', 'cachemira', 'sándalo'],
    intensity: 'media',
    asset: { decantHorizontal: buildDecantHorizontal('8', 'noche', 'olympea') },
  }),
  fragrance({
    id: 'n9-lady-million',
    number: '9',
    primaryEntryId: 'noche',
    entryIds: ['noche', 'firma', 'regalo'],
    audience: 'femenino',
    slug: 'lady-million',
    family: 'Floral frutal con miel',
    referenceName: 'Lady Million',
    referenceBrand: 'Rabanne',
    shortDescription: 'Brillante, glamoroso y dulce.',
    useCases: ['noche', 'regalo', 'salida'],
    inspirationText: 'Un perfil de brillo alto con dulzor y presencia.',
    elements: ['frambuesa', 'neroli', 'limón de Amalfi', 'jazmín', 'flor de azahar', 'gardenia', 'miel blanca', 'pachuli', 'ámbar'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('9', 'noche', 'lady-million') },
  }),
  fragrance({
    id: 'n10-flower',
    number: '10',
    primaryEntryId: 'piel',
    entryIds: ['piel', 'dia', 'regalo'],
    audience: 'femenino',
    slug: 'flower',
    family: 'Floral empolvado',
    referenceName: 'Flower',
    referenceBrand: 'Kenzo',
    shortDescription: 'Suave, limpio y empolvado.',
    useCases: ['día', 'piel', 'regalo'],
    inspirationText: 'Pensado para una presencia suave y poco invasiva.',
    elements: ['rosa damascena', 'mandarina', 'violeta', 'vainilla', 'almizcles blancos'],
    intensity: 'baja',
    asset: { decantHorizontal: buildDecantHorizontal('10', 'piel', 'flower') },
  }),
  fragrance({
    id: 'n11-212-woman',
    number: '11',
    primaryEntryId: 'dia',
    entryIds: ['dia', 'piel', 'regalo'],
    audience: 'femenino',
    slug: '212-woman',
    family: 'Floral amaderado almizclado urbano',
    referenceName: '212 Woman',
    referenceBrand: 'Carolina Herrera',
    shortDescription: 'Fresco, limpio y urbano.',
    useCases: ['oficina', 'diario', 'regalo'],
    inspirationText: 'Una floral urbana con un fondo limpio y versátil.',
    elements: ['azahar', 'flor de cactus', 'bergamota', 'mandarina', 'lirio', 'fresia', 'gardenia', 'jazmín', 'camelia', 'muguet', 'rosa', 'peonía', 'almizcle', 'sándalo'],
    intensity: 'media',
    asset: { decantHorizontal: buildDecantHorizontal('11', 'dia', '212-woman') },
  }),
  fragrance({
    id: 'n12-nina',
    number: '12',
    primaryEntryId: 'dia',
    entryIds: ['dia', 'regalo'],
    audience: 'femenino',
    slug: 'nina',
    family: 'Frutal dulce juvenil',
    referenceName: 'Nina',
    referenceBrand: 'Nina Ricci',
    shortDescription: 'Fresco-dulce, amable y juvenil.',
    useCases: ['día', 'primavera', 'regalo'],
    inspirationText: 'Busca una salida frutal con dulzor fácil de usar.',
    elements: ['limón', 'lima', 'gardenia', 'manzana caramelizada', 'praliné', 'peonía', 'cedro', 'almizcle blanco'],
    intensity: 'media',
    asset: { decantHorizontal: buildDecantHorizontal('12', 'dia', 'nina') },
  }),
  fragrance({
    id: 'n13-light-blue',
    number: '13',
    primaryEntryId: 'dia',
    entryIds: ['dia', 'piel', 'regalo'],
    audience: 'femenino',
    slug: 'light-blue',
    family: 'Cítrico frutal fresco',
    referenceName: 'Light Blue',
    referenceBrand: 'Dolce&Gabbana',
    shortDescription: 'Mediterráneo, limpio y veraniego.',
    useCases: ['calor', 'oficina', 'uso diario'],
    inspirationText: 'Una lectura fresca y liviana con aire de verano.',
    elements: ['limón siciliano', 'manzana', 'cedro', 'campanilla', 'bambú', 'jazmín', 'rosa blanca', 'almizcle', 'ámbar'],
    intensity: 'baja',
    asset: { decantHorizontal: buildDecantHorizontal('13', 'dia', 'light-blue') },
  }),
  fragrance({
    id: 'n14-212-vip-rose',
    number: '14',
    primaryEntryId: 'dia',
    entryIds: ['dia', 'regalo', 'noche'],
    audience: 'femenino',
    slug: '212-vip-rose',
    family: 'Floral frutal espumante',
    referenceName: '212 VIP Rosé',
    referenceBrand: 'Carolina Herrera',
    shortDescription: 'Chispeante, social y ligero.',
    useCases: ['día', 'salida', 'regalo'],
    inspirationText: 'Un floral frutal festivo que sigue liviano.',
    elements: ['champagne rosé', 'pimienta rosa', 'flor de durazno', 'rosa', 'almizcle blanco', 'maderas'],
    intensity: 'media',
    asset: { decantHorizontal: buildDecantHorizontal('14', 'dia', '212-vip-rose') },
  }),
  fragrance({
    id: 'n40-sauvage',
    number: '40',
    primaryEntryId: 'firma',
    entryIds: ['firma', 'dia', 'noche'],
    audience: 'masculino',
    slug: 'sauvage',
    family: 'Aromático fresco ambarado',
    referenceName: 'Sauvage',
    referenceBrand: 'Dior',
    shortDescription: 'Masculino, fresco, potente y reconocible.',
    useCases: ['firma', 'día', 'noche'],
    inspirationText: 'Una firma masculina amplia, limpia y proyectiva.',
    elements: ['bergamota de Calabria', 'pimienta', 'ambroxan', 'vainilla'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('40', 'firma', 'sauvage') },
  }),
  fragrance({
    id: 'n41-acqua-di-gio',
    number: '41',
    primaryEntryId: 'dia',
    entryIds: ['dia', 'piel', 'regalo'],
    audience: 'masculino',
    slug: 'acqua-di-gio',
    family: 'Acuático aromático',
    referenceName: 'Acqua di Giò',
    referenceBrand: 'Giorgio Armani',
    shortDescription: 'Fresco, limpio y cotidiano.',
    useCases: ['calor', 'oficina', 'uso diario'],
    inspirationText: 'Un acuático mediterráneo clásico y funcional.',
    elements: ['notas marinas', 'bergamota', 'cítricos', 'jazmín', 'romero', 'cedro', 'almizcle blanco', 'pachuli'],
    intensity: 'media',
    asset: { decantHorizontal: buildDecantHorizontal('41', 'dia', 'acqua-di-gio') },
  }),
  fragrance({
    id: 'n42-invictus',
    number: '42',
    primaryEntryId: 'dia',
    entryIds: ['dia', 'noche', 'regalo'],
    audience: 'masculino',
    slug: 'invictus',
    family: 'Acuático amaderado deportivo',
    referenceName: 'Invictus',
    referenceBrand: 'Rabanne',
    shortDescription: 'Energético, juvenil y fácil de usar.',
    useCases: ['día', 'gimnasio', 'salida informal'],
    inspirationText: 'Un perfil fresco con secado dulce-amaderado.',
    elements: ['notas marinas', 'pomelo', 'mandarina', 'laurel', 'jazmín', 'ámbar gris', 'madera de guayaco', 'musgo de roble', 'pachuli'],
    intensity: 'media',
    asset: { decantHorizontal: buildDecantHorizontal('42', 'dia', 'invictus') },
  }),
  fragrance({
    id: 'n43-aventus',
    number: '43',
    primaryEntryId: 'firma',
    entryIds: ['firma', 'regalo', 'noche'],
    audience: 'masculino',
    slug: 'aventus',
    family: 'Frutal ahumado amaderado',
    referenceName: 'Aventus',
    referenceBrand: 'Creed',
    shortDescription: 'Frutal seco, ahumado y de presencia.',
    useCases: ['firma', 'regalo', 'noche'],
    inspirationText: 'Una firma premium con contraste frutal y seco.',
    elements: ['bergamota', 'piña', 'manzana', 'grosella negra', 'abedul', 'jazmín', 'pachuli', 'musgo de roble', 'almizcle', 'ámbar gris', 'vainilla'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('43', 'firma', 'aventus') },
  }),
  fragrance({
    id: 'n44-one-million',
    number: '44',
    primaryEntryId: 'noche',
    entryIds: ['noche', 'firma'],
    audience: 'masculino',
    slug: 'one-million',
    family: 'Dulce especiado cuero',
    referenceName: 'One Million',
    referenceBrand: 'Rabanne',
    shortDescription: 'Cálido, dulce y provocativo.',
    useCases: ['noche', 'frío', 'salida'],
    inspirationText: 'Un perfil de alta recordación y salida intensa.',
    elements: ['mandarina sanguina', 'pomelo', 'menta', 'canela', 'especias', 'rosa', 'ámbar', 'cuero', 'maderas', 'pachuli'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('44', 'noche', 'one-million') },
  }),
  fragrance({
    id: 'n45-bad-boy',
    number: '45',
    primaryEntryId: 'noche',
    entryIds: ['noche', 'firma'],
    audience: 'masculino',
    slug: 'bad-boy',
    family: 'Especiado ambarado dulce',
    referenceName: 'Bad Boy',
    referenceBrand: 'Carolina Herrera',
    shortDescription: 'Oscuro, dulce y moderno.',
    useCases: ['noche', 'salida', 'cita'],
    inspirationText: 'Una lectura especiada con fondo dulce y seductor.',
    elements: ['bergamota', 'pimienta rosa', 'pimienta blanca', 'cedro', 'salvia', 'tonka', 'cacao'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('45', 'noche', 'bad-boy') },
  }),
  fragrance({
    id: 'n46-212-men',
    number: '46',
    primaryEntryId: 'dia',
    entryIds: ['dia', 'piel', 'regalo'],
    audience: 'masculino',
    slug: '212-men',
    family: 'Verde especiado urbano',
    referenceName: '212 Men',
    referenceBrand: 'Carolina Herrera',
    shortDescription: 'Fresco, verde y flexible.',
    useCases: ['día', 'oficina', 'regalo'],
    inspirationText: 'Un masculino urbano con buena versatilidad diaria.',
    elements: ['notas verdes', 'pomelo', 'especias', 'bergamota', 'lavanda', 'petitgrain', 'jengibre', 'violeta', 'gardenia', 'salvia', 'almizcle', 'sándalo', 'incienso', 'vetiver', 'madera de guayaco', 'ládano'],
    intensity: 'media',
    asset: { decantHorizontal: buildDecantHorizontal('46', 'dia', '212-men') },
  }),
  fragrance({
    id: 'n47-polo-blue',
    number: '47',
    primaryEntryId: 'dia',
    entryIds: ['dia', 'piel', 'regalo'],
    audience: 'masculino',
    slug: 'polo-blue',
    family: 'Acuático verde aromático',
    referenceName: 'Polo Blue',
    referenceBrand: 'Ralph Lauren',
    shortDescription: 'Relajado, limpio y fácil de usar.',
    useCases: ['calor', 'día', 'regalo'],
    inspirationText: 'Un acuático verde pensado para uso cómodo.',
    elements: ['melón', 'pepino', 'mandarina', 'albahaca', 'salvia', 'geranio', 'gamuza', 'maderas', 'almizcle'],
    intensity: 'baja',
    asset: { decantHorizontal: buildDecantHorizontal('47', 'dia', 'polo-blue') },
  }),
  fragrance({
    id: 'n48-scandal-homme',
    number: '48',
    primaryEntryId: 'noche',
    entryIds: ['noche', 'firma'],
    audience: 'masculino',
    slug: 'scandal-homme',
    family: 'Dulce amaderado gourmand',
    referenceName: 'Scandal Pour Homme',
    referenceBrand: 'Jean Paul Gaultier',
    shortDescription: 'Dulce, moderno y de presencia nocturna.',
    useCases: ['noche', 'salida', 'frío'],
    inspirationText: 'Un gourmand masculino con tono moderno y llamativo.',
    elements: ['mandarina', 'salvia esclarea', 'caramelo', 'tonka', 'vetiver'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('48', 'noche', 'scandal-homme') },
  }),
  fragrance({
    id: 'n49-armani-code',
    number: '49',
    primaryEntryId: 'noche',
    entryIds: ['noche', 'firma', 'regalo'],
    audience: 'masculino',
    slug: 'armani-code',
    family: 'Oriental especiado elegante',
    referenceName: 'Armani Code',
    referenceBrand: 'Giorgio Armani',
    shortDescription: 'Sofisticado, sensual y nocturno.',
    useCases: ['noche', 'cena', 'regalo'],
    inspirationText: 'Una opción elegante con perfil de cita y noche.',
    elements: ['limón', 'bergamota', 'anís estrellado', 'flor de olivo', 'madera de guayaco', 'cuero', 'tonka', 'tabaco'],
    intensity: 'media',
    asset: { decantHorizontal: buildDecantHorizontal('49', 'noche', 'armani-code') },
  }),
  fragrance({
    id: 'n80-erba-pura',
    number: '80',
    primaryEntryId: 'firma',
    entryIds: ['firma', 'dia', 'regalo'],
    audience: 'unisex',
    slug: 'erba-pura',
    family: 'Frutal ambarado almizclado',
    referenceName: 'Erba Pura',
    referenceBrand: 'Xerjoff',
    shortDescription: 'Frutal intenso, moderno y expansivo.',
    useCases: ['firma', 'día', 'regalo'],
    inspirationText: 'Una firma unisex de alto impacto y dulzor limpio.',
    elements: ['naranja siciliana', 'limón siciliano', 'bergamota de Calabria', 'frutas', 'almizcle blanco', 'vainilla de Madagascar', 'ámbar'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('80', 'firma', 'erba-pura') },
  }),
  fragrance({
    id: 'n81-rouge-540',
    number: '81',
    primaryEntryId: 'firma',
    entryIds: ['firma', 'noche', 'regalo'],
    audience: 'unisex',
    slug: 'rouge-540',
    family: 'Ámbar floral amaderado',
    referenceName: 'Rouge 540',
    referenceBrand: 'Maison Francis Kurkdjian',
    shortDescription: 'Etéreo, dulce-mineral y memorable.',
    useCases: ['firma', 'regalo', 'noche'],
    inspirationText: 'Una firma reconocible, sofisticada y de presencia amplia.',
    elements: ['azafrán', 'jazmín', 'amberwood', 'ámbar gris', 'hedione', 'resina de abeto', 'cedro', 'azúcar', 'ambroxan', 'musgo de roble'],
    intensity: 'alta',
    asset: { decantHorizontal: buildDecantHorizontal('81', 'firma', 'rouge-540') },
  }),
]

export const getEntryById = (entryId: OmmiEntryId) => {
  const entry = ommiLines.find((candidate) => candidate.id === entryId)

  if (!entry) {
    throw new Error(`Unknown OMMI entry id: ${entryId}`)
  }

  return entry
}

export const getEntryBySlug = (slug: string) =>
  ommiLines.find((entry) => entry.slug === slug)

export const getFragrancesByEntry = (entryId: OmmiEntryId) =>
  ommiFragrances.filter((fragrance) => fragrance.entryIds.includes(entryId))

export const getPrimaryFragrancesByEntry = (entryId: OmmiEntryId) =>
  ommiFragrances.filter((fragrance) => fragrance.primaryEntryId === entryId)

export const getFragrancesByAudience = (audience: OmmiAudience) =>
  ommiFragrances.filter((fragrance) => fragrance.audience === audience)

export const getFragrancesByEntryAndAudience = (
  entryId: OmmiEntryId,
  audience: OmmiAudience,
) =>
  ommiFragrances.filter(
    (fragrance) =>
      fragrance.entryIds.includes(entryId) && fragrance.audience === audience,
  )

export const getCrossListedFragrances = () =>
  ommiFragrances.filter((fragrance) => fragrance.entryIds.length > 1)

export const getLineById = getEntryById

export const getLineBySlug = getEntryBySlug

export const ommiCategories = ommiLines

export const ommiPerfumes = ommiFragrances

export const getCategoryById = getLineById

export const getCategoryBySlug = getLineBySlug

export const getFragrancesByLine = getPrimaryFragrancesByEntry

export const getFragranceBySlug = (lineSlug: string, fragranceSlug: string) => {
  const entry = getEntryBySlug(lineSlug)

  if (!entry) {
    return undefined
  }

  return ommiFragrances.find(
    (fragrance) =>
      fragrance.entryIds.includes(entry.id) && fragrance.slug === fragranceSlug,
  )
}

export const getLineRoute = (line: OmmiLine) =>
  line.id === 'discovery' ? '/sets/discovery' : `/perfumes/${line.slug}`

export const getPerfumeBySlug = getFragranceBySlug
