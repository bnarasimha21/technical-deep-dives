import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { theme } from '../theme';

/** Chip-style die box with glassmorphism, circuit grid, and glow */
const DieBox: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 60 } });
  const scale = interpolate(progress, [0, 0.5, 0.8, 1], [0.6, 1.06, 0.97, 1], { extrapolateRight: 'clamp' });
  const opacity = interpolate(progress, [0, 0.15], [0, 1], { extrapolateRight: 'clamp' });
  const glowOpacity = interpolate(progress, [0, 0.4, 1], [0, 0.8, 0], { extrapolateRight: 'clamp' });

  // Subtle idle glow pulse after entrance
  const idleGlow = progress > 0.95 ? 0.15 + Math.sin(frame * 0.08) * 0.1 : 0;

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        position: 'relative',
        overflow: 'hidden',
        borderRadius: 16,
        padding: '44px 60px',
        textAlign: 'center',
        minWidth: 280,
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: `1.5px solid rgba(118, 185, 0, 0.3)`,
        boxShadow: `0 0 ${24 * glowOpacity + 16 * idleGlow}px ${8 * glowOpacity + 6 * idleGlow}px rgba(118, 185, 0, ${0.4 * glowOpacity + idleGlow})`,
      }}
    >
      {/* Circuit grid overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.06,
          backgroundImage:
            `linear-gradient(rgba(118,185,0,0.5) 1px, transparent 1px),
             linear-gradient(90deg, rgba(118,185,0,0.5) 1px, transparent 1px)`,
          backgroundSize: '28px 28px',
          pointerEvents: 'none',
        }}
      />
      <div style={{ fontSize: 52, fontWeight: 700, color: theme.colors.accent, position: 'relative' }}>{label}</div>
      <div style={{ fontSize: 28, color: theme.colors.textMuted, marginTop: 12, position: 'relative' }}>
        104B transistors
        <br />
        80 SMs &middot; 320 Tensor Cores
      </div>
    </div>
  );
};

/** Animated NV-HBI connector with flowing data dots */
const NvHbiConnector: React.FC<{ delay: number }> = ({ delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 14, stiffness: 60 } });
  const opacity = interpolate(progress, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });
  const scaleX = interpolate(progress, [0, 0.4, 1], [0.2, 1.05, 1], { extrapolateRight: 'clamp' });

  const lineWidth = 180;
  const dotCount = 4;

  return (
    <div
      style={{
        opacity,
        transform: `scaleX(${scaleX})`,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '0 16px',
        gap: 6,
      }}
    >
      <div style={{ fontSize: 28, color: theme.colors.accent, fontWeight: 700, letterSpacing: 1 }}>NV-HBI</div>

      {/* Animated line with flowing dots */}
      <div style={{ position: 'relative', width: lineWidth, height: 20 }}>
        {/* Base line */}
        <div
          style={{
            position: 'absolute',
            top: 9,
            left: 0,
            right: 0,
            height: 2,
            background: `linear-gradient(90deg, transparent, ${theme.colors.accent}, transparent)`,
          }}
        />
        {/* Flowing dots — left to right */}
        {Array.from({ length: dotCount }).map((_, i) => {
          const dotX = ((frame * 2.5 + i * (lineWidth / dotCount)) % lineWidth);
          const centerDist = Math.abs(dotX - lineWidth / 2) / (lineWidth / 2);
          const dotOpacity = progress > 0.5 ? (1 - centerDist * 0.5) : 0;
          return (
            <div
              key={`r${i}`}
              style={{
                position: 'absolute',
                top: 6,
                left: dotX,
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: theme.colors.accent,
                opacity: dotOpacity,
                boxShadow: `0 0 6px ${theme.colors.accent}`,
              }}
            />
          );
        })}
        {/* Flowing dots — right to left */}
        {Array.from({ length: dotCount }).map((_, i) => {
          const dotX = lineWidth - ((frame * 2.5 + i * (lineWidth / dotCount)) % lineWidth);
          const centerDist = Math.abs(dotX - lineWidth / 2) / (lineWidth / 2);
          const dotOpacity = progress > 0.5 ? (1 - centerDist * 0.5) * 0.6 : 0;
          return (
            <div
              key={`l${i}`}
              style={{
                position: 'absolute',
                top: 6,
                left: dotX,
                width: 6,
                height: 6,
                borderRadius: '50%',
                background: theme.colors.accent,
                opacity: dotOpacity,
              }}
            />
          );
        })}
      </div>

      <div style={{ fontSize: 30, color: theme.colors.accent, fontWeight: 700 }}>10 TB/s</div>
    </div>
  );
};

