import assert from 'node:assert/strict';
import {
  actionFingerprint,
  appendLedger,
  authorizeHumanGate,
  createApprovalReceipt,
  createDefaultPolicy,
  createLedger,
  createVerificationReceipt,
  decideAuthority,
  transitionLifecycle,
  verifyApprovalReceipt,
  verifyLedger,
  verifyVerificationReceipt
} from './kernel.mjs';

const NOW = '2026-09-12T12:00:00.000Z';
const LATER = '2026-09-12T13:00:00.000Z';
const policy = createDefaultPolicy();

function request(overrides = {}) {
  return {
    action_id: 'action-001',
    capability: 'fixture.read',
    effect: 'READ_LOCAL',
    risk_tier: 'R1',
    scope: 'golden-demo',
    provider: { id: 'local-fixture', kind: 'local', estimated_cost_eur: 0, free_local_alternative_available: false },
    ...overrides
  };
}

const authorityVectors = [
  ['safe_local_read', request(), 'ALLOW_BOUNDED', 'WITHIN_AUTONOMOUS_AUTHORITY'],
  ['paid_free_alternative', request({ capability: 'web.search', effect: 'READ_EXTERNAL', provider: { id: 'paid-web', kind: 'cloud', estimated_cost_eur: 1, free_local_alternative_available: true }, budget_id: 'golden-demo-30' }), 'ROUTE_REQUIRED', 'FREE_LOCAL_FIRST'],
  ['paid_without_budget', request({ capability: 'web.search', effect: 'READ_EXTERNAL', provider: { id: 'paid-web', kind: 'cloud', estimated_cost_eur: 1, free_local_alternative_available: false } }), 'HUMAN_GATE', 'COST_NOT_PREAPPROVED'],
  ['paid_within_budget', request({ capability: 'web.search', effect: 'READ_EXTERNAL', provider: { id: 'paid-web', kind: 'cloud', estimated_cost_eur: 1, free_local_alternative_available: false }, budget_id: 'golden-demo-30' }), 'ALLOW_BOUNDED', 'WITHIN_PREAPPROVED_BUDGET'],
  ['paid_over_budget', request({ capability: 'web.search', effect: 'READ_EXTERNAL', provider: { id: 'paid-web', kind: 'cloud', estimated_cost_eur: 25, free_local_alternative_available: false }, budget_id: 'golden-demo-30' }), 'HUMAN_GATE', 'BUDGET_EXCEEDED'],
  ['r2_not_preapproved', request({ risk_tier: 'R2' }), 'HUMAN_GATE', 'R2_NOT_PREAPPROVED'],
  ['r2_preapproved', request({ capability: 'artifact.write', effect: 'WRITE_LOCAL_BOUNDED', risk_tier: 'R2' }), 'ALLOW_BOUNDED', 'WITHIN_AUTONOMOUS_AUTHORITY'],
  ['r3_always_gated', request({ risk_tier: 'R3' }), 'HUMAN_GATE', 'R3_REQUIRES_HUMAN'],
  ['external_mutation_gated', request({ capability: 'web.search', effect: 'EXTERNAL_MUTATION' }), 'HUMAN_GATE', 'EXTERNAL_MUTATION_REQUIRES_HUMAN'],
  ['permission_expansion_gated', request({ effect: 'PERMISSION_EXPANSION' }), 'HUMAN_GATE', 'PERMISSION_EXPANSION_REQUIRES_HUMAN'],
  ['destructive_gated', request({ effect: 'DESTRUCTIVE' }), 'HUMAN_GATE', 'DESTRUCTIVE_REQUIRES_HUMAN'],
  ['unknown_capability_blocked', request({ capability: 'unknown.capability' }), 'BLOCK', 'CAPABILITY_NOT_REGISTERED'],
  ['invalid_risk_blocked', request({ risk_tier: 'R9' }), 'BLOCK', 'REQUEST_INVALID']
];

for (const [name, input, expectedOutcome, expectedReason] of authorityVectors) {
  const actual = decideAuthority(input, policy);
  assert.equal(actual.outcome, expectedOutcome, `${name}: outcome`);
  assert.equal(actual.reason, expectedReason, `${name}: reason`);
  assert.equal(actual.action_fingerprint, actionFingerprint(input), `${name}: action binding`);
}
const r0OnlyPolicy = createDefaultPolicy({ autonomous_risk_ceiling: 'R0' });
assert.equal(decideAuthority(request(), r0OnlyPolicy).reason, 'RISK_EXCEEDS_AUTONOMOUS_CEILING');
const invalidBudgetPolicy = createDefaultPolicy({ budgets: [{ budget_id: 'broken', scope: 'golden-demo', capabilities: ['web.search'], max_eur: 1, spent_eur: 2 }] });
assert.equal(decideAuthority(request(), invalidBudgetPolicy).reason, 'POLICY_INVALID');

