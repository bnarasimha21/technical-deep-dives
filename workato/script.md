# 77% Faster LLM Inference: How Workato Uses KV-Aware Routing

**Video Length:** ~4:45 (approx. 700 words)
**Format:** 1920x1080, 30fps
**Style:** Technical deep dive, lead with the infrastructure problem and solution, not the partnership
**Music Suggestion:** Ambient electronic with a slow build: tense during problem, opens during solution, confident during benchmarks.

---

## Scene 0: The Hook (0:00 - 0:17)

**[VISUAL: Dark screen. Quick stat flashes - "77% faster TTFT", "67% lower cost", "40% fewer GPUs" - alternating positions with punchy scale-in animations. Ends with: "You don't need a new GPU. You need smarter routes." Then show two-column comparison: left and right columns each show a GPU icon (pop up on "Same GPUs") and a model icon underneath (pop up on "Same model"). Left column gets a red turtle icon, right column gets a green rabbit icon. Right column pulses with "77% faster TTFT" above it. No co-branding, pure technical hook.]**

**VOICEOVER:**
Same GPUs. Same model. But this one has seventy-seven percent faster time-to-first-token. How? It comes down to a single infrastructure trick, implemented for a company that's pushing LLMs to the limit.

---

## Scene 1: The Problem (0:17 - 1:25)

**[VISUAL: Three phases. Phase 1 (0:17-0:35): "Who is Workato" - company context cards: enterprise automation leader, thousands of global customers, 1T workloads/year, AI Research Lab pushing into agentic AI. Phase 2 (0:35-0:55): "How LLMs Process Requests" - two-column comparison showing Prefill (compute-heavy, reads entire prompt) vs Decode (memory-bound, generates tokens). Phase 3 (0:55-1:25): The redundancy problem - GPU bars showing 80%+ wasted on repeated prefill, O(n²) callout.]**

**VOICEOVER:**
Workato connects and orchestrates enterprise data, processes, and applications, serving thousands of customers globally, running over a trillion tasks per year. Their AI Research Lab is pushing into agentic AI, building agents that execute work across entire organizations. Powering agents at this scale requires significant inference capacity, but if you're not smart about how you set it up, much of that capacity goes to waste. And wasted capacity means wasted money.

To understand the problem, you need to know how LLMs process requests. Every request goes through two phases. First, prefill: the model reads your entire input prompt and builds the KV cache. This phase is compute-heavy and scales quadratically with prompt length. Then, decode: the model generates tokens one at a time using those cached values.

For agentic and business-oriented applications, a fundamental challenge exists at the prefill stage. Every request carries long system prompts, tool definitions, and multi-turn conversation history. At Workato, these prompts run to a hundred thousand tokens. Because prefill scales quadratically, doubling the prompt length roughly quadruples the compute required. And much of this prefill work is repeated across requests. The system prompts, tool definitions, and shared context are identical every time, meaning GPUs are recalculating the same KV values over and over. This wastes GPU capacity, cycles, and ultimately, money. Workato needed to power their agentic workload on as few GPUs as possible. Without optimization, serving it would require roughly ten GPUs. The question was whether smarter infrastructure could close that gap.

---

## Scene 2: KV-Aware Routing Deep Dive (1:25 - 2:30)

**[VISUAL: Architecture diagram briefly showing DOKS cluster + H200 GPUs, then transitions to KV-aware routing diagram (existing PNG) on the left. Three explanation cards on the right, appearing sequentially. Cost function formula visual - "cost = overlap_score × prefill_blocks + decode_blocks" - showing how Dynamo scores each GPU before routing. Result cards.]**

**VOICEOVER:**
For their agentic AI workload, Workato chose DigitalOcean Kubernetes Service with interconnected NVIDIA H200 GPUs and eight-way tensor parallelism across each worker node. But fast hardware alone doesn't eliminate redundant computation. That's where NVIDIA Dynamo comes in. Dynamo is an open-source inference orchestrator with full cluster visibility. When multiple requests share common input prefixes (which happens constantly in agentic workflows) Dynamo routes them to the same GPU.

That GPU already has a warm KV cache, a stored copy of the processed prompt data from the previous request. So it skips the expensive prefill phase entirely. No redundant computation. No wasted cycles.

Under the hood, Dynamo scores every GPU for each incoming request, weighing how much prefill work it can skip against how busy that GPU is with decoding. It's not a blind load balancer. It's a state-aware scheduler.

The result: same hardware, dramatically better performance. No code changes, no new models, just smarter infrastructure. Let's look at the numbers.

---

## Scene 3: The Benchmarks (2:30 - 4:00)

**[VISUAL: Opens with A/B comparison setup, two side-by-side cards: "Config A: vLLM alone (smart locally, blind globally)" vs "Config B: Dynamo + vLLM (KV-aware routing)". Then four benchmark graphs cycling through with crossfade. Each graph fills left side with explanation card on the right. Closes with "40% fewer GPUs" callout.]**

**VOICEOVER:**
Two configurations. Same hardware, same model. The only difference: one routes requests at random, where each GPU makes smart local decisions but has no idea what the others are doing. The other uses Dynamo's KV-aware routing with full cluster visibility and cache-aware scheduling.

Llama 3.3 70B with FP8 quantization, compressing the model to 8-bit precision so it runs faster with minimal accuracy loss.

Token throughput: sixty-seven percent higher. 13,561 tokens per second versus 8,111 on the same hardware.

Time-to-first-token: seventy-seven percent faster. 1,455 milliseconds versus nearly 6,500 at 32 concurrent requests.

Time per output token stays flat under load, no degradation even as you scale.

End-to-end P50 latency (the median response time): 14 seconds versus nearly 70 at peak concurrency.

What does that mean in practice? Forty percent fewer GPUs to serve the same workload. A deployment that needed 10 GPUs now runs on 6. And the bottom line: sixty-seven percent lower inference cost, 77 cents per million tokens at Workato's trillion-workload scale.

---

## Scene 4: Closing (4:00 - 4:20)

**[VISUAL: Clean co-branded closing. DigitalOcean + Workato + NVIDIA. CTA: setup guide and benchmark reproduction steps.]**

**VOICEOVER:**
Want to try this yourself? Full setup guide and benchmark reproduction steps linked below. Built on DigitalOcean, powered by NVIDIA Dynamo.

---

## Production Notes

- **Total word count:** ~690 words (~4:45 at natural narration pace)
- **Scene transitions:** Smooth crossfades with slight overlap
- **Color palette:** DigitalOcean blue (#0069FF) + Workato purple, gradient interplay
- **Typography:** Inter (headings/body) + JetBrains Mono (technical labels)
- **Key shift from v1:** Technical deep dive angle, not corporate customer story. Lead with the problem and solution, partnership is context.
- **Benchmark data source:** NVIDIA Dynamo v0.4.1 benchmarking with vLLM, Llama-3.3-70B-Instruct-FP8
