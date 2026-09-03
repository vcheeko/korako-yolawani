# Korako Yolawani — Public Evidence Index

This repository is the public flagship surface for Korako Yolawani.

The canonical KORA implementation remains private. Public evidence is intentionally narrower than private development claims.

## State rule

```text
PREPARED != EXECUTED != VERIFIED != PUBLICLY REPRODUCED
```

## Reproducible now

The repository includes a dependency-free public evidence-contract harness:

- [`public-evidence/v0.2/golden-public-vectors.json`](../public-evidence/v0.2/golden-public-vectors.json)
- [`public-evidence/v0.2/verify.mjs`](../public-evidence/v0.2/verify.mjs)

Run:

```bash
npm run evidence
```

The harness uses synthetic public vectors. It checks selected evidence semantics such as:

- terminal completion state;
- expected evidence-set membership;
- duplicate evidence rejection;
- SHA-256 shape validation;
- expected provenance;
- read-only changed-files evidence;
- verifier identity;
- verifier PASS verdict;
- evidence-set binding;
- exact expected failure reason for adversarial cases.

## Not reproduced by this harness

A green run does **not** prove:

- the private KORA runtime is identical to this harness;
- the private runtime is publicly reproducible end to end;
- production security;
- production reliability;
- production database or credentials;
- product-market fit;
- independent third-party acceptance.

## Next evidence step

The next meaningful increase in credibility is the minimal public Golden runtime described in [`ARCHITECTURE.md`](ARCHITECTURE.md).

That runtime must connect planning, authority, bounded execution, evidence, verification, persistent state and recovery in one inspectable local slice.

## Provenance note

The v0.2 public verifier and synthetic vectors were first developed in the founder profile repository and are being moved into this dedicated public flagship surface. They remain synthetic public examples, not exports of private operational evidence.
