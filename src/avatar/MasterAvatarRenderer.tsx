import { useEffect } from 'react';
import { useBlinking } from '@/avatar/useAvatarAnimations';
import { useIdleLife } from '@/avatar/useIdleLife';
import { hasRuntimeAsset, resolveRuntimeSrc } from '@/avatar/runtimeAssets';
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
  const { reducedMotion, headTiltDeg, microX, microY } = useIdleLife();
  const runtimeSrc = resolveRuntimeSrc(eyesClosed);

  useEffect(() => {
    if (!hasRuntimeAsset() && import.meta.env.DEV) {
      console.warn(
        '[Atsui] Blocked on production runtime image: add atsui_runtime.png to src/assets/avatar/ (see Art/Exports/Runtime/).',
      );
    }
  }, []);

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
        <div
          className={`avatar-idle-float ${reducedMotion ? 'avatar-idle-float--reduced' : ''}`}
        >
          <div
            className={`avatar-idle-breathe ${reducedMotion ? 'avatar-idle-breathe--reduced' : ''}`}
          >
            <div
              className="avatar-idle-motion"
              style={{
                transform: `rotate(${headTiltDeg}deg) translate(${microX.toFixed(2)}px, ${microY.toFixed(2)}px)`,
              }}
            >
              {runtimeSrc ? (
                <img
                  className="avatar-master-image"
                  src={runtimeSrc}
                  alt="Atsui"
                  draggable={false}
                />
              ) : null}
              {runtimeSrc ? (
                <div className="avatar-blink-lids" aria-hidden="true">
                  <span className="avatar-blink-lid avatar-blink-lid-left" />
                  <span className="avatar-blink-lid avatar-blink-lid-right" />
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
