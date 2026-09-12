import { createHash, randomUUID } from 'node:crypto';

export const TRUST_POLICY_SCHEMA = 'KORA-TRUST-POLICY-0.1';
export const LEDGER_SCHEMA = 'KORA-EVIDENCE-LEDGER-0.1';
export const APPROVAL_SCHEMA = 'KORA-APPROVAL-RECEIPT-0.1';
export const VERIFICATION_SCHEMA = 'KORA-VERIFICATION-RECEIPT-0.1';
export const ZERO_HASH = '0'.repeat(64);

const RISK_TIERS = new Set(['R0', 'R1', 'R2', 'R3', 'R4']);
const EFFECTS = new Set([
  'READ_LOCAL',
  'WRITE_LOCAL_BOUNDED',
  'READ_EXTERNAL',
  'EXTERNAL_MUTATION',
  'DESTRUCTIVE',
  'PERMISSION_EXPANSION'
]);
const DECISIONS = new Set(['ALLOW_BOUNDED', 'ROUTE_REQUIRED', 'HUMAN_GATE', 'BLOCK']);
const RISK_RANK = { R0: 0, R1: 1, R2: 2, R3: 3, R4: 4 };

function isPlainObject(value) {
  return value !== null && typeof value === 'object' && !Array.isArray(value);
}

