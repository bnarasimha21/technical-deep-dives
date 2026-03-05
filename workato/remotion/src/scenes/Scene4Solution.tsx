import React from 'react';
import { interpolate, useCurrentFrame, Easing, spring, useVideoConfig, staticFile, Img } from 'remotion';
import { GradientBackground } from '../components/GradientBackground';
import { FadeIn } from '../components/FadeIn';
import { colors, fonts } from '../theme';

const stackItems = [
  { label: 'DOKS Cluster', sublabel: 'DigitalOcean Kubernetes', color: colors.doBlue, delay: 130 },
  { label: 'NVIDIA Dynamo', sublabel: 'Global scheduler + KV-aware routing', color: colors.green, delay: 175 },
  { label: 'H200 GPUs', sublabel: '141 GB HBM3e per GPU', color: colors.amber, delay: 220 },
  { label: '8x Tensor Parallel', sublabel: 'Per worker node', color: colors.cyan, delay: 265 },
];

const kvCards = [
  {
    title: 'How it works',
    body: 'Requests sharing common input prefixes are routed to the same GPU. The warm KV cache skips the expensive prefill phase entirely.',
    color: colors.cyan,
    delay: 1250,
  },
  {
    title: 'NVIDIA Dynamo',
    body: 'Global orchestrator with full cluster visibility. Routes requests to the right GPU at the right time.',
    color: colors.green,
    delay: 1350,
  },
  {
    title: 'The Result',
    body: 'Same hardware. Dramatically better performance — no code changes, no new models, just smarter infrastructure.',
    color: colors.doBlue,
    delay: 1450,
  },
];

export const Scene4Solution: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const lineWidth = interpolate(frame, [0, 40], [0, 60], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });

  // Crossfade: Phase 1 (0–1200) → Phase 2 (1100–2400)
  const phase1Opacity = interpolate(frame, [0, 25, 1050, 1180], [0, 1, 1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const phase2Opacity = interpolate(frame, [1100, 1250], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
    easing: Easing.out(Easing.cubic),
  });
  const isPhase2 = frame >= 1100;

  const archSpring = spring({ frame: frame - 50, fps, config: { damping: 14, stiffness: 60 } });
  const kvSpring = spring({ frame: frame - 1180, fps, config: { damping: 14, stiffness: 60 } });

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
            The Solution
          </span>
        </div>
      </FadeIn>

      {/* Title + subtitle — crossfade between phases */}
      <div style={{ position: 'relative', marginBottom: 20 }}>
        <div style={{ opacity: 1 - (isPhase2 ? interpolate(frame, [1080, 1180], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }) : 0) }}>
          <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
            Agentic Inference Cloud
          </h1>
          <p style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textSecondary, margin: '10px 0 0' }}>
            A joint effort by DigitalOcean, Workato, and NVIDIA — purpose-built inference at scale
          </p>
        </div>
        {isPhase2 && (
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              opacity: interpolate(frame, [1080, 1200], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: Easing.out(Easing.cubic) }),
            }}
          >
            <h1 style={{ fontFamily: fonts.heading, fontWeight: 800, fontSize: 52, color: colors.white, margin: 0, lineHeight: 1.1, letterSpacing: -1 }}>
              KV-Aware Routing
            </h1>
            <p style={{ fontFamily: fonts.body, fontSize: 24, color: colors.textSecondary, margin: '10px 0 0' }}>
              The breakthrough: route shared prefixes to GPUs with warm caches
            </p>
          </div>
        )}
      </div>

      {/* Content area */}
      <div style={{ flex: 1, position: 'relative', minHeight: 0 }}>
        {/* Phase 1: Architecture diagram left + callout cards right */}
        <div
          style={{
            opacity: phase1Opacity,
            position: 'absolute',
            inset: 0,
            display: 'flex',
            gap: 36,
            alignItems: 'stretch',
          }}
        >
          {/* Architecture image */}
          <div
            style={{
              flex: 3,
              opacity: archSpring,
              transform: `scale(${0.96 + archSpring * 0.04})`,
              background: '#FFFFFF',
              borderRadius: 20,
              padding: 16,
              boxShadow: `0 8px 60px rgba(0, 105, 255, 0.12)`,
              overflow: 'hidden',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <Img
              src={staticFile('Workato Architecture (1).png')}
              style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block', borderRadius: 10 }}
            />
          </div>

          {/* Callout cards */}
          <div style={{ flex: 2, display: 'flex', flexDirection: 'column', gap: 16, justifyContent: 'center' }}>
            {stackItems.map((item, i) => {
              const itemSpring = spring({ frame: frame - item.delay, fps, config: { damping: 12, stiffness: 80 } });
              return (
                <div
                  key={i}
                  style={{
                    opacity: itemSpring,
                    transform: `translateX(${(1 - itemSpring) * 40}px)`,
                    background: colors.bgCard,
                    backdropFilter: 'blur(16px)',
                    border: `1px solid ${item.color}20`,
                    borderLeft: `4px solid ${item.color}`,
                    borderRadius: '4px 20px 20px 4px',
                    padding: '24px 28px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 20,
                  }}
                >
                  <div
                    style={{
                      width: 48,
                      height: 48,
                      borderRadius: 12,
                      background: `${item.color}15`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                    }}
                  >
                    <div
                      style={{
                        width: 12,
                        height: 12,
                        borderRadius: '50%',
                        background: item.color,
                        boxShadow: `0 0 12px ${item.color}`,
                      }}
                    />
                  </div>
                  <div>
                    <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 24, color: colors.white }}>
                      {item.label}
                    </div>
                    <div style={{ fontFamily: fonts.body, fontSize: 20, color: colors.textSecondary, marginTop: 4 }}>
                      {item.sublabel}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Phase 2: KV-Aware Routing — image left, cards right */}
        {isPhase2 && (
          <div
            style={{
              opacity: phase2Opacity,
              position: 'absolute',
              inset: 0,
              display: 'flex',
              gap: 36,
              alignItems: 'stretch',
            }}
          >
            {/* KV diagram */}
            <div
              style={{
                flex: 1,
                opacity: kvSpring,
                transform: `scale(${0.96 + kvSpring * 0.04})`,
                background: '#FFFFFF',
                borderRadius: 20,
                padding: 20,
                boxShadow: `0 8px 60px rgba(0, 184, 217, 0.12)`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Img
                src={staticFile('kv-aware-image3.png')}
                style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }}
              />
            </div>

            {/* Three explanation cards stacked */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
              {kvCards.map((card, i) => {
                const cardSpring = spring({ frame: frame - card.delay, fps, config: { damping: 12, stiffness: 80 } });
                return (
                  <div
                    key={i}
                    style={{
                      opacity: cardSpring,
                      transform: `translateX(${(1 - cardSpring) * 40}px)`,
                      background: colors.bgCard,
                      backdropFilter: 'blur(16px)',
                      borderRadius: 20,
                      padding: '28px 32px',
                      border: `1px solid ${card.color}20`,
                      borderLeft: `4px solid ${card.color}`,
                    }}
                  >
                    <div style={{ fontFamily: fonts.heading, fontWeight: 700, fontSize: 24, color: card.color, marginBottom: 10 }}>
                      {card.title}
                    </div>
                    <div style={{ fontFamily: fonts.body, fontSize: 20, color: colors.textSecondary, lineHeight: 1.55 }}>
                      {card.body}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </GradientBackground>
  );
};
