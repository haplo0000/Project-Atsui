import { useEffect } from 'react';
import atsuiRuntime from '@/assets/avatar/atsui_runtime.png';
import { useBlinking } from '@/avatar/useAvatarAnimations';
import { useIdleLife } from '@/avatar/useIdleLife';
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
  const runtimeSrc = atsuiRuntime;

  useEffect(() => {
    console.info('[Atsui] runtime avatar src:', runtimeSrc);
  }, [runtimeSrc]);

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
              <img
                className="avatar-master-image"
                src={runtimeSrc}
                alt="Atsui"
                draggable={false}
                onLoad={(event) => {
                  const img = event.currentTarget;
                  console.info('[Atsui] runtime avatar loaded:', {
                    src: img.currentSrc,
                    width: img.naturalWidth,
                    height: img.naturalHeight,
                    clientWidth: img.clientWidth,
                    clientHeight: img.clientHeight,
                  });
                }}
                onError={() => {
                  console.error('[Atsui] runtime avatar failed to load:', runtimeSrc);
                }}
              />
              <div className="avatar-blink-lids" aria-hidden="true">
                <span className="avatar-blink-lid avatar-blink-lid-left" />
                <span className="avatar-blink-lid avatar-blink-lid-right" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
