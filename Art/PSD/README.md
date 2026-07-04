# PSD

Layered Photoshop (or compatible) source files for Atsui production art.

## Guidelines

- Layer groups must match [`../Docs/LAYER_MANIFEST.md`](../Docs/LAYER_MANIFEST.md)
- Naming: `Atsui_<AssetGroup>_v<MAJOR>.<MINOR>.<PATCH>.psd`
- Keep layers editable — avoid flattening until export checkpoint
- Document canvas size and DPI in layer comp notes

## Typical files

```
Atsui_Layers_v1.0.0.psd       # Full character layer stack
Atsui_Accessories_v1.0.0.psd  # Optional split for mode outfits
```
