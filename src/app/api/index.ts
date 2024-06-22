import customFetch from "../_lib/customFetch"

const myFetch = customFetch({
  baseUrl: "",
  headers: {
    "Content-Type": "application/json",
    Authorization: "Bearer token",
  },
  interceptors: {
    // eslint-disable-next-line no-unused-vars
    request: async ([url, options], fetch) => {
      // 요청 인터셉터 로직 추가 (예: 로깅, 인증 토큰 추가)
      //   console.log("Request Interceptor:", url, options)
      return [url, options]
    },

    // eslint-disable-next-line no-unused-vars
    response: async (response, [url, options], fetch) => {
      // 응답 인터셉터 로직 추가 (예: 에러 처리, 응답 데이터 변환)
      //   console.log("Response Interceptor:", response, url, options, fetch)
      return response
    },
  },
})

export const getJsonplaceholder = async (url?: string) => {
  await new Promise((resolve) => setTimeout(resolve, 700))
  return myFetch(`https://jsonplaceholder.typicode.com/todos/${url ?? ""}`, {
    method: "GET",
  })
}

export const getCroll = () =>
  myFetch("http://haru6.mx2.co.kr/@HA021CH8jth", {
    method: "GET",
  })
