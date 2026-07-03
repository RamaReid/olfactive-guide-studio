import type { LineId } from "./lines";

export interface DiscoverySet {
  id: string;
  name: string;
  description: string;
  decants: number;
  profile: string;
  occasion: string;
  includedProducts: string[];
  includesGuide: boolean;
  includesCoupon: boolean;
  price: number;
  tags: string[];
  line: LineId | "mix";
}

export const DISCOVERY_SETS: DiscoverySet[] = [
  {
    id: "kit-dia",
    name: "Kit Día",
    description: "Fragancias frescas para oficina, verano y uso diario.",
    decants: 3,
    profile: "Fresco, cítrico, limpio",
    occasion: "Día · Oficina · Verano",
    includedProducts: ["n41", "n13", "n10"],
    includesGuide: true,
    includesCoupon: true,
    price: 18500,
    tags: ["Día", "Fresco"],
    line: "dia",
  },
  {
    id: "kit-noche",
    name: "Kit Noche",
    description: "Fragancias intensas para salida, frío y presencia alta.",
    decants: 3,
    profile: "Dulce especiado, gourmand, ambarado",
    occasion: "Noche · Frío · Salida",
    includedProducts: ["n44", "n5", "n81"],
    includesGuide: true,
    includesCoupon: true,
    price: 21500,
    tags: ["Noche", "Intenso"],
    line: "noche",
  },
  {
    id: "kit-piel",
    name: "Kit Piel Limpia",
    description: "Fragancias suaves y cercanas para uso íntimo y rutina.",
    decants: 3,
    profile: "Limpio, almizclado, cercano",
    occasion: "Diario · Intimidad",
    includedProducts: ["n10", "n41", "n13"],
    includesGuide: true,
    includesCoupon: true,
    price: 18500,
    tags: ["Piel", "Limpio"],
    line: "piel",
  },
  {
    id: "kit-regalo",
    name: "Kit Regalo Seguro",
    description:
      "Opciones versátiles y elegantes para regalar sin equivocarse.",
    decants: 5,
    profile: "Versátil, elegante, seguro",
    occasion: "Regalo · Todo momento",
    includedProducts: ["n43", "n40", "n41", "n10", "n81"],
    includesGuide: true,
    includesCoupon: true,
    price: 27500,
    tags: ["Regalo", "Elegante"],
    line: "regalo",
  },
  {
    id: "kit-invierno",
    name: "Kit Invierno",
    description: "Cálidas, dulces y ambaradas. Perfectas para el frío.",
    decants: 3,
    profile: "Cálido, ambarado, gourmand",
    occasion: "Otoño · Invierno",
    includedProducts: ["n44", "n5", "n81"],
    includesGuide: true,
    includesCoupon: true,
    price: 21500,
    tags: ["Invierno", "Cálido"],
    line: "mix",
  },
  {
    id: "kit-verano",
    name: "Kit Verano",
    description: "Cítricas, acuáticas y luminosas para climas cálidos.",
    decants: 3,
    profile: "Cítrico, acuático, luminoso",
    occasion: "Primavera · Verano",
    includedProducts: ["n41", "n13", "n43"],
    includesGuide: true,
    includesCoupon: true,
    price: 18500,
    tags: ["Verano", "Cítrico"],
    line: "mix",
  },
  {
    id: "kit-firma",
    name: "Kit Firma",
    description:
      "Fragancias con carácter y estela para construir identidad olfativa.",
    decants: 5,
    profile: "Ambarado, especiado, memorable",
    occasion: "Firma personal · Eventos",
    includedProducts: ["n81", "n40", "n44", "n5", "n10"],
    includesGuide: true,
    includesCoupon: true,
    price: 29500,
    tags: ["Firma", "Identidad"],
    line: "firma",
  },
];

export const getDiscoverySet = (id: string): DiscoverySet | undefined =>
  DISCOVERY_SETS.find((s) => s.id === id);