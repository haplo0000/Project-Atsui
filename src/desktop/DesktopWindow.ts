/**
 * DesktopWindow is implemented in the Electron main process.
 * @see electron/DesktopWindow.ts
 */
export interface DesktopWindowOptions {
  isDev: boolean;
  preloadPath: string;
  rendererUrl: string;
}
