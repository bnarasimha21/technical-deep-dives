# Should You Switch to B300? — Video 2 Storyboard

> **Title:** "Should You Switch to B300?"
> **Format:** Use cases, economics & software stack (~7:15)
> **Audience:** Developers, ML engineers, and startup CTOs evaluating GPU options
> **Tone:** Technical analysis + developer-friendly decision guide
> **Total Scenes:** 6

---

## Scene 1: Introduction (0:00 – 0:40)

**Visual:** Title card, then quick recap graphics from Video 1

**Key Points:**
- Recap per GPU: 15 PFLOPS FP4, 288 GB HBM3e, 208B transistors
- Recap 8×B300 rack: 120 PFLOPS FP4, 2,304 GB HBM3e, NVLink 5
- Now the question: should you actually use it?
- This video covers use cases, economics, and software stack

**On-Screen Graphics:**
- Title card: "Should You Switch to B300?"
- Subtitle: "Use Cases, Economics & Software Stack"
- Two rows of stat boxes:
  - **PER GPU** (green): 15 PFLOPS | 288 GB | 208B Transistors
  - **8×B300 RACK** (blue): 120 PFLOPS | 2,304 GB | NVLink 5
- "Should you actually use it?" highlight

**Transition:** Cut to use case cards

---

## Scene 2: Who Uses B300 — And What They Do With It (0:40 – 4:10)

**Visual:** Audience cards, then B300 vs 8×B300 use case segments with full-width GPU banners, then "not ideal" list

---

### Sub-scene 2a: Who Needs B300 (0:40 – 1:05)

**Visual:** Four audience cards animate in with icons

- **AI Startups** — Building their own foundation models, owning the weights instead of depending on APIs
- **Enterprise AI Teams** — Running internal LLMs, customer-facing AI products, and agentic workflows at scale
- **ML Engineers & Researchers** — Full parameter fine-tuning, distributed training, and experimentation at scale
- **AI Infrastructure Builders** — Powering agent fleets, inference pipelines, and multi-tenant AI platforms

**On-Screen Graphics:**
- 2×2 grid of audience cards with icon + role + one-line description
- Header: "Who Needs B300?"

**Transition:** Cut to single B300 use cases

---

### Sub-scene 2b: What a Single B300 Can Do (1:05 – 1:35)

**Visual:** Green full-width banner: "B300 — Single GPU · 288 GB · 15 PFLOPS"

**Key Points:**
- Run 405B inference on one GPU — Llama 405B in NVFP4 fits in 288 GB with room for KV cache
- Serve a product or team — moderate traffic inference with 15 PFLOPS per GPU
- Fine-tune smaller models — full params up to ~13B, LoRA for 70B
- Reasoning with attention acceleration — 2x softmax throughput, faster TTFT

**On-Screen Graphics:**
- Green `B300` full-width banner bar at top
- 2×2 grid of use case cards (green accent)
- Transition text: "Need more? Scale to 8×B300 →"

**Transition:** Cut to 8×B300 use cases

---

### Sub-scene 2c: Use Case 1 — Train a Giant Model (1:35 – 2:20)

**Visual:** Blue full-width banner: "8×B300 — Full Rack · 2,304 GB · 120 PFLOPS"

**Key Points:**
- Train 30B–70B parameter models from scratch or full fine-tune — not just LoRA
- Most devs are forced to use LoRA due to memory constraints. With 8×B300, that disappears
- Continue pretraining on terabytes of proprietary data: legal, financial, healthcare, code
- Build domain-native models: healthcare LLM, financial reasoning, legal research assistant
- Distributed training with FSDP or DeepSpeed ZeRO across all 8 GPUs
- Multimodal training: text + image, vision-language, document + diagram reasoning

**On-Screen Graphics:**
- Blue `8×B300` full-width banner bar at top
- Model size bars: 7B → 13B → 30B → 70B with checkmarks
- "LoRA Only" vs "Full Fine-Tuning" comparison — crossed out LoRA, highlighted full fine-tuning
- Domain tags: Healthcare | Finance | Legal | Code
- Four capability cards: Continue Pretraining, Domain-Native Models, Distributed Training, Multimodal Training

**Transition:** Cut to long-context segment

---

### Sub-scene 2d: Use Case 2 — Long-Context Reasoning (2:20 – 3:10)

