import { Parser } from "binary-parser";

const PlayerInfoParser = new Parser()
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

export type PlayerInfo = {
    engine: number;
    frames: number;
    startTime: Date;
    title: string;
    mapWidth: number;
    mapHeight: number;
    availableSlotsCount: number;
    speed: number;
    type: number;
    subType: number;
    host: string;
    map: string;
    playerStructs: PlayerStruct[];
    playerColors: PlayerColor[];
}

export type PlayerStruct = {
    slotID: number;
    ID: number;
    type: number;
    race: "zerg" | "terran" | "protoss";
    team: number;
    name: string;
}

export type PlayerColor = {
    color: number;
}

export const parsePlayerInfo = (buffer: Buffer): PlayerInfo => PlayerInfoParser.parse(buffer);