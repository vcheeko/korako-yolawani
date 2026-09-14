# Orchestra Provider Adapters — v0.1

**Status:** PREPARED / activation remains Human-Gated.

Korako now has a first real-provider catalog without embedding credentials or silently enabling external execution.

## First adapters

### Lovable MCP

Target capabilities:
- `WEB_BUILD`
- `CODE`
- `DESIGN_GENERATE`

Provider type: external connector / MCP.

Official provider documentation describes agent-driven creation, iteration and deployment of full-stack apps through MCP. Korako treats build/preview separately from publish/deploy: publication remains an external mutation and must pass KORA authority.

### Gemini Video Understanding

Target capabilities:
- `VIDEO_ANALYZE`
- `RESEARCH`

Provider type: cloud API.

Official Gemini documentation supports video understanding, including descriptions, extraction, question answering, timestamps and public YouTube URL input. Korako will preserve video/source provenance in the resulting evidence artifacts.

## Activation contract

Catalog presence is not execution authority.

Before a real provider can be registered as enabled, Korako requires:

1. explicit Human Gate approval reference;
2. a current per-run cost estimate;
3. KORA capability/scope/risk evaluation;
4. free/local-first routing where applicable;
5. separate Human Gate for publish/deploy or other external mutation;
6. independent verification of produced artifacts.

The provider catalog stores no API keys, access tokens or secrets.

## Next integration slice

```text
Mira goal
  -> Work Graph
  -> Capability request
  -> Provider catalog
  -> Human Gate / cost binding when required
  -> KORA authority decision
  -> Provider adapter
  -> Artifact + evidence
  -> independent verifier
  -> Preview
  -> Human Gate before publish/deploy
```

The first live acceptance target should be one bounded demonstration:

> Analyze a public video, extract a structured brief, route that brief to a web builder, generate a preview-only landing page, visually verify the preview, and stop before publishing.

No production claim should be made until the actual connector/API path, evidence capture and verifier path have been reproduced end-to-end.
