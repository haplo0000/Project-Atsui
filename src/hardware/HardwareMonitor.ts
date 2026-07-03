import type { HardwareSnapshot } from '@/core/types';

export interface HardwareMonitor {
  /** Start polling hardware metrics. */
  start(): void;
  /** Stop polling hardware metrics. */
  stop(): void;
  /** Get the latest hardware snapshot. */
  getSnapshot(): HardwareSnapshot | null;
  /** Subscribe to hardware updates. Returns unsubscribe function. */
  subscribe(listener: (snapshot: HardwareSnapshot) => void): () => void;
}

/** Placeholder implementation — real hardware monitoring to be plugged in later. */
export class NullHardwareMonitor implements HardwareMonitor {
  start(): void {
    // no-op
  }

  stop(): void {
    // no-op
  }

  getSnapshot(): HardwareSnapshot | null {
    return null;
  }

  subscribe(_listener: (snapshot: HardwareSnapshot) => void): () => void {
    return () => undefined;
  }
}

export const hardwareMonitor: HardwareMonitor = new NullHardwareMonitor();
