# NVIDIA B300 Blackwell Ultra — Narration Script

> **Duration:** ~13 minutes
> **Style:** Conversational technical explainer
> **[PAUSE]** = 1-second beat | **[BEAT]** = half-second pause
> **[EMPHASIS]** = vocal stress on the following word/phrase
> ***Italics*** = on-screen text/graphic cue

---

## SCENE 1: Hook & Introduction
**[0:00 – 0:45]**

***[Title card fades in: "NVIDIA B300 Blackwell Ultra"]***

NVIDIA just dropped their most powerful AI GPU ever. [BEAT]

The B300 — codenamed Blackwell Ultra — packs 15 petaflops of AI compute, 288 gigabytes of memory, and 208 billion transistors into a single GPU package.

***[Stats flash on screen: 15 PFLOPS | 288 GB | 208B transistors]***

But specs on a page don't tell you what actually matters. [PAUSE]

In this video, we're going to break down the B300 architecture, understand what makes it different from the B200 and H100, and — most importantly — figure out what this means if you're a developer deploying AI models in the cloud.

Let's get into it.

***[Transition: zoom into chip graphic]***

---

## SCENE 2: Why B300 Exists
**[0:45 – 1:45]**

***[GPU timeline animation: V100 → A100 → H100 → B200 → B300]***

To understand the B300, you need to understand the trend it's responding to.

AI models are [EMPHASIS] growing — fast. GPT-3 had 175 billion parameters. GPT-4 is estimated at over a trillion. And now we have reasoning models that need to "think" for extended periods, chaining multiple inference passes together.

***[Model size growth curve graphic]***

The hardware has to keep up. And for the last few generations, the bottleneck hasn't been raw compute — it's been [EMPHASIS] memory.

If your model doesn't fit in GPU memory, you need to split it across multiple GPUs. That means more hardware, more complexity, more cost.

***[Graphic: model split across GPUs vs. single GPU]***

NVIDIA calls this the "AI Factory Era" — data centers that aren't just running workloads, but [EMPHASIS] manufacturing intelligence at scale. And the B300 is built to be the core of that factory.

***[Transition: cut to comparison table]***

---

## SCENE 3: The Numbers
**[1:45 – 3:00]**

***[Animated comparison table building row by row]***

Let's look at the headline numbers, side by side.

FP4 compute: the B300 delivers 15 petaflops. That's 1.5x the B200, and [EMPHASIS] 7.5x the H100.

***[B300: 15 PFLOPS highlighted]***

Memory: 288 gigabytes of HBM3e. That's 50% more than B200's 192 gigs, and [EMPHASIS] 3.6 times the H100.

***[Memory row highlights]***

Bandwidth stays at 8 terabytes per second — same as B200, but still more than double the H100.

Now, the trade-off. [PAUSE] Power.

***[TDP row: 1,400W highlighted in amber]***

The B300 draws up to 1,400 watts. That's 200 watts more than the base Blackwell's 1,200 watts, and double the H100's 700. At rack scale, we're talking 120 to 140 kilowatts. Liquid cooling becomes mandatory.

But here's what's interesting — NVIDIA claims [EMPHASIS] 5x higher throughput per megawatt compared to Hopper. More power in, but disproportionately more intelligence out.

***[Transition: "Let's look under the hood"]***

---

## SCENE 4: Dual-Reticle Architecture
**[3:00 – 4:15]**

***[Animated exploded view of B300 package]***

Here's something most people don't realize: the B300 isn't one chip. It's [EMPHASIS] two.

***[Two dies revealed]***

There's a physical limit in chip manufacturing called the reticle size — it's the maximum area a lithography machine can expose in a single shot, about 858 square millimeters on TSMC's 4-nanometer process.

To go beyond that, NVIDIA puts two dies in one package and connects them with a custom interconnect called NV-HBI — the NVIDIA High-Bandwidth Interface.

***[NV-HBI callout: 10 TB/s]***

This runs at 10 terabytes per second, bidirectional. That's fast enough that the two dies behave as a [EMPHASIS] single GPU. Your CUDA code doesn't know or care that there are two dies underneath. Unified L2 cache, coherent memory, one device.

***[Single CUDA device highlight]***

And there's a manufacturing benefit too. Two smaller dies have better yield than one massive die. More chips per wafer, fewer defects.

***[Transition: zoom into die → tensor cores]***

---

## SCENE 5: Tensor Cores & NVFP4
**[4:15 – 5:45]**

***[Tensor core evolution graphic]***

The B300 has 640 fifth-generation tensor cores. But the generation number matters more than the count.

***[Gen 1-5 evolution table]***

Each generation brought something new. Volta introduced matrix multiply. Turing added integer precision. Ampere brought sparsity. Hopper gave us FP8 and the Transformer Engine.

Blackwell's fifth gen adds three things:

***[Bullet point animation]***

First — native [EMPHASIS] NVFP4 support. This is NVIDIA's 4-bit floating point format.

