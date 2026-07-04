#!/usr/bin/env node
/**
 * Validates that the Art/ folder structure matches the production pipeline spec.
 * Usage: node Templates/scripts/validate-art-structure.mjs
 */
import { existsSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ART_ROOT = join(__dirname, '../..');

const REQUIRED_PATHS = [
  'README.md',
  'Master/Approved',
  'Master/Concepts',
  'Master/References',
  'Master/ColorPalettes',
  'PSD',
  'Cubism/Models',
  'Cubism/Motions',
  'Cubism/Physics',
  'Cubism/Expressions',
  'Cubism/Exports',
  'Exports/Runtime',
  'Exports/Textures',
  'Exports/Archives',
  'Templates',
  'Docs/PIPELINE.md',
  'Docs/LAYER_MANIFEST.md',
  'Exports/Archives/VERSION.txt',
];

let failed = 0;

console.log('Validating Art/ folder structure...\n');

for (const rel of REQUIRED_PATHS) {
  const full = join(ART_ROOT, rel);
  const ok = existsSync(full);
  console.log(`${ok ? '✓' : '✗'} ${rel}`);
  if (!ok) failed++;
}

console.log(`\n${failed === 0 ? 'PASS' : `FAIL — ${failed} missing path(s)`}`);
process.exit(failed === 0 ? 0 : 1);
