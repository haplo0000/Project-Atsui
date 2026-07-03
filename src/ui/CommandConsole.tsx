import { useEffect, useRef } from 'react';
import type { ConsoleEntry } from '@/commands/types';
import './CommandConsole.css';

interface CommandConsoleProps {
  entries: ConsoleEntry[];
}

export function CommandConsole({ entries }: CommandConsoleProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = scrollRef.current;
    if (node) {
      node.scrollTop = node.scrollHeight;
    }
  }, [entries]);

  return (
    <div className="command-console" ref={scrollRef} aria-live="polite">
      {entries.length === 0 ? (
        <p className="command-console-empty">Type a command below to interact with Atsui.</p>
      ) : (
        entries.map((entry) => (
          <div key={entry.id} className={`command-console-line command-console-${entry.kind}`}>
            {entry.kind === 'atsui' && <span className="command-console-label">Atsui:</span>}
            {entry.kind === 'system' && <span className="command-console-label">System:</span>}
            <span className="command-console-text">{entry.text}</span>
          </div>
        ))
      )}
    </div>
  );
}
