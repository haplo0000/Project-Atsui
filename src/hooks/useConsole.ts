import { useEffect, useState } from 'react';
import type { ConsoleEntry } from '@/commands/types';
import { commandService } from '@/services/CommandService';

export function useConsole(): ConsoleEntry[] {
  const [entries, setEntries] = useState<ConsoleEntry[]>(() => commandService.getEntries());

  useEffect(() => commandService.subscribe(setEntries), []);

  return entries;
}
