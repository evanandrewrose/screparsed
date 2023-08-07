import { SmartBuffer } from "smart-buffer";
import { ParsedCommand, TypeID, parseCommand } from "./commands";
import { Buffer } from "buffer";

export interface Frame {
  frameNumber: number;
  commands: ParsedCommand<TypeID>[];
}

export function* parseFramesSection(frames: Buffer): Generator<Frame> {
  const buffer = SmartBuffer.fromBuffer(frames as any);

  while (buffer.readOffset < buffer.length) {
    const frameNumber = buffer.readUInt32LE();
    const blockSize = buffer.readUInt8();
    const endOfFrame = buffer.readOffset + blockSize;
    const commands = [];

    while (buffer.readOffset < endOfFrame) {
      const playerId = buffer.readUInt8();
      const commandType = buffer.readUInt8();
      const command = parseCommand(buffer, playerId, commandType as TypeID);

      if (command === null) {
        buffer.readOffset = endOfFrame;
      } else {
        commands.push(command);
      }
    }

    yield {
      frameNumber,
      commands,
    };
  }
}
