const fs = require("fs")
const path = require("path")
const resultsPath = path.join(
  process.env.GITHUB_WORKSPACE,
  "lhci_reports",
  "manifest.json"
)
const results = JSON.parse(fs.readFileSync(resultsPath))
const totalReports = results.length

// best-practices은 문자열로 저장 ( Lighthouse 지표 )
const averageScores = {
  performance: 0,
  accessibility: 0,
  "best-practices": 0,
  seo: 0,
  pwa: 0,
}

// Lighthouse 상세 지표
const auditSummaries = {
  "first-contentful-paint": 0,
  "largest-contentful-paint": 0,
  interactive: 0,
  "total-blocking-time": 0,
  "cumulative-layout-shift": 0,
}

// 점수 평균
results.forEach((result) => {
  const { summary } = result
  for (const key in averageScores) {
    averageScores[key] += summary[key]
  }

  const details = JSON.parse(fs.readFileSync(result.jsonPath))
  ;[
    "first-contentful-paint",
    "largest-contentful-paint",
    "interactive",
    "total-blocking-time",
    "cumulative-layout-shift",
  ].forEach((auditName) => {
    if (details.audits[auditName]) {
      const auditDetails = details.audits[auditName]
      auditSummaries[auditName] += parseFloat(auditDetails.displayValue) || 0
    }
  })
})

// 점수에 따른 색상 표시
const formatScore = (res) => (res >= 90 ? "🟢" : res >= 70 ? "🟠" : "🔴")

// 상세 지표의 표준 점수에 따른 색상 표시
const detailscore = (value, metric) => {
  switch (metric) {
    case "first-contentful-paint":
      return value <= 1.8 ? "🟢" : value <= 3 ? "🟠" : "🔴"
    case "largest-contentful-paint":
      return value <= 2.5 ? "🟢" : value <= 4 ? "🟠" : "🔴"
    case "interactive":
      return value <= 3.8 ? "🟢" : value <= 7.3 ? "🟠" : "🔴"
    case "total-blocking-time":
      return value <= 300 ? "🟢" : value <= 600 ? "🟠" : "🔴"
    case "cumulative-layout-shift":
      return value <= 0.1 ? "🟢" : value <= 0.25 ? "🟠" : "🔴"
    default:
      return "🔴" // Default to red if metric is unknown
  }
}

let comments =
  "⚡️ Lighthouse Average Scores Across Reports:\n| Category | Score |\n| --- | --- |\n"
Object.keys(averageScores).forEach((key) => {
  const avgScore = Math.round((averageScores[key] / totalReports) * 100)
  comments += `| ${formatScore(avgScore)}  ${key.replace(/-/g, " ")} | ${avgScore} |\n`
})

comments +=
  "\n⚡️ Average Details Across All Reports:\n| Category | Score |\n| --- | --- |\n"
Object.keys(auditSummaries).forEach((auditName) => {
  const average = auditSummaries[auditName] / totalReports
  const formattedName = auditName.replace(/-/g, " ")
  const colorCode = detailscore(average, auditName)
  const unit =
    auditName === "total-blocking-time"
      ? "ms"
      : auditName === "cumulative-layout-shift"
        ? ""
        : "s"
  comments += `| ${colorCode}  ${formattedName} | ${average.toFixed(1)}${unit} |\n`
})

// PR 전송
if (comments && context.issue.number) {
  const issue_number = context.issue.number
  const repo = context.repo.repo
  const owner = context.repo.owner
  github.rest.issues.createComment({
    owner,
    repo,
    issue_number,
    body: comments,
  })
} else {
  console.log("No PR COMMENT!")
}
