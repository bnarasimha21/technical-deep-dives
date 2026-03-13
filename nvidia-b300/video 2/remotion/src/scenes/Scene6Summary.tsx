import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { TableRow } from '../components/TableRow';
import { theme } from '../theme';

const TakeawayCard: React.FC<{ number: string; title: string; detail: string; delay: number }> = ({
  number,
  title,
  detail,
  delay,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [20, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        background: 'rgba(118, 185, 0, 0.08)',
        borderLeft: `4px solid ${theme.colors.accent}`,
        padding: '14px 24px',
        borderRadius: '0 10px 10px 0',
        maxWidth: 900,
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span style={{ color: theme.colors.accent, fontWeight: 800, fontSize: 26 }}>{number}.</span>
        <span style={{ fontSize: 24, fontWeight: 700, color: theme.colors.text }}>{title}</span>
      </div>
      <div style={{ fontSize: 20, color: theme.colors.textMuted, marginLeft: 32 }}>{detail}</div>
    </div>
  );
};

export const Scene6Summary: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Five takeaways — data-backed */}
      <Sequence from={0} durationInFrames={fps * 30}>
        <CenteredSlide>
          <SceneTitle title="Five Things to Remember" />

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginTop: 32,
              alignItems: 'center',
            }}
          >
            <TakeawayCard
              number="1"
              title="15 PFLOPS FP4 — 7.5x faster than H100"
              detail="The single fastest AI GPU available. MLPerf verified."
              delay={10}
            />
            <TakeawayCard
              number="2"
              title="288 GB HBM3e — fit 405B on one GPU"
              detail="NVFP4 makes 405B params fit in 202 GB. No multi-GPU splits needed."
              delay={25}
            />
            <TakeawayCard
              number="3"
              title="2x attention acceleration for reasoning models"
              detail="Doubles softmax throughput. 3.3-4.4x faster time-to-first-token."
              delay={40}
            />
            <TakeawayCard
              number="4"
              title="Up to 35x lower cost per million tokens"
              detail="Real providers already seeing 4x cost reduction with NVFP4."
              delay={55}
            />
            <TakeawayCard
              number="5"
              title="Zero code changes required"
              detail="Full CUDA 12 compatibility. Existing frameworks, libraries, and models just work."
              delay={70}
            />
          </div>
        </CenteredSlide>
      </Sequence>

      {/* Roadmap */}
      <Sequence from={fps * 30} durationInFrames={fps * 15}>
        <CenteredSlide>
          <SceneTitle title="What's Next" />

          <table style={{ borderCollapse: 'collapse', marginTop: 36, minWidth: 600 }}>
            <tbody>
              <TableRow cells={['Year', 'Architecture', 'Status']} isHeader delay={5} />
              <TableRow cells={['2024', 'Blackwell (B200)', 'Shipping']} delay={15} />
              <TableRow cells={['2025', 'Blackwell Ultra (B300)', 'Current']} delay={25} highlight />
              <TableRow cells={['2026', 'Vera Rubin', 'Announced']} delay={40} />
              <TableRow cells={['2027', 'Rubin Ultra', 'Announced']} delay={55} />
            </tbody>
          </table>

          <FadeIn delay={fps * 3}>
            <p style={{ fontSize: 24, color: theme.colors.textMuted, textAlign: 'center', marginTop: 24 }}>
              Annual cadence: today's top of the line is next year's baseline.
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>

      {/* End card */}
      <Sequence from={fps * 45} durationInFrames={fps * 15}>
        <CenteredSlide>
          <FadeIn delay={0}>
            <h1
              style={{
                fontSize: 72,
                fontWeight: 800,
                color: theme.colors.accent,
                margin: 0,
                textAlign: 'center',
                fontFamily: theme.fonts.heading,
              }}
            >
              Thanks for Watching
            </h1>
          </FadeIn>
          <FadeIn delay={15}>
            <p style={{ fontSize: 28, color: theme.colors.text, marginTop: 16, textAlign: 'center' }}>
              Should You Switch to B300?
            </p>
          </FadeIn>
          <FadeIn delay={30}>
            <p style={{ fontSize: 22, color: theme.colors.textMuted, marginTop: 8, textAlign: 'center' }}>
              Part 2 of the NVIDIA B300 Blackwell Ultra Series
            </p>
          </FadeIn>
          <FadeIn delay={fps * 1.5} style={{ marginTop: 24 }}>
            <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
              <span style={{ fontSize: 20, color: theme.colors.accent }}>Subscribe</span>
              <span style={{ fontSize: 20, color: theme.colors.textMuted }}>|</span>
              <span style={{ fontSize: 20, color: theme.colors.accent }}>Watch Part 1</span>
              <span style={{ fontSize: 20, color: theme.colors.textMuted }}>|</span>
              <span style={{ fontSize: 20, color: theme.colors.accent }}>More Deep Dives</span>
            </div>
          </FadeIn>
          <FadeIn delay={fps * 2.5}>
            <p style={{ fontSize: 18, color: theme.colors.textMuted, marginTop: 24, textAlign: 'center' }}>
              Sources: NVIDIA Developer Blog, MLPerf v5.1, NVIDIA Newsroom
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
