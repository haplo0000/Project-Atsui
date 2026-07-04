# Project Atsui — Art Pipeline

This document defines how artwork flows from concept to runtime for the Atsui desktop companion.

---

## Folder purposes

### `Master/`

Canonical visual reference for the character. Not used directly at runtime.

| Subfolder | Contents |
|-----------|----------|
| `Approved/` | Lead-approved master sheets and final character reference |
| `Concepts/` | Exploratory sketches and iteration drafts |
| `References/` | Mood boards, pose refs, material swatches, external inspiration |
| `ColorPalettes/` | Mode palette swatches (HEX/RGBA) per companion mode |

### `PSD/`

Layered Photoshop (or compatible) source files. One PSD per logical asset group or full rig sheet.

- Keep layers named to match `LAYER_MANIFEST.md`
- Use non-destructive adjustment layers where possible
- Do not flatten until export checkpoint

### `Cubism/`

Live2D Cubism Editor workspace.

| Subfolder | Contents |
|-----------|----------|
| `Models/` | `.cmo3` / model project files |
| `Motions/` | `.motion3.json` idle, blink, breathe, mode transitions |
| `Physics/` | `.physics3.json` hair, ears, tail, jacket physics |
| `Expressions/` | `.exp3.json` per expression and mode variant |
| `Exports/` | Cubism-native export staging before runtime copy |

### `Exports/`

Build-ready outputs consumed by engineering (eventually layered sprites or Live2D).

| Subfolder | Contents |
|-----------|----------|
| `Runtime/` | PNG/WebP/Atlas files wired into `src/assets/` |
| `Textures/` | Individual layer textures and sprite sheets |
| `Archives/` | Versioned zip snapshots per milestone |

### `Templates/`

Naming templates, JSON manifests, validation scripts. No final artwork.

### `Docs/`

Pipeline documentation, manifests, checklists.

---

## Naming conventions

### General rules

- **Lowercase** file and folder names for runtime exports
- **Underscores** separate words: `hair_front.png`, not `hairFront.png`
- **No spaces** in filenames committed to Git
- **ASCII only** in filenames

### Prefix pattern

```
atsui_<layer>[_<variant>].<ext>
```

Examples:

```
atsui_body.png
atsui_eyes_open.png
atsui_eyes_closed.png
atsui_hoodie.png
atsui_hair_front.png
```

### Source files (PSD / Cubism)

```
Atsui_<AssetGroup>_v<MAJOR>.<MINOR>.<PATCH>.psd
Atsui_v<MAJOR>.<MINOR>.<PATCH>.cmo3
```

Examples:

```
Atsui_Layers_v1.0.0.psd
Atsui_v1.2.0.cmo3
```

### Motions and expressions

```
atsui_<name>.motion3.json
atsui_<name>.exp3.json
atsui_<name>.physics3.json
```

Examples:

```
atsui_idle.motion3.json
atsui_blink.exp3.json
atsui_tail.physics3.json
```

### Mode accessory variants

When a layer differs per mode, use suffix:

```
atsui_<layer>_<mode>.png
```

Mode slugs (match app `AppModeId`):

`idle`, `analyst`, `professional`, `gaming`, `battle`, `ai_processing`, `sleep`, `overheated`

Example:

```
atsui_glasses_analyst.png
```

---

## Versioning

### Semantic versioning for art milestones

| Bump | When |
|------|------|
| **MAJOR** | Character redesign, proportions change, layer stack restructure |
| **MINOR** | New accessory layer, new expression set, new mode outfit |
| **PATCH** | Color tweak, edge cleanup, export fix, no new layers |

### Version file

Record the current art version in:

```
Exports/Archives/VERSION.txt
```

Format:

```
art_version=1.0.0
cubism_model=Atsui_v1.0.0.cmo3
psd_source=Atsui_Layers_v1.0.0.psd
approved_master=<filename in Master/Approved/>
date=YYYY-MM-DD
author=
notes=
```

### Archive snapshots

Before each engineering handoff:

1. Bump version in `VERSION.txt`
2. Zip `Exports/Runtime/` → `Exports/Archives/atsui_runtime_vX.Y.Z.zip`
3. Note the Git tag (see Git workflow)

---

## Export workflow

### Phase 1 — Layered sprites (current engineering target)

```
Master/Approved  →  PSD/  →  Exports/Textures/  →  Exports/Runtime/  →  src/assets/avatar/
```

