#!/usr/bin/env node
/**
 * Validates runtime export filenames against Atsui naming conventions.
 * Usage: node Templates/scripts/validate-naming.mjs [--dir Exports/Runtime]
 */
import { readdirSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ART_ROOT = join(__dirname, '../..');

const args = process.argv.slice(2);
const dirIndex = args.indexOf('--dir');
const targetRel = dirIndex >= 0 ? args[dirIndex + 1] : 'Exports/Runtime';
const targetDir = join(ART_ROOT, targetRel);

const VALID_NAME = /^atsui_[a-z0-9_]+\.(png|webp|json)$/;

function walk(dir) {
  const entries = [];
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) {
      entries.push(...walk(full));
    } else {
      entries.push(full);
    }
  }
  return entries;
}

let failed = 0;

console.log(`Validating naming in Art/${relative(ART_ROOT, targetDir).replace(/\\/g, '/')}...\n`);

let files;
try {
  files = walk(targetDir);
} catch {
  console.log(`Directory not found or empty: ${targetRel}`);
  console.log('PASS (no files to validate)');
  process.exit(0);
}

if (files.length === 0) {
  console.log('No files found — nothing to validate.');
  console.log('PASS');
  process.exit(0);
}

for (const file of files) {
  const name = file.split(/[/\\]/).pop() ?? '';
  if (name === 'README.md' || name === '.gitkeep') continue;

  const ok = VALID_NAME.test(name);
  const rel = relative(ART_ROOT, file).replace(/\\/g, '/');
  console.log(`${ok ? '✓' : '✗'} ${rel}`);
  if (!ok) failed++;
}

console.log(`\n${failed === 0 ? 'PASS' : `FAIL — ${failed} invalid filename(s)`}`);
process.exit(failed === 0 ? 0 : 1);
