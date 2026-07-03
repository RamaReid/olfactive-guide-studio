export type LineId = "dia" | "noche" | "piel" | "firma" | "regalo";

export interface Line {
  id: LineId;
  name: string;
  displayName: string;
  tagline: string;
  description: string;
  tags: string[];
  iconKey: LineId;
  palette: {
    bg: string;
    alt: string;
    accent: string;
    deep: string;
    text: string;
  };
}

export const LINES: Line[] = [
  {
    id: "dia",
    name: "Día",
    displayName: "OMMI Día",
    tagline: "Fragancias frescas, limpias y livianas.",
    description:
      "Para oficina, verano y uso diario. Presencia clara sin invadir.",
    tags: ["Día", "Oficina", "Verano"],
    iconKey: "dia",
    palette: {
      bg: "var(--dia-bg)",
      alt: "var(--dia-alt)",
      accent: "var(--dia-accent)",
      deep: "var(--dia-deep)",
      text: "var(--foreground)",
    },
  },
  {
    id: "noche",
    name: "Noche",
    displayName: "OMMI Noche",
    tagline: "Intensas, dulces y ambaradas.",
    description:
      "Para salida, frío y presencia alta. Estela larga y memorable.",
    tags: ["Noche", "Frío", "Estela alta"],
    iconKey: "noche",
    palette: {
      bg: "var(--noche-bg)",
      alt: "var(--noche-alt)",
      accent: "var(--noche-accent)",
      deep: "var(--noche-deep)",
      text: "var(--warm-white)",
    },
  },
  {
    id: "piel",
    name: "Piel",
    displayName: "OMMI Piel",
    tagline: "Suaves, íntimas y limpias.",
    description:
      "Para cercanía, rutina y uso personal. Piel limpia y confortable.",
    tags: ["Piel limpia", "Intimidad", "Diario"],
    iconKey: "piel",
    palette: {
      bg: "var(--piel-bg)",
      alt: "var(--piel-alt)",
      accent: "var(--piel-accent)",
      deep: "var(--piel-deep)",
      text: "var(--foreground)",
    },
  },
  {
    id: "firma",
    name: "Firma",
    displayName: "OMMI Firma",
    tagline: "Con carácter, estela y recordación.",
    description:
      "Para construir identidad. Fragancias que dejan rastro.",
    tags: ["Carácter", "Rastro", "Identidad"],
    iconKey: "firma",
    palette: {
      bg: "var(--firma-bg)",
      alt: "var(--firma-alt)",
      accent: "var(--firma-accent)",
      deep: "var(--firma-deep)",
      text: "var(--warm-white)",
    },
  },
  {
    id: "regalo",
    name: "Regalo",
    displayName: "OMMI Regalo",
    tagline: "Seguras, versátiles y elegantes.",
    description:
      "Opciones para regalar sin equivocarse. Presentación cuidada.",
    tags: ["Regalo seguro", "Versátil", "Elegante"],
    iconKey: "regalo",
    palette: {
      bg: "var(--regalo-bg)",
      alt: "var(--regalo-alt)",
      accent: "var(--regalo-accent)",
      deep: "var(--regalo-deep)",
      text: "var(--foreground)",
    },
  },
];

export const getLine = (id: LineId): Line =>
  LINES.find((l) => l.id === id) ?? LINES[0];