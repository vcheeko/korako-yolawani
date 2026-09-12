# KORA Trust Contract v0.1 — local release-candidate evidence

**Date:** 2026-09-12
**Base commit:** `ca27cc81c30eda7720dd1747bfc3eb70a8a61f90`
**Branch:** `work/kora-trust-kernel-v0.1`
**Environment:** Node.js `v24.19.0`
**Publication status:** local only; remote CI, push, PR and merge pending Human Gate

## Reproduction

```bash
npm test
```

## Observed result

- Existing public evidence vectors: PASS.
- Existing Public Golden, recovery and No-Postman instrumentation: PASS.
- KORA authority vectors: 15/15 PASS.
- Deterministic adversarial property cases: 1,000 PASS.
- Consequential-action fail-closed rate in tested vectors: 100%.
- Approval binding, expiry, tamper and replay checks: PASS.
- Evidence-ledger integrity checks: PASS.
- Independent verifier checks: PASS.
- Lifecycle and recovery checks: PASS.
- Integrated bounded Trust Golden: `VERIFIED`.
- Simulated external mutation: stopped at Human Gate; receipt binding verified; external action not executed.
- Paid cost: €0.
- Observed human-postman transfers inside the integrated bounded slice: 0.
- ROI validator synthetic self-test: PASS.
- Real paired ROI trials: 0/10 minimum; `EVIDENCE_INCOMPLETE`; no time-saved claim.
- Diff whitespace check: PASS.
- Secret and machine-path pattern scan across changed surfaces: no match observed.

## Claim boundary

This record supports a local release candidate for a public contract harness. It does not support production-security, third-party validation, commercial traction or quantified ROI claims. Synthetic ROI rows test only validator behavior and are not user evidence.
