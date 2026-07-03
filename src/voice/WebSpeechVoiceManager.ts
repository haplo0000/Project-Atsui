import type { VoiceStyle } from '@/core/types';
import type { VoiceManager, VoiceRequest } from './VoiceManager';

function applyVoiceStyle(utterance: SpeechSynthesisUtterance, style: VoiceStyle): void {
  const styles: Record<VoiceStyle, { rate: number; pitch: number }> = {
    calm: { rate: 1, pitch: 1 },
    analytical: { rate: 0.95, pitch: 1.02 },
    formal: { rate: 0.92, pitch: 0.95 },
    playful: { rate: 1.08, pitch: 1.1 },
    intense: { rate: 1.05, pitch: 0.9 },
    synthetic: { rate: 1, pitch: 1.15 },
    whisper: { rate: 0.88, pitch: 0.85 },
    strained: { rate: 1.1, pitch: 1.05 },
  };
  const preset = styles[style];
  utterance.rate = preset.rate;
  utterance.pitch = preset.pitch;
}

function waitForSpeechSupport(): boolean {
  return typeof window !== 'undefined' && 'speechSynthesis' in window;
}

function waitForVoices(): Promise<SpeechSynthesisVoice[]> {
  return new Promise((resolve) => {
    if (!waitForSpeechSupport()) {
      resolve([]);
      return;
    }

    const voices = window.speechSynthesis.getVoices();
    if (voices.length > 0) {
      resolve(voices);
      return;
    }

    const onVoicesChanged = () => {
      window.speechSynthesis.removeEventListener('voiceschanged', onVoicesChanged);
      resolve(window.speechSynthesis.getVoices());
    };

    window.speechSynthesis.addEventListener('voiceschanged', onVoicesChanged);
  });
}

export class WebSpeechVoiceManager implements VoiceManager {
  private masterVolume = 0.8;
  private muted = false;
  private speaking = false;
  private voicesReady: Promise<SpeechSynthesisVoice[]> | null = null;

  private ensureVoices(): Promise<SpeechSynthesisVoice[]> {
    if (!this.voicesReady) {
      this.voicesReady = waitForVoices();
    }
    return this.voicesReady;
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (muted) {
      this.stop();
    }
  }

  async speak(request: VoiceRequest): Promise<void> {
    if (this.muted || !waitForSpeechSupport()) {
      return;
    }

    await this.ensureVoices();

    return new Promise((resolve) => {
      window.speechSynthesis.cancel();

      const utterance = new SpeechSynthesisUtterance(request.text);
      utterance.volume = Math.max(0, Math.min(1, this.masterVolume * request.volume));
      applyVoiceStyle(utterance, request.style);

      utterance.onstart = () => {
        this.speaking = true;
      };

      const finish = () => {
        this.speaking = false;
        resolve();
      };

      utterance.onend = finish;
      utterance.onerror = finish;

      this.speaking = true;
      window.speechSynthesis.speak(utterance);
    });
  }

  stop(): void {
    if (!waitForSpeechSupport()) return;
    window.speechSynthesis.cancel();
    this.speaking = false;
  }

  setVolume(volume: number): void {
    this.masterVolume = Math.max(0, Math.min(1, volume));
  }

  isSpeaking(): boolean {
    return this.speaking;
  }
}
