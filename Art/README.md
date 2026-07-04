# Project Atsui — Art Pipeline Root

This directory contains all production artwork source files, Live2D Cubism assets, exports, and pipeline documentation for the Atsui desktop companion.

**Do not commit work-in-progress concepts to `Master/Approved/` without lead review.**

## Structure

| Folder | Purpose |
|--------|---------|
| `Master/` | Canonical reference art and approved masters |
| `PSD/` | Layered Photoshop source files |
| `Cubism/` | Live2D Cubism Editor project files |
| `Exports/` | Build-ready runtime and texture outputs |
| `Templates/` | Naming templates, manifests, helper scripts |
| `Docs/` | Pipeline documentation and layer manifests |

## Quick start

1. Read [`Docs/PIPELINE.md`](Docs/PIPELINE.md)
2. Review [`Docs/LAYER_MANIFEST.md`](Docs/LAYER_MANIFEST.md)
3. Place approved masters in `Master/Approved/`
4. Build layered PSDs in `PSD/`
5. Rig in `Cubism/Models/`
6. Export runtime assets to `Exports/Runtime/`

## Validation

```bash
node Templates/scripts/validate-art-structure.mjs
node Templates/scripts/validate-naming.mjs --dir Exports/Runtime
```
