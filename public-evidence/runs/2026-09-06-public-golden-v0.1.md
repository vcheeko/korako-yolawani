# Public Golden v0.1 — CI Evidence Record

**Date:** 2026-09-06  
**Commit:** `e56f90089674471443dd09c0ecceb11fb6d66712`  
**GitHub Actions run:** [34063913891](https://github.com/vcheeko/korako-yolawani/actions/runs/34063913891)  
**Result:** `SUCCESS`

This record captures the public clean-run result for the first minimal Korako Yolawani Golden control-loop slice.

## Clean-run results

The workflow checked out the public repository on a fresh GitHub-hosted Ubuntu runner and executed `npm test`, which runs the complete public proof stack.

### Evidence-contract suite

`KORA_PUBLIC_VECTOR_SUITE_V0_2=PASS`

The suite also confirmed expected failures for adversarial vectors including forged verifier binding, missing evidence, forged provenance, non-empty changed-files evidence, wrong verifier identity, duplicate evidence, malformed hash, terminal failure state, non-completed state and verifier FAIL verdict.

### Public Golden v0.1

- verdict: `PASS`
- terminal state: `VERIFIED`
- Human Gate fail-closed check: `true`
- independent verifier check: `true`
- human-postman transfers observed inside this bounded slice: `0`

### Recovery proof

- verdict: `PASS`
- terminal state: `VERIFIED`
- recovery count: `1`
- fail-closed before recovery: `true`
- restored checkpoint: `AUTHORIZED`

### No-Postman instrumentation

On this GitHub runner the automated slice completed in `4.94 ms`. This timing is environment-specific and is **not** presented as a user time-saved claim.

- human decisions represented by the slice: `1`
- human-postman transfers observed inside the slice: `0`
- system stage transitions: `4`
- manual baseline measured: `false`
- time saved claimed: `false`

## Proof boundary

This evidence proves that the public repository contains a runnable, dependency-free control-loop slice whose selected authority, execution, evidence, verification, persistence and recovery checks pass on a clean GitHub-hosted runner.

It does **not** prove the private runtime, model intelligence, production security, production reliability, product-market fit, independent third-party acceptance or quantified human time saved.
