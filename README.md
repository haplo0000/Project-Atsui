# Project Atsui v0.5

A transparent, frameless Windows desktop AI companion built with Electron, React, TypeScript, and Vite.

## Features

- Frameless, transparent, always-on-top window
- Resizable desktop companion
- Click-through toggle (`Ctrl+Shift+A`)
- 8 personality modes with animated transitions
- Placeholder SVG avatar (breathing, floating, blinking, head tilt, tail sway)
- HUD, status bar, and notification system
- Persistent settings (position, scale, volume, mode, click-through)
- Right-click context menu
- Pluggable interfaces for voice, hardware monitoring, and AI (not yet implemented)

## Requirements

- Node.js 20+
- Windows 11
- npm 10+

## Commands (in order)

```bash
npm install
npm run dev
```

### Production build

```bash
npm run build:renderer
npm run build:electron
```

Or combined:

```bash
npm run build
```

### Lint & typecheck

```bash
npm run typecheck
npm run lint
```

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Shift+A` | Toggle click-through |
| `Ctrl+Shift+1` | Idle mode |
| `Ctrl+Shift+2` | Analyst mode |
| `Ctrl+Shift+3` | Professional mode |
| `Ctrl+Shift+4` | Gaming mode |
| `Ctrl+Shift+5` | Battle mode |
| `Ctrl+Shift+6` | AI Processing mode |
| `Ctrl+Shift+7` | Sleep mode |
| `Ctrl+Shift+8` | Overheated mode |

## Right-Click Menu

- Open Settings
- Reset Position
- Toggle Click Through
- Exit

## Architecture

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed architecture documentation.

## Project Tree

See [docs/PROJECT_TREE.md](docs/PROJECT_TREE.md).

## Limitations (v0.5)

- No AI integration (interface stubs only)
- No Live2D avatar (SVG placeholder)
- No real hardware monitoring (NullHardwareMonitor)
- No real voice/TTS (NullVoiceManager)
- Window position persistence uses localStorage; full Electron bounds sync is partial
- Tray icon requires `assets/tray-icon.png` (optional)

## License

MIT