**Visual:** Blue full-width banner: "8×B300 — Full Rack · 2,304 GB · 120 PFLOPS"

**Key Points:**
- Long context = model reasons over massive information in a single pass — no chunking, no retrieval stitching
- **Whole codebase reasoning:** 5M lines of code, system-level architecture questions
- **Enterprise document intelligence:** 3,000-page merger agreements, cross-document clause comparison
- **Multi-session agent memory:** Months of interaction without aggressive summarization
- **Financial time-series analysis:** 10 years of data combined in one reasoning window
- 8×B300 provides 2,304 GB total GPU memory — enough for 70B at 128K+ tokens

**On-Screen Graphics:**
- Blue `8×B300` full-width banner bar at top
- Four example cards: Codebase | Legal Docs | Agent Memory | Financial Analysis
- Context window scale bars: 32K → 64K → 128K+
- Memory equation: 8 × 288 GB = 2,304 GB

**Transition:** Cut to real-time inference segment

---

### Sub-scene 2e: Use Case 3 — Real-Time Inference at Scale (3:10 – 3:45)

**Visual:** Blue full-width banner: "8×B300 — Full Rack · 2,304 GB · 120 PFLOPS"

**Key Points:**
- Thousands of concurrent users with sub-second responses
- **AI customer support:** 50,000 customers, each request under 1 second
- **AI coding copilot:** Thousands of developers, every 100ms matters
- **24/7 AI agents:** Continuous inference, stable throughput, low queue times
- **Real-time voice AI:** ASR + LLM + TTS under 300ms

**On-Screen Graphics:**
- Blue `8×B300` full-width banner bar at top
- 2×2 grid of use case cards (blue accent)
- Latency counters: <1s | <100ms | <300ms

**Transition:** Cut to "not ideal" section

---

### Sub-scene 2f: Where B300 Is Not the Answer (3:45 – 4:10)

**Visual:** Red ✗ items with explanations

- **FP64 scientific computing** — Only 1.2 TFLOPS, deliberately sacrificed to maximize AI throughput
- **Edge deployment** — 1,400W TDP, lives in data centers with liquid cooling
- **Budget-constrained / smaller models** — Models under 70B are more cost-effective on previous-gen
- **Hobby projects** — Infrastructure for serious AI systems, not casual development

**On-Screen Graphics:**
- Red ✗ items with explanations
- Transition text: "Let's look at the real benchmarks →"

**Transition:** Cut to TTFT data

---

## Scene 3: Time to First Token (4:10 – 4:35)

**Visual:** Before/after TTFT comparison blocks

**Key Points:**
- 70B params: 150ms → 45ms (3.3x faster)
- 405B params: 800ms → 180ms (4.4x faster)
- For reasoning models, faster TTFT = noticeably snappier user experience

**On-Screen Graphics:**
- Before/after blocks with strikethrough old values
- Multiplier badges (3.3x, 4.4x)
- Callout about reasoning model UX
- Transition text: "Now let's talk cost →"

**Transition:** Cut to economics

---

## Scene 4: The Economics (4:35 – 5:25)

**Visual:** Cost stats, then decision boxes

**Sub-scene 4a: Cost Per Token (4:35 – 5:05)**

- Stat boxes: "35x lower cost/M tokens vs Hopper" + "50x throughput per megawatt"
- Real-world callout: inference providers cut from $0.20/M tokens (Hopper) to $0.05/M tokens (Blackwell with NVFP4) — 4x reduction
- "Even if per-hour price is higher, you get 4-5x more work done in that hour"

**Sub-scene 4b: Decision Framework (5:05 – 5:25)**

Side-by-side decision boxes:

*Choose B300 when:*
- Large models (70B+ params)
- Throughput & latency matter
- Want fewer GPUs per model
- Running inference at scale

*Stick with previous gen:*
- Smaller models (<70B)
- Experimentation & prototyping
- Need FP64 for scientific work
- Budget-constrained deployments

**On-Screen Graphics:**
- Large stat boxes with NVIDIA green
- Green vs blue decision boxes
- Transition text: "Quick note on the software stack →"

**Transition:** Cut to software stack

---

## Scene 5: Software Stack (5:25 – 6:15)

**Visual:** Compatibility checklist, then stack pyramid building bottom-up

**Sub-scene 5a: Compatibility Checklist (5:25 – 5:47)**