1. **Reference** — Confirm against latest file in `Master/Approved/`
2. **PSD** — Build/update layered source in `PSD/` per `LAYER_MANIFEST.md`
3. **Slice** — Export each layer as transparent PNG @ **200×240** base (or @2x **400×480**)
4. **Stage** — Copy to `Exports/Textures/` with `atsui_<layer>.png` names
5. **Runtime** — Promote approved set to `Exports/Runtime/`
6. **Handoff** — Engineering copies into `src/assets/avatar/` (separate PR)

### Phase 2 — Live2D (future)

```
PSD/  →  Cubism/Models/  →  Cubism/Exports/  →  Exports/Runtime/
```

1. Import PSD layers into Cubism model
2. Rig meshes and parameters
3. Author motions in `Cubism/Motions/`
4. Author physics in `Cubism/Physics/`
5. Export `.model3.json` + textures to `Cubism/Exports/`
6. Copy validated bundle to `Exports/Runtime/live2d/`

### Export checklist (every handoff)

- [ ] All manifest layers exported or marked N/A
- [ ] Transparent background on every PNG
- [ ] Consistent canvas size across layers
- [ ] `validate-naming.mjs` passes
- [ ] `VERSION.txt` updated
- [ ] Archive zip created

---

## Live2D workflow

### Tooling

- **Live2D Cubism Editor** (version pinned in `Docs/TOOL_VERSIONS.txt` when set)
- Source PSDs from `PSD/` — one layer group per Cubism drawable

### Recommended parameter map

| Parameter | Purpose |
|-----------|---------|
| `ParamAngleX/Y/Z` | Head rotation |
| `ParamEyeLOpen/ROpen` | Blink |
| `ParamEyeBallX/Y` | Gaze |
| `ParamMouthOpenY` | Mouth |
| `ParamBreath` | Breathing |
| `ParamBodyAngleX` | Subtle sway |

### Motion sets (minimum)

| Motion | Trigger |
|--------|---------|
| `idle` | Default loop |
| `blink` | Random timer |
| `breathe` | Continuous subtle |
| `mode_transition` | App mode change |

### Physics

- **Hair** — front and back groups
- **Ears** — pendulum
- **Tail** — multi-segment sway
- **Jacket/Hoodie** — cloth follow

Store authored files under `Cubism/Physics/` and reference in model.

### Expression sets per mode

Map Cubism expressions to app modes (see `LAYER_MANIFEST.md` accessory section).

---

## Git workflow for art assets

### What to commit

| Commit | Do |
|--------|-----|
| `Master/Approved/` | Yes — after lead approval |
| `PSD/` | Yes — source of truth |
| `Cubism/` | Yes — model project files |
| `Exports/Runtime/` | Yes — handoff-ready PNGs (reasonable size) |
| `Exports/Archives/*.zip` | Optional — prefer Git LFS or release attachments for large zips |
| `Master/Concepts/` | Optional — may stay local until approved |

### What not to commit

- Unapproved concept scrap
- Flattened temp exports
- Cubism `*.moc3` build cache outside `Exports/`
- Files over **50 MB** without Git LFS

### Branch naming

```
art/<milestone>-<short-description>
```

Examples:

```
art/m2-layered-sprites
art/m7-live2d-idle-rig
```

### Commit message format

```
art: <verb> <what>

Examples:
art: add v1.0.0 layered PSD source
art: export runtime sprites for analyst accessories
art: update approved master reference
```

### Tags

Tag engineering handoffs:

```
art-v1.0.0
art-v1.1.0-runtime
```

### Pull request rules

1. PR must reference updated `LAYER_MANIFEST.md` checkboxes (when layers ship)
2. Run `validate-art-structure.mjs` and `validate-naming.mjs` — paste output in PR
3. Include before/after screenshot of `Exports/Runtime/` layout
4. Do **not** mix art PRs with application code PRs

### Git LFS (recommended)

Track large binaries:

```
*.psd
*.cmo3
*.zip
*.png filter=lfs diff=lfs merge=lfs -text  # optional for large atlases
```

---

## Contacts and authority

| Role | Responsibility |
|------|----------------|
| Art lead | Approves `Master/Approved/` |
| Pipeline engineer | Maintains this doc and validation scripts |
| App engineer | Consumes `Exports/Runtime/` only |

When in doubt, do not export to `Runtime/` until approved.
