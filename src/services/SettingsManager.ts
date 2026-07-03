import type { AppSettings } from '@/core/types';
import { DEFAULT_SETTINGS } from '@/core/types';
import { appState } from '@/core/AppState';
import { eventBus } from '@/events/EventBus';

const STORAGE_KEY = 'atsui-settings-v0.5';

export class SettingsManager {
  private settings: AppSettings = { ...DEFAULT_SETTINGS };

  load(): AppSettings {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Partial<AppSettings>;
        this.settings = { ...DEFAULT_SETTINGS, ...parsed };
      }
    } catch {
      this.settings = { ...DEFAULT_SETTINGS };
    }
    appState.hydrate(this.settings);
    return { ...this.settings };
  }

  save(partial?: Partial<AppSettings>): AppSettings {
    if (partial) {
      this.settings = { ...this.settings, ...partial };
    }
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.settings));
    } catch {
      // localStorage may be unavailable in some contexts
    }
    appState.updateSettings(this.settings);
    eventBus.emit('settings:change', { settings: { ...this.settings } });
    return { ...this.settings };
  }

  get(): AppSettings {
    return { ...this.settings };
  }

  resetPosition(): AppSettings {
    return this.save({ windowPosition: { ...DEFAULT_SETTINGS.windowPosition } });
  }
}

export const settingsManager = new SettingsManager();
