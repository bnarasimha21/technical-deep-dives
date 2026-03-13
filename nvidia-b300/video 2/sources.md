# Video 2: "Should You Switch to B300?" — Sources

## Official NVIDIA Sources

1. **MLPerf v5.1 Inference Benchmarks**
   - DeepSeek-R1 671B, Llama 405B, Llama 8B per-GPU throughput numbers
   - https://developer.nvidia.com/blog/nvidia-blackwell-ultra-sets-new-inference-records-in-mlperf-debut/

2. **MLPerf Training v5.1 Benchmarks**
   - Llama 405B pretraining: 4x over Hopper at same GPU count
   - Llama 2 70B LoRA fine-tuning: ~5x over Hopper
   - https://blogs.nvidia.com/blog/mlperf-training-benchmark-blackwell-ultra/

3. **Cost & Efficiency Claims (SemiAnalysis InferenceX Data)**
   - Up to 35x lower cost per million tokens at low latency vs Hopper
   - Up to 50x higher throughput per megawatt vs Hopper
   - https://blogs.nvidia.com/blog/data-blackwell-ultra-performance-lower-cost-agentic-ai/

4. **Inference Provider Cost Reductions**
   - DeepInfra: $0.20/M tokens (Hopper) → $0.05/M tokens (Blackwell) — 4x reduction
   - https://blogs.nvidia.com/blog/inference-open-source-models-blackwell-reduce-cost-per-token/

5. **B300 Architecture Deep Dive**
   - Specs, NVFP4, 5th-gen Tensor Cores, attention acceleration, memory architecture
   - https://developer.nvidia.com/blog/inside-nvidia-blackwell-ultra-the-chip-powering-the-ai-factory-era/

6. **NVFP4 Precision Format**
   - Two-level scaling, accuracy benchmarks, memory savings
   - https://developer.nvidia.com/blog/introducing-nvfp4-for-efficient-and-accurate-low-precision-inference/

## Derived / Calculated Data

7. **Model Fitting Math**
   - Based on parameter count × bytes per weight
   - 70B params × 0.5 bytes (FP4) = 35 GB → fits single B300 (288 GB) with 253 GB spare
   - 405B params × 0.5 bytes (FP4) = ~202 GB → fits single B300
   - 405B params × 1 byte (FP8) = 405 GB → needs 2 GPUs
   - 405B params × 2 bytes (FP16) = 810 GB → needs 3 GPUs

## Data Points Used in Video

| Data Point | Source # | Verified |
|------------|----------|----------|
| DeepSeek-R1: 5,842 tokens/sec/GPU (B300 offline) | 1 | |
| DeepSeek-R1: 1,253 tokens/sec/GPU (H200 offline) | 1 | |
| Llama 405B: 224 tokens/sec/GPU (B300 offline) | 1 | |
| Llama 8B: 18,370 tokens/sec/GPU (B300 offline) | 1 | |
| Training 405B: 4x over Hopper same GPU count | 2 | |
| Fine-tuning 70B LoRA: ~5x over Hopper | 2 | |
| 35x lower cost/M tokens at low latency vs Hopper | 3 | |
| 50x throughput per megawatt vs Hopper | 3 | |
| DeepInfra 4x cost reduction | 4 | |
| 15 PFLOPS FP4 dense | 5 | |
| 288 GB HBM3e | 5 | |
| 2x attention acceleration | 5 | |
| NVFP4 ~1% accuracy trade-off | 6 | |
| Model fitting calculations | 7 | |
