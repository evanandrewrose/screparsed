import { SmartBuffer } from "smart-buffer";
import { UnitMapping } from "@/parser/sections/frames/units";

export const TypeIDSaveGame = 0x06;
export const TypeIDLoadGame = 0x07;
export const TypeIDRestartGame = 0x08;
export const TypeIDSelect = 0x09;
export const TypeIDSelectAdd = 0x0a;
export const TypeIDSelectRemove = 0x0b;
export const TypeIDBuild = 0x0c;
export const TypeIDVision = 0x0d;
export const TypeIDAlliance = 0x0e;
export const TypeIDGameSpeed = 0x0f;
export const TypeIDPause = 0x10;
export const TypeIDResume = 0x11;
export const TypeIDCheat = 0x12;
export const TypeIDHotkey = 0x13;
export const TypeIDRightClick = 0x14;
export const TypeIDTargetedOrder = 0x15;
export const TypeIDCancelBuild = 0x18;
export const TypeIDCancelMorph = 0x19;
export const TypeIDStop = 0x1a;
export const TypeIDCarrierStop = 0x1b;
export const TypeIDReaverStop = 0x1c;
export const TypeIDOrderNothing = 0x1d;
export const TypeIDReturnCargo = 0x1e;
export const TypeIDTrain = 0x1f;
export const TypeIDCancelTrain = 0x20;
export const TypeIDCloak = 0x21;
export const TypeIDDecloak = 0x22;
export const TypeIDUnitMorph = 0x23;
export const TypeIDUnsiege = 0x25;
export const TypeIDSiege = 0x26;
export const TypeIDTrainFighter = 0x27; // Build interceptor / scarab
export const TypeIDUnloadAll = 0x28;
export const TypeIDUnload = 0x29;
export const TypeIDMergeArchon = 0x2a;
export const TypeIDHoldPosition = 0x2b;
export const TypeIDBurrow = 0x2c;
export const TypeIDUnburrow = 0x2d;
export const TypeIDCancelNuke = 0x2e;
export const TypeIDLiftOff = 0x2f;
export const TypeIDTech = 0x30;
export const TypeIDCancelTech = 0x31;
export const TypeIDUpgrade = 0x32;
export const TypeIDCancelUpgrade = 0x33;
export const TypeIDCancelAddon = 0x34;
export const TypeIDBuildingMorph = 0x35;
export const TypeIDStim = 0x36;
export const TypeIDSync = 0x37;
export const TypeIDVoiceEnable = 0x38;
export const TypeIDVoiceDisable = 0x39;
export const TypeIDVoiceSquelch = 0x3a;
export const TypeIDVoiceUnsquelch = 0x3b;
export const TypeIDStartGame = 0x3c;
export const TypeIDDownloadPercentage = 0x3d;
export const TypeIDChangeGameSlot = 0x3e;
export const TypeIDNewNetPlayer = 0x3f;
export const TypeIDJoinedGame = 0x40;
export const TypeIDChangeRace = 0x41;
export const TypeIDTeamGameTeam = 0x42;
export const TypeIDUMSTeam = 0x43;
export const TypeIDMeleeTeam = 0x44;
export const TypeIDSwapPlayers = 0x45;
export const TypeIDSavedData = 0x48;
export const TypeIDBriefingStart = 0x54;
export const TypeIDLatency = 0x55;
export const TypeIDReplaySpeed = 0x56;
export const TypeIDLeaveGame = 0x57;
export const TypeIDMinimapPing = 0x58;
export const TypeIDMergeDarkArchon = 0x5a;
export const TypeIDMakeGamePublic = 0x5b;
export const TypeIDChat = 0x5c;
export const TypeIDRightClick121 = 0x60;
export const TypeIDTargetedOrder121 = 0x61;
export const TypeIDUnload121 = 0x62;
export const TypeIDSelect121 = 0x63;
export const TypeIDSelectAdd121 = 0x64;
export const TypeIDSelectRemove121 = 0x65;

