# Korako Yolawani — Public Decision Principles

**Status date:** 2026-09-21  
**Public disclosure class:** high-level summary only

This file intentionally exposes only the product-level principles needed to understand and evaluate the public Korako proof surface.

The detailed canonical decision registry, decision history, routing internals, permission/escalation details, provider enablement state, machine configuration and unpublished implementation choices belong to the private product/control plane.

## Public principles

1. **Human authority** — consequential actions remain governed by meaningful human authority unless a bounded scope was explicitly delegated.
2. **Evidence before completion claims** — `PREPARED != EXECUTED != VERIFIED`.
3. **Independent verification** — consequential work must not rely on producer self-verification.
4. **Free/local-first economics** — capable local, already-owned or free routes are preferred before paid escalation where practical.
5. **Explicit cost boundaries** — unapproved cost does not silently execute.
6. **Vendor-neutral capability routing** — models, tools and providers are replaceable capabilities rather than Korako's identity.
7. **Persistent continuation and recovery** — long-running work should resume from governed state without silently replaying consequential actions.
8. **Provenance-aware knowledge** — important claims preserve source, context, freshness and uncertainty rather than collapsing all inputs into a single unqualified answer.
9. **Mira is the human-facing interface** — KORA is the internal trust/control layer; Spine is the human-observable projection of governed work.
10. **Public proof is deliberately smaller than the private product** — only bounded material needed for falsifiable technical claims should be published.

## Disclosure boundary

The public repository may contain high-level contracts, sanitized proof slices and reproducible test harnesses. It should not be used as the canonical registry for detailed internal decisions.

See [`PUBLIC_IP_BOUNDARY.md`](PUBLIC_IP_BOUNDARY.md) and [`../SECURITY.md`](../SECURITY.md).

> Historical Git commits may retain earlier public drafts. Updating the current default branch reduces the active disclosure surface but does not erase already published history.
