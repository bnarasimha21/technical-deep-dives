import React from 'react';
import { useCurrentFrame, useVideoConfig, interpolate, spring, Sequence, Audio, staticFile, Img } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { StatBox } from '../components/StatBox';
import { theme } from '../theme';

const gpuGenerations = [
  { name: 'V100', year: '2017', label: 'GPT-2' },
  { name: 'A100', year: '2020', label: 'GPT-3' },
  { name: 'H100', year: '2022', label: 'GPT-4' },
];

/** Cinematic word-by-word reveal with accent highlights */
const CinematicText: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const words = [
    { text: 'Every', accent: false },
    { text: 'generation', accent: false },
    { text: 'of', accent: false },
    { text: 'AI', accent: true },
    { text: 'has', accent: false },
    { text: 'been', accent: false },
    { text: 'defined', accent: false },
    { text: 'by', accent: false },
    { text: 'its', accent: false },
    { text: 'hardware', accent: true },
  ];

  return (
    <div style={{ textAlign: 'center', marginBottom: 50, perspective: 600 }}>
      <p style={{ fontSize: 50, lineHeight: 1.6, margin: 0 }}>
        {words.map((word, i) => {
          const wordDelay = 8 + i * 8; // ~0.27s per word
          const pop = spring({ frame: frame - wordDelay, fps, config: { damping: 16, stiffness: 80 } });
          const opacity = interpolate(pop, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' });
          const scale = interpolate(pop, [0, 0.4, 0.7, 1], [0.7, 1.08, 0.98, 1], { extrapolateRight: 'clamp' });
          const blur = interpolate(pop, [0, 0.5], [6, 0], { extrapolateRight: 'clamp' });
          const translateY = interpolate(pop, [0, 1], [12, 0], { extrapolateRight: 'clamp' });

          // Accent words get glow pulse after appearing
          const glowActive = word.accent && pop > 0.9;
          const glow = glowActive ? 0.4 + Math.sin(frame * 0.12) * 0.25 : 0;

          return (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity,
                transform: `scale(${scale}) translateY(${translateY}px)`,
                filter: `blur(${blur}px)`,
                color: word.accent ? theme.colors.accent2 : theme.colors.text,
                fontWeight: word.accent ? 800 : 400,
                textShadow: word.accent
                  ? `0 0 ${12 * glow}px rgba(0, 128, 255, ${glow})`
                  : 'none',
                marginRight: 14,
              }}
            >
              {word.text}
            </span>
          );
        })}
      </p>
    </div>
  );
};

export const Scene1Hook: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Audio src={staticFile('scene1-hook.m4a')} />
      {/* GPU Evolution Flash — [0-14s] */}
      <Sequence from={0} durationInFrames={fps * 14}>
        <CenteredSlide padding="0 100px">
          <CinematicText />

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
                        color: theme.colors.accent2,
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
            <StatBox number="15" label="PFLOPS FP4 Sparse" delay={fps * 10} />
            <StatBox number="288" label="GB HBM3e" delay={fps * 13} />
            <StatBox number="208B" label="Transistors" delay={fps * 13 + 120} />
          </div>
        </CenteredSlide>
      </Sequence>

      {/* What We'll Cover — [40-56s] */}
      <Sequence from={fps * 40} durationInFrames={fps * 16}>
        <CenteredSlide padding="0 120px">
          <SceneTitle title="What We'll Cover" />

          <div style={{ display: 'flex', flexDirection: 'column', gap: 32, width: '100%', maxWidth: 900 }}>
            {[
              { num: '1', text: 'B300 Architecture Deep Dive', color: theme.colors.accent2, delay: fps * 2 },
              { num: '2', text: 'B300 vs B200 vs H100', color: theme.colors.accent2, delay: fps * 4 },
              { num: '3', text: 'What It Means for Developers', color: '#FFB400', delay: fps * 6 },
            ].map((item) => (
              <FadeIn key={item.num} delay={item.delay}>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 28,
                    background: 'rgba(255, 255, 255, 0.04)',
                    backdropFilter: 'blur(10px)',
                    WebkitBackdropFilter: 'blur(10px)',
                    borderLeft: `4px solid ${item.color}`,
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderLeftWidth: 4,
                    borderLeftColor: item.color,
                    padding: '28px 36px',
                    borderRadius: '0 14px 14px 0',
                  }}
                >
                  <span style={{ fontSize: 44, fontWeight: 800, color: item.color }}>{item.num}</span>
                  <span style={{ fontSize: 36, color: theme.colors.text }}>{item.text}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
