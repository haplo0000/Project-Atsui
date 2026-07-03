import type { VoiceStyle } from '@/core/types';
import { WebSpeechVoiceManager } from './WebSpeechVoiceManager';

export interface VoiceRequest {
  text: string;
  style: VoiceStyle;
  volume: number;
}

export interface VoiceManager {
  /** Speak the given text with the specified style. */
  speak(request: VoiceRequest): Promise<void>;
  /** Stop any ongoing speech. */
  stop(): void;
  /** Set master volume (0–1). */
  setVolume(volume: number): void;
  /** Mute or unmute voice output. */
  setMuted(muted: boolean): void;
  /** Whether voice is currently active. */
  isSpeaking(): boolean;
}

/** Placeholder implementation — used when speech synthesis is unavailable. */
export class NullVoiceManager implements VoiceManager {
  private muted = false;
  private speaking = false;

  async speak(_request: VoiceRequest): Promise<void> {
    if (this.muted) return;
    this.speaking = true;
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.speaking = false;
  }

  stop(): void {
    this.speaking = false;
  }

  setVolume(_volume: number): void {
    // no-op for null implementation
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (muted) this.stop();
  }

  isSpeaking(): boolean {
    return this.speaking;
  }
}

function createVoiceManager(): VoiceManager {
  if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
    return new WebSpeechVoiceManager();
  }
  return new NullVoiceManager();
}

export const voiceManager: VoiceManager = createVoiceManager();
