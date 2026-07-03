import type { AppModeId } from '@/core/types';

/** Static asset files under src/assets/avatar/. */
export type AvatarAssetId =
  | 'body'
  | 'hair_back'
  | 'hair_front'
  | 'eyes_open'
  | 'eyes_closed'
  | 'mouth_neutral'
  | 'ears'
  | 'tail'
  | 'glasses'
  | 'hoodie'
  | 'raincoat'
  | 'bowtie'
  | 'headphones'
  | 'helmet';

/** Accessory layers toggled per mode (base layers are always rendered). */
export type AvatarAccessoryId = Exclude<
  AvatarAssetId,
  'body' | 'hair_back' | 'hair_front' | 'eyes_open' | 'eyes_closed' | 'mouth_neutral' | 'ears' | 'tail'
>;

/** Z-order for compositing — bottom to top. */
export const LAYER_RENDER_ORDER: AvatarAssetId[] = [
  'hair_back',
  'tail',
  'body',
  'ears',
  'eyes_open',
  'eyes_closed',
  'mouth_neutral',
  'hair_front',
  'glasses',
  'hoodie',
  'raincoat',
  'bowtie',
  'headphones',
  'helmet',
];

/** Mode-specific accessory visibility (ModeManager API unchanged — read mode.id only). */
export const MODE_ACCESSORIES: Partial<Record<AppModeId, AvatarAccessoryId[]>> = {
  ANALYST: ['glasses'],
  PROFESSIONAL: ['raincoat', 'bowtie'],
  GAMING: ['headphones'],
  SLEEP: ['hoodie'],
  OVERHEATED: ['helmet'],
};

export const ALL_ASSET_IDS: AvatarAssetId[] = [
  'body',
  'hair_back',
  'hair_front',
  'eyes_open',
  'eyes_closed',
  'mouth_neutral',
  'ears',
  'tail',
  'glasses',
  'hoodie',
  'raincoat',
  'bowtie',
  'headphones',
  'helmet',
];

export interface LoadedAsset {
  id: AvatarAssetId;
  src: string;
  isPlaceholder: boolean;
}

export interface AvatarRendererProps {
  modeId: AppModeId;
  eyeColor: string;
  accentColor: string;
  backgroundGlow: string;
  isTransitioning: boolean;
  scale?: number;
}
