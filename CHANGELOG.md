# Changelog

## [0.5.2] — 2026-07-03

### Added
- `MasterAvatarRenderer` — temporary full-image avatar using approved `atsui-master.png`
- `src/assets/avatar/atsui-master.png` (copied unchanged from supplied artwork)

### Changed
- `Avatar.tsx` now displays master artwork instead of layered placeholder sprites
- Layered avatar modules retained for future production assets (not active in UI)

## [0.5.1] — 2026-07-03

### Added
- Layered sprite avatar renderer (`AvatarRenderer`, `AvatarLayer`, `AssetManager`)
- 14 placeholder PNG assets under `src/assets/avatar/`
- Mode-based accessory visibility (glasses, raincoat, bowtie, headphones, hoodie, helmet)
- Programmatic blinking, breathing, tail sway, and floating animations
- `scripts/generate-avatar-placeholders.mjs` for regenerating placeholder artwork

### Changed
- `Avatar.tsx` now delegates to `AvatarRenderer` instead of inline SVG

## [0.5.0] — 2026-07-03

### Added
- Initial Project Atsui v0.5 scaffold (Electron + React + TypeScript + Vite)
- Transparent frameless always-on-top resizable desktop window
- AppState, ModeManager, EventBus, SettingsManager
- HardwareMonitor and VoiceManager interfaces with null implementations
- 8 modes with eyeColor, accentColor, voiceStyle, backgroundGlow, hudStyle
- SVG placeholder avatar with breathing, floating, blinking, head tilt, tail sway
- Animated mode transitions (250–400 ms)
- HUD, StatusBar, Notification, SettingsPanel components
- Global keyboard shortcuts (Ctrl+Shift+1–8, Ctrl+Shift+A)
- Right-click context menu
- Settings persistence (localStorage)
- README and architecture documentation
