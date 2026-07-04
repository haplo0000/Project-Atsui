# Exports / Runtime

Production PNG/WebP/atlas files ready for engineering integration.

## Naming

All files: `atsui_<layer>.png` (see [`../../Docs/PIPELINE.md`](../../Docs/PIPELINE.md))

Interim full-body companion (until layered sprites ship):

| File | Purpose |
|------|---------|
| `atsui_runtime.png` | Isolated main full-body idle pose, transparent background |
| `atsui_runtime_open.png` | Optional blink open frame |
| `atsui_runtime_closed.png` | Optional blink closed frame |

## Handoff

Engineering copies approved files from here into:

```
src/assets/avatar/
```

Do not edit application paths directly from this folder — always PR through art branch first.

## Validation

```bash
node ../Templates/scripts/validate-naming.mjs --dir .
```