export function stableStringify(value) {
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(',')}]`;
  if (isPlainObject(value)) {
    return `{${Object.keys(value).sort().map((key) => `${JSON.stringify(key)}:${stableStringify(value[key])}`).join(',')}}`;
  }
  return JSON.stringify(value);
}

export function sha256(value) {
  return createHash('sha256').update(typeof value === 'string' ? value : stableStringify(value)).digest('hex');
}

function clone(value) {
  return structuredClone(value);
}

function matchesGrant(grant, request) {
  return grant.capability === request.capability && grant.scope === request.scope;
}

function remainingBudget(budget) {
  return Math.round((budget.max_eur - budget.spent_eur) * 100) / 100;
}

export function createDefaultPolicy(overrides = {}) {
  const policy = {
    schema: TRUST_POLICY_SCHEMA,
    policy_id: 'korako-public-trust-policy',
    version: '0.1.0',
    autonomous_risk_ceiling: 'R1',
    free_local_first: true,
    capabilities: ['artifact.write', 'fixture.read', 'web.search'],
    preapproved_r2: [{ capability: 'artifact.write', scope: 'golden-demo' }],
    budgets: [{ budget_id: 'golden-demo-30', scope: 'golden-demo', capabilities: ['web.search'], max_eur: 30, spent_eur: 10 }],
    ...overrides
  };
  return clone(policy);
}

export function policyFingerprint(policy) {
  return sha256(policy);
}

export function actionFingerprint(request) {
  return sha256({
    action_id: request.action_id,
    capability: request.capability,
    effect: request.effect,
    risk_tier: request.risk_tier,
    scope: request.scope,
    provider: request.provider ?? null,
    budget_id: request.budget_id ?? null
  });
}

function decision(request, policy, outcome, reason, extra = {}) {
  return {
    schema: 'KORA-AUTHORITY-DECISION-0.1',
    decision_id: sha256({ action: actionFingerprint(request), policy: policyFingerprint(policy), outcome, reason }),
    action_fingerprint: actionFingerprint(request),
    policy_id: policy.policy_id,
    policy_version: policy.version,
    policy_fingerprint: policyFingerprint(policy),
    outcome,
    reason,
    ...extra
  };
}

function validPolicy(policy) {
  return policy?.schema === TRUST_POLICY_SCHEMA
    && typeof policy.policy_id === 'string'
    && typeof policy.version === 'string'
    && RISK_TIERS.has(policy.autonomous_risk_ceiling)
    && policy.free_local_first === true
    && Array.isArray(policy.capabilities)
    && policy.capabilities.length > 0
    && policy.capabilities.every((capability) => typeof capability === 'string' && capability.length > 0)
    && new Set(policy.capabilities).size === policy.capabilities.length
    && Array.isArray(policy.preapproved_r2)
    && policy.preapproved_r2.every((grant) => typeof grant?.capability === 'string'
      && policy.capabilities.includes(grant.capability)
      && typeof grant?.scope === 'string'
      && grant.scope.length > 0)
    && Array.isArray(policy.budgets)
    && policy.budgets.every((budget) => typeof budget?.budget_id === 'string'
      && typeof budget?.scope === 'string'
      && budget.scope.length > 0
      && Array.isArray(budget?.capabilities)
      && budget.capabilities.length > 0
      && budget.capabilities.every((capability) => policy.capabilities.includes(capability))
      && new Set(budget.capabilities).size === budget.capabilities.length
      && Number.isFinite(budget?.max_eur)
      && Number.isFinite(budget?.spent_eur)
      && budget.max_eur >= 0
      && budget.spent_eur >= 0
      && budget.spent_eur <= budget.max_eur)
    && new Set(policy.budgets.map((budget) => budget.budget_id)).size === policy.budgets.length;
}

function validRequest(request) {
  return isPlainObject(request)
    && typeof request.action_id === 'string'
    && typeof request.capability === 'string'
    && typeof request.scope === 'string'
    && EFFECTS.has(request.effect)
    && RISK_TIERS.has(request.risk_tier)
    && isPlainObject(request.provider)
    && typeof request.provider.id === 'string'
    && ['local', 'cloud', 'external'].includes(request.provider.kind)
    && Number.isFinite(request.provider.estimated_cost_eur)
    && request.provider.estimated_cost_eur >= 0
    && typeof request.provider.free_local_alternative_available === 'boolean';
}

export function decideAuthority(request, policy) {
  if (!validPolicy(policy)) {
    const safePolicy = validPolicy(createDefaultPolicy()) ? createDefaultPolicy() : policy;
    return decision(request ?? {}, safePolicy, 'BLOCK', 'POLICY_INVALID');
  }
  if (!validRequest(request)) return decision(request ?? {}, policy, 'BLOCK', 'REQUEST_INVALID');
  if (!policy.capabilities.includes(request.capability)) {
    return decision(request, policy, 'BLOCK', 'CAPABILITY_NOT_REGISTERED');
  }

  if (['DESTRUCTIVE', 'PERMISSION_EXPANSION', 'EXTERNAL_MUTATION'].includes(request.effect)) {
    return decision(request, policy, 'HUMAN_GATE', `${request.effect}_REQUIRES_HUMAN`);
  }
  if (['R3', 'R4'].includes(request.risk_tier)) {
    return decision(request, policy, 'HUMAN_GATE', `${request.risk_tier}_REQUIRES_HUMAN`);
  }
  if (request.risk_tier === 'R2') {
    if (!policy.preapproved_r2.some((grant) => matchesGrant(grant, request))) {
      return decision(request, policy, 'HUMAN_GATE', 'R2_NOT_PREAPPROVED');
    }
  } else if (RISK_RANK[request.risk_tier] > RISK_RANK[policy.autonomous_risk_ceiling]) {
    return decision(request, policy, 'HUMAN_GATE', 'RISK_EXCEEDS_AUTONOMOUS_CEILING');
  }

  const cost = request.provider.estimated_cost_eur;
  if (cost > 0 && policy.free_local_first && request.provider.free_local_alternative_available) {
    return decision(request, policy, 'ROUTE_REQUIRED', 'FREE_LOCAL_FIRST');
  }
  if (cost > 0) {
    const budget = policy.budgets.find((item) => item.budget_id === request.budget_id);
    if (!budget) return decision(request, policy, 'HUMAN_GATE', 'COST_NOT_PREAPPROVED');
    if (budget.scope !== request.scope || !budget.capabilities.includes(request.capability)) {
      return decision(request, policy, 'HUMAN_GATE', 'BUDGET_SCOPE_MISMATCH');
    }
    const remaining = remainingBudget(budget);
    if (cost > remaining) {
      return decision(request, policy, 'HUMAN_GATE', 'BUDGET_EXCEEDED', { estimated_cost_eur: cost, remaining_budget_eur: remaining });
    }
    return decision(request, policy, 'ALLOW_BOUNDED', 'WITHIN_PREAPPROVED_BUDGET', {
      budget_id: budget.budget_id,
      estimated_cost_eur: cost,
      remaining_before_eur: remaining,
      remaining_after_eur: Math.round((remaining - cost) * 100) / 100
    });
  }

  return decision(request, policy, 'ALLOW_BOUNDED', 'WITHIN_AUTONOMOUS_AUTHORITY', { estimated_cost_eur: 0 });
}

export function createApprovalReceipt({ request, authority_decision, policy, approver_id, approved_at, expires_at }) {
  const expectedDecision = decideAuthority(request, policy);
  if (expectedDecision.outcome !== 'HUMAN_GATE') throw new Error('APPROVAL_NOT_REQUIRED_FOR_DECISION');
  if (authority_decision?.decision_id !== expectedDecision.decision_id
    || authority_decision?.action_fingerprint !== expectedDecision.action_fingerprint
    || authority_decision?.policy_fingerprint !== expectedDecision.policy_fingerprint) {
    throw new Error('APPROVAL_DECISION_BINDING_INVALID');
  }
  if (typeof approver_id !== 'string' || approver_id.length === 0) throw new Error('APPROVER_INVALID');
  if (!Number.isFinite(new Date(approved_at).getTime()) || !Number.isFinite(new Date(expires_at).getTime())) throw new Error('APPROVAL_TIME_INVALID');
  if (new Date(expires_at).getTime() <= new Date(approved_at).getTime()) throw new Error('APPROVAL_EXPIRY_INVALID');
  const body = {
    schema: APPROVAL_SCHEMA,
    receipt_id: randomUUID(),
    action_fingerprint: actionFingerprint(request),
    decision_id: authority_decision.decision_id,
    policy_id: policy.policy_id,
    policy_version: policy.version,
    policy_fingerprint: policyFingerprint(policy),
    approved_scope: request.scope,
    approved_capability: request.capability,
    max_cost_eur: request.provider.estimated_cost_eur,
    approver_id,
    approved_at,
    expires_at,
    single_use: true
  };
  return { ...body, receipt_hash: sha256(body) };
}

export function verifyApprovalReceipt(receipt, { request, policy, now, used_receipt_ids = [] }) {
  if (receipt?.schema !== APPROVAL_SCHEMA) return { ok: false, reason: 'APPROVAL_SCHEMA_INVALID' };
  const { receipt_hash: claimedHash, ...body } = receipt;
  if (sha256(body) !== claimedHash) return { ok: false, reason: 'APPROVAL_RECEIPT_TAMPERED' };
  if (receipt.action_fingerprint !== actionFingerprint(request)) return { ok: false, reason: 'APPROVAL_ACTION_MISMATCH' };
  if (receipt.policy_fingerprint !== policyFingerprint(policy)) return { ok: false, reason: 'APPROVAL_POLICY_MISMATCH' };
  const expectedDecision = decideAuthority(request, policy);
  if (expectedDecision.outcome !== 'HUMAN_GATE' || receipt.decision_id !== expectedDecision.decision_id) {
    return { ok: false, reason: 'APPROVAL_DECISION_MISMATCH' };
  }
  if (receipt.approved_scope !== request.scope || receipt.approved_capability !== request.capability) {
    return { ok: false, reason: 'APPROVAL_SCOPE_MISMATCH' };
  }
  if (request.provider.estimated_cost_eur > receipt.max_cost_eur) return { ok: false, reason: 'APPROVAL_COST_EXCEEDED' };
  if (used_receipt_ids.includes(receipt.receipt_id)) return { ok: false, reason: 'APPROVAL_REPLAY_REJECTED' };
  const nowMs = new Date(now).getTime();
  const approvedMs = new Date(receipt.approved_at).getTime();
  const expiresMs = new Date(receipt.expires_at).getTime();
  if (![nowMs, approvedMs, expiresMs].every(Number.isFinite) || expiresMs <= approvedMs) return { ok: false, reason: 'APPROVAL_TIME_INVALID' };
  if (nowMs < approvedMs) return { ok: false, reason: 'APPROVAL_NOT_YET_VALID' };
  if (nowMs > expiresMs) return { ok: false, reason: 'APPROVAL_EXPIRED' };
  return { ok: true, reason: 'APPROVAL_BOUND_AND_VALID' };
}

function ledgerGenesis(ledger) {
  return sha256({ schema: ledger.schema, run_id: ledger.run_id, policy: ledger.policy });
}

export function createLedger({ run_id, policy }) {
  const ledger = {
    schema: LEDGER_SCHEMA,
    run_id,
    policy: { policy_id: policy.policy_id, version: policy.version, fingerprint: policyFingerprint(policy) },
    entries: [],
    head_hash: ZERO_HASH
  };
  ledger.head_hash = ledgerGenesis(ledger);
  return ledger;
}

export function appendLedger(ledger, event) {
  if (ledger?.schema !== LEDGER_SCHEMA || !Array.isArray(ledger.entries)) throw new Error('LEDGER_INVALID');
  if (typeof event?.event_id !== 'string' || event.event_id.length === 0
    || typeof event?.event_type !== 'string' || event.event_type.length === 0
    || typeof event?.actor_id !== 'string' || event.actor_id.length === 0
    || !Number.isFinite(new Date(event?.at).getTime())
    || (event.payload !== undefined && !isPlainObject(event.payload))) throw new Error('LEDGER_EVENT_INVALID');
  if (ledger.entries.some((entry) => entry.event_id === event.event_id)) throw new Error('LEDGER_EVENT_DUPLICATE');
  const body = {
    index: ledger.entries.length,
    event_id: event.event_id,
    event_type: event.event_type,
    actor_id: event.actor_id,
    at: event.at,
    payload: clone(event.payload ?? {}),
    previous_hash: ledger.head_hash
  };
  const entry = { ...body, entry_hash: sha256(body) };
  return { ...clone(ledger), entries: [...clone(ledger.entries), entry], head_hash: entry.entry_hash };
}

export function verifyLedger(ledger) {
  if (ledger?.schema !== LEDGER_SCHEMA || !Array.isArray(ledger.entries)) return { ok: false, reason: 'LEDGER_INVALID' };
  let previous = ledgerGenesis(ledger);
  const ids = new Set();
  for (let index = 0; index < ledger.entries.length; index += 1) {
    const entry = ledger.entries[index];
    if (entry.index !== index) return { ok: false, reason: 'LEDGER_INDEX_INVALID' };
    if (ids.has(entry.event_id)) return { ok: false, reason: 'LEDGER_EVENT_DUPLICATE' };
    ids.add(entry.event_id);
    if (entry.previous_hash !== previous) return { ok: false, reason: 'LEDGER_CHAIN_BROKEN' };
    const { entry_hash, ...body } = entry;
    if (sha256(body) !== entry_hash) return { ok: false, reason: 'LEDGER_ENTRY_TAMPERED' };
    previous = entry_hash;
  }
  if (ledger.head_hash !== previous) return { ok: false, reason: 'LEDGER_HEAD_MISMATCH' };
  return { ok: true, reason: 'LEDGER_VERIFIED' };
}

const TRANSITIONS = {
  PLANNED: ['PREPARED'],
  PREPARED: ['AUTHORIZED', 'HUMAN_GATE', 'BLOCKED'],
  HUMAN_GATE: ['AUTHORIZED', 'BLOCKED'],
  AUTHORIZED: ['EXECUTING'],
  EXECUTING: ['EXECUTED', 'FAILED', 'INTERRUPTED'],
  INTERRUPTED: ['RECOVERING'],
  RECOVERING: ['AUTHORIZED', 'BLOCKED'],
  EXECUTED: ['VERIFYING'],
  VERIFYING: ['VERIFIED', 'VERIFICATION_FAILED']
};

function applyLifecycleTransition(lifecycle, next, detail = {}) {
  const allowed = TRANSITIONS[lifecycle.status] ?? [];
  if (!allowed.includes(next)) throw new Error(`LIFECYCLE_TRANSITION_FORBIDDEN:${lifecycle.status}->${next}`);
  if (lifecycle.status === 'PREPARED' && next === 'AUTHORIZED' && detail.authority_outcome !== 'ALLOW_BOUNDED') {
    throw new Error('AUTHORIZED_REQUIRES_BOUNDED_DECISION');
  }
  if (lifecycle.status === 'RECOVERING' && next === 'AUTHORIZED' && detail.checkpoint_verified !== true) {
    throw new Error('RECOVERY_REQUIRES_VERIFIED_CHECKPOINT');
  }
  if (next === 'VERIFIED' && (detail.verdict !== 'PASS' || typeof detail.verification_receipt_id !== 'string')) {
    throw new Error('VERIFIED_REQUIRES_PASS_RECEIPT');
  }
  return {
    ...clone(lifecycle),
    status: next,
    history: [...(lifecycle.history ?? []), { from: lifecycle.status, to: next, ...clone(detail) }]
  };
}

export function transitionLifecycle(lifecycle, next, detail = {}) {
  if (lifecycle.status === 'HUMAN_GATE' && next === 'AUTHORIZED') throw new Error('USE_AUTHORIZE_HUMAN_GATE');
  return applyLifecycleTransition(lifecycle, next, detail);
}

export function authorizeHumanGate(lifecycle, { receipt, request, policy, now, used_receipt_ids = [] }) {
  if (lifecycle.status !== 'HUMAN_GATE') throw new Error(`HUMAN_GATE_INVALID_STATE:${lifecycle.status}`);
  const check = verifyApprovalReceipt(receipt, { request, policy, now, used_receipt_ids });
  if (!check.ok) throw new Error(check.reason);
  return applyLifecycleTransition(lifecycle, 'AUTHORIZED', {
    approval_valid: true,
    approval_receipt_id: receipt.receipt_id,
    action_fingerprint: receipt.action_fingerprint,
    policy_fingerprint: receipt.policy_fingerprint
  });
}

function evidenceSetHash(ledger, evidence_event_ids) {
  const entries = evidence_event_ids.map((id) => ledger.entries.find((entry) => entry.event_id === id));
  if (entries.some((entry) => !entry)) throw new Error('VERIFICATION_EVIDENCE_MISSING');
  return sha256(entries.map((entry) => `${entry.event_id}:${entry.entry_hash}`).sort().join('\n'));
}

export function createVerificationReceipt({ ledger, worker_id, verifier_id, evidence_event_ids, verdict, verified_at }) {
  const ledgerCheck = verifyLedger(ledger);
  if (!ledgerCheck.ok) throw new Error(ledgerCheck.reason);
  if (worker_id === verifier_id) throw new Error('SELF_VERIFICATION_FORBIDDEN');
  if (!['PASS', 'FAIL'].includes(verdict)) throw new Error('VERIFICATION_VERDICT_INVALID');
  if (!Array.isArray(evidence_event_ids) || evidence_event_ids.length === 0) throw new Error('VERIFICATION_EVIDENCE_EMPTY');
  if (new Set(evidence_event_ids).size !== evidence_event_ids.length) throw new Error('VERIFICATION_EVIDENCE_DUPLICATE');
  if (!Number.isFinite(new Date(verified_at).getTime())) throw new Error('VERIFICATION_TIME_INVALID');
  const body = {
    schema: VERIFICATION_SCHEMA,
    receipt_id: randomUUID(),
    run_id: ledger.run_id,
    ledger_head_hash: ledger.head_hash,
    policy_fingerprint: ledger.policy.fingerprint,
    worker_id,
    verifier_id,
    evidence_event_ids: [...evidence_event_ids].sort(),
    evidence_set_hash: evidenceSetHash(ledger, evidence_event_ids),
    verdict,
    verified_at
  };
  return { ...body, receipt_hash: sha256(body) };
}

export function verifyVerificationReceipt(receipt, ledger) {
  if (receipt?.schema !== VERIFICATION_SCHEMA) return { ok: false, reason: 'VERIFICATION_SCHEMA_INVALID' };
  const ledgerCheck = verifyLedger(ledger);
  if (!ledgerCheck.ok) return ledgerCheck;
  const { receipt_hash: claimedHash, ...body } = receipt;
  if (sha256(body) !== claimedHash) return { ok: false, reason: 'VERIFICATION_RECEIPT_TAMPERED' };
  if (receipt.worker_id === receipt.verifier_id) return { ok: false, reason: 'SELF_VERIFICATION_FORBIDDEN' };
  if (!Array.isArray(receipt.evidence_event_ids) || receipt.evidence_event_ids.length === 0) return { ok: false, reason: 'VERIFICATION_EVIDENCE_EMPTY' };
  if (new Set(receipt.evidence_event_ids).size !== receipt.evidence_event_ids.length) return { ok: false, reason: 'VERIFICATION_EVIDENCE_DUPLICATE' };
  if (receipt.run_id !== ledger.run_id || receipt.ledger_head_hash !== ledger.head_hash) {
    return { ok: false, reason: 'VERIFICATION_LEDGER_MISMATCH' };
  }
  if (receipt.policy_fingerprint !== ledger.policy.fingerprint) return { ok: false, reason: 'VERIFICATION_POLICY_MISMATCH' };
  try {
    if (receipt.evidence_set_hash !== evidenceSetHash(ledger, receipt.evidence_event_ids)) {
      return { ok: false, reason: 'VERIFICATION_EVIDENCE_MISMATCH' };
    }
  } catch (error) {
    return { ok: false, reason: error.message };
  }
  if (receipt.verdict !== 'PASS') return { ok: false, reason: 'VERIFIER_PASS_REQUIRED' };
  return { ok: true, reason: 'VERIFICATION_BOUND_AND_VALID' };
}

export function assertKnownDecision(authorityDecision) {
  if (!DECISIONS.has(authorityDecision?.outcome)) throw new Error('AUTHORITY_DECISION_INVALID');
  return authorityDecision;
}
