import type { AppModeId } from '@/core/types';

export type CommandName =
  | 'analyze'
  | 'chart'
  | 'trade'
  | 'sleep'
  | 'game'
  | 'work'
  | 'cool'
  | 'idle';

export interface ParsedCommand {
  name: CommandName;
  args: string;
}

export interface ConsoleEntry {
  id: string;
  kind: 'user' | 'atsui' | 'system';
  text: string;
  timestamp: number;
}

export interface CommandResult {
  mode: AppModeId;
  response: string;
}

export const COMMAND_HELP =
  'Commands: analyze, chart, trade, sleep, game, work, cool, idle';

export const SUPPORTED_COMMANDS: CommandName[] = [
  'analyze',
  'chart',
  'trade',
  'sleep',
  'game',
  'work',
  'cool',
  'idle',
];
