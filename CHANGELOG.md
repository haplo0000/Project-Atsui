# Changelog

## [0.5.9] — 2026-07-03

### Fixed
- Runtime avatar rendering: replaced `import.meta.glob` loader with direct static import of `atsui_runtime.png`
- CSS layout: idle wrapper height chain and explicit `max-height: 420px` on avatar image so rendered dimensions are non-zero
- Dev console logs resolved runtime URL and loaded image dimensions

## [0.5.8] — 2026-07-03

### Changed
- Avatar renderer no longer displays the master reference sheet (`atsui-master*.png`)
- `MasterAvatarRenderer` loads production runtime character assets only (`atsui_runtime.png` or open/closed pair)
- Electron single-instance lock prevents duplicate companion windows on relaunch

### Blocked
- No production runtime full-body character image exists yet — companion shows transparent stage until `atsui_runtime.png` is delivered to `src/assets/avatar/`

## [0.5.7] — 2026-07-03

### Added
- Idle life animations on master avatar: breathing, floating, random head tilt, micro motion
- `useIdleLife` hook with `prefers-reduced-motion` support

### Changed
- Layered idle motion wrappers in `MasterAvatarRenderer` (blink unchanged)

## [0.5.6] — 2026-07-03

### Added
- Fake blink on master avatar: open/closed runtime duplicates swap every 4–8 s (120 ms closed)
- CSS eyelid overlay on closed state for natural blink on reference sheet

### Changed
- `MasterAvatarRenderer` uses `atsui-master-open.png` / `atsui-master-closed.png` (duplicates of approved master)

## [0.5.5] — 2026-07-03

### Changed
- Transparent companion layout — removed gray app panel background
- Tighter default window size (340×460) for floating desktop feel
- Larger centered master avatar anchored to bottom (`object-position: center bottom`)
- HUD and status badges float compactly over avatar
- Command panel docks to bottom, auto-hides until hover/focus near bottom edge
- Top drag handle for moving the frameless window

## [0.5.4] — 2026-07-03

### Added
- Interactive command panel at bottom of companion window
- Scrolling console logging user commands and Atsui responses
- `CommandService` with 8 supported commands: analyze, chart, trade, sleep, game, work, cool, idle
- Commands switch modes and return fake demo responses (no AI)

## [0.5.3] — 2026-07-03

### Added
- `WebSpeechVoiceManager` — browser TTS via Web Speech API
- Launch greeting: "Atsui online."
- Mode-change voice lines for all 8 modes
- `voiceMuted` setting and mute checkbox in Settings
- `useVoice` hook wiring speech to mode transitions

### Changed
- `VoiceManager` interface extended with `setMuted()`
- Status bar shows 🔇 when voice is muted

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
