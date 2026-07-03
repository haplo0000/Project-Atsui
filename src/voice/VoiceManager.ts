import type { VoiceStyle } from '@/core/types';

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
  /** Whether voice is currently active. */
  isSpeaking(): boolean;
}

/** Placeholder implementation — real TTS/voice to be plugged in later. */
export class NullVoiceManager implements VoiceManager {
  private _volume = 0.8;
  private speaking = false;

  async speak(_request: VoiceRequest): Promise<void> {
    this.speaking = true;
    // Simulate brief speech duration for UI feedback
    await new Promise((resolve) => setTimeout(resolve, 100));
    this.speaking = false;
  }

  stop(): void {
    this.speaking = false;
  }

  setVolume(volume: number): void {
    this._volume = Math.max(0, Math.min(1, volume));
  }

  isSpeaking(): boolean {
    return this.speaking;
  }

  getVolume(): number {
    return this._volume;
  }
}

export const voiceManager: VoiceManager = new NullVoiceManager();
