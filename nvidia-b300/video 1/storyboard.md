# NVIDIA B300 Blackwell Ultra — Video 1 Storyboard

> **Title:** "NVIDIA B300 Blackwell Ultra"
> **Format:** Technical deep dive (~10 min)
> **Audience:** Developers, ML engineers, and startup CTOs evaluating cloud GPU options
> **Tone:** Technical but accessible, developer-friendly
> **Total Scenes:** 8

---

## Scene 1: Hook & Introduction (0:00 – 0:45)

**Visual:** Dark background. Flash GPU images as mentioned: V100 → A100 → H100 → B300. Title card: "NVIDIA B300 Blackwell Ultra"

**Key Points:**
- Hook: Every generation of AI has been defined by its hardware
- GPT-2 ran on V100s. GPT-3 needed A100s. The largest models today need clusters of H100s.
- The B300 packs 15 PFLOPS of AI compute, 288 GB of memory, and 208 billion transistors
- This video breaks down the architecture and what it means for developers deploying AI in the cloud

**On-Screen Graphics:**
- GPU evolution: V100 → A100 → H100 → B300
- Stats flash: "15 PFLOPS | 288 GB | 208B transistors"

**Transition:** Cut to timeline

---

## Scene 2: Why B300 Exists (0:45 – 2:00)

**Visual:** GPU timeline animation: V100 → A100 → H100 → B200 → B300. Model size growth.

**Key Points:**
- AI models are growing fast: GPT-3 (175B) → GPT-4 (1T+) → reasoning models
- The bottleneck has shifted from raw compute to memory
- The best models today do not fit on a single GPU — splitting across GPUs means more hardware, more complexity, more cost
- NVIDIA's vision: data centers as AI factories producing AI outputs at massive scale
- Design philosophy: NVIDIA made deliberate trade-offs — prioritized memory capacity (models keep getting bigger), invested in NVFP4 (betting 4-bit is good enough for production), doubled down on NVLink bandwidth (MoE architectures are the future)

**On-Screen Graphics:**
- GPU evolution timeline with key specs
- Model size growth curve
- "Model split across GPUs vs single GPU" graphic

**Transition:** Cut to specs comparison table

---

## Scene 3: The Numbers — B300 vs B200 vs H100 (2:00 – 3:15)

**Visual:** Animated comparison table building row by row

**Key Points:**
- FP4 compute: 15 PFLOPS (1.5x B200, 7.5x H100)
- Introduce Hopper for audience: H100 is NVIDIA's previous-generation architecture, the GPU that's been the workhorse of AI for the last two years
- Memory: 288 GB HBM3e (1.5x B200, 3.6x H100)
- DeepSeek-R1 at 671B params: ~383 GB in NVFP4, fits on 2 B300s vs 9 H100s
- Bandwidth: 8 TB/s (same as B200, 2x+ H100)
- TDP: 1,400W (200W more than B200's 1,200W, double H100's 700W)
- NVIDIA claims 5x higher throughput per megawatt vs Hopper — more power in, but each watt delivers significantly more useful AI work

**On-Screen Graphics:**
| Metric | H100 | B200 | B300 |
|--------|------|------|------|
| FP4 | 2 PFLOPS* | 10 PFLOPS | 15 PFLOPS |
| Memory | 80 GB | 192 GB | 288 GB |
| Bandwidth | 3.35 TB/s | 8 TB/s | 8 TB/s |
| TDP | 700W | 1,200W | 1,400W |

**Transition:** "Let's look under the hood"

---

## Scene 4: Dual-Reticle Architecture (3:15 – 4:30)

**Visual:** Animated exploded view of the B300 package showing two dies

**Key Points:**
- The B300 isn't one chip — it's two
- Physical limit: in lithography, a machine can only expose about 858 mm² on TSMC's 4nm process (the reticle size)
- Two dies connected by NV-HBI at 10 TB/s bidirectional
- 208 billion transistors total (104B per die)
- The two chips share a unified 50 MB L2 cache and maintain coherent memory across both dies
- Appears as a single CUDA device — CUDA code doesn't know or care there are two dies
- Manufacturing benefit: smaller dies mean better yield — more usable chips per wafer, fewer defects, potentially better supply availability

**On-Screen Graphics:**
- Die A ↔ NV-HBI (10 TB/s) ↔ Die B diagram
- Unified L2 Cache: 50 MB
- 8× HBM3e stacks (36 GB each) around the dies
- "Single CUDA device" highlight

**Transition:** Zoom into die → tensor cores

---

## Scene 5: 5th-Gen Tensor Cores & NVFP4 (4:30 – 6:15)

**Visual:** Tensor core evolution graphic, then NVFP4 format breakdown

