import type { AppModeId } from '@/core/types';
import type { CommandName, CommandResult, ParsedCommand } from './types';
import { SUPPORTED_COMMANDS } from './types';

const MODE_MAP: Record<CommandName, AppModeId> = {
  analyze: 'ANALYST',
  chart: 'ANALYST',
  trade: 'BATTLE',
  sleep: 'SLEEP',
  game: 'GAMING',
  work: 'PROFESSIONAL',
  cool: 'OVERHEATED',
  idle: 'IDLE',
};

export function parseCommandInput(input: string): ParsedCommand | null {
  const trimmed = input.trim();
  if (!trimmed) return null;

  const [rawName, ...rest] = trimmed.split(/\s+/);
  const name = rawName.toLowerCase() as CommandName;

  if (!SUPPORTED_COMMANDS.includes(name)) {
    return null;
  }

  return { name, args: rest.join(' ').trim() };
}

export function resolveCommand(command: ParsedCommand): CommandResult {
  const mode = MODE_MAP[command.name];

  switch (command.name) {
    case 'analyze': {
      const symbol = (command.args || 'MARKET').toUpperCase();
      return { mode, response: `Analyzing ${symbol}...` };
    }
    case 'chart': {
      const symbol = command.args ? command.args.toUpperCase() : null;
      return {
        mode,
        response: symbol ? `Loading chart for ${symbol}...` : 'Opening chart view...',
      };
    }
    case 'trade':
      return { mode, response: 'Trade mode active.' };
    case 'sleep':
      return { mode, response: 'Entering rest mode.' };
    case 'game':
      return { mode, response: 'Game mode ready.' };
    case 'work':
      return { mode, response: 'Professional mode engaged.' };
    case 'cool':
      return { mode, response: 'Temperature warning detected.' };
    case 'idle':
      return { mode, response: 'Standing by.' };
    default:
      return { mode: 'IDLE', response: 'Standing by.' };
  }
}
