# AGENTS.md

## Cursor Cloud specific instructions

### What this repository is
`korako-yolawani` (`vcheeko/korako-yolawani`) is the public sanitized proof and trust surface for Korako Yolawani. It publishes the product thesis, the high-level control loop, and a small Node harness an external reviewer can rerun: evidence-contract vectors, Public Golden v0.1, the KORA Trust Contract v0.1, the Orchestra capability-registry self-test, and the fail-closed ROI measurement boundary.

Keep this repository in its own lane:

- **This repo** — public diligence, evidence, and reproducibility.
- **`ops-genesis`** — OPS/KOS governance and the Git Writer. Do not treat this tree as that runtime.
- **`kora-ops`** — the Mira application. Mira voice, browser, and session work is not implemented here.
- **`korako-core`** — the private executable core. Canonical KORA implementation stays out of this tree.

A green public harness shows that the published checks passed. It does not certify the private runtime, production security, or quantified time saved.

### Environment
- Default branch is `main`. Treat `main` as protected. The required status check is `verify`. Enforcement may be `non_admins`; agents must still treat `verify` as mandatory before considering a change mergeable.
- Node.js `>=20` (`package.json` `engines`). Modules are ESM (`"type": "module"`). There is no `package-lock.json`, no application dependency, and no `npm ci` step. CI prints `node --version` and then runs the harness.
- No OpenAI client product path is expected. Do not add an OpenAI SDK or other product client. The harness uses the Node standard library (`node:crypto`, `node:fs`, `node:assert`).
- There is no separate lint tool and no production build.

### Lint / test / build / run
Commands come from `package.json` and the GitHub workflows.

| Check | Command | Where CI runs it |
| --- | --- | --- |
| Full public proof (`test` aliases `proof`) | `npm test` | `.github/workflows/public-evidence.yml` job `verify`, on every pull request and on push to `main` |
| Evidence-contract vectors | `npm run evidence` | included in `npm test` |
| Public Golden demo, recovery, benchmark | `npm run golden`, `npm run golden:recovery`, `npm run golden:benchmark` | included in `npm test` |
| KORA trust harness and integrated Golden | `npm run trust`, `npm run trust:golden` | included in `npm test` |
| Orchestra capability registry | `npm run orchestra:check` (`node orchestra/v0.1/selftest.mjs`) | included in `npm test`; also `.github/workflows/orchestra-registry.yml` job `verify` on pull requests that touch `orchestra/**`, `docs/ORCHESTRA_CAPABILITY_REGISTRY.md`, or that workflow |
| ROI template self-test and validator | `npm run roi:selftest`, `npm run roi:check` | included in `npm test` |

Cloud Agent setup uses the same gate as `public-evidence`: `npm test`. That command already runs the trust harness and the Orchestra self-test. There is no app server to start.

### Public IP and license
Follow `README.md` and `docs/PUBLIC_IP_BOUNDARY.md`. This repository has no open-source `LICENSE` file. Leave that absence in place. Public visibility is not a reuse grant. Do not add a license file unless a maintainer explicitly publishes one.

### Non-obvious caveats
- Never copy private secrets, credentials, tokens, machine configuration, operational logs, unpublished pilot data, or contents of private repositories into public commits, issues, or pull requests. Do not list `ops-genesis`, `kora-ops`, or `korako-core` as environment `repositoryDependencies`.
- Historical Git commits are a separate disclosure surface. Sanitizing the current tree does not erase earlier public versions. If a real secret lands in Git, rotate it first; a follow-up commit is not revocation. See `SECURITY.md`.
- The ROI validator refuses a time-saved claim until real paired measurements exist. On the public template, `manual_baseline_measured` and `time_saved_claimed` stay false.
- Orchestra catalog entries (Lovable MCP, Gemini Video) are descriptors. Activation stays Human-Gated. `orchestra:check` uses local mocks and must not be aimed at live provider credentials.
- Claim boundary used throughout the docs: `PREPARED != EXECUTED != VERIFIED != PUBLICLY REPRODUCED`.
