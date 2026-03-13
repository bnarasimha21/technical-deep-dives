# 77% Faster LLM Inference: How Workato AI Lab Uses KV-Aware Routing

| Field | Value |
|-------|-------|
| Video Length | ~4:45 (approx. 700 words) |
| Format | 1920x1080, 30fps |

---

## Scene 0: The Hook

**Visual Direction:**
Dark screen. Quick stat flashes - "77% faster TTFT", "67% lower cost", "40% fewer GPUs" - alternating positions with punchy scale-in animations. Show two-column comparison: left and right columns (3 columns) each show a GPU icon (pop up on "Same GPUs") and a model icon underneath (pop up on "Same model"). The left columns gets a red turtle icon, the right columns gets a green rabbit icon. Right column pulses with "77% faster TTFT", "67% lower cost", "40% fewer GPUs" respectively above it.

**Voiceover:**
Same GPUs. Same model. But this one has seventy-seven percent faster time-to-first-token, sixty seven percent lower cost and 40% fewer GPUs. How?

It comes down to a single infrastructure trick, implemented for a company that's pushing LLMs to the limit.

---

## Scene 1: The Problem

**Visual Direction:**
Three phases:
- Phase 1: "Who is Workato AI Research Lab" - company context cards: enterprise automation leader, thousands of global customers, 1T tasks/year, AI Research Lab pushing into agentic AI.
- Phase 2: "How LLMs Process Requests" - two-column comparison showing Prefill (compute-heavy, reads entire prompt) vs Decode (memory-bound, generates tokens).
- Phase 3: The redundancy problem - GPU bars showing 80%+ wasted on repeated prefill, O(n²) callout.

**Voiceover:**
Workato AI Research Lab connects and orchestrates enterprise data, processes, and applications, serving thousands of customers globally running over a trillion tasks per year. They are pushing into agentic AI, building agents that execute work across entire organizations.

Powering agents at this scale requires significant inference capacity, but if you're not smart about how you set it up, much of that capacity goes to waste. And wasted capacity means wasted money.

To understand the problem, you need to know how LLMs process requests. Every request goes through two phases. First, prefill: the model reads your entire input prompt and builds internal memory called KV Cache. This phase is compute-heavy and scales quadratically with prompt length. Then, decode: the model generates tokens one at a time using those cached values.

For agentic and business-oriented applications, a fundamental challenge exists at the prefill stage. Every request carries long system prompts, tool definitions, and multi-turn conversation history. At Workato AI Lab, these prompts run to a hundred thousand tokens. Because prefill scales quadratically, doubling the prompt length roughly quadruples the compute required. And much of this prefill work is repeated across requests. The system prompts, tool definitions, and shared context are identical every time, meaning GPUs are recalculating the same KV values over and over.

This wastes GPU capacity, cycles, and ultimately, money.

Workato AI Lab needed to power their agentic workload on as few GPUs as possible. Without optimization, serving it would require roughly ten GPUs. The question was whether smarter infrastructure could close that gap.

---

## Scene 3: KV-Aware Routing Deep Dive

**Visual Direction:**
- Phase 1: Animated infrastructure build-up (DOKS cluster, worker nodes, H200 GPUs, tensor parallelism), then crossfade to architecture image when NVIDIA Dynamo is mentioned. Three explanation cards (Global Orchestration, Shared Prefix Detection, Warm Cache Routing) appear alongside the architecture image.
- Phase 2: A/B comparison setup, two side-by-side cards: Config A (vLLM alone, blind globally) vs Config B (NVIDIA Dynamo + vLLM, KV-aware routing) with animated request routing diagrams.
- Phase 3: Cost function formula visual: cost = overlap_score x prefill_blocks + decode_blocks, showing how NVIDIA Dynamo scores each GPU before routing.
- Phase 4: Result cards.

**Voiceover:**
For their agentic AI workload, Workato AI Lab chose DigitalOcean Kubernetes Service with interconnected NVIDIA H200 GPUs and eight-way tensor parallelism across each worker node. But fast hardware alone doesn't eliminate redundant computation. That's where NVIDIA Dynamo comes in.

NVIDIA Dynamo is a global inference orchestrator with full cluster visibility. When multiple requests share common input prefixes (which happens constantly in agentic workflows) NVIDIA Dynamo routes them to the same GPU that already has a warm KV cache, a stored copy of the processed prompt data from the previous request. So it skips the expensive prefill phase entirely. No redundant computation. No wasted cycles.

Two configurations. Same hardware, same model. The only difference: one routes requests at random, where each GPU makes smart local decisions but has no idea what the others are doing. The other uses NVIDIA Dynamo's KV-aware routing with full cluster visibility and cache-aware scheduling.

Under the hood, NVIDIA Dynamo scores every GPU for each incoming request, weighing how much prefill work it can skip against how busy that GPU is with decoding. It's not just a load balancer. It's a state-aware scheduler.

The result: same hardware, dramatically better performance. No code changes, no new models, just smarter infrastructure.

Let's look at the numbers.

---

## Scene 4: The Benchmarks

**Visual Direction:**
Opens directly with four benchmark graphs cycling through with crossfade. Each graph fills the left side with an explanation card on the right. Ends with "40% fewer GPUs" impact summary.

**Voiceover:**
Token throughput: sixty-seven percent higher. 13,561 tokens per second versus 8,111 on the same hardware.

Time-to-first-token: seventy-seven percent faster. 1,455 milliseconds versus nearly 6,500 at 32 concurrent requests.

Time per output token stays flat under load, no degradation even as you scale.

End-to-end P50 latency (the median response time): 14 seconds versus nearly 70 at peak concurrency.

All benchmarks run on Llama 3.3 70B with FP8 quantization: compressing the model to 8-bit precision so it runs faster with minimal accuracy loss.

What does that mean in practice?

Forty percent fewer GPUs to serve the same workload. A deployment that needed 10 GPUs now runs on 6. And the bottom line: sixty-seven percent lower inference cost, 77 cents per million tokens at Workato AI Lab's trillion-workload scale.

---

## Scene 5: Closing

**Visual Direction:**
Clean co-branded closing. DigitalOcean + Workato AI Lab + NVIDIA. CTA: link to blog post.

**Voiceover:**
As agentic workloads scale, smart infrastructure becomes the difference between wasting capacity and building efficiently. Read the full blog for more details. Link below.
