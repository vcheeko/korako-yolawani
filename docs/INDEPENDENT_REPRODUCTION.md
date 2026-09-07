# Korako Yolawani — Independent Reproduction Protocol

This protocol is for an external reviewer who wants to test the public proof surface without access to the private canonical runtime.

## Scope

The public repository proves selected orchestration control semantics only. It does **not** expose or claim to reproduce the private production runtime.

## Fresh reproduction

Requirements:

- Node.js 20+
- a fresh clone of this repository
- no private credentials, services or machine configuration

Run:

```bash
npm test
```

The command runs the complete public proof stack:

```text
evidence-contract vectors
→ Public Golden v0.1
→ recovery scenario
→ No-Postman instrumentation
```

## Expected evidence

A valid clean run should show:

- the public evidence vector suite passes its positive case and rejects the included adversarial cases with the expected failure reasons;
- `PUBLIC_GOLDEN_V0_1` reaches `VERIFIED`;
- execution is blocked without the exact bounded approval;
- verifier identity is distinct from worker identity;
- the recovery scenario reaches `VERIFIED` after an interruption before execution;
- the public No-Postman slice reports zero human-postman transfers inside that bounded automated slice;
- `manual_baseline_measured` remains `false`;
- `time_saved_claimed` remains `false`.

A reviewer should treat any unexpected green result, missing expected failure, self-verification, hidden network dependency, or invented time-saved claim as a failure of the review.

## Record your run

Please record:

```text
repository commit SHA:
OS / environment:
Node version:
command executed:
exit code:
PUBLIC_GOLDEN verdict:
recovery verdict:
adversarial-vector verdicts:
manual_baseline_measured:
time_saved_claimed:
review verdict: PASS / PASS WITH LIMITATIONS / FAIL
notes:
```

## Claim boundary

A successful public reproduction means the checked-out public code reproduces the documented bounded proof semantics on the reviewer's machine.

It does **not** by itself prove:

- equivalence with the private runtime;
- production security or reliability;
- model intelligence;
- commercial validation;
- quantified human time saved;
- product-market fit.

For development claims that are internally verified but not publicly reproducible, see [`DEVELOPMENT_EVIDENCE.md`](DEVELOPMENT_EVIDENCE.md).

## Review rule

```text
PREPARED != EXECUTED != VERIFIED != PUBLICLY REPRODUCED
```

The useful review question is not whether the project looks convincing. It is whether each stated claim has evidence at the evidence class claimed for it.
