import { Buffer } from "buffer";

/**
 * A helper for reading bytes from a ReadableStream.
 *
 * @example
 * Example using a Node ReadStream (convert to ReadableStream first):
 * ```
 * const file = await open(replay, O_RDONLY);
 * const readStream = file.createReadStream();
 * const streamReader = new StreamReader(new ReadableStream({
 *   start(controller) {
 *     readStream.on("data", (chunk) => {
 *       controller.enqueue(chunk);
 *     });
 *     readStream.on("end", () => {
 *       controller.close();
 *     });
 *     readStream.on("error", (err) => {
 *       controller.error(err);
 *     });
 *   },
 *   type: "bytes",
 * }));
 *
 * const byte = await streamReader.readUInt8();
 * ```
 *
 * @example
 * Example using a Fetch Response (convert to ReadableStream first):
 * ```
 * const response = await fetch(replay);
 * const streamReader = new StreamReader(response.body);
 *
 * const byte = await streamReader.readUInt8();
 * ```
 */
export class StreamReader {
  private byobReader: ReadableStreamBYOBReader;
  private _readOffset: number = 0;

  constructor(private stream: ReadableStream) {
    this.byobReader = this.stream.getReader({
      mode: "byob",
    });
  }

  public get readOffset() {
    return this._readOffset;
  }

  public async read(length: number): Promise<Buffer> {
    let buffer = Buffer.alloc(length);
    let bytesRead = 0;

    while (bytesRead < length) {
      const { done, value } = await this.byobReader.read(buffer);

      if (done) {
        throw new Error("Unexpected end of stream");
      }

      buffer = Buffer.from(value);
      bytesRead += value.byteLength;
    }

    return buffer;
  }

  skip = async (length: number) => {
    await this.read(length);
  };

  readInt8 = async (): Promise<number> =>
    this.read(1).then((buffer) => buffer.readInt8(0));
  readInt16LE = async (): Promise<number> =>
    this.read(2).then((buffer) => buffer.readInt16LE(0));
  readInt32LE = async (): Promise<number> =>
    this.read(4).then((buffer) => buffer.readInt32LE(0));
  readUInt8 = async (): Promise<number> =>
    this.read(1).then((buffer) => buffer.readUInt8(0));
  readUInt16LE = async (): Promise<number> =>
    this.read(2).then((buffer) => buffer.readUInt16LE(0));
  readUInt32LE = async (): Promise<number> =>
    this.read(4).then((buffer) => buffer.readUInt32LE(0));
  readFloatLE = async (): Promise<number> =>
    this.read(4).then((buffer) => buffer.readFloatLE(0));
  readString = async (length: number): Promise<string> =>
    this.read(length).then((buffer) => buffer.toString());
}
