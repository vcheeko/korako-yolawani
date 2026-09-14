# Orchestra Capability Registry — v0.1

**Status:** PREPARED for Human Gate. This is a routing and control contract, not a claim that external AI providers are already connected or production-ready.

## Purpose

Korako routes work by capability rather than by vendor. Mira receives the human goal, KORA governs authority, cost and scope, the Orchestra selects replaceable workers, and Spine exposes the human-observable state.

Initial capabilities:

| Capability | KORA capability | Typical artifact | Default risk/effect | Independent check |
| --- | --- | --- | --- | --- |
| `WEB_BUILD` | `web.build` | bounded web bundle + preview | R2 / bounded local write | `VISUAL_VERIFY` |
| `VIDEO_ANALYZE` | `video.analyze` | transcript + scene index + analysis | R1 / local read | `RESEARCH` |
| `DESIGN_GENERATE` | `design.generate` | design/UI assets | R1 / bounded local write | `VISUAL_VERIFY` |
| `CODE` | `code.generate` | source patch + test/build output | R2 / bounded local write | `VISUAL_VERIFY` |
| `RESEARCH` | `research.web` | source set + claim map | R1 / external read | `VISUAL_VERIFY` |
| `VISUAL_VERIFY` | `visual.verify` | visual diff + verification report | R0 / local read | terminal verifier capability |

## Routing contract

A worker registration declares provider id, provider kind, supported capabilities, estimated cost, enabled state and descriptive metadata. Registration never grants execution authority. Every candidate is evaluated by the existing KORA authority rules.

Routing preference is:

```text
ALLOW_BOUNDED
  -> local/free first
  -> lower estimated cost
  -> otherwise HUMAN_GATE
  -> ROUTE_REQUIRED / BLOCK are never silently executed
```

## Human Gate boundary

This branch stops before real provider activation, external publishing or deployment, unapproved paid work, permission expansion, destructive work, R3/R4 work, or any self-verification path. Those remain explicit Human Gate decisions.

## Example journey

```text
Human goal
  -> VIDEO_ANALYZE
  -> RESEARCH when needed
  -> DESIGN_GENERATE
  -> WEB_BUILD
  -> CODE
  -> VISUAL_VERIFY
  -> PREVIEW
  -> HUMAN GATE before publish/deploy
```

Spine should surface capability, worker/provider, authority outcome, cost estimate, artifact/evidence state, verifier and the current Human Gate without exposing unnecessary orchestration noise by default.

## Executable check

Run:

```bash
npm run orchestra:check
```

The self-test proves the narrow routing contract only: registry validation, free/local-first routing, exact R2 preapproval, Human Gate before external publish, and rejection of self-verification. It does not prove provider quality, production security, generated-site quality, video-analysis accuracy, deployment, or completed third-party integrations.
