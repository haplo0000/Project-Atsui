import { useEffect, useState } from 'react';

const TILT_MIN_MS = 8000;
const TILT_MAX_MS = 16000;
const TILT_HOLD_MS = 1400;
const TILT_MAX_DEG = 1.5;

const MICRO_MIN_MS = 2800;
const MICRO_MAX_MS = 6200;

function randomBetween(min: number, max: number): number {
  return min + Math.random() * (max - min);
}

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches,
  );

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const onChange = () => setReduced(media.matches);
    media.addEventListener('change', onChange);
    return () => media.removeEventListener('change', onChange);
  }, []);

  return reduced;
}

function useHeadTilt(reducedMotion: boolean): number {
  const [tilt, setTilt] = useState(0);

  useEffect(() => {
    if (reducedMotion) {
      setTilt(0);
      return;
    }

    let delayTimer: ReturnType<typeof setTimeout>;
    let holdTimer: ReturnType<typeof setTimeout>;
    let resetTimer: ReturnType<typeof setTimeout>;

    const schedule = () => {
      delayTimer = setTimeout(() => {
        const sign = Math.random() > 0.5 ? 1 : -1;
        const magnitude = 0.6 + Math.random() * (TILT_MAX_DEG - 0.6);
        setTilt(sign * magnitude);

        holdTimer = setTimeout(() => {
          setTilt(0);
          resetTimer = setTimeout(schedule, 400);
        }, TILT_HOLD_MS + randomBetween(0, 400));
      }, randomBetween(TILT_MIN_MS, TILT_MAX_MS));
    };

    schedule();

    return () => {
      clearTimeout(delayTimer);
      clearTimeout(holdTimer);
      clearTimeout(resetTimer);
    };
  }, [reducedMotion]);

  return tilt;
}

function useMicroMotion(reducedMotion: boolean): { x: number; y: number } {
  const [shift, setShift] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (reducedMotion) {
      setShift({ x: 0, y: 0 });
      return;
    }

    let timer: ReturnType<typeof setTimeout>;

    const nudge = () => {
      setShift({
        x: (Math.random() - 0.5) * 2.4,
        y: (Math.random() - 0.5) * 1.6,
      });
      timer = setTimeout(nudge, randomBetween(MICRO_MIN_MS, MICRO_MAX_MS));
    };

    nudge();

    return () => clearTimeout(timer);
  }, [reducedMotion]);

  return shift;
}

export function useIdleLife(): {
  reducedMotion: boolean;
  headTiltDeg: number;
  microX: number;
  microY: number;
} {
  const reducedMotion = useReducedMotion();
  const headTiltDeg = useHeadTilt(reducedMotion);
  const { x: microX, y: microY } = useMicroMotion(reducedMotion);

  return { reducedMotion, headTiltDeg, microX, microY };
}
