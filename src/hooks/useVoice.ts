import { useEffect, useRef } from 'react';
import type { AppModeId } from '@/core/types';
import { eventBus } from '@/events/EventBus';
import { getModeDefinition } from '@/modes/definitions';
import { settingsManager } from '@/services/SettingsManager';
import { LAUNCH_LINE, MODE_LINES } from '@/voice/modeLines';
import { voiceManager } from '@/voice/VoiceManager';

function speakLine(text: string, modeId: AppModeId): void {
  const settings = settingsManager.get();
  if (settings.voiceMuted) return;

  const definition = getModeDefinition(modeId);
  void voiceManager.speak({
    text,
    style: definition.voiceStyle,
    volume: settings.volume,
  });
}

/** Wires launch greeting and mode-change voice lines. */
export function useVoice(): void {
  const launchSpoken = useRef(false);

  useEffect(() => {
    const settings = settingsManager.get();
    voiceManager.setVolume(settings.volume);
    voiceManager.setMuted(settings.voiceMuted);

    if (!launchSpoken.current) {
      launchSpoken.current = true;
      speakLine(LAUNCH_LINE, settings.currentMode);
    }

    const offTransition = eventBus.on('mode:transition:end', ({ mode }) => {
      const modeId = mode as AppModeId;
      speakLine(MODE_LINES[modeId], modeId);
    });

    const offSettings = eventBus.on('settings:change', ({ settings: changed }) => {
      const next = changed as { volume?: number; voiceMuted?: boolean };
      if (typeof next.volume === 'number') {
        voiceManager.setVolume(next.volume);
      }
      if (typeof next.voiceMuted === 'boolean') {
        voiceManager.setMuted(next.voiceMuted);
      }
    });

    return () => {
      offTransition();
      offSettings();
    };
  }, []);
}
