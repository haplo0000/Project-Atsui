import type { ModeDefinition } from '@/core/types';
import { MasterAvatarRenderer } from './MasterAvatarRenderer';
import './Avatar.css';

interface AvatarProps {
  mode: ModeDefinition;
  isTransitioning: boolean;
  scale?: number;
}

/** Temporary avatar display using approved master artwork until layered production assets ship. */
export function Avatar({ mode, isTransitioning, scale = 1 }: AvatarProps) {
  return (
    <MasterAvatarRenderer
      backgroundGlow={mode.backgroundGlow}
      isTransitioning={isTransitioning}
      scale={scale}
    />
  );
}
