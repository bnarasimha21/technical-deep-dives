import React from 'react';
import {
  AbsoluteFill,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
  spring,
  interpolate,
  Img,
  staticFile,
  Audio,
} from 'remotion';
import { theme } from '../theme';
import { Background } from '../components/Background';
import { FadeIn } from '../components/FadeIn';
import { GpuChip } from '../components/GpuChip';

/* ─── Shared: Section Title ───────────────────────────────────────── */

const SectionTitle: React.FC<{ children: React.ReactNode; delay?: number; color?: string }> = ({
  children,
  delay = 0,
  color = theme.colors.accent2,
}) => (
  <FadeIn delay={delay} direction="down">
    <div
      style={{
        fontSize: 110,
        fontWeight: 800,
        color,
        textAlign: 'center',
        lineHeight: 1.1,
        letterSpacing: -1,
      }}
    >
      {children}
    </div>
  </FadeIn>
);

/* ─── Shared: Vertical StatBox (sized for 1080-wide portrait) ───── */

const VerticalStatBox: React.FC<{
  number: string;
  label: string;
  delay: number;
  color: string;
}> = ({ number, label, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({
    frame: frame - delay,
    fps,
    config: { damping: 18, stiffness: 60 },
  });
  const scale = interpolate(progress, [0, 1], [0.8, 1]);
  const opacity = interpolate(progress, [0, 1], [0, 1]);

  // Parse number
  const match = number.match(/^([^0-9]*?)([\d.]+)(.*)$/);
  const prefix = match?.[1] ?? '';
  const value = match ? parseFloat(match[2]) : 0;
  const decimals = match?.[2].includes('.') ? match[2].split('.')[1].length : 0;
  const suffix = match?.[3] ?? number;
  const displayed = value > 0 ? (value * progress).toFixed(decimals) : '';

  // Glow pulse after count finishes
  const glowActive = progress > 0.95;
  const glowSpread = glowActive
    ? interpolate(Math.sin((frame - delay) * 0.12), [-1, 1], [0, 14])
    : 0;

  return (
    <div
      style={{
        textAlign: 'center',
        padding: '36px 48px',
        border: `2px solid ${color}`,
        borderRadius: 24,
        width: 900,
        opacity,
        transform: `scale(${scale})`,
        background: 'rgba(255, 255, 255, 0.04)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 12,
      }}
    >
      <div
        style={{
          fontSize: 100,
          fontWeight: 800,
          color,
          lineHeight: 1.1,
          textShadow: glowActive ? `0 0 ${glowSpread}px ${color}99` : 'none',
          whiteSpace: 'nowrap',
        }}
      >
        {prefix}{displayed}{suffix}
      </div>
      <div
        style={{
          fontSize: 44,
          color: theme.colors.textMuted,
          textAlign: 'center',
          lineHeight: 1.2,
          textTransform: 'uppercase',
          letterSpacing: 4,
        }}
      >
        {label}
      </div>
    </div>
  );
};

/* ─── Section 1: Hook (frames 0–150) ─────────────────────────────── */

const HookSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const chipProgress = spring({ frame: frame - 5, fps, config: { damping: 14, stiffness: 90 } });
  const chipScale = interpolate(chipProgress, [0, 1], [0.6, 1]);
  const chipOpacity = interpolate(chipProgress, [0, 1], [0, 1]);

  const titleProgress = spring({ frame: frame - 20, fps, config: { damping: 16, stiffness: 100 } });
  const titleY = interpolate(titleProgress, [0, 1], [60, 0]);
  const titleOpacity = interpolate(titleProgress, [0, 1], [0, 1]);

  const subProgress = spring({ frame: frame - 35, fps, config: { damping: 18, stiffness: 80 } });
  const subOpacity = interpolate(subProgress, [0, 1], [0, 1]);
  const subY = interpolate(subProgress, [0, 1], [30, 0]);

  const glowActive = titleProgress > 0.95;
  const glowSpread = glowActive
    ? interpolate(Math.sin(frame * 0.08), [-1, 1], [0, 24])
    : 0;

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <Img
        src={staticFile('b300-chip.png')}
        style={{
          width: 420,
          height: 420,
          objectFit: 'contain',
          opacity: chipOpacity,
          transform: `scale(${chipScale})`,
        }}
      />

      <div
        style={{
          fontSize: 148,
          fontWeight: 900,
          color: theme.colors.accent,
          textAlign: 'center',
          lineHeight: 1,
          opacity: titleOpacity,
          transform: `translateY(${titleY}px)`,
          textShadow: glowActive
            ? `0 0 ${glowSpread}px ${theme.colors.accent}88`
            : 'none',
          letterSpacing: -2,
        }}
      >
        NVIDIA B300
      </div>

      <div
        style={{
          fontSize: 64,
          fontWeight: 500,
          color: theme.colors.accent2,
          opacity: subOpacity,
          transform: `translateY(${subY}px)`,
          letterSpacing: 8,
          textTransform: 'uppercase',
        }}
      >
        Blackwell Ultra
      </div>
    </AbsoluteFill>
  );
};

