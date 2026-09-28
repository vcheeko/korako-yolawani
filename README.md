# KORAKO YOLAWANI

> **ONE HUMAN → ONE GOAL → ONE JOURNEY → VERIFIED DONE**

**A human-directed operating layer for reliable AI-assisted work.**

[![Public evidence](https://github.com/vcheeko/korako-yolawani/actions/workflows/public-evidence.yml/badge.svg)](https://github.com/vcheeko/korako-yolawani/actions/workflows/public-evidence.yml)

[**Public proof**](#public-proof-now) · [**How it works**](#how-korako-works) · [**Investor / technical diligence**](docs/INVESTOR_DILIGENCE.md) · [**Support / pilot with Korako**](SPONSORS.md)

**Stage:** active prototype / MIRA FIRST reliability validation  
**Production-ready:** no  
**Canonical implementation:** private  
**Public purpose:** product front door + reproducible proof + explicit limitations + independent review

---

## 30-second overview

AI can already do many individual tasks well. The problem appears when real work spans **multiple models, tools, devices, sessions, approvals and failures**.

The human often becomes the integration layer:

- carrying context between systems;
- remembering what already happened;
- resolving dependencies;
- approving consequential actions;
- checking whether execution really happened;
- recovering when something fails.

**Korako Yolawani is designed to move that coordination burden into an explicit, governed work layer while the human keeps meaningful authority.**

Mira is the conversational front door.

Korako is the journey and orchestration layer.

KORA is the internal trust/control kernel.

The human remains the conductor.

```text
YOU
 ↓
MIRA
 ↓
KORAKO
 ↓
AI + TOOLS + AGENTS + DEVICES
 ↓
CHECK
 ↓
VERIFY
 ↓
YOU
```

The target experience is simple:

> **Tell Mira what you want. Korako prepares and coordinates the work. You approve consequential steps. The system verifies what actually happened.**

---

## The product idea

A life is not one task. Work is not one prompt.

Korako is being built around a persistent **Human Journey**: goals, decisions, evidence, dependencies, approvals, execution and continuation across time.

Instead of treating every chat or agent run as an isolated event, the intended loop is:

```text
UNDERSTAND
  → PREPARE
  → PREVIEW
  → HUMAN GATE
  → EXECUTE
  → VERIFY
  → CONTINUE THE JOURNEY
```

The project deliberately separates:

```text
PREPARED != EXECUTED != VERIFIED != PUBLICLY REPRODUCED
```

A convincing animation, a green unit test or an agent saying “done” is not enough.

---

## Mira — the front door

**Mira** is the conversational interface for Korako.

The intended interaction model is one visible conversation state with a single active voice path:

```text
IDLE
 → LISTENING
 → THINKING
 → SPEAKING
 → WORKING
 → WAITING
 → DONE / ERROR
```

Critical interaction requirements include:

- voice and text entry;
- reliable interruption / **Stop Mira**;
- no duplicate simultaneous voice paths;
- observable working/waiting state;
- Human Gates before consequential actions;
- the Journey continuing even when one bounded task is waiting for approval.

The current focus is **not** adding more visible modules. It is proving one Mira path reliably and repeatedly.

---

## How Korako works

Korako is designed around a governed orchestration loop:

```text
GOAL
  → PLAN + DEPENDENCIES
  → AUTHORITY
  → BOUNDED EXECUTION
  → EVIDENCE
  → INDEPENDENT VERIFICATION
  → PERSISTED RESULT
  → RESUME / RECOVERY
```

### Human authority

Consequential actions are not meant to happen through ambient permission.

Examples include:

- sending or publishing;
- spending money;
- destructive deletion;
- credential activation;
- merge/deploy/cutover;
- other actions whose effect matters outside the local preview.

Those steps require the appropriate **Human Gate**.

### Independent verification

The worker that performs an action should not be the sole authority deciding that it succeeded.

The intended separation is:

```text
WORKER → CHECKER → AUDITOR → HUMAN / VERIFIED RESULT
```

### No-Postman principle

One of Korako's core goals is to reduce **human-postman work**: the person manually carrying context, files, status and instructions between systems that should have been able to coordinate.

Korako does not publish a quantified “time saved” number until real paired manual-vs-assisted measurements exist.

---

## Public proof now

This repository is intentionally smaller than the private canonical implementation.

It exists so an external reviewer can test specific claims without receiving credentials, private operational state or security-sensitive implementation details.

### Public Golden v0.1

The public Golden runtime reproduces:

```text
plan
 → authority
 → bounded execution
 → evidence
 → independent verification
 → persisted terminal state
```

It includes:

- a fail-closed Human Gate check;
- an independent verifier identity;
- a recovery test that interrupts before execution and resumes from an authorized checkpoint;
- No-Postman instrumentation that reports observed transfers without inventing a time-saved baseline.

### KORA Trust Contract v0.1

The machine-checked public trust harness covers:

- bounded authority;
- exact scope/budget binding;
- FREE/LOCAL FIRST routing;
- approval receipt integrity;
- replay rejection;
- tamper-evident evidence chaining;
- worker/verifier separation;
- lifecycle ordering;
- fail-closed recovery.

Run:

```bash
npm run trust
npm run trust:golden
```

### Reproduce the complete public proof

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
npm run trust
npm run trust:golden
npm run orchestra:check
npm run roi:selftest
npm run roi:check
```

For a fresh third-party review, use [Independent Reproduction](docs/INDEPENDENT_REPRODUCTION.md).

---

## What is verified vs still in validation

### PUBLICLY REPRODUCIBLE

- Public Golden v0.1 bounded control-loop slice;
- KORA Trust Contract v0.1;
- Human Gate failure behavior in the public harness;
- independent verifier separation in the public harness;
- public recovery/failure reproduction;
- public evidence-contract vectors;
- No-Postman instrumentation with no fabricated time-saved baseline;
- fail-closed ROI measurement boundary.

### INTERNALLY VERIFIED / DEVELOPMENT EVIDENCE

The public repository also records sanitized internal-development evidence where it is safe to do so. See [Development Evidence](docs/DEVELOPMENT_EVIDENCE.md).

### IN VALIDATION

Current development focus includes:

- one canonical Mira voice/session path;
- physical-device microphone and TTS reliability;
- wake/interrupt behavior;
- repeated browser/runtime acceptance;
- one complete verified Journey;
- measurable pilot evidence.

### NOT CLAIMED

Korako does **not** currently claim:

- production readiness;
- complete public reproduction of the private runtime;
- reliable voice operation across all target devices;
- product-market fit;
- defensible quantified Time Returned;
- autonomous permission to execute consequential actions.

---

## Current build focus — MIRA FIRST

The active proof sequence is intentionally narrow:

```text
M1 RUNTIME RECOVERY
  → ONE MIRA
  → 10× CONSECUTIVE VERIFIED VOICE PASSES
  → ONE VERIFIED JOURNEY
  → 10 REAL USERS
  → FIRST PAYMENT
  → REPEAT USAGE / RETENTION
  → SECOND JOURNEY
  → FOUNDING 100
  → MEASURABLE REVENUE + TIME RETURNED
  → M10 EVIDENCE
```

The sequence is a **roadmap**, not a claim that all stages are complete.

The immediate credibility gate is reliable Mira + one verified Journey, not a larger feature count.

---

## Support Korako / become a pilot partner

Korako can be supported through four paths:

- **financial sponsorship** — compute, models/APIs, voice infrastructure, runtime, testing and independent review;
- **pilot partnership** — bring a real multi-step workflow with measurable success criteria;
- **infrastructure sponsorship** — compute, cloud, model/API credits, test hardware or security/reliability services;
- **technical review** — independently challenge the architecture, evidence or failure handling.

**[See sponsorship and partnership details →](SPONSORS.md)**

A direct payment provider is intentionally not advertised until it has been activated and verified by the maintainer. The GitHub funding entry point therefore routes to the transparent sponsorship page first.

Sponsorship does not buy bypasses around Human Gates, unverified completion claims, access to private user data or control over verification.

---

## Funding → evidence

Funding is meant to accelerate evidence, not replace it.

Examples of what support can fund:

| Area | Why it matters |
| --- | --- |
| Voice / realtime | Lower latency, device testing, interruption and session reliability |
| Compute / models | Benchmark multiple providers without silently locking Korako to one |
| Runtime infrastructure | Reliable cloud control plane + local worker testing |
| Test hardware | Windows / Android / microphone / audio-path verification |
| Security review | Challenge Human Gate, authority and evidence boundaries |
| Pilot measurement | Real manual-vs-Korako measurements instead of invented ROI |
| Independent reproduction | External validation of published claims |

The public evidence ledger remains separate from sponsor recognition.

---

## For investors and technical reviewers

Start here:

1. [Investor / Technical Diligence](docs/INVESTOR_DILIGENCE.md)
2. [Development Evidence](docs/DEVELOPMENT_EVIDENCE.md)
3. [KORA Trust Kernel](docs/KORA_TRUST_KERNEL.md)
4. [Reliability and ROI](docs/RELIABILITY_AND_ROI.md)
5. [Independent Reproduction](docs/INDEPENDENT_REPRODUCTION.md)
6. [Public KORA trust harness](public-kora/v0.1/)
7. [Public Golden runtime](public-golden/v0.1/)
8. [Architecture](docs/ARCHITECTURE.md)
9. [Evidence boundaries](docs/EVIDENCE.md)
10. [Public IP Boundary](docs/PUBLIC_IP_BOUNDARY.md)
11. [External Review](docs/EXTERNAL_REVIEW.md)
12. [Security](SECURITY.md)

The intended reviewer question is not “does this README sound ambitious?”

It is:

> **Which claim can I reproduce, which claim is only internally evidenced, which claim is still being validated, and what would falsify it?**

---

## Why the name — Korako Yolawani

**Korako** comes from the Slovenian idea of **korak / koraki — a step / steps**.

The product is built around helping a person move through complex work one meaningful step at a time while preserving context, direction and control.

**Yolawani** represents the wider human journey around those steps — the goals, decisions, projects and experiences that give each step meaning.

There is also a philosophical parallel in Japanese:

- **道 (*michi*)** — path / way;
- **人生 (*jinsei*)** — human life / one's life;
- **人生の道 (*jinsei no michi*)** — the path of life.

This is inspiration and a conceptual parallel, not the linguistic origin or a literal translation of the brand.

> **A life is not one task. It is a journey made of steps.**

---

## Naming

- **KORAKO YOLAWANI** — public product and brand.
- **Mira** — conversational interface/persona.
- **KORA** — internal trust and orchestration kernel.
- **Spine** — human-observable projection of governed work.
- **Orchestra** — replaceable models, agents, tools and capabilities coordinated under the Journey.

The canonical orchestration implementation remains private.

---

## Public / private boundary

**Public by design:**

- product problem and operating principles;
- high-level architecture;
- sanitized proof slices;
- evidence contracts;
- explicit limitations;
- reviewer protocols;
- sponsorship and pilot entry points.

**Private by design:**

- canonical implementation;
- credentials;
- machine configuration;
- security-sensitive operational boundaries;
- private logs;
- unpublished pilot data;
- unpublished IP-sensitive material.

This repository currently has **no open-source LICENSE file**. Public visibility is not a reuse grant. See [Public IP Boundary](docs/PUBLIC_IP_BOUNDARY.md).

---

## Current credibility milestones

- [x] focused public flagship repository;
- [x] public product / private-core boundary documented;
- [x] reproducible synthetic evidence-contract harness;
- [x] clean-clone CI verification path;
- [x] development evidence ledger;
- [x] minimal public Golden runtime;
- [x] recovery scenario reproduced publicly;
- [x] KORA Trust Contract v0.1;
- [x] integrated Trust Golden path;
- [x] independent reproduction protocol;
- [x] responsible security disclosure policy;
- [ ] reliable ONE-MIRA physical-device voice acceptance;
- [ ] 10 consecutive verified voice passes;
- [ ] one complete externally understandable verified Journey;
- [ ] measured human manual-vs-Korako baseline;
- [ ] independent third-party reproduction/review returned;
- [ ] pilot evidence showing reduced coordination without weakening human control.

---

## Collaboration

Especially useful now:

- technical co-founder / lead engineer;
- reliability, security and architecture review;
- AI orchestration and evaluation expertise;
- voice/realtime systems expertise;
- product/UX collaboration;
- pilot partners with measurable multi-step workflows;
- infrastructure partners.

If you are evaluating the project, the most useful feedback is specific and falsifiable:

**What claim is unclear? What evidence is missing? What failure mode is unhandled? What would you need to reproduce independently?**

For sponsorship or pilots, see [Support Korako](SPONSORS.md).

---

## Security

Do not open a public issue containing secrets, credentials, private user/customer data or sensitive vulnerability details.

Follow [SECURITY.md](SECURITY.md) for responsible disclosure.

---

## Product principle

> **The human is the conductor. AI is the orchestra. Korako keeps the journey coherent.**

**Evidence before scale. Human authority before consequential execution.**
