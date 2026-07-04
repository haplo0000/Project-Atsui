# Exports / Runtime

Production PNG/WebP/atlas files ready for engineering integration.

## Naming

All files: `atsui_<layer>.png` (see [`../../Docs/PIPELINE.md`](../../Docs/PIPELINE.md))

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
