import type { AvatarAssetId } from './types';

interface AvatarLayerProps {
  id: AvatarAssetId;
  src: string;
  visible: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export function AvatarLayer({ id, src, visible, className = '', style }: AvatarLayerProps) {
  if (!visible) return null;

  return (
    <img
      className={`avatar-layer avatar-layer-${id} ${className}`.trim()}
      src={src}
      alt=""
      aria-hidden="true"
      draggable={false}
      style={style}
    />
  );
}
