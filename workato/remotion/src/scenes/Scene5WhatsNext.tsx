import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

const roadmapItems = [
  {
    title: 'NVIDIA B300 + NVFP4',
    body: 'Next-gen Blackwell Ultra GPUs with NVFP4 quantization — denser inference, higher throughput per watt.',
    color: colors.green,
    delay: 60,
  },
  {
    title: 'Megatron Bridge',
    body: 'Multi-node training across interconnected GPU clusters. Moving from inference optimization to full training pipelines.',
    color: colors.doBlue,
    delay: 120,
  },
  {
    title: 'Self-Improving Agents',
    body: 'Workato\'s end goal: agents that get better with every interaction. Infrastructure that scales with them.',
    color: colors.workatoMagenta,
    delay: 180,
  },
];

export const Scene5WhatsNext: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 40], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  return (
    <GradientBackground variant="future">
      {/* Section label */}
      <FadeIn delay={0} duration={18}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div
            style={{
              width: lineWidth,
              height: 3,
              background: colors.doBlue,
              borderRadius: 2,
              boxShadow: `0 0 12px ${colors.doBlue}40`,
            }}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 16,
              fontWeight: 600,
              color: colors.doBlue,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            What's Next
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={8} duration={25}>
        <h1
          style={{
            fontFamily: fonts.heading,
            fontWeight: 800,
            fontSize: 52,
            color: colors.white,
            margin: 0,
            lineHeight: 1.1,
            letterSpacing: -1,
          }}
        >
          The Roadmap Goes Deeper
        </h1>
      </FadeIn>

      {/* Three roadmap cards */}
      <div
        style={{
          display: 'flex',
          gap: 32,
          marginTop: 40,
          flex: 1,
          alignItems: 'stretch',
        }}
      >
        {roadmapItems.map((item, i) => {
          const cardSpring = spring({ frame: frame - item.delay, fps, config: { damping: 12, stiffness: 80 } });
          const cardOpacity = interpolate(frame, [item.delay, item.delay + 18], [0, 1], {
            extrapolateLeft: 'clamp',
            extrapolateRight: 'clamp',
          });

          // Subtle float after entrance
          const float = cardOpacity >= 1
            ? Math.sin((frame - item.delay - 18) * 0.02 + i * 1.5) * 4
            : 0;

          // Glow pulse
          const glowPulse = cardOpacity >= 1
            ? 0.15 + Math.sin((frame - item.delay) * 0.03 + i) * 0.1
            : 0;

          // Step number spring
          const numSpring = spring({ frame: frame - item.delay - 10, fps, config: { damping: 14, stiffness: 100 } });

          return (
            <div
              key={i}
              style={{
                opacity: cardOpacity,
                transform: `translateY(${(1 - cardSpring) * 50 + float}px)`,
                background: colors.bgCard,
                backdropFilter: 'blur(16px)',
                border: `1px solid ${item.color}20`,
                borderRadius: 24,
                padding: '48px 36px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                justifyContent: 'center',
                gap: 24,
                flex: 1,
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Top accent */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 3,
                  background: `linear-gradient(90deg, transparent, ${item.color}, transparent)`,
                  opacity: 0.6 + glowPulse,
                  boxShadow: `0 0 20px ${item.color}40`,
                }}
              />

              {/* Step number */}
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: 16,
                  background: `${item.color}15`,
                  border: `1px solid ${item.color}30`,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transform: `scale(${0.8 + numSpring * 0.2})`,
                }}
              >
                <span
                  style={{
                    fontFamily: fonts.mono,
                    fontSize: 24,
                    fontWeight: 700,
                    color: item.color,
                  }}
                >
                  0{i + 1}
                </span>
              </div>

              <div
                style={{
                  fontFamily: fonts.heading,
                  fontWeight: 700,
                  fontSize: 28,
                  color: colors.white,
                }}
              >
                {item.title}
              </div>
              <div
                style={{
                  fontFamily: fonts.body,
                  fontSize: 21,
                  color: colors.textSecondary,
                  lineHeight: 1.6,
                }}
              >
                {item.body}
              </div>
            </div>
          );
        })}
      </div>

      {/* Quote from Kevin Huang */}
      <FadeIn delay={300} duration={28}>
        <div
          style={{
            background: `linear-gradient(90deg, ${colors.workatoPurple}15 0%, transparent 60%)`,
            borderLeft: `3px solid ${colors.workatoPurple}`,
            borderRadius: '0 16px 16px 0',
            padding: '20px 28px',
            marginTop: 24,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <span style={{ fontFamily: fonts.body, fontSize: 20, color: colors.textSecondary, fontStyle: 'italic' }}>
              "Exploring B300 nodes for NVFP4 — the next step in dense inference."
            </span>
            <div style={{ fontFamily: fonts.mono, fontSize: 14, color: colors.workatoLight, marginTop: 8 }}>
              — Kevin Huang, Workato AI Lab
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
            {[
              { name: 'DigitalOcean', color: colors.doBlue },
              { name: 'Workato', color: colors.workatoPurple },
              { name: 'NVIDIA', color: colors.green },
            ].map((brand, i) => (
              <React.Fragment key={i}>
                {i > 0 && (
                  <span style={{ fontFamily: fonts.body, fontSize: 18, color: colors.textMuted }}>+</span>
                )}
                <span style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 22, color: brand.color }}>
                  {brand.name}
                </span>
              </React.Fragment>
            ))}
          </div>
        </div>
      </FadeIn>
    </GradientBackground>
  );
};
