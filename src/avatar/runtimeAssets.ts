/**
 * Production runtime character images only — not the master reference sheet.
 */
import atsuiRuntime from '@/assets/avatar/atsui_runtime.png';

export function hasRuntimeAsset(): boolean {
  return Boolean(atsuiRuntime);
}

export function resolveRuntimeSrc(_eyesClosed: boolean): string {
  return atsuiRuntime;
}
