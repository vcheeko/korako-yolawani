# Security Policy

**Status date:** 2026-09-21

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
- machine-specific configuration, host identity or internal network details;
- private KORA/Korako runtime implementation;
- security-sensitive permission, approval or escalation internals;
- private routing/enablement details that materially weaken a control boundary;
- operational logs containing private data;
- unpublished pilot, user or personal data.

## Current public-surface hygiene checkpoint

A bounded review of the account's current public default branches was repeated on **2026-09-21**.

At that checkpoint:

- no obvious current-branch credential/private-key/API-token match was found by the bounded pattern scan;
- no tracked `.env` match was found by that scan;
- no obvious private machine hostname or maintainer personal-email match was found in the indexed public default branches;
- Korako public CI uses explicit read-only repository permissions;
- the checked GitHub Actions references are pinned to exact commit SHAs.

This is a **hygiene checkpoint, not a complete security audit**. It does not prove that historical commits, deleted files, GitHub metadata, third-party services or the private runtime contain no sensitive material.

## Historical disclosure rule

Removing or sanitizing a file on the current branch does **not** remove it from Git history.

If a real secret is ever committed:

1. treat the secret as exposed;
2. revoke/rotate it first;
3. remove it from the active tree;
4. evaluate history-remediation requirements separately;
5. verify downstream caches, logs and integrations as applicable.

Do not rely on a normal follow-up commit as secret revocation.

## CI and contribution posture

Public CI should remain least-privilege and reproducible:

- explicit read-only permissions unless a workflow has a documented reason for more;
- third-party Actions pinned to immutable commit SHAs;
- no secret-dependent execution on untrusted pull-request code;
- no credentials in source, fixtures, screenshots, logs or issue/PR text;
- security-sensitive changes reviewed more strongly than ordinary documentation changes.

## Scope

This policy covers the public `vcheeko/korako-yolawani` repository and the disclosure discipline around material published from the Korako project. Private repositories, local development systems and third-party services are outside the public disclosure scope unless the maintainer explicitly confirms otherwise.

Passing public checks demonstrates only that the published proof harness passed its defined tests; it does **not** certify the private runtime or product as secure or production-ready.
