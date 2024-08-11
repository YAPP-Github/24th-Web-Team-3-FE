const fs = require("fs")

const workspace = process.env.GITHUB_WORKSPACE

const results = JSON.parse(
  fs.readFileSync(path.join(workspace, "lhci_reports", "manifest.json"))
)
const categories = [
  "first-contentful-paint",
  "interactive",
  "speed-index",
  "total-blocking-time",
  "largest-contentful-paint",
  "cumulative-layout-shift",
]

const formatResult = (res) => Math.round(res * 100)
const score = (res) => (res >= 90 ? "🟢" : res >= 50 ? "🟠" : "🔴")
const detailRow = (category, audits) =>
  `| ${score(audits[category].score * 100)} ${category} | ${
    audits[category].displayValue
  } |`
const getComment = (performance) =>
  [
    `⚡️ Lighthouse report!`,
    `| Summary | Score |`,
    `| --- | --- |`,
    `| ${score(performance)} Performance | ${performance} |`,
  ].join("\n")

module.exports = async ({ core }) => {
  let comments = ""

  results.forEach((result) => {
    const { summary, jsonPath } = result
    const details = JSON.parse(fs.readFileSync(jsonPath))
    const { audits } = details
    const summaryEntries = Object.entries(summary).map(([key, value]) => [
      key,
      formatResult(value),
    ])
    const { performance } = Object.fromEntries(summaryEntries)
    const comment = getComment(performance)
    const detailRows = categories
      .map((category) => detailRow(category, audits))
      .join("\n")
    const detail = [`| Category | Score |`, detailRows].join("\n")
    comments += comment + "\n" + detail + "\n\n"
  })

  core.setOutput("comments", comments)
}
