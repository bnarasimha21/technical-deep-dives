# Script Feedback Tracker

Status: IN PROGRESS

## How to use this file
- **Comment:** Original feedback from reviewer
- **Fix Applied:** What we changed in the script
- **Suggested Reply:** What to reply to the reviewer on the Google Doc

---

## Title (Comments 1-2)

### Comment 1 (Ryan)
> We should A/B test this with some other title options. If we don't need to put Workato in the title we could think about titles like: "77% faster LLM inference with this simple method", "How to make LLMs 77% faster | KV-aware routing explained", "The routing trick that makes LLMs 77% faster"

**Fix Applied:** Changed title to "77% Faster LLM Inference: How Workato Uses KV-Aware Routing". Keeps Workato (per Comment 2) but leads with the hook stat.

**Suggested Reply:** Good call on leading with the hook. Updated to "77% Faster LLM Inference: How Workato Uses KV-Aware Routing". Keeps Workato for the lighthouse angle but leads with the performance claim. We can A/B test a version without Workato once we publish.

---

### Comment 2 (Reviewer)
> I do think we should include Workato in the title here, since it's supposed to be a lighthouse customer case study.

**Fix Applied:** Same as above. Workato stays in the title.

**Suggested Reply:** Agreed, kept Workato in. New title: "77% Faster LLM Inference: How Workato Uses KV-Aware Routing".

---

## Intro: Teaser Montage (Comments 3-5)

### Comment 3 (Reviewer) ✅
> Its unclear what these values are and how they relate. Additionally, some seem positive (lower costs) whereas some seem negative (wasted cycles). This could be confusing as viewers could think that KV-aware routing yields all of these things.

**Fix Applied:** Replaced mixed stats with outcome-only stats: "77% faster TTFT", "67% lower cost", "40% fewer GPUs". All positive, all clearly results of KV-aware routing. Removed the ambiguous tagline.

**Suggested Reply:** Good catch. Replaced with all outcome stats (77% faster TTFT, 67% lower cost, 40% fewer GPUs) so it's clear these are the results of KV-aware routing, not a mix of problems and outcomes.

---

### Comment 4 (Reviewer) ✅
> Not sure what "it" is here. Maybe something like "you don't need a new GPU. you need smarter routes" would be better?

**Fix Applied:** Adopted the reviewer's suggestion. Changed "It's not a new GPU. It's a smarter route." to "You don't need a new GPU. You need smarter routes."

**Suggested Reply:** Good suggestion, adopted your phrasing exactly.

---

### Comment 5 (Reviewer) ✅
> IMO you should have voice right out of the gate. 7 seconds of music only could cause people to click away.

**Fix Applied:** Merged the Intro Teaser Montage into Scene 0. Voiceover now starts at 0:00. Stat flashes play as visual accompaniment over the voiceover, no more silent opening. Scene 0 now runs 0:00 - 0:17.

**Suggested Reply:** Agreed. Merged the intro into Scene 0 so voiceover starts at 0:00. Stat flashes now play over the voiceover instead of as a standalone silent segment.

---

## Scene 0: The Hook (Comments 6-7)

### Comment 6 (Ryan) ✅
> I wouldn't say "here" if you don't immediately talk about it. You bury the lede until scene 2. You could say "Same GPUs. Same model. But this one has 77% faster TTFT. How? It comes down to a single infrastructure trick implemented for a company that's pushing LLMs to the limit"

**Fix Applied:** Adopted Ryan's rewrite. Changed to: "Same GPUs. Same model. But this one has seventy-seven percent faster time-to-first-token. How? It comes down to a single infrastructure trick, implemented for a company that's pushing LLMs to the limit."

**Suggested Reply:** Great suggestion, adopted your rewrite. Much cleaner flow.

---

### Comment 7 (Ryan) ✅
> It might be good to show these visually on screen. Have two GPUs pop up when you say "same GPUs", then two model icons pop up underneath when you say "same model", then show like a red turtle icon and a green rabbit icon for each column.

**Fix Applied:** Updated visual direction to include two-column comparison: GPU icons pop up on "Same GPUs", model icons on "Same model", red turtle (left/slow) vs green rabbit (right/fast), right column pulses with "77% faster TTFT".

