import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Sequence, Audio, staticFile, Img } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { FadeIn } from '../components/FadeIn';
import { StatBox } from '../components/StatBox';
import { theme } from '../theme';

const gpuGenerations = [
  { name: 'V100', year: '2017', label: 'GPT-2' },
  { name: 'A100', year: '2020', label: 'GPT-3' },
  { name: 'H100', year: '2022', label: 'GPT-4' },
];

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Audio src={staticFile('scene1-hook.m4a')} />
      {/* GPU Evolution Flash — [0-14s] */}
      <Sequence from={0} durationInFrames={fps * 14}>
        <CenteredSlide padding="0 100px">
          <FadeIn delay={0}>
            <p
              style={{
                fontSize: 46,
                color: theme.colors.textMuted,
                textAlign: 'center',
                marginBottom: 50,
              }}
            >
              Every generation of AI has been defined by its hardware
            </p>
          </FadeIn>

          <div style={{ display: 'flex', gap: 50, justifyContent: 'center', alignItems: 'center' }}>
            {gpuGenerations.map((gpu, i) => {
              const delay = 150 + i * 75; // V100 ~5s, A100 ~7.5s, H100 ~10s, B300 ~12.5s
              const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 60 } });
              const isLast = i === gpuGenerations.length - 1;
              return (
                <React.Fragment key={gpu.name}>
                  <div
                    style={{
                      textAlign: 'center',
                      opacity: interpolate(progress, [0, 1], [0, 1]),
                      transform: `scale(${interpolate(progress, [0, 1], [0.7, 1])})`,
                    }}
                  >
                    <div
                      style={{
                        width: isLast ? 170 : 150,
                        height: isLast ? 190 : 170,
                        borderRadius: 20,
                        border: `2px solid ${isLast ? theme.colors.accent : theme.colors.border}`,
                        background: isLast ? 'rgba(118,185,0,0.15)' : theme.colors.bgCard,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: isLast ? 40 : 34,
                        fontWeight: 700,
                        color: isLast ? theme.colors.accent : theme.colors.text,
                      }}
                    >
                      {gpu.name}
                    </div>
                    <p style={{ fontSize: 24, color: theme.colors.textMuted, marginTop: 10 }}>{gpu.year}</p>
                    <p style={{ fontSize: 22, color: theme.colors.textMuted }}>{gpu.label}</p>
                  </div>
                  {i < gpuGenerations.length - 1 && (
                    <div
                      style={{
                        fontSize: 36,
                        color: theme.colors.accent,
                        opacity: interpolate(
                          spring({ frame: frame - delay - 15, fps, config: { damping: 20, stiffness: 100 } }),
                          [0, 1], [0, 1]
                        ),
                      }}
                    >
                      →
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </CenteredSlide>
      </Sequence>

      {/* Title Card + Stats — [14-40s] */}
      <Sequence from={fps * 14} durationInFrames={fps * 26}>
        <CenteredSlide>
          <FadeIn delay={0}>
            <Img
              src={staticFile('b300-chip.png')}
              style={{
                width: 400,
                objectFit: 'contain',
                marginBottom: 20,
              }}
            />
          </FadeIn>
          <FadeIn delay={10}>
            <h1
              style={{
                fontSize: 100,
                fontWeight: 800,
                color: theme.colors.accent,
                margin: 0,
                fontFamily: theme.fonts.heading,
                textAlign: 'center',
              }}
            >
              NVIDIA B300
            </h1>
          </FadeIn>
          <FadeIn delay={20}>
            <h2
              style={{
                fontSize: 54,
                fontWeight: 400,
                color: theme.colors.text,
                marginTop: 8,
                textAlign: 'center',
              }}
            >
              Blackwell Ultra
            </h2>
          </FadeIn>

          {/* Stats appear below the title at ~27s */}
          <div style={{ display: 'flex', gap: 60, justifyContent: 'center', marginTop: 40 }}>
            <StatBox number="15" label="PFLOPS (FP4)" delay={fps * 13} />
            <StatBox number="288" label="GB HBM3e" delay={fps * 13 + 60} />
            <StatBox number="208B" label="Transistors" delay={fps * 13 + 120} />
          </div>
        </CenteredSlide>
      </Sequence>

      {/* What We'll Cover — [40-54s] */}
      <Sequence from={fps * 40} durationInFrames={fps * 14}>
        <CenteredSlide padding="0 120px">
          <FadeIn delay={0}>
            <h2
              style={{
                fontSize: 56,
                fontWeight: 700,
                color: theme.colors.text,
                textAlign: 'center',
                marginBottom: 50,
              }}
            >
              What We'll Cover
            </h2>
          </FadeIn>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 30, width: '100%', maxWidth: 800 }}>
            <FadeIn delay={fps * 2}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  background: 'rgba(118,185,0,0.08)',
                  borderLeft: `4px solid ${theme.colors.accent}`,
                  padding: '24px 28px',
                  borderRadius: '0 12px 12px 0',
                }}
              >
                <span style={{ fontSize: 40, fontWeight: 800, color: theme.colors.accent }}>1</span>
                <span style={{ fontSize: 34, color: theme.colors.text }}>B300 Architecture Deep Dive</span>
              </div>
            </FadeIn>

            <FadeIn delay={fps * 4}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  background: 'rgba(0,128,255,0.08)',
                  borderLeft: `4px solid ${theme.colors.accent2}`,
                  padding: '24px 28px',
                  borderRadius: '0 12px 12px 0',
                }}
              >
                <span style={{ fontSize: 40, fontWeight: 800, color: theme.colors.accent2 }}>2</span>
                <span style={{ fontSize: 34, color: theme.colors.text }}>B300 vs B200 vs H100</span>
              </div>
            </FadeIn>

            <FadeIn delay={fps * 6}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                  background: 'rgba(255,180,0,0.08)',
                  borderLeft: '4px solid #FFB400',
                  padding: '24px 28px',
                  borderRadius: '0 12px 12px 0',
                }}
              >
                <span style={{ fontSize: 40, fontWeight: 800, color: '#FFB400' }}>3</span>
                <span style={{ fontSize: 34, color: theme.colors.text }}>What It Means for Developers</span>
              </div>
            </FadeIn>
          </div>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
