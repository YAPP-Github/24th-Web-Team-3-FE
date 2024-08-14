module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm run dev", // 서버 실행
      startServerReadyPattern: "ready on",
      url: ["http://localhost:3000"], // 실행할 주소
      numberOfRuns: 3, // 실행 횟수
      settings: {
        preset: "desktop",
        chromeFlags: ["--no-sandbox", "--ignore-certificate-errors"],
      },
    },
    upload: {
      target: "temporary-public-storage",
      outputDir: "./lhci_reports",
      reportFilenamePattern: "%%PATHNAME%%-%%DATETIME%%-report.%%EXTENSION%%",
    },
  },
}
