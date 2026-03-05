import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { AnimatedCounter } from '../components/AnimatedCounter';
import { colors, fonts } from '../theme';

const capabilities = [
  { icon: '🔗', label: 'Connect 1,000+ Apps', desc: 'Enterprise-grade integrations across every major platform', color: colors.workatoMagenta },
  { icon: '⚡', label: 'Automate Workflows', desc: 'End-to-end orchestration — from trigger to action', color: colors.amber },
  { icon: '🏢', label: 'Enterprise Scale', desc: 'Processing 1 trillion workloads every single year', color: colors.doBlue },
  { icon: '🤖', label: 'AI-Powered Agents', desc: 'Agentic automation that reasons, plans, and acts', color: colors.cyan },
];

export const Scene2WhoIsWorkato: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 40], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  const titleSpring = spring({ frame: frame - 8, fps, config: { damping: 14, stiffness: 100 } });

  return (
    <GradientBackground>
      {/* Section label */}
      <FadeIn delay={0} duration={18}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 16 }}>
          <div
            style={{
              width: lineWidth,
              height: 3,
              background: colors.workatoPurple,
              borderRadius: 2,
              boxShadow: `0 0 12px ${colors.workatoPurple}40`,
            }}
          />
          <span
            style={{
              fontFamily: fonts.mono,
              fontSize: 16,
              fontWeight: 600,
              color: colors.workatoMagenta,
              letterSpacing: 4,
              textTransform: 'uppercase',
            }}
          >
            The Company
          </span>
        </div>
      </FadeIn>

      {/* Two-column layout */}
      <div style={{ display: 'flex', gap: 64, flex: 1, alignItems: 'stretch' }}>
        {/* Left column — title + stat + callout */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: 32 }}>
          <div
            style={{
              opacity: interpolate(frame, [8, 25], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }),
              transform: `translateY(${(1 - titleSpring) * 20}px)`,
            }}
          >
            <h1
              style={{
                fontFamily: fonts.heading,
                fontWeight: 800,
                fontSize: 80,
                color: colors.white,
                margin: 0,
                lineHeight: 1.05,
                letterSpacing: -2,
              }}
            >
              Workato
            </h1>
          </div>

          <FadeIn delay={25} duration={22}>
            <p
              style={{
                fontFamily: fonts.body,
                fontSize: 26,
                fontWeight: 400,
                color: colors.textSecondary,
                lineHeight: 1.55,
                margin: 0,
              }}
            >
              The leading enterprise automation platform, powering intelligent
              workflows for the world's largest companies.
            </p>
          </FadeIn>

          {/* Big stat */}
          <FadeIn delay={50} duration={25}>
            <div
              style={{
                background: colors.bgCard,
                backdropFilter: 'blur(16px)',
                border: `1px solid ${colors.borderSubtle}`,
                borderRadius: 24,
                padding: '32px 36px',
                display: 'flex',
                alignItems: 'baseline',
                gap: 16,
              }}
            >
              <div
                style={{
                  fontFamily: fonts.heading,
                  fontWeight: 800,
                  fontSize: 56,
                  color: colors.workatoMagenta,
                  lineHeight: 1,
                }}
              >
                <AnimatedCounter to={1} startFrame={55} duration={20} suffix="" />T+
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 24, color: colors.white }}>
                  Workloads per Year
                </div>
                <div style={{ fontFamily: fonts.body, fontSize: 20, color: colors.textSecondary }}>
                  Enterprise-scale automation at production volume
                </div>
              </div>
            </div>
          </FadeIn>

          {/* AI Research Lab callout */}
          <FadeIn delay={100} duration={28}>
            <div
              style={{
                background: `linear-gradient(90deg, ${colors.workatoPurple}18 0%, transparent 80%)`,
                borderLeft: `3px solid ${colors.workatoPurple}`,
                borderRadius: '0 16px 16px 0',
                padding: '24px 32px',
              }}
            >
              <span
                style={{
                  fontFamily: fonts.body,
                  fontSize: 24,
                  color: colors.textPrimary,
                  fontWeight: 400,
                  lineHeight: 1.55,
                }}
              >
                Their <strong style={{ color: colors.workatoLight, fontWeight: 700 }}>AI Research Lab</strong> was
                pushing into agentic AI — systems that reason, plan, and act autonomously
                with <strong style={{ color: colors.white, fontWeight: 600 }}>100K-token context windows</strong>.
              </span>
            </div>
          </FadeIn>
        </div>

        {/* Right column — capability rows */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
          {capabilities.map((cap, i) => {
            const delay = 55 + i * 18;
            const itemSpring = spring({ frame: frame - delay, fps, config: { damping: 12, stiffness: 80 } });
            const itemOpacity = interpolate(frame, [delay, delay + 15], [0, 1], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            });

            return (
              <div
                key={i}
                style={{
                  opacity: itemOpacity,
                  transform: `translateX(${(1 - itemSpring) * 50}px)`,
                  background: colors.bgCard,
                  backdropFilter: 'blur(16px)',
                  border: `1px solid ${cap.color}20`,
                  borderLeft: `4px solid ${cap.color}`,
                  borderRadius: '4px 20px 20px 4px',
                  padding: '28px 32px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 24,
                }}
              >
                <div
                  style={{
                    width: 64,
                    height: 64,
                    borderRadius: 16,
                    background: `${cap.color}12`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                  }}
                >
                  <span style={{ fontSize: 32 }}>{cap.icon}</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <span
                    style={{
                      fontFamily: fonts.heading,
                      fontSize: 24,
                      fontWeight: 700,
                      color: colors.white,
                    }}
                  >
                    {cap.label}
                  </span>
                  <span
                    style={{
                      fontFamily: fonts.body,
                      fontSize: 20,
                      color: colors.textSecondary,
                      lineHeight: 1.4,
                    }}
                  >
                    {cap.desc}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </GradientBackground>
  );
};
