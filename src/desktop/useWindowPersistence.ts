import { useEffect } from 'react';
import { settingsManager } from '@/services/SettingsManager';

export function useWindowPersistence(): void {
  useEffect(() => {
    const api = window.electronAPI;
    if (!api) return;

    const { windowPosition } = settingsManager.get();
    void api.getWindowBounds().then((bounds) => {
      if (bounds) {
        void api.setWindowBounds({
          ...bounds,
          x: windowPosition.x,
          y: windowPosition.y,
        });
      }
    });

    const interval = setInterval(async () => {
      const bounds = await api.getWindowBounds();
      if (bounds) {
        settingsManager.save({
          windowPosition: { x: bounds.x, y: bounds.y },
        });
      }
    }, 5000);

    return () => clearInterval(interval);
  }, []);
}
