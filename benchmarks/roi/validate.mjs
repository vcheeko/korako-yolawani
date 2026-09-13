import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const required = ['trial_id', 'workflow_id', 'mode', 'user_id', 'duration_seconds', 'clicks', 'tool_switches', 'copy_paste_transfers', 'errors', 'cost_eur', 'completed', 'measured_at'];
const filePath = path.resolve(process.argv[2] ?? fileURLToPath(new URL('./manual-vs-korako-template.csv', import.meta.url)));
const raw = await readFile(filePath, 'utf8');
const lines = raw.trim().split(/\r?\n/).filter(Boolean);
const headers = (lines[0] ?? '').split(',');
if (required.some((column) => !headers.includes(column))) throw new Error('ROI_TEMPLATE_SCHEMA_INVALID');

function parse(line) {
  const values = line.split(',');
  if (values.length !== headers.length) throw new Error('ROI_ROW_COLUMN_COUNT_INVALID');
  return Object.fromEntries(headers.map((header, index) => [header, values[index] ?? '']));
}

const rows = lines.slice(1).map(parse);
const groups = new Map();
for (const row of rows) {
  if (!['manual', 'korako'].includes(row.mode)) throw new Error('ROI_MODE_INVALID');
  if (!row.trial_id || !row.workflow_id || !row.user_id) throw new Error('ROI_IDENTITY_INVALID');
  if (!['true', 'false'].includes(row.completed)) throw new Error('ROI_COMPLETION_INVALID');
  if (!Number.isFinite(new Date(row.measured_at).getTime())) throw new Error('ROI_TIMESTAMP_INVALID');
  const key = `${row.trial_id}:${row.workflow_id}:${row.user_id}`;
  if (!groups.has(key)) groups.set(key, {});
  if (groups.get(key)[row.mode]) throw new Error('ROI_DUPLICATE_MODE_FOR_TRIAL');
  groups.get(key)[row.mode] = row;
}
const pairs = [...groups.values()].filter((group) => group.manual && group.korako);

function number(row, field) {
  const value = Number(row[field]);
  if (!Number.isFinite(value) || value < 0) throw new Error(`ROI_VALUE_INVALID:${field}`);
  return value;
}
function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2 ? sorted[middle] : (sorted[middle - 1] + sorted[middle]) / 2;
}

if (pairs.length === 0) {
  console.log(JSON.stringify({
    proof: 'KORAKO_ROI_EVIDENCE_CHECK_V0_1',
    status: 'EVIDENCE_INCOMPLETE',
    paired_trials: 0,
    minimum_paired_trials: 10,
    time_saved_claimed: false,
    next_human_evidence_gate: 'Measure the same workflow manually and with Korako; record observed values only.'
  }, null, 2));
  process.exit(0);
}

const measurements = pairs.map((pair) => ({
  manual_seconds: number(pair.manual, 'duration_seconds'),
  korako_seconds: number(pair.korako, 'duration_seconds'),
  manual_clicks: number(pair.manual, 'clicks'),
  korako_clicks: number(pair.korako, 'clicks'),
  manual_transfers: number(pair.manual, 'copy_paste_transfers'),
  korako_transfers: number(pair.korako, 'copy_paste_transfers'),
  manual_errors: number(pair.manual, 'errors'),
  korako_errors: number(pair.korako, 'errors'),
  manual_completed: pair.manual.completed === 'true',
  korako_completed: pair.korako.completed === 'true'
}));
const ready = pairs.length >= 10;
const manualMedian = median(measurements.map((item) => item.manual_seconds));
const korakoMedian = median(measurements.map((item) => item.korako_seconds));
console.log(JSON.stringify({
  proof: 'KORAKO_ROI_EVIDENCE_CHECK_V0_1',
  status: ready ? 'EVIDENCE_REVIEW_REQUIRED' : 'EVIDENCE_INCOMPLETE',
  paired_trials: pairs.length,
  minimum_paired_trials: 10,
  median_manual_seconds: manualMedian,
  median_korako_seconds: korakoMedian,
  median_seconds_saved: manualMedian - korakoMedian,
  median_time_reduction_percent: manualMedian === 0 ? null : Math.round(((manualMedian - korakoMedian) / manualMedian) * 1000) / 10,
  total_manual_clicks: measurements.reduce((sum, item) => sum + item.manual_clicks, 0),
  total_korako_clicks: measurements.reduce((sum, item) => sum + item.korako_clicks, 0),
  total_manual_postman_transfers: measurements.reduce((sum, item) => sum + item.manual_transfers, 0),
  total_korako_postman_transfers: measurements.reduce((sum, item) => sum + item.korako_transfers, 0),
  total_manual_errors: measurements.reduce((sum, item) => sum + item.manual_errors, 0),
  total_korako_errors: measurements.reduce((sum, item) => sum + item.korako_errors, 0),
  manual_completion_rate: measurements.filter((item) => item.manual_completed).length / measurements.length,
  korako_completion_rate: measurements.filter((item) => item.korako_completed).length / measurements.length,
  time_saved_claimed: false,
  next_human_evidence_gate: ready ? 'Review measurement integrity and approve any external ROI claim.' : 'Collect more paired trials.'
}, null, 2));
