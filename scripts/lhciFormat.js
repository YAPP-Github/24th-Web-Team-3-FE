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
  const resultsInput = core.getInput("lighthouse-results") // GitHub Actions에서 입력을 받음
  const results = JSON.parse(resultsInput) // 입력을 JSON으로 파싱
  let comments = ""

  results.forEach((result) => {
    const { audits, categories: summary } = result
    const performance = formatResult(summary.performance.score * 100)
    const comment = getComment(performance)
    const detailRows = categories
      .map((category) => detailRow(category, audits))
      .join("\n")
    const detail = [`| Category | Score |`, detailRows].join("\n")
    comments += comment + "\n" + detail + "\n\n"
  })

  core.setOutput("comments", comments) // 결과를 PR에 댓글로 남김
}
