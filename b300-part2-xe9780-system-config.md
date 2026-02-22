# NVIDIA B300 Part 2: Dell XE9780 System Configuration

> Extension of the B300 GPU deep dive video - focusing on the full server configuration

## System Architecture Overview

### Hardware Configuration

| Component | Specification |
|-----------|---------------|
| **Server** | Dell PowerEdge XE9780 |
| **GPUs** | 8x NVIDIA B300 (Blackwell architecture) |
| **GPU Memory** | 192GB HBM3e per GPU (1.5TB total) |
| **CPU** | Dual Intel Xeon Scalable (6th Gen, Granite Rapids) |
| **Intra-node** | NVLink 5.0 (1.8 TB/s bidirectional) |
| **Inter-node** | 800 Gbps RoCEv2 (RDMA over Converged Ethernet) |

### B300 GPU Specifications (per GPU)

- **FP8 Performance**: 2.25 PFLOPS
- **FP16/BF16**: 1.125 PFLOPS  
- **FP32**: 562.5 TFLOPS
- **Memory Bandwidth**: 8 TB/s HBM3e
- **TDP**: 700W (liquid cooled configuration)
- **Transistors**: 208 billion
- **Architecture**: Blackwell (5th gen Tensor Cores)

### 8-GPU System Aggregate Performance

| Metric | Per GPU | 8-GPU Total |
|--------|---------|-------------|
| FP8 | 2.25 PFLOPS | **18 PFLOPS** |
| FP16/BF16 | 1.125 PFLOPS | **9 PFLOPS** |
| HBM3e Memory | 192GB | **1.5TB** |
| Memory Bandwidth | 8 TB/s | **64 TB/s** |

---

## NVLink 5.0 Topology

### Intra-Node Communication

NVLink 5.0 provides direct GPU-to-GPU communication without CPU involvement:

```
┌─────────────────────────────────────────────────────────────┐
│                    NVLink 5.0 Mesh                          │
│                                                             │
│   GPU0 ←──────→ GPU1 ←──────→ GPU2 ←──────→ GPU3           │
│     ↑             ↑             ↑             ↑             │
│     │             │             │             │             │
│     ↓             ↓             ↓             ↓             │
│   GPU4 ←──────→ GPU5 ←──────→ GPU6 ←──────→ GPU7           │
│                                                             │
│   Each link: 450 GB/s bidirectional                         │
│   Total bisection bandwidth: 1.8 TB/s                       │
└─────────────────────────────────────────────────────────────┘
```

### NVLink Bandwidth Comparison

| Generation | Per Link | Links/GPU | Total/GPU |
|------------|----------|-----------|-----------|
| NVLink 3.0 (A100) | 50 GB/s | 12 | 600 GB/s |
| NVLink 4.0 (H100) | 50 GB/s | 18 | 900 GB/s |
| **NVLink 5.0 (B300)** | **50 GB/s** | **18** | **900 GB/s** |

*Note: B300 uses NVLink 5.0 with improved efficiency and lower latency*

---

## RoCEv2 Inter-Node Networking

### 800 Gbps Configuration

```
┌──────────────────┐     800G RoCEv2      ┌──────────────────┐
│   XE9780 Node 1  │◄────────────────────►│   XE9780 Node 2  │
│   8x B300 GPUs   │                      │   8x B300 GPUs   │
└──────────────────┘                      └──────────────────┘
        │                                         │
        │              Spine Switch               │
        └─────────────►   (800G)  ◄───────────────┘
                           │
        ┌──────────────────┼──────────────────┐
        ▼                  ▼                  ▼
   ┌─────────┐       ┌─────────┐       ┌─────────┐
   │ Node 3  │       │ Node 4  │       │ Node N  │
   └─────────┘       └─────────┘       └─────────┘
```

### Network Interface Configuration

Each XE9780 typically includes:
- 2x NVIDIA ConnectX-7 (400G each) or
- 1x NVIDIA ConnectX-8 (800G)
- RDMA-capable for GPUDirect RDMA

---

## Software Stack Setup

### 1. Driver and CUDA Installation

```bash
# Check current driver
nvidia-smi

# Expected output for B300
# Driver Version: 560.xx or higher
# CUDA Version: 12.6+

# Verify all 8 GPUs visible
nvidia-smi -L
# GPU 0: NVIDIA B300 (UUID: GPU-xxxx)
# GPU 1: NVIDIA B300 (UUID: GPU-xxxx)
# ... (8 total)
```

### 2. NVLink Topology Verification

