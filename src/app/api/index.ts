import Cookies from "js-cookie"

import customFetch from "./customFetch"

export const myFetch = customFetch({
  baseUrl: "https://gateway.mafoo.kr/",
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${Cookies.get("accessToken")}`,
  },
  interceptors: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: async ([url, options], fetch) => {
      // 요청 인터셉터 로직 추가 (예: 로깅, 인증 토큰 추가)
      //   console.log("Request Interceptor:", url, options)
      return [url, options]
    },
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    response: async (response, [url, options], fetch) => {
      // 응답 인터셉터 로직 추가 (예: 에러 처리, 응답 데이터 변환)
      //   console.log("Response Interceptor:", response, url, options, fetch)
      return response
    },
  },
})

// test api
export const getJsonplaceholder = async (url?: string) => {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return await myFetch(
    `https://jsonplaceholder.typicode.com/todos/${url ?? ""}`,
    {
      method: "GET",
    }
  )
}

export const authLogin = async (code: string) =>
  await myFetch("/user/v1/auth/login/kakao", {
    method: "POST",
    body: JSON.stringify({ code }),
  })
export const postQrCode = async (qrUrl: string) => {
  const { data } = await myFetch("photo/v1/photos", {
    method: "POST",
    body: JSON.stringify({ qrUrl }),
  })

  return data
}
