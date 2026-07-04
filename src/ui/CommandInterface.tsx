import { useCallback, useEffect, useRef, useState } from 'react';
import { CommandConsole } from '@/ui/CommandConsole';
import { CommandPanel } from '@/ui/CommandPanel';
import { useConsole } from '@/hooks/useConsole';
import './CommandInterface.css';

const BOTTOM_REVEAL_PX = 52;

export function CommandInterface() {
  const entries = useConsole();
  const [revealed, setRevealed] = useState(false);
  const [focused, setFocused] = useState(false);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearHideTimer = useCallback(() => {
    if (hideTimer.current) {
      clearTimeout(hideTimer.current);
      hideTimer.current = null;
    }
  }, []);

  const scheduleHide = useCallback(() => {
    clearHideTimer();
    hideTimer.current = setTimeout(() => {
      if (!focused) setRevealed(false);
    }, 400);
  }, [clearHideTimer, focused]);

  useEffect(() => {
    const onMouseMove = (event: MouseEvent) => {
      const nearBottom = window.innerHeight - event.clientY <= BOTTOM_REVEAL_PX;
      if (nearBottom) {
        clearHideTimer();
        setRevealed(true);
      } else if (!focused) {
        scheduleHide();
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      clearHideTimer();
    };
  }, [clearHideTimer, focused, scheduleHide]);

  const isVisible = revealed || focused;

  return (
    <div
      className={`command-interface ${isVisible ? 'command-interface-revealed' : ''}`}
      onMouseEnter={() => {
        clearHideTimer();
        setRevealed(true);
      }}
      onMouseLeave={() => {
        if (!focused) scheduleHide();
      }}
    >
      <div className="command-interface-peek" aria-hidden="true" />
      <div className="command-interface-body">
        <CommandConsole entries={entries} />
        <CommandPanel
          onFocusChange={setFocused}
          onSubmit={() => setRevealed(true)}
        />
      </div>
    </div>
  );
}
