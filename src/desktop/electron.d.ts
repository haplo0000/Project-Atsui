export interface ElectronAPI {
  getWindowBounds: () => Promise<{ x: number; y: number; width: number; height: number } | null>;
  setWindowBounds: (bounds: { x: number; y: number; width: number; height: number }) => Promise<void>;
  setClickThrough: (enabled: boolean) => Promise<void>;
  setAlwaysOnTop: (enabled: boolean) => Promise<void>;
  resetWindowPosition: () => Promise<void>;
  requestContextMenu: () => void;
  exitApp: () => void;
  on: (channel: string, callback: (...args: unknown[]) => void) => () => void;
}

declare global {
  interface Window {
    electronAPI?: ElectronAPI;
  }
}

export {};
