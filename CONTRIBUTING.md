# Contributing to Korako Yolawani

Thanks for taking the time to review or contribute.

Korako Yolawani is currently in **prototype / evidence-building** stage. This public repository is intentionally focused on the product thesis, high-level architecture, reproducible evidence contracts, reviewability and explicit limitations. The canonical KORA implementation remains private.

## Contributions that are especially useful

- reproducibility improvements for the public evidence harness;
- adversarial or negative test vectors;
- architecture and reliability critique;
- documentation corrections and clearer reviewer paths;
- recovery, provenance, authority and verification edge cases;
- measurable ideas for reducing manual coordination without weakening human control.

## Before opening a pull request

Please keep changes bounded and explain:

1. **Problem** — what is unclear, incorrect or missing?
2. **Change** — what did you modify?
3. **Evidence** — how can the change be checked or reproduced?
4. **Risk** — could the change weaken authority, provenance, verification or recovery guarantees?
5. **Scope** — does the change stay within the public repository boundary?

## Evidence standard

Korako uses an explicit state distinction:

```text
PREPARED != EXECUTED != VERIFIED != PUBLICLY REPRODUCED
```

Please avoid language that upgrades a claim beyond the evidence available. A passing synthetic harness is not the same as a production-ready runtime, and a prepared workflow is not the same as verified execution.

## Public / private boundary

Do not submit:

- credentials, tokens or secrets;
- machine-specific operational data;
- private KORA implementation details;
- security-sensitive approval or permission internals;
- unpublished personal or pilot data.

## Review philosophy

Specific criticism is welcome. The most valuable review identifies a falsifiable weakness: a missing failure mode, an unverifiable claim, an unsafe authority boundary, an evidence gap or a reproducibility problem.

The objective is not to make the project look finished. The objective is to make its current state **clear, testable and difficult to misrepresent**.
