import type { ModeDefinition } from '@/core/types';
import { MasterAvatarRenderer } from './MasterAvatarRenderer';
import './Avatar.css';

interface AvatarProps {
  mode: ModeDefinition;
  isTransitioning: boolean;
  scale?: number;
}

/** Avatar display using production runtime character assets (not the master reference sheet). */
export function Avatar({ mode, isTransitioning, scale = 1 }: AvatarProps) {
  return (
    <MasterAvatarRenderer
      backgroundGlow={mode.backgroundGlow}
      isTransitioning={isTransitioning}
      scale={scale}
    />
  );
}
