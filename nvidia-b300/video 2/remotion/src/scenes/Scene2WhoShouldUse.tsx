import React from 'react';
import { Sequence, useCurrentFrame, useVideoConfig, spring, interpolate } from 'remotion';
import { Background } from '../components/Background';
import { CenteredSlide } from '../components/CenteredSlide';
import { SceneTitle } from '../components/SceneTitle';
import { FadeIn } from '../components/FadeIn';
import { theme } from '../theme';

/* ─── Full-width GPU banner bar ─── */

const GpuBanner: React.FC<{ type: 'B300' | '8×B300'; subtitle?: string }> = ({ type, subtitle }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const isRack = type === '8×B300';
  const color = isRack ? theme.colors.accent2 : theme.colors.accent;

  const progress = spring({ frame, fps, config: { damping: 20, stiffness: 100 } });
  const scaleX = interpolate(progress, [0, 1], [0, 1]);
  const textOpacity = interpolate(progress, [0, 1], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        transform: `scaleX(${scaleX})`,
        transformOrigin: 'left',
        background: `linear-gradient(90deg, ${color}, ${color}CC)`,
        padding: '14px 0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 16,
        zIndex: 10,
      }}
    >
      <span
        style={{
          opacity: textOpacity,
          fontSize: 22,
          fontWeight: 800,
          color: theme.colors.white,
          letterSpacing: 2,
          textTransform: 'uppercase',
        }}
      >
        {type}
      </span>
      {subtitle && (
        <span
          style={{
            opacity: textOpacity,
            fontSize: 18,
            color: 'rgba(255,255,255,0.8)',
            fontWeight: 500,
          }}
        >
          — {subtitle}
        </span>
      )}
    </div>
  );
};

/* ─── Reusable animated components ─── */

