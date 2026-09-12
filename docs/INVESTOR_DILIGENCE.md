# Korako Yolawani — Investor Diligence Snapshot

**Status date:** 2026-09-12  
**Stage:** active prototype / personal daily-use validation  
**Production-ready:** no  
**Canonical implementation:** private

This document is a fast diligence entry point. It is intentionally conservative: public proof, internal verification, validation work and unproven targets are kept separate.

## 60-second thesis

Korako Yolawani is a human-directed operating layer for reliable AI-assisted work across models, tools, devices, sessions and human decisions.

The product thesis is that the human should not have to remain the invisible integration layer that repeatedly carries context, files, permissions, status and verification between otherwise capable systems.

Korako instead makes orchestration, authority, evidence, verification, recovery and continuation explicit system responsibilities while preserving meaningful human control.

The current product model separates three roles:

- **Mira** — the human-facing conversational interface;
- **KORA** — the internal trust and orchestration kernel;
- **Spine** — the human-observable projection of governed work and progress.

Models, agents, browsers, MCP servers and computer-use systems are treated as replaceable workers rather than the product's source of authority.

## What is publicly proven

The public repository contains a dependency-free proof stack that an external reviewer can rerun with Node.js 20+:

```bash
npm test
```

It currently covers:

- a reproducible public evidence-contract verifier with positive and adversarial vectors;
- Public Golden v0.1: a bounded control-loop slice from plan through verification and persisted terminal state;
- a fail-closed recovery scenario;
- No-Postman instrumentation with an explicit no-fake-baseline rule;
- KORA Trust Contract v0.1 with machine-checked authority, scope, budget, Human Gate, receipt integrity, replay rejection, evidence-chain, worker/verifier separation, lifecycle and recovery invariants;
- an integrated Trust Golden path in which a bounded local action reaches `VERIFIED` while a simulated consequential external mutation remains behind Human Gate;
- an ROI validator that deliberately refuses a quantified time-saved claim until real paired human measurements exist.

The `public-evidence` GitHub Actions workflow reruns the public proof stack on pull requests and pushes to `main`.

## What is internally verified but not publicly reproduced end to end

The private canonical development core has evidence for a Personal Alpha, Hybrid Mira Orb, local/free-first voice routing, Human Gate boundaries, human-visible orchestration state, a production Mira browser flow, a bounded read-only verified action flow and live No-Postman instrumentation.

Those facts are recorded as **INTERNALLY VERIFIED** or **IN VALIDATION**, not as independently reproduced public claims. See [`DEVELOPMENT_EVIDENCE.md`](DEVELOPMENT_EVIDENCE.md).

## What is not yet proven

Korako does **not** currently claim:

- production readiness;
- complete production security;
- independent third-party reproduction of the private runtime;
- quantified human time savings versus a measured baseline;
- commercial validation or product-market fit;
- completed voice/TTS reliability across supported devices and environments;
- a production-grade identity, signing, sandboxing or distributed trust infrastructure.

These are evidence gates, not marketing claims.

## Why this may become defensible

The intended differentiation is not a single model, prompt layer or chat UI. The defensibility thesis is the governed work substrate around models:

1. **Authority before execution** — risk, capability, scope and cost are explicit before consequential work.
2. **Evidence before claims** — `PREPARED`, `EXECUTED` and `VERIFIED` are separate states.
3. **Independent verification** — workers do not self-verify consequential results.
4. **Persistent continuation and recovery** — work can resume from authorized state rather than silently replaying actions.
5. **Human Journey visibility** — the user can see what is happening without becoming the system's manual postman.
6. **Model/tool neutrality** — workers can be substituted while KORA retains the control contract.
7. **Free/local-first economics** — paid compute is an escalation path rather than an invisible default.

These are design and architecture claims. Their business value still requires user, pilot and ROI evidence.

## Current diligence strengths

- public/private boundary is explicit;
- public proof is executable rather than documentation-only;
- adversarial checks are included;
- current CI is narrow and read-only;
- security reporting policy exists;
- the repository avoids claiming production readiness;
- the ROI layer fails closed when the measurement basis is incomplete;
- current `main` is protected by a required `verify` status check.

## Current diligence gaps

The highest-value next evidence is:

1. independent third-party reproduction of the public proof stack;
2. repeated Golden Demo runs covering real voice-to-useful-action flows;
3. measured manual-vs-Korako paired trials for No-Postman/ROI evidence;
4. real external user or pilot evidence;
5. stronger production security review before any production-security claim;
6. deeper branch/review governance as the contributor surface grows.

## Reviewer path

For a technical diligence pass, use this order:

1. [`DEVELOPMENT_EVIDENCE.md`](DEVELOPMENT_EVIDENCE.md) — current truth table;
2. [`KORA_TRUST_KERNEL.md`](KORA_TRUST_KERNEL.md) — public trust contract;
3. [`RELIABILITY_AND_ROI.md`](RELIABILITY_AND_ROI.md) — reliability and measurement boundary;
4. [`INDEPENDENT_REPRODUCTION.md`](INDEPENDENT_REPRODUCTION.md) — clean-clone review protocol;
5. [`../public-kora/v0.1/`](../public-kora/v0.1/) — machine-checked trust harness;
6. [`../public-golden/v0.1/`](../public-golden/v0.1/) — runnable control-loop slice;
7. [`ARCHITECTURE.md`](ARCHITECTURE.md) — high-level architecture;
8. [`../SECURITY.md`](../SECURITY.md) — vulnerability-reporting and public/private security boundary.

## IP and disclosure boundary

The public repository is a diligence and reproducibility surface, not the canonical product implementation. Publication of selected proof material should not be interpreted as publication of the private core or as a statement that unpublished implementation material is available for reuse.

See [`PUBLIC_IP_BOUNDARY.md`](PUBLIC_IP_BOUNDARY.md) for the repository's disclosure boundary.

---

**Evidence before scale. Human authority before consequential execution.**