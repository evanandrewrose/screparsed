import {
    HotkeyTypeIDAdd,
    HotkeyTypeIDAssign,
    HotkeyTypeIDSelect,
    TypeIDBuildingMorph,
    TypeIDCancelAddon,
    TypeIDCancelBuild,
    TypeIDCancelMorph,
    TypeIDCancelNuke,
    TypeIDCancelTech,
    TypeIDCancelUpgrade,
    TypeIDHotkey,
    TypeIDLiftOff,
    TypeIDMergeArchon,
    TypeIDMergeDarkArchon,
    TypeIDSelect,
    TypeIDSelect121,
    TypeIDSelectAdd,
    TypeIDSelectAdd121,
    TypeIDSelectRemove,
    TypeIDSelectRemove121,
    TypeIDUnitMorph,
    TypeIDUpgrade
} from "@/parser/sections/frames/commands";
import { FramedCommand, FramedCommandOfType } from "@/post-process/parsed";

// Note: this is an rough approximation of the eapm logic from
// https://github.com/icza/screp/blob/b35f110c66f27653d922fc2e748420fa08d34df1/rep/eapm-util.go
// the goal isn't perfect parity, but to get something that's close enough. In practice, it's off by ~3-4%
// compared to the original implementation.

type ActionsPerCommand = 0 | 1;

const isSelectionChangeCommand = (command: FramedCommand) => {
  switch (command.kind) {
    case TypeIDSelect:
    case TypeIDSelectAdd:
    case TypeIDSelectRemove:
    case TypeIDSelect121:
    case TypeIDSelectAdd121:
    case TypeIDSelectRemove121:
      return true;
    case TypeIDHotkey:
      return command.data.type === HotkeyTypeIDSelect;
  }
  return false;
};

const isHotkeySelectCommand = (command: FramedCommand) =>
  command.kind === TypeIDHotkey && command.data.type === HotkeyTypeIDSelect;

const isDoubleTap = (
  command: FramedCommand,
  previousCommand: FramedCommand
) => {
  if (command.frame - previousCommand.frame > 8) {
    return false;
  }

  if (
    !isHotkeySelectCommand(command) ||
    !isHotkeySelectCommand(previousCommand)
  ) {
    return false;
  }

  const hotkeyCommand = command as FramedCommandOfType<typeof TypeIDHotkey>;
  const previousHotkeyCommand = previousCommand as FramedCommandOfType<
    typeof TypeIDHotkey
  >;

  return hotkeyCommand.data.group === previousHotkeyCommand.data.group;
};

const numActionsForCommand = (
  command: FramedCommand,
  commands: readonly FramedCommand[],
  frame: number
): ActionsPerCommand => {
  const previousCommand = commands[frame - 1];

  if (!previousCommand) {
    return 1; // first action is always effective
  }

  const previousKind = previousCommand.kind;
  const kind = command.kind;
  const deltaFrames = frame - previousCommand.frame;

  // select and deselect too quickly to even see selection
  if (
    deltaFrames <= 8 &&
    isSelectionChangeCommand(command) &&
    isSelectionChangeCommand(previousCommand)
  ) {
    const morePreviousCommand = commands[frame - 2];
    const commandIsDoubleTap = isDoubleTap(command, previousCommand);
    const previousCommandWasDoubleTap =
      morePreviousCommand && isDoubleTap(previousCommand, morePreviousCommand);
    if (commandIsDoubleTap && previousCommandWasDoubleTap) {
      return 0;
    }
    if (!commandIsDoubleTap) {
      return 0;
    }
  }

  // redundant repeated actions (no time limit)
  if (previousKind === kind) {
    if (
      [
        TypeIDUnitMorph,
        TypeIDBuildingMorph,
        TypeIDUpgrade,
        TypeIDMergeArchon,
        TypeIDMergeDarkArchon,
        TypeIDLiftOff,
        TypeIDCancelAddon,
        TypeIDCancelBuild,
        TypeIDCancelMorph,
        TypeIDCancelNuke,
        TypeIDCancelTech,
        TypeIDCancelUpgrade,
      ].includes(kind)
    ) {
      return 0;
    }

    // redundant assignment of hotkeys
    if (
      kind === TypeIDHotkey &&
      previousKind === TypeIDHotkey &&
      command.data.type === previousCommand.data.type &&
      (command.data.type === HotkeyTypeIDAdd ||
        command.data.type === HotkeyTypeIDAssign) &&
      command.data.group === previousCommand.data.group
    ) {
      return 0;
    }
  }

  return 1;
};

export const determineEffectiveActions = (commands: FramedCommand[]) =>
  commands
    .map((command, frame) => numActionsForCommand(command, commands, frame))
    .reduce((a: number, b: ActionsPerCommand) => a + b, 0);
