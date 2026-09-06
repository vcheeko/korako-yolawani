# Korako Yolawani — Public Evidence Index

This repository is the public flagship surface for Korako Yolawani.

The canonical implementation remains private. Public evidence is intentionally narrower than private development claims.

## State rule

```text
PREPARED != EXECUTED != VERIFIED != PUBLICLY REPRODUCED
```

## Reproducible now

### Evidence-contract harness

The repository includes a dependency-free verifier and synthetic positive/adversarial vectors:

- [`public-evidence/v0.2/golden-public-vectors.json`](../public-evidence/v0.2/golden-public-vectors.json)
- [`public-evidence/v0.2/verify.mjs`](../public-evidence/v0.2/verify.mjs)

Run:

```bash
npm run evidence
```

The harness checks selected evidence semantics including terminal completion state, expected evidence-set membership, duplicate rejection, SHA-256 shape validation, provenance, verifier identity, verifier PASS verdict and evidence-set binding.

### Public Golden v0.1

The repository also includes the first runnable public control-loop slice under [`public-golden/v0.1/`](../public-golden/v0.1/).

It reproduces:

`plan → authority → bounded execution → evidence → independent verification → persisted terminal state`

Run:

```bash
npm run golden
npm run golden:recovery
npm run golden:benchmark
```

The Golden demo blocks execution without approval, uses a distinct verifier identity, persists state and reaches `VERIFIED` only after evidence checks pass.

The recovery scenario interrupts the authorized run before execution, confirms fail-closed behavior, resumes from the checkpoint and verifies the recovered result.

The No-Postman benchmark instruments the automated slice but explicitly does **not** claim a manual baseline or quantified time saved.

A GitHub-hosted clean-run record is available at [`public-evidence/runs/2026-09-06-public-golden-v0.1.md`](../public-evidence/runs/2026-09-06-public-golden-v0.1.md).

## Reproduce the full public proof stack

```bash
npm test
```

## Not reproduced by the public stack

A green run does **not** prove:

- the private canonical runtime is identical to the public slice;
- the private runtime is publicly reproducible end to end;
- model intelligence or autonomous task quality;
- production security;
- production reliability;
- production database or credentials;
- product-market fit;
- independent third-party acceptance;
- quantified human time saved.

## Next evidence steps

The next credibility increases are:

1. a measured manual-vs-Korako No-Postman baseline;
2. a real user-facing Mira/Korako task demo from goal to useful verified result;
3. independent third-party reproduction/review;
4. pilot evidence from a real workflow/user.

## Provenance note

The public verifier, vectors and Golden runtime are intentionally sanitized public proofs. They are not exports of private operational evidence or credentials.