Animated checkmarks:
- ✓ Full CUDA 12 compatibility — existing code runs unchanged
- ✓ PyTorch, TensorFlow, JAX — all supported natively
- ✓ vLLM, SGLang, TensorRT-LLM — NVFP4 support from day one
- ✓ cuDNN, cuBLAS, NCCL — all updated and NVLink 5 aware
- ✓ Add NVFP4 quantization for biggest memory + throughput gains

**Sub-scene 5b: Stack Pyramid (5:47 – 6:15)**

Pyramid building from bottom to top:
1. **Hardware:** NVIDIA B300 Blackwell Ultra — 15 PFLOPS FP4, 288 GB HBM3e, 8 TB/s
2. **CUDA 12** — Full backward compatibility, NVFP4 intrinsics, Enhanced MMA
3. **Libraries** — cuDNN, cuBLAS, NCCL (NVLink 5), cuSPARSE
4. **Frameworks** — PyTorch, TensorFlow, JAX, NeMo
5. **Inference Servers** — vLLM, SGLang, TensorRT-LLM, Triton
6. **Your Applications** — AI Models & Services

Callout: "Deploy existing models on B300, add NVFP4 quantization, and the performance gains are largely automatic."

**On-Screen Graphics:**
- Animated checklist with green checkmarks
- Layered pyramid with expanding widths
- Callout box with NVFP4 highlight

**Transition:** Fade to summary

---

## Scene 6: Summary & What's Next (6:15 – 7:15)

**Visual:** Data-backed takeaway cards, roadmap table, end card

**Sub-scene 6a: Five Things to Remember (6:15 – 6:45)**

Each card includes specific data:

1. **15 PFLOPS FP4 — 7.5x faster than H100** — The single fastest AI GPU available. MLPerf verified.
2. **288 GB HBM3e — fit 405B on one GPU** — NVFP4 makes 405B params fit in 202 GB. No multi-GPU splits needed.
3. **2x attention acceleration for reasoning models** — Doubles softmax throughput. 3.3–4.4x faster time-to-first-token.
4. **Up to 35x lower cost per million tokens** — Real providers already seeing 4x cost reduction with NVFP4.
5. **Zero code changes required** — Full CUDA 12 compatibility. Existing frameworks, libraries, and models just work.

**Sub-scene 6b: Roadmap (6:45 – 7:00)**

| Year | Architecture | Status |
|------|-------------|--------|
| 2024 | Blackwell (B200) | Shipping |
| 2025 | Blackwell Ultra (B300) | **Current** |
| 2026 | Vera Rubin | Announced |
| 2027 | Rubin Ultra | Announced |

"Annual cadence: today's top of the line is next year's baseline."

**Sub-scene 6c: End Card (7:00 – 7:15)**

- "Thanks for Watching"
- "Should You Switch to B300? — Part 2 of the NVIDIA B300 Blackwell Ultra Series"
- Links: Subscribe | Watch Part 1 | More Deep Dives
- Sources: NVIDIA Developer Blog, MLPerf v5.1, NVIDIA Newsroom

---

## Production Notes

### Pacing
- **Scene 1** (0:00–0:40): Title + recap with per-GPU and rack stats — 40s
- **Scene 2** (0:40–4:10): Audience cards + single B300 + 3 deep 8×B300 use cases + not ideal — 210s (the meat of the video)
- **Scene 3** (4:10–4:35): Time to first token — 25s (focused, punchy)
- **Scene 4** (4:35–5:25): Economics and decision framework — 50s
- **Scene 5** (5:25–6:15): Software stack — 50s (concise, reassuring)
- **Scene 6** (6:15–7:15): Data-backed summary + roadmap + end card — 60s

### Visual Style
- Dark theme (#0d1117) with NVIDIA green (#76b900) and blue (#0080ff) accents
- **Full-width GPU banner bars** distinguish B300 (green) vs 8×B300 (blue) sections
- Green accent for single B300 use cases, blue accent for 8×B300 use cases
- Minimal text on screen — let narration carry the detail
- Use case cards with icon + title + WHY explanation

### Data Sources
- All benchmark data from MLPerf v5.1 (audited, third-party verified)
- Cost claims from NVIDIA official blogs
- Real-world validation from inference provider reports
- See `sources.md` for full list with links

### Music/Audio
- Subtle tech-ambient background track
- Sound effects for stat reveals and bar chart animations
- Clean, conversational narration tone
