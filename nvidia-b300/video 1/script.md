# NVIDIA B300 Blackwell Ultra

## 1: Hook & Introduction

Every generation of AI has been defined by its hardware. GPT-2 ran on V100s. GPT-3 needed A100s. The largest models today need clusters of H100s.

***[Flash GPU images as mentioned: V100 → A100 → H100 → B300]***

The B300, also known as Blackwell Ultra, is NVIDIA's latest datacenter GPU, purpose-built for AI training and inference. It packs 15 petaflops of AI compute, 288 gigabytes of memory, and 208 billion transistors into a single GPU package.

***[Stats flash on screen: 15 PFLOPS | 288 GB | 208B transistors]***

But specs on a page don't tell you what actually matters.

In this video, we're going to break down the B300 architecture, understand what makes it different from the B200 and H100, and most importantly, figure out what this means if you're a developer deploying AI models in the cloud.

Let's get into it.

---

## 2: Why B300 Exists

***[GPU timeline animation: V100 → A100 → H100 → B200 → B300]***

To understand the B300, you need to understand the trend it's responding to.

AI models are growing fast. GPT-3 had 175 billion parameters. GPT-4 is estimated at over a trillion. And now we have reasoning models that need to "think" for extended periods, chaining multiple inference passes together.

The hardware has to keep up. And for the last few generations, the bottleneck hasn't been raw compute. It's been memory.

The reality is, the best models available today do not fit on a single GPU. When you split a model across multiple GPUs, that means more hardware, more complexity, more cost.

***[Graphic: model split across GPUs vs. single GPU]***

NVIDIA's vision is that data centers are becoming AI factories, infrastructure designed specifically to produce AI outputs at massive scale. The B300 is built to be the engine of that factory.

NVIDIA made deliberate trade-offs with the B300. They prioritized memory capacity, assuming models will keep getting bigger. They invested in NVFP4, betting that 4-bit precision is good enough for production. And they doubled down on NVLink bandwidth for multi-GPU scaling, anticipating that Mixture of Experts architectures are the future. Every design choice points in one direction: large-scale AI inference and training.

***[Transition: cut to comparison table]***

---

## 3: The Numbers

***[Animated comparison table building row by row]***

Let's look at the headline numbers, side by side.

FP4 compute: the B300 delivers 15 petaflops. That's 1.5x the B200, and 7.5x the H100, which is NVIDIA's previous-generation Hopper architecture, the GPU that's been the workhorse of AI for the last two years.

***[B300: 15 PFLOPS highlighted]***

Memory: 288 gigabytes of HBM3e. That's 50% more than B200's 192 gigs, and 3.6 times the H100. To put that in perspective, DeepSeek-R1 at 671 billion parameters needs about 383 gigabytes in NVFP4. That fits on just 2 B300s, versus 9 H100s.

***[Memory row highlights]***

Bandwidth stays at 8 terabytes per second, same as B200, but still more than double the H100.

Now, the trade-off. Power.

***[TDP row: 1,400W highlighted in amber]***

The B300 draws up to 1,400 watts. That's 200 watts more than the base Blackwell's 1,200 watts, and double the H100's 700. At rack scale, an 8-GPU system draws about 14 kilowatts. Air-cooled configurations are available, though higher-density deployments may require liquid cooling.

But here's what's interesting. NVIDIA claims 5x higher throughput per megawatt compared to Hopper. More power in, but each watt delivers significantly more useful AI work.

***[Transition: "Let's look under the hood"]***

---

## 4: Dual-Reticle Architecture

***[Animated exploded view of B300 package]***

Here's something most people don't realize: the B300 isn't one chip. It's two.

***[Two dies revealed]***

There's a physical limit in chip manufacturing called the reticle size. In lithography, the process used to print circuits onto silicon, a machine can only expose a certain area in a single shot, about 858 square millimeters on TSMC's 4-nanometer process.

To go beyond that, NVIDIA puts two dies in one package and connects them with a custom interconnect called NV-HBI, the NVIDIA High-Bandwidth Interface.

***[NV-HBI callout: 10 TB/s]***

This runs at 10 terabytes per second, bidirectional. That's fast enough that the two dies behave as a single GPU. Your CUDA code doesn't know or care that there are two dies underneath. The two chips share a unified 192-megabyte L2 cache and maintain coherent memory across both dies. For all intents and purposes, software sees it as a single device.

***[Single CUDA device highlight]***

And there's a manufacturing benefit too. Because each die is smaller, NVIDIA gets better manufacturing yield, more usable chips per silicon wafer and fewer defects. That also means potentially better supply availability compared to a single massive die.

The dual-die approach is itself a design choice. NVIDIA chose to push beyond the reticle limit rather than accept smaller chips, because they believed AI workloads would need every transistor they could fit.

***[Transition: zoom into die → tensor cores]***

---

## 5: Tensor Cores & NVFP4

***[Tensor core evolution graphic]***

The B300 has 640 fifth-generation tensor cores. But the generation number matters more than the count.

***[Gen 1-5 evolution table]***

Each generation brought something new. Volta introduced matrix multiply. Turing added integer precision. Ampere brought sparsity. Hopper gave us FP8 and the Transformer Engine.

Most production models today run in FP8. NVFP4 is the next step, trading a small amount of accuracy for nearly double the throughput and memory savings.

