# KORA Trust Kernel — Public Contract v0.1

**Status:** public contract harness / not a production security claim
**Effective:** 2026-09-12

Korako Yolawani is not another model or agent. **Mira is the human-facing interface. KORA is the internal trust kernel. Spine is the human-observable projection of the governed work.** Models, agents, MCP servers, browsers and computer-use systems are replaceable workers.

The public contract in [`public-kora/v0.1/`](../public-kora/v0.1/) makes a narrow subset of that thesis executable without exposing private implementation details.

## Machine-checked invariants

1. An unregistered capability is blocked before execution.
2. `R3`, `R4`, destructive work, external mutation and permission expansion require a Human Gate.
3. `R2` requires an exact capability-and-scope preapproval.
4. Paid work routes to a free/local equivalent first when one is available.
5. Paid work without an exact budget binding requires a Human Gate.
6. Approval receipts bind action, policy version, scope, capability, cost ceiling, approver and expiry; replay is rejected.
7. Evidence is appended to a hash-chained ledger; mutation, deletion, insertion or reordering is detectable.
8. Worker and verifier identities must differ.
9. Verification binds the exact evidence set and current ledger head.
10. Lifecycle transitions cannot jump from `PREPARED` to `VERIFIED`.
11. Recovery returns to an authorized checkpoint and does not silently replay execution.
12. `PREPARED != EXECUTED != VERIFIED` remains enforced.

## Authority outcomes

| Outcome | Meaning |
| --- | --- |
| `ALLOW_BOUNDED` | The exact action is inside current policy, risk, scope and budget authority. |
| `ROUTE_REQUIRED` | The requested worker is not allowed because a free/local path must be tried first. |
| `HUMAN_GATE` | A human decision is materially required before the action can proceed. |
| `BLOCK` | The request or policy is invalid, or the capability is not registered. |

## Public/private boundary

This harness proves deterministic contract behavior against published vectors. It does not claim production-grade identity, cryptographic signing, durable storage, distributed consensus, sandbox isolation or a completed private KORA implementation.

Run:

```bash
npm run trust
npm run trust:golden
```

The second command proves that the contract is not isolated documentation: one bounded local Golden action passes through the policy, lifecycle, evidence ledger and independent verification path. A simulated external mutation stops at Human Gate; the harness validates an exact receipt but deliberately does not execute the external action.
