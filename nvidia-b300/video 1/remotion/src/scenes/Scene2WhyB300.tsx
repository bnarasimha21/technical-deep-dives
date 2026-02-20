import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, interpolate, spring, Audio, staticFile } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { StatBox } from '../components/StatBox';

import { theme } from '../theme';

const ModelSplitAnimation: React.FC<{ startDelay: number }> = ({ startDelay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // Phase 1: A single model block appears
  const modelAppear = spring({
    frame: frame - startDelay,
    fps,
    config: { damping: 22, stiffness: 40 },
  });

  // Phase 2: The model block cracks and splits into 4 GPU pieces
  const splitStart = startDelay + fps * 3;
  const splitProgress = spring({
    frame: frame - splitStart,
    fps,
    config: { damping: 18, stiffness: 18 },
  });

  // Phase 3: B300 single GPU scales up with glow
  const b300Start = splitStart + fps * 4;
  const b300Progress = spring({
    frame: frame - b300Start,
    fps,
    config: { damping: 18, stiffness: 25 },
  });

  const gpuOffsets = [
    { x: -90, y: -30, rot: -8 },
    { x: -30, y: 20, rot: 4 },
    { x: 30, y: -20, rot: -3 },
    { x: 90, y: 15, rot: 7 },
  ];

  // Model block opacity fades as it splits
  const modelOpacity = interpolate(splitProgress, [0, 0.5], [1, 0], { extrapolateRight: 'clamp' });
  // Shake before splitting
  const shakeAmount = interpolate(splitProgress, [0, 0.15, 0.3], [0, 6, 0], { extrapolateRight: 'clamp' });
  const shakeX = Math.sin(frame * 1.5) * shakeAmount;

  const b300Glow = interpolate(b300Progress, [0, 0.5, 1], [0, 25, 15], { extrapolateRight: 'clamp' });
  const b300Scale = interpolate(b300Progress, [0, 0.5, 1], [0.3, 1.1, 1], { extrapolateRight: 'clamp' });

  return (
    <div style={{ marginTop: 60, width: '100%' }}>
      <div style={{ display: 'flex', gap: 120, justifyContent: 'center', alignItems: 'center' }}>
        {/* Left side: model → split GPUs */}
        <div style={{ textAlign: 'center', position: 'relative', width: 420, height: 240 }}>
          {/* Single model block (fades out as split happens) */}
          <div
            style={{
              position: 'absolute',
              left: '50%',
              top: '40%',
              transform: `translate(-50%, -50%) translateX(${shakeX}px)`,
              opacity: modelAppear * modelOpacity,
              width: 340,
              height: 100,
              borderRadius: 16,
              border: `2px solid ${theme.colors.text}`,
              background: 'rgba(255,255,255,0.05)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 34,
              fontWeight: 700,
              color: theme.colors.text,
              letterSpacing: 3,
            }}
          >
            LARGE MODEL
          </div>

          {/* Split GPU fragments */}
          {gpuOffsets.map((offset, i) => {
            const gpuOpacity = interpolate(splitProgress, [0.2, 0.6], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const moveX = interpolate(splitProgress, [0.2, 1], [0, offset.x * 1.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const moveY = interpolate(splitProgress, [0.2, 1], [0, offset.y * 1.4], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
            const rotate = interpolate(splitProgress, [0.2, 1], [0, offset.rot], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  left: `calc(50% + ${moveX}px)`,
                  top: `calc(40% + ${moveY}px)`,
                  transform: `translate(-50%, -50%) rotate(${rotate}deg)`,
                  opacity: gpuOpacity,
                  width: 85,
                  height: 85,
                  borderRadius: 12,
                  border: `2px solid ${theme.colors.red}`,
                  background: 'rgba(248,81,73,0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 22,
                  color: theme.colors.red,
                  fontWeight: 700,
                  boxShadow: `0 0 ${interpolate(splitProgress, [0.5, 1], [0, 12], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' })}px rgba(248,81,73,0.3)`,
                }}
              >
                {`¼`}
              </div>
            );
          })}

          <p
            style={{
              fontSize: 28,
              color: theme.colors.red,
              position: 'absolute',
              bottom: 0,
              width: '100%',
              opacity: interpolate(splitProgress, [0.6, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              fontWeight: 600,
            }}
          >
            Split across 4+ GPUs
          </p>
        </div>

        {/* VS */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 800,
            color: theme.colors.textMuted,
            opacity: interpolate(b300Progress, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
          }}
        >
          vs
        </div>

        {/* Right side: B300 single GPU */}
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 200,
              height: 200,
              borderRadius: 20,
              border: `3px solid ${theme.colors.accent}`,
              background: 'rgba(118,185,0,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              transform: `scale(${b300Scale})`,
              opacity: interpolate(b300Progress, [0, 0.3], [0, 1], { extrapolateRight: 'clamp' }),
              boxShadow: `0 0 ${b300Glow}px rgba(118,185,0,0.5)`,
              margin: '0 auto',
            }}
          >
            <span style={{ fontSize: 42, fontWeight: 800, color: theme.colors.accent }}>B300</span>
            <span style={{ fontSize: 20, color: theme.colors.accent, marginTop: 6 }}>288 GB</span>
          </div>
          <p
            style={{
              fontSize: 28,
              color: theme.colors.accent,
              marginTop: 16,
              fontWeight: 600,
              opacity: interpolate(b300Progress, [0.5, 1], [0, 1], { extrapolateRight: 'clamp' }),
            }}
          >
            Fits on one GPU
          </p>
        </div>
      </div>
    </div>
  );
};

export const Scene2WhyB300: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      <Audio src={staticFile('scene2-whyb300.m4a')} />
      {/* GPU timeline animation */}
      <Sequence from={0} durationInFrames={fps * 8}>
        <CenteredSlide>
          <SceneTitle title="GPU Evolution" />

          <div style={{ display: 'flex', gap: 24, justifyContent: 'center', alignItems: 'center', marginTop: 48 }}>
            {[
              { name: 'V100', year: '2017' },
              { name: 'A100', year: '2020' },
              { name: 'H100', year: '2022' },
              { name: 'B200', year: '2024' },
              { name: 'B300', year: '2025' },
            ].map((gpu, i) => (
              <React.Fragment key={gpu.name}>
                {i > 0 && (
                  <FadeIn delay={10 + i * 45}>
                    <span style={{ fontSize: 40, color: theme.colors.textMuted }}>→</span>
                  </FadeIn>
                )}
                <FadeIn delay={10 + i * 45} direction="up">
                  <div
                    style={{
                      border: `2px solid ${i === 4 ? theme.colors.accent : theme.colors.border}`,
                      borderRadius: 12,
                      padding: '20px 32px',
                      textAlign: 'center',
                      background: i === 4 ? 'rgba(118,185,0,0.1)' : 'transparent',
                    }}
                  >
                    <div style={{ fontSize: 36, fontWeight: 700, color: i === 4 ? theme.colors.accent : theme.colors.text }}>{gpu.name}</div>
                    <div style={{ fontSize: 24, color: theme.colors.textMuted }}>{gpu.year}</div>
                  </div>
                </FadeIn>
              </React.Fragment>
            ))}
          </div>
        </CenteredSlide>
      </Sequence>

      {/* Model growth stats */}
      <Sequence from={fps * 8} durationInFrames={fps * 35}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Why B300 Exists" />

          <div style={{ display: 'flex', gap: 48, justifyContent: 'center', marginTop: 48 }}>
            <StatBox number="175B" label="GPT-3 (2020)" delay={fps * 2} />
            <StatBox number="1T+" label="GPT-4 (2023)" delay={fps * 6} />
            <StatBox number="???" label="Reasoning Models" delay={fps * 10} />
          </div>

          {/* Animated model split vs single GPU */}
          <ModelSplitAnimation startDelay={fps * 19} />
        </CenteredSlide>
      </Sequence>

      {/* AI Factory vision — part 1: vision statement */}
      <Sequence from={fps * 43} durationInFrames={fps * 17}>
        <CenteredSlide padding="0 120px">
          <SceneTitle title="The AI Factory Era" />

          <FadeIn delay={fps * 1} style={{ marginTop: 50 }}>
            <p style={{ fontSize: 44, textAlign: 'center', lineHeight: 1.7, maxWidth: 1000 }}>
              NVIDIA's vision: data centers as{' '}
              <span style={{ color: theme.colors.accent, fontWeight: 700 }}>AI factories</span>,{' '}
              infrastructure designed to produce AI outputs at massive scale.
            </p>
          </FadeIn>

          <FadeIn delay={fps * 11} style={{ marginTop: 50 }}>
            <div
              style={{
                padding: '24px 40px',
                borderRadius: 16,
                border: `2px solid ${theme.colors.accent}`,
                background: 'rgba(118,185,0,0.08)',
                textAlign: 'center',
              }}
            >
              <p style={{ fontSize: 38, color: theme.colors.text, lineHeight: 1.6 }}>
                The B300 is built to be the{' '}
                <span style={{ color: theme.colors.accent, fontWeight: 700 }}>engine</span> of that factory.
              </p>
            </div>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* AI Factory vision — part 2: deliberate trade-offs */}
      <Sequence from={fps * 60} durationInFrames={fps * 30}>
        <CenteredSlide padding="0 120px">
          <SceneTitle title="Deliberate Trade-offs" />

          <div style={{ display: 'flex', gap: 32, marginTop: 60, justifyContent: 'center' }}>
            {[
              { title: 'Memory Capacity', desc: 'Models keep getting bigger', color: theme.colors.accent, delay: fps * 5 },
              { title: 'NVFP4', desc: '4-bit precision is production-ready', color: theme.colors.accent2, delay: fps * 9 },
              { title: 'NVLink Bandwidth', desc: 'MoE architectures are the future', color: '#FFB400', delay: fps * 14 },
            ].map((item) => (
              <FadeIn key={item.title} delay={item.delay} direction="up">
                <div
                  style={{
                    border: `2px solid ${item.color}`,
                    borderRadius: 16,
                    padding: '32px 36px',
                    width: 280,
                    textAlign: 'center',
                    background: `${item.color}11`,
                  }}
                >
                  <div style={{ fontSize: 34, fontWeight: 700, color: item.color }}>{item.title}</div>
                  <div style={{ fontSize: 26, color: theme.colors.textMuted, marginTop: 12, lineHeight: 1.4 }}>{item.desc}</div>
                </div>
              </FadeIn>
            ))}
          </div>

        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
