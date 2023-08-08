export class Color {
  constructor(public readonly name: string, public readonly rgb: number) {}

  get hexString() {
    return `#${this.rgb.toString(16).padStart(6, "0")}`;
  }
}

export const Colors: readonly Color[] = [
  new Color("Red", 0xf40404),
  new Color("Blue", 0x0c48cc),
  new Color("Teal", 0x2cb494),
  new Color("Purple", 0x88409c),
  new Color("Orange", 0xf88c14),
  new Color("Brown", 0x703014),
  new Color("White", 0xcce0d0),
  new Color("Yellow", 0xfcfc38),
  new Color("Green", 0x088008),
  new Color("Pale Yellow", 0xfcfc7c),
  new Color("Tan", 0xecc4b0),
  new Color("Aqua", 0x4068d4),
  new Color("Pale Green", 0x74a47c),
  new Color("Blueish Grey", 0x9090b8),
  new Color("Pale Yellow2", 0xfcfc7c),
  new Color("Cyan", 0x00e4fc),
  new Color("Pink", 0xffc4e4),
  new Color("Olive", 0x787800),
  new Color("Lime", 0xd2f53c),
  new Color("Navy", 0x0000e6),
  new Color("Dark Aqua", 0x4068d4),
  new Color("Magenta", 0xf032e6),
  new Color("Grey", 0x808080),
  new Color("Black", 0x3c3c3c),
] as const;