/* ─── Section 2: Key Stats Flash (frames 150–420) ────────────────── */

const KeyStatsSection: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 56,
        padding: '80px 80px',
      }}
    >
      <SectionTitle>By the Numbers</SectionTitle>

      <div style={{ height: 12 }} />

      <VerticalStatBox
        number="15 PFLOPS"
        label="Dense NVFP4 AI Compute"
        delay={fps * 1}
        color={theme.colors.accent}
      />
      <VerticalStatBox
        number="288 GB"
        label="HBM3e Memory"
        delay={fps * 2.5}
        color={theme.colors.accent}
      />
      <VerticalStatBox
        number="208B"
        label="Transistors"
        delay={fps * 4}
        color={theme.colors.accent}
      />
    </AbsoluteFill>
  );
};

/* ─── Section 3: The Big Comparison (frames 420–660) ──────────────── */

const ComparisonRow: React.FC<{
  label: string;
  oldVal: string;
  newVal: string;
  multiplier: string;
  delay: number;
  color: string;
}> = ({ label, oldVal, newVal, multiplier, delay, color }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const progress = spring({ frame: frame - delay, fps, config: { damping: 16, stiffness: 70 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [40, 0]);

  const multProgress = spring({ frame: frame - delay - 20, fps, config: { damping: 14, stiffness: 100 } });
  const multScale = interpolate(multProgress, [0, 0.7, 1], [0, 1.15, 1]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        background: 'rgba(255,255,255,0.04)',
        backdropFilter: 'blur(10px)',
        borderRadius: 24,
        padding: '56px 64px',
        border: `2px solid ${theme.colors.border}`,
        width: 900,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 36,
      }}
    >
      <div
        style={{
          fontSize: 44,
          color: theme.colors.accent2,
          fontWeight: 600,
          textTransform: 'uppercase',
          letterSpacing: 4,
          textAlign: 'center',
        }}
      >
        {label}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32, whiteSpace: 'nowrap' }}>
        <span style={{ fontSize: 60, fontWeight: 400, color: theme.colors.textMuted }}>{oldVal}</span>
        <span style={{ fontSize: 52, color: theme.colors.accent2 }}>→</span>
        <span style={{ fontSize: 72, fontWeight: 800, color }}>{newVal}</span>
      </div>

      <div
        style={{
          fontSize: 72,
          fontWeight: 800,
          color,
          textAlign: 'center',
          transform: `scale(${multScale})`,
        }}
      >
        {multiplier}
      </div>
    </div>
  );
};

const ComparisonSection: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 56,
        padding: '80px 80px',
      }}
    >
      <SectionTitle>B300 vs H100</SectionTitle>

      <div style={{ height: 12 }} />

      <ComparisonRow
        label="AI Compute"
        oldVal="2 PFLOPS"
        newVal="15 PFLOPS"
        multiplier="7.5×"
        delay={fps * 1.5}
        color={theme.colors.accent}
      />
      <ComparisonRow
        label="Memory"
        oldVal="80 GB"
        newVal="288 GB"
        multiplier="3.6×"
        delay={fps * 3}
        color={theme.colors.accent}
      />
    </AbsoluteFill>
  );
};

/* ─── Section 4: Visual Payoff (frames 660–870) ───────────────────── */