***[NVFP4 bit layout diagram]***

NVFP4 uses a clever two-level scaling system. Each block of 16 values gets a micro-scale factor in FP8. Then the entire tensor gets a macro-scale in FP32. This lets you represent weights in just 4 bits while preserving most of the accuracy.

The impact is dramatic. Compared to FP16:

***[Comparison table animates in]***

4 bits per weight instead of 16 — NVIDIA reports about 3.5x memory reduction versus FP16, and about 1.8x versus FP8. On the compute side, FP4 delivers 4x higher throughput than FP16. And the accuracy trade-off? About 1 percent or less on most benchmarks.

Here's the real-world payoff. [PAUSE]

***[Model footprint graphic]***

A 405-billion parameter model like Llama 3 in FP16 needs 810 gigabytes. That's 3 GPUs minimum. In FP4? [BEAT] 202 gigabytes. That fits on a [EMPHASIS] single B300.

***[Single GPU highlight]***

Second — 2x attention acceleration. The softmax operation in transformer attention is a bottleneck. Blackwell Ultra doubles the special function unit throughput for exponentials and division. This directly speeds up every attention layer.

Third — Tensor Memory, or TMEM. 256 kilobytes per SM of dedicated storage for intermediate matrix results. Reduces trips to main memory, especially important for Mixture of Experts models.

***[Transition: "Memory is the killer feature"]***

---

## SCENE 6: Memory Architecture
**[5:45 – 7:00]**

***[HBM3e stack animation]***

288 gigabytes. Let's understand how that's built.

***[8 stacks around two dies]***

The B300 has 8 stacks of HBM3e memory — that's High Bandwidth Memory, third generation enhanced. Each stack has [EMPHASIS] 12 layers of DRAM dies stacked vertically, 36 gigabytes each. Connected through an 8,192-bit memory interface — 4,096 bits per die.

***[Memory hierarchy pyramid]***

The memory hierarchy tells an important story. Registers are instant — zero latency. Tensor Memory is a few cycles. Shared memory and L1 cache are 20 to 30 cycles. The L2 cache — 50 megabytes shared across both dies — runs around 200 cycles.

And HBM3e? About 400 cycles. But at 8 terabytes per second, the [EMPHASIS] bandwidth makes up for it. The GPU keeps thousands of threads in flight, hiding that latency.

***[What fits in 288 GB - examples]***

For developers, 288 GB means:

Larger models on fewer GPUs. Fewer GPUs means simpler deployment, lower cost, less distributed computing headaches.

Bigger KV caches. That means longer context windows without running out of memory. Critical for reasoning models and long-document processing.

More room for batching. Higher batch sizes mean better GPU utilization, which means more tokens per second, which means lower cost per inference.

***[Transition: "But one GPU is rarely enough"]***

---

## SCENE 7: NVLink 5 & System Scale
**[7:00 – 8:15]**

***[Network topology animation]***

One B300 is impressive. But production AI runs on [EMPHASIS] clusters.

***[DGX B300 block diagram]***

The DGX B300 packs 8 B300 GPUs with 2.3 terabytes of total GPU memory. Connected by NVLink 5 through NVSwitch, with 14.4 terabytes per second of aggregate bandwidth.

NVLink 5 itself runs at 1,800 gigabytes per second per GPU — double what Hopper offered.

***[NVL72 rack visualization]***

But the real beast is the GB300 NVL72. [PAUSE]

This is a full rack: 36 Grace-Blackwell superchips, each with one Grace ARM CPU and two B300 GPUs. That's 72 B300s total.

***[NVL72 stats animate in]***

20.7 terabytes of HBM3e. 130 terabytes per second of NVLink bandwidth. [EMPHASIS] 1.1 exaflops of FP4 compute. All 72 GPUs in one NVLink domain — they can all talk to each other directly.

The power draw? 120 to 140 kilowatts per rack. Liquid cooling is not optional.

***[Transition: "Let's talk real-world performance"]***

---

## SCENE 8: Performance That Matters
**[8:15 – 9:30]**

***[Animated comparison graphics]***

Specs are nice. Performance is what you deploy. And here, NVIDIA's official numbers tell a compelling story.

***[NVIDIA performance claims]***

The B300 delivers [EMPHASIS] 1.5x more AI compute than B200 in NVFP4, and 7.5x more than H100 in FP8. Those are the raw compute gains.

At the system level, NVIDIA says the HGX B300 delivers [EMPHASIS] 11x faster inference on large language models and 7x more compute compared to the Hopper generation — with 4x more memory.

***[NVL72 performance]***

Scale up to an NVL72 rack — that's 1.1 exaflops of FP4 — and NVIDIA claims [EMPHASIS] 50x higher AI factory output versus Hopper, with 10x better latency per user.

***[Efficiency comparison]***

On efficiency, NVIDIA reports 5x higher throughput per megawatt compared to Hopper. That's the number that matters for total cost of ownership — more intelligence per dollar of electricity.

