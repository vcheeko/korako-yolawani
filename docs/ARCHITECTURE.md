# Korako Yolawani - Public Architecture

Korako Yolawani is a public product built around a private orchestration core called **KORA**.

The public architecture is intentionally described at the control-loop level rather than exposing security-sensitive implementation details.

## Core loop

```text
Human goal
   |
Persistent project state
   |
Domain + jurisdiction context
   |
Knowledge / evidence preflight when needed
   |
Plan + dependencies
   |
Authority / risk decision
   |----------------------|
safe / bounded        Human Gate
   |                      |
   +-----------> Execution
                    |
                 Evidence
                    |
               Verification
                    |
          Persistent continuation
                    |
              Recovery if needed
```

The key claim is not that every task needs a complex agent stack. The claim is that long-running AI-assisted work becomes more reliable when authority, state, evidence, jurisdiction and recovery are explicit.

## Trust kernel boundary

Mira is the interface, KORA is the internal trust kernel, and Spine is the human-observable projection. Providers and agents are replaceable workers. The public executable contract for versioned policy, bounded authority, cost routing, approval binding, evidence integrity, independent verification and recovery is documented in [`KORA_TRUST_KERNEL.md`](./KORA_TRUST_KERNEL.md).

## Knowledge preflight

For tasks whose correctness depends on external knowledge, Korako uses a federated Human Knowledge Fabric rather than treating one model or one corpus as truth. Consequential claims should preserve provenance, evidence, counter-evidence, freshness and applicable jurisdiction before they influence action.

Jurisdiction-sensitive domains such as law, medicine, healthcare regulation, insurance, tax, privacy and employment must use the user's applicable country and, where material, state/province/territory or other subnational layer. The initial launch-market focus is the United States, but U.S. rules must not be silently applied to users elsewhere.

The Knowledge Fabric is documented in [`HUMAN_KNOWLEDGE_FABRIC.md`](./HUMAN_KNOWLEDGE_FABRIC.md).

## Public Golden target

The next public runtime milestone is deliberately small and local-only.

A reviewer should be able to run one deterministic task that demonstrates:

```text
GOAL
  -> PLAN
  -> AUTHORITY DECISION
  -> BOUNDED EXECUTION
  -> EVIDENCE CAPTURE
  -> VERIFICATION
  -> PERSISTENT STATE UPDATE
  -> NEXT SAFE ACTION
```

Recommended task: inspect an allowlisted local fixture directory, calculate a manifest, reject scope escape or mutation requests, emit evidence, independently verify the evidence set, persist terminal state and reconstruct the next safe action after interruption.

## Required scenarios

- **PASS-01** - valid bounded read-only execution -> `COMPLETED`, verifier `PASS`.
- **FAIL-01** - scope escape attempt -> blocked before worker execution.
- **FAIL-02** - mutation request -> blocked by authority policy.
- **FAIL-03** - missing evidence -> verifier `FAIL`; no promotion to `COMPLETED`.
- **FAIL-04** - forged verifier/evidence binding -> verifier `FAIL`.
- **RECOVERY-01** - interrupted state -> reconstruct next safe action without silently replaying work.

## Explicit non-goals for the first public runtime

The first public runtime should not require:

- production credentials;
- arbitrary external tool execution;
- Gmail, calendar or GitHub mutation;
- multi-provider model routing;
- consequential autonomous actions;
- production database deployment;
- full Human Knowledge Fabric runtime integration;
- disclosure of the full private KORA architecture.

The purpose is one narrow reproducible claim, not a source dump.

## Release gate

A public Golden runtime should be called released only when:

- a clean clone can run it;
- positive and negative cases behave for the intended reasons;
- recovery is reproduced;
- CI is green on the release commit;
- no machine-specific paths or credentials are present;
- the README preserves the public/private claim boundary;
- independent review is either returned or explicitly marked pending.
