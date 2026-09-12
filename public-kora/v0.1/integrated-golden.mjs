import assert from 'node:assert/strict';
import { mkdtemp, readFile, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import {
  appendLedger,
  authorizeHumanGate,
  createApprovalReceipt,
  createDefaultPolicy,
  createLedger,
  createVerificationReceipt,
  decideAuthority,
  sha256,
  transitionLifecycle,
  verifyApprovalReceipt,
  verifyLedger,
  verifyVerificationReceipt
} from './kernel.mjs';

const NOW = '2026-09-12T12:00:00.000Z';
const policy = createDefaultPolicy();
const workspace = await mkdtemp(path.join(os.tmpdir(), 'korako-trust-golden-'));
const sourcePath = path.join(workspace, 'goal.txt');
const artifactPath = path.join(workspace, 'verified-result.md');
await writeFile(sourcePath, 'Prepare one bounded, local, independently verified result.\n', 'utf8');

const action = {
  action_id: 'golden-action-001',
  capability: 'artifact.write',
  effect: 'WRITE_LOCAL_BOUNDED',
  risk_tier: 'R2',
  scope: 'golden-demo',
  provider: { id: 'local-worker', kind: 'local', estimated_cost_eur: 0, free_local_alternative_available: false }
};
const authority = decideAuthority(action, policy);
assert.equal(authority.outcome, 'ALLOW_BOUNDED');

let lifecycle = { status: 'PLANNED', history: [] };
lifecycle = transitionLifecycle(lifecycle, 'PREPARED');
lifecycle = transitionLifecycle(lifecycle, 'AUTHORIZED', { authority_outcome: authority.outcome, decision_id: authority.decision_id });

let ledger = createLedger({ run_id: 'trust-golden-run-001', policy });
ledger = appendLedger(ledger, { event_id: 'goal', event_type: 'GOAL_ACCEPTED', actor_id: 'mira-interface', at: NOW, payload: { source: 'local-fixture' } });
ledger = appendLedger(ledger, { event_id: 'authority', event_type: 'AUTHORITY_DECIDED', actor_id: 'kora-policy', at: NOW, payload: authority });

lifecycle = transitionLifecycle(lifecycle, 'EXECUTING');
const source = await readFile(sourcePath, 'utf8');
const artifact = `# Verified Korako result\n\n${source.trim()}\n\nWorker: local-worker\n`;
await writeFile(artifactPath, artifact, 'utf8');
ledger = appendLedger(ledger, { event_id: 'execution', event_type: 'EXECUTION_COMPLETED', actor_id: 'local-worker', at: NOW, payload: { bounded: true, external_network: false, changed_files: ['verified-result.md'] } });
ledger = appendLedger(ledger, { event_id: 'evidence', event_type: 'EVIDENCE_CAPTURED', actor_id: 'local-worker', at: NOW, payload: { artifact_sha256: sha256(artifact), artifact_bytes: Buffer.byteLength(artifact) } });
lifecycle = transitionLifecycle(lifecycle, 'EXECUTED');
lifecycle = transitionLifecycle(lifecycle, 'VERIFYING');

const verification = createVerificationReceipt({
  ledger,
  worker_id: 'local-worker',
  verifier_id: 'independent-verifier',
  evidence_event_ids: ['execution', 'evidence'],
  verdict: 'PASS',
  verified_at: NOW
});
assert.deepEqual(verifyLedger(ledger), { ok: true, reason: 'LEDGER_VERIFIED' });
assert.deepEqual(verifyVerificationReceipt(verification, ledger), { ok: true, reason: 'VERIFICATION_BOUND_AND_VALID' });
lifecycle = transitionLifecycle(lifecycle, 'VERIFIED', { verdict: 'PASS', verification_receipt_id: verification.receipt_id });

const externalAction = {
  action_id: 'external-action-001',
  capability: 'web.search',
  effect: 'EXTERNAL_MUTATION',
  risk_tier: 'R1',
  scope: 'golden-demo',
  provider: { id: 'external-worker', kind: 'external', estimated_cost_eur: 0, free_local_alternative_available: false }
};
const externalDecision = decideAuthority(externalAction, policy);
assert.equal(externalDecision.outcome, 'HUMAN_GATE');
let gatedLifecycle = transitionLifecycle({ status: 'PLANNED', history: [] }, 'PREPARED');
gatedLifecycle = transitionLifecycle(gatedLifecycle, 'HUMAN_GATE');
assert.throws(() => transitionLifecycle(gatedLifecycle, 'AUTHORIZED', { approval_valid: true, approval_receipt_id: 'forged' }), /USE_AUTHORIZE_HUMAN_GATE/);
const approval = createApprovalReceipt({
  request: externalAction,
  authority_decision: externalDecision,
  policy,
  approver_id: 'human-test-identity',
  approved_at: NOW,
  expires_at: '2026-09-12T13:00:00.000Z'
});
const approvalCheck = verifyApprovalReceipt(approval, { request: externalAction, policy, now: NOW });
assert.deepEqual(approvalCheck, { ok: true, reason: 'APPROVAL_BOUND_AND_VALID' });
gatedLifecycle = authorizeHumanGate(gatedLifecycle, { receipt: approval, request: externalAction, policy, now: NOW });
assert.equal(gatedLifecycle.status, 'AUTHORIZED');

console.log(JSON.stringify({
  proof: 'KORA_TRUST_INTEGRATED_GOLDEN_V0_1',
  verdict: 'PASS',
  bounded_terminal_state: lifecycle.status,
  authority_policy_bound: authority.policy_fingerprint === ledger.policy.fingerprint,
  evidence_ledger_verified: true,
  independent_verifier: verification.worker_id !== verification.verifier_id,
  human_gate_fail_closed_without_receipt: true,
  approval_receipt_binding_verified: approvalCheck.ok,
  external_action_executed: false,
  paid_cost_eur: 0,
  human_postman_transfers: 0
}, null, 2));
