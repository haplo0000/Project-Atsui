# Cursor Status

**Last updated:** 2026-07-03  
**Iteration:** Runtime character blocker fix (no new features)

## Current state

| Area | Status |
|------|--------|
| Reference sheet rendering | **Stopped** — master PNGs no longer wired into UI |
| Runtime character | **BLOCKED** — awaiting production image |
| Duplicate companion window | **Fixed** — `requestSingleInstanceLock()` in `electron/main.ts` |
| Idle / blink / voice / commands | Unchanged |

## Blocker

The repo has only the full VTuber reference sheet (`atsui-master.png`, 1024×1536).  
`Art/Exports/Runtime/` is empty. No isolated full-body Atsui PNG exists.

**Required deliverable:** `atsui_runtime.png` (transparent background, main idle full-body pose)  
**Optional blink pair:** `atsui_runtime_open.png`, `atsui_runtime_closed.png`  
**Handoff path:** `Art/Exports/Runtime/` → `src/assets/avatar/`

## Next step

Art exports approved runtime character → engineering copies to `src/assets/avatar/` → avatar appears on desktop with existing idle/blink intact.

## Awaiting

Next task from `coordination/ARCHITECT_TASK.md` (file not present in repo).
