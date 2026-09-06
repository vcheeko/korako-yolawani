# KORAKO YOLAWANI

> **A human-directed operating layer for reliable AI-assisted work.**

[![Public evidence](https://github.com/vcheeko/korako-yolawani/actions/workflows/public-evidence.yml/badge.svg)](https://github.com/vcheeko/korako-yolawani/actions/workflows/public-evidence.yml)

**Stage:** active prototype / personal daily-use validation  
**Production-ready:** no  
**Canonical implementation:** private  
**Public purpose:** focused diligence surface for the product thesis, reproducible control-loop proofs, explicit limitations and independent review

## 30-second overview

Korako Yolawani is designed for work that becomes difficult when it spans multiple AI models, tools, devices, sessions and human decisions.

The goal is not autonomy at any cost. The goal is **reliable continuation while the human retains meaningful authority**.

```text
GOAL
  -> PLAN + DEPENDENCIES
  -> AUTHORITY
  -> BOUNDED EXECUTION
  -> EVIDENCE
  -> VERIFICATION
  -> PERSISTENT CONTINUATION
  -> RECOVERY WHEN NEEDED
```

Korako is also designed to reduce **human-postman work**: manually carrying context, instructions, files and status between otherwise capable systems.

## Public proof now

The repository now contains a minimal dependency-free **Public Golden v0.1** runtime that can be rerun by an external reviewer.

It reproduces:

`plan → authority → bounded execution → evidence → independent verification → persisted terminal state`

It also includes:

- a fail-closed Human Gate check;
- an independent verifier identity;
- a recovery test that interrupts before execution and resumes from an authorized checkpoint;
- No-Postman instrumentation that reports observed manual system-to-system transfers without inventing a time-saved baseline.

Run the complete public proof stack:

```bash
npm test
```

A fresh GitHub-hosted run on commit `e56f90089674471443dd09c0ecceb11fb6d66712` completed **SUCCESS**. See [`public-evidence/runs/2026-09-06-public-golden-v0.1.md`](public-evidence/runs/2026-09-06-public-golden-v0.1.md).

## Development snapshot · 2026-09-07

Current development includes:

- **Personal Alpha** integrated in the private core;
- a **Hybrid Mira Orb** with a **local/free-first voice path** integrated;
- natural continuous voice interaction still under active refinement;
- a **desktop/PWA daily-use path** in active validation;
- a **Personal Symphony control room** for human-visible orchestration state;
- enforced **Human Gate**, evidence and verifier boundaries for consequential work;
- internal **Golden Daily Use** activation with live **No-Postman** evidence collection;
- the first publicly reproducible Golden control-loop slice with passing clean-run CI.

These are development milestones, not a claim of production readiness or complete public reproduction of the private runtime.

**Evidence ledger:** [`docs/DEVELOPMENT_EVIDENCE.md`](docs/DEVELOPMENT_EVIDENCE.md) separates **PUBLICLY REPRODUCIBLE**, **INTERNALLY VERIFIED**, **IN VALIDATION** and **NOT YET PROVEN** claims.

## Naming

- **KORAKO YOLAWANI** — public product and brand.
- **Mira** — conversational interface/persona.
- The canonical orchestration implementation remains private.

## The problem

Capable AI can complete many individual tasks, but the person often becomes the integration layer: carrying context, remembering state, resolving dependencies, approving consequential actions, checking whether execution actually happened and recovering when something fails.

Korako explores an operating model where those coordination duties become explicit system responsibilities instead of invisible human overhead.

## Design principles

- **Human authority** for consequential decisions.
- **Persistent state** across long-running work.
- **Dependency-aware execution** rather than blind task queues.
- **Risk-proportional permissions** and Human Gates.
- **Tool/model neutrality** where practical.
- **Verification before trust** for important completion claims.
- **Recovery and reversibility** as product requirements.
- **Safe parallelism** for independent bounded work.
- **Free/local-first routing** where practical, with paid escalation only when materially needed.
- **Less human-postman work** between systems.

## What is public today

This repository currently provides:

- the product problem and operating thesis;
- a high-level control-loop architecture;
- a reproducible public evidence-contract harness;
- synthetic positive and adversarial verification vectors;
- **Public Golden v0.1**, a runnable bounded control-loop slice;
- a public recovery/failure reproduction;
- No-Postman instrumentation with an explicit no-fake-baseline rule;
- a development evidence ledger separating public proof from private development claims;
- explicit public/private boundaries and limitations;
- an external-review packet designed to make claims falsifiable;
- a security disclosure policy for the public surface.

It does **not** claim that the private canonical runtime is production-ready or publicly reproduced end to end.

## Evidence discipline

Korako deliberately distinguishes:

```text
PREPARED != EXECUTED != VERIFIED != PUBLICLY REPRODUCED
```

### Reproduce everything public

Requires Node.js 20+.

```bash
npm test
```

Or run individual layers:

```bash
npm run evidence
npm run golden
npm run golden:recovery
npm run golden:benchmark
```

## Reviewer path

For a fast technical review, follow this order:

1. [`docs/DEVELOPMENT_EVIDENCE.md`](docs/DEVELOPMENT_EVIDENCE.md) — current truth table.
2. [`public-golden/v0.1/`](public-golden/v0.1/) — runnable Golden control-loop slice.
3. [`public-evidence/runs/2026-09-06-public-golden-v0.1.md`](public-evidence/runs/2026-09-06-public-golden-v0.1.md) — recorded clean-run result.
4. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — control-loop architecture.
5. [`docs/EVIDENCE.md`](docs/EVIDENCE.md) — evidence boundaries.
6. [`public-evidence/v0.2/`](public-evidence/v0.2/) — verifier and adversarial vectors.
7. [`docs/EXTERNAL_REVIEW.md`](docs/EXTERNAL_REVIEW.md) — falsifiable independent-review packet.
8. [`SECURITY.md`](SECURITY.md) — responsible vulnerability reporting.

## Current credibility milestones

- [x] focused public flagship repository created;
- [x] public product / private-core boundary documented;
- [x] reproducible synthetic evidence-contract harness included;
- [x] clean-clone CI verified;
- [x] development evidence ledger added;
- [x] minimal public Golden runtime reproduced;
- [x] recovery scenario reproduced in the public runtime;
- [x] responsible security disclosure policy added;
- [ ] measured manual-vs-Korako No-Postman baseline with defensible time-saved data;
- [ ] real user-facing Mira/Korako demo from goal to useful verified result;
- [ ] independent third-party reproduction/review returned;
- [ ] pilot evidence showing reduced manual coordination without weakening human control.

## Public / private boundary

**Public by design:** product problem, operating principles, high-level architecture, sanitized proof slices, evidence contracts, limitations and review protocol.

**Private by design:** canonical implementation, credentials, machine configuration, security-sensitive boundaries, operational logs, unpublished pilot data and unpublished IP-sensitive material.

Do not open a public issue with sensitive vulnerability details. See [`SECURITY.md`](SECURITY.md).

## Collaboration

Especially useful now:

- technical co-founder / lead engineer;
- reliability, security and architecture review;
- AI orchestration and evaluation expertise;
- product/UX collaboration;
- pilot partners with measurable multi-step workflows.

If you are evaluating the project, the most useful feedback is specific and falsifiable: **what claim is unclear, what evidence is missing, what failure mode is unhandled, or what would you need to reproduce independently?**

---

**Evidence before scale. Human authority before consequential execution.**
