# KORAKO YOLAWANI

> **A human-directed operating layer for reliable AI-assisted work.**

[![Public evidence](https://github.com/vcheeko/korako-yolawani/actions/workflows/public-evidence.yml/badge.svg)](https://github.com/vcheeko/korako-yolawani/actions/workflows/public-evidence.yml)

**Stage:** active prototype / personal daily-use validation  
**Production-ready:** no  
**Canonical implementation:** private  
**Public purpose:** focused diligence surface for the product thesis, architecture, reproducible evidence contracts, reviewability and explicit limitations

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

## Development snapshot · 2026-09-06

The canonical implementation remains private, but current verified development work includes:

- **Personal Alpha** integrated in the private core;
- a **Hybrid Mira Orb** with a **local/free-first voice path** integrated;
- natural continuous voice interaction still under active refinement;
- a **desktop/PWA daily-use path** in active validation;
- a **Personal Symphony control room** for human-visible orchestration state;
- enforced **Human Gate**, evidence and verifier boundaries for consequential work;
- internal **Golden Daily Use** activation with live **No-Postman** evidence collection;
- a public, reproducible evidence-contract harness with passing CI.

These are development milestones, not a claim of production readiness or complete end-to-end public reproduction.

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

### Reproduce the current public evidence contract

Requires Node.js 20+.

```bash
npm install
npm run evidence
```

The included verifier exercises synthetic positive and adversarial vectors around terminal state, expected evidence, provenance, read-only evidence, verifier identity and evidence-set binding.

**Important:** this is a reproducible **public evidence-contract harness**, not yet the full public Golden runtime.

## Reviewer path

For a fast technical review, follow this order:

1. [`docs/DEVELOPMENT_EVIDENCE.md`](docs/DEVELOPMENT_EVIDENCE.md) — what is proven publicly, verified internally, still in validation and not yet proven.
2. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — control-loop architecture and the public Golden target.
3. [`docs/EVIDENCE.md`](docs/EVIDENCE.md) — what is reproducible now and what is not.
4. [`public-evidence/v0.2/`](public-evidence/v0.2/) — inspectable verifier and test vectors.
5. [`docs/EXTERNAL_REVIEW.md`](docs/EXTERNAL_REVIEW.md) — falsifiable independent-review packet.
6. [`SECURITY.md`](SECURITY.md) — responsible vulnerability reporting and public/private security boundary.
7. [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to contribute to the public surface.

## Current credibility milestones

- [x] focused public flagship repository created;
- [x] public product / private-core boundary documented;
- [x] reproducible synthetic evidence-contract harness included;
- [x] clean-clone CI result verified for this repository;
- [x] development evidence ledger added;
- [x] responsible security disclosure policy added;
- [ ] minimal public Golden runtime connecting plan -> authority -> execution -> evidence -> verification -> persistence;
- [ ] recovery scenario reproduced in that runtime;
- [ ] independent third-party reproduction/review returned;
- [ ] pilot evidence showing reduced manual coordination without weakening human control.

## Public / private boundary

**Public by design:** product problem, operating principles, high-level architecture, sanitized evidence contracts, limitations, review protocol and future reproducibility targets.

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
