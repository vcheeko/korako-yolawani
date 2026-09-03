# KORAKO YOLAWANI

> **A human-directed operating layer for reliable AI-assisted work.**

[![Public evidence](https://github.com/vcheeko/korako-yolawani/actions/workflows/public-evidence.yml/badge.svg)](https://github.com/vcheeko/korako-yolawani/actions/workflows/public-evidence.yml)

**Stage:** prototype / evidence-building  
**Production-ready:** no  
**Canonical implementation:** private  
**Public purpose:** focused diligence surface for the product thesis, architecture, reproducible evidence contracts and explicit limitations

## 30-second overview

Korako Yolawani is designed for work that becomes difficult when it spans multiple AI models, tools, sessions and human decisions.

The goal is **not autonomy at any cost**. The goal is reliable continuation while the human retains meaningful authority.

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

### Naming

- **KORAKO YOLAWANI** — public product and brand.
- **KORA** — private/internal orchestration core used by the product.
- **Mira** — conversational interface/persona.

KORA is not the public product name.

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
- **Less human-postman work** between systems.

## What is public today

This repository currently provides:

- the product problem and operating thesis;
- a high-level control-loop architecture;
- a reproducible public evidence-contract harness;
- synthetic positive and adversarial verification vectors;
- explicit public/private boundaries and limitations;
- an external-review packet designed to make claims falsifiable.

It does **not** claim that the private KORA runtime is production-ready or publicly reproduced end to end.

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

1. [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) — control-loop architecture and the public Golden target.
2. [`docs/EVIDENCE.md`](docs/EVIDENCE.md) — what is reproducible now and what is not.
3. [`public-evidence/v0.2/`](public-evidence/v0.2/) — inspectable verifier and test vectors.
4. [`docs/EXTERNAL_REVIEW.md`](docs/EXTERNAL_REVIEW.md) — falsifiable independent-review packet.
5. [`CONTRIBUTING.md`](CONTRIBUTING.md) — how to contribute to the public surface.

## Current credibility milestones

- [x] focused public flagship repository created;
- [x] public product / private-core boundary documented;
- [x] reproducible synthetic evidence-contract harness included;
- [x] clean-clone CI result verified for this repository;
- [ ] minimal public Golden runtime connecting plan -> authority -> execution -> evidence -> verification -> persistence;
- [ ] recovery scenario reproduced in that runtime;
- [ ] independent third-party reproduction/review returned;
- [ ] pilot evidence showing reduced manual coordination without weakening human control.

## Public / private boundary

**Public by design:** product problem, operating principles, high-level architecture, sanitized evidence contracts, limitations, review protocol and future reproducibility targets.

**Private by design:** canonical KORA implementation, credentials, machine configuration, security-sensitive boundaries and unpublished operational evidence.

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
