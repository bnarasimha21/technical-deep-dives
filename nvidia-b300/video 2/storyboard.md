# Should You Switch to B300? — Video 2 Storyboard

> **Title:** "Should You Switch to B300?"
> **Format:** Use cases, economics & software stack (~5 min)
> **Audience:** Developers, ML engineers, and startup CTOs evaluating cloud GPU options
> **Tone:** Technical but accessible, developer-friendly
> **Total Scenes:** 5

---

## Scene 1: Introduction (0:00 – 0:30)

**Visual:** Quick recap graphics from Video 1

**Key Points:**
- Recap: 15 PFLOPS FP4, 288 GB HBM3e, dual-reticle architecture with 208B transistors
- Now the question: should you actually use it?
- This video covers who B300 is for, the economics, and the software stack

**On-Screen Graphics:**
- Quick stat recap: 15 PFLOPS | 288 GB | 208B transistors
- Video 2 title card

**Transition:** Cut to use case matrix

---

## Scene 2: Who Should Use B300 (0:30 – 1:30)

**Visual:** Use case matrix with checkmarks and X marks

**Key Points:**
- **Ideal for:**
  - LLM inference at scale (primary use case)
  - AI reasoning / chain-of-thought (B300 doubles attention speed)
  - Multimodal AI (vision + language)
  - Training large foundation models
  - Mixture of Experts architectures (Tensor Memory reduces expert-switching overhead)
- **Not ideal for:**
  - FP64 scientific computing (only 1.2 TFLOPS FP64)
  - Edge deployment (1,400W)
  - Budget-constrained or smaller model workloads (H100 may be smarter)

**On-Screen Graphics:**
- Green checkmark / red X matrix
- "Best fit" callout boxes

**Transition:** "What does this mean for cloud developers?"

---

## Scene 3: Cloud GPU Economics (1:30 – 2:45)

**Visual:** Value proposition graphics, decision flowchart

**Key Points:**
- NVIDIA claims 5x higher throughput per megawatt vs Hopper — for cloud customers, this means more AI work per GPU-hour
- Even if per-hour price is higher than H100, you get significantly more done in that hour — lower cost per inference
- 288 GB memory → fit models on fewer GPUs → simpler architecture, less communication overhead, lower total cost
- When to choose B300: large models (70B+), throughput/latency matters, want fewer GPUs
- When to stick with H100: smaller models, experimenting, need FP64

**On-Screen Graphics:**
- 5x throughput/MW stat
- Decision flowchart: "Which GPU?"

**Transition:** "Quick note on the software stack"

---

## Scene 4: Software Stack (2:45 – 3:30)

**Visual:** Software ecosystem diagram, compatibility checklist

**Key Points:**
- Full CUDA 12 compatibility — existing code runs without changes
- PyTorch, TensorFlow, JAX all supported
- Inference frameworks: vLLM, SGLang, TensorRT-LLM have NVFP4 support from day one
- Libraries: cuDNN, cuBLAS, NCCL (NVLink 5 aware)
- Practical takeaway: no rewrites needed. Deploy existing models, add NVFP4 quantization for biggest gains.

**On-Screen Graphics:**
- Software stack: Hardware → Drivers → Libraries → Frameworks → Applications
- Framework compatibility checklist

**Transition:** "Wrapping up"

---

## Scene 5: Summary & What's Next (3:30 – 4:30)

**Visual:** Key takeaways as animated cards, then roadmap

**Key Points — Five things to remember:**
1. **15 PFLOPS FP4** — the single fastest AI GPU available today
2. **288 GB HBM3e** — fit 400B+ parameter models on a single GPU
3. **2x attention acceleration** — purpose-built for the reasoning model era
4. **NVFP4** — ~3.5x memory savings vs FP16 with ~1% accuracy trade-off
5. **You don't need to buy hardware** — use it in the cloud

**Looking ahead:**
- Vera Rubin (2026), Rubin Ultra (2027)
- Annual cadence: today's top of the line is next year's baseline

**Closing:**
- The B300 is the most capable AI GPU available right now
- For developers building inference-heavy applications, for startups scaling AI products, for teams training next-gen models — this is the hardware that makes it possible

**On-Screen Graphics:**
- 5 key takeaways as animated cards
- NVIDIA roadmap timeline
- End card with links/resources

**Transition:** Fade to end card

---

## Production Notes

### Pacing
- **Scenes 1–2** (0:00–1:30): Recap and use cases — direct, no fluff
- **Scenes 3–4** (1:30–3:30): Economics and software — developer-focused, practical
- **Scene 5** (3:30–4:30): Wrap-up — concise, forward-looking

### Visual Style
- Dark theme with green/blue accent colors
- Clean data visualizations (animated charts, not static screenshots)
- Minimal text on screen — let narration carry the detail

### Music/Audio
- Subtle tech-ambient background track
- Sound effects for stat reveals and transitions
- Clean, conversational narration tone
