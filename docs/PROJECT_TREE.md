# Project Tree — Project Atsui v0.5

```
Project-Atsui/
├── assets/                    # App icons (tray-icon.png, icon.ico)
├── docs/
│   ├── ARCHITECTURE.md
│   └── PROJECT_TREE.md
├── electron/
│   ├── contextMenu.ts         # Native right-click menu
│   ├── DesktopWindow.ts       # BrowserWindow wrapper
│   ├── main.ts                # Electron entry point
│   ├── preload.ts             # contextBridge API
│   └── tsconfig.json
├── src/
│   ├── assets/
│   │   └── global.css
│   ├── avatar/
│   │   ├── Avatar.css
│   │   └── Avatar.tsx         # SVG placeholder avatar
│   ├── core/
│   │   ├── AppState.ts
│   │   ├── index.ts
│   │   └── types.ts
│   ├── desktop/
│   │   ├── DesktopWindow.ts   # Type re-export (impl in electron/)
│   │   ├── electron.d.ts
│   │   └── useDesktopBridge.ts
│   ├── events/
│   │   ├── EventBus.ts
│   │   └── index.ts
│   ├── hardware/
│   │   └── HardwareMonitor.ts # Interface + NullHardwareMonitor
│   ├── hooks/
│   │   ├── useAppState.ts
│   │   └── useModeDefinition.ts
│   ├── modes/
│   │   ├── definitions.ts     # All 8 mode configs
│   │   ├── index.ts
│   │   └── ModeManager.ts
│   ├── services/
│   │   └── SettingsManager.ts
│   ├── state/                 # Reserved for future state modules
│   ├── ui/
│   │   ├── HUD.css / HUD.tsx
│   │   ├── Notification.css / Notification.tsx
│   │   ├── SettingsPanel.css / SettingsPanel.tsx
│   │   ├── StatusBar.css / StatusBar.tsx
│   │   └── ...
│   ├── utils/
│   │   └── helpers.ts
│   ├── voice/
│   │   └── VoiceManager.ts    # Interface + NullVoiceManager
│   ├── App.css
│   ├── App.tsx
│   └── main.tsx
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```