const AudienceCard: React.FC<{
  icon: string;
  role: string;
  description: string;
  delay: number;
  color?: string;
}> = ({ icon, role, description, delay, color = theme.colors.accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateY = interpolate(progress, [0, 1], [25, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        background: `${color}10`,
        border: `1px solid ${color}30`,
        borderRadius: 12,
        padding: '20px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <span style={{ fontSize: 28 }}>{icon}</span>
        <span style={{ fontSize: 24, fontWeight: 700, color }}>{role}</span>
      </div>
      <span style={{ fontSize: 20, color: theme.colors.textMuted, lineHeight: 1.4 }}>{description}</span>
    </div>
  );
};

const UseCaseExample: React.FC<{
  icon: string;
  title: string;
  detail: string;
  delay: number;
  color?: string;
}> = ({ icon, title, detail, delay, color = theme.colors.accent }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div
      style={{
        opacity,
        transform: `translateX(${translateX}px)`,
        background: `${color}08`,
        borderLeft: `3px solid ${color}`,
        padding: '14px 20px',
        borderRadius: '0 10px 10px 0',
        width: '100%',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
        <span style={{ fontSize: 20 }}>{icon}</span>
        <span style={{ fontSize: 22, fontWeight: 700, color }}>{title}</span>
      </div>
      <span style={{ fontSize: 18, color: theme.colors.textMuted, lineHeight: 1.4 }}>{detail}</span>
    </div>
  );
};

const CrossItem: React.FC<{ text: string; detail: string; delay: number }> = ({ text, detail, delay }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const progress = spring({ frame: frame - delay, fps, config: { damping: 18, stiffness: 80 } });
  const opacity = interpolate(progress, [0, 1], [0, 1]);
  const translateX = interpolate(progress, [0, 1], [30, 0]);

  return (
    <div style={{ opacity, transform: `translateX(${translateX}px)`, marginBottom: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 28, color: theme.colors.red }}>✗</span>
        <span style={{ fontSize: 24, color: theme.colors.text, fontWeight: 600 }}>{text}</span>
      </div>
      <div style={{ fontSize: 20, color: theme.colors.textMuted, marginLeft: 40 }}>{detail}</div>
    </div>
  );
};

/* ─── Scene 2 ─── */

export const Scene2WhoShouldUse: React.FC = () => {
  const { fps } = useVideoConfig();

  return (
    <Background>
      {/* Sub-scene 2a: Who Needs B300 Hardware (0–25s) */}
      <Sequence from={0} durationInFrames={fps * 25}>
        <CenteredSlide padding="0 100px">
          <SceneTitle title="Who Needs B300?" subtitle="Four audiences building serious AI infrastructure" />

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20,
              marginTop: 36,
              width: '100%',
              maxWidth: 1300,
            }}
          >
            <AudienceCard
              icon="🚀"
              role="AI Startups"
              description="Building their own foundation models, owning the weights instead of depending on APIs"
              delay={15}
            />
            <AudienceCard
              icon="🏢"
              role="Enterprise AI Teams"
              description="Running internal LLMs, customer-facing AI products, and agentic workflows at scale"
              delay={30}
              color={theme.colors.accent2}
            />
            <AudienceCard
              icon="🔬"
              role="ML Engineers & Researchers"
              description="Full parameter fine-tuning, distributed training, and experimentation at scale"
              delay={45}
            />
            <AudienceCard
              icon="⚙️"
              role="AI Infrastructure Builders"
              description="Powering agent fleets, inference pipelines, and multi-tenant AI platforms"
              delay={60}
              color={theme.colors.accent2}
            />
          </div>
        </CenteredSlide>
      </Sequence>

      {/* Sub-scene 2b: What a Single B300 Can Do (25s–55s = 30s) */}
      <Sequence from={fps * 25} durationInFrames={fps * 30}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <GpuBanner type="B300" subtitle="Single GPU · 288 GB · 15 PFLOPS" />
          <CenteredSlide padding="60px 100px 0">
            <SceneTitle title="What a Single B300 Can Do" subtitle="288 GB of HBM3e on one GPU — more than enough for many workloads" />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                marginTop: 28,
                width: '100%',
                maxWidth: 1400,
              }}
            >
              <UseCaseExample
                icon="🧠"
                title="Run 405B Inference on One GPU"
                detail="Llama 405B in NVFP4 uses 202 GB — fits in 288 GB with room for KV cache. No tensor parallelism needed."
                delay={15}
              />
              <UseCaseExample
                icon="⚡"
                title="Serve a Product or Team"
                detail="Run inference for a product with moderate traffic. Low latency with 15 PFLOPS of FP4 compute per GPU."
                delay={fps * 1}
              />
              <UseCaseExample
                icon="🔧"
                title="Fine-Tune Smaller Models"
                detail="Full parameter fine-tuning up to ~13B. LoRA fine-tuning for 70B models. Rapid iteration on domain-specific models."
                delay={fps * 2}
              />
              <UseCaseExample
                icon="💡"
                title="Reasoning with Attention Acceleration"
                detail="2x softmax throughput for chain-of-thought models. Faster time-to-first-token for thinking-heavy workloads."
                delay={fps * 3}
              />
            </div>

            <FadeIn delay={fps * 4.5} style={{ marginTop: 16 }}>
              <p style={{ fontSize: 24, color: theme.colors.textMuted, textAlign: 'center' }}>
                Need more? <span style={{ color: theme.colors.accent2, fontWeight: 700 }}>Scale to 8×B300 →</span>
              </p>
            </FadeIn>
          </CenteredSlide>
        </div>
      </Sequence>

      {/* Sub-scene 2c: Train a Giant Model [8×B300] (55s–100s = 45s) */}
      <Sequence from={fps * 55} durationInFrames={fps * 45}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <GpuBanner type="8×B300" subtitle="Full Rack · 2,304 GB · 120 PFLOPS" />
          <CenteredSlide padding="60px 100px 0">
            <SceneTitle title="Train a Giant Model" subtitle="Full parameter fine-tuning — not just LoRA" />

            <div
              style={{
                display: 'flex',
                gap: 32,
                marginTop: 24,
                width: '100%',
                maxWidth: 1400,
              }}
            >
              {/* Left: model size + LoRA comparison */}
              <div style={{ flex: 1 }}>
                <div style={{ marginBottom: 20 }}>
                  <FadeIn delay={10}>
                    <p style={{ fontSize: 20, color: theme.colors.textMuted, marginBottom: 12 }}>Model Scale</p>
                  </FadeIn>
                  <div style={{ display: 'flex', gap: 12 }}>
                    {['7B', '13B', '30B', '70B'].map((size, i) => (
                      <FadeIn key={size} delay={15 + i * 10} direction="up">
                        <div
                          style={{
                            background: `${theme.colors.accent2}15`,
                            border: `1px solid ${theme.colors.accent2}`,
                            borderRadius: 8,
                            padding: '10px 20px',
                            textAlign: 'center',
                          }}
                        >
                          <span style={{ fontSize: 24, fontWeight: 700, color: theme.colors.accent2 }}>{size}</span>
                          <span style={{ fontSize: 16, color: theme.colors.accent2, marginLeft: 4 }}>✓</span>
                        </div>
                      </FadeIn>
                    ))}
                  </div>
                </div>

                <FadeIn delay={fps * 2}>
                  <div style={{ display: 'flex', gap: 16, marginBottom: 20 }}>
                    <div
                      style={{
                        background: 'rgba(248,81,73,0.08)',
                        border: `1px solid ${theme.colors.red}40`,
                        borderRadius: 8,
                        padding: '12px 20px',
                        flex: 1,
                        textAlign: 'center',
                      }}
                    >
                      <span style={{ fontSize: 20, color: theme.colors.red, textDecoration: 'line-through' }}>LoRA Only</span>
                      <p style={{ fontSize: 16, color: theme.colors.textMuted, marginTop: 4 }}>Memory-constrained</p>
                    </div>
                    <div
                      style={{
                        background: `${theme.colors.accent2}12`,
                        border: `1px solid ${theme.colors.accent2}`,
                        borderRadius: 8,
                        padding: '12px 20px',
                        flex: 1,
                        textAlign: 'center',
                      }}
                    >
                      <span style={{ fontSize: 20, fontWeight: 700, color: theme.colors.accent2 }}>Full Fine-Tuning</span>
                      <p style={{ fontSize: 16, color: theme.colors.textMuted, marginTop: 4 }}>With 8×B300</p>
                    </div>
                  </div>
                </FadeIn>

                <FadeIn delay={fps * 3}>
                  <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                    {['Healthcare', 'Finance', 'Legal', 'Code'].map((domain) => (
                      <div
                        key={domain}
                        style={{
                          background: `${theme.colors.accent2}12`,
                          border: `1px solid ${theme.colors.accent2}30`,
                          borderRadius: 6,
                          padding: '8px 16px',
                          fontSize: 18,
                          color: theme.colors.accent2,
                        }}
                      >
                        {domain}
                      </div>
                    ))}
                  </div>
                </FadeIn>
              </div>

              {/* Right: key capabilities */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <UseCaseExample
                  icon="📊"
                  title="Continue Pretraining"
                  detail="Terabytes of proprietary data — legal documents, financial records, healthcare data, codebases"
                  delay={fps * 1.5}
                  color={theme.colors.accent2}
                />
                <UseCaseExample
                  icon="🧠"
                  title="Domain-Native Models"
                  detail="Healthcare LLM, financial reasoning model, legal research assistant, multilingual enterprise model"
                  delay={fps * 2.5}
                  color={theme.colors.accent2}
                />
                <UseCaseExample
                  icon="⚡"
                  title="Distributed Training"
                  detail="FSDP or DeepSpeed ZeRO across all 8 GPUs — large batch sizes, faster convergence"
                  delay={fps * 3.5}
                  color={theme.colors.accent2}
                />
                <UseCaseExample
                  icon="🖼️"
                  title="Multimodal Training"
                  detail="Text + image models, vision-language fine-tuning, document + diagram reasoning"
                  delay={fps * 4.5}
                  color={theme.colors.accent2}
                />
              </div>
            </div>
          </CenteredSlide>
        </div>
      </Sequence>

      {/* Sub-scene 2d: Long-Context Reasoning [8×B300] (100s–150s = 50s) */}
      <Sequence from={fps * 100} durationInFrames={fps * 50}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <GpuBanner type="8×B300" subtitle="Full Rack · 2,304 GB · 120 PFLOPS" />
          <CenteredSlide padding="60px 100px 0">
            <SceneTitle title="Long-Context Reasoning" subtitle="One massive context window — not chunked RAG, not retrieval stitching" />

            <div
              style={{
                display: 'flex',
                gap: 24,
                marginTop: 20,
                width: '100%',
                maxWidth: 1400,
              }}
            >
              {/* Left: example cards */}
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
                <UseCaseExample
                  icon="💻"
                  title="Whole Codebase Reasoning"
                  detail="Load 5M lines of code — microservices, infra configs, CI pipelines. Ask system-level architecture questions."
                  delay={15}
                  color={theme.colors.accent2}
                />
                <UseCaseExample
                  icon="📄"
                  title="Enterprise Document Intelligence"
                  detail="3,000-page merger agreements, 10 years of financial filings. Compare clauses, identify contradictions."
                  delay={fps * 1.5}
                  color={theme.colors.accent2}
                />
                <UseCaseExample
                  icon="🤖"
                  title="Multi-Session Agent Memory"
                  detail="Months of interaction without aggressive summarization. Detects behavioral patterns, personalizes deeply."
                  delay={fps * 3}
                  color={theme.colors.accent2}
                />
                <UseCaseExample
                  icon="📈"
                  title="Financial Time-Series Analysis"
                  detail="10 years of tick data + earnings calls + SEC filings + market sentiment — combined in one reasoning window."
                  delay={fps * 4.5}
                  color={theme.colors.accent2}
                />
              </div>

              {/* Right: context window + memory stats */}
              <div style={{ flex: 0.6, display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>
                <FadeIn delay={fps * 2}>
                  <div style={{ textAlign: 'center' }}>
                    <p style={{ fontSize: 18, color: theme.colors.textMuted, marginBottom: 12 }}>Context Window Scale</p>
                    {['32K', '64K', '128K+'].map((ctx, i) => (
                      <div key={ctx} style={{ marginBottom: 8 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                          <span style={{ fontSize: 18, color: theme.colors.textMuted, width: 60, textAlign: 'right' }}>{ctx}</span>
                          <div
                            style={{
                              height: 20,
                              width: `${40 + i * 30}%`,
                              background: `linear-gradient(90deg, ${theme.colors.accent2}40, ${theme.colors.accent2})`,
                              borderRadius: 4,
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </FadeIn>

                <FadeIn delay={fps * 4}>
                  <div
                    style={{
                      background: `${theme.colors.accent2}12`,
                      border: `1px solid ${theme.colors.accent2}40`,
                      borderRadius: 12,
                      padding: '20px',
                      textAlign: 'center',
                    }}
                  >
                    <div style={{ fontSize: 18, color: theme.colors.textMuted }}>Total GPU Memory</div>
                    <div style={{ fontSize: 36, fontWeight: 800, color: theme.colors.accent2, marginTop: 4 }}>
                      8 × 288 GB = 2,304 GB
                    </div>
                    <div style={{ fontSize: 16, color: theme.colors.textMuted, marginTop: 4 }}>
                      70B model at 128K+ tokens without aggressive quantization
                    </div>
                  </div>
                </FadeIn>
              </div>
            </div>
          </CenteredSlide>
        </div>
      </Sequence>

      {/* Sub-scene 2e: Real-Time Inference at Scale [8×B300] (150s–185s = 35s) */}
      <Sequence from={fps * 150} durationInFrames={fps * 35}>
        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
          <GpuBanner type="8×B300" subtitle="Full Rack · 2,304 GB · 120 PFLOPS" />
          <CenteredSlide padding="60px 100px 0">
            <SceneTitle
              title="Real-Time Inference at Scale"
              subtitle="Thousands of concurrent users with sub-second responses"
            />

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 16,
                marginTop: 24,
                width: '100%',
                maxWidth: 1400,
              }}
            >
              <UseCaseExample
                icon="💬"
                title="AI Customer Support"
                detail="50,000 customers — live chat, email automation, ticket classification. Each request in under 1 second."
                delay={15}
                color={theme.colors.accent2}
              />
              <UseCaseExample
                icon="👨‍💻"
                title="AI Coding Copilot"
                detail="Thousands of developers — completions, refactoring, code explanations. Every 100ms matters."
                delay={fps * 1}
                color={theme.colors.accent2}
              />
              <UseCaseExample
                icon="🔄"
                title="24/7 AI Agents"
                detail="Monitoring systems, detecting anomalies, taking automated actions. Continuous inference, stable throughput."
                delay={fps * 2}
                color={theme.colors.accent2}
              />
              <UseCaseExample
                icon="🎙️"
                title="Real-Time Voice AI"
                detail="Streaming ASR + LLM + TTS — all under 300ms. Banking, healthcare, travel booking voice bots."
                delay={fps * 3}
                color={theme.colors.accent2}
              />
            </div>

            <FadeIn delay={fps * 4.5} style={{ marginTop: 16 }}>
              <div style={{ display: 'flex', gap: 32, justifyContent: 'center' }}>
                {[
                  { label: 'Customer Support', latency: '<1s' },
                  { label: 'Coding Copilot', latency: '<100ms' },
                  { label: 'Voice AI', latency: '<300ms' },
                ].map((item) => (
                  <div key={item.label} style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 32, fontWeight: 800, color: theme.colors.accent2 }}>{item.latency}</div>
                    <div style={{ fontSize: 16, color: theme.colors.textMuted }}>{item.label}</div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </CenteredSlide>
        </div>
      </Sequence>

      {/* Sub-scene 2f: Where B300 Is Not the Answer (185s–210s = 25s) */}
      <Sequence from={fps * 185} durationInFrames={fps * 25}>
        <CenteredSlide padding="0 140px">
          <SceneTitle title="Where B300 Is Not the Answer" />

          <div style={{ marginTop: 40, maxWidth: 800 }}>
            <CrossItem
              text="FP64 Scientific Computing"
              detail="Only 1.2 TFLOPS FP64 — deliberately sacrificed by design to maximize AI throughput."
              delay={15}
            />
            <CrossItem
              text="Edge Deployment"
              detail="1,400W TDP per GPU. This hardware lives in data centers with liquid cooling, not at the edge."
              delay={30}
            />
            <CrossItem
              text="Budget-Constrained / Smaller Models"
              detail="If you're running models under 70B parameters, previous-gen GPUs are more cost-effective."
              delay={45}
            />
            <CrossItem
              text="Hobby Projects"
              detail="This is infrastructure for serious AI systems, not casual development."
              delay={55}
            />
          </div>

          <FadeIn delay={fps * 3.5} style={{ marginTop: 28 }}>
            <p style={{ fontSize: 28, color: theme.colors.accent, textAlign: 'center', fontWeight: 600 }}>
              Let's look at the real benchmarks →
            </p>
          </FadeIn>
        </CenteredSlide>
      </Sequence>
    </Background>
  );
};
