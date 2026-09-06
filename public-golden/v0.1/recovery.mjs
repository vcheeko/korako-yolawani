import { mkdtemp, writeFile, access } from 'node:fs/promises';
import os from 'node:os'; import path from 'node:path';
import { APPROVAL_TOKEN, assertTerminalVerified, authorizeRun, createRun, executeRun, markInterrupted, recoverRun, verifyRun } from './runtime.mjs';
const workspace = await mkdtemp(path.join(os.tmpdir(), 'korako-public-recovery-')); const inputPath = path.join(workspace, 'input.txt'); const artifactPath = path.join(workspace, 'artifact.md');
await writeFile(inputPath, 'Checkpoint before execution.\nResume safely.\nVerify after recovery.\n', 'utf8');
const { statePath } = await createRun({ workspace, goal: 'Recover a bounded run from an interruption before execution', inputPath, artifactPath });
await authorizeRun(statePath, APPROVAL_TOKEN); await markInterrupted(statePath, 'SIMULATED_PROCESS_STOP');
let artifactExistedBeforeRecovery = true; try { await access(artifactPath); } catch { artifactExistedBeforeRecovery = false; }
if (artifactExistedBeforeRecovery) throw new Error('FAIL_CLOSED_VIOLATION_ARTIFACT_EXISTED_BEFORE_RECOVERY');
await recoverRun(statePath); await executeRun(statePath); await verifyRun(statePath); const finalState = await assertTerminalVerified(statePath);
console.log(JSON.stringify({ proof: 'PUBLIC_GOLDEN_RECOVERY_V0_1', verdict: finalState.verification.verdict, terminal_state: finalState.status, recovery_count: finalState.recovery.count, fail_closed_before_recovery: !artifactExistedBeforeRecovery, recovery_checkpoint: 'AUTHORIZED' }, null, 2));
