import atsuiMaster from '@/assets/avatar/atsui-master.png';
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
  return (
    <div
      className={`avatar-container ${isTransitioning ? 'avatar-transitioning' : ''}`}
      style={{
        '--glow-color': backgroundGlow,
        transform: `scale(${scale})`,
      } as React.CSSProperties}
    >
      <div className="avatar-glow" />
      <div className="avatar-master-stage">
        <img
          className="avatar-master-image"
          src={atsuiMaster}
          alt="Atsui"
          draggable={false}
        />
      </div>
    </div>
  );
}
