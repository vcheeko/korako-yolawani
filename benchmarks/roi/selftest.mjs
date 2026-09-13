import assert from 'node:assert/strict';
import { mkdtemp, writeFile } from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const workspace = await mkdtemp(path.join(os.tmpdir(), 'korako-roi-selftest-'));
const validPath = path.join(workspace, 'ten-pairs.csv');
const invalidPath = path.join(workspace, 'invalid.csv');
const header = 'trial_id,workflow_id,mode,user_id,duration_seconds,clicks,tool_switches,copy_paste_transfers,errors,cost_eur,completed,measured_at';
const rows = [header];
for (let index = 1; index <= 10; index += 1) {
  rows.push(`${index},job-search,manual,test-user,120,18,4,3,0,0,true,2026-09-12T12:00:00.000Z`);
  rows.push(`${index},job-search,korako,test-user,60,4,0,0,0,0,true,2026-09-12T12:05:00.000Z`);
}
await writeFile(validPath, `${rows.join('\n')}\n`, 'utf8');
await writeFile(invalidPath, `${header}\n1,job-search,guess,test-user,1,1,1,1,0,0,true,2026-09-12T12:00:00.000Z\n`, 'utf8');

const validatorPath = fileURLToPath(new URL('./validate.mjs', import.meta.url));
const valid = spawnSync(process.execPath, [validatorPath, validPath], { encoding: 'utf8' });
assert.equal(valid.status, 0, valid.stderr);
const report = JSON.parse(valid.stdout);
assert.equal(report.status, 'EVIDENCE_REVIEW_REQUIRED');
assert.equal(report.paired_trials, 10);
assert.equal(report.median_seconds_saved, 60);
assert.equal(report.total_korako_postman_transfers, 0);
assert.equal(report.time_saved_claimed, false);

const invalid = spawnSync(process.execPath, [validatorPath, invalidPath], { encoding: 'utf8' });
assert.notEqual(invalid.status, 0);
assert.match(invalid.stderr, /ROI_MODE_INVALID/);

console.log(JSON.stringify({
  proof: 'KORAKO_ROI_VALIDATOR_SELFTEST_V0_1',
  verdict: 'PASS',
  paired_fixture_trials: 10,
  invalid_input_fail_closed: true,
  external_roi_claim_automatic: false
}, null, 2));
