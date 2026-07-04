#!/usr/bin/env node
/**
 * Updates fields in Exports/Archives/VERSION.txt
 * Usage: node Templates/scripts/update-version.mjs --art-version 1.0.0 --author "Name" --notes "Description"
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const VERSION_FILE = join(__dirname, '../../Exports/Archives/VERSION.txt');

const args = process.argv.slice(2);

function getArg(flag) {
  const i = args.indexOf(flag);
  return i >= 0 ? args[i + 1] : undefined;
}

const updates = {
  art_version: getArg('--art-version'),
  cubism_model: getArg('--cubism-model'),
  psd_source: getArg('--psd-source'),
  approved_master: getArg('--approved-master'),
  export_scale: getArg('--export-scale'),
  canvas_size: getArg('--canvas-size'),
  author: getArg('--author'),
  notes: getArg('--notes'),
};

let content = readFileSync(VERSION_FILE, 'utf8');
const lines = content.split('\n');

const next = lines.map((line) => {
  const [key] = line.split('=');
  const update = updates[key];
  if (update !== undefined) {
    return `${key}=${update}`;
  }
  if (key === 'date' && Object.values(updates).some(Boolean)) {
    return `date=${new Date().toISOString().slice(0, 10)}`;
  }
  return line;
});

writeFileSync(VERSION_FILE, next.join('\n') + '\n');
console.log('Updated VERSION.txt:');
console.log(next.join('\n'));
