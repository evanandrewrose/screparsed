import { SmartBuffer } from "smart-buffer";
import { TypeID, parseCommand } from "./commands";

export function* parseFramesSection(frames: Buffer) {
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