```bash
# Check NVLink status
nvidia-smi nvlink --status

# Check NVLink topology
nvidia-smi topo -m

# Expected output (simplified):
#         GPU0  GPU1  GPU2  GPU3  GPU4  GPU5  GPU6  GPU7
# GPU0     X    NV18  NV18  NV18  NV18  NV18  NV18  NV18
# GPU1    NV18   X    NV18  NV18  NV18  NV18  NV18  NV18
# ...
# NV18 = NVLink with 18 links
```

### 3. NCCL Configuration

```bash
# Install NCCL
sudo apt-get install libnccl2 libnccl-dev

# Environment variables for optimal performance
export NCCL_DEBUG=INFO
export NCCL_IB_DISABLE=0
export NCCL_NET_GDR_LEVEL=5
export NCCL_P2P_LEVEL=NVL  # Force NVLink
```

---

## Practical Examples

### Example 1: NVLink Bandwidth Test

```python
# nvlink_bandwidth_test.py
import torch
import time

def test_nvlink_bandwidth():
    """Test GPU-to-GPU bandwidth via NVLink"""
    
    # Allocate large tensors on different GPUs
    size_gb = 10  # 10 GB transfer
    num_elements = (size_gb * 1024**3) // 4  # float32
    
    gpu0 = torch.device('cuda:0')
    gpu1 = torch.device('cuda:1')
    
    # Create tensors
    src = torch.randn(num_elements, device=gpu0)
    dst = torch.empty(num_elements, device=gpu1)
    
    # Warmup
    for _ in range(3):
        dst.copy_(src)
    torch.cuda.synchronize()
    
    # Benchmark
    iterations = 10
    start = time.perf_counter()
    for _ in range(iterations):
        dst.copy_(src)
    torch.cuda.synchronize()
    elapsed = time.perf_counter() - start
    
    bandwidth = (size_gb * iterations) / elapsed
    print(f"NVLink Bandwidth: {bandwidth:.2f} GB/s")
    print(f"Expected: ~400-450 GB/s (unidirectional)")

if __name__ == "__main__":
    test_nvlink_bandwidth()
```

Run:
```bash
python nvlink_bandwidth_test.py
```

### Example 2: 8-GPU All-Reduce Benchmark

```python
# all_reduce_benchmark.py
import torch
import torch.distributed as dist
import os
import time

def setup(rank, world_size):
    os.environ['MASTER_ADDR'] = 'localhost'
    os.environ['MASTER_PORT'] = '12355'
    dist.init_process_group("nccl", rank=rank, world_size=world_size)
    torch.cuda.set_device(rank)

def benchmark_all_reduce(rank, world_size):
    setup(rank, world_size)
    
    # Test different tensor sizes
    sizes_mb = [1, 10, 100, 1000, 10000]
    
    for size_mb in sizes_mb:
        num_elements = (size_mb * 1024 * 1024) // 4
        tensor = torch.randn(num_elements, device=f'cuda:{rank}')
        
        # Warmup
        for _ in range(5):
            dist.all_reduce(tensor)
        torch.cuda.synchronize()
        
        # Benchmark
        iterations = 20
        start = time.perf_counter()
        for _ in range(iterations):
            dist.all_reduce(tensor)
        torch.cuda.synchronize()
        elapsed = time.perf_counter() - start
        
        if rank == 0:
            # All-reduce moves 2*(n-1)/n * size data
            algo_bw = (2 * (world_size - 1) / world_size * size_mb * iterations) / elapsed / 1024
            print(f"Size: {size_mb:5} MB | Time: {elapsed/iterations*1000:.2f} ms | Algo BW: {algo_bw:.1f} GB/s")
    
    dist.destroy_process_group()

if __name__ == "__main__":
    world_size = 8
    torch.multiprocessing.spawn(
        benchmark_all_reduce,
        args=(world_size,),
        nprocs=world_size,
        join=True
    )
```

Run:
```bash
python all_reduce_benchmark.py

# Expected output:
# Size:     1 MB | Time: 0.05 ms | Algo BW: 35.0 GB/s
# Size:    10 MB | Time: 0.08 ms | Algo BW: 218.8 GB/s
# Size:   100 MB | Time: 0.25 ms | Algo BW: 700.0 GB/s
# Size:  1000 MB | Time: 2.20 ms | Algo BW: 795.5 GB/s
# Size: 10000 MB | Time: 22.0 ms | Algo BW: 795.5 GB/s
```

### Example 3: Multi-Node Training Setup

