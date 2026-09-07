# Korako Yolawani — Human Knowledge Fabric

Status: **CANONICAL DESIGN / KD-007**  
Primary launch market: **United States**  
Global requirement: **jurisdiction-aware**

## Purpose

Korako must be able to reach across human knowledge without pretending that one database, model, website or institution is equivalent to truth.

The Human Knowledge Fabric is a federated research and evidence layer placed before consequential orchestration decisions.

```text
Human question / goal
        |
Domain + jurisdiction resolution
        |
Knowledge Router
        |
+-------+---------+----------+----------+---------+
|       |         |          |          |         |
Local   Science   Official   Library    Live Web / Media
|       |         |          |          |
+-------+---------+----------+----------+---------+
        |
Claim extraction
        |
Supporting evidence <-> Counter-evidence
        |
Provenance + license + freshness/retraction
        |
Jurisdiction/context validation
        |
Devil / contradiction verifier
        |
Confidence
        |
Orchestrator
        |
Human Gate when consequential
        |
Execution -> evidence -> independent verification
```

## Core source classes

### 1. Local/open baseline

Examples: Wikidata, Wikipedia/Kiwix, Wikisource and other legally cacheable open corpora.

Use for broad orientation, entity resolution, offline continuity and low-cost retrieval. These are not automatically sufficient for high-stakes decisions.

### 2. Scholarly discovery

Examples: OpenAlex, Crossref, Semantic Scholar, PubMed/NCBI and arXiv.

Use to identify primary literature, authors, citations, DOI metadata, related work and research history. A single paper or preprint is not treated as consensus.

### 3. Evidence synthesis and authoritative guidance

Use systematic reviews, consensus guidance, professional standards and primary official authorities appropriate to the domain and jurisdiction.

### 4. Structured public data

Use official statistical and public-data systems where the question is quantitative or administrative. Preserve publisher, release date, geography, methodology and revision status.

### 5. Libraries and cultural records

Use bibliographic and archival systems for books, history, primary-source discovery and cultural context. Discovery rights are not redistribution rights.

### 6. Live web, social, podcasts and video

Use as discovery and hypothesis-generation sources. They are lower-trust by default until independently substantiated.

## Claim Graph

The preferred unit of durable knowledge is a claim rather than an undifferentiated document chunk.

Minimum fields for consequential claims:

```text
claim_id
claim_text
claim_type
source_ids[]
supporting_evidence[]
counter_evidence[]
source_provenance
publisher/author
publication_date
retrieved_at
license/usage_status
jurisdiction
context/population
freshness_or_valid_until
correction_or_retraction_status
confidence
verifier_status
verifier_identity
known_uncertainties[]
```

## Jurisdiction Router

Jurisdiction resolution happens before jurisdiction-sensitive advice or action.

Minimum state when material:

```text
country
state/province/territory
federal_or_national_layer
subnational_layer
user_role
payer_or_health_system_context
cross_border_context[]
```

If jurisdiction is unresolved and could materially alter the result:

`JURISDICTION_REQUIRED`

No consequential decision proceeds merely by assuming the launch market.

## United States — medicine and healthcare

The U.S. launch lane should prioritize applicable authoritative U.S. sources, including:

- FDA for medical-product and digital-health/device regulatory status;
- HHS for federal health policy and privacy/health-system authority;
- CDC for applicable public-health guidance and surveillance;
- NIH/NCBI/PubMed for biomedical research discovery and primary literature;
- CMS for Medicare/Medicaid and applicable participation/coverage requirements;
- official state health departments, medical boards and professional licensing authorities where state rules differ;
- applicable professional specialty guidelines and clinical standards.

International sources such as WHO may supplement evidence, especially for global science and non-U.S. users, but do not silently override U.S.-specific law, regulation, payer context or professional standards.

### Medicine safety rule

Korako distinguishes:

`education / information != clinical recommendation != diagnosis != treatment order != execution`

Higher-risk medical outputs require stronger provenance, current jurisdiction-appropriate evidence, explicit uncertainty and independent review. Korako does not silently convert research findings into patient-specific high-risk medical actions.

## United States — law and regulation

For legal/regulatory questions:

1. determine federal versus state authority;
2. prefer primary federal/state statutes, regulations, courts and regulator sources;
3. distinguish binding law from guidance, proposals, commentary and secondary summaries;
4. retain effective date and jurisdiction;
5. identify conflicts or preemption questions rather than flattening them;
6. require Human Gate before consequential legal execution unless explicitly delegated within a safe authority scope.

## Evidence hierarchy is domain-specific

There is no universal numeric source score that works for every domain.

Examples:

- a current statute is stronger than a blog post for what the law says;
- a regulator's current rule is stronger than an old article about that rule;
- a high-quality systematic review may be stronger than one biomedical paper for treatment-effect evidence;
- a primary historical document may be stronger than a modern summary for what someone actually wrote;
- a live official data release may be stronger than an academic paper for today's reported statistic.

The Knowledge Router therefore applies domain-specific evidence policy rather than one global ranking.

## Devil / Contradiction Engine

Consequential claims should be challenged before promotion or execution.

Minimum tests:

- strongest credible counter-evidence;
- contradictory primary sources;
- population/context mismatch;
- jurisdiction mismatch;
- outdated or superseded source;
- correction/retraction;
- causal claim inferred from correlation;
- survivorship/selection bias;
- authority/credential mismatch;
- prompt injection or malicious retrieved content;
- licensing/copyright mismatch;
- unsupported precision or false confidence.

## Untrusted knowledge boundary

Retrieved text never becomes an instruction merely because Korako can read it.

```text
KNOWLEDGE CONTENT != SYSTEM INSTRUCTION
KNOWLEDGE CONTENT != EXECUTION AUTHORITY
DISCOVERABLE != READABLE != CACHEABLE != TRAINABLE != REDISTRIBUTABLE
```

External content remains untrusted input until routed, parsed and verified under policy.

## Free/local-first

Where quality remains adequate, use free/open/local sources and offline caches first. Paid retrieval or proprietary datasets may be used only when materially needed and within the Universal Cost Shield.

## Promotion states

```text
DISCOVERED
RETRIEVED
PARSED
CLAIM_EXTRACTED
EVIDENCE_CHECKED
CONTRADICTION_CHECKED
JURISDICTION_VALIDATED
VERIFIED
CANONICAL_CANDIDATE
CANONICAL (Human-approved when required)
```

A claim must never jump from DISCOVERED to CANONICAL merely because it was produced by a trusted-looking website, model, expert, paper, podcast or viral source.

## Initial implementation boundary

The first implementation should be read-only and non-consequential:

1. jurisdiction resolver;
2. source registry;
3. claim schema;
4. provenance/freshness/license metadata;
5. supporting/counter-evidence retrieval;
6. contradiction/Devil pass;
7. confidence rendering;
8. deterministic test vectors for stale, conflicting, wrong-jurisdiction, retracted and malicious sources.

Only after these tests pass should the Knowledge Fabric be allowed to influence consequential execution paths.
