module.exports = {
  ci: {
    collect: {
      staticDistDir: ".next", // 이 경로를 실제 빌드된 정적 파일이 위치한 경로로 변경하세요.
    },
    upload: {
      target: "lhci-github", // GitHub PR의 코멘트로만 결과를 남깁니다.
    },
  },
}
