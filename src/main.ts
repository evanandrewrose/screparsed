import { ReadStream } from "fs";
import { unzip } from "zlib";
import { Parser } from "binary-parser";

//const sectionTypes = [
//    {
//        name: "magic",
//        size: undefined,
//    },
//    {
//        name: "header",
//        size: 0x279,
//    }
//]

export class ReplayParser {
  //private reader: ReadableStreamReader<Uint8Array>;

  private constructor() {}

  public static async from(stream: ReadStream) {
    return new Promise<null>(async (resolve, reject) => {
      const sections = new ReplaySectionGenerator(stream);
      for await (const section of sections.generate()) {
        console.log("section generated");
      }
      resolve(null);
    });
  }
}

export class ReplaySection {
  constructor(private stream: ReadStream) {}
}

export class ReplaySectionGenerator {
  constructor(private stream: ReadStream) {}

  private streamReady = () =>
    new Promise((resolve) => {
      this.stream.on("readable", () => {
        resolve(null);
      });
    });

  public async *generate() {
    let sectionCounter = 0;
    await this.streamReady();

    while (!this.stream.readableEnded) {
      console.log("section", sectionCounter);
      if (sectionCounter == 1) {
        const replaySize = this.stream.read(4); // do something with this
      }

      const checksum: Buffer = this.stream.read(4).readUInt32LE();
      const chunks = this.stream.read(4).readUInt32LE();

      // for each chunk
      for (let i = 0; i < chunks; i++) {
        console.log("chunk", i);
        const size = this.stream.read(4).readUInt32LE();

        console.log({
          checksum: checksum,
          size: size,
          chunks: chunks,
        });

        // create a dataview that exposes the section by size, no actual reading
        const section = this.stream.read(size);

        // gzip magic number
        if (section[0] == 0x78) {
          const chunk: Uint8Array = await new Promise((resolve, reject) => {
            unzip(section, {}, (error, chunk: Uint8Array) => {
              if (error) {
                reject(error);
              } else {
                resolve(chunk);
              }
            });
          });

          if (sectionCounter === 1) {
            console.log("header");

            const result = new Parser()
              .endianess("little")
              .int8("engine")
              .uint32le("frames")
              .skip(3)
              .uint32le("startTime")
              .skip(12)
              .string("title", { length: 28, encoding: "utf-8" })
              .uint16le("mapWidth", { length: 2 })
              .uint16le("mapHeight", { length: 2 })
              .skip(1)
              .uint8("availableSlotsCount", { length: 1 })
              .uint8("speed", { length: 1 })
              .skip(1)
              .uint16le("type", { length: 2 })
              .uint16le("subType", { length: 2 })
              .skip(0x48 - 0x3e - 2) // skip padding between subType and host
              .string("host", { length: 24, encoding: "utf8" })
              .skip(0x61 - 0x48 - 24) // skip padding between host and map
              .string("map", { length: 26, encoding: "utf8" })
              .skip(0xa1 - 0x61 - 26) // skip padding between map and player structs
              .array("playerStructs", {
                length: 12,
                type: new Parser()
                  .uint16le("slotID", { length: 2 })
                  .skip(2)
                  .uint8("ID", { length: 1 })
                  .skip(3)
                  .uint8("type", { length: 1 })
                  .uint8("race", { length: 1 })
                  .uint8("team", { length: 1 })
                  .string("name", { length: 25, encoding: "utf8" }),
              })
              .skip(0x251 - 0xa1 - 432) // skip padding between player structs and player colors
              .array("playerColors", {
                length: 8,
                type: new Parser().uint8("color", { length: 4 }),
              })
              .parse(chunk);
            console.log(result);
            // format time
            console.log('startTime', result.startTime);
            console.log(
                new Date(Number(result.startTime * 1000)).toISOString()
            );
          }
        }
      }

      yield new ReplaySection(this.stream);
      sectionCounter++;
    }
  }
}
