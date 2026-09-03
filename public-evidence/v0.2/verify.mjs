import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const HASH_RE = /^[a-f0-9]{64}$/;
const here = new URL("./", import.meta.url);
const vectorsPath = new URL("golden-public-vectors.json", here);

function sha256(text) {
  return createHash("sha256").update(text, "utf8").digest("hex");
}

function evidenceSetHash(evidence) {
  const canonical = [...evidence]
    .sort((left, right) => left.evidence_id.localeCompare(right.evidence_id))
    .map((item) => `${item.evidence_id}:${item.content_hash}:${item.provenance}`)
    .join("\n");
  return sha256(canonical);
}

function verifyVector(vector, contract) {
  if (vector.state !== "COMPLETED") return { ok: false, reason: "STATE_NOT_COMPLETED" };
  if (vector.failure_code !== null) return { ok: false, reason: "TERMINAL_FAILURE_PRESENT" };
  if (!Array.isArray(vector.evidence)) return { ok: false, reason: "EVIDENCE_INVALID" };

  const actualIds = vector.evidence.map((item) => item.evidence_id).sort();
  const expectedIds = [...contract.expected_evidence_ids].sort();
  if (actualIds.length !== expectedIds.length) {
    return { ok: false, reason: "EVIDENCE_SET_MISMATCH" };
  }
  if (new Set(actualIds).size !== actualIds.length) {
    return { ok: false, reason: "EVIDENCE_DUPLICATE" };
  }
  if (!actualIds.every((id, index) => id === expectedIds[index])) {
    return { ok: false, reason: "EVIDENCE_SET_MISMATCH" };
  }

  for (const item of vector.evidence) {
    if (typeof item.evidence_id !== "string" || item.evidence_id.length < 1) {
      return { ok: false, reason: "EVIDENCE_ID_INVALID" };
    }
    if (typeof item.content_hash !== "string" || !HASH_RE.test(item.content_hash)) {
      return { ok: false, reason: "EVIDENCE_HASH_INVALID" };
    }
    const expectedProvenance = contract.expected_provenance[item.evidence_id];
    if (typeof expectedProvenance !== "string" || item.provenance !== expectedProvenance) {
      return { ok: false, reason: "EVIDENCE_PROVENANCE_MISMATCH" };
    }
  }

  const changedFiles = vector.evidence.find((item) => item.evidence_id === "changed_files");
  if (!changedFiles || changedFiles.content_hash !== contract.expected_changed_files_hash) {
    return { ok: false, reason: "CHANGED_FILES_NOT_EMPTY" };
  }

  if (!vector.verifier || vector.verifier.verdict !== "PASS") {
    return { ok: false, reason: "VERIFIER_PASS_REQUIRED" };
  }
  if (vector.verifier.verifier_id !== contract.expected_verifier_id) {
    return { ok: false, reason: "VERIFIER_ID_MISMATCH" };
  }
  if (!HASH_RE.test(vector.verifier.evidence_set_hash ?? "")) {
    return { ok: false, reason: "VERIFIER_HASH_INVALID" };
  }

  const computed = evidenceSetHash(vector.evidence);
  if (computed !== vector.verifier.evidence_set_hash) {
    return { ok: false, reason: "VERIFIER_BINDING_MISMATCH" };
  }

  return { ok: true, reason: "VERIFIED_PUBLIC_VECTOR" };
}

const raw = await readFile(fileURLToPath(vectorsPath), "utf8");
const suite = JSON.parse(raw);
if (suite.schema !== "KORA-PUBLIC-GOLDEN-VECTORS-0.2") {
  throw new Error("KORA_PUBLIC_VECTOR_SCHEMA_INVALID");
}
if (!Array.isArray(suite.expected_evidence_ids) || suite.expected_evidence_ids.length < 1) {
  throw new Error("KORA_PUBLIC_EXPECTED_EVIDENCE_INVALID");
}
if (
  typeof suite.expected_provenance !== "object" ||
  suite.expected_provenance === null ||
  Array.isArray(suite.expected_provenance)
) {
  throw new Error("KORA_PUBLIC_EXPECTED_PROVENANCE_INVALID");
}
for (const evidenceId of suite.expected_evidence_ids) {
  if (typeof suite.expected_provenance[evidenceId] !== "string") {
    throw new Error("KORA_PUBLIC_EXPECTED_PROVENANCE_INVALID");
  }
}
if (!HASH_RE.test(suite.expected_changed_files_hash ?? "")) {
  throw new Error("KORA_PUBLIC_CHANGED_FILES_HASH_INVALID");
}
if (typeof suite.expected_verifier_id !== "string" || suite.expected_verifier_id.length < 1) {
  throw new Error("KORA_PUBLIC_VERIFIER_ID_INVALID");
}
if (!Array.isArray(suite.vectors) || suite.vectors.length < 1) {
  throw new Error("KORA_PUBLIC_VECTORS_EMPTY");
}

let mismatches = 0;
for (const vector of suite.vectors) {
  const result = verifyVector(vector, suite);
  const actual = result.ok ? "PASS" : "FAIL";
  const outcomeMatches = actual === vector.expected;
  const reasonMatches = result.reason === vector.expected_reason;
  const matches = outcomeMatches && reasonMatches;
  console.log(
    `${vector.name}: expected=${vector.expected}/${vector.expected_reason} actual=${actual}/${result.reason} ${matches ? "OK" : "MISMATCH"}`
  );
  if (!matches) mismatches += 1;
}

if (mismatches > 0) {
  console.error(`KORA_PUBLIC_VECTOR_SUITE_V0_2=FAIL mismatches=${mismatches}`);
  process.exit(1);
}

console.log("KORA_PUBLIC_VECTOR_SUITE_V0_2=PASS");
