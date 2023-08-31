import { GameInfo, PlayerStruct } from "@/parser/sections/game-info";
import { Frame } from "@/parser/sections/frames";
import {
  CommandOfType,
  ParsedCommand,
  TypeID,
  TypeIDChat,
  TypeIDLeaveGame,
} from "@/parser/sections/frames/commands";
import { Memoize } from "typescript-memoize";
import { Color, Colors } from "@/post-process/colors";
import { determineEffectiveActions } from "@/post-process/eapm";

export type WithFrameAndTime<T> = T & {
  frame: number;
  timeMs: number;
};

export type FramedCommand = WithFrameAndTime<ParsedCommand>;
export type FramedCommandOfType<T extends TypeID> = WithFrameAndTime<CommandOfType<T>>;

/**
 * User-friendly information about a replay, including computed properties. Consumes the (mostly) raw data from the
 * parser.
 */
export class ParsedReplay {
  constructor(private readonly _gameInfo: GameInfo, private readonly _frames: Frame[], private readonly _colors: Array<Color | null>) {}

  public get durationMs() {
    return this._gameInfo.frames * 42;
  }

  public get durationMinutes() {
    return this.durationMs / 1000 / 60;
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
    } = this._gameInfo;

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
    return this._gameInfo.frames;
  }

  @Memoize()
  public get commands(): FramedCommand[] {
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
    const players = [];

    for (const player of this._gameInfo.playerStructs) {
      if (player.name !== "") {
        const actions: FramedCommand[] | undefined = this._actionsByPlayer[player.ID];
        const colorFromHeader = Colors[this._gameInfo.playerColors[player.slotID].color];
        const colorFromColorsSection = this._colors[player.slotID];

        players.push({
          ...player,
          color: colorFromColorsSection ?? colorFromHeader,
          apm: actions ? Math.round(actions.length / this.durationMinutes) : 0,
          eapm: actions ? Math.round(determineEffectiveActions(actions) / this.durationMinutes) : 0,
        });
      }
    }

    return players;
  }

  @Memoize()
  public get leaveCommands() {
    return this.commands.filter((command) => command.kind === TypeIDLeaveGame) as FramedCommandOfType<typeof TypeIDLeaveGame>[];
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
    ) as FramedCommandOfType<typeof TypeIDChat>[];

    return chatCommands.map((command) => ({
      sender: this.playersBySlotId[command.data.sender],
      message: command.data.message,
      timeMs: command.timeMs,
    }));
  }

  @Memoize()
  private get _actionsByPlayer() {
    const actionsByPlayerId: Record<
      number,
      FramedCommand[]
      >
    = {};

    for (const command of this.commands) {
      const playerActions = actionsByPlayerId[command.playerId];

      if (playerActions) {
        playerActions.push(command);
      } else {
        actionsByPlayerId[command.playerId] = [command];
      }
    }

    return actionsByPlayerId;
  }
}