# Security Policy

Korako Yolawani is currently an **active prototype / evidence-building project**, not a production-ready security product.

## Reporting a vulnerability

Please **do not open a public GitHub issue** for suspected vulnerabilities, exposed credentials, private implementation details or information that could materially weaken a security boundary.

Preferred reporting path:

1. Use GitHub's private vulnerability-reporting / Security Advisory flow if it is available for this repository.
2. If GitHub does not present a private reporting option, contact the maintainer through the public profile or LinkedIn and request a private channel before sharing sensitive technical details.

Include, where possible:

- the affected public component or document;
- a minimal reproduction or proof of concept;
- expected versus observed behavior;
- likely impact;
- whether credentials, personal data or private-core details may be exposed.

## Public / private boundary

The public repository is intentionally limited to sanitized product documentation, high-level architecture, evidence contracts, review material and reproducibility work.

The following must not be committed or disclosed publicly:

- credentials, tokens, API keys or secrets;
- private keys or signing material;
- machine-specific configuration or internal network details;
- private KORA runtime implementation;
- security-sensitive permission, approval or escalation internals;
- operational logs containing private data;
- unpublished pilot or personal data.

## Current security posture

The public CI workflow is deliberately narrow and read-only. Passing public checks demonstrates only that the published evidence-contract harness passed its defined tests; it does **not** certify the private runtime or the product as secure or production-ready.

Security-sensitive changes should be treated as higher-risk work and require stronger review, evidence and human approval before consequential deployment.

## Scope

This policy covers the public `vcheeko/korako-yolawani` repository. Private repositories, local development systems and third-party services are outside the public disclosure scope unless the maintainer explicitly confirms otherwise.
