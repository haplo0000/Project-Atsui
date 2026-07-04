/**
 * Production runtime character images only — not the master reference sheet.
 *
 * Expected handoff (Art/Exports/Runtime/ → src/assets/avatar/):
 * - atsui_runtime.png — isolated main full-body Atsui (transparent background)
 * - Optional blink pair: atsui_runtime_open.png / atsui_runtime_closed.png
 */

const runtimeModules = import.meta.glob<string>(
  '../assets/avatar/atsui_runtime*.png',
  { eager: true, import: 'default' },
);

function findRuntimeUrl(filename: string): string | undefined {
  const key = Object.keys(runtimeModules).find((entry) => entry.endsWith(filename));
  return key ? runtimeModules[key] : undefined;
}

export function hasRuntimeAsset(): boolean {
  return Boolean(findRuntimeUrl('atsui_runtime.png') ?? findRuntimeUrl('atsui_runtime_open.png'));
}

export function resolveRuntimeSrc(eyesClosed: boolean): string | null {
  const open =
    findRuntimeUrl('atsui_runtime_open.png') ??
    findRuntimeUrl('atsui_runtime.png') ??
    null;

  if (!open) {
    return null;
  }

  const closed = findRuntimeUrl('atsui_runtime_closed.png') ?? open;
  return eyesClosed ? closed : open;
}
