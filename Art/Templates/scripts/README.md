# Templates / Scripts

Helper scripts for the Atsui art pipeline. No artwork.

## Scripts

| Script | Purpose |
|--------|---------|
| `validate-art-structure.mjs` | Verify required folders and docs exist |
| `validate-naming.mjs` | Check runtime export filenames |
| `update-version.mjs` | Update `Exports/Archives/VERSION.txt` |

Run from repository root or Art folder:

```bash
node Art/Templates/scripts/validate-art-structure.mjs
node Art/Templates/scripts/validate-naming.mjs --dir Exports/Runtime
node Art/Templates/scripts/update-version.mjs --art-version 1.0.0 --author "Artist" --notes "First export"
```
