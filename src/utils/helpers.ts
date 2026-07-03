import type { AppModeId } from '@/core/types';

/** Map keyboard shortcut index (1–8) to mode ID. */
export function shortcutIndexToMode(index: number): AppModeId | null {
  const map: Record<number, AppModeId> = {
    1: 'IDLE',
    2: 'ANALYST',
    3: 'PROFESSIONAL',
    4: 'GAMING',
    5: 'BATTLE',
    6: 'AI_PROCESSING',
    7: 'SLEEP',
    8: 'OVERHEATED',
  };
  return map[index] ?? null;
}

/** Generate a unique ID for notifications. */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
