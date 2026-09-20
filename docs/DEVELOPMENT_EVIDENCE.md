# Korako Yolawani — Development Evidence Ledger

**Status date:** 2026-09-21
**Stage:** active prototype / MIRA FIRST core reliability validation

This ledger separates what can be reproduced publicly from what has been verified only inside the private development core.

## Evidence classes

- **PUBLICLY REPRODUCIBLE** — an external reviewer can inspect and rerun the evidence in this repository.
- **INTERNALLY VERIFIED** — implementation/evidence exists in the private canonical development runtime, but is not exposed for independent public reproduction.
- **IN VALIDATION** — implemented or integrated, but the user experience or end-to-end behavior is still being refined.
- **NOT YET PROVEN** — a target that should not be presented as achieved.

## Proven publicly today

### KORA Trust Contract v0.1 — PUBLICLY REPRODUCIBLE

[`public-kora/v0.1/`](../public-kora/v0.1/) executes deterministic positive and adversarial checks for authority, risk, FREE/LOCAL FIRST, budget scope, approval binding/expiry/replay, tamper-evident evidence, independent verification, lifecycle ordering and recovery.

Its integrated Golden path also runs a bounded local action through policy → lifecycle → execution → ledger → independent verification, while a simulated external mutation remains unexecuted behind a receipt-bound Human Gate.

The release-candidate evidence is recorded in [`2026-09-12-kora-trust-release-candidate.md`](../public-evidence/runs/2026-09-12-kora-trust-release-candidate.md). KORA Trust Contract v0.1 was merged to public `main` through PR #5 on 2026-09-12. GitHub Actions `public-evidence` run #31 completed successfully on merged commit `bdc6c7017e1698822e5ee5382e60f4e1fd4963cb`.

The companion ROI validator is also executable, but deliberately reports `EVIDENCE_INCOMPLETE` until paired human manual-vs-Korako measurements are supplied. No time-saved claim is made from automated timings alone.

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
| KVSP v0.1 · 2026-09-18 | INTERNALLY VERIFIED / MERGED | Machine-readable verified-work spine merged to the private canonical runtime; public repo does not claim the private implementation is independently reproduced. |
| Mira Text Core · 2026-09-20 | INTERNALLY VERIFIED / MERGED | Reconciled text-first Mira path merged to private canonical `main`; dedicated voice/session/wake redesign was explicitly out of scope. |
| MIRA CORE 3-path trace · 2026-09-20 | INTERNALLY VERIFIED / IN VALIDATION | Space and orb were traced to the same main conversation controller; the baseline did not contain a true wake-word entry. A bounded reconciliation candidate exists, but exact-head Checker review, browser/runtime 3-path proof, Stop Mira verification and 10 consecutive PASS runs remain open. |
| Personal Alpha | INTERNALLY VERIFIED | Integrated into the private canonical development core |
| Hybrid Mira Orb | INTERNALLY VERIFIED / IN VALIDATION | Integrated; natural uninterrupted conversation is still being refined |
| Local/free-first voice routing | INTERNALLY VERIFIED / IN VALIDATION | Integrated with paid/cloud escalation guarded rather than used as the default path |
| Human Gate preview/authority boundary | INTERNALLY VERIFIED | Preview and authorization remain distinct for consequential work |
| Personal Symphony control room | INTERNALLY VERIFIED / IN VALIDATION | Human-visible orchestration state integrated for daily-use validation |
| ONE-MIRA canonical surface · 2026-09-13 | INTERNALLY VERIFIED | Active home/alpha/ops/phone paths converge on one Mira renderer; retired alternative UI surfaces are quarantined or redirected. Private gate: 446 tests, 445 pass, 0 fail, 1 environment-dependent skip; TypeScript and production build passed. |
| ONE-MIRA browser layout · 2026-09-13 | INTERNALLY VERIFIED / IN VALIDATION | Desktop verification observed one active Mira renderer; true 393 × 852 browser emulation preserved all five Spine stages and all five Orchestra roles with document width equal to viewport width. Physical-device acceptance remains unproven. |
| Golden Daily Use | INTERNALLY VERIFIED / IN VALIDATION | Activated for personal daily-use validation |
| Local real-use smoke · 2026-09-07 | INTERNALLY VERIFIED | Local date, free-web and local-chat paths returned successfully; guarded work surfaces remained bounded |
| Production Mira text E2E · 2026-09-07 | INTERNALLY VERIFIED | Clean production build, hydrated Mira input, browser submit, visible user turn and visible Mira response all passed |
| Safe Git-status E2E · 2026-09-07 | INTERNALLY VERIFIED | Mira `PREPARED` → explicit safe confirmation → new read-only runner task → `DONE` → evidence count 1 → UI `VERIFIED` |
| Live No-Postman UI instrumentation · 2026-09-07 | INTERNALLY VERIFIED | 0 human-postman transfers, 0 requested tool switches and 0 requested copy/paste inside the bounded Korako flow; manual baseline remains unmeasured |

A sanitized record of the latest product-runtime checkpoint is available at [`public-evidence/runs/2026-09-13-one-mira-canonical.md`](../public-evidence/runs/2026-09-13-one-mira-canonical.md). It intentionally does not expose private code, credentials, machine paths or security-sensitive configuration.

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
- [x] KVSP v0.1 merged in the private canonical runtime;
- [x] Mira Text Core reconciled and merged to private canonical `main`;
- [x] Mira voice 3-path trace completed and blocker class reduced to a concrete wake/interruption/runtime-verification gate;
- [ ] exact current MIRA CORE candidate independently checked;
- [ ] browser/runtime Space → Orb → Hey Mira convergence verified;
- [ ] Stop Mira interruption verified against the same authoritative controller;
- [ ] 10 consecutive full-path runtime PASS runs;
- [ ] ONE VERIFIED JOURNEY completed end to end;
- [x] independent reproduction protocol prepared;
- [ ] measured human manual-vs-Korako baseline with defensible Time Returned data;
- [ ] independent third-party reproduction/review returned;
- [ ] pilot evidence from a real external workflow/user;
- [ ] production-readiness/security claims only after evidence supports them.

## Evidence rule

```text
PREPARED != EXECUTED != VERIFIED != PUBLICLY REPRODUCIBLE
```

The purpose of this ledger is not to make Korako look more finished than it is. It is to make progress inspectable and claims falsifiable.
