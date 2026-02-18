import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { theme } from '../theme';

const DieBox: React.FC<{ label: string; delay: number }> = ({ label, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });
  const scale = interpolate(progress, [0, 1], [0.5, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  return (
    <div
      style={{
        border: `2px solid ${theme.colors.accent}`,
        borderRadius: 16,
        padding: '32px 48px',
        textAlign: 'center',
        minWidth: 260,
        background: 'rgba(118,185,0,0.05)',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ fontSize: 40, fontWeight: 700, color: theme.colors.accent }}>{label}</div>
      <div style={{ fontSize: 20, color: theme.colors.textMuted, marginTop: 12 }}>
        104B transistors
        <br />
        80 SMs &middot; 320 Tensor Cores
      </div>
    </div>
  );
};

export const Scene4DualReticle: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Two dies revealed */}
      <Sequence from={0} durationInFrames={fps * 35}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Dual-Reticle Architecture" subtitle="Two dies. One GPU. 208 billion transistors." />

          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 48 }}>
            <DieBox label="Die A" delay={20} />

            {/* NV-HBI connector */}
            <FadeIn delay={40} direction="none">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 28px' }}>
                <div style={{ fontSize: 22, color: theme.colors.accent, fontWeight: 700 }}>NV-HBI</div>
                <div style={{ fontSize: 40, color: theme.colors.accent, letterSpacing: -3 }}>&#9664;&#9472;&#9472;&#9654;</div>
                <div style={{ fontSize: 22, color: theme.colors.accent, fontWeight: 700 }}>10 TB/s</div>
              </div>
            </FadeIn>

            <DieBox label="Die B" delay={20} />
          </div>

          {/* Unified L2 */}
          <FadeIn delay={fps * 2} style={{ marginTop: 28, width: '100%', maxWidth: 650 }}>
            <div
              style={{
                border: `1px solid ${theme.colors.accent2}`,
                borderRadius: 8,
                padding: '10px 20px',
                textAlign: 'center',
                fontSize: 22,
                color: theme.colors.accent2,
                background: 'rgba(0,128,255,0.05)',
              }}
            >
              Unified L2 Cache: 50 MB
            </div>
          </FadeIn>

          {/* HBM3e stacks */}
          <FadeIn delay={fps * 3} style={{ marginTop: 20 }}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: theme.colors.accent,
                    borderRadius: 4,
                    padding: '6px 16px',
                    fontSize: 16,
                    color: '#000',
                    fontWeight: 700,
                  }}
                >
                  36 GB
                </div>
              ))}
            </div>
            <p style={{ fontSize: 18, color: theme.colors.textMuted, textAlign: 'center', marginTop: 8 }}>
              8x HBM3e stacks = 288 GB @ 8 TB/s
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* Single CUDA device + yield benefits */}
      <Sequence from={fps * 35} durationInFrames={fps * 40}>
        <CenteredSlide padding="0 140px">
          <Callout delay={0} style={{ maxWidth: 900 }}>
            Appears as a{' '}
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>single CUDA device</span>. Your code
            doesn't know or care that there are two dies underneath.
          </Callout>

          <Callout delay={fps * 2} style={{ marginTop: 24, maxWidth: 900 }}>
            <span style={{ color: theme.colors.accent, fontWeight: 700 }}>Manufacturing benefit:</span> smaller dies
            = better yield, more usable chips per wafer, fewer defects, potentially better supply availability.
          </Callout>

          <FadeIn delay={fps * 4} style={{ marginTop: 32 }}>
            <p style={{ fontSize: 26, color: theme.colors.textMuted, textAlign: 'center', maxWidth: 800 }}>
              NVIDIA chose to push beyond the reticle limit rather than accept smaller chips, because AI workloads
              need every transistor they can fit.
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
