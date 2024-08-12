module.exports = {
  ci: {
    collect: {
      staticDistDir: ".next", // 이 경로를 실제 빌드된 정적 파일이 위치한 경로로 변경하세요.
    },
    upload: {
      target: "temporary-public-storage", // CI 환경에서 결과를 임시로 저장
    },
  },
}
