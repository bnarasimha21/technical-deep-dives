# Workato x DigitalOcean Customer Story - Script

**Video Length:** ~5.5 minutes (approx. 825 words)
**Format:** 1920x1080, 30fps
**Style:** Conversational story-driven (Problem > Solution > Results)
**Music Suggestion:** Ambient electronic with a slow build — starts reflective/tense during the problem, opens up during the solution, becomes confident/uplifting during results. Think: Tycho, Hammock, or corporate-cinematic ambient.

---

## Scene 1: The Hook (0:00 - 0:20)

**[VISUAL: Bold stat reveal — "1 TRILLION" workloads, Workato + DigitalOcean + NVIDIA co-branding. "March 3, 2026" date badge.]**

**VOICEOVER:**
Workato processes one trillion automated workloads every year. Their AI Research Lab was building the next generation of agentic AI — intelligent systems that reason, plan, and act autonomously. But to make that production-ready, they needed inference infrastructure that could keep up. This is the story of how DigitalOcean, Workato, and NVIDIA came together to make it happen.

---

## Scene 2: Setting the Stage — Who is Workato? (0:20 - 0:55)

**[VISUAL: Workato branding, animated icons representing automation/integration, enterprise scale]**

**VOICEOVER:**
Workato is the leading enterprise automation platform. They connect apps, automate workflows, and power business processes for some of the world's largest companies. But they weren't just automating tasks — their AI Research Lab was pushing into agentic AI, building systems that go beyond simple prompts. These agents need to understand long, complex contexts — we're talking prompts with a hundred thousand tokens — and respond fast enough for real-time enterprise workflows.

---

## Scene 3: The Problem (0:55 - 1:50)

**[VISUAL: Animated visualization of scaling challenges — GPU utilization bars, latency spikes, cost meters climbing. Technical callout: quadratic attention complexity]**

**VOICEOVER:**
Here's the challenge. When you're running large language models at enterprise scale, every millisecond of latency and every wasted GPU cycle hits your bottom line. And long-context workloads make this exponentially harder. A hundred-thousand-token prompt requires roughly ten billion attention operations during the prefill phase. That's quadratic complexity — and it crushes GPU throughput.

The result? Redundant computation across your cluster. GPUs doing the same prefill work over and over. Latency climbing. Costs spiraling. For Workato, this wasn't a theoretical problem — it was blocking their path to production-ready agentic AI.

---

## Scene 4: The Solution — Agentic Inference Cloud (1:50 - 3:10)

**[VISUAL: Architecture diagram animation — DigitalOcean cloud, NVIDIA Dynamo orchestration, KV-aware routing flow, GPU nodes. Build up layer by layer. Reference: Workato Architecture diagram PNG, KV-aware routing graph from visual assets.]**

**VOICEOVER:**
In a joint effort, DigitalOcean, Workato, and NVIDIA came together to solve this. Workato deployed on DigitalOcean's Agentic Inference Cloud — a purpose-built inference stack running on DigitalOcean Kubernetes Service, powered by NVIDIA Hopper GPUs.

The hardware foundation: NVIDIA H200 GPUs with 141 gigabytes of HBM3e memory — enough to hold a full large language model and its hundred-thousand-token context in a single GPU. The team deployed 8-way tensor parallelism per node for optimal throughput and latency stability.

But the real breakthrough was KV-aware routing. Here's how it works: when multiple requests share common input prefixes — which happens constantly in agentic workflows — KV-aware routing directs them to the same GPU. That GPU already has a warm KV cache from the previous request, so it can skip the expensive prefill phase entirely.

NVIDIA Dynamo sits at the orchestration layer — a global scheduler with full cluster visibility. Instead of each node working in isolation, Dynamo prevents redundant computation by intelligently routing requests to the right GPU at the right time. Same hardware. Dramatically better performance.

---

## Scene 5: The Results (3:10 - 4:25)

**[VISUAL: Animated metric cards revealing one by one. Show benchmark graphs: Token Throughput comparison chart, Median TTFT graph, Median TPOT graph, P50 latency graph — reference visual assets from performance data spreadsheet (Sheet 10).]**

**VOICEOVER:**
The results speak for themselves.

Sixty-seven percent higher throughput per GPU — from 8,111 tokens per second to 13,561 tokens per second on the same hardware. You can see it clearly in the token throughput comparison.

Seventy-nine percent faster time-to-first-token — 1,455 milliseconds under high load. Look at the TTFT benchmark — that's the difference between an agent that feels instant and one that feels sluggish.

Sixty-seven percent lower inference costs — down to 77 cents per million tokens. At Workato's scale, processing a trillion workloads annually, that's transformational.

And perhaps most importantly — time-to-value accelerated by more than 2X. What used to take weeks of infrastructure setup and tuning was reduced to days.

This isn't a benchmark on a whiteboard. This is production-ready AI inference at scale.

---

## Scene 6: The Bigger Picture (4:25 - 5:05)

**[VISUAL: Expanding view — from Workato's use case to the broader industry. Three-way partnership: DigitalOcean + Workato + NVIDIA logos together. "Powering the Agentic Enterprise" tagline. Cloud infrastructure visualization.]**

**VOICEOVER:**
On March 3rd, 2026, DigitalOcean, Workato, and NVIDIA jointly announced this partnership — a signal that production-ready agentic AI is here. What they proved together is that intelligent infrastructure design — the right hardware, smart routing, and cloud-native orchestration — can fundamentally change the economics of AI inference. Not just faster models, but smarter infrastructure that powers the agentic enterprise and makes every GPU count.

---

## Scene 7: Closing & CTA (5:05 - 5:30)

**[VISUAL: Co-branded closing card — DigitalOcean + Workato logos. URL/QR code to blog post or landing page. Clean, confident typography.]**

**VOICEOVER:**
DigitalOcean's Agentic Inference Cloud — powering Workato's agentic enterprise with production-scale AI from NVIDIA. Read the full technical deep dive at digitalocean.com, or get started building today.

---

## Production Notes

- **Total word count:** ~820 words (~5:30 at natural narration pace)
- **Scene transitions:** Smooth crossfades with slight overlap to maintain flow
- **Color palette:** DigitalOcean blue (#0069FF) + Workato purple/magenta — gradient interplay
- **Typography:** Clean sans-serif (Inter or similar), bold for metrics, light for narration support text
- **Data visualizations:** Animate in from zero to final value for impact
- **Architecture diagram:** Build up progressively as voiceover explains each layer
