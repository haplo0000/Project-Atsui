import { useEffect, useRef, useState } from 'react';
import type { AppModeId, ModeDefinition } from '@/core/types';
import { getModeDefinition } from '@/modes/definitions';
import { useAppState } from '@/hooks/useAppState';

export function useModeDefinition(): ModeDefinition {
  const { mode } = useAppState();
  return getModeDefinition(mode);
}

export function useModeTransition(): {
  isTransitioning: boolean;
  mode: ModeDefinition;
} {
  const { mode, isTransitioning } = useAppState();
  const prevModeRef = useRef<AppModeId>(mode);
  const [displayMode, setDisplayMode] = useState<AppModeId>(mode);

  useEffect(() => {
    if (!isTransitioning) {
      prevModeRef.current = mode;
      setDisplayMode(mode);
    }
  }, [mode, isTransitioning]);

  return {
    isTransitioning,
    mode: getModeDefinition(displayMode),
  };
}
