import type { AppModeId } from '@/core/types';

export const LAUNCH_LINE = 'Atsui online.';

export const MODE_LINES: Record<AppModeId, string> = {
  IDLE: 'Standing by.',
  ANALYST: "Let's have a look.",
  PROFESSIONAL: 'Professional mode.',
  GAMING: 'Game mode ready.',
  BATTLE: 'Battle mode.',
  AI_PROCESSING: 'Processing.',
  SLEEP: 'Resting.',
  OVERHEATED: 'Temperature warning.',
};
