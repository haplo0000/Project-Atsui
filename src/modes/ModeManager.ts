import type { AppModeId } from '@/core/types';
import { appState } from '@/core/AppState';
import { eventBus } from '@/events/EventBus';
import { getModeDefinition } from '@/modes/definitions';

const TRANSITION_MIN_MS = 250;
const TRANSITION_MAX_MS = 400;

function randomTransitionDuration(): number {
  return TRANSITION_MIN_MS + Math.floor(Math.random() * (TRANSITION_MAX_MS - TRANSITION_MIN_MS + 1));
}

export class ModeManager {
  private currentMode: AppModeId = appState.getMode();
  private transitionTimer: ReturnType<typeof setTimeout> | null = null;

  constructor() {
    appState.subscribe((snapshot) => {
      this.currentMode = snapshot.mode;
    });
  }

  getCurrentMode(): AppModeId {
    return this.currentMode;
  }

  getCurrentDefinition() {
    return getModeDefinition(this.currentMode);
  }

  /** Set mode immediately without transition animation (used on startup). */
  setModeImmediate(mode: AppModeId): void {
    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
      this.transitionTimer = null;
    }
    this.currentMode = mode;
    appState.setMode(mode);
    appState.setTransitioning(false);
  }

  setMode(mode: AppModeId): void {
    if (mode === this.currentMode) return;

    const from = this.currentMode;
    if (this.transitionTimer) {
      clearTimeout(this.transitionTimer);
    }

    appState.setTransitioning(true);
    eventBus.emit('mode:transition:start', { to: mode });

    const duration = randomTransitionDuration();

    this.transitionTimer = setTimeout(() => {
      this.currentMode = mode;
      appState.setMode(mode);
      appState.setTransitioning(false);
      eventBus.emit('mode:change', { from, to: mode });
      eventBus.emit('mode:transition:end', { mode });
      this.transitionTimer = null;
    }, duration);
  }

  getTransitionDurationMs(): { min: number; max: number } {
    return { min: TRANSITION_MIN_MS, max: TRANSITION_MAX_MS };
  }
}

export const modeManager = new ModeManager();
