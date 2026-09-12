# Korako Reliability and No-Postman ROI Protocol

**Status:** executable reliability proof + prepared human measurement protocol
**Effective:** 2026-09-12

## Reliability proof

`npm run trust` executes positive and adversarial vectors for:

- authority and fail-closed policy decisions;
- exact budget and scope binding;
- Human Gate approval integrity, expiry and replay rejection;
- tamper-evident evidence chaining;
- independent worker/verifier separation;
- lifecycle ordering and fail-closed recovery.

`npm run trust:golden` then exercises the components together in one bounded local flow and proves that an external mutation cannot leave `HUMAN_GATE` without a valid receipt. The simulated external action is not executed.

The output is a reproducible software-contract result. It is not yet production or third-party evidence.

## Human ROI protocol

Korako must not estimate or invent time saved. Each trial measures the same real workflow twice:

1. **Manual mode:** the user completes the workflow with their normal tools.
2. **Korako mode:** the user gives the goal to Mira and Korako completes the bounded workflow.
3. Record elapsed time, clicks, tool switches, copy/paste transfers, errors, cost and completion.
4. Preserve both rows under the same `trial_id`, `workflow_id` and `user_id`.
5. Do not count setup or training in only one mode; the measurement boundary must match.
6. Do not publish a time-saved claim before at least 10 paired trials and an evidence review.

Use [`manual-vs-korako-template.csv`](../benchmarks/roi/manual-vs-korako-template.csv), then run:

```bash
npm run roi:check -- path/to/measured.csv
```

The validator deliberately returns `EVIDENCE_INCOMPLETE` for the empty template. That refusal is part of the evidence discipline.

`npm run roi:selftest` checks the validator with synthetic fixtures only. Synthetic rows prove calculation and fail-closed behavior; they are never counted as user or investment evidence.

## First recommended workflow

Measure one Golden Demo job workflow from a spoken or typed goal through a verified result. Keep the task, source set, time boundary and success criterion identical in both modes. External sending remains outside the benchmark unless separately approved at a Human Gate.