const gatedRequest = request({ capability: 'web.search', effect: 'EXTERNAL_MUTATION' });
const gatedDecision = decideAuthority(gatedRequest, policy);
const receipt = createApprovalReceipt({
  request: gatedRequest,
  authority_decision: gatedDecision,
  policy,
  approver_id: 'human-miha',
  approved_at: NOW,
  expires_at: LATER
});
assert.throws(() => createApprovalReceipt({ request: gatedRequest, authority_decision: { ...gatedDecision, decision_id: 'forged' }, policy, approver_id: 'human-miha', approved_at: NOW, expires_at: LATER }), /APPROVAL_DECISION_BINDING_INVALID/);
assert.deepEqual(verifyApprovalReceipt(receipt, { request: gatedRequest, policy, now: NOW }), { ok: true, reason: 'APPROVAL_BOUND_AND_VALID' });
assert.equal(verifyApprovalReceipt(receipt, { request: request({ ...gatedRequest, scope: 'other-scope' }), policy, now: NOW }).reason, 'APPROVAL_ACTION_MISMATCH');
assert.equal(verifyApprovalReceipt(receipt, { request: gatedRequest, policy, now: '2026-09-12T14:00:00.000Z' }).reason, 'APPROVAL_EXPIRED');
assert.equal(verifyApprovalReceipt(receipt, { request: gatedRequest, policy, now: NOW, used_receipt_ids: [receipt.receipt_id] }).reason, 'APPROVAL_REPLAY_REJECTED');
const tamperedReceipt = { ...receipt, max_cost_eur: 999 };
assert.equal(verifyApprovalReceipt(tamperedReceipt, { request: gatedRequest, policy, now: NOW }).reason, 'APPROVAL_RECEIPT_TAMPERED');

let ledger = createLedger({ run_id: 'run-001', policy });
for (const event of [
  { event_id: 'plan', event_type: 'PLAN_CREATED', actor_id: 'kora-planner', at: NOW, payload: { goal: 'bounded proof' } },
  { event_id: 'authority', event_type: 'AUTHORITY_DECIDED', actor_id: 'kora-policy', at: NOW, payload: { outcome: 'ALLOW_BOUNDED' } },
  { event_id: 'execution', event_type: 'EXECUTION_COMPLETED', actor_id: 'worker-1', at: NOW, payload: { changed_files: ['artifact.md'] } },
  { event_id: 'evidence', event_type: 'EVIDENCE_CAPTURED', actor_id: 'worker-1', at: NOW, payload: { sha256: 'a'.repeat(64) } }
]) ledger = appendLedger(ledger, event);
assert.deepEqual(verifyLedger(ledger), { ok: true, reason: 'LEDGER_VERIFIED' });
const tamperedLedger = structuredClone(ledger);
tamperedLedger.entries[2].payload.changed_files.push('escape.txt');
assert.equal(verifyLedger(tamperedLedger).reason, 'LEDGER_ENTRY_TAMPERED');
const policyTamperedLedger = structuredClone(ledger);
policyTamperedLedger.policy.version = 'forged';
assert.equal(verifyLedger(policyTamperedLedger).reason, 'LEDGER_CHAIN_BROKEN');
assert.throws(() => appendLedger(ledger, { event_id: 'evidence', event_type: 'DUPLICATE', actor_id: 'attacker', at: NOW }), /LEDGER_EVENT_DUPLICATE/);

const verification = createVerificationReceipt({ ledger, worker_id: 'worker-1', verifier_id: 'verifier-1', evidence_event_ids: ['execution', 'evidence'], verdict: 'PASS', verified_at: NOW });
assert.deepEqual(verifyVerificationReceipt(verification, ledger), { ok: true, reason: 'VERIFICATION_BOUND_AND_VALID' });
assert.throws(() => createVerificationReceipt({ ledger, worker_id: 'worker-1', verifier_id: 'worker-1', evidence_event_ids: ['evidence'], verdict: 'PASS', verified_at: NOW }), /SELF_VERIFICATION_FORBIDDEN/);
assert.throws(() => createVerificationReceipt({ ledger, worker_id: 'worker-1', verifier_id: 'verifier-1', evidence_event_ids: ['evidence', 'evidence'], verdict: 'PASS', verified_at: NOW }), /VERIFICATION_EVIDENCE_DUPLICATE/);
assert.equal(verifyVerificationReceipt(verification, tamperedLedger).ok, false);

