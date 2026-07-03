import type { LineId } from "./lines";

export interface Product {
  id: string;
  number: string;
  name: string;
  line: LineId;
  family: string;
  intensity: 1 | 2 | 3 | 4 | 5;
  sillage: 1 | 2 | 3 | 4 | 5;
  duration: string;
  useCases: string[];
  season: string[];
  description: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  price100ml: number;
  priceDecant: number;
  image: string;
  recommendedKits: string[];
  tags: string[];
  inspiredByReference: string;
}

export const PRODUCTS: Product[] = [
  {
    id: "n41",
    number: "N°41",
    name: "OMMI N°41",
    line: "dia",
    family: "Acuático cítrico",
    intensity: 3,
    sillage: 3,
    duration: "6 a 8 horas",
    useCases: ["Día", "Oficina", "Verano"],
    season: ["Primavera", "Verano"],
    description:
      "Fresca, limpia y luminosa. Ideal para uso cotidiano y climas cálidos.",
    topNotes: ["Bergamota", "Limón siciliano", "Menta acuática"],
    heartNotes: ["Notas marinas", "Jazmín blanco"],
    baseNotes: ["Almizcle blanco", "Cedro"],
    price100ml: 68000,
    priceDecant: 6500,
    image: "",
    recommendedKits: ["kit-dia", "kit-verano"],
    tags: ["Fresco", "Diario"],
    inspiredByReference: "Perfil acuático luminoso contemporáneo.",
  },
  {
    id: "n44",
    number: "N°44",
    name: "OMMI N°44",
    line: "noche",
    family: "Dulce especiado",
    intensity: 4,
    sillage: 4,
    duration: "10 a 12 horas",
    useCases: ["Noche", "Invierno", "Salida"],
    season: ["Otoño", "Invierno"],
    description:
      "Dulce, especiada e intensa. Ideal para noche, frío y presencia alta.",
    topNotes: ["Manzana", "Canela", "Bergamota"],
    heartNotes: ["Regaliz", "Praliné", "Jazmín"],
    baseNotes: ["Vainilla", "Sándalo", "Cachemira"],
    price100ml: 82000,
    priceDecant: 7500,
    image: "",
    recommendedKits: ["kit-noche", "kit-invierno"],
    tags: ["Dulce", "Intenso"],
    inspiredByReference:
      "Perfil dulce especiado nocturno de alta permanencia.",
  },
  {
    id: "n81",
    number: "N°81",
    name: "OMMI N°81",
    line: "firma",
    family: "Ambarado luminoso",
    intensity: 4,
    sillage: 4,
    duration: "12 horas o más",
    useCases: ["Firma personal", "Noche", "Eventos"],
    season: ["Todo el año"],
    description:
      "Luminosa, ambarada y memorable. Pensada para dejar rastro.",
    topNotes: ["Azafrán", "Cardamomo"],
    heartNotes: ["Ámbar", "Cuero suave"],
    baseNotes: ["Vainilla", "Benjuí", "Sándalo"],
    price100ml: 96000,
    priceDecant: 8500,
    image: "",
    recommendedKits: ["kit-firma"],
    tags: ["Ambarado", "Firma"],
    inspiredByReference: "Perfil ambarado luminoso de alta recordación.",
  },
  {
    id: "n40",
    number: "N°40",
    name: "OMMI N°40",
    line: "firma",
    family: "Fresco especiado",
    intensity: 4,
    sillage: 3,
    duration: "8 a 10 horas",
    useCases: ["Diario", "Oficina", "Firma personal"],
    season: ["Todo el año"],
    description:
      "Fresca, especiada y segura. Buena opción de firma cotidiana.",
    topNotes: ["Bergamota", "Pimienta rosa"],
    heartNotes: ["Lavanda", "Nuez moscada"],
    baseNotes: ["Vetiver", "Ambroxan"],
    price100ml: 84000,
    priceDecant: 7500,
    image: "",
    recommendedKits: ["kit-firma"],
    tags: ["Fresco", "Especiado"],
    inspiredByReference: "Perfil fresco especiado versátil.",
  },
  {
    id: "n43",
    number: "N°43",
    name: "OMMI N°43",
    line: "regalo",
    family: "Frutal ahumado",
    intensity: 3,
    sillage: 3,
    duration: "8 horas",
    useCases: ["Regalo", "Salida", "Versátil"],
    season: ["Todo el año"],
    description:
      "Moderna, frutal y fácil de elegir. Buena opción para regalo.",
    topNotes: ["Piña", "Bergamota"],
    heartNotes: ["Jazmín", "Iris"],
    baseNotes: ["Guaiac", "Ámbar"],
    price100ml: 76000,
    priceDecant: 7000,
    image: "",
    recommendedKits: ["kit-regalo"],
    tags: ["Frutal", "Versátil"],
    inspiredByReference: "Perfil frutal ahumado contemporáneo.",
  },
  {
    id: "n10",
    number: "N°10",
    name: "OMMI N°10",
    line: "piel",
    family: "Limpio almizclado",
    intensity: 2,
    sillage: 2,
    duration: "6 a 8 horas",
    useCases: ["Diario", "Piel limpia", "Intimidad"],
    season: ["Todo el año"],
    description:
      "Suave, cercana y limpia. Para uso íntimo y cotidiano.",
    topNotes: ["Aldehídos suaves", "Bergamota"],
    heartNotes: ["Iris", "Algodón"],
    baseNotes: ["Almizcle blanco", "Cedro claro"],
    price100ml: 72000,
    priceDecant: 6500,
    image: "",
    recommendedKits: ["kit-piel"],
    tags: ["Limpio", "Cercano"],
    inspiredByReference: "Perfil almizclado limpio de piel.",
  },
  {
    id: "n5",
    number: "N°5",
    name: "OMMI N°5",
    line: "noche",
    family: "Ambarado gourmand",
    intensity: 5,
    sillage: 4,
    duration: "10 a 12 horas",
    useCases: ["Noche", "Frío", "Presencia"],
    season: ["Otoño", "Invierno"],
    description:
      "Cálida, intensa y gourmand. Para quienes buscan presencia alta.",
    topNotes: ["Café", "Bergamota"],
    heartNotes: ["Praliné", "Rosa"],
    baseNotes: ["Vainilla", "Ámbar", "Pachulí"],
    price100ml: 88000,
    priceDecant: 8000,
    image: "",
    recommendedKits: ["kit-noche", "kit-invierno"],
    tags: ["Gourmand", "Intenso"],
    inspiredByReference: "Perfil ambarado gourmand nocturno.",
  },
  {
    id: "n13",
    number: "N°13",
    name: "OMMI N°13",
    line: "dia",
    family: "Cítrico fresco",
    intensity: 3,
    sillage: 2,
    duration: "5 a 7 horas",
    useCases: ["Verano", "Día", "Oficina"],
    season: ["Primavera", "Verano"],
    description:
      "Cítrica, liviana y fresca. Para clima cálido y uso diario.",
    topNotes: ["Bergamota", "Pomelo", "Neroli"],
    heartNotes: ["Té verde", "Petitgrain"],
    baseNotes: ["Almizcle claro", "Musgo blanco"],
    price100ml: 66000,
    priceDecant: 6000,
    image: "",
    recommendedKits: ["kit-dia", "kit-verano"],
    tags: ["Cítrico", "Liviano"],
    inspiredByReference: "Perfil cítrico fresco clásico.",
  },
];

export const getProduct = (id: string): Product | undefined =>
  PRODUCTS.find((p) => p.id === id);

export const productsByLine = (line: LineId): Product[] =>
  PRODUCTS.filter((p) => p.line === line);