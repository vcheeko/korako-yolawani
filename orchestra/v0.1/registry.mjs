import { createDefaultPolicy, decideAuthority } from '../../public-kora/v0.1/kernel.mjs';

export const CAPABILITY_REGISTRY_SCHEMA = 'KORAKO-ORCHESTRA-CAPABILITY-REGISTRY-0.1';

export const CAPABILITY_IDS = Object.freeze({
  WEB_BUILD: 'WEB_BUILD',
  VIDEO_ANALYZE: 'VIDEO_ANALYZE',
  DESIGN_GENERATE: 'DESIGN_GENERATE',
  CODE: 'CODE',
  RESEARCH: 'RESEARCH',
  VISUAL_VERIFY: 'VISUAL_VERIFY'
});

const PROVIDER_KINDS = new Set(['local', 'cloud', 'external']);
const AUTHORITY_RANK = Object.freeze({
  ALLOW_BOUNDED: 0,
  HUMAN_GATE: 1,
  ROUTE_REQUIRED: 2,
  BLOCK: 3
});

const DEFINITIONS = Object.freeze([
  {
    id: CAPABILITY_IDS.WEB_BUILD,
    kora_capability: 'web.build',
    description: 'Create or revise a bounded website/application artifact and preview.',
    default_effect: 'WRITE_LOCAL_BOUNDED',
    default_risk_tier: 'R2',
    allowed_effects: ['WRITE_LOCAL_BOUNDED', 'READ_EXTERNAL', 'EXTERNAL_MUTATION'],
    output_artifacts: ['web_bundle', 'preview', 'screenshot'],
    verifier: CAPABILITY_IDS.VISUAL_VERIFY,
    local_first: true
  },
  {
    id: CAPABILITY_IDS.VIDEO_ANALYZE,
    kora_capability: 'video.analyze',
    description: 'Inspect video/audio and return transcript, scenes, claims, moments and evidence references.',
    default_effect: 'READ_LOCAL',
    default_risk_tier: 'R1',
    allowed_effects: ['READ_LOCAL', 'READ_EXTERNAL'],
    output_artifacts: ['transcript', 'scene_index', 'analysis'],
    verifier: CAPABILITY_IDS.RESEARCH,
    local_first: true
  },
  {
    id: CAPABILITY_IDS.DESIGN_GENERATE,
    kora_capability: 'design.generate',
    description: 'Generate or revise bounded design artifacts without publishing them.',
    default_effect: 'WRITE_LOCAL_BOUNDED',
    default_risk_tier: 'R1',
    allowed_effects: ['WRITE_LOCAL_BOUNDED', 'READ_EXTERNAL'],
    output_artifacts: ['design_spec', 'image_asset', 'ui_asset'],
    verifier: CAPABILITY_IDS.VISUAL_VERIFY,
    local_first: true
  },
  {
    id: CAPABILITY_IDS.CODE,
    kora_capability: 'code.generate',
    description: 'Generate or modify bounded code artifacts; execution authority remains separately governed.',
    default_effect: 'WRITE_LOCAL_BOUNDED',
    default_risk_tier: 'R2',
    allowed_effects: ['READ_LOCAL', 'WRITE_LOCAL_BOUNDED', 'READ_EXTERNAL'],
    output_artifacts: ['source_patch', 'test_output', 'build_output'],
    verifier: CAPABILITY_IDS.VISUAL_VERIFY,
    local_first: true
  },
  {
    id: CAPABILITY_IDS.RESEARCH,
    kora_capability: 'research.web',
    description: 'Gather external information with provenance and freshness metadata.',
    default_effect: 'READ_EXTERNAL',
    default_risk_tier: 'R1',
    allowed_effects: ['READ_LOCAL', 'READ_EXTERNAL'],
    output_artifacts: ['research_brief', 'source_set', 'claim_map'],
    verifier: CAPABILITY_IDS.VISUAL_VERIFY,
    local_first: true
  },
  {
    id: CAPABILITY_IDS.VISUAL_VERIFY,
    kora_capability: 'visual.verify',
    description: 'Compare rendered evidence with a target contract and report bounded pass/fail evidence.',
    default_effect: 'READ_LOCAL',
    default_risk_tier: 'R0',
    allowed_effects: ['READ_LOCAL'],
    output_artifacts: ['verification_report', 'visual_diff'],
    verifier: null,
    local_first: true
  }
]);

function clone(value) {
  return structuredClone(value);
}

export function createCapabilityRegistry() {
  return {
    schema: CAPABILITY_REGISTRY_SCHEMA,
    version: '0.1.0',
    capabilities: clone(DEFINITIONS),
    providers: []
  };
}

export function validateRegistry(registry) {
  if (registry?.schema !== CAPABILITY_REGISTRY_SCHEMA) return { ok: false, reason: 'REGISTRY_SCHEMA_INVALID' };
  if (!Array.isArray(registry.capabilities) || registry.capabilities.length === 0) return { ok: false, reason: 'CAPABILITIES_MISSING' };
  const ids = new Set();
  const koraCapabilities = new Set();
  for (const capability of registry.capabilities) {
    if (!capability?.id || ids.has(capability.id)) return { ok: false, reason: 'CAPABILITY_ID_INVALID' };
    if (!capability?.kora_capability || koraCapabilities.has(capability.kora_capability)) return { ok: false, reason: 'KORA_CAPABILITY_INVALID' };
    if (!Array.isArray(capability.allowed_effects) || !capability.allowed_effects.includes(capability.default_effect)) return { ok: false, reason: 'CAPABILITY_EFFECT_INVALID' };
    if (capability.verifier === capability.id) return { ok: false, reason: 'SELF_VERIFICATION_FORBIDDEN' };
    ids.add(capability.id);
    koraCapabilities.add(capability.kora_capability);
  }
  for (const capability of registry.capabilities) {
    if (capability.verifier && !ids.has(capability.verifier)) return { ok: false, reason: 'VERIFIER_CAPABILITY_UNKNOWN' };
  }
  if (!Array.isArray(registry.providers)) return { ok: false, reason: 'PROVIDERS_INVALID' };
  return { ok: true, reason: 'REGISTRY_VALID' };
}