export const typeIdNames = {
  [TypeIDSaveGame]: "TypeIDSaveGame",
  [TypeIDLoadGame]: "TypeIDLoadGame",
  [TypeIDRestartGame]: "TypeIDRestartGame",
  [TypeIDSelect]: "TypeIDSelect",
  [TypeIDSelectAdd]: "TypeIDSelectAdd",
  [TypeIDSelectRemove]: "TypeIDSelectRemove",
  [TypeIDBuild]: "TypeIDBuild",
  [TypeIDVision]: "TypeIDVision",
  [TypeIDAlliance]: "TypeIDAlliance",
  [TypeIDGameSpeed]: "TypeIDGameSpeed",
  [TypeIDPause]: "TypeIDPause",
  [TypeIDResume]: "TypeIDResume",
  [TypeIDCheat]: "TypeIDCheat",
  [TypeIDHotkey]: "TypeIDHotkey",
  [TypeIDRightClick]: "TypeIDRightClick",
  [TypeIDTargetedOrder]: "TypeIDTargetedOrder",
  [TypeIDCancelBuild]: "TypeIDCancelBuild",
  [TypeIDCancelMorph]: "TypeIDCancelMorph",
  [TypeIDStop]: "TypeIDStop",
  [TypeIDCarrierStop]: "TypeIDCarrierStop",
  [TypeIDReaverStop]: "TypeIDReaverStop",
  [TypeIDOrderNothing]: "TypeIDOrderNothing",
  [TypeIDReturnCargo]: "TypeIDReturnCargo",
  [TypeIDTrain]: "TypeIDTrain",
  [TypeIDCancelTrain]: "TypeIDCancelTrain",
  [TypeIDCloak]: "TypeIDCloack",
  [TypeIDDecloak]: "TypeIDDecloack",
  [TypeIDUnitMorph]: "TypeIDUnitMorph",
  [TypeIDUnsiege]: "TypeIDUnsiege",
  [TypeIDSiege]: "TypeIDSiege",
  [TypeIDTrainFighter]: "TypeIDTrainFighter",
  [TypeIDUnloadAll]: "TypeIDUnloadAll",
  [TypeIDUnload]: "TypeIDUnload",
  [TypeIDMergeArchon]: "TypeIDMergeArchon",
  [TypeIDHoldPosition]: "TypeIDHoldPosition",
  [TypeIDBurrow]: "TypeIDBurrow",
  [TypeIDUnburrow]: "TypeIDUnburrow",
  [TypeIDCancelNuke]: "TypeIDCancelNuke",
  [TypeIDLiftOff]: "TypeIDLiftOff",
  [TypeIDTech]: "TypeIDTech",
  [TypeIDCancelTech]: "TypeIDCancelTech",
  [TypeIDUpgrade]: "TypeIDUpgrade",
  [TypeIDCancelUpgrade]: "TypeIDCancelUpgrade",
  [TypeIDCancelAddon]: "TypeIDCancelAddon",
  [TypeIDBuildingMorph]: "TypeIDBuildingMorph",
  [TypeIDStim]: "TypeIDStim",
  [TypeIDSync]: "TypeIDSync",
  [TypeIDVoiceEnable]: "TypeIDVoiceEnable",
  [TypeIDVoiceDisable]: "TypeIDVoiceDisable",
  [TypeIDVoiceSquelch]: "TypeIDVoiceSquelch",
  [TypeIDVoiceUnsquelch]: "TypeIDVoiceUnsquelch",
  [TypeIDStartGame]: "TypeIDStartGame",
  [TypeIDDownloadPercentage]: "TypeIDDownloadPercentage",
  [TypeIDChangeGameSlot]: "TypeIDChangeGameSlot",
  [TypeIDNewNetPlayer]: "TypeIDNewNetPlayer",
  [TypeIDJoinedGame]: "TypeIDJoinedGame",
  [TypeIDChangeRace]: "TypeIDChangeRace",
  [TypeIDTeamGameTeam]: "TypeIDTeamGameTeam",
  [TypeIDUMSTeam]: "TypeIDUMSTeam",
  [TypeIDMeleeTeam]: "TypeIDMeleeTeam",
  [TypeIDSwapPlayers]: "TypeIDSwapPlayers",
  [TypeIDSavedData]: "TypeIDSavedData",
  [TypeIDBriefingStart]: "TypeIDBriefingStart",
  [TypeIDLatency]: "TypeIDLatency",
  [TypeIDReplaySpeed]: "TypeIDReplaySpeed",
  [TypeIDLeaveGame]: "TypeIDLeaveGame",
  [TypeIDMinimapPing]: "TypeIDMinimapPing",
  [TypeIDMergeDarkArchon]: "TypeIDMergeDarkArchon",
  [TypeIDMakeGamePublic]: "TypeIDMakeGamePublic",
  [TypeIDChat]: "TypeIDChat",
  [TypeIDRightClick121]: "TypeIDRightClick121",
  [TypeIDTargetedOrder121]: "TypeIDTargetedOrder121",
  [TypeIDUnload121]: "TypeIDUnload121",
  [TypeIDSelect121]: "TypeIDSelect121",
  [TypeIDSelectAdd121]: "TypeIDSelectAdd121",
  [TypeIDSelectRemove121]: "TypeIDSelectRemove121",
};

