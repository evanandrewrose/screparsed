import { PlayerInfo, PlayerStruct } from "@/parser/sections/player_info";
import { Frame } from "@/parser/sections/frames";
import {
  CommandOfType,
  ParsedCommand,
  TypeIDChat,
  TypeIDLeaveGame,
} from "@/parser/sections/frames/commands";
import { Memoize } from "typescript-memoize";
import { Color, Colors } from "@/post-process/colors";

export type WithFrameAndTime<T> = T & {
  frame: number;
  timeMs: number;
};

export type ParsedCommandWithFrameAndTime = WithFrameAndTime<ParsedCommand>;

/**
 * Interface to expose user-friendly information about a replay, including computed properties. Consumes the (mostly) raw data from the
 * parser.
 */
export class ParsedReplay {
  constructor(private _playerInfo: PlayerInfo, private _frames: Frame[]) {}

  public get durationMs() {
    return this._playerInfo.frames * 42;
  }

  public get gameInfo() {
    const {
      engine,
      frames,
      startTime,
      title,
      mapWidth,
      mapHeight,
      availableSlotsCount,
      speed,
      type,
      subType,
      host,
      map,
    } = this._playerInfo;

    return {
      engine,
      frames,
      startTime,
      title,
      mapWidth,
      mapHeight,
      availableSlotsCount,
      speed,
      type,
      subType,
      host,
      map,
    }
  }

  public get frames() {
    return this._playerInfo.frames;
  }

  @Memoize()
  public get commands(): WithFrameAndTime<ParsedCommand>[] {
    return this._frames.flatMap((frame) =>
      frame.commands.map((command) => ({
        ...command,
        frame: frame.frameNumber,
        timeMs: frame.frameNumber * 42, // 42 ms per frame
      }))
    );
  }

  @Memoize()
  public get players(): Array<PlayerStruct & { color: Color }> {
    return this._playerInfo.playerStructs
      .filter((p) => p.name !== "")
      .map((p) => ({
        ...p,
        color: Colors[this._playerInfo.playerColors[p.slotID].color],
      }));
  }

  @Memoize()
  public get leaveCommands() {
    return this.commands.filter((command) => command.kind === TypeIDLeaveGame);
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
      (command) => command.kind === TypeIDChat
    ) as WithFrameAndTime<CommandOfType<typeof TypeIDChat>>[];

    return chatCommands.map((command) => ({
      sender: this.playersBySlotId[command.data.sender],
      message: command.data.message,
      timeMs: command.timeMs,
    }));
  }
}