```python
# multi_node_train.py
# Run on each node with appropriate RANK and WORLD_SIZE

import torch
import torch.nn as nn
import torch.distributed as dist
from torch.nn.parallel import DistributedDataParallel as DDP
import os

def setup_multi_node():
    """Setup for multi-node training with RoCEv2"""
    
    # These come from SLURM or your job scheduler
    rank = int(os.environ.get('RANK', 0))
    world_size = int(os.environ.get('WORLD_SIZE', 1))
    local_rank = int(os.environ.get('LOCAL_RANK', 0))
    
    # Master node address (first node)
    master_addr = os.environ.get('MASTER_ADDR', 'node1')
    master_port = os.environ.get('MASTER_PORT', '29500')
    
    os.environ['MASTER_ADDR'] = master_addr
    os.environ['MASTER_PORT'] = master_port
    
    # Initialize with NCCL (uses NVLink intra-node, RoCEv2 inter-node)
    dist.init_process_group(
        backend='nccl',
        rank=rank,
        world_size=world_size
    )
    
    torch.cuda.set_device(local_rank)
    return rank, world_size, local_rank

def train_llm():
    rank, world_size, local_rank = setup_multi_node()
    
    # Example: Large model that benefits from 8+ GPUs
    # With 1.5TB memory (8 GPUs), you can train 70B+ models
    
    model = YourLargeModel().to(local_rank)
    model = DDP(model, device_ids=[local_rank])
    
    # Training loop...
    
    dist.destroy_process_group()
```

Launch script for 2 nodes (16 GPUs total):
```bash
# On node 1 (master):
torchrun \
    --nnodes=2 \
    --nproc_per_node=8 \
    --node_rank=0 \
    --master_addr=node1 \
    --master_port=29500 \
    multi_node_train.py

# On node 2:
torchrun \
    --nnodes=2 \
    --nproc_per_node=8 \
    --node_rank=1 \
    --master_addr=node1 \
    --master_port=29500 \
    multi_node_train.py
```

### Example 4: Memory Capacity Test - Loading Large Models

```python
# large_model_test.py
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer

def load_70b_model():
    """
    With 8x B300 (1.5TB HBM3e), you can load 70B+ models in full precision
    or 400B+ models in FP8
    """
    
    # Option 1: Device map auto (distributes across GPUs)
    model = AutoModelForCausalLM.from_pretrained(
        "meta-llama/Llama-2-70b-hf",
        device_map="auto",
        torch_dtype=torch.bfloat16,
    )
    
    # Check memory usage per GPU
    for i in range(8):
        allocated = torch.cuda.memory_allocated(i) / 1e9
        reserved = torch.cuda.memory_reserved(i) / 1e9
        print(f"GPU {i}: {allocated:.1f} GB allocated, {reserved:.1f} GB reserved")
    
    return model

def memory_capacity_estimate():
    """Estimate what models fit in 1.5TB"""
    
    estimates = {
        "Llama-2-70B (BF16)": 140,  # ~140GB
        "Llama-2-70B (FP8)": 70,    # ~70GB
        "Llama-3-405B (FP8)": 405,  # ~405GB
        "GPT-4 scale (FP8)": 800,   # ~800GB (estimated)
        "Mixture of Experts 1T (FP8)": 1000,  # Fits with activation memory
    }
    
    total_memory_gb = 192 * 8  # 1536 GB
    
    print(f"Total HBM3e Memory: {total_memory_gb} GB\n")
    print("Model Capacity Estimates:")
    print("-" * 50)
    
    for model, size_gb in estimates.items():
        fits = "✓" if size_gb < total_memory_gb * 0.8 else "✗"  # 80% usable
        print(f"{fits} {model}: ~{size_gb} GB")

if __name__ == "__main__":
    memory_capacity_estimate()
```

### Example 5: FP8 Inference Benchmark

```python
# fp8_inference.py
import torch
import transformer_engine.pytorch as te
from transformer_engine.common import recipe
import time

def fp8_benchmark():
    """
    Benchmark FP8 inference using Transformer Engine
    B300 excels at FP8 with 2.25 PFLOPS per GPU
    """
    
    # FP8 recipe
    fp8_recipe = recipe.DelayedScaling(
        margin=0,
        fp8_format=recipe.Format.HYBRID,
        amax_history_len=1024,
        amax_compute_algo="max",
    )
    
    # Create a transformer layer with FP8
    batch_size = 32
    seq_len = 4096
    hidden_size = 8192
    num_heads = 64
    
    layer = te.TransformerLayer(
        hidden_size=hidden_size,
        ffn_hidden_size=hidden_size * 4,
        num_attention_heads=num_heads,
        layer_type="encoder",
    ).cuda()
    
    # Input tensor
    x = torch.randn(seq_len, batch_size, hidden_size, device='cuda')
    
    # Warmup
    with te.fp8_autocast(enabled=True, fp8_recipe=fp8_recipe):
        for _ in range(10):
            _ = layer(x)
    torch.cuda.synchronize()
    
    # Benchmark
    iterations = 100
    start = time.perf_counter()
    with te.fp8_autocast(enabled=True, fp8_recipe=fp8_recipe):
        for _ in range(iterations):
            _ = layer(x)
    torch.cuda.synchronize()
    elapsed = time.perf_counter() - start
    
    tokens_per_sec = (batch_size * seq_len * iterations) / elapsed
    print(f"FP8 Throughput: {tokens_per_sec/1e6:.2f}M tokens/sec")
    print(f"Latency per forward: {elapsed/iterations*1000:.2f} ms")

if __name__ == "__main__":
    fp8_benchmark()
```

