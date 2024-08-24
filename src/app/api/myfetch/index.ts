import { useAuthStore } from "@/store/auth"

import customFetch from "./customFetch"

export const myFetch = customFetch({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
  credentials: "include",
  interceptors: {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: async ([url, options], fetch) => {
      // 요청 인터셉터 로직 추가 (예: 로깅, 인증 토큰 추가)
      //   console.log("Request Interceptor:", url, options)

      const { accessToken } = useAuthStore.getState()

      if (accessToken && options) {
        const headers = new Headers(options.headers || {})

        if (headers.get("Authorization") === "null") {
          return [url, options]
        }

        headers.set("Authorization", `Bearer ${accessToken}`)
        options.headers = headers
      }
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
