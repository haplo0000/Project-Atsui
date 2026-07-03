import type { AppModeId } from '@/core/types';
import type { AvatarAccessoryId, AvatarAssetId } from './types';
import { MODE_ACCESSORIES } from './types';

const ACCESSORY_LAYERS = new Set<AvatarAssetId>([
  'glasses',
  'hoodie',
  'raincoat',
  'bowtie',
  'headphones',
  'helmet',
]);

export function isLayerVisible(
  layerId: AvatarAssetId,
  modeId: AppModeId,
  eyesClosed: boolean,
): boolean {
  if (layerId === 'eyes_open') return !eyesClosed;
  if (layerId === 'eyes_closed') return eyesClosed;

  if (ACCESSORY_LAYERS.has(layerId)) {
    const accessories: AvatarAccessoryId[] = MODE_ACCESSORIES[modeId] ?? [];
    return accessories.includes(layerId as AvatarAccessoryId);
  }

  return true;
}
