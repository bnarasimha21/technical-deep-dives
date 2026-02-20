import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, spring, interpolate, Audio, staticFile } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
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
        padding: '40px 56px',
        textAlign: 'center',
        minWidth: 260,
        background: 'rgba(118,185,0,0.05)',
        opacity,
        transform: `scale(${scale})`,
      }}
    >
      <div style={{ fontSize: 52, fontWeight: 700, color: theme.colors.accent }}>{label}</div>
      <div style={{ fontSize: 28, color: theme.colors.textMuted, marginTop: 12 }}>
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
      <Audio src={staticFile('scene4-dual-reticle.m4a')} />
      {/* Two dies revealed */}
      <Sequence from={0} durationInFrames={fps * 61}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Dual-Reticle Architecture" />

          <FadeIn delay={fps * 5}>
            <p style={{ fontSize: 36, color: theme.colors.textMuted, textAlign: 'center' }}>
              Two dies. One GPU.
            </p>
          </FadeIn>

          <div style={{ display: 'flex', alignItems: 'center', gap: 0, marginTop: 36 }}>
            <DieBox label="Die A" delay={fps * 5} />

            {/* NV-HBI connector */}
            <FadeIn delay={fps * 31} direction="none">
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '0 28px' }}>
                <div style={{ fontSize: 30, color: theme.colors.accent, fontWeight: 700 }}>NV-HBI</div>
                <div style={{ fontSize: 52, color: theme.colors.accent, letterSpacing: -3 }}>&#9664;&#9472;&#9472;&#9654;</div>
                <div style={{ fontSize: 30, color: theme.colors.accent, fontWeight: 700 }}>10 TB/s</div>
              </div>
            </FadeIn>

            <DieBox label="Die B" delay={fps * 5} />
          </div>

          {/* Unified L2 */}
          <FadeIn delay={fps * 49} style={{ marginTop: 44, width: '100%', maxWidth: 650 }}>
            <div
              style={{
                border: `1px solid ${theme.colors.accent2}`,
                borderRadius: 8,
                padding: '10px 20px',
                textAlign: 'center',
                fontSize: 30,
                color: theme.colors.accent2,
                background: 'rgba(0,128,255,0.05)',
              }}
            >
              Unified L2 Cache: 192 MB
            </div>
          </FadeIn>

          {/* HBM3e stacks */}
          <FadeIn delay={fps * 53} style={{ marginTop: 36 }}>
            <div style={{ display: 'flex', gap: 10, justifyContent: 'center' }}>
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    background: theme.colors.accent,
                    borderRadius: 4,
                    padding: '8px 20px',
                    fontSize: 22,
                    color: '#000',
                    fontWeight: 700,
                  }}
                >
                  36 GB
                </div>
              ))}
            </div>
            <p style={{ fontSize: 26, color: theme.colors.textMuted, textAlign: 'center', marginTop: 8 }}>
              8x HBM3e stacks = 288 GB @ 8 TB/s
            </p>
          </FadeIn>

        </CenteredSlide>
      </Sequence>

      {/* Reticle limit — 17s to 25s */}
      <Sequence from={fps * 17} durationInFrames={fps * 8}>
        <div style={{ position: 'absolute', bottom: 80, left: 0, right: 0, display: 'flex', justifyContent: 'center' }}>
          <FadeIn delay={0}>
            <div
              style={{
                border: `1px solid ${theme.colors.border}`,
                borderRadius: 10,
                padding: '16px 24px',
                textAlign: 'center',
                maxWidth: 700,
              }}
            >
              <span style={{ fontSize: 30, color: theme.colors.textMuted }}>Reticle limit: </span>
              <span style={{ fontSize: 30, color: theme.colors.accent, fontWeight: 700 }}>~858 mm²</span>
              <span style={{ fontSize: 30, color: theme.colors.textMuted }}> on TSMC 4nm</span>
            </div>
          </FadeIn>
        </div>
      </Sequence>

    </Background>
  );
};
