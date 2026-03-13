import React from 'react';
import { useVideoConfig } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { Callout } from '../components/Callout';
import { theme } from '../theme';

export const Scene3Benchmarks: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Time to First Token */}
      <CenteredSlide padding="0 120px">
        <SceneTitle title="Time to First Token" subtitle="How fast users see the first response" />

        <div style={{ maxWidth: 800, margin: '40px auto 0' }}>
          <FadeIn delay={15}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                marginBottom: 24,
                padding: '20px 28px',
                background: 'rgba(118, 185, 0, 0.06)',
                borderRadius: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, color: theme.colors.textMuted }}>70B Parameters</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
                  <span style={{ fontSize: 36, color: theme.colors.textMuted, textDecoration: 'line-through' }}>150ms</span>
                  <span style={{ fontSize: 28, color: theme.colors.textMuted }}>→</span>
                  <span style={{ fontSize: 36, fontWeight: 800, color: theme.colors.accent }}>45ms</span>
                </div>
              </div>
              <div style={{ fontSize: 40, fontWeight: 800, color: theme.colors.accent }}>3.3x</div>
            </div>
          </FadeIn>

          <FadeIn delay={fps * 1.5}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                marginBottom: 24,
                padding: '20px 28px',
                background: 'rgba(118, 185, 0, 0.06)',
                borderRadius: 12,
              }}
            >
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 22, color: theme.colors.textMuted }}>405B Parameters</div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
                  <span style={{ fontSize: 36, color: theme.colors.textMuted, textDecoration: 'line-through' }}>800ms</span>
                  <span style={{ fontSize: 28, color: theme.colors.textMuted }}>→</span>
                  <span style={{ fontSize: 36, fontWeight: 800, color: theme.colors.accent }}>180ms</span>
                </div>
              </div>
              <div style={{ fontSize: 40, fontWeight: 800, color: theme.colors.accent }}>4.4x</div>
            </div>
          </FadeIn>
        </div>

        <Callout delay={fps * 3.5} style={{ marginTop: 24, maxWidth: 800 }}>
          For reasoning models that "think" before responding, faster TTFT means
          <span style={{ color: theme.colors.accent, fontWeight: 700 }}> noticeably snappier user experience.</span>
        </Callout>

        <FadeIn delay={fps * 5} style={{ marginTop: 20 }}>
          <p style={{ fontSize: 28, color: theme.colors.accent, textAlign: 'center', fontWeight: 600 }}>
            Now let's talk cost →
          </p>
        </FadeIn>
      </CenteredSlide>
    </Background>
  );
};
