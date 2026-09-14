import assert from 'node:assert/strict';
import {
  CAPABILITY_IDS,
  assertIndependentVerifier,
  createCapabilityRegistry,
  createRegistryPolicy,
  registerProvider,
  routeCapability,
  validateRegistry
} from './registry.mjs';
import {
  PROVIDER_CATALOG,
  getProviderDescriptor,
  prepareProviderActivation
} from './provider-catalog.mjs';

let registry = createCapabilityRegistry();
assert.deepEqual(validateRegistry(registry), { ok: true, reason: 'REGISTRY_VALID' });

registry = registerProvider(registry, {
  id: 'local-mock-worker',
  kind: 'local',
  capabilities: Object.values(CAPABILITY_IDS),
  estimated_cost_eur: 0,
  metadata: { mode: 'test-only', executes_external_actions: false }
});
registry = registerProvider(registry, {
  id: 'cloud-research-mock',
  kind: 'cloud',
  capabilities: [CAPABILITY_IDS.RESEARCH],
  estimated_cost_eur: 0.5,
  metadata: { mode: 'test-only' }
});

const basePolicy = createRegistryPolicy(registry);
const researchRoute = routeCapability({
  registry,
  capability_id: CAPABILITY_IDS.RESEARCH,
  scope: 'orchestra-selftest',
  policy: basePolicy
});
assert.equal(researchRoute.outcome, 'ALLOW_BOUNDED');
assert.equal(researchRoute.selected.provider.id, 'local-mock-worker');
const cloudResearch = researchRoute.candidates.find((item) => item.provider.id === 'cloud-research-mock');
assert.equal(cloudResearch.authority.outcome, 'ROUTE_REQUIRED');
assert.equal(cloudResearch.authority.reason, 'FREE_LOCAL_FIRST');

const webWithoutPreapproval = routeCapability({
  registry,
  capability_id: CAPABILITY_IDS.WEB_BUILD,
  scope: 'orchestra-selftest',
  policy: basePolicy
});
assert.equal(webWithoutPreapproval.outcome, 'HUMAN_GATE');
assert.equal(webWithoutPreapproval.reason, 'R2_NOT_PREAPPROVED');

const preapprovedPolicy = createRegistryPolicy(registry, {
  preapproved_r2: [{ capability: 'web.build', scope: 'orchestra-selftest' }]
});
const webPreview = routeCapability({
  registry,
  capability_id: CAPABILITY_IDS.WEB_BUILD,
  scope: 'orchestra-selftest',
  policy: preapprovedPolicy
});
assert.equal(webPreview.outcome, 'ALLOW_BOUNDED');
assert.equal(webPreview.reason, 'WITHIN_AUTONOMOUS_AUTHORITY');

const publishAttempt = routeCapability({
  registry,
  capability_id: CAPABILITY_IDS.WEB_BUILD,
  scope: 'orchestra-selftest',
  effect: 'EXTERNAL_MUTATION',
  policy: preapprovedPolicy
});
assert.equal(publishAttempt.outcome, 'HUMAN_GATE');
assert.equal(publishAttempt.reason, 'EXTERNAL_MUTATION_REQUIRES_HUMAN');

assert.equal(assertIndependentVerifier('worker-a', 'verifier-b'), true);
assert.throws(() => assertIndependentVerifier('same-agent', 'same-agent'), /SELF_VERIFICATION_FORBIDDEN/);

assert.equal(PROVIDER_CATALOG.length >= 2, true);
assert.equal(getProviderDescriptor('lovable-mcp').capabilities.includes(CAPABILITY_IDS.WEB_BUILD), true);
assert.equal(getProviderDescriptor('gemini-video-api').capabilities.includes(CAPABILITY_IDS.VIDEO_ANALYZE), true);

const guardedLovable = prepareProviderActivation({
  provider_id: 'lovable-mcp',
  estimated_cost_eur: 1
});
assert.equal(guardedLovable.status, 'HUMAN_GATE');
assert.equal(guardedLovable.reason, 'PROVIDER_ACTIVATION_REQUIRES_HUMAN');

const missingCost = prepareProviderActivation({
  provider_id: 'gemini-video-api',
  human_gate_approved: true,
  approval_reference: 'selftest-human-gate'
});
assert.equal(missingCost.status, 'HUMAN_GATE');
assert.equal(missingCost.reason, 'CURRENT_COST_ESTIMATE_REQUIRED');

const preparedGemini = prepareProviderActivation({
  provider_id: 'gemini-video-api',
  estimated_cost_eur: 0.25,
  human_gate_approved: true,
  approval_reference: 'selftest-human-gate'
});
assert.equal(preparedGemini.status, 'READY_FOR_REGISTRATION');
assert.equal(preparedGemini.provider.enabled, true);
assert.equal(preparedGemini.provider.metadata.executes_on_prepare, false);

console.log(JSON.stringify({
  schema: 'KORAKO-ORCHESTRA-SELFTEST-0.1',
  result: 'PASS',
  assertions: {
    registry_valid: true,
    free_local_first: true,
    r2_requires_exact_preapproval: true,
    external_publish_stops_at_human_gate: true,
    self_verification_forbidden: true,
    real_provider_catalog_present: true,
    provider_activation_human_gated: true,
    dynamic_cost_required_before_registration: true
  }
}, null, 2));
