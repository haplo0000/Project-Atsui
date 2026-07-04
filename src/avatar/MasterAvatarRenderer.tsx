import atsuiMasterOpen from '@/assets/avatar/atsui-master-open.png';
import atsuiMasterClosed from '@/assets/avatar/atsui-master-closed.png';
import { useBlinking } from '@/avatar/useAvatarAnimations';
import './MasterAvatarRenderer.css';

interface MasterAvatarRendererProps {
  backgroundGlow: string;
  isTransitioning: boolean;
  scale?: number;
}

export function MasterAvatarRenderer({
  backgroundGlow,
  isTransitioning,
  scale = 1,
}: MasterAvatarRendererProps) {
  const eyesClosed = useBlinking();

  return (
    <div
      className={`avatar-container ${isTransitioning ? 'avatar-transitioning' : ''}`}
      style={{
        '--glow-color': backgroundGlow,
        transform: `scale(${scale})`,
      } as React.CSSProperties}
    >
      <div className="avatar-glow" />
      <div className={`avatar-master-stage ${eyesClosed ? 'avatar-master-stage--closed' : ''}`}>
        <img
          className="avatar-master-image"
          src={eyesClosed ? atsuiMasterClosed : atsuiMasterOpen}
          alt="Atsui"
          draggable={false}
        />
        <div className="avatar-blink-lids" aria-hidden="true">
          <span className="avatar-blink-lid avatar-blink-lid-left" />
          <span className="avatar-blink-lid avatar-blink-lid-right" />
        </div>
      </div>
    </div>
  );
}
