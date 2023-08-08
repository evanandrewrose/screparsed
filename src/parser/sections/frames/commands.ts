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
} as const;

export type TypeID = keyof typeof typeIdNames;

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

const createTypedSkipParser =
  <T extends TypeID>(type: T, bytes: number = 0) =>
  (playerId: number, buffer: SmartBuffer) => {
    buffer.readOffset += bytes;

    return { kind: type, typeName: typeIdNames[type], playerId };
  };

const createTypedParser =
  <T extends TypeID, P extends (buffer: SmartBuffer) => any>(
    type: T,
    parser: P
  ) =>
  (playerId: number, buffer: SmartBuffer) => ({
    kind: type,
    typeName: typeIdNames[type],
    playerId,
    data: parser(buffer) as ReturnType<P>,
  });

export const CommandParsers = {
  // Command which have no additional data
  [TypeIDCancelBuild]: createTypedSkipParser(TypeIDCancelBuild),
  [TypeIDCancelMorph]: createTypedSkipParser(TypeIDCancelMorph),
  [TypeIDPause]: createTypedSkipParser(TypeIDPause),
  [TypeIDResume]: createTypedSkipParser(TypeIDResume),
  [TypeIDRestartGame]: createTypedSkipParser(TypeIDRestartGame),
  [TypeIDMergeDarkArchon]: createTypedSkipParser(TypeIDMergeDarkArchon),
  [TypeIDMakeGamePublic]: createTypedSkipParser(TypeIDMakeGamePublic),
  [TypeIDCarrierStop]: createTypedSkipParser(TypeIDCarrierStop),
  [TypeIDReaverStop]: createTypedSkipParser(TypeIDReaverStop),
  [TypeIDOrderNothing]: createTypedSkipParser(TypeIDOrderNothing),
  [TypeIDTrainFighter]: createTypedSkipParser(TypeIDTrainFighter),
  [TypeIDMergeArchon]: createTypedSkipParser(TypeIDMergeArchon),
  [TypeIDCancelNuke]: createTypedSkipParser(TypeIDCancelNuke),
  [TypeIDCancelTech]: createTypedSkipParser(TypeIDCancelTech),
  [TypeIDCancelUpgrade]: createTypedSkipParser(TypeIDCancelUpgrade),
  [TypeIDCancelAddon]: createTypedSkipParser(TypeIDCancelAddon),
  [TypeIDStim]: createTypedSkipParser(TypeIDStim),
  [TypeIDVoiceEnable]: createTypedSkipParser(TypeIDVoiceEnable),
  [TypeIDVoiceDisable]: createTypedSkipParser(TypeIDVoiceDisable),
  [TypeIDStartGame]: createTypedSkipParser(TypeIDStartGame),
  [TypeIDBriefingStart]: createTypedSkipParser(TypeIDBriefingStart),

  // have additioanl data, but we ignore it, number indicates how many bytes we ignore
  [TypeIDSync]: createTypedSkipParser(TypeIDSync, 6),
  [TypeIDVoiceSquelch]: createTypedSkipParser(TypeIDVoiceSquelch, 1),
  [TypeIDVoiceUnsquelch]: createTypedSkipParser(TypeIDVoiceUnsquelch, 1),
  [TypeIDDownloadPercentage]: createTypedSkipParser(
    TypeIDDownloadPercentage,
    1
  ),
  [TypeIDChangeGameSlot]: createTypedSkipParser(TypeIDChangeGameSlot, 5),
  [TypeIDNewNetPlayer]: createTypedSkipParser(TypeIDNewNetPlayer, 7),
  [TypeIDJoinedGame]: createTypedSkipParser(TypeIDJoinedGame, 17),
  [TypeIDChangeRace]: createTypedSkipParser(TypeIDChangeRace, 2),
  [TypeIDTeamGameTeam]: createTypedSkipParser(TypeIDTeamGameTeam, 1),
  [TypeIDUMSTeam]: createTypedSkipParser(TypeIDUMSTeam, 0),
  [TypeIDMeleeTeam]: createTypedSkipParser(TypeIDMeleeTeam, 2),
  [TypeIDSwapPlayers]: createTypedSkipParser(TypeIDSwapPlayers, 2),
  [TypeIDSavedData]: createTypedSkipParser(TypeIDSavedData, 12),
  [TypeIDReplaySpeed]: createTypedSkipParser(TypeIDReplaySpeed, 9),

  // have additional data and we parse it using the given parser
  [TypeIDSaveGame]: createTypedParser(TypeIDSaveGame, parseSaveLoadGame),
  [TypeIDLoadGame]: createTypedParser(TypeIDLoadGame, parseSaveLoadGame),
  [TypeIDSelect]: createTypedParser(TypeIDSelect, selectionParser),
  [TypeIDSelectAdd]: createTypedParser(TypeIDSelectAdd, selectionParser),
  [TypeIDSelectRemove]: createTypedParser(TypeIDSelectRemove, selectionParser),
  [TypeIDBuild]: createTypedParser(TypeIDBuild, buildParser),
  [TypeIDVision]: createTypedParser(TypeIDVision, visionParser),
  [TypeIDAlliance]: createTypedParser(TypeIDAlliance, allianceParser),
  [TypeIDGameSpeed]: createTypedParser(TypeIDGameSpeed, gameSpeedParser),
  [TypeIDCheat]: createTypedParser(TypeIDCheat, cheatParser),
  [TypeIDHotkey]: createTypedParser(TypeIDHotkey, hotkeyParser),
  [TypeIDRightClick]: createTypedParser(TypeIDRightClick, rightClickParser),
  [TypeIDTargetedOrder]: createTypedParser(
    TypeIDTargetedOrder,
    targetedOrderParser
  ),
  [TypeIDStop]: createTypedParser(TypeIDStop, queueableCommandParser),
  [TypeIDReturnCargo]: createTypedParser(
    TypeIDReturnCargo,
    queueableCommandParser
  ),
  [TypeIDTrain]: createTypedParser(TypeIDTrain, trainOrMorphParser),
  [TypeIDCancelTrain]: createTypedParser(TypeIDCancelTrain, cancelTrainParser),
  [TypeIDCloak]: createTypedParser(TypeIDCloak, queueableCommandParser),
  [TypeIDDecloak]: createTypedParser(TypeIDDecloak, queueableCommandParser),
  [TypeIDUnitMorph]: createTypedParser(TypeIDUnitMorph, trainOrMorphParser),
  [TypeIDUnsiege]: createTypedParser(TypeIDUnsiege, queueableCommandParser),
  [TypeIDSiege]: createTypedParser(TypeIDSiege, queueableCommandParser),
  [TypeIDUnloadAll]: createTypedParser(TypeIDUnloadAll, queueableCommandParser),
  [TypeIDUnload]: createTypedParser(TypeIDUnload, unloadParser),
  [TypeIDHoldPosition]: createTypedParser(
    TypeIDHoldPosition,
    queueableCommandParser
  ),
  [TypeIDBurrow]: createTypedParser(TypeIDBurrow, queueableCommandParser),
  [TypeIDUnburrow]: createTypedParser(TypeIDUnburrow, queueableCommandParser),
  [TypeIDLiftOff]: createTypedParser(TypeIDLiftOff, liftOffParser),
  [TypeIDTech]: createTypedParser(TypeIDTech, techParser),
  [TypeIDUpgrade]: createTypedParser(TypeIDUpgrade, upgradeParser),
  [TypeIDBuildingMorph]: createTypedParser(
    TypeIDBuildingMorph,
    buildingMorphParser
  ),
  [TypeIDLatency]: createTypedParser(TypeIDLatency, latencyParser),
  [TypeIDLeaveGame]: createTypedParser(TypeIDLeaveGame, leaveGameParser),
  [TypeIDMinimapPing]: createTypedParser(TypeIDMinimapPing, minimapPingParser),
  [TypeIDChat]: createTypedParser(TypeIDChat, chatParser),
  [TypeIDRightClick121]: createTypedParser(
    TypeIDRightClick121,
    rightClick121Parser
  ),
  [TypeIDTargetedOrder121]: createTypedParser(
    TypeIDTargetedOrder121,
    targetedOrder121Parser
  ),
  [TypeIDUnload121]: createTypedParser(TypeIDUnload121, unload121Parser),
  [TypeIDSelect121]: createTypedParser(TypeIDSelect121, select121Parser),
  [TypeIDSelectAdd121]: createTypedParser(TypeIDSelectAdd121, select121Parser),
  [TypeIDSelectRemove121]: createTypedParser(
    TypeIDSelectRemove121,
    select121Parser
  ),
} as const;

type CommandParserNames = keyof typeof CommandParsers;
type CommandParsers = (typeof CommandParsers)[CommandParserNames];
export type ParsedCommand = ReturnType<CommandParsers>;
export type CommandOfType<T extends TypeID> = Exclude<ParsedCommand, 'kind'> & { kind: T };

export const parseCommand = (
  buffer: SmartBuffer,
  playerId: number,
  typeId: TypeID
): {
  success: true;
  parsed: ParsedCommand
 } | {
  success: false;
  typeId: TypeID;
  playerId: number;
 } => {
  const parser = CommandParsers[typeId];

  if (parser === undefined) {
    return {
      success: false,
      typeId,
      playerId,
    }
  }

  return {
    success: true,
    parsed: parser(playerId, buffer),
  }
};