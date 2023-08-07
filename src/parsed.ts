import { PlayerInfo } from "@/parser/sections/player_info";
import { Frame } from "@/parser/sections/frames";
import {
  ParsedCommand,
  TypeID,
  TypeIDChat,
  TypeIDLeaveGame,
} from "@/parser/sections/frames/commands";
import { Memoize } from "typescript-memoize";

export type WithFrameAndTime<T> = T & {
  frame: number;
  timeMs: number;
};

export type ParsedCommandWithFrameAndTime<T extends TypeID> = WithFrameAndTime<
  ParsedCommand<T>
>;

/**
 * Interface to expose user-friendly information about a replay, including computed properties. Consumes the (mostly) raw data from the
 * parser.
 */
export class ParsedReplay {
  constructor(private playerInfo: PlayerInfo, private frames: Frame[]) {}

  public get durationMs() {
    return this.playerInfo.frames * 42;
  }

  @Memoize()
  public get commands(): WithFrameAndTime<ParsedCommand<TypeID>>[] {
    return this.frames.flatMap((frame) =>
      frame.commands.map((command) => ({
        ...command,
        frame: frame.frameNumber,
        timeMs: frame.frameNumber * 42,
      }))
    );
  }

  @Memoize()
  public get players() {
    return this.playerInfo.playerStructs.filter((p) => p.name !== "");
  }

  @Memoize()
  public get leaveCommands() {
    return this.commands.filter((command) => command.type === TypeIDLeaveGame);
  }

  @Memoize()
  private get playersBySlotId() {
    return this.players.reduce((acc, player) => {
      acc[player.slotID] = player;
      return acc;
    }, {} as Record<number, (typeof this.players)[number]>);
  }

  @Memoize()
  public get chatMessages() {
    const chatCommands = this.commands.filter(
      (command) => command.type === TypeIDChat
    ) as ParsedCommandWithFrameAndTime<typeof TypeIDChat>[];

    return chatCommands.map((command) => ({
      sender: this.playersBySlotId[command.data.sender],
      message: command.data.message,
      timeMs: command.timeMs,
    }));
  }
}
