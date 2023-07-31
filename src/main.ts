import { ReadStream } from "fs";
import { unzip } from "zlib";
import { Parser } from "binary-parser";
import { SmartBuffer } from "smart-buffer";
import { promisify } from "util";
import { TypeID, parseCommand } from "./commands";

const REMASTERED_REPLAY_VERSION = "seRS";

export class ReplayParser {
  static PlayerInfoParser = new Parser()
    .endianess("little")
    .int8("engine")
    .uint32("frames")
    .skip(3)
    .uint32("startTime", {
      formatter: (value) => new Date(value * 1000),
    })
    .skip(12)
    .string("title", {
      length: 28,
      encoding: "utf-8",
      stripNull: true,
    })
    .uint16("mapWidth")
    .uint16("mapHeight")
    .skip(1)
    .uint8("availableSlotsCount")
    .uint8("speed")
    .skip(1)
    .uint16("type")
    .uint16("subType")
    .skip(8)
    .string("host", { length: 24, encoding: "utf8", stripNull: true })
    .skip(1)
    .string("map", { length: 26, encoding: "utf8", stripNull: true })
    .skip(38)
    .array("playerStructs", {
      length: 12,
      type: new Parser()
        .endianess("little")
        .uint16("slotID")
        .skip(2)
        .uint8("ID")
        .skip(3)
        .uint8("type")
        .uint8("race", {
          formatter: (value) => ["zerg", "terran", "protoss"][value],
        })
        .uint8("team")
        .string("name", {
          length: 25,
          encoding: "utf8",
          stripNull: true,
        }),
    })
    .array("playerColors", {
      length: 8,
      type: new Parser().uint32le("color"),
    });

  constructor(private stream: ReadStream) {}

  public async parse() {
    await this.streamReadable();

    this.stream.read(12); // skip crc, chunks in header (=1), and size of replay version section chunk (=4), each 4 bytes
    const replayVersion = this.stream.read(4).toString("ascii");

    if (replayVersion !== REMASTERED_REPLAY_VERSION) {
      // indicates remastered replay
      throw new Error(`Unhandled replay version: ${replayVersion}`);
    }

    this.stream.read(4); // skip replay uncompressed size (?)

    const playerInfo = ReplayParser.PlayerInfoParser.parse(await this.nextSection(this.stream, true));

    await this.nextSection(this.stream); // ignored (informs uncompressed commands size, but we just allocate as needed)
    const framesSection = await this.nextSection(this.stream, true)
    const frames = this.parseFramesSection(framesSection);

    for (const frame of frames) {
      console.log(JSON.stringify(frame, null, 2));
    }

    console.log(playerInfo);
  }

  private async nextSection(stream: ReadStream, compressed = false) {
    stream.read(4); // skip checksum, unchecked

    const numChunks: number = stream.read(4).readUInt32LE();
    const chunks = [];

    for await (const chunk of this.readChunks(stream, numChunks, compressed)) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  }

  *parseFramesSection(frames: Buffer) {
    const buffer = SmartBuffer.fromBuffer(frames);
    
    while (buffer.readOffset < buffer.length) {
        const frameNumber = buffer.readUInt32LE();
        const blockSize = buffer.readUInt8();
        const endOfFrame = buffer.readOffset + blockSize;
        const commands = [];

        while (buffer.readOffset < endOfFrame) {
          const playerId = buffer.readUInt8();
          const commandType = buffer.readUInt8();
          const command = parseCommand(buffer, playerId, commandType as TypeID);

          if (command === null){
            buffer.readOffset = endOfFrame;
          } else {
            commands.push(command);
          }
        }

        yield {
          frameNumber,
          commands
        }
    }
  }

  private async *readChunks(
    stream: ReadStream,
    numChunks: number,
    compressed = true
  ): AsyncGenerator<Uint8Array, void, void> {
    for (let i = 0; i < numChunks; i++) {
      const chunkSize = stream.read(4).readUInt32LE();
      yield compressed ? await promisify(unzip)(stream.read(chunkSize)) : stream.read(chunkSize);
    }
  }

  private streamReadable = () => {
    return new Promise((resolve) => {
      this.stream.on("readable", () => {
        resolve(null);
      });
    });
  };
}
