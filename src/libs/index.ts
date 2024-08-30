export const WEBVIEW_USER_AGENT = "MafooApp"
export const ANDROID_USER_AGENT = "android|Android"
export const IOS_USER_AGENT = "iPhone|iPad|iPod"

// 하루 필름인 경우는 지점별 도메인이 가변적
// HARUFILM: "http://haru{숫자}.mx{숫자}.co.kr",
export const FOUR_CUT_BRAND: Record<string, string> = {
  PHOTOISM: "https://qr.seobuk.kr",
  DONTLXXKUP: "https://x.dontlxxkup.kr",
  HARUFILM: "http://haru\\d+\\.mx\\d+\\.co\\.kr",
  MAFOO: "https://mafoo.kr",
  LIFE4CUT: "https://api.life4cut.net",
  MY_FOUR_CUT:
    "https://firebasestorage.googleapis.com:443/v0/b/my4ccu.appspot.com",
  PHOTOGRAY: "https://pgshort.aprd.io",
  MONOMANSION: "https://monomansion.net",
  PHOTO_SIGNATURE: "http://photoqr3.kr",
  PICDOT: "https://picdot.kr",
}

// HARUFILM 키를 제외하고 다른 URL들을 처리
const urlPatterns = Object.keys(FOUR_CUT_BRAND)
  .filter((key) => key !== "HARUFILM")
  .map(
    (key) =>
      FOUR_CUT_BRAND[key].replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + ".*"
  )
  .concat([FOUR_CUT_BRAND.HARUFILM]) // HARUFILM을 이스케이프 없이 추가
  .join("|")

export const isUrlIncluded = (input: string) =>
  new RegExp(`^(${urlPatterns})`).test(input)

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

const getUserAgent = () => {
  if (typeof window === "undefined") {
    return ""
  }
  return window.navigator.userAgent
}

export const isWebView = () => RegExp(WEBVIEW_USER_AGENT).test(getUserAgent())
export const isAndroid = () => RegExp(ANDROID_USER_AGENT).test(getUserAgent())
export const isIOS = () => RegExp(IOS_USER_AGENT).test(getUserAgent())
