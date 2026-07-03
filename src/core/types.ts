export type AppModeId =
  | 'IDLE'
  | 'ANALYST'
  | 'PROFESSIONAL'
  | 'GAMING'
  | 'BATTLE'
  | 'AI_PROCESSING'
  | 'SLEEP'
  | 'OVERHEATED';

export type VoiceStyle =
  | 'calm'
  | 'analytical'
  | 'formal'
  | 'playful'
  | 'intense'
  | 'synthetic'
  | 'whisper'
  | 'strained';

export type HudStyle = 'minimal' | 'data' | 'corporate' | 'arcade' | 'combat' | 'neural' | 'dormant' | 'warning';

export interface ModeDefinition {
  id: AppModeId;
  label: string;
  eyeColor: string;
  accentColor: string;
  voiceStyle: VoiceStyle;
  backgroundGlow: string;
  hudStyle: HudStyle;
}

export interface AppSettings {
  windowPosition: { x: number; y: number };
  scale: number;
  volume: number;
  voiceMuted: boolean;
  currentMode: AppModeId;
  alwaysOnTop: boolean;
  clickThrough: boolean;
}

export const DEFAULT_SETTINGS: AppSettings = {
  windowPosition: { x: 100, y: 100 },
  scale: 1,
  volume: 0.8,
  voiceMuted: false,
  currentMode: 'IDLE',
  alwaysOnTop: true,
  clickThrough: false,
};

export interface HardwareSnapshot {
  cpuTempCelsius: number | null;
  gpuTempCelsius: number | null;
  cpuUsagePercent: number | null;
  memoryUsagePercent: number | null;
  isOverheated: boolean;
}

export interface NotificationPayload {
  id: string;
  title: string;
  message: string;
  durationMs?: number;
}

export interface AppStateSnapshot {
  mode: AppModeId;
  settings: AppSettings;
  clickThrough: boolean;
  isTransitioning: boolean;
  hardware: HardwareSnapshot | null;
  notification: NotificationPayload | null;
}