**Suggested Reply:** Love this idea. Added the two-column GPU + model comparison with turtle vs rabbit icons to the visual direction.

---

## Scene 1: The Problem (Comments 8-21)

### Comment 8 (Reviewer) ✅
> Can we be more specific here? Enterprise automation could mean lots of things.

**Fix Applied:** Replaced "a leader in enterprise automation" with "connects and orchestrates enterprise data, processes, and applications". Based on Workato's own LinkedIn positioning as "a leading agentic orchestration company".

**Suggested Reply:** Good call. Replaced with a more specific description based on Workato's own positioning: "connects and orchestrates enterprise data, processes, and applications."

---

### Comment 9 (Reviewer) ✅
> This sounds too salesy to me ("trusted by")

**Fix Applied:** Changed "trusted by" to "serving". Full line now reads: "...serving thousands of customers globally, running over a trillion tasks per year."

**Suggested Reply:** Agreed, changed to "serving" to keep it factual.

---

### Comment 10 (Ryan) ✅
> Agreed. Would opt for "that serves thousands of customers globally". In general I would focus on the *scale* and the technical problems that come with it, rather than assigning any subjective feeling/analysis.

**Fix Applied:** Same as Comment 9. Used "serving" and focused on scale (thousands of customers, trillion tasks/year).

**Suggested Reply:** Done. Focused on scale, removed subjective language.

---

### Comment 11 (Reviewer) ✅
> Is "running" a better word than "deploying"?

**Fix Applied:** Changed "deploying" to "running".

**Suggested Reply:** Yes, changed to "running".

---

### Comment 12 (Ryan) ✅
> I would rephrase to transition into the challenge: extremely high inference demand. Something along the lines of "their AI research lab is pushing into agentic AI, building agents that can execute work across entire organizations. Significant inference capacity is required to power agents at this scale, but if you're not smart about how you set it up, much of this capacity will go to waste. And wasted capacity means wasted money."

**Fix Applied:** Adopted Ryan's suggestion. Replaced the salesy "don't just assist... but actually execute" with "execute work across entire organizations" and added the waste/money transition: "Powering agents at this scale requires significant inference capacity, but if you're not smart about how you set it up, much of that capacity goes to waste. And wasted capacity means wasted money."

**Suggested Reply:** Great framing. Adopted your suggestion to transition directly into the waste/cost problem.

---

### Comment 13 (Ryan) ✅
> Any reason you don't just call this the KV cache? I would use standard terminology unless there is a compelling reason not to.

**Fix Applied:** Changed "builds internal memory called KV states" to "builds the KV cache". Standard terminology.

**Suggested Reply:** No reason, just an oversight. Changed to "KV cache" throughout.

---

### Comment 14 (Ryan) ✅
> I think "the KV cache" or "those cached values" would be better. IMO it's not quite accurate to say you are caching memory itself.

**Fix Applied:** Changed "using that cached memory" to "using those cached values".

**Suggested Reply:** Good catch. Changed to "those cached values".

---

### Comment 15 (Ryan) ✅
> "Decode is memory-bound, not compute-bound" doesn't really seem relevant to the central argument you're making in this section.

**Fix Applied:** Removed "Decode is memory-bound, not compute-bound." The script already makes the case that prefill is the expensive phase through the quadratic scaling explanation.

**Suggested Reply:** Agreed, removed it. The prefill focus comes through clearly enough without it.

---

### Comment 16 (Ryan) ✅
> I would maybe phrase this not only as a challenge of scale but as a problem intrinsic to enterprise-level or business-oriented applications. The *intrinsic* problem is that agentic applications have inordinately long prompts, which means prefill is extremely computationally expensive. Scale just magnifies the preexisting problem. Rephrase like "For business-oriented and agentic applications, a fundamental challenge exists at the prefill stage."

**Fix Applied:** Replaced "Here's where it breaks down at scale. In agentic workloads," with "For agentic and business-oriented applications, a fundamental challenge exists at the prefill stage." Frames it as an intrinsic problem, not just a scale issue.

**Suggested Reply:** Good point. Reframed as an intrinsic problem of agentic/business apps rather than just a scale issue.

---

