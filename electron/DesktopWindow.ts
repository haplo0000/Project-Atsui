import { BrowserWindow, screen } from 'electron';

export interface DesktopWindowOptions {
  isDev: boolean;
  preloadPath: string;
  rendererUrl: string;
}

const DEFAULT_WIDTH = 380;
const DEFAULT_HEIGHT = 520;
const DEFAULT_X = 100;
const DEFAULT_Y = 100;

export class DesktopWindow {
  private window: BrowserWindow | null = null;
  private clickThrough = false;
  private alwaysOnTop = true;
  private readonly options: DesktopWindowOptions;

  constructor(options: DesktopWindowOptions) {
    this.options = options;
  }

  create(): BrowserWindow {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const x = Math.min(DEFAULT_X, width - DEFAULT_WIDTH);
    const y = Math.min(DEFAULT_Y, height - DEFAULT_HEIGHT);

    this.window = new BrowserWindow({
      width: DEFAULT_WIDTH,
      height: DEFAULT_HEIGHT,
      x,
      y,
      frame: false,
      transparent: true,
      resizable: true,
      alwaysOnTop: this.alwaysOnTop,
      skipTaskbar: false,
      hasShadow: false,
      backgroundColor: '#00000000',
      webPreferences: {
        preload: this.options.preloadPath,
        contextIsolation: true,
        nodeIntegration: false,
        backgroundThrottling: false,
      },
    });

    if (this.options.isDev) {
      this.window.loadURL(this.options.rendererUrl);
      this.window.webContents.openDevTools({ mode: 'detach' });
    } else {
      this.window.loadURL(this.options.rendererUrl);
    }

    this.window.setMenuBarVisibility(false);

    return this.window;
  }

  getWindow(): BrowserWindow | null {
    return this.window;
  }

  getBounds(): Electron.Rectangle | null {
    return this.window?.getBounds() ?? null;
  }

  setBounds(bounds: Electron.Rectangle): void {
    this.window?.setBounds(bounds);
  }

  show(): void {
    this.window?.show();
  }

  sendToRenderer(channel: string, data?: unknown): void {
    this.window?.webContents.send(channel, data);
  }

  setClickThrough(enabled: boolean): void {
    this.clickThrough = enabled;
    if (!this.window) return;

    if (enabled) {
      this.window.setIgnoreMouseEvents(true, { forward: true });
    } else {
      this.window.setIgnoreMouseEvents(false);
    }
  }

  setAlwaysOnTop(enabled: boolean): void {
    this.alwaysOnTop = enabled;
    this.window?.setAlwaysOnTop(enabled, 'screen-saver');
  }

  resetPosition(): void {
    const { width, height } = screen.getPrimaryDisplay().workAreaSize;
    const x = Math.min(DEFAULT_X, width - DEFAULT_WIDTH);
    const y = Math.min(DEFAULT_Y, height - DEFAULT_HEIGHT);
    this.window?.setBounds({ x, y, width: DEFAULT_WIDTH, height: DEFAULT_HEIGHT });
  }

  isClickThrough(): boolean {
    return this.clickThrough;
  }
}
