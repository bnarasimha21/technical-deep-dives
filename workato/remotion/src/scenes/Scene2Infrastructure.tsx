import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig, staticFile, Img } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

const whyDOItems = [
  { label: 'Speed', desc: 'GPUs available when needed — no procurement queues', color: colors.green },
  { label: 'Support', desc: 'Hands-on technical support, not a ticket queue', color: colors.doBlue },
  { label: 'Simplicity', desc: 'Managed Kubernetes — focus on inference, not infra', color: colors.cyan },
];

const stackItems = [
  { label: 'DOKS Cluster', sublabel: 'DigitalOcean Kubernetes Service', color: colors.doBlue, delay: 500 },
  { label: 'H200 GPUs', sublabel: '141 GB HBM3e (high-bandwidth memory) per GPU', color: colors.amber, delay: 560 },
  { label: '8x Tensor Parallel', sublabel: 'One model split across 8 GPUs for parallel processing', color: colors.cyan, delay: 620 },
];

export const Scene2Infrastructure: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 40], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Phase 1: Why DigitalOcean (0–450)
  const whyDOOpacity = interpolate(frame, [0, 20, 380, 450], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  // Phase 2: Architecture (420–1500)
  const archOpacity = interpolate(frame, [420, 500], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const archSpring = spring({ frame: frame - 460, fps, config: { damping: 14, stiffness: 60 } });

  // Transition callout at the end
  const transitionOpacity = interpolate(frame, [1100, 1180], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <GradientBackground variant="solution">
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
            The Infrastructure
          </span>
        </div>
      </FadeIn>

      <FadeIn delay={8} duration={22}>
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
          Agentic Inference Cloud
        </h1>
      </FadeIn>

      {/* Content area */}
      <div style={{ flex: 1, position: 'relative', marginTop: 20, minHeight: 0 }}>

        {/* Phase 1: Why DigitalOcean */}
        <div style={{ opacity: whyDOOpacity, position: 'absolute', inset: 0, display: 'flex', gap: 48, alignItems: 'center' }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20 }}>
            <FadeIn delay={30} duration={22}>
              <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 32, color: colors.white, marginBottom: 8 }}>
                Why DigitalOcean?
              </div>
              <div style={{ fontFamily: fonts.body, fontSize: 21, color: colors.textSecondary, lineHeight: 1.55, marginBottom: 20 }}>
                Workato chose DigitalOcean for a simple reason:
              </div>
            </FadeIn>
            {whyDOItems.map((item, i) => {
              const itemSpring = spring({ frame: frame - (80 + i * 60), fps, config: { damping: 12, stiffness: 80 } });
              return (
                <div key={i} style={{
                  opacity: itemSpring, transform: `translateX(${(1 - itemSpring) * 40}px)`,
                  background: colors.bgCard, backdropFilter: 'blur(16px)',
                  border: `1px solid ${item.color}20`, borderLeft: `4px solid ${item.color}`,
                  borderRadius: '4px 20px 20px 4px', padding: '24px 28px',
                  display: 'flex', alignItems: 'center', gap: 20,
                }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: item.color, boxShadow: `0 0 10px ${item.color}` }} />
                  </div>
                  <div>
                    <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 22, color: colors.white }}>{item.label}</div>
                    <div style={{ fontFamily: fonts.body, fontSize: 18, color: colors.textSecondary, marginTop: 4 }}>{item.desc}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <FadeIn delay={260} duration={25}>
              <div style={{
                background: `linear-gradient(90deg, ${colors.doBlue}12 0%, transparent 80%)`,
                borderLeft: `3px solid ${colors.doBlue}`,
                borderRadius: '0 16px 16px 0', padding: '28px 32px',
              }}>
                <div style={{ fontFamily: fonts.body, fontSize: 22, color: colors.textSecondary, fontStyle: 'italic', lineHeight: 1.55 }}>
                  DigitalOcean's Agentic Inference Cloud gave Workato the GPU infrastructure and hands-on support to move fast — from concept to production-grade inference.
                </div>
              </div>
            </FadeIn>
          </div>
        </div>

        {/* Phase 2: Architecture */}
        {frame >= 420 && (
          <div style={{ opacity: archOpacity, position: 'absolute', inset: 0, display: 'flex', gap: 36, alignItems: 'stretch' }}>
            {/* Architecture diagram */}
            <div style={{
              flex: 3, opacity: archSpring, transform: `scale(${0.96 + archSpring * 0.04})`,
              background: '#FFFFFF', borderRadius: 20, padding: 16,
              boxShadow: `0 8px 60px rgba(0, 105, 255, 0.12)`,
              overflow: 'hidden', display: 'flex', alignItems: 'center',
            }}>
              <Img src={staticFile('Workato Architecture (1).png')} style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', borderRadius: 10 }} />
            </div>

            {/* Stack callout cards */}
            <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
              {stackItems.map((item, i) => {
                const itemSpring = spring({ frame: frame - item.delay, fps, config: { damping: 12, stiffness: 80 } });
                return (
                  <div key={i} style={{
                    opacity: itemSpring, transform: `translateX(${(1 - itemSpring) * 40}px)`,
                    background: colors.bgCard, backdropFilter: 'blur(16px)',
                    border: `1px solid ${item.color}20`, borderLeft: `4px solid ${item.color}`,
                    borderRadius: '4px 20px 20px 4px', padding: '28px 32px',
                    display: 'flex', alignItems: 'center', gap: 20,
                  }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: `${item.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <div style={{ width: 12, height: 12, borderRadius: '50%', background: item.color, boxShadow: `0 0 12px ${item.color}` }} />
                    </div>
                    <div>
                      <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 24, color: colors.white }}>{item.label}</div>
                      <div style={{ fontFamily: fonts.body, fontSize: 20, color: colors.textSecondary, marginTop: 4 }}>{item.sublabel}</div>
                    </div>
                  </div>
                );
              })}

              {/* Transition callout */}
              <div style={{
                opacity: transitionOpacity,
                background: `linear-gradient(90deg, ${colors.cyan}15 0%, transparent 80%)`,
                borderLeft: `3px solid ${colors.cyan}`, borderRadius: '0 16px 16px 0',
                padding: '24px 28px', marginTop: 12,
              }}>
                <div style={{ fontFamily: fonts.body, fontSize: 22, color: colors.textSecondary, lineHeight: 1.55 }}>
                  Hardware alone doesn't solve prefill redundancy.<br />
                  You need a <strong style={{ color: colors.cyan, fontWeight: 700 }}>smarter routing layer</strong>.
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </GradientBackground>
  );
};
