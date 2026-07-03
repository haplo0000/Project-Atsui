import { useCallback, useState } from 'react';
import { Avatar } from '@/avatar/Avatar';
import { useAppState } from '@/hooks/useAppState';
import { useModeTransition } from '@/hooks/useModeDefinition';
import {
  useContextMenuHandlers,
  useElectronBridge,
  useSettingsSync,
} from '@/desktop/useDesktopBridge';
import { useWindowPersistence } from '@/desktop/useWindowPersistence';
import { useVoice } from '@/hooks/useVoice';
import { settingsManager } from '@/services/SettingsManager';
import { HUD } from '@/ui/HUD';
import { StatusBar } from '@/ui/StatusBar';
import { Notification } from '@/ui/Notification';
import { SettingsPanel } from '@/ui/SettingsPanel';
import { CommandInterface } from '@/ui/CommandInterface';
import './App.css';

export function App() {
  const snapshot = useAppState();
  const { mode, isTransitioning } = useModeTransition();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const openSettings = useCallback(() => setSettingsOpen(true), []);

  useElectronBridge(openSettings);
  useSettingsSync();
  useWindowPersistence();
  useVoice();
  const { showContextMenu } = useContextMenuHandlers();

  return (
    <div
      className={`app-root ${isTransitioning ? 'app-transitioning' : ''}`}
      style={{
        '--mode-glow': mode.backgroundGlow,
        '--mode-accent': mode.accentColor,
      } as React.CSSProperties}
      onContextMenu={showContextMenu}
    >
      <div className="app-window">
        <StatusBar settings={snapshot.settings} clickThrough={snapshot.clickThrough} />

        <div className="app-body">
          <HUD mode={mode} isTransitioning={isTransitioning} />
          <Avatar
            mode={mode}
            isTransitioning={isTransitioning}
            scale={snapshot.settings.scale}
          />
        </div>

        <CommandInterface />

        {snapshot.notification && (
          <Notification notification={snapshot.notification} />
        )}

        {settingsOpen && (
          <SettingsPanel
            settings={settingsManager.get()}
            onClose={() => setSettingsOpen(false)}
          />
        )}
      </div>
    </div>
  );
}
