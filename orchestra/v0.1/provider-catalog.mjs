import { CAPABILITY_IDS } from './registry.mjs';

export const PROVIDER_CATALOG_SCHEMA = 'KORAKO-ORCHESTRA-PROVIDER-CATALOG-0.1';

export const PROVIDER_CATALOG = Object.freeze([
  Object.freeze({
    id: 'lovable-mcp',
    display_name: 'Lovable MCP',
    kind: 'external',
    capabilities: [
      CAPABILITY_IDS.WEB_BUILD,
      CAPABILITY_IDS.CODE,
      CAPABILITY_IDS.DESIGN_GENERATE
    ],
    connector: 'mcp',
    cost_mode: 'dynamic',
    credential_mode: 'connector-managed',
    documentation: 'https://lovable.dev/mcp',
    notes: 'Full-stack app/site builder. Publishing/deployment remains a separate governed action.'
  }),
  Object.freeze({
    id: 'gemini-video-api',
    display_name: 'Gemini Video Understanding',
    kind: 'cloud',
    capabilities: [
      CAPABILITY_IDS.VIDEO_ANALYZE,
      CAPABILITY_IDS.RESEARCH
    ],
    connector: 'api',
    cost_mode: 'dynamic',
    credential_mode: 'runtime-secret',
    documentation: 'https://ai.google.dev/gemini-api/docs/video-understanding',
    notes: 'Video understanding adapter; may accept public YouTube URLs where supported by the provider.'
  })
]);

export function getProviderDescriptor(provider_id) {
  const provider = PROVIDER_CATALOG.find((item) => item.id === provider_id);
  return provider ? structuredClone(provider) : null;
}

export function prepareProviderActivation({
  provider_id,
  estimated_cost_eur,
  human_gate_approved = false,
  approval_reference = null
}) {
  const descriptor = getProviderDescriptor(provider_id);
  if (!descriptor) {
    return { status: 'BLOCK', reason: 'PROVIDER_UNKNOWN', provider: null };
  }

  if (!human_gate_approved || typeof approval_reference !== 'string' || approval_reference.length === 0) {
    return {
      status: 'HUMAN_GATE',
      reason: 'PROVIDER_ACTIVATION_REQUIRES_HUMAN',
      provider: null,
      descriptor
    };
  }

  if (!Number.isFinite(estimated_cost_eur) || estimated_cost_eur < 0) {
    return {
      status: 'HUMAN_GATE',
      reason: 'CURRENT_COST_ESTIMATE_REQUIRED',
      provider: null,
      descriptor
    };
  }

  return {
    status: 'READY_FOR_REGISTRATION',
    reason: 'HUMAN_GATE_BOUND_PROVIDER_PREPARED',
    provider: {
      id: descriptor.id,
      kind: descriptor.kind,
      capabilities: [...descriptor.capabilities],
      estimated_cost_eur,
      enabled: true,
      metadata: {
        display_name: descriptor.display_name,
        connector: descriptor.connector,
        cost_mode: descriptor.cost_mode,
        credential_mode: descriptor.credential_mode,
        documentation: descriptor.documentation,
        approval_reference,
        executes_on_prepare: false
      }
    }
  };
}