### Comment 17 (Ryan) ✅
> This isn't actually technically what big O means. It specifies an upper bound on *scaling*, not number of operations. You can't just square the input size to get the number of operations. A 100k token prompt will actually require *more* operations than that in prefill. The quadratic time complexity comes from the fact that every input "sees" every other input, but the actual number of computations depends on the hidden dimension.

**Fix Applied:** Removed the "10 billion attention operations" claim and the incorrect O(n²) explanation. Replaced with: "Because prefill scales quadratically, doubling the prompt length roughly quadruples the compute required." This correctly uses O(n²) as a scaling ratio, not an absolute operation count.

**Suggested Reply:** You're right, that was a misuse of Big O. Removed the absolute operation count and kept only the scaling ratio: "doubling the prompt length roughly quadruples the compute required."

---

### Comment 18 (Ryan) ✅
> It may be worth clarifying that this is only true of the *shared* portion of the prompt. Each user prompt will be different, and that means calculating *some* KV values unique to that prompt. The KV values will be identical between sessions for the shared prompt though.

**Fix Applied:** Replaced "And every single request repeats this same prefill work" with "And much of this prefill work is repeated across requests. The system prompts, tool definitions, and shared context are identical every time, meaning GPUs are recalculating the same KV values over and over." Clarifies that redundancy applies to the shared portions, not all prefill.

**Suggested Reply:** Good nuance. Clarified that it's the shared portions (system prompts, tool definitions, shared context) that are redundant, not the entire prefill.

---

### Comment 19 (Ryan) ✅
> I'm not really a fan of these fragments. I think something like "This means the GPUs are doing identical calculations over and over again, wasting GPU capacity and cycles and, therefore ultimately, money."

**Fix Applied:** Replaced "GPUs doing identical computation, over and over. Latency climbing. Costs spiraling." with "This wastes GPU capacity, cycles, and ultimately, money." Removed fragments, adopted Ryan's tone. Also eliminated redundancy with the Comment 18 fix which already covers the "over and over" idea.

**Suggested Reply:** Agreed, replaced the fragments with a complete sentence based on your suggestion.

---

### Comment 20 (April) ✅
> I feel like this paragraph isn't articulating a problem to fix, it's just articulating Workato's needs. The problem statement would be something like "they needed to accomplish this with only N GPUs, and without optimizations, this would have required X GPUs".

**Fix Applied:** Added concrete problem statement after the waste framing: "Workato needed to power their agentic workload on as few GPUs as possible. Without optimization, serving it would require roughly ten GPUs. The question was whether smarter infrastructure could close that gap." Frames it as a real business need + open question, not a custom solution. Also addresses April's overall feedback about framing this as an interesting deep dive into optimizations rather than implying DO/NVIDIA built something custom for Workato.

**Suggested Reply:** Great point. Added a concrete problem statement: 10 GPUs without optimization, and framed it as whether smarter infrastructure could close the gap. Also taking your overall framing feedback into account for the Scene 2 restructure (Comments 22-26).

---

### Comment 21 (Ryan) ✅
> Agreed with putting a specific value to this if we can. I think the problem is inefficiency and wasted money, but we don't really have a measure of impact specified in this paragraph.

**Fix Applied:** Same as Comment 20. Added "roughly ten GPUs" as the concrete unoptimized baseline, giving a specific measure of impact.

**Suggested Reply:** Done. Added "ten GPUs without optimization" as the concrete baseline to quantify the waste.

---

## Scene 2: Infrastructure (Comments 22-26)

### Comment 22 (Ryan) ✅
> This is a little marketing-speak-ish. I actually think this should not be an independent section and you should jump right into KV-aware routing as the solution to the central problem of inefficiency. Then, you can interleave info about GPU as needed. Saying "DigitalOcean has lots of fast GPUs" doesn't address the inefficiency problem.

**Fix Applied:** Deleted Scene 2 (Infrastructure) as a standalone section. Folded the key DOKS/H200/tensor parallelism facts into the opening of the KV-Aware Routing scene (now Scene 2). Removed the marketing-speak paragraphs about DO's speed and support. Renumbered all subsequent scenes.

**Suggested Reply:** Agreed. Removed the standalone infrastructure section and folded the key hardware facts (DOKS, H200, tensor parallelism) into the opening of the KV-aware routing scene. Much tighter flow from problem to solution now.

