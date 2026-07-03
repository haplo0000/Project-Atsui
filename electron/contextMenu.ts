import { ipcMain, Menu } from 'electron';
import type { DesktopWindow } from './DesktopWindow';

export function registerContextMenu(desktopWindow: DesktopWindow): void {
  ipcMain.on('request-context-menu', () => {
    const menu = Menu.buildFromTemplate([
      {
        label: 'Open Settings',
        click: () => desktopWindow.sendToRenderer('open-settings'),
      },
      {
        label: 'Reset Position',
        click: () => {
          desktopWindow.resetPosition();
          desktopWindow.sendToRenderer('position-reset');
        },
      },
      {
        label: 'Toggle Click Through',
        click: () => desktopWindow.sendToRenderer('toggle-click-through'),
      },
      { type: 'separator' },
      {
        label: 'Exit',
        click: () => desktopWindow.sendToRenderer('request-exit'),
      },
    ]);
    menu.popup({ window: desktopWindow.getWindow() ?? undefined });
  });
}