export type TypeID = keyof typeof typeIdNames;

type CustomParser = (buffer: SmartBuffer) => any;
type NoAdditionalDataParser = number; // number can be used to specify the size of the data that we're ignoring, if any

type CommandParser = CustomParser | NoAdditionalDataParser;

const parseSaveLoadGame = (buffer: SmartBuffer) => {
  const size = buffer.readUInt16LE();
  buffer.readOffset += size;
};

const selectionParser = (buffer: SmartBuffer) => {
  const size = buffer.readUInt8();
  const selections = [];
  for (let i = 0; i < size; i++) {
    selections.push(buffer.readUInt16LE());
  }
  return { selections };
};

const buildParser = (buffer: SmartBuffer) => ({
  order: buffer.readUInt8(),
  x: buffer.readUInt16LE(),
  y: buffer.readUInt16LE(),
  unit: UnitMapping[buffer.readUInt16LE()],
});

const visionParser = (buffer: SmartBuffer) => ({
  slots: buffer.readUInt16LE(),
});

const allianceParser = (buffer: SmartBuffer) => ({
  alliance: buffer.readUInt32LE(),
});

const gameSpeedParser = (buffer: SmartBuffer) => ({
  speed: buffer.readUInt8(),
});

const cancelTrainParser = (buffer: SmartBuffer) => ({
  unitTag: buffer.readUInt16LE(),
});

const unloadParser = (buffer: SmartBuffer) => ({
  unitTag: buffer.readUInt16LE(),
});

const liftOffParser = (buffer: SmartBuffer) => ({
  x: buffer.readUInt16LE(),
  y: buffer.readUInt16LE(),
});

const techParser = (buffer: SmartBuffer) => ({
  tech: buffer.readUInt8(),
});

const upgradeParser = (buffer: SmartBuffer) => ({
  upgrade: buffer.readUInt8(),
});

const buildingMorphParser = (buffer: SmartBuffer) => ({
  unit: UnitMapping[buffer.readUInt16LE()],
});

const latencyParser = (buffer: SmartBuffer) => ({
  latency: buffer.readUInt8(),
});

const cheatParser = (buffer: SmartBuffer) => ({
  cheat: buffer.readUInt32LE(),
});

const rightClickParser = (buffer: SmartBuffer) => ({
  x: buffer.readUInt16LE(),
  y: buffer.readUInt16LE(),
  unitTag: buffer.readUInt16LE(),
  unit: UnitMapping[buffer.readUInt16LE()],
  queued: buffer.readUInt8(),
});

