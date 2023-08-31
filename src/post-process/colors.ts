export class Color {
  constructor(public readonly name: string, public readonly rgb: number) {}

  get hexString() {
    return `#${this.rgb.toString(16).padStart(6, "0")}`;
  }

  get r() {
    return (this.rgb >> 24) & 0xff;
  }

  get g() {
    return (this.rgb >> 16) & 0xff;
  }

  get b() {
    return (this.rgb >> 8) & 0xff;
  }

  get a() {
    return this.rgb & 0xff;
  }

  public static fromRGBA(r: number, g: number, b: number, a: number) {
    return Colors.find((color) => color.r === r && color.g === g && color.b === b && color.a === a);
  }
}

export const Colors: readonly Color[] = [
  new Color("Red", 0xf40404ff),
  new Color("Blue", 0x0c48ccff),
  new Color("Teal", 0x2cb494ff),
  new Color("Purple", 0x88409cff),
  new Color("Orange", 0xf88c14ff),
  new Color("Brown", 0x703014ff),
  new Color("White", 0xcce0d0ff),
  new Color("Yellow", 0xfcfc38ff),
  new Color("Green", 0x088008ff),
  new Color("Pale Yellow", 0xfcfc7cff),
  new Color("Tan", 0xecc4b0ff),
  new Color("Aqua", 0x4068d4ff),
  new Color("Pale Green", 0x74a47cff),
  new Color("Blueish Grey", 0x9090b8ff),
  new Color("Pale Yellow2", 0xfcfc7cff),
  new Color("Cyan", 0x00e4fcff),
  new Color("Pink", 0xffc4e4ff),
  new Color("Olive", 0x787800ff),
  new Color("Lime", 0xd2f53cff),
  new Color("Navy", 0x0000e6ff),
  new Color("Dark Aqua", 0x4068d4ff),
  new Color("Magenta", 0xf032e6ff),
  new Color("Grey", 0x808080ff),
  new Color("Black", 0x3c3c3cff),
] as const;
