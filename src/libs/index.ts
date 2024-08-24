// 하루 필름인 경우는 지점별 도메인이 가변적
// HARUFILM: "http://haru{숫자}.mx{숫자}.co.kr",

export const FOUR_CUT_BRAND = {
  PHOTOISM: "https://qr.seobuk.kr",
  DONTLXXKUP: "https://x.dontlxxkup.kr",
  HARUFILM: "http://haru\\d+\\.mx\\d+\\.co\\.kr",
  MAFOO: "https://mafoo.kr",
  LIFE4CUT: "https://api.life4cut.net",
  MY_FOUR_CUT:
    "https://firebasestorage.googleapis.com:443/v0/b/my4ccu.appspotcom",
  PHOTOGRAY: "https://pgshort.aprd.io",
  MONOMANSION: "https://monomansion.net",
  PHOTO_SIGNATURE: "http://photoqr3.kr",
  PICDOT: "https://picdot.kr",
}

// 정규식을 변환할 때 백슬래시 이스케이프 문제를 해결하고,
// 각 URL에 대해 개별적으로 전체 매칭이 되도록 ^와 $를 추가
const urlPatterns = Object.values(FOUR_CUT_BRAND)
  .map((url) => {
    // HARUFILM과 같은 정규식 패턴을 포함한 URL 처리
    if (url.includes("\\d")) {
      return url.replace(/\\\\/g, "\\") // HARUFILM과 같이 이미 이스케이프된 정규식을 복원
    } else {
      return url.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") // 다른 URL은 이스케이프 처리
    }
  })
  .map((url) => `^${url}.*$`) // 각 URL에 대해 시작과 끝에 ^, $ 추가
  .join("|")

export const isUrlIncluded = (input: string) =>
  new RegExp(`^(${urlPatterns})$`).test(input)

// 외부 링크 확인 정규 표현식
export const isExternalLink = (url: string) => {
  const externalLinkRegex = /^https?:\/\//
  return externalLinkRegex.test(url)
}

// 내부 링크 확인 정규 표현식
export const isInternalLink = (url: string) => {
  const internalLinkRegex = /^\//
  return internalLinkRegex.test(url)
}
