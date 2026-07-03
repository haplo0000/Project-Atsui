import { contextBridge, ipcRenderer } from 'electron';

export interface ElectronAPI {
  getWindowBounds: () => Promise<Electron.Rectangle | null>;
  setWindowBounds: (bounds: Electron.Rectangle) => Promise<void>;
  setClickThrough: (enabled: boolean) => Promise<void>;
  setAlwaysOnTop: (enabled: boolean) => Promise<void>;
  resetWindowPosition: () => Promise<void>;
  requestContextMenu: () => void;
  exitApp: () => void;
  on: (channel: string, callback: (...args: unknown[]) => void) => () => void;
}

const validChannels = [
  'toggle-click-through',
  'mode-idle',
  'mode-analyst',
  'mode-professional',
  'mode-gaming',
  'mode-battle',
  'mode-ai-processing',
  'mode-sleep',
  'mode-overheated',
  'open-settings',
  'position-reset',
  'request-exit',
  'window-bounds-saved',
];

const api: ElectronAPI = {
  getWindowBounds: () => ipcRenderer.invoke('get-window-bounds'),
  setWindowBounds: (bounds) => ipcRenderer.invoke('set-window-bounds', bounds),
  setClickThrough: (enabled) => ipcRenderer.invoke('set-click-through', enabled),
  setAlwaysOnTop: (enabled) => ipcRenderer.invoke('set-always-on-top', enabled),
  resetWindowPosition: () => ipcRenderer.invoke('reset-window-position'),
  requestContextMenu: () => ipcRenderer.send('request-context-menu'),
  exitApp: () => ipcRenderer.send('exit-app'),
  on: (channel, callback) => {
    if (!validChannels.includes(channel)) {
      return () => undefined;
    }
    const handler = (_event: Electron.IpcRendererEvent, ...args: unknown[]) => callback(...args);
    ipcRenderer.on(channel, handler);
    return () => ipcRenderer.removeListener(channel, handler);
  },
};

contextBridge.exposeInMainWorld('electronAPI', api);
