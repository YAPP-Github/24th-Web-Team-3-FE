import Cookies from "js-cookie"

export const getAccessToken = () => Cookies.get("accessToken")

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

// 객체의 value들을 정규표현식 패턴으로 변환
const urlPatterns = Object.values(FOUR_CUT_BRAND)
  .map((url) => url.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + ".*")
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