Blackwell's fifth gen adds three things:

***[Bullet point animation]***

First, native NVFP4 support. This is NVIDIA's 4-bit floating point format.

***[NVFP4 bit layout diagram]***

NVFP4 uses a clever two-level scaling system. Each block of 16 values gets a micro-scale factor in FP8. Then the entire tensor gets a macro-scale in FP32. This lets you represent weights in just 4 bits while preserving most of the accuracy.

***[Diagram: 16 weights in FP4 (4 bits each) + 1 FP8 micro-scale factor + 1 FP32 macro-scale factor]***

The impact is dramatic.

***[Comparison table animates in]***

Lets campare with FP16: 4 bits per weight instead of 16. NVIDIA reports about 3.5x memory savings versus FP16, and about 1.8x versus FP8. On the compute side, FP4 delivers 4x higher throughput than FP16. And the accuracy trade-off? About 1 percent or less on most benchmarks.

Here's the real-world payoff.

***[Model footprint graphic]***

A 671-billion parameter model like DeepSeek-R1 in FP16 needs 1,342 gigabytes. That's 17 H100s. Even in FP8, you still need 9 H100s. But with NVFP4 on B300? About 383 gigabytes. That fits on just 2 B300s.

***[GPU comparison: 9× H100 vs 2× B300]***

9 GPUs down to 2. That's less hardware, less communication overhead, simpler deployment, and potentially lower total serving cost.

Second, The B300 also doubles attention calculation speed. The softmax operation in transformer attention is a well-known bottleneck, and Blackwell Ultra doubles the special function unit throughput for the exponential and division operations that softmax relies on. This directly speeds up every attention layer.

Third, Tensor Memory, or TMEM. 256 kilobytes per SM of dedicated storage for intermediate matrix results. Reduces trips to main memory, especially important for Mixture of Experts models.

***[Transition: "Memory is the killer feature"]***

---

## 6: Memory Architecture

***[HBM3e stack animation]***

288 gigabytes. Let's understand how that's built.

***[8 stacks around two dies]***

The B300 has 8 stacks of HBM3e memory, that's High Bandwidth Memory, third generation enhanced. Each stack has 12 layers of DRAM dies stacked vertically, 36 gigabytes each. Connected through an 8,192-bit memory interface, 4,096 bits per die. With 8 terabytes per second of bandwidth, the B300 can feed data to its tensor cores fast enough to keep up with the compute.

***[What fits in 288 GB - examples]***

For developers, 288 GB means:

Larger models on fewer GPUs. Fewer GPUs means simpler deployment, lower cost, less distributed computing headaches.

Bigger KV caches. That means longer context windows without running out of memory. Critical for reasoning models and long-document processing.

More room for batching. Higher batch sizes mean better GPU utilization, which means more tokens per second, which means lower cost per inference.

***[Transition: "But one GPU is rarely enough"]***

---

## 7: Multi-GPU Scaling

***[Network topology animation]***

One B300 is impressive. But production AI runs on multi-GPU servers.

***[8-GPU node diagram]***

A typical B300 server packs 8 GPUs into a single node, paired with Intel Xeon processors and 2 terabytes of system memory. That gives you over 2 terabytes of total GPU memory, enough to run even the largest models without splitting across nodes.

At the system level, you get 108 petaflops of dense FP4 compute, or 144 petaflops with sparsity. For FP8 training workloads, that's 72 petaflops. The whole system draws about 14 kilowatts.

Inside the node, two fifth-generation NVSwitch chips connect all 8 GPUs over NVLink 5 at 1,800 gigabytes per second per GPU, double what Hopper offered. That's 14.4 terabytes per second of aggregate bandwidth, which dramatically improves synchronization speed for tensor parallelism.

***[Multi-node scaling graphic]***

For even larger workloads, you connect multiple nodes over high-speed networking, up to 800 gigabits per second InfiniBand or Ethernet using NVIDIA ConnectX-8. NVLink handles the fast communication within a node, and the network handles communication between nodes.

This two-tier architecture, NVLink inside and high-speed networking outside, is how most cloud providers deploy B300 at scale.

***[Transition: "Let's talk real-world performance"]***

---

## 8: Performance That Matters

***[Animated comparison graphics]***

Specs are nice. Performance is what you deploy. And here, NVIDIA's official numbers tell a compelling story.

***[NVIDIA performance claims]***

The B300 delivers 1.5x more AI compute than B200 in NVFP4, and 7.5x more than H100 in FP8. Those are the raw compute gains per GPU.

At the 8-GPU system level, NVIDIA says B300 servers deliver 11x faster inference on large language models and 7x more compute compared to the Hopper generation, with 3.6x more memory.

***[Efficiency comparison]***

On efficiency, NVIDIA reports 5x higher throughput per megawatt compared to Hopper. That's the number that matters for total cost of ownership. Each watt delivers significantly more useful AI work than the previous generation. For cloud customers renting GPU instances, this translates to more AI throughput per GPU-hour, meaning you can serve more requests or run larger models on fewer instances.

***[End card: title + links]***

That wraps up our deep dive into the B300 architecture. In the next video, we'll cover who should actually switch to B300, the real-world economics, and the software stack.

Thanks for watching.
