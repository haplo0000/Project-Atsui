import type { AppModeId, ModeDefinition } from '@/core/types';

export const MODES: Record<AppModeId, ModeDefinition> = {
  IDLE: {
    id: 'IDLE',
    label: 'Idle',
    eyeColor: '#7ec8e3',
    accentColor: '#4a90a4',
    voiceStyle: 'calm',
    backgroundGlow: 'rgba(126, 200, 227, 0.25)',
    hudStyle: 'minimal',
  },
  ANALYST: {
    id: 'ANALYST',
    label: 'Analyst',
    eyeColor: '#64ffda',
    accentColor: '#00bfa5',
    voiceStyle: 'analytical',
    backgroundGlow: 'rgba(100, 255, 218, 0.2)',
    hudStyle: 'data',
  },
  PROFESSIONAL: {
    id: 'PROFESSIONAL',
    label: 'Professional',
    eyeColor: '#90caf9',
    accentColor: '#1565c0',
    voiceStyle: 'formal',
    backgroundGlow: 'rgba(144, 202, 249, 0.18)',
    hudStyle: 'corporate',
  },
  GAMING: {
    id: 'GAMING',
    label: 'Gaming',
    eyeColor: '#ce93d8',
    accentColor: '#9c27b0',
    voiceStyle: 'playful',
    backgroundGlow: 'rgba(206, 147, 216, 0.3)',
    hudStyle: 'arcade',
  },
  BATTLE: {
    id: 'BATTLE',
    label: 'Battle',
    eyeColor: '#ff5252',
    accentColor: '#d32f2f',
    voiceStyle: 'intense',
    backgroundGlow: 'rgba(255, 82, 82, 0.35)',
    hudStyle: 'combat',
  },
  AI_PROCESSING: {
    id: 'AI_PROCESSING',
    label: 'AI Processing',
    eyeColor: '#69f0ae',
    accentColor: '#00e676',
    voiceStyle: 'synthetic',
    backgroundGlow: 'rgba(105, 240, 174, 0.28)',
    hudStyle: 'neural',
  },
  SLEEP: {
    id: 'SLEEP',
    label: 'Sleep',
    eyeColor: '#7986cb',
    accentColor: '#3949ab',
    voiceStyle: 'whisper',
    backgroundGlow: 'rgba(121, 134, 203, 0.12)',
    hudStyle: 'dormant',
  },
  OVERHEATED: {
    id: 'OVERHEATED',
    label: 'Overheated',
    eyeColor: '#ff6e40',
    accentColor: '#e64a19',
    voiceStyle: 'strained',
    backgroundGlow: 'rgba(255, 110, 64, 0.4)',
    hudStyle: 'warning',
  },
};

export const MODE_ORDER: AppModeId[] = [
  'IDLE',
  'ANALYST',
  'PROFESSIONAL',
  'GAMING',
  'BATTLE',
  'AI_PROCESSING',
  'SLEEP',
  'OVERHEATED',
];

export function getModeDefinition(id: AppModeId): ModeDefinition {
  return MODES[id];
}
