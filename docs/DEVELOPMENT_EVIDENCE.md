# Korako Yolawani — Development Evidence Ledger

**Status date:** 2026-09-07  
**Stage:** active prototype / personal daily-use validation

This ledger separates what can be reproduced publicly from what has been verified only inside the private development core.

## Evidence classes

- **PUBLICLY REPRODUCIBLE** — an external reviewer can inspect and rerun the evidence in this repository.
- **INTERNALLY VERIFIED** — implementation/evidence exists in the private canonical development repository, but is not exposed for independent public reproduction.
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

See the development record: [`public-evidence/runs/2026-09-06-public-golden-v0.1.md`](../public-evidence/runs/2026-09-06-public-golden-v0.1.md).

### No-Postman measurement boundary — PARTIALLY PUBLICLY REPRODUCIBLE

The public benchmark instruments the automated side of the slice and reports human decisions, system transitions and observed human-postman transfers. It deliberately reports:

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
| Live No-Postman evidence collection | INTERNALLY VERIFIED / IN VALIDATION | Evidence collection activated; a defensible time-saved metric is not yet established |
| Local real-use smoke · 2026-09-07 | INTERNALLY VERIFIED | Local date, free-web and local-chat paths returned successfully; read-only work remained analysis-only and the execution-facing surface remained explicit-confirmation-only |

A sanitized internal evidence record for the real-use smoke was written to the private development evidence store. This row is **not** presented as independently publicly reproducible.

## What this does not prove

The current evidence does not prove production readiness, security against all threats, independent third-party acceptance, commercial validation, model intelligence, or that the private runtime is publicly reproducible end to end.

It also does not yet prove a quantified reduction in human coordination time. That requires a measured baseline-vs-Korako trial rather than estimates.

## Next evidence milestones

- [x] minimal public Golden runtime connecting plan → authority → bounded execution → evidence → verification → persistent continuation;
- [x] public recovery/failure scenario reproduced end to end;
- [x] internally verified local real-use smoke across local, free-web and guarded work surfaces;
- [ ] measured No-Postman baseline comparison with defensible time-saved data;
- [ ] real user-facing Mira/Korako demo showing one useful task from goal to verified result;
- [ ] independent third-party reproduction/review;
- [ ] pilot evidence from a real workflow/user;
- [ ] production-readiness/security claims only after evidence supports them.

## Evidence rule

```text
PREPARED != EXECUTED != VERIFIED != PUBLICLY REPRODUCIBLE
```

The purpose of this ledger is not to make Korako look more finished than it is. It is to make progress inspectable and claims falsifiable.