const hotkeyParser = (buffer: SmartBuffer) => ({
  type: buffer.readUInt8(),
  group: buffer.readUInt8(),
});

const trainOrMorphParser = (buffer: SmartBuffer) => ({
  unit: UnitMapping[buffer.readUInt16LE()],
});

const targetedOrderParser = (buffer: SmartBuffer) => ({
  x: buffer.readUInt16LE(),
  y: buffer.readUInt16LE(),
  unitTag: buffer.readUInt16LE(),
  unit: UnitMapping[buffer.readUInt16LE()],
  order: buffer.readUInt8(),
  queued: buffer.readUInt8(),
});

const queueableCommandParser = (buffer: SmartBuffer) => ({
  queued: buffer.readUInt8(),
});

const leaveGameParser = (buffer: SmartBuffer) => ({
  reason: buffer.readUInt8(),
});

const minimapPingParser = (buffer: SmartBuffer) => ({
  x: buffer.readUInt16LE(),
  y: buffer.readUInt16LE(),
});

const chatParser = (buffer: SmartBuffer) => ({
  sender: buffer.readUInt8(),
  message: buffer.readString(80).split("\0").shift(),
});

const rightClick121Parser = (buffer: SmartBuffer) => {
  const x = buffer.readUInt16LE();
  const y = buffer.readUInt16LE();
  const unitTag = buffer.readUInt16LE();
  buffer.readOffset += 2; // unknown
  const unit = UnitMapping[buffer.readUInt16LE()];
  const queued = buffer.readUInt8();
  return { x, y, unitTag, unit, queued };
};

const targetedOrder121Parser = (buffer: SmartBuffer) => {
  const x = buffer.readUInt16LE();
  const y = buffer.readUInt16LE();
  const unitTag = buffer.readUInt16LE();
  buffer.readOffset += 2; // unknown
  const unit = UnitMapping[buffer.readUInt16LE()];
  const order = buffer.readUInt8();
  const queued = buffer.readUInt8();
  return { x, y, unitTag, unit, order, queued };
};

const unload121Parser = (buffer: SmartBuffer) => {
  const unitTag = buffer.readUInt16LE();
  buffer.readOffset += 2; // unknown
  return { unitTag };
};

const select121Parser = (buffer: SmartBuffer) => {
  const size = buffer.readUInt8();
  const selections = [];
  for (let i = 0; i < size; i++) {
    selections.push({
      unitTag: buffer.readUInt16LE(),
    });
    buffer.readOffset += 2; // unknown
  }
  return { selections };
};

