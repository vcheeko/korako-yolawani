# Korako Yolawani — Development Evidence Ledger

**Status date:** 2026-09-07  
**Stage:** active prototype / personal daily-use validation

This ledger separates what can be reproduced publicly from what has been verified only inside the private development core.

## Evidence classes

- **PUBLICLY REPRODUCIBLE** — an external reviewer can inspect and rerun the evidence in this repository.
- **INTERNALLY VERIFIED** — implementation/evidence exists in the private canonical development runtime, but is not exposed for independent public reproduction.
- **IN VALIDATION** — implemented or integrated, but the user experience or end-to-end behavior is still being refined.
- **NOT YET PROVEN** — a target that should not be presented as achieved.

## Proven publicly today

### Public evidence-contract harness — PUBLICLY REPRODUCIBLE

The dependency-free verifier and synthetic positive/adversarial vectors under [`public-evidence/v0.2/`](../public-evidence/v0.2/) can be rerun with:

```bash
npm run evidence
```

The harness checks terminal completion state, expected evidence membership, duplicate rejection, SHA-256 shape, provenance, read-only changed-file evidence, verifier identity, PASS verdict and evidence-set binding.

### Public Golden v0.1 — PUBLICLY REPRODUCIBLE

[`public-golden/v0.1/`](../public-golden/v0.1/) is the first minimal runnable Korako control-loop slice:

`plan → authority → bounded execution → evidence → independent verification → persisted terminal state`

It also contains a fail-closed recovery scenario and No-Postman instrumentation.

Run the complete public proof stack with:

```bash
npm test
```

A fresh GitHub-hosted run on commit `e56f90089674471443dd09c0ecceb11fb6d66712` completed successfully. The Golden slice reached `VERIFIED`, rejected execution without approval, verified with a distinct verifier identity, reproduced recovery after an interruption, and observed zero human-postman transfers inside the bounded automated slice.

See [`public-evidence/runs/2026-09-06-public-golden-v0.1.md`](../public-evidence/runs/2026-09-06-public-golden-v0.1.md).

### Independent reproduction protocol — PUBLICLY AVAILABLE

[`INDEPENDENT_REPRODUCTION.md`](INDEPENDENT_REPRODUCTION.md) now provides a fresh-clone review protocol, expected evidence markers and a reviewer verdict template. The protocol exists; **an independent third-party result has not yet been returned**.

### No-Postman measurement boundary — PARTIALLY PUBLICLY REPRODUCIBLE

The public benchmark instruments the automated side of the slice and deliberately reports:

- `manual_baseline_measured: false`
- `time_saved_claimed: false`

So the repo proves the instrumentation works, but **does not yet prove quantified time saved versus manual work**.

## Verified inside private development

| Milestone | Evidence class | Current truth |
| --- | --- | --- |
| Personal Alpha | INTERNALLY VERIFIED | Integrated into the private canonical development core |
| Hybrid Mira Orb | INTERNALLY VERIFIED / IN VALIDATION | Integrated; natural uninterrupted conversation is still being refined |
| Local/free-first voice routing | INTERNALLY VERIFIED / IN VALIDATION | Integrated with paid/cloud escalation guarded rather than used as the default path |
| Human Gate preview/authority boundary | INTERNALLY VERIFIED | Preview and authorization remain distinct for consequential work |
| Personal Symphony control room | INTERNALLY VERIFIED / IN VALIDATION | Human-visible orchestration state integrated for daily-use validation |
| Golden Daily Use | INTERNALLY VERIFIED / IN VALIDATION | Activated for personal daily-use validation |
| Local real-use smoke · 2026-09-07 | INTERNALLY VERIFIED | Local date, free-web and local-chat paths returned successfully; guarded work surfaces remained bounded |
| Production Mira text E2E · 2026-09-07 | INTERNALLY VERIFIED | Clean production build, hydrated Mira input, browser submit, visible user turn and visible Mira response all passed |
| Safe Git-status E2E · 2026-09-07 | INTERNALLY VERIFIED | Mira `PREPARED` → explicit safe confirmation → new read-only runner task → `DONE` → evidence count 1 → UI `VERIFIED` |
| Live No-Postman UI instrumentation · 2026-09-07 | INTERNALLY VERIFIED | 0 human-postman transfers, 0 requested tool switches and 0 requested copy/paste inside the bounded Korako flow; manual baseline remains unmeasured |

A sanitized record of the latest product-runtime proof is available at [`public-evidence/runs/2026-09-07-proof-stack-v0.2.md`](../public-evidence/runs/2026-09-07-proof-stack-v0.2.md). It intentionally does not expose private code, credentials, machine paths or security-sensitive configuration.

## Current measured Korako-side timings

For the internally verified bounded `preveri git status` flow:

- PREPARED visible: approximately **0.20 s**;
- runner task DONE: approximately **3.15 s**;
- UI VERIFIED: approximately **7.50 s**.

The final number includes the current UI polling interval. These timings are observations of one development run, not production latency claims or time-saved claims.

## What this does not prove

The current evidence does not prove production readiness, security against all threats, independent third-party acceptance, commercial validation, model intelligence, or that the private runtime is publicly reproducible end to end.

It also does not yet prove a quantified reduction in human coordination time. That requires a measured baseline-vs-Korako human trial rather than estimates.

## Next evidence milestones

- [x] minimal public Golden runtime connecting plan → authority → bounded execution → evidence → verification → persistent continuation;
- [x] public recovery/failure scenario reproduced end to end;
- [x] internally verified local real-use smoke;
- [x] internally verified real Mira/Korako browser flow from goal to useful verified read-only result;
- [x] live Korako-side No-Postman instrumentation with zero observed relay in the bounded flow;
- [x] independent reproduction protocol prepared;
- [ ] measured human manual-vs-Korako baseline with defensible time-saved data;
- [ ] independent third-party reproduction/review returned;
- [ ] pilot evidence from a real external workflow/user;
- [ ] production-readiness/security claims only after evidence supports them.

## Evidence rule

```text
PREPARED != EXECUTED != VERIFIED != PUBLICLY REPRODUCIBLE
```

The purpose of this ledger is not to make Korako look more finished than it is. It is to make progress inspectable and claims falsifiable.
