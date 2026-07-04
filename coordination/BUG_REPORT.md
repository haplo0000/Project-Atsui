# Bug Report / Blockers

## OPEN — No production runtime character image

**Severity:** Blocker  
**Reported:** 2026-07-03

### Symptom

Desktop companion was rendering the entire Atsui VTuber reference sheet (expressions grid, turnaround, specs, branding) instead of the main full-body character.

### Root cause

`MasterAvatarRenderer` imported `atsui-master-open.png` / `atsui-master-closed.png`, which are byte-identical copies of the full reference sheet (`version 2.png` / `atsui-master.png`).

No isolated runtime full-body asset exists in:

- `src/assets/avatar/` — master sheet + M2 placeholder layers only
- `Art/Exports/Runtime/` — empty (README only)
- Parent `AI pics/` folder — `master.png`, `version 2.png`, and UUID-named PNG are all composite reference sheets

### Fix applied (engineering)

- Stopped rendering master reference sheet in UI
- Renderer resolves `atsui_runtime*.png` via `src/avatar/runtimeAssets.ts`
- Single-instance Electron lock to prevent duplicate companion windows

### Remaining action (art)

Export and approve isolated main full-body Atsui:

| File | Purpose |
|------|---------|
| `atsui_runtime.png` | Primary runtime character (required) |
| `atsui_runtime_open.png` | Blink open frame (optional) |
| `atsui_runtime_closed.png` | Blink closed frame (optional) |

Copy approved files to `src/assets/avatar/`. Do **not** crop from the reference sheet in code — production export must come from PSD/source.

### Not acceptable

- CSS crop of reference sheet
- Placeholder layer PNGs from M2
- Invented or AI-generated substitute art
