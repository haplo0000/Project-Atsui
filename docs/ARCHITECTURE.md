# Architecture — Project Atsui v0.5

## Overview

Project Atsui is a layered Electron desktop companion. The main process owns the native window; the renderer runs a React UI that reacts to application state, mode definitions, and user settings.

```
┌─────────────────────────────────────────────────────────┐
│                    Electron Main                         │
│  main.ts → DesktopWindow → globalShortcut, contextMenu  │
└──────────────────────────┬──────────────────────────────┘
                           │ IPC (preload bridge)
┌──────────────────────────▼──────────────────────────────┐
│                   React Renderer                         │
│  App → Avatar / HUD / StatusBar / Notification           │
│         ↕ AppState ← ModeManager / SettingsManager       │
│         ↕ EventBus                                       │
└─────────────────────────────────────────────────────────┘
```

## Core Modules

### AppState (`src/core/AppState.ts`)

Central reactive store. Holds current mode, settings snapshot, click-through flag, transition state, and active notification. Components subscribe via `useAppState`.

### ModeManager (`src/modes/ModeManager.ts`)

Orchestrates mode changes with 250–400 ms animated transitions. Emits events on `EventBus` during transition start/end.

### EventBus (`src/events/EventBus.ts`)

Typed pub/sub for decoupled cross-module communication (mode changes, settings, notifications).

### SettingsManager (`src/services/SettingsManager.ts`)

Persists settings to `localStorage` under key `atsui-settings-v0.5`. Hydrates `AppState` on load.

## Pluggable Interfaces

### HardwareMonitor (`src/hardware/HardwareMonitor.ts`)

```typescript
interface HardwareMonitor {
  start(): void;
  stop(): void;
  getSnapshot(): HardwareSnapshot | null;
  subscribe(listener): () => void;
}
```

`NullHardwareMonitor` is the default v0.5 implementation.

### VoiceManager (`src/voice/VoiceManager.ts`)

```typescript
interface VoiceManager {
  speak(request: VoiceRequest): Promise<void>;
  stop(): void;
  setVolume(volume: number): void;
  isSpeaking(): boolean;
}
```

`NullVoiceManager` is the default v0.5 implementation.

## Modes

Each mode in `src/modes/definitions.ts` defines:

| Property | Purpose |
|----------|---------|
| `eyeColor` | Avatar pupil color |
| `accentColor` | Primary theme color |
| `voiceStyle` | Future TTS personality |
| `backgroundGlow` | Ambient glow rgba |
| `hudStyle` | HUD visual variant |

Modes: IDLE, ANALYST, PROFESSIONAL, GAMING, BATTLE, AI_PROCESSING, SLEEP, OVERHEATED.

## Desktop Window (`electron/DesktopWindow.ts`)

Electron `BrowserWindow` wrapper:

- `frame: false`, `transparent: true`
- `alwaysOnTop: true`
- `setIgnoreMouseEvents` for click-through
- Resizable by default

## UI Components

| Component | Location | Role |
|-----------|----------|------|
| Avatar | `src/avatar/` | SVG placeholder with CSS animations |
| HUD | `src/ui/HUD.tsx` | Mode indicator ring + status |
| StatusBar | `src/ui/StatusBar.tsx` | Drag handle + badges |
| Notification | `src/ui/Notification.tsx` | Toast overlay |
| SettingsPanel | `src/ui/SettingsPanel.tsx` | In-app settings modal |

## Mode Transitions

CSS animations on avatar, HUD, and app root during `isTransitioning`:

- Fade (opacity shift)
- Glow (brightness + inset shadow)
- Color shift (CSS custom properties)

Duration: random 250–400 ms from `ModeManager`.

## IPC Channels

| Channel | Direction | Purpose |
|---------|-----------|---------|
| `toggle-click-through` | Main → Renderer | Global shortcut |
| `mode-*` | Main → Renderer | Mode shortcuts |
| `open-settings` | Main → Renderer | Context menu |
| `set-click-through` | Renderer → Main | Apply ignore mouse events |
| `request-context-menu` | Renderer → Main | Show native menu |

## Future Integration Points

1. **AI** — Add service in `src/services/`; emit notifications and switch to `AI_PROCESSING` mode
2. **Live2D** — Replace `Avatar.tsx` SVG with canvas/Live2D wrapper; keep mode color props
3. **Hardware** — Swap `NullHardwareMonitor` for WMI/OpenHardwareMonitor adapter; auto-trigger OVERHEATED mode
