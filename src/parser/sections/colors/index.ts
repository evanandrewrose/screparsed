import { Parser } from "binary-parser";

const ColorsParser = new Parser().array("colors", {
  type: new Parser()
    .endianess("little")
    .uint32le("r")
    .uint32le("g")
    .uint32le("b")
    .uint32le("a"),
  length: 12,
});

export const parsePlayerColors = (buffer: Buffer) => ColorsParser.parse(buffer);
