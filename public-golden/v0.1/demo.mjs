import { mkdtemp, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { APPROVAL_TOKEN, assertTerminalVerified, authorizeRun, createRun, executeRun, verifyRun } from './runtime.mjs';

const workspace = await mkdtemp(path.join(os.tmpdir(), 'korako-public-golden-'));
const inputPath = path.join(workspace, 'input.txt'); const artifactPath = path.join(workspace, 'artifact.md');
await writeFile(inputPath, 'Preserve human authority.\nProduce inspectable evidence.\nRecover from interruption.\n', 'utf8');
const { statePath } = await createRun({ workspace, goal: 'Turn a bounded local brief into a verified artifact', inputPath, artifactPath });
let blockedWithoutApproval = false;
try { await authorizeRun(statePath, 'NOT_APPROVED'); } catch (error) { blockedWithoutApproval = error.message === 'HUMAN_GATE_REQUIRED'; }
if (!blockedWithoutApproval) throw new Error('EXPECTED_HUMAN_GATE_BLOCK_DID_NOT_OCCUR');
await authorizeRun(statePath, APPROVAL_TOKEN); await executeRun(statePath); await verifyRun(statePath); const finalState = await assertTerminalVerified(statePath);
console.log(JSON.stringify({ proof: 'PUBLIC_GOLDEN_V0_1', verdict: finalState.verification.verdict, terminal_state: finalState.status, human_gate_fail_closed: blockedWithoutApproval, artifact_sha256: finalState.evidence.artifact_sha256, independent_verifier: finalState.verification.checks.independent_verifier, human_postman_transfers: finalState.metrics.human_postman_transfers }, null, 2));
