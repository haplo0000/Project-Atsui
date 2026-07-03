import {
  app,
  BrowserWindow,
  globalShortcut,
  ipcMain,
  Menu,
  Tray,
} from 'electron';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { DesktopWindow } from './DesktopWindow';
import { registerContextMenu } from './contextMenu';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const isDev = !app.isPackaged;
let desktopWindow: DesktopWindow | null = null;
let tray: Tray | null = null;

function createApp(): void {
  desktopWindow = new DesktopWindow({
    isDev,
    preloadPath: path.join(__dirname, 'preload.mjs'),
    rendererUrl: isDev
      ? 'http://localhost:5173'
      : `file://${path.join(__dirname, '../dist/index.html')}`,
  });

  desktopWindow.create();
  registerGlobalShortcuts();
  registerIpcHandlers();
  registerContextMenu(desktopWindow);
  buildTray();
}

function registerGlobalShortcuts(): void {
  const shortcuts: Array<{ accelerator: string; channel: string }> = [
    { accelerator: 'Control+Shift+A', channel: 'toggle-click-through' },
    { accelerator: 'Control+Shift+1', channel: 'mode-idle' },
    { accelerator: 'Control+Shift+2', channel: 'mode-analyst' },
    { accelerator: 'Control+Shift+3', channel: 'mode-professional' },
    { accelerator: 'Control+Shift+4', channel: 'mode-gaming' },
    { accelerator: 'Control+Shift+5', channel: 'mode-battle' },
    { accelerator: 'Control+Shift+6', channel: 'mode-ai-processing' },
    { accelerator: 'Control+Shift+7', channel: 'mode-sleep' },
    { accelerator: 'Control+Shift+8', channel: 'mode-overheated' },
  ];

  for (const { accelerator, channel } of shortcuts) {
    globalShortcut.register(accelerator, () => {
      desktopWindow?.sendToRenderer(channel);
    });
  }
}

function registerIpcHandlers(): void {
  ipcMain.handle('get-window-bounds', () => desktopWindow?.getBounds() ?? null);
  ipcMain.handle('set-window-bounds', (_event, bounds: { x: number; y: number; width: number; height: number }) => {
    desktopWindow?.setBounds(bounds);
  });
  ipcMain.handle('set-click-through', (_event, enabled: boolean) => {
    desktopWindow?.setClickThrough(enabled);
  });
  ipcMain.handle('set-always-on-top', (_event, enabled: boolean) => {
    desktopWindow?.setAlwaysOnTop(enabled);
  });
  ipcMain.handle('reset-window-position', () => {
    desktopWindow?.resetPosition();
  });
  ipcMain.handle('open-settings', () => {
    desktopWindow?.sendToRenderer('open-settings');
  });
  ipcMain.on('exit-app', () => {
    app.quit();
  });
}

function buildTray(): void {
  // Tray is optional — skip if no icon available in dev
  try {
    const iconPath = path.join(__dirname, '../assets/tray-icon.png');
    tray = new Tray(iconPath);
    tray.setToolTip('Project Atsui');
    tray.setContextMenu(
      Menu.buildFromTemplate([
        { label: 'Show', click: () => desktopWindow?.show() },
        { type: 'separator' },
        { label: 'Exit', click: () => app.quit() },
      ]),
    );
  } catch {
    // Tray icon not required for v0.5
  }
}

app.whenReady().then(createApp);

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('will-quit', () => {
  globalShortcut.unregisterAll();
});

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createApp();
  }
});