let lifecycle = { status: 'PLANNED', history: [] };
for (const [next, detail] of [
  ['PREPARED', {}], ['AUTHORIZED', { authority_outcome: 'ALLOW_BOUNDED' }], ['EXECUTING', {}], ['EXECUTED', {}], ['VERIFYING', {}], ['VERIFIED', { verdict: 'PASS', verification_receipt_id: verification.receipt_id }]
]) lifecycle = transitionLifecycle(lifecycle, next, detail);
assert.equal(lifecycle.status, 'VERIFIED');
assert.throws(() => transitionLifecycle({ status: 'PREPARED', history: [] }, 'VERIFIED', { verdict: 'PASS' }), /LIFECYCLE_TRANSITION_FORBIDDEN/);
assert.throws(() => transitionLifecycle({ status: 'PREPARED', history: [] }, 'AUTHORIZED'), /AUTHORIZED_REQUIRES_BOUNDED_DECISION/);
assert.throws(() => transitionLifecycle({ status: 'HUMAN_GATE', history: [] }, 'AUTHORIZED', { approval_valid: true, approval_receipt_id: receipt.receipt_id }), /USE_AUTHORIZE_HUMAN_GATE/);
const authorizedByReceipt = authorizeHumanGate({ status: 'HUMAN_GATE', history: [] }, { receipt, request: gatedRequest, policy, now: NOW });
assert.equal(authorizedByReceipt.status, 'AUTHORIZED');
assert.throws(() => transitionLifecycle({ status: 'VERIFYING', history: [] }, 'VERIFIED', { verdict: 'FAIL' }), /VERIFIED_REQUIRES_PASS_RECEIPT/);

let recovery = { status: 'AUTHORIZED', history: [] };
recovery = transitionLifecycle(recovery, 'EXECUTING');
recovery = transitionLifecycle(recovery, 'INTERRUPTED');
recovery = transitionLifecycle(recovery, 'RECOVERING');
assert.throws(() => transitionLifecycle(recovery, 'AUTHORIZED'), /RECOVERY_REQUIRES_VERIFIED_CHECKPOINT/);
recovery = transitionLifecycle(recovery, 'AUTHORIZED', { checkpoint_verified: true });
assert.equal(recovery.status, 'AUTHORIZED');

const nonAllowingRiskVectors = authorityVectors.filter(([, input]) => ['R3', 'R4'].includes(input.risk_tier) || ['EXTERNAL_MUTATION', 'DESTRUCTIVE', 'PERMISSION_EXPANSION'].includes(input.effect));
const failClosed = nonAllowingRiskVectors.every(([, input]) => decideAuthority(input, policy).outcome !== 'ALLOW_BOUNDED');
assert.equal(failClosed, true);

let seed = 0x4b4f5241;
function next() {
  seed = (1664525 * seed + 1013904223) >>> 0;
  return seed / 0x100000000;
}
const effects = ['READ_LOCAL', 'WRITE_LOCAL_BOUNDED', 'READ_EXTERNAL', 'EXTERNAL_MUTATION', 'DESTRUCTIVE', 'PERMISSION_EXPANSION'];
const risks = ['R0', 'R1', 'R2', 'R3', 'R4'];
for (let index = 0; index < 1000; index += 1) {
  const effect = effects[Math.floor(next() * effects.length)];
  const risk_tier = risks[Math.floor(next() * risks.length)];
  const capability = next() < 0.15 ? `unknown.${index}` : ['fixture.read', 'artifact.write', 'web.search'][Math.floor(next() * 3)];
  const estimated_cost_eur = next() < 0.5 ? 0 : Math.round(next() * 4000) / 100;
  const free_local_alternative_available = estimated_cost_eur > 0 && next() < 0.5;
  const input = request({
    action_id: `property-${index}`,
    capability,
    effect,
    risk_tier,
    provider: { id: 'property-provider', kind: estimated_cost_eur > 0 ? 'cloud' : 'local', estimated_cost_eur, free_local_alternative_available },
    budget_id: next() < 0.5 ? 'golden-demo-30' : undefined
  });
  const result = decideAuthority(input, policy);
  const consequential = ['R3', 'R4'].includes(risk_tier) || ['EXTERNAL_MUTATION', 'DESTRUCTIVE', 'PERMISSION_EXPANSION'].includes(effect);
  if (consequential || capability.startsWith('unknown.') || free_local_alternative_available) {
    assert.notEqual(result.outcome, 'ALLOW_BOUNDED', `property-${index}: unsafe allow`);
  }
}

console.log(JSON.stringify({
  proof: 'KORA_PUBLIC_TRUST_RELIABILITY_V0_1',
  verdict: 'PASS',
  authority_vectors: authorityVectors.length + 2,
  authority_vectors_passed: authorityVectors.length + 2,
  consequential_fail_closed_rate: 1,
  approval_binding_checks: 6,
  ledger_integrity_checks: 4,
  independent_verification_checks: 4,
  lifecycle_and_recovery_checks: 8,
  deterministic_adversarial_property_cases: 1000,
  manual_roi_claim_ready: false,
  next_human_evidence_gate: 'Complete paired manual-vs-Korako trials with real users.'
}, null, 2));
