# NVIDIA B300 Blackwell Ultra — Video Storyboard

> **Format:** 10–15 minute technical explainer
> **Audience:** Developers, ML engineers, and startup CTOs evaluating cloud GPU options
> **Tone:** Technical but accessible, developer-friendly
> **Total Scenes:** 12

---

## Scene 1: Hook & Introduction (0:00 – 0:45)

**Visual:** Dark background, animated GPU chip render fading in. Title card: "NVIDIA B300 Blackwell Ultra: What You Need to Know"

**Key Points:**
- The AI infrastructure landscape just changed again
- B300 is NVIDIA's most powerful AI GPU — 15 PFLOPS of FP4 compute
- What does this mean for developers building and deploying AI?

**On-Screen Graphics:**
- Title animation
- Quick stat flash: "15 PFLOPS | 288 GB | 208B transistors"

**Transition:** Zoom into chip → architecture overview

---

## Scene 2: Why B300 Exists — The AI Factory Era (0:45 – 1:45)

**Visual:** Timeline graphic showing GPU evolution: V100 → A100 → H100 → B200 → B300

**Key Points:**
- Data centers are becoming "AI factories" — producing intelligence at scale
- Models are growing faster than hardware: GPT-3 (175B) → GPT-4 (1T+) → reasoning models
- B300 is purpose-built for this shift: more memory, more compute, better efficiency

**On-Screen Graphics:**
- GPU evolution timeline with key specs at each generation
- Model size growth curve

**Transition:** Cut to specs comparison table

---

## Scene 3: The Numbers — B300 vs B200 vs H100 (1:45 – 3:00)

**Visual:** Animated comparison table building row by row

**Key Points:**
- Side-by-side: B300 vs B200 vs H100
- FP4 compute: 15 PFLOPS (1.5x B200, 7.5x H100)
- Memory: 288 GB HBM3e (1.5x B200, 3.6x H100)
- Bandwidth: 8 TB/s
- TDP: 1,400W — power is the real constraint

**On-Screen Graphics:**
| Metric | B300 | B200 | H100 |
|--------|------|------|------|
| FP4 | 15 PFLOPS | 10 PFLOPS | 2 PFLOPS* |
| Memory | 288 GB | 192 GB | 80 GB |
| Bandwidth | 8 TB/s | 8 TB/s | 3.35 TB/s |
| TDP | 1,400W | 1,200W | 700W |

**Transition:** "Let's look under the hood"

---

## Scene 4: Dual-Reticle Architecture (3:00 – 4:15)

**Visual:** Animated exploded view of the B300 package showing two dies

**Key Points:**
- Lithography has a physical limit (reticle size ~858 mm²)
- B300 uses two dies connected by NV-HBI at 10 TB/s
- 208 billion transistors total (104B per die)
- Appears as a single CUDA device — transparent to developers
- Better manufacturing yield than one massive die

**On-Screen Graphics:**
- Die A ↔ NV-HBI ↔ Die B diagram
- "10 TB/s die-to-die" callout
- "Single CUDA device" highlight

**Transition:** Zoom into die → tensor cores

---

## Scene 5: 5th-Gen Tensor Cores & NVFP4 (4:15 – 5:45)

**Visual:** Tensor core evolution graphic, then NVFP4 format breakdown

**Key Points:**
- 640 tensor cores (4 per SM, 160 SMs)
- 5th gen adds: NVFP4 native support, 2x attention acceleration, Tensor Memory (TMEM)
- NVFP4 = 4-bit floating point with two-level scaling
  - Micro-block scale (FP8) per 16 values
  - Tensor-level scale (FP32) across entire tensor
- Why it matters: ~3.5x memory reduction vs FP16, ~1.8x vs FP8, ~1% accuracy trade-off
- Real example: DeepSeek-R1 671B → 17 H100s (FP16), 9 H100s (FP8), just 2 B300s (NVFP4)

**On-Screen Graphics:**
- Tensor core gen 1-5 evolution table
- NVFP4 bit layout diagram
- Model memory footprint comparison (FP16 vs FP8 vs FP4)

**Transition:** "Memory is the killer feature"

---

## Scene 6: Memory Architecture — 288 GB HBM3e (5:45 – 7:00)

**Visual:** HBM stack animation, memory hierarchy pyramid

**Key Points:**
- 8× 12-Hi HBM3e stacks, 36 GB each = 288 GB total
- 8 TB/s bandwidth (8,192-bit interface)
- Memory hierarchy: Registers → TMEM → Shared/L1 → L2 (50 MB) → HBM3e
- Why 288 GB matters for developers:
  - Fit larger models without multi-GPU splitting
  - Bigger KV caches for longer context windows
  - More room for batching = better throughput = lower cost per token

**On-Screen Graphics:**
- HBM3e stack diagram (8 stacks around two dies)
- Memory hierarchy pyramid with latency at each level
- "What fits in 288 GB" examples

**Transition:** "But one GPU is rarely enough"

---

## Scene 7: Multi-GPU Scaling (7:00 – 8:15)

**Visual:** Network topology animation — 8-GPU node with NVLink, multi-node with InfiniBand/Ethernet

