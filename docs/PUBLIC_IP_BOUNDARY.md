# Korako Yolawani — Public / Private IP Boundary

**Status date:** 2026-09-12

This repository is intentionally a **public diligence, evidence and reproducibility surface**. It is not the canonical Korako implementation.

## Public by design

The repository may expose selected material needed to make technical claims inspectable and falsifiable, including:

- product and architecture descriptions;
- high-level control contracts;
- sanitized proof slices;
- evidence schemas and synthetic/adversarial vectors;
- bounded reproducibility harnesses;
- security and reviewer guidance;
- explicitly published development evidence.

## Private by design

The following remain outside the intended public surface unless explicitly released later:

- canonical KORA/Korako implementation code;
- credentials, tokens, keys and signing material;
- machine, network and deployment configuration;
- security-sensitive permission and escalation internals;
- unpublished model/tool routing implementation;
- private operational logs or personal data;
- unpublished pilot data;
- unpublished product IP, experiments and implementation details.

## License status

This repository currently does **not** include an open-source `LICENSE` file.

The absence of an open-source license is intentional while the project's IP and commercialization structure are still being defined. Public visibility of repository material should not be interpreted as a grant of an open-source license or as permission to reuse unpublished/private material.

This document is a project disclosure boundary, not legal advice or a substitute for a formal IP/licensing agreement.

## Contribution boundary

Potential contributors should use [`../CONTRIBUTING.md`](../CONTRIBUTING.md) and avoid submitting private implementation details, secrets, machine-specific operational information, personal data or security-sensitive internals.

Before accepting substantial third-party code or IP-sensitive contributions, the project should adopt an explicit contribution/licensing policy appropriate to its company and financing structure.

## Investor/reviewer interpretation

A reviewer should treat the public repository as evidence of selected architecture and control properties, **not** as a complete inventory of the product's proprietary implementation.

The claim boundary remains:

```text
PUBLICLY VISIBLE != COMPLETE PRODUCT IMPLEMENTATION
PUBLICLY REPRODUCIBLE != PRODUCTION READY
PREPARED != EXECUTED != VERIFIED
```
