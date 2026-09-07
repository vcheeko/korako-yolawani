# Proof Stack v0.2 — Development Evidence Record

**Date:** 2026-09-07  
**Evidence class:** mixed — public proof remains publicly reproducible; product-runtime observations below are internally verified only.

This record separates the public reproducible proof stack from a sanitized development observation of the private daily-use runtime.

## Publicly reproducible layer

The repository's public proof remains reproducible with:

```bash
npm test
```

It covers the evidence-contract vectors, Public Golden v0.1, fail-closed authority, independent verification, recovery, persistence and bounded No-Postman instrumentation.

See [`2026-09-06-public-golden-v0.1.md`](2026-09-06-public-golden-v0.1.md) for the recorded GitHub-hosted clean run.

## Internally verified product-runtime observation

A sanitized daily-use verification on 2026-09-07 exercised the actual Mira browser surface and a bounded read-only work path.

Observed results:

- a clean production build completed successfully;
- the production page loaded with the checked JavaScript and CSS assets returning HTTP 200;
- the Mira text input hydrated correctly and enabled its submit control after browser input;
- a typed daily-use question produced a visible user turn and Mira response;
- the bounded goal `preveri git status` reached a visible `PREPARED` state;
- the separately displayed safe confirmation dispatched a **new** read-only runner task;
- that task reached `DONE` with `evidence_count = 1`;
- the UI reached `SAFE STEP VERIFIED`;
- the observed Git result correctly reported a dirty worktree rather than inventing a clean state.

This product-runtime observation is **INTERNALLY VERIFIED**, not independently publicly reproduced.

## Live No-Postman instrumentation

For the same bounded `preveri git status` flow, the internal measurement recorded:

- prepare visible: ~0.20 s;
- runner task `DONE`: ~3.15 s;
- UI verified: ~7.50 s;
- natural-language inputs: 1;
- explicit safe confirmation clicks: 1;
- human-postman transfers observed inside the Korako flow: 0;
- tool switches requested from the user: 0;
- manual copy/paste requested: 0.

The UI verification time includes the current polling interval and is not presented as a latency target.

Critically:

```text
manual_baseline_measured = false
time_saved_claimed = false
```

Therefore this record demonstrates the Korako-side instrumentation and an end-to-end safe flow, **not a quantified human time-saving claim**.

## Failure found and corrected during verification

The proof pass detected a real browser failure before the successful run: server-rendered UI remained visible while client hydration was broken because development and production processes had contaminated a shared build-output state. A clean production build and restart through the canonical runtime launcher restored consistent static assets and hydration.

This is included because a proof system is more useful when it exposes failures than when it only records green runs.

## Remaining evidence gap

A defensible manual-vs-Korako time-saved claim still requires an observed human baseline for a comparable workflow. Until that measurement exists, quantified time saved remains **UNKNOWN**.

Independent public reproduction of the public proof can follow [`../../docs/INDEPENDENT_REPRODUCTION.md`](../../docs/INDEPENDENT_REPRODUCTION.md).
