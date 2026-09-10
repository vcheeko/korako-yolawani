# Korako Yolawani — Development Evidence Ledger

**Status date:** 2026-09-10  
**Stage:** active prototype / Golden Demo validation

This ledger separates what can be reproduced publicly from what has been verified only inside the private development runtime.

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

A previously recorded fresh GitHub-hosted run on commit `e56f90089674471443dd09c0ecceb11fb6d66712` completed successfully. The Golden slice reached `VERIFIED`, rejected execution without approval, verified with a distinct verifier identity, reproduced recovery after an interruption, and observed zero human-postman transfers inside the bounded automated slice.

See [`public-evidence/runs/2026-09-06-public-golden-v0.1.md`](../public-evidence/runs/2026-09-06-public-golden-v0.1.md).

### Independent reproduction protocol — PUBLICLY AVAILABLE

[`INDEPENDENT_REPRODUCTION.md`](INDEPENDENT_REPRODUCTION.md) provides a fresh-clone review protocol, expected evidence markers and a reviewer verdict template. The protocol exists; **an independent third-party result has not yet been returned**.

### No-Postman measurement boundary — PARTIALLY PUBLICLY REPRODUCIBLE

The public benchmark instruments the automated side of the slice and deliberately reports:

- `manual_baseline_measured: false`
- `time_saved_claimed: false`

So the repo proves the instrumentation works, but **does not yet prove quantified time saved versus manual work**.

## Verified inside private development

| Milestone | Evidence class | Current truth |
| --- | --- | --- |
| Personal Alpha | INTERNALLY VERIFIED | Integrated into the private canonical development runtime |
| Hybrid Mira Orb | INTERNALLY VERIFIED / IN VALIDATION | Integrated; natural uninterrupted conversation and final browser voice acceptance are still being refined |
| Local/free-first voice routing | INTERNALLY VERIFIED / IN VALIDATION | Local speech-to-text is available; browser/TTS completion remains in validation |
| Human Gate preview/authority boundary | INTERNALLY VERIFIED | Consequential email sending remains preview-only without explicit approval |
| Human Journey Spine | INTERNALLY VERIFIED / IN VALIDATION | Canonical user-facing model uses five visible stages: Listen → Understand → Plan → Verify → Done; Human Gate remains an interrupt, not a completion stage |
| Golden Daily Use | INTERNALLY VERIFIED / IN VALIDATION | Active as the current personal Golden Demo validation path |
| Production Mira text E2E · 2026-09-07 | INTERNALLY VERIFIED | Clean production build, hydrated Mira input, browser submit, visible user turn and visible Mira response passed |
| Safe Git-status E2E · 2026-09-07 | INTERNALLY VERIFIED | Mira `PREPARED` → explicit safe confirmation → read-only runner task → `DONE` → evidence → UI `VERIFIED` passed |
| Live No-Postman UI instrumentation · 2026-09-07 | INTERNALLY VERIFIED | 0 human-postman transfers, 0 requested tool switches and 0 requested copy/paste inside the bounded tested flow; manual baseline remains unmeasured |
| Golden Demo automated gate · 2026-09-10 | INTERNALLY VERIFIED | **413 tests passed, 0 failed, 1 environment-dependent skip**; TypeScript validation passed; production Webpack build passed |
| Golden Demo production smoke · 2026-09-10 | INTERNALLY VERIFIED | Local production runtime root returned HTTP 200; calculator, current weather, Slovenian cinema schedule lookup, Slovenia job search, Tirol job search and governed email-send blocking returned expected bounded results |
| Slovenian rail intent routing · 2026-09-10 | INTERNALLY VERIFIED | Natural Slovenian train phrasing routes to the bounded official rail/IJPP fallback rather than generic search |
| Live LPP departure retrieval · 2026-09-10 | IN VALIDATION | Official LPP source can return departure data, but the bounded Korako runtime path still needs latency/fetch-path completion before this is called verified |
| Natural voice / TTS Golden acceptance · 2026-09-10 | IN VALIDATION | Local STT path is ready in the tested runtime; final browser speech-output/TTS acceptance and uninterrupted natural conversation are not yet proven |

The current 2026-09-10 record intentionally exposes only sanitized result-level evidence. It does not publish private code, private branch identities, credentials, machine paths or security-sensitive configuration.

## Current build step — PROOF-001

The primary user-facing evidence gate remains [PROOF-001 — Voice → Verified Action](https://github.com/vcheeko/korako-yolawani/issues/3).

The current objective is to prove one real useful journey:

`Mira voice → intent → visible journey state → bounded plan → capability route → execution where authorized → independent verification → evidence → verified result`

Passing automated tests or a production build alone does **not** close this gate.

## What this does not prove

The current evidence does not prove:

- production readiness;
- security against all threats;
- complete natural voice acceptance;
- 10 consecutive successful end-to-end Golden runs;
- independent third-party acceptance;
- quantified time saved versus a measured manual baseline;
- commercial validation;
- that the private canonical runtime is publicly reproducible end to end.

## Next evidence milestones

- [x] minimal public Golden runtime connecting plan → authority → bounded execution → evidence → verification → persistent continuation;
- [x] public recovery/failure scenario reproduced end to end;
- [x] internally verified real Mira/Korako browser flow from goal to useful verified read-only result;
- [x] live Korako-side No-Postman instrumentation with zero observed relay in the bounded tested flow;
- [x] current private Golden Demo line passes the full automated test and production build gate;
- [x] current production smoke covers calculator, weather, cinema, Slovenia jobs, Tirol jobs and governed email preview/send blocking;
- [ ] browser/TTS acceptance for natural Mira conversation;
- [ ] live LPP departure retrieval through the bounded runtime path;
- [ ] one repeated real Mira voice → useful action → independent verification Golden path;
- [ ] 10 consecutive bounded Golden runs or fully classified failures;
- [ ] measured human manual-vs-Korako baseline with defensible time-saved data;
- [ ] independent third-party reproduction/review returned;
- [ ] pilot evidence from a real external workflow/user;
- [ ] production-readiness/security claims only after evidence supports them.

## Evidence rule

```text
PREPARED != EXECUTED != VERIFIED != PUBLICLY REPRODUCIBLE
CI_VERIFIED != BROWSER_E2E_VERIFIED != FOUNDER_ACCEPTED
```

The purpose of this ledger is not to make Korako look more finished than it is. It is to make progress inspectable and claims falsifiable.