const VisualPayoffSection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const arrowProgress = spring({ frame: frame - fps * 3, fps, config: { damping: 16, stiffness: 80 } });
  const arrowOpacity = interpolate(arrowProgress, [0, 1], [0, 1]);
  const arrowScale = interpolate(arrowProgress, [0, 1], [0.5, 1]);

  const captionProgress = spring({ frame: frame - fps * 4.5, fps, config: { damping: 20, stiffness: 70 } });
  const captionOpacity = interpolate(captionProgress, [0, 1], [0, 1]);
  const captionY = interpolate(captionProgress, [0, 1], [20, 0]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 28,
        padding: '160px 80px',
      }}
    >
      <SectionTitle>What This Means</SectionTitle>

      <FadeIn delay={fps * 0.5} direction="none">
        <div
          style={{
            fontSize: 52,
            color: theme.colors.accent2,
            textAlign: 'center',
            marginTop: 4,
            marginBottom: 8,
          }}
        >
          DeepSeek-R1 · 671B parameters
        </div>
      </FadeIn>

      {/* 9x H100 grid */}
      <FadeIn delay={fps * 1} direction="up">
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 12,
              justifyItems: 'center',
            }}
          >
            {Array.from({ length: 9 }).map((_, i) => (
              <GpuChip key={`h100-${i}`} name="H100" delay={fps * 1.2 + i * 3} size={100} />
            ))}
          </div>
          <div style={{ fontSize: 48, color: theme.colors.textMuted, marginTop: 14, fontWeight: 600 }}>
            9× H100 GPUs required
          </div>
        </div>
      </FadeIn>

      {/* Arrow */}
      <div
        style={{
          fontSize: 72,
          color: theme.colors.accent2,
          opacity: arrowOpacity,
          transform: `scale(${arrowScale})`,
          fontWeight: 700,
          lineHeight: 1,
        }}
      >
        ↓
      </div>

      {/* 2x B300 */}
      <FadeIn delay={fps * 3.5} direction="up">
        <div style={{ textAlign: 'center' }}>
          <div style={{ display: 'flex', gap: 24, justifyContent: 'center' }}>
            <GpuChip name="B300" delay={fps * 3.5} active size={130} />
            <GpuChip name="B300" delay={fps * 3.8} active size={130} />
          </div>
          <div
            style={{
              fontSize: 46,
              color: theme.colors.accent,
              marginTop: 16,
              fontWeight: 800,
            }}
          >
            Just 2× B300s
          </div>
        </div>
      </FadeIn>

      {/* Caption */}
      <div
        style={{
          fontSize: 52,
          color: theme.colors.accent,
          textAlign: 'center',
          opacity: captionOpacity,
          transform: `translateY(${captionY}px)`,
          fontStyle: 'italic',
          marginTop: 40,
        }}
      >
        Same model, 78% fewer GPUs
      </div>
    </AbsoluteFill>
  );
};

/* ─── Section 5: CTA End Card (frames 870–1050) ──────────────────── */

const CTASection: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const pulseGlow = interpolate(Math.sin(frame * 0.1), [-1, 1], [4, 22]);
  const pulseAlpha = interpolate(Math.sin(frame * 0.1), [-1, 1], [0.3, 0.85]);

  return (
    <AbsoluteFill
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
        padding: '200px 80px',
      }}
    >
      <FadeIn delay={0} direction="down">
        <div
          style={{
            fontSize: 104,
            fontWeight: 900,
            color: theme.colors.accent2,
            textAlign: 'center',
            lineHeight: 1.1,
            letterSpacing: -1,
            marginBottom: 24,
          }}
        >
          Full Deep Dive
        </div>
      </FadeIn>

      <FadeIn delay={15} direction="up">
        <div
          style={{
            fontSize: 54,
            color: theme.colors.textMuted,
            textAlign: 'center',
            letterSpacing: 3,
          }}
        >
          Architecture · Performance · Real Numbers
        </div>
      </FadeIn>

      <FadeIn delay={fps * 1.5} direction="up">
        <div
          style={{
            marginTop: 40,
            fontSize: 60,
            fontWeight: 800,
            color: theme.colors.accent2,
            textAlign: 'center',
            textShadow: `0 0 ${pulseGlow}px rgba(0, 128, 255, ${pulseAlpha})`,
          }}
        >
          ▶ Watch on YouTube
        </div>
      </FadeIn>

      <FadeIn delay={fps * 2.5} direction="none">
        <div
          style={{
            marginTop: 50,
            fontSize: 48,
            color: theme.colors.accent2,
            textAlign: 'center',
            opacity: 0.85,
          }}
        >
          @DigitalOcean
        </div>
      </FadeIn>
    </AbsoluteFill>
  );
};

/* ─── Main PromoVideo Component ───────────────────────────────────── */

export const PromoVideo: React.FC = () => {
  return (
    <Background>
      <Audio
        src={staticFile('paulyudin-technology-tech-technology-484304.mp3')}
        volume={0.38}
        startFrom={0}
        playbackRate={1.0}
        loop
      />

      <Sequence from={0} durationInFrames={115}>
        <HookSection />
      </Sequence>

      <Sequence from={115} durationInFrames={270}>
        <KeyStatsSection />
      </Sequence>

      <Sequence from={385} durationInFrames={195}>
        <ComparisonSection />
      </Sequence>

      <Sequence from={580} durationInFrames={190}>
        <VisualPayoffSection />
      </Sequence>

      <Sequence from={770} durationInFrames={190}>
        <CTASection />
      </Sequence>
    </Background>
  );
};
