import { parseCommandInput, resolveCommand } from '@/commands/definitions';
import type { ConsoleEntry } from '@/commands/types';
import { COMMAND_HELP } from '@/commands/types';
import { modeManager } from '@/modes/ModeManager';
import { settingsManager } from '@/services/SettingsManager';
import { generateId } from '@/utils/helpers';

type ConsoleListener = (entries: ConsoleEntry[]) => void;

export class CommandService {
  private entries: ConsoleEntry[] = [];
  private listeners = new Set<ConsoleListener>();

  subscribe(listener: ConsoleListener): () => void {
    this.listeners.add(listener);
    listener(this.getEntries());
    return () => this.listeners.delete(listener);
  }

  getEntries(): ConsoleEntry[] {
    return [...this.entries];
  }

  private emit(): void {
    const snapshot = this.getEntries();
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }

  private append(kind: ConsoleEntry['kind'], text: string): void {
    this.entries = [
      ...this.entries,
      {
        id: generateId(),
        kind,
        text,
        timestamp: Date.now(),
      },
    ];
    this.emit();
  }

  execute(rawInput: string): void {
    const input = rawInput.trim();
    if (!input) return;

    this.append('user', `> ${input}`);

    const parsed = parseCommandInput(input);
    if (!parsed) {
      this.append('system', `Unknown command. ${COMMAND_HELP}`);
      return;
    }

    const result = resolveCommand(parsed);
    modeManager.setMode(result.mode);
    settingsManager.save({ currentMode: result.mode });
    this.append('atsui', result.response);
  }

  clear(): void {
    this.entries = [];
    this.emit();
  }
}

export const commandService = new CommandService();
