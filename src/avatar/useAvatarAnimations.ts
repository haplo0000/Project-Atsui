import { useEffect, useState } from 'react';

const BLINK_MIN_MS = 4000;
const BLINK_MAX_MS = 8000;
const BLINK_CLOSED_MS = 120;

function randomBlinkDelay(): number {
  return BLINK_MIN_MS + Math.random() * (BLINK_MAX_MS - BLINK_MIN_MS);
}

/** Schedules eye open → closed → open cycles every 4–8 seconds. */
export function useBlinking(): boolean {
  const [eyesClosed, setEyesClosed] = useState(false);

  useEffect(() => {
    let delayTimer: ReturnType<typeof setTimeout>;
    let closedTimer: ReturnType<typeof setTimeout>;

    const scheduleNext = () => {
      delayTimer = setTimeout(() => {
        setEyesClosed(true);
        closedTimer = setTimeout(() => {
          setEyesClosed(false);
          scheduleNext();
        }, BLINK_CLOSED_MS);
      }, randomBlinkDelay());
    };

    scheduleNext();

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(closedTimer);
    };
  }, []);

  return eyesClosed;
}
