import type { ModeDefinition } from '@/core/types';
import './Avatar.css';

interface AvatarProps {
  mode: ModeDefinition;
  isTransitioning: boolean;
  scale?: number;
}

export function Avatar({ mode, isTransitioning, scale = 1 }: AvatarProps) {
  return (
    <div
      className={`avatar-container ${isTransitioning ? 'avatar-transitioning' : ''}`}
      style={{
        '--eye-color': mode.eyeColor,
        '--accent-color': mode.accentColor,
        '--glow-color': mode.backgroundGlow,
        transform: `scale(${scale})`,
      } as React.CSSProperties}
    >
      <div className="avatar-glow" />
      <svg
        className="avatar-svg"
        viewBox="0 0 200 240"
        xmlns="http://www.w3.org/2000/svg"
        aria-label="Atsui avatar"
      >
        {/* Tail placeholder */}
        <g className="avatar-tail">
          <path
            d="M100 180 Q 130 200 120 230 Q 100 220 80 230 Q 70 200 100 180"
            fill={mode.accentColor}
            opacity="0.7"
          />
        </g>

        {/* Body */}
        <ellipse cx="100" cy="150" rx="55" ry="65" fill={mode.accentColor} opacity="0.85" />

        {/* Head group with tilt animation */}
        <g className="avatar-head">
          <circle cx="100" cy="85" r="48" fill={mode.accentColor} opacity="0.9" />

          {/* Ears */}
          <polygon points="58,55 48,20 72,45" fill={mode.accentColor} />
          <polygon points="142,55 152,20 128,45" fill={mode.accentColor} />

          {/* Eyes */}
          <g className="avatar-eyes">
            <ellipse className="avatar-eye-left" cx="82" cy="82" rx="10" ry="12" fill="#1a1a2e" />
            <ellipse className="avatar-eye-right" cx="118" cy="82" rx="10" ry="12" fill="#1a1a2e" />
            <circle className="avatar-pupil-left" cx="84" cy="83" r="5" fill={mode.eyeColor} />
            <circle className="avatar-pupil-right" cx="120" cy="83" r="5" fill={mode.eyeColor} />
            <circle cx="86" cy="81" r="2" fill="#fff" opacity="0.8" />
            <circle cx="122" cy="81" r="2" fill="#fff" opacity="0.8" />
          </g>

          {/* Blink overlay */}
          <g className="avatar-blink">
            <ellipse cx="82" cy="82" rx="11" ry="13" fill={mode.accentColor} />
            <ellipse cx="118" cy="82" rx="11" ry="13" fill={mode.accentColor} />
          </g>

          {/* Nose */}
          <ellipse cx="100" cy="95" rx="4" ry="3" fill="#1a1a2e" opacity="0.6" />

          {/* Mouth */}
          <path
            d="M 92 102 Q 100 108 108 102"
            stroke="#1a1a2e"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
        </g>
      </svg>
    </div>
  );
}