**Key Points:**
- 640 fifth-generation tensor cores — the generation matters more than the count
- Evolution: Volta (matrix multiply) → Turing (INT8) → Ampere (sparsity) → Hopper (FP8, Transformer Engine) → Blackwell (NVFP4, 2x attention)
- Context: Most production models today run in FP8. NVFP4 is the next step.
- NVFP4: 4-bit floating point with two-level scaling
  - Each block of 16 values gets a micro-scale factor in FP8
  - The entire tensor gets a macro-scale in FP32
- Impact vs FP16: ~3.5x memory savings, 4x compute throughput, ~1% accuracy trade-off
- Impact vs FP8: ~1.8x memory savings
- Real example: DeepSeek-R1 671B — 1,342 GB (FP16, 17 H100s) → ~671 GB (FP8, 9 H100s) → ~383 GB (NVFP4, 2 B300s). 9 GPUs down to 2.
- 2x attention acceleration: doubled special function unit throughput for softmax (exponential + division)
- Tensor Memory (TMEM): 256 KB per SM for intermediate matrix results, reduces trips to main memory

**On-Screen Graphics:**
- Tensor core gen 1–5 evolution table
- NVFP4 bit layout: 16 weights (FP4) + FP8 micro-scale + FP32 macro-scale
- FP16 vs FP8 vs NVFP4 comparison table
- GPU count comparison: 17 H100s → 9 H100s → 2 B300s

**Transition:** "Memory is the killer feature"

---

## Scene 6: Memory Architecture — 288 GB HBM3e (6:15 – 7:15)

**Visual:** HBM stack animation around the two dies

**Key Points:**
- 8 stacks of HBM3e, 12 layers of DRAM per stack, 36 GB each = 288 GB total
- 8,192-bit memory interface (4,096 bits per die)
- 8 TB/s bandwidth — feeds data to tensor cores fast enough to keep up with compute
- Why 288 GB matters for developers:
  - Larger models on fewer GPUs — simpler deployment, lower cost
  - Bigger KV caches — longer context windows for reasoning models
  - More room for batching — better GPU utilization, more tokens/sec, lower cost per inference

**On-Screen Graphics:**
- 8× HBM3e stacks around two dies
- Bandwidth callout: 8 TB/s
- "Why it matters" bullet points
- Frame of reference: DeepSeek-R1 in NVFP4 fits on 2 B300s vs 9 H100s

**Transition:** "But one GPU is rarely enough"

---

## Scene 7: Multi-GPU Scaling (7:15 – 8:30)

**Visual:** Network topology animation — 8-GPU node with NVLink/NVSwitch, multi-node with InfiniBand/Ethernet

**Key Points:**
- Typical B300 server: 8 GPUs + Intel Xeon CPUs + 2 TB system memory
- 2.3 TB total GPU memory — enough to run even the largest models without splitting across nodes
- System compute: 108 PFLOPS FP4 dense, 144 PFLOPS sparse, 72 PFLOPS FP8 training. ~14 kW system power.
- Intra-node: 2× 5th-gen NVSwitch, NVLink 5 at 1,800 GB/s per GPU (2x Hopper), 14.4 TB/s aggregate
- Inter-node: up to 800 Gb/s InfiniBand or Ethernet via ConnectX-8
- Two-tier architecture: NVLink inside the node, high-speed networking outside

**On-Screen Graphics:**
- 8-GPU node block diagram with NVSwitch
- System stats: 2.3 TB | 108 PFLOPS | ~14 kW
- Intra-node vs inter-node callout boxes
- 144 PFLOPS sparse | 72 PFLOPS FP8

**Transition:** "Let's talk real-world performance"

---

## Scene 8: Performance That Matters (8:30 – 9:45)

**Visual:** Animated comparison graphics with NVIDIA's official claims

**Key Points (Official NVIDIA Claims):**
- Per-GPU: 1.5x more AI compute than B200 (NVFP4), 7.5x more than H100 (FP8)
- 8-GPU system: 11x faster LLM inference vs Hopper, 7x more compute, 4x more memory
- Efficiency: 5x higher throughput per megawatt vs Hopper — the number that matters for total cost of ownership. Each watt delivers significantly more useful AI work.

**On-Screen Graphics:**
- Per-GPU compute comparison (1.5x B200, 7.5x H100)
- 8-GPU system-level claims (11x, 7x, 4x)
- Efficiency: 5x throughput/MW callout

**Closing:**
- End card pointing to Video 2: "Should You Switch to B300?"

**Transition:** Fade to end card

---

## Production Notes

### Pacing
- **Scenes 1–2** (0:00–2:00): Hook and context — keep energy high
- **Scenes 3–6** (2:00–7:15): Technical deep dive — slower, more visual
- **Scenes 7–8** (7:15–9:45): System-level and performance — concrete numbers

### Visual Style
- Dark theme with green/blue accent colors
- Clean data visualizations (animated charts, not static screenshots)
- Architecture diagrams with progressive reveal (build up complexity)
- Minimal text on screen — let narration carry the detail

### Music/Audio
- Subtle tech-ambient background track
- Sound effects for stat reveals and transitions
- Clean, conversational narration tone
