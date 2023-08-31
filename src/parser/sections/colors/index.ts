import { Parser } from "binary-parser";
import { Color } from "@/post-process/colors";

type ColorTuple = [number, number, number, number];
const floatToByte = (value: number) => Math.round(value * 255);

const ColorsParser = new Parser().array("colors", {
  type: new Parser().endianess("little").array("color", {
    type: "floatle",
    length: 4,
    formatter: (floats: ColorTuple) =>
      Color.fromRGBA(...(floats.map(floatToByte) as ColorTuple)) ?? null,
  }),
  length: 12,
});

export type PlayerColor = {
  r: number;
  g: number;
  b: number;
  a: number;
};

export const parsePlayerColors = (buffer: Buffer): Array<Color | null> =>
  ColorsParser.parse(buffer).colors.map(
    (parsedColorObject: { color: Color | null }) => parsedColorObject.color
  );
