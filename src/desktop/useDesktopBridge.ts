import { useEffect } from 'react';
import type { AppModeId } from '@/core/types';
import { modeManager } from '@/modes/ModeManager';
import { settingsManager } from '@/services/SettingsManager';
import { eventBus } from '@/events/EventBus';
import { voiceManager } from '@/voice/VoiceManager';

const MODE_CHANNELS: Record<string, AppModeId> = {
  'mode-idle': 'IDLE',
  'mode-analyst': 'ANALYST',
  'mode-professional': 'PROFESSIONAL',
  'mode-gaming': 'GAMING',
  'mode-battle': 'BATTLE',
  'mode-ai-processing': 'AI_PROCESSING',
  'mode-sleep': 'SLEEP',
  'mode-overheated': 'OVERHEATED',
};

function toggleClickThrough(): void {
  const api = window.electronAPI;
  if (!api) return;
  const settings = settingsManager.get();
  const next = !settings.clickThrough;
  settingsManager.save({ clickThrough: next });
  void api.setClickThrough(next);
  eventBus.emit('click-through:toggle', { enabled: next });
}

export function useElectronBridge(onOpenSettings: () => void): void {
  useEffect(() => {
    const api = window.electronAPI;
    if (!api) return;

    const cleanups: Array<() => void> = [];

    for (const [channel, modeId] of Object.entries(MODE_CHANNELS)) {
      cleanups.push(
        api.on(channel, () => {
          modeManager.setMode(modeId);
          settingsManager.save({ currentMode: modeId });
        }),
      );
    }

    cleanups.push(api.on('toggle-click-through', toggleClickThrough));
    cleanups.push(api.on('open-settings', onOpenSettings));
    cleanups.push(api.on('position-reset', () => settingsManager.resetPosition()));
    cleanups.push(api.on('request-exit', () => api.exitApp()));

    return () => {
      for (const off of cleanups) off();
    };
  }, [onOpenSettings]);
}

export function useSettingsSync(): void {
  useEffect(() => {
    const settings = settingsManager.get();
    voiceManager.setVolume(settings.volume);
    voiceManager.setMuted(settings.voiceMuted);

    const api = window.electronAPI;
    if (!api) return;

    void api.setClickThrough(settings.clickThrough);
    void api.setAlwaysOnTop(settings.alwaysOnTop);
  }, []);
}

export function useContextMenuHandlers(): {
  showContextMenu: (e: React.MouseEvent) => void;
} {
  const showContextMenu = (e: React.MouseEvent) => {
    e.preventDefault();
    window.electronAPI?.requestContextMenu();
  };

  return { showContextMenu };
}
