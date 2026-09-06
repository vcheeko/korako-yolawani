# Korako Yolawani — Development Evidence Ledger

**Status date:** 2026-09-06  
**Stage:** active prototype / personal daily-use validation

This ledger separates what can be reproduced publicly from what has been verified only inside the private development core.

## Evidence classes

- **PUBLICLY REPRODUCIBLE** — an external reviewer can inspect and rerun the evidence in this repository.
- **INTERNALLY VERIFIED** — implementation/evidence exists in the private canonical development repository, but is not exposed for independent public reproduction.
- **IN VALIDATION** — implemented or integrated, but the user experience or end-to-end behavior is still being refined.
- **NOT YET PROVEN** — a target that should not be presented as achieved.

## Proven publicly today

### Public evidence-contract harness — PUBLICLY REPRODUCIBLE

The repository contains a dependency-free verifier and synthetic positive/adversarial vectors under [`public-evidence/v0.2/`](../public-evidence/v0.2/).

Run:

```bash
npm install
npm run evidence
```

The harness checks selected evidence semantics including terminal completion state, expected evidence membership, duplicate rejection, SHA-256 shape, provenance, read-only changed-file evidence, verifier identity, PASS verdict and evidence-set binding.

### GitHub-hosted execution — PUBLICLY REPRODUCIBLE

The same public evidence workflow runs in GitHub Actions. The current documented development snapshot was followed by a completed **successful** `public-evidence` workflow run on `main`.

[Inspect the public evidence workflow](https://github.com/vcheeko/korako-yolawani/actions/workflows/public-evidence.yml)

## Verified inside private development

The following milestones have corresponding development history/evidence in the private canonical core, but are deliberately **not claimed as publicly reproduced end to end**:

| Milestone | Evidence class | Current truth |
| --- | --- | --- |
| Personal Alpha | INTERNALLY VERIFIED | Integrated into the private canonical development core |
| Hybrid Mira Orb | INTERNALLY VERIFIED / IN VALIDATION | Integrated; natural uninterrupted conversation is still being refined |
| Local/free-first voice routing | INTERNALLY VERIFIED / IN VALIDATION | Integrated with paid/cloud escalation guarded rather than used as the default path |
| Human Gate preview/authority boundary | INTERNALLY VERIFIED | Preview and authorization remain distinct for consequential work |
| Personal Symphony control room | INTERNALLY VERIFIED / IN VALIDATION | Human-visible orchestration state integrated for daily-use validation |
| Golden Daily Use | INTERNALLY VERIFIED / IN VALIDATION | Activated for personal daily-use validation |
| Live No-Postman evidence collection | INTERNALLY VERIFIED / IN VALIDATION | Evidence collection activated; a defensible time-saved metric is not yet established |

## What this does not prove

None of the evidence above proves that Korako Yolawani is production-ready, secure against all threats, independently validated, commercially validated, or that the private runtime is publicly reproducible end to end.

It also does not yet prove a quantified reduction in human coordination time. That requires measured baseline-vs-Korako trials rather than estimates.

## Next evidence milestones

- [ ] minimal public Golden runtime connecting plan → authority → bounded execution → evidence → verification → persistent continuation;
- [ ] public recovery/failure scenario reproduced end to end;
- [ ] measured No-Postman baseline comparison with defensible time-saved data;
- [ ] independent third-party reproduction/review;
- [ ] pilot evidence from a real workflow/user;
- [ ] production-readiness/security claims only after evidence supports them.

## Evidence rule

```text
PREPARED != EXECUTED != VERIFIED != PUBLICLY REPRODUCED
```

The purpose of this ledger is not to make Korako look more finished than it is. It is to make progress inspectable and claims falsifiable.
