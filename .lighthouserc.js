module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm run dev", // 서버 실행
      startServerReadyPattern: "ready on",
      startServerReadyTimeout: 20000, // 20초로 설정
      url: ["http://localhost:3000"], // 실행할 주소
      numberOfRuns: 3, // 실행 횟수
      settings: {
        preset: "desktop",
        chromeFlags: ["--no-sandbox", "--ignore-certificate-errors"],
      },
    },
    upload: {
      target: "filesystem",
      outputDir: "./lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%",
    },
    assert: {
      // 점수 기준 정리
      assertions: {
        "categories:performance": ["warn", { minScore: 0.8 }],
        "categories:accessibility": ["warn", { minScore: 0.8 }],
        "categories:best-practices": ["warn", { minScore: 0.8 }],
        "categories:seo": ["warn", { minScore: 0.8 }],
      },
    },
  },
}