---

### Comment 23 (Ryan) ✅
> Can you say more about this? Does hardware alone solve ANY of the prefill redundancy problem? If so, how much? How do we quantify it?

**Fix Applied:** Addressed by restructure. The new framing is: "Workato deployed on DOKS with H200 GPUs... But fast hardware alone doesn't eliminate redundant computation. That's where NVIDIA Dynamo comes in." Hardware is positioned as the foundation, Dynamo as the actual solution.

**Suggested Reply:** Reframed. Hardware is now positioned as the deployment foundation, with Dynamo clearly identified as what solves the redundancy problem.

---

### Comment 24 (April) ✅
> Did they come to DO because of speed or because they needed help with prefill redundancy? I'm confused about which problem we solved for them. Or was it both?

**Fix Applied:** Addressed by restructure. Removed the "chose DO for speed" narrative. Now simply states Workato deployed on DOKS with H200s, then immediately pivots to the Dynamo optimization. The video is framed as a technical deep dive into how the right infrastructure + optimization delivered results, not as a custom solution DO built for Workato.

**Suggested Reply:** Simplified the framing. Removed the "chose DO for speed" angle. Now it's: Workato deployed on DOKS, and NVIDIA Dynamo's KV-aware routing solved the efficiency problem. Less about what DO uniquely solved, more about how the infrastructure + optimization stack delivered results.

---

### Comment 25 (Ryan) ✅
> TLDR: there is a fundamental problem unique to agentic applications (long context due to tools); that leads to high compute demands because of prefill; this can be solved with faster/more GPUs but that is costly; instead, we observe much of this computation is redundant, so we use KV-aware routing to avoid repeated work; this leads to efficiency gains and lower cost. The hardware aspect is a prerequisite to access Dynamo, not the solution itself.

**Fix Applied:** The restructured script now follows exactly this flow: intrinsic agentic problem → prefill waste → hardware as foundation → Dynamo as the actual solution → efficiency gains.

**Suggested Reply:** Restructured to follow your suggested flow exactly. Hardware is the prerequisite, Dynamo is the solution.

---

### Comment 26 (April) ✅
> Is Dynamo available for all NVIDIA buyers? Or did they buy this on top of GPU purchases? If it comes with all NVIDIA GPUs, don't frame it as "hardware alone doesn't solve the problem." Frame it more like "Workato chose DO because we were able to support their need for speed. Their scale benefitted from NVIDIA Dynamo because..." and make it a story about the specific optimizations they required.

**Fix Applied:** Dynamo is open-source NVIDIA software. Updated the script to call it "an open-source inference orchestrator," making it clear this isn't a proprietary add-on. The framing is now about Workato deploying on DOKS and leveraging Dynamo's KV-aware routing for efficiency, not about DO solving a unique problem.

**Suggested Reply:** Good question. Dynamo is open-source NVIDIA software, not a separate purchase. Updated to call it "an open-source inference orchestrator" and reframed accordingly. The story is now about how the DOKS + Dynamo stack delivered efficiency gains for Workato's specific workload.

---

## Scene 4: Benchmarks (Comments 27-28)

### Comment 27 (Reviewer) ✅
> I like this. Is this something you'll be setting up on your own to show the comparison? Or are you just taking generic charts to demonstrate the difference?

**Fix Applied:** Built custom animated A/B comparison diagrams directly in Remotion. Config A shows requests scattering randomly to GPUs with red "MISS" badges and prefill bars (no coordination). Config B shows requests flowing through a "DYNAMO ROUTER" box to GPUs with warm cache indicators and green "HIT" badges. Both diagrams animate in sequence within the cards.

**Suggested Reply:** Built custom animated diagrams for the A/B comparison. Config A shows requests randomly scattering to GPUs (cache misses, redundant prefill). Config B shows requests routing through Dynamo to cache-warm GPUs (cache hits, skipped prefill). All built in Remotion, not static images.

---

### Comment 28 (Reviewer)
> How if only 40% fewer GPUs? What other optimizations were done. Also, this should be highlighted earlier in the video IMO.

**Fix Applied:** TODO

**Suggested Reply:** TODO

---

## Scene 5: Closing
No comments received.
