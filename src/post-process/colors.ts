export interface Color {
  name: string;
  rgb: number;
}

export const Colors: readonly Color[] = [
  { name: "Red", rgb: 0xf40404 },
  { name: "Blue", rgb: 0x0c48cc },
  { name: "Teal", rgb: 0x2cb494 },
  { name: "Purple", rgb: 0x88409c },
  { name: "Orange", rgb: 0xf88c14 },
  { name: "Brown", rgb: 0x703014 },
  { name: "White", rgb: 0xcce0d0 },
  { name: "Yellow", rgb: 0xfcfc38 },
  { name: "Green", rgb: 0x088008 },
  { name: "Pale Yellow", rgb: 0xfcfc7c },
  { name: "Tan", rgb: 0xecc4b0 },
  { name: "Aqua", rgb: 0x4068d4 },
  { name: "Pale Green", rgb: 0x74a47c },
  { name: "Blueish Grey", rgb: 0x9090b8 },
  { name: "Pale Yellow2", rgb: 0xfcfc7c },
  { name: "Cyan", rgb: 0x00e4fc },
  { name: "Pink", rgb: 0xffc4e4 },
  { name: "Olive", rgb: 0x787800 },
  { name: "Lime", rgb: 0xd2f53c },
  { name: "Navy", rgb: 0x0000e6 },
  { name: "Dark Aqua", rgb: 0x4068d4 },
  { name: "Magenta", rgb: 0xf032e6 },
  { name: "Grey", rgb: 0x808080 },
  { name: "Black", rgb: 0x3c3c3c },
] as const;
