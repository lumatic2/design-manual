import { createRequire } from "node:module"
import { mkdir, readFile, writeFile } from "node:fs/promises"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const siteRoot = path.join(root, "examples", "ui-vocabulary-site")
const require = createRequire(path.join(siteRoot, "package.json"))
const YAML = require("yaml")

const termsPath = path.join(root, "docs", "ui-vocabulary", "terms.yml")
const inboxPath = path.join(root, "docs", "ui-vocabulary", "inbox.yml")
const outputPath = path.join(root, "docs", "ui-vocabulary", "inbox-review.md")

const terms = YAML.parse(await readFile(termsPath, "utf8"))
const candidates = YAML.parse(await readFile(inboxPath, "utf8")) ?? []

if (!Array.isArray(terms)) {
  throw new Error("terms.yml must be a list")
}
if (!Array.isArray(candidates)) {
  throw new Error("inbox.yml must be a list")
}

const now = new Date().toISOString().slice(0, 10)
const rows = candidates.map((candidate, index) => {
  const risks = findDuplicateRisks(candidate, terms)
  const riskText = risks.length
    ? risks.slice(0, 4).map((risk) => `\`${risk.id}\` (${risk.reason})`).join("<br>")
    : "No obvious duplicate risk"

  return [
    String(index + 1),
    `\`${candidate.id ?? "missing-id"}\`<br>${escapeCell(candidate.ko?.name)} / ${escapeCell(candidate.en?.name)}`,
    `${escapeCell(candidate.one_liner)}<br><br>Use: ${toInlineList(candidate.when_to_use)}<br>Avoid: ${toInlineList(candidate.anti_use)}`,
    `${toInlineList(candidate.visual_anatomy)}<br><br>Asset: \`${candidate.asset?.variant ?? "missing"}\``,
    riskText,
    "TBD",
  ]
})

const markdown = `# UI Vocabulary Inbox Review

Generated: ${now}

Source inbox: \`docs/ui-vocabulary/inbox.yml\`

Use this file to review whether each candidate should become a public
dictionary term. Update decisions in your batch note or directly in the inbox
comments before promotion.

Decision options:

- \`promote\`: add as a new \`terms.yml\` entry.
- \`alias\`: add only as an alias to an existing term.
- \`related\`: add a comparison note to an existing term.
- \`reject\`: keep out of the dataset.

## Batch Summary

- Candidates: ${candidates.length}
- Candidates with duplicate-risk: ${candidates.filter((candidate) => findDuplicateRisks(candidate, terms).length > 0).length}

## Review Table

| # | Candidate | What It Is | What It Looks Like | Duplicate Risk | Decision |
|---:|---|---|---|---|---|
${rows.map((row) => `| ${row.join(" | ")} |`).join("\n")}
`

await mkdir(path.dirname(outputPath), { recursive: true })
await writeFile(outputPath, markdown, "utf8")
console.log(`generated ${path.relative(root, outputPath)} (${candidates.length} candidates)`)

function toInlineList(value) {
  return Array.isArray(value) && value.length
    ? value.map((item) => escapeCell(String(item))).join(", ")
    : "Missing"
}

function escapeCell(value) {
  return String(value ?? "Missing")
    .replace(/\|/g, "\\|")
    .replace(/\r?\n/g, "<br>")
}

function normalize(value) {
  return String(value ?? "").trim().toLocaleLowerCase("ko-KR").replace(/\s+/g, " ")
}

function findDuplicateRisks(candidate, existingTerms) {
  const candidatePhrases = collectComparablePhrases(candidate)
  const candidateTokenSets = candidatePhrases
    .map((phrase) => ({ phrase, tokens: tokenizeComparable(phrase) }))
    .filter((entry) => entry.tokens.length > 0)

  const risks = []

  for (const term of existingTerms) {
    const existingPhrases = collectComparablePhrases(term)
    const existingTokenSets = existingPhrases
      .map((phrase) => ({ phrase, tokens: tokenizeComparable(phrase) }))
      .filter((entry) => entry.tokens.length > 0)

    const substringMatch = findSubstringMatch(candidatePhrases, existingPhrases)
    if (substringMatch) {
      risks.push({
        id: term.id,
        score: 0.9,
        reason: `name/id substring "${substringMatch.candidate}" ~= "${substringMatch.existing}"`,
      })
      continue
    }

    const tokenMatch = findTokenMatch(candidateTokenSets, existingTokenSets)
    if (tokenMatch?.score >= 0.6) {
      risks.push({
        id: term.id,
        score: tokenMatch.score,
        reason: `token similarity ${tokenMatch.score.toFixed(2)} via "${tokenMatch.candidate}" ~= "${tokenMatch.existing}"`,
      })
    }
  }

  return risks
    .sort((left, right) => right.score - left.score || left.id.localeCompare(right.id))
    .slice(0, 8)
}

function collectComparablePhrases(term) {
  return [
    term.id,
    term.id?.replace(/-/g, " "),
    term.ko?.name,
    term.en?.name,
    ...(term.ko?.aliases ?? []),
    ...(term.en?.aliases ?? []),
  ].map(normalize).filter((phrase) => phrase.length >= 3)
}

function findSubstringMatch(candidatePhrases, existingPhrases) {
  const genericPhrases = new Set([
    "banner",
    "button",
    "card",
    "field",
    "input",
    "menu",
    "panel",
    "prompt",
    "screen",
    "sheet",
    "state",
    "view",
    "pending state",
  ])

  for (const candidatePhrase of candidatePhrases) {
    for (const existingPhrase of existingPhrases) {
      if (candidatePhrase === existingPhrase) {
        continue
      }

      if (genericPhrases.has(candidatePhrase) || genericPhrases.has(existingPhrase)) {
        continue
      }

      if (candidatePhrase.length < 6 || existingPhrase.length < 6) {
        continue
      }

      if (candidatePhrase.includes(existingPhrase) || existingPhrase.includes(candidatePhrase)) {
        return { candidate: candidatePhrase, existing: existingPhrase }
      }
    }
  }

  return null
}

function findTokenMatch(candidateEntries, existingEntries) {
  let best = null

  for (const candidateEntry of candidateEntries) {
    for (const existingEntry of existingEntries) {
      const score = jaccard(candidateEntry.tokens, existingEntry.tokens)
      if (!best || score > best.score) {
        best = {
          score,
          candidate: candidateEntry.phrase,
          existing: existingEntry.phrase,
        }
      }
    }
  }

  return best
}

function tokenizeComparable(value) {
  const stopWords = new Set([
    "a",
    "an",
    "and",
    "for",
    "of",
    "or",
    "the",
    "to",
    "ui",
    "banner",
    "button",
    "card",
    "field",
    "input",
    "menu",
    "panel",
    "prompt",
    "screen",
    "sheet",
    "state",
    "view",
    "배너",
    "버튼",
    "상태",
    "시트",
    "입력",
    "카드",
    "패널",
    "프롬프트",
    "화면",
  ])

  return [...new Set(
    normalize(value)
      .replace(/[^a-z0-9가-힣]+/g, " ")
      .split(/\s+/)
      .filter((token) => token.length >= 3 && !stopWords.has(token)),
  )]
}

function jaccard(leftTokens, rightTokens) {
  const left = new Set(leftTokens)
  const right = new Set(rightTokens)
  const intersection = [...left].filter((token) => right.has(token)).length
  const union = new Set([...left, ...right]).size

  return union ? intersection / union : 0
}
