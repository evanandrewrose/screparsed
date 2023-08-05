import { HeaderSize, parseHeader } from "@/core/parser/sections/header";
import { parsePlayerInfo } from "@/core/parser/sections/player_info";
import { parseFramesSection } from "@/core/parser/sections/frames";
import { StreamReader } from "@/core/util";

// A StarCraft: Remastered replay is a file composed of several "sections", each of which is composed of several "chunks". Each section
// describes a different aspect of the replay, such as the header, player info, and frames, map data, etc. Depending on the section, the
// chunks within may be compressed using zlib.
//
// This parser is a work in progress. Currently, only the header, player info, and frames sections are parsed (frames being a logical step
// of progression in the replay, containing some number of player commands that were issued. Below is a diagram of the high-level structure
// of a replay file, up to the point where this parser currently parses. It does not describe the structure of the decompressed chunks. For
// that, see the individual section parsers {@link /src/parser/sections}.
//
// Note that chunks are not guaranteed to be parsable individually. Instead, they must be decompressed and then parsed as a whole or parsed
// as a stream. For simplicity, this parser decompresses the entire section before parsing it, though streaming would be more memory
// efficient.
//
// ┌──────────────────────────────────────────────────────┐   ┐
// │c2 19 c2 93 | 01 00 00 00 | 04 00 00 00 | 73 65 52 53 |   │- header
// └──────────────────────────────────────────────────────┘   │
// [crc         ][num chunks  ][num bytes   ][seRS        ]   | The header section could be seen as just the first 16 bytes, since the
// ┌────────────┐                                             │ "num bytes" field is 4, but since the "unknown val" field is not accounted
// │8f 8b 01 00 |                                             │ for in the "num bytes" field, we read and parse the entire "header" as a
// └────────────┘                                             │ single, unique blob to simplify the code.
// [unknown val ]                                             ┘
//
// [---]
//
// ┌──────────────────────────────────────────────────────┐   ┐
// │3e eb c3 d3 | 01 00 00 00 | b6 00 00 00 | 78 9c 63 cc |   │- player info data section
// └──────────────────────────────────────────────────────┘   │
// [crc         ][num chunks  ][num bytes  ][compressed.. ]   | The player info section is composed of a single chunk, which is compressed
// ┌──────────────────────────────────────────────────────┐   │ using zlib. The "num bytes" field is 182, which describes the size of the
// │?? ?? ?? ?? | ?? ?? ?? ?? | ?? ?? ?? ?? | ?? ?? ?? ?? |   │ single chunk compressed. We read the compressed chunk, decompress it, and
// └──────────────────────────────────────────────────────┘   │ parse the decompressed data.
// [ gzip data assiciated with chunk 1 (only chunk)       ]   ┘
//
// [---]
//
// ┌──────────────────────────────────────────────────────┐   ┐
// │3f 12 be 33 | 31 a0 00 00 | b6 2a ?? ?? | 78 9c 63 cc |   │- next section decompressed size section
// └──────────────────────────────────────────────────────┘   │
// [crc         ][num chunks  ][num bytes  ][next sect len]   │ This section is composed of a single non-compressed chunk, which describes
//                                                            │ the size of the next section inflated. We skip this section, since we
//                                                            │ allocate the decompressed data buffer dynamically. This type of section
//                                                            ┘ preceedes all future data sections.
//
// [---]
//
// ┌──────────────────────────────────────────────────────┐   ┐
// │3f 12 be 33 | 31 a0 00 00 | b6 2a ?? ?? | 78 9c 63 cc |   │- frame data (& commands) data section
// └──────────────────────────────────────────────────────┘   │
// [crc         ][num chunks  ][num bytes  ][compressed.. ]   | The commands section is composed of many chunks (typically), which are
// ┌──────────────────────────────────────────────────────┐   │ compressed using zlib. Each chunk is prefaced by a 4-byte integer
// │?? ?? ?? ?? | ?? ?? ?? ?? | ?? ?? ?? ?? | ?? ?? ?? ?? |   │ (num bytes) describing the size of the chunk when compressed. We read each
// └──────────────────────────────────────────────────────┘   │ chunk, decompress them individually, join them into a single buffer, and
// [ gzip data assiciated with chunk 1 (first of many)        ┘ parse that buffer. This should be the case for future sections as well.
// ```

const REMASTERED_REPLAY_VERSION = "seRS";

/**
 * A parser for StarCraft: Remastered replay files.
 */
export class ReplayParser {
  constructor(private stream: StreamReader, private unzip: (buffer: Buffer) => Promise<Buffer>) {}

  public async parse() {
    const header = parseHeader(await this.stream.read(HeaderSize));

    if (header.replayVersion !== REMASTERED_REPLAY_VERSION) {
      throw new Error(`Unsupported replay version: ${header.replayVersion}`);
    }

    const playerInfo = parsePlayerInfo(await this.nextSection(true));

    await this.skipNextSection(); // this section describes the size of next section; we allocate dynamically instead
    const framesSection = await this.nextSection(true);

    const frames = parseFramesSection(framesSection);

    for (const frame of frames) {
      console.log(JSON.stringify(frame, null, 2));
    }

    console.log(playerInfo);
  }

  private async skipNextSection(): Promise<void> {
    this.stream.read(4); // skip checksum, unchecked

    const numChunks: number = await this.stream.readUInt32LE();

    for (let i = 0; i < numChunks; i++) {
      const chunkSize = await this.stream.readUInt32LE();
      this.stream.read(chunkSize);
    }
  }

  /**
   * Reads a full section from the stream
   * @param compressed whether or not to decompress the chunks within the section using zlib
   * @returns a buffer containing the section data
   */
  private async nextSection(compressed = false): Promise<Buffer> {
    this.stream.read(4); // skip checksum, unchecked

    const numChunks: number = await this.stream.readUInt32LE();
    const chunks = [];

    for await (const chunk of this.readChunks(numChunks, compressed)) {
      chunks.push(chunk);
    }

    return Buffer.concat(chunks);
  }

  /**
   * Reads a number of chunks from the stream
   * @param numChunks number of chunks to read
   * @param compressed whether or not to decompress the chunks using zlib
   * @returns AsyncGenerator that yields chunks
   */
  private async *readChunks(
    numChunks: number,
    compressed = true
  ): AsyncGenerator<Uint8Array, void, void> {
    for (let i = 0; i < numChunks; i++) {
      const chunkSize = await this.stream.readUInt32LE();
      yield compressed
        ? await this.unzip(await this.stream.read(chunkSize))
        : this.stream.read(chunkSize);
    }
  }
}
