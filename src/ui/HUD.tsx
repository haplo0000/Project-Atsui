import type { ModeDefinition } from '@/core/types';
import './HUD.css';

interface HUDProps {
  mode: ModeDefinition;
  isTransitioning: boolean;
}

const HUD_LABELS: Record<string, string> = {
  minimal: 'Standby',
  data: 'Analyzing',
  corporate: 'Focus Mode',
  arcade: 'Game On',
  combat: 'Battle Ready',
  neural: 'Processing',
  dormant: 'Sleeping',
  warning: 'Thermal Alert',
};

export function HUD({ mode, isTransitioning }: HUDProps) {
  return (
    <div
      className={`hud hud-${mode.hudStyle} ${isTransitioning ? 'hud-transitioning' : ''}`}
      style={{
        '--hud-accent': mode.accentColor,
        '--hud-glow': mode.backgroundGlow,
      } as React.CSSProperties}
    >
      <div className="hud-ring" />
      <div className="hud-content">
        <span className="hud-mode-label">{mode.label}</span>
        <span className="hud-status">{HUD_LABELS[mode.hudStyle] ?? 'Active'}</span>
      </div>
      {mode.hudStyle === 'data' && (
        <div className="hud-data-lines">
          <span /><span /><span />
        </div>
      )}
      {mode.hudStyle === 'neural' && (
        <div className="hud-neural-pulse" />
      )}
      {mode.hudStyle === 'warning' && (
        <div className="hud-warning-stripe" />
      )}
    </div>
  );
}
