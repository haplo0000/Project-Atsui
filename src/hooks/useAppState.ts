import { useEffect, useState } from 'react';
import type { AppStateSnapshot } from '@/core/types';
import { appState } from '@/core/AppState';

export function useAppState(): AppStateSnapshot {
  const [snapshot, setSnapshot] = useState<AppStateSnapshot>(() => appState.getSnapshot());

  useEffect(() => appState.subscribe(setSnapshot), []);

  return snapshot;
}