export function registerProvider(registry, provider) {
  const status = validateRegistry(registry);
  if (!status.ok) throw new Error(status.reason);
  if (!provider?.id || typeof provider.id !== 'string') throw new Error('PROVIDER_ID_INVALID');
  if (!PROVIDER_KINDS.has(provider.kind)) throw new Error('PROVIDER_KIND_INVALID');
  if (!Array.isArray(provider.capabilities) || provider.capabilities.length === 0) throw new Error('PROVIDER_CAPABILITIES_INVALID');
  if (!Number.isFinite(provider.estimated_cost_eur) || provider.estimated_cost_eur < 0) throw new Error('PROVIDER_COST_INVALID');
  if (registry.providers.some((item) => item.id === provider.id)) throw new Error('PROVIDER_DUPLICATE');
  const known = new Set(registry.capabilities.map((item) => item.id));
  if (!provider.capabilities.every((item) => known.has(item))) throw new Error('PROVIDER_CAPABILITY_UNKNOWN');
  return {
    ...clone(registry),
    providers: [...clone(registry.providers), {
      id: provider.id,
      kind: provider.kind,
      capabilities: [...provider.capabilities],
      estimated_cost_eur: provider.estimated_cost_eur,
      enabled: provider.enabled !== false,
      metadata: clone(provider.metadata ?? {})
    }]
  };
}

export function createRegistryPolicy(registry, overrides = {}) {
  const status = validateRegistry(registry);
  if (!status.ok) throw new Error(status.reason);
  const capabilities = registry.capabilities.map((item) => item.kora_capability);
  return createDefaultPolicy({
    policy_id: 'korako-orchestra-routing-policy',
    version: '0.1.0',
    autonomous_risk_ceiling: 'R1',
    capabilities,
    preapproved_r2: [],
    budgets: [],
    ...clone(overrides),
    capabilities
  });
}

export function assertIndependentVerifier(worker_id, verifier_id) {
  if (!worker_id || !verifier_id) throw new Error('WORKER_OR_VERIFIER_MISSING');
  if (worker_id === verifier_id) throw new Error('SELF_VERIFICATION_FORBIDDEN');
  return true;
}

export function routeCapability({
  registry,
  capability_id,
  scope,
  effect,
  risk_tier,
  policy,
  budget_id = null
}) {
  const registryStatus = validateRegistry(registry);
  if (!registryStatus.ok) return { outcome: 'BLOCK', reason: registryStatus.reason, selected: null, candidates: [] };
  const definition = registry.capabilities.find((item) => item.id === capability_id);
  if (!definition) return { outcome: 'BLOCK', reason: 'CAPABILITY_NOT_REGISTERED', selected: null, candidates: [] };
  const requestedEffect = effect ?? definition.default_effect;
  if (!definition.allowed_effects.includes(requestedEffect)) return { outcome: 'BLOCK', reason: 'EFFECT_NOT_ALLOWED_FOR_CAPABILITY', selected: null, candidates: [] };
  const enabled = registry.providers.filter((provider) => provider.enabled && provider.capabilities.includes(capability_id));
  if (enabled.length === 0) return { outcome: 'BLOCK', reason: 'NO_PROVIDER_AVAILABLE', selected: null, candidates: [] };
  const freeLocalAvailable = enabled.some((provider) => provider.kind === 'local' && provider.estimated_cost_eur === 0);
  const activePolicy = policy ?? createRegistryPolicy(registry);
  const candidates = enabled.map((provider) => {
    const request = {
      action_id: `route:${capability_id}:${provider.id}`,
      capability: definition.kora_capability,
      effect: requestedEffect,
      risk_tier: risk_tier ?? definition.default_risk_tier,
      scope,
      provider: {
        id: provider.id,
        kind: provider.kind,
        estimated_cost_eur: provider.estimated_cost_eur,
        free_local_alternative_available: freeLocalAvailable && !(provider.kind === 'local' && provider.estimated_cost_eur === 0)
      },
      ...(budget_id ? { budget_id } : {})
    };
    return { provider: clone(provider), request, authority: decideAuthority(request, activePolicy) };
  });
  candidates.sort((a, b) => {
    const authorityDelta = AUTHORITY_RANK[a.authority.outcome] - AUTHORITY_RANK[b.authority.outcome];
    if (authorityDelta !== 0) return authorityDelta;
    const localDelta = Number(b.provider.kind === 'local') - Number(a.provider.kind === 'local');
    if (localDelta !== 0) return localDelta;
    return a.provider.estimated_cost_eur - b.provider.estimated_cost_eur;
  });
  const selected = candidates[0] ?? null;
  return {
    outcome: selected?.authority.outcome ?? 'BLOCK',
    reason: selected?.authority.reason ?? 'NO_PROVIDER_AVAILABLE',
    capability: clone(definition),
    selected,
    candidates
  };
}