/** Animated HBM3e chip that pops in */
const HbmChip: React.FC<{ index: number; baseDelay: number }> = ({ index, baseDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const chipDelay = baseDelay + index * 4; // stagger 4 frames apart
  const pop = spring({ frame: frame - chipDelay, fps, config: { damping: 10, stiffness: 80 } });
  const scale = interpolate(pop, [0, 0.5, 0.8, 1], [0, 1.12, 0.96, 1], { extrapolateRight: 'clamp' });
  const opacity = interpolate(pop, [0, 0.15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        opacity,
        transform: `scale(${scale})`,
        background: `linear-gradient(180deg, ${theme.colors.accent}, rgba(118,185,0,0.7))`,
        borderRadius: 6,
        padding: '10px 20px',
        fontSize: 22,
        color: '#000',
        fontWeight: 700,
        boxShadow: `0 2px 8px rgba(118,185,0,0.3)`,
      }}
    >
      36 GB
    </div>
  );
};

export const Scene4DualReticle: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Audio src={staticFile('scene4-dual-reticle.m4a')} />
      {/* Two dies revealed */}
      <Sequence from={0} durationInFrames={fps * 65}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Dual-Reticle Architecture" />

          <FadeIn delay={fps * 5}>
            <p style={{ fontSize: 36, color: theme.colors.textMuted, textAlign: 'center' }}>
              Two dies. One GPU.
            </p>
          </FadeIn>

          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 36 }}>
            <DieBox label="Die A" delay={fps * 5} />
            <NvHbiConnector delay={fps * 31} />
            <DieBox label="Die B" delay={fps * 5} />
          </div>

          {/* Unified L2 — glassmorphism bar spanning both dies */}
          <FadeIn delay={fps * 49} style={{ marginTop: 40, width: '100%', maxWidth: 750 }}>
            <div
              style={{
                borderRadius: 10,
                padding: '14px 28px',
                textAlign: 'center',
                fontSize: 30,
                color: theme.colors.accent2,
                fontWeight: 600,
                background: 'rgba(0, 128, 255, 0.06)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: `1.5px solid rgba(0, 128, 255, 0.25)`,
                boxShadow: '0 0 16px rgba(0, 128, 255, 0.15)',
              }}
            >
              Unified L2 Cache: 192 MB
            </div>
          </FadeIn>

          {/* HBM3e stacks — staggered pop-in */}
          <FadeIn delay={fps * 53} style={{ marginTop: 32 }}>
            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <HbmChip key={i} index={i} baseDelay={fps * 53} />
              ))}
            </div>
            <p style={{ fontSize: 26, color: theme.colors.textMuted, textAlign: 'center', marginTop: 10 }}>
              8x HBM3e stacks = 288 GB @ 8 TB/s
            </p>
          </FadeIn>

        </CenteredSlide>
      </Sequence>

      {/* Reticle limit — 10s to 18s */}
      <Sequence from={fps * 10} durationInFrames={fps * 8}>
        <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <FadeIn delay={0}>
            <div
              style={{
                borderRadius: 12,
                padding: '18px 32px',
                textAlign: 'center',
                maxWidth: 700,
                background: 'rgba(255, 255, 255, 0.04)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: `1px solid ${theme.colors.border}`,
              }}
            >
              <span style={{ fontSize: 30, color: theme.colors.textMuted }}>Each die is at the </span>
              <span style={{ fontSize: 30, color: theme.colors.accent, fontWeight: 700 }}>reticle limit</span>
              <span style={{ fontSize: 30, color: theme.colors.textMuted }}> on TSMC 4NP</span>
            </div>
          </FadeIn>
        </div>
      </Sequence>

    </Background>
  );
};
