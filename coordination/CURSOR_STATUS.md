# Cursor Status

**Last updated:** 2026-07-03  
**Iteration:** Runtime avatar rendering bug fix

## Current state

| Area | Status |
|------|--------|
| Runtime asset | `src/assets/avatar/atsui_runtime.png` (879 KB, 350×1240) |
| Asset loading | Direct static import (glob loader removed) |
| Avatar render | Fixed — CSS height chain + explicit max-height |
| HUD / blink / idle / voice / commands | Unchanged |

## Debug changes

- `MasterAvatarRenderer` logs `[Atsui] runtime avatar src:` and load dimensions to DevTools console
- `<img>` always rendered with static `atsuiRuntime` import

## Awaiting

Next task from `coordination/ARCHITECT_TASK.md` (file not present in repo).
