import { useEffect, useMemo, useState } from 'react';
import { assetManager } from './AssetManager';
import { AvatarLayer } from './AvatarLayer';
import { isLayerVisible } from './layerVisibility';
import type { AvatarRendererProps } from './types';
import { ALL_ASSET_IDS, LAYER_RENDER_ORDER } from './types';
import type { LoadedAsset } from './types';
import { useBlinking } from './useAvatarAnimations';
import './AvatarRenderer.css';

export function AvatarRenderer({
  modeId,
  eyeColor,
  accentColor,
  backgroundGlow,
  isTransitioning,
  scale = 1,
}: AvatarRendererProps) {
  const eyesClosed = useBlinking();
  const [assets, setAssets] = useState<Partial<Record<string, LoadedAsset>>>(() => {
    const initial: Partial<Record<string, LoadedAsset>> = {};
    for (const id of ALL_ASSET_IDS) {
      const cached = assetManager.getCached(id);
      if (cached) initial[id] = cached;
    }
    return initial;
  });

  useEffect(() => {
    assetManager.setThemeColors(accentColor, eyeColor);
    let cancelled = false;

    void assetManager.preload(accentColor, eyeColor).then(() => {
      if (cancelled) return;
      const loaded: Partial<Record<string, LoadedAsset>> = {};
      for (const id of ALL_ASSET_IDS) {
        const cached = assetManager.getCached(id);
        if (cached) loaded[id] = cached;
      }
      setAssets(loaded);
    });

    return () => {
      cancelled = true;
    };
  }, [accentColor, eyeColor]);

  const layers = useMemo(
    () =>
      LAYER_RENDER_ORDER.map((id) => ({
        id,
        asset: assets[id],
        visible: isLayerVisible(id, modeId, eyesClosed),
      })),
    [modeId, eyesClosed, assets],
  );

  return (
    <div
      className={`avatar-container ${isTransitioning ? 'avatar-transitioning' : ''}`}
      style={{
        '--eye-color': eyeColor,
        '--accent-color': accentColor,
        '--glow-color': backgroundGlow,
        transform: `scale(${scale})`,
      } as React.CSSProperties}
    >
      <div className="avatar-glow" />
      <div className="avatar-stage">
        {layers.map(({ id, asset, visible }) => (
          <AvatarLayer
            key={id}
            id={id}
            src={asset?.src ?? ''}
            visible={visible && !!asset?.src}
            className={
              id === 'body'
                ? 'avatar-layer-breathe'
                : id === 'tail'
                  ? 'avatar-layer-tail-sway'
                  : undefined
            }
          />
        ))}
      </div>
    </div>
  );
}
