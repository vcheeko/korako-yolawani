# Korako Yolawani — Public / Private IP Boundary

**Status date:** 2026-09-21

This repository is intentionally a **public diligence, evidence and reproducibility surface**. It is not the canonical Korako implementation.

## Public by design

The repository may expose selected material needed to make technical claims inspectable and falsifiable, including:

- product descriptions and deliberately high-level architecture;
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
- detailed model/tool routing, provider enablement and canonical internal decision-registry implementation;
- private operational logs or personal data;
- unpublished pilot data;
- unpublished product IP, experiments and implementation details.

## Disclosure minimization rule

Public evidence should answer **what can be independently checked?** without publishing every internal design choice required to build the private product.

Detailed canonical decisions, routing weights, provider enablement state, permission/escalation internals and machine/runtime topology are therefore private by default. If a public proof needs one of those concepts, publish only the minimum bounded contract needed to make the claim falsifiable.

Historical Git commits are a separate disclosure surface: sanitizing the current default branch does not erase earlier public versions.

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
