# Workato Video Script - Feedback Revision (In Progress)

## Status: IN PROGRESS - Working through 28 comments from reviewers

## Source Files
- **Feedback PDF:** `workato/How KV-Aware Routing Makes LLM Inference 77% Faster.pdf`
- **Current script (markdown):** `workato/script.md`
- **Current script (HTML for review):** `workato/script-for-review.html`

## Reviewers
- **Ryan O'Connor** - technical accuracy, framing, tone
- **April Dagonese** - narrative clarity, problem/solution framing

## Feedback Summary (28 Comments)

### Title (Comments 1-2)
- [1] A/B test title options without Workato (Ryan suggested alternatives)
- [2] Keep Workato in title since it's a lighthouse case study (Ryan agreed with this)
- **Decision needed from user:** Title direction

### Intro: Teaser Montage (Comments 3-5)
- [3] Stat flashes mix positive + negative values, confusing viewers
- [4] "It's not a new GPU. It's a smarter route" is unclear ("it" is ambiguous)
- [5] Add voiceover from the start; 7 seconds music-only will lose viewers
- **Action:** Merge intro into Scene 0, start VO immediately

### Scene 0: The Hook (Comments 6-7)
- [6] Don't say "here's" when you don't explain it yet. Ryan's suggested rewrite: "Same GPUs. Same model. But this one has 77% faster TTFT. How? It comes down to a single infrastructure trick implemented for a company that's pushing LLMs to the limit"
- [7] Show GPUs/models visually (two columns, turtle vs rabbit icons to convey "same setup, different speed")

### Scene 1: The Problem (Comments 8-21) - HEAVIEST FEEDBACK
- [8] "Enterprise automation" too vague, be specific about what Workato does
- [9] "trusted by" too salesy
- [10] Use "serves" instead of "trusted by", focus on scale not subjective feelings
- [11] "running" better than "deploying"
- [12] Rephrase to transition into challenge: high inference demand, wasted capacity = wasted money. Ryan's suggestion: "their AI research lab is pushing into agentic AI, building agents that can execute work across entire organizations. Significant inference capacity is required to power agents at this scale, but if you're not smart about how you set it up, much of this capacity will go to waste. And wasted capacity means wasted money."
- [13] Use "KV cache" not "KV states" (standard terminology)
- [14] Use "the KV cache" or "those cached values", not "cached memory"
- [15] "Decode is memory-bound, not compute-bound" not relevant to central argument, remove
- [16] Frame as intrinsic problem of agentic/business apps, not just scale. Ryan: "For business-oriented and agentic applications, a fundamental challenge exists at the prefill stage"
- [17] O(n^2) explanation technically wrong. It's about scaling ratios, not absolute operations. Remove "10B operations" claim. Fix O(n^2) explanation.
- [18] Clarify redundant prefill only applies to shared portion of prompts (system prompt, tool defs), not unique user prompts
- [19] No sentence fragments. Rewrite "GPUs doing identical computation, over and over. Latency climbing. Costs spiraling." into complete sentences
- [20] Need concrete problem statement: "needed N GPUs, without optimization would need X" (April)
- [21] Put specific dollar/efficiency value on the waste (Ryan agrees)

### Scene 2: Infrastructure (Comments 22-26) - STRUCTURAL CHANGE
- [22] **Should NOT be a standalone section.** Jump to KV-aware routing as the solution. Interleave GPU info as needed. Central problem is inefficiency, not volume.
- [23] Does hardware solve ANY of the prefill problem? Quantify.
- [24] Confused about whether DO solved speed or prefill redundancy
- [25] Ryan's TLDR: hardware is prerequisite to access Dynamo, not the solution itself
- [26] Is Dynamo available to all NVIDIA buyers? Reframe accordingly (April)
- **Action:** Merge Scene 2 into Scene 3. Fold DO/GPU info into solution context.

### Scene 4: Benchmarks (Comments 27-28)
- [27] Will we create our own benchmark comparison or use generic charts? (Decision needed)
- [28] "40% fewer GPUs" - what other optimizations? Should highlight cost savings earlier

### Scene 5: Closing
- No comments

## Key Structural Changes Needed
1. **Merge Intro + Scene 0** - voiceover starts immediately
2. **Rewrite Scene 1** - better technical accuracy, frame as intrinsic agentic problem, add concrete cost framing
3. **Merge Scene 2 into Scene 3** - infrastructure is not a standalone section; fold DO/GPU info into KV-routing solution
4. **Surface cost savings earlier** - don't wait until benchmarks to mention 67% lower cost / 40% fewer GPUs

## Open Decisions (Need User Input)
1. Title: include Workato or not?
2. Benchmark charts: create own or use generic?
3. Dynamo availability: need to verify if it's free with NVIDIA GPUs or separate purchase
4. Concrete "before" numbers for Scene 1 problem statement (how many GPUs without optimization?)