---

## Real-World Workloads

### What You Can Run on 8x B300 (1.5TB HBM3e)

| Workload | Configuration | Expected Performance |
|----------|---------------|---------------------|
| **Llama-3.1-405B Inference** | FP8, tensor parallel=8 | ~50 tokens/sec |
| **Llama-2-70B Fine-tuning** | BF16, FSDP | ~3000 tokens/sec |
| **Stable Diffusion XL** | Batch inference | ~200 images/min |
| **GPT-4 scale training** | FP8, 8-way TP | Feasible with multi-node |
| **Embedding model (1B)** | Full batch | ~1M embeddings/sec |

### Training Throughput Estimates

```
Model Size vs Training Speed (8x B300):

┌─────────────────────────────────────────────────────────┐
│ Model    │ Precision │ Tokens/sec │ Time for 1T tokens │
├──────────┼───────────┼────────────┼────────────────────┤
│ 7B       │ BF16      │ 180,000    │ ~64 days           │
│ 13B      │ BF16      │ 95,000     │ ~122 days          │
│ 70B      │ FP8       │ 25,000     │ ~463 days          │
│ 70B      │ BF16      │ 12,000     │ ~965 days          │
└─────────────────────────────────────────────────────────┘

* Multi-node scales nearly linearly for large models
* 2 nodes (16 GPUs) roughly halves training time
```

---

## Monitoring and Profiling

### GPU Monitoring Script

```bash
#!/bin/bash
# monitor_gpus.sh

watch -n 1 'nvidia-smi --query-gpu=index,name,temperature.gpu,utilization.gpu,utilization.memory,memory.used,memory.total,power.draw --format=csv,noheader,nounits | column -t -s,'
```

### NCCL Debug Logging

```bash
# Enable detailed NCCL logging
export NCCL_DEBUG=INFO
export NCCL_DEBUG_SUBSYS=ALL

# Run your training script
python train.py 2>&1 | tee nccl_debug.log

# Check for NVLink usage
grep "NVLink" nccl_debug.log
```

### PyTorch Profiler

```python
from torch.profiler import profile, ProfilerActivity, tensorboard_trace_handler

with profile(
    activities=[ProfilerActivity.CPU, ProfilerActivity.CUDA],
    schedule=torch.profiler.schedule(wait=1, warmup=1, active=3, repeat=1),
    on_trace_ready=tensorboard_trace_handler('./log/profile'),
    record_shapes=True,
    profile_memory=True,
    with_stack=True
) as prof:
    for step, batch in enumerate(dataloader):
        train_step(batch)
        prof.step()
```

---

## Cost and Power Analysis

### Power Consumption

| Component | Per Unit | Total (8 GPUs) |
|-----------|----------|----------------|
| B300 GPU | 700W | 5,600W |
| Intel Xeon (2x) | 350W | 700W |
| Memory, Storage, Cooling | ~500W | 500W |
| **Total System** | - | **~6,800W** |

### Performance per Watt

- **FP8**: 18 PFLOPS / 6.8 kW = **2.65 TFLOPS/W**
- **Comparison**: H100 system = ~1.5 TFLOPS/W
- **Improvement**: ~77% better efficiency

---

## Quick Reference Commands

```bash
# System health check
nvidia-smi -a

# NVLink status
nvidia-smi nvlink -s

# Topology matrix
nvidia-smi topo -m

# GPU reset (if needed)
sudo nvidia-smi -r

# Check PCIe bandwidth
nvidia-smi -q -d PCIE

# Monitor power
nvidia-smi dmon -s p

# DCGM metrics (if installed)
dcgmi diag -r 3
```

---

## Next Steps

When your XE9780 is available:

1. **Verify hardware**: Run `nvidia-smi -L` to confirm all 8 B300s
2. **Test NVLink**: Run the bandwidth test script
3. **Benchmark all-reduce**: Verify NCCL performance
4. **Load a large model**: Try Llama-70B to test memory
5. **Profile workloads**: Use PyTorch profiler for optimization

---

*Created: 2026-02-22*
*Configuration: Dell PowerEdge XE9780 + 8x NVIDIA B300 + 800G RoCEv2*
