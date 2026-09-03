# Korako Yolawani - External Technical Review Packet

**Purpose:** give an independent reviewer a compact, falsifiable surface for reviewing Korako Yolawani without exposing private implementation or credentials.

## What is claimed today

Korako Yolawani is a prototype / evidence-building operating layer for human-directed AI-assisted work.

Its thesis is that serious AI workflows benefit from explicit state, dependencies, authority boundaries, bounded execution, evidence, verification and recovery.

It is **not** claimed to be production-ready, independently validated or publicly reproduced end to end.

## Review order

1. [`../README.md`](../README.md)
2. [`ARCHITECTURE.md`](ARCHITECTURE.md)
3. [`EVIDENCE.md`](EVIDENCE.md)
4. [`../public-evidence/v0.2/`](../public-evidence/v0.2/)

## Questions to try to falsify

### Architecture

- Is the separation between human intent, authorization, execution and verification meaningful?
- Are lifecycle states sufficient to distinguish requested, executed and verified work?
- Could stale or conflicting state silently become canonical?
- Does recovery avoid accidental duplicate execution?

### Authority and safety

- Are high-consequence actions separable from low-risk automatic work?
- Are fail-closed paths explicit enough?
- Is least privilege structural or merely stated?
- Where could model output gain more authority than intended?

### Evidence

- Does the public verifier really bind evidence to a terminal claim?
- Can malformed, missing, duplicated or forged evidence pass unexpectedly?
- Are provenance checks meaningful enough for the claims drawn from them?
- Are any public claims stronger than the reproducible evidence?

### Public Golden target

- Is the proposed public runtime small enough to audit?
- Does it demonstrate distinctive value rather than only a conventional test harness?
- Which negative or recovery scenario is missing?
- What is the smallest additional test that would materially increase confidence?

## Requested reviewer output

```text
REVIEWER:
DATE:
COMMIT / VERSION REVIEWED:

VERDICT:
[ ] credible within stated scope
[ ] credible with required changes
[ ] insufficient evidence
[ ] architecture concern

TOP 3 STRENGTHS:
1.
2.
3.

TOP 3 RISKS / GAPS:
1.
2.
3.

ONE FAILURE CASE KORAKO MUST ADD:

ONE CLAIM THAT SHOULD BE NARROWED (if any):

ONE NEXT TEST THAT WOULD MOST INCREASE CONFIDENCE:

PUBLIC REPRODUCTION ATTEMPT:
[ ] pass
[ ] fail
[ ] not attempted

NOTES:
```

A positive review should mean only that the reviewed architecture/evidence is credible within the explicitly stated prototype scope.

The most valuable review is adversarial and specific: identify a concrete way the worker, verifier, persistence layer, model or public evidence could create a false completion claim, unsafe authority escalation or misleading confidence signal.