***[Transition: "So who should actually use this?"]***

---

## SCENE 9: Who Should Use B300
**[9:30 – 10:30]**

***[Use case matrix with checkmarks]***

Let's be direct about where B300 makes sense — and where it doesn't.

***[Green checks animate in]***

B300 is [EMPHASIS] ideal for: LLM inference at scale — this is the primary use case. AI reasoning and chain-of-thought workloads, where the 2x attention acceleration really shines. Multimodal AI combining vision and language. Training large foundation models. And Mixture of Experts architectures, where Tensor Memory reduces expert-switching overhead.

***[Red X marks animate in]***

B300 is [EMPHASIS] not for: Scientific computing that needs FP64 — the B300 deliberately sacrifices double-precision performance, down to just 1.2 teraflops. Graphics and rendering — no display outputs. Edge deployment — 1,400 watts isn't going on any edge device. And if you're budget-constrained or running smaller models, an H100 instance may still be the smarter choice.

***[Transition: "What does this mean for cloud developers?"]***

---

## SCENE 10: Cloud GPU Economics
**[10:30 – 11:45]**

***[Cloud availability graphic]***

This is where it gets practical. [PAUSE]

B300 instances are available now on major cloud platforms. AWS has P6-B300 instances. Azure has ND GB300 v6. More are coming.

***[Value proposition]***

The value proposition comes down to NVIDIA's own claim: 5x higher throughput per megawatt versus Hopper. That means each B300 instance handles [EMPHASIS] significantly more work than an H100, which translates directly to lower cost per inference — even if the per-hour pricing is higher.

And with 288 gigabytes of memory, you can fit models on fewer GPUs. Fewer GPUs means simpler architecture, less communication overhead, and lower total cost.

***[Decision flowchart]***

When should you choose B300 over H100 in the cloud?

Choose B300 when you're running large models — 70 billion parameters and up. When throughput and latency matter for your users. When you want to fit more model in fewer GPUs.

Stick with H100 when you're running smaller models, experimenting, or need FP64 for scientific workloads.

***[Transition: "Quick note on the software stack"]***

---

## SCENE 11: Software Stack
**[11:45 – 12:30]**

***[Software ecosystem diagram]***

Good news for developers: the software story is [EMPHASIS] seamless.

***[Compatibility checklist animates]***

Full CUDA 12 compatibility. Your existing CUDA code runs on B300 without changes.

PyTorch, TensorFlow, JAX — all supported. The inference frameworks you're probably already using — vLLM, SGLang, TensorRT-LLM — have NVFP4 support from day one.

***[Stack pyramid]***

The optimized libraries — cuDNN, cuBLAS, NCCL — are all updated for B300. NCCL in particular is NVLink 5 aware, so multi-GPU communication automatically takes advantage of the faster interconnect.

The practical takeaway: you don't need to rewrite anything. Deploy your existing models and frameworks on B300 instances, and the performance gains are largely automatic. Add NVFP4 quantization for the biggest memory and throughput improvements.

***[Transition: "Wrapping up"]***

---

## SCENE 12: Summary & What's Next
**[12:30 – 13:30]**

***[Key takeaways animate as cards]***

Let's land this with five things to remember.

***[Card 1]***
One. [EMPHASIS] 15 petaflops of FP4 compute. The single fastest AI GPU you can get today.

***[Card 2]***
Two. [EMPHASIS] 288 gigabytes of HBM3e. Fit 400-billion-plus parameter models on a single GPU.

***[Card 3]***
Three. [EMPHASIS] 2x attention acceleration. Purpose-built for the reasoning model era.

***[Card 4]***
Four. [EMPHASIS] NVFP4. About 3.5x memory reduction versus FP16 with about 1% accuracy trade-off. This changes the deployment math.

***[Card 5]***
Five. [EMPHASIS] Cloud-ready. Available now on major platforms. You don't need to buy hardware.

***[NVIDIA roadmap]***

Looking ahead — NVIDIA has already announced Vera Rubin for 2026 and Rubin Ultra for 2027. The annual cadence means today's top of the line is next year's baseline.

***[Closing graphic]***

But right now, the B300 is the most capable AI GPU available. For developers building inference-heavy applications, for startups scaling their AI products, for teams training the next generation of models — this is the hardware that makes it possible.

The AI factory era is here. The B300 is the assembly line.

***[End card: title + links]***

Thanks for watching.

---

## Script Notes

### Pronunciation Guide
- PFLOPS = "petaflops"
- HBM3e = "H-B-M three E"
- NVFP4 = "N-V-F-P four"
- NVLink = "N-V-Link"
- NV-HBI = "N-V-H-B-I"
- TMEM = "T-mem"
- SFU = "S-F-U"
- MoE = "mixture of experts" (spell out, don't say "moe")

### Word Count & Timing
- Total script: ~1,900 words
- At ~150 words/minute narration pace = ~13 minutes
- With pauses, transitions, and visual beats = ~13-14 minutes
