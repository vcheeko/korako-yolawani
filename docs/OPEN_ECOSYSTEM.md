# Korako Open Ecosystem v0.1

**Status:** candidate community layer  
**Public repository:** `vcheeko/korako-yolawani`  
**Canonical runtime:** private

Korako Open Ecosystem exists to make public claims inspectable, invite useful criticism and contributions, and create a clear path for community participation without turning the public repository into a mirror of the private runtime.

## Public community surface

The intended public collaboration surfaces are:

- **Announcements** — verified milestones, releases and major project updates;
- **Ideas** — bounded product or ecosystem proposals;
- **Q&A** — questions about the public project and reproducible proof surface;
- **Journey Ideas** — proposed Human Journey use cases and success criteria;
- **Capability Radar** — candidate tools, agents, models, protocols and integrations to benchmark;
- **Architecture / RFC** — high-level architecture proposals that stay within the public IP boundary;
- **Benchmarks & Experiments** — reproducible tests, adversarial cases and measurements;
- **Show & Tell** — external experiments, integrations or demonstrations built from the public surface.

## What belongs in Issues

Use **Issues** for bounded, actionable work with a clear completion condition: bugs, documentation fixes, reproducibility failures and accepted implementation tasks.

Use **Discussions** for questions, proposals, exploration, evidence review and ideas that have not yet become accepted work.

A Discussion can become an Issue after the scope and evidence requirement are clear.

## Public/private boundary

Community activity must follow [PUBLIC_IP_BOUNDARY.md](PUBLIC_IP_BOUNDARY.md).

The public repository can expose the minimum material needed to make a claim falsifiable. It should not disclose private KORA implementation, credentials, internal routing/permission details, unpublished product IP, machine topology, operational logs, personal data or unpublished pilot material.

## Contribution path

```text
DISCUSS
  -> DEFINE CLAIM / PROBLEM
  -> BOUND SCOPE
  -> DEFINE EVIDENCE
  -> ISSUE OR RFC
  -> PULL REQUEST
  -> CHECK
  -> REVIEW
  -> MERGE
```

Opening a Discussion or Pull Request does not guarantee adoption. Acceptance depends on evidence, project fit, safety, maintainability and the public/private boundary.

## Licensing boundary

This repository currently has no open-source `LICENSE` file. Public visibility is not itself a grant of an open-source license.

Before accepting substantial third-party code or IP-sensitive contributions, Korako should adopt an explicit contribution and licensing structure appropriate to the project's company and financing model.

## Community safety

All public participation is subject to [CODE_OF_CONDUCT.md](../CODE_OF_CONDUCT.md) and [SECURITY.md](../SECURITY.md).
