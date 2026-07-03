import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { App } from '@/App';
import { settingsManager } from '@/services/SettingsManager';
import { modeManager } from '@/modes/ModeManager';
import '@/assets/global.css';

settingsManager.load();
modeManager.setModeImmediate(settingsManager.get().currentMode);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
