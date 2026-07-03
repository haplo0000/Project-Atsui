import type { AppModeId, AppSettings, AppStateSnapshot, NotificationPayload } from './types';
import { DEFAULT_SETTINGS } from './types';

type Listener = (snapshot: AppStateSnapshot) => void;

export class AppState {
  private mode: AppModeId = DEFAULT_SETTINGS.currentMode;
  private settings: AppSettings = { ...DEFAULT_SETTINGS };
  private clickThrough = false;
  private isTransitioning = false;
  private notification: NotificationPayload | null = null;
  private listeners = new Set<Listener>();

  getSnapshot(): AppStateSnapshot {
    return {
      mode: this.mode,
      settings: { ...this.settings },
      clickThrough: this.clickThrough,
      isTransitioning: this.isTransitioning,
      hardware: null,
      notification: this.notification ? { ...this.notification } : null,
    };
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.getSnapshot());
    return () => this.listeners.delete(listener);
  }

  private emit(): void {
    const snapshot = this.getSnapshot();
    for (const listener of this.listeners) {
      listener(snapshot);
    }
  }

  setMode(mode: AppModeId): void {
    this.mode = mode;
    this.settings.currentMode = mode;
    this.emit();
  }

  getMode(): AppModeId {
    return this.mode;
  }

  setTransitioning(value: boolean): void {
    this.isTransitioning = value;
    this.emit();
  }

  getSettings(): AppSettings {
    return { ...this.settings };
  }

  updateSettings(partial: Partial<AppSettings>): void {
    this.settings = { ...this.settings, ...partial };
    if (partial.currentMode) {
      this.mode = partial.currentMode;
    }
    if (partial.clickThrough !== undefined) {
      this.clickThrough = partial.clickThrough;
    }
    this.emit();
  }

  setClickThrough(value: boolean): void {
    this.clickThrough = value;
    this.settings.clickThrough = value;
    this.emit();
  }

  showNotification(payload: NotificationPayload): void {
    this.notification = payload;
    this.emit();
  }

  clearNotification(): void {
    this.notification = null;
    this.emit();
  }

  hydrate(settings: AppSettings): void {
    this.settings = { ...settings };
    this.mode = settings.currentMode;
    this.clickThrough = settings.clickThrough;
    this.emit();
  }
}

export const appState = new AppState();