export const CommandParsers: {
  [key in TypeID]: CommandParser;
} = {
  // Command which have no additional data
  [TypeIDCancelBuild]: 0,
  [TypeIDCancelMorph]: 0,
  [TypeIDPause]: 0,
  [TypeIDResume]: 0,
  [TypeIDRestartGame]: 0,
  [TypeIDMergeDarkArchon]: 0,
  [TypeIDMakeGamePublic]: 0,
  [TypeIDCarrierStop]: 0,
  [TypeIDReaverStop]: 0,
  [TypeIDOrderNothing]: 0,
  [TypeIDTrainFighter]: 0,
  [TypeIDMergeArchon]: 0,
  [TypeIDCancelNuke]: 0,
  [TypeIDCancelTech]: 0,
  [TypeIDCancelUpgrade]: 0,
  [TypeIDCancelAddon]: 0,
  [TypeIDStim]: 0,
  [TypeIDVoiceEnable]: 0,
  [TypeIDVoiceDisable]: 0,
  [TypeIDStartGame]: 0,
  [TypeIDBriefingStart]: 0,

  // have additioanl data, but we ignore it, number indicates how many bytes we ignore
  [TypeIDSync]: 6,
  [TypeIDVoiceSquelch]: 1,
  [TypeIDVoiceUnsquelch]: 1,
  [TypeIDDownloadPercentage]: 1,
  [TypeIDChangeGameSlot]: 5,
  [TypeIDNewNetPlayer]: 7,
  [TypeIDJoinedGame]: 17,
  [TypeIDChangeRace]: 2,
  [TypeIDTeamGameTeam]: 1,
  [TypeIDUMSTeam]: 0,
  [TypeIDMeleeTeam]: 2,
  [TypeIDSwapPlayers]: 2,
  [TypeIDSavedData]: 12,
  [TypeIDReplaySpeed]: 9,

  // have additional data and we parse it using the given parser
  [TypeIDSaveGame]: parseSaveLoadGame,
  [TypeIDLoadGame]: parseSaveLoadGame,
  [TypeIDSelect]: selectionParser,
  [TypeIDSelectAdd]: selectionParser,
  [TypeIDSelectRemove]: selectionParser,
  [TypeIDBuild]: buildParser,
  [TypeIDVision]: visionParser,
  [TypeIDAlliance]: allianceParser,
  [TypeIDGameSpeed]: gameSpeedParser,
  [TypeIDCheat]: cheatParser,
  [TypeIDHotkey]: hotkeyParser,
  [TypeIDRightClick]: rightClickParser,
  [TypeIDTargetedOrder]: targetedOrderParser,
  [TypeIDStop]: queueableCommandParser,
  [TypeIDReturnCargo]: queueableCommandParser,
  [TypeIDTrain]: trainOrMorphParser,
  [TypeIDCancelTrain]: cancelTrainParser,
  [TypeIDCloak]: queueableCommandParser,
  [TypeIDDecloak]: queueableCommandParser,
  [TypeIDUnitMorph]: trainOrMorphParser,
  [TypeIDUnsiege]: queueableCommandParser,
  [TypeIDSiege]: queueableCommandParser,
  [TypeIDUnloadAll]: queueableCommandParser,
  [TypeIDUnload]: unloadParser,
  [TypeIDHoldPosition]: queueableCommandParser,
  [TypeIDBurrow]: queueableCommandParser,
  [TypeIDUnburrow]: queueableCommandParser,
  [TypeIDLiftOff]: liftOffParser,
  [TypeIDTech]: techParser,
  [TypeIDUpgrade]: upgradeParser,
  [TypeIDBuildingMorph]: buildingMorphParser,
  [TypeIDLatency]: latencyParser,
  [TypeIDLeaveGame]: leaveGameParser,
  [TypeIDMinimapPing]: minimapPingParser,
  [TypeIDChat]: chatParser,
  [TypeIDRightClick121]: rightClick121Parser,
  [TypeIDTargetedOrder121]: targetedOrder121Parser,
  [TypeIDUnload121]: unload121Parser,
  [TypeIDSelect121]: select121Parser,
  [TypeIDSelectAdd121]: select121Parser,
  [TypeIDSelectRemove121]: select121Parser,
} as const;

type CommandParserForTypeID<T extends TypeID> = (typeof CommandParsers)[T];

type CommandReturnType<T extends TypeID> = T extends typeof TypeIDChat
  ? ReturnType<typeof chatParser>
  : CommandParserForTypeID<T> extends number
  ? number
  : ReturnType<Exclude<CommandParserForTypeID<T>, number>>[T];

export interface ParsedCommand<T extends TypeID> {
  type: T;
  typeName: string;
  playerId: number;
  data: CommandReturnType<T>;
}

export const parseCommand = (
  buffer: SmartBuffer,
  playerId: number,
  typeId: TypeID
): ParsedCommand<TypeID> => {
  const parser = CommandParsers[typeId];

  if (parser === undefined) {
    console.warn(`Unknown command type ${typeId}`);
    return {
      type: typeId,
      typeName: 'Unknown',
      playerId,
      data: null,
    };
  }

  if (typeof parser === "number") {
    buffer.readOffset += parser;
    return {
      type: typeId,
      typeName: typeIdNames[typeId],
      playerId,
      data: null,
    };
  }

  return {
    type: typeId,
    typeName: typeIdNames[typeId],
    playerId,
    data: parser(buffer),
  };
};
