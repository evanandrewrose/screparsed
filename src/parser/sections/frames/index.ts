import { SmartBuffer } from "smart-buffer";
import { ParsedCommand, TypeID, parseCommand } from "./commands";
import { Buffer } from "buffer";

export interface Frame {
  frameNumber: number;
  commands: ParsedCommand[];
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

      if (command.success === false) {
        // jump to the end of the frame. we can't parse the remaining commands in this frame, since we don't know the size of this
        // unparsable one
        buffer.readOffset = endOfFrame;
      } else {
        commands.push(command.parsed);
      }
    }

    yield {
      frameNumber,
      commands,
    };
  }
}
