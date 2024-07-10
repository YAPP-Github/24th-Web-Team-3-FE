import Cookies from "js-cookie"

export const getAccessToken = () => Cookies.get("accessToken")

export const FOUR_CUT_BRAND = {
  PHOTOISM: "https://qr.seobuk.kr",
  DONTLXXKUP: "https://x.dontlxxkup.kr",
  HARUFILM: "http://haru6.mx2.co.kr",
}

// 객체의 value들을 정규표현식 패턴으로 결합
const urlPatterns = Object.values(FOUR_CUT_BRAND)
  .map((url) => url.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&") + ".*")
  .join("|")

// 입력된 문자열이 객체의 value에 포함되어 있는지 확인하는 함수
export const isUrlIncluded = (input: string) =>
  new RegExp(`^(${urlPatterns})$`).test(input)
