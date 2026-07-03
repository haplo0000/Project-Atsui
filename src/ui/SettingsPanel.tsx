import { useState } from 'react';
import type { AppModeId, AppSettings } from '@/core/types';
import { MODE_ORDER, MODES } from '@/modes/definitions';
import { modeManager } from '@/modes/ModeManager';
import { settingsManager } from '@/services/SettingsManager';
import { voiceManager } from '@/voice/VoiceManager';
import './SettingsPanel.css';

interface SettingsPanelProps {
  settings: AppSettings;
  onClose: () => void;
}

export function SettingsPanel({ settings, onClose }: SettingsPanelProps) {
  const [local, setLocal] = useState<AppSettings>({ ...settings });

  const update = (partial: Partial<AppSettings>) => {
    const next = { ...local, ...partial };
    setLocal(next);
  };

  const handleSave = () => {
    settingsManager.save(local);
    voiceManager.setVolume(local.volume);
    voiceManager.setMuted(local.voiceMuted);
    modeManager.setMode(local.currentMode);
    const api = window.electronAPI;
    if (api) {
      void api.setClickThrough(local.clickThrough);
      void api.setAlwaysOnTop(local.alwaysOnTop);
    }
    onClose();
  };

  return (
    <div className="settings-overlay" onClick={onClose}>
      <div className="settings-panel" onClick={(e) => e.stopPropagation()}>
        <div className="settings-header">
          <h2>Settings</h2>
          <button className="settings-close" onClick={onClose} aria-label="Close">×</button>
        </div>

        <div className="settings-body">
          <label className="settings-field">
            <span>Scale</span>
            <input
              type="range"
              min="0.5"
              max="1.5"
              step="0.05"
              value={local.scale}
              onChange={(e) => update({ scale: parseFloat(e.target.value) })}
            />
            <span className="settings-value">{Math.round(local.scale * 100)}%</span>
          </label>

          <label className="settings-field">
            <span>Volume</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={local.volume}
              onChange={(e) => update({ volume: parseFloat(e.target.value) })}
            />
            <span className="settings-value">{Math.round(local.volume * 100)}%</span>
          </label>

          <label className="settings-field settings-checkbox">
            <input
              type="checkbox"
              checked={local.voiceMuted}
              onChange={(e) => update({ voiceMuted: e.target.checked })}
            />
            <span>Mute voice</span>
          </label>

          <label className="settings-field settings-checkbox">
            <input
              type="checkbox"
              checked={local.alwaysOnTop}
              onChange={(e) => update({ alwaysOnTop: e.target.checked })}
            />
            <span>Always on top</span>
          </label>

          <label className="settings-field settings-checkbox">
            <input
              type="checkbox"
              checked={local.clickThrough}
              onChange={(e) => update({ clickThrough: e.target.checked })}
            />
            <span>Click-through</span>
          </label>

          <label className="settings-field">
            <span>Mode</span>
            <select
              value={local.currentMode}
              onChange={(e) => update({ currentMode: e.target.value as AppModeId })}
            >
              {MODE_ORDER.map((id) => (
                <option key={id} value={id}>
                  {MODES[id].label}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="settings-footer">
          <button className="settings-btn settings-btn-primary" onClick={handleSave}>
            Save
          </button>
          <button className="settings-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
