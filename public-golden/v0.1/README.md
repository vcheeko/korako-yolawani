# Korako Yolawani — Public Golden v0.1

This is a deliberately small, dependency-free, publicly reproducible control-loop slice.

It demonstrates:

`plan → authority → bounded execution → evidence → independent verification → persisted terminal state`

It also includes a fail-closed recovery scenario and No-Postman instrumentation.

## Run

```bash
npm run golden
npm run golden:recovery
npm run golden:benchmark
```

## What the demo actually does

The worker reads a bounded local text file and writes one deterministic Markdown artifact inside a temporary workspace. Execution is blocked until an exact approval token is supplied. Evidence contains an artifact SHA-256 hash, provenance and changed-file scope. A verifier with a different identity checks the evidence before the run can reach `VERIFIED`.

The recovery test interrupts the run after authorization but before execution, confirms no artifact was written, restores the authorized checkpoint, executes, verifies and persists the recovered terminal state.

The benchmark reports only the automated slice and observed human-postman transfers. It intentionally does **not** invent a manual baseline or a time-saved claim.

## What this does not prove

This slice does not prove model intelligence, production security, production reliability, the private runtime, product-market fit, or quantified human time saved. It is a public proof of selected orchestration control semantics only.
