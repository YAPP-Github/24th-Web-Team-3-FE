import { myFetch } from "."

export const authLogin = async (code: string) =>
  await myFetch("user/v1/auth/login/kakao", {
    method: "POST",
    body: JSON.stringify({ code }),
  })