**Key Points:**
- 8× B300 GPUs + Intel Xeon CPUs + 2 TB system memory per node
- System compute: 108 PFLOPS FP4 dense, 144 PFLOPS sparse, 72 PFLOPS FP8
- 2.3 TB total GPU memory, ~14 kW system power
- 2× 5th-gen NVSwitch, NVLink 5: 1,800 GB/s per GPU (2x Hopper), 14.4 TB/s aggregate
- Multi-node: up to 800 Gb/s InfiniBand or Ethernet via NVIDIA ConnectX-8
- Two-tier architecture: NVLink inside the node, high-speed networking outside

**On-Screen Graphics:**
- 8-GPU node block diagram with NVSwitch and NVLink
- System-level compute stats (108/144 PFLOPS, 72 FP8)
- Multi-node scaling graphic (NVLink intra-node, InfiniBand/Ethernet inter-node)

**Transition:** "Let's talk real-world performance"

---

## Scene 8: Performance That Matters (8:15 – 9:30)

**Visual:** Animated bar charts showing inference and training benchmarks

**Key Points (Official NVIDIA Claims):**
- B300 delivers 1.5x more AI compute than B200 in NVFP4, 7.5x more than H100 in FP8
- 8-GPU B300 systems: 11x faster LLM inference vs Hopper, 7x more compute, 4x more memory
- Efficiency: 5x higher throughput per megawatt compared to Hopper

**On-Screen Graphics:**
- Per-GPU compute comparison bars (vs B200, H100)
- 8-GPU system-level performance claims
- Efficiency: 5x throughput/MW callout

**Transition:** "So who should actually use this?"

---

## Scene 9: Who Should Use B300 — And Who Shouldn't (9:30 – 10:30)

**Visual:** Use case matrix with checkmarks and X marks

**Key Points:**
- **Ideal for:**
  - LLM inference at scale (the primary use case)
  - AI reasoning / chain-of-thought models
  - Multimodal AI (vision + language)
  - Training large foundation models
  - Mixture of Experts architectures
- **Not ideal for:**
  - FP64 HPC / scientific computing (only 1.2 TFLOPS FP64)
  - Edge deployment (1,400W)
  - Budget-conscious workloads

**On-Screen Graphics:**
- Green checkmark / red X matrix
- "Best fit" callout boxes

**Transition:** "What does this mean for cloud developers?"

---

## Scene 10: Cloud GPU Economics — What This Means for You (10:30 – 11:45)

**Visual:** Cloud pricing comparison, TCO analysis

**Key Points:**
- Cloud availability: AWS P6-B300, Azure ND GB300 v6, and more
- The real value proposition for developers:
  - Fit larger models on fewer GPUs → simpler architecture
  - NVFP4 means ~3.5x memory reduction vs FP16 → lower instance costs
  - NVIDIA claims 5x throughput per megawatt vs Hopper → more work per dollar
  - 288 GB memory → bigger KV caches, higher batch sizes
- When to choose B300 instances vs H100:
  - B300: Large model inference (70B+), high-throughput serving, training
  - H100: FP64 workloads, smaller models, cost-sensitive experimentation

**On-Screen Graphics:**
- Cloud availability table
- Value proposition based on official NVIDIA efficiency claims
- Decision flowchart: "Which GPU instance?"

**Transition:** "Let's zoom out"

---

## Scene 11: The Software Stack (11:45 – 12:30)

**Visual:** Software ecosystem diagram

**Key Points:**
- Full CUDA 12.x compatibility — existing code just works
- Framework support: PyTorch, TensorFlow, JAX, vLLM, SGLang, TensorRT-LLM
- Key libraries optimized: cuDNN, cuBLAS, NCCL (NVLink 5 aware)
- NVFP4 support in TensorRT-LLM, vLLM, SGLang from day one
- No code rewrites needed — just deploy on B300 instances

**On-Screen Graphics:**
- Software stack pyramid: Hardware → Drivers → Libraries → Frameworks → Applications
- Framework compatibility checklist

**Transition:** "Wrapping up"

---

## Scene 12: Summary & What's Next (12:30 – 13:30)

**Visual:** Key takeaways with animated bullet points, then roadmap

**Key Points — Five things to remember:**
1. **15 PFLOPS FP4** — the fastest AI GPU available
2. **288 GB HBM3e** — fit 400B+ models on a single GPU
3. **2x attention acceleration** — purpose-built for reasoning models
4. **NVFP4** — ~3.5x memory reduction vs FP16 with minimal accuracy loss
5. **Cloud-ready** — available on major cloud platforms now

**Looking ahead:**
- Vera Rubin architecture (2026)
- Rubin Ultra (2027)
- NVIDIA's annual cadence means this is a moving target

**Closing:**
- The AI factory era is here — B300 is the assembly line
- For cloud developers, the question isn't "if" but "when" to adopt

**On-Screen Graphics:**
- 5 key takeaways as animated cards
- NVIDIA roadmap timeline
- End card with links/resources

**Transition:** Fade to end card

---

## Production Notes

### Pacing
- **Scenes 1-3** (0:00–3:00): Hook and context — keep energy high
- **Scenes 4-7** (3:00–8:15): Technical deep dive — slower, more visual
- **Scenes 8-10** (8:15–11:45): Practical value — developer-focused, concrete
- **Scenes 11-12** (11:45–13:30): Wrap-up — concise, forward-looking

### Visual Style
- Dark theme with green/blue accent colors
- Clean data visualizations (animated charts, not static screenshots)
- Architecture diagrams with progressive reveal (build up complexity)
- Minimal text on screen — let narration carry the detail

### Music/Audio
- Subtle tech-ambient background track
- Sound effects for stat reveals and transitions
- Clean, conversational narration tone
