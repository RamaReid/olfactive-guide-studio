import {
  FlaskConical,
  Fingerprint,
  Factory,
  ShieldCheck,
  RefreshCcw,
  PackageCheck,
  type LucideIcon,
} from "lucide-react";

export interface TrustItem {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
}

export const TRUST_ITEMS: TrustItem[] = [
  {
    id: "extrait",
    title: "Extrait de Parfum",
    description:
      "Alta concentración de esencia. Más duración, más estela, menos alcohol perceptible.",
    icon: FlaskConical,
  },
  {
    id: "lote",
    title: "Trazabilidad por lote",
    description:
      "Cada frasco lleva su lote visible. Sabés qué comprás y cuándo se elaboró.",
    icon: Fingerprint,
  },
  {
    id: "elaboracion",
    title: "Elaboración nacional",
    description:
      "Fabricación en Argentina, con control técnico y estándar consistente.",
    icon: Factory,
  },
  {
    id: "regulatoria",
    title: "Información regulatoria visible",
    description:
      "Concentración, advertencias, contenido neto y responsable declarados en etiqueta.",
    icon: ShieldCheck,
  },
  {
    id: "cambios",
    title: "Cambios y devoluciones claras",
    description:
      "Condiciones simples y publicadas. Si no funciona en tu piel, hay respuesta.",
    icon: RefreshCcw,
  },
  {
    id: "envio",
    title: "Envío protegido",
    description:
      "Embalaje reforzado y seguimiento. El frasco llega intacto o lo reponemos.",
    icon: PackageCheck,
  },
];