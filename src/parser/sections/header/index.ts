import { Parser } from "binary-parser";

const HeaderParser = new Parser()
  .endianess("little")
  .uint32("crc") // crc (not used)
  .uint32("chunks", {
    // number of chunks in the header section
    assert: 1, // always 1
  })
  .uint32("bytes", {
    // number of bytes in the replay version section
    assert: 4, // always 4
  })
  .string("replayVersion", {
    // replay version
    length: 4, // could use "bytes" above, but we assert anyway and it gives the parser a known size
    encoding: "ascii",
  })
  .uint32("uncompressedSize");

export const HeaderSize = HeaderParser.sizeOf();

export type Header = {
    crc: number;
    chunks: number;
    bytes: number;
    replayVersion: string;
    uncompressedSize: number;
}

export const parseHeader = (buffer: Buffer): Header => HeaderParser.parse(buffer);