import type { AppSettings } from '@/core/types';
import './StatusBar.css';

interface StatusBarProps {
  settings: AppSettings;
  clickThrough: boolean;
}

export function StatusBar({ settings, clickThrough }: StatusBarProps) {
  return (
    <div className="status-bar">
      <div className="status-bar-drag" title="Drag to move">
        <span className="status-dot" />
        <span className="status-title">Atsui</span>
      </div>
      <div className="status-bar-indicators">
        {settings.alwaysOnTop && <span className="status-badge" title="Always on top">📌</span>}
        {clickThrough && <span className="status-badge status-badge-active" title="Click-through enabled">👻</span>}
        {settings.voiceMuted ? (
          <span className="status-badge status-badge-muted" title="Voice muted">🔇</span>
        ) : (
          <span className="status-badge" title={`Volume: ${Math.round(settings.volume * 100)}%`}>
            🔊
          </span>
        )}
        <span className="status-badge" title={`Scale: ${Math.round(settings.scale * 100)}%`}>
          {Math.round(settings.scale * 100)}%
        </span>
      </div>
    </div>
  );
}
