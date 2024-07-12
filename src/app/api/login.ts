import { myFetch } from "./myfetch"

interface AuthLoginResponse {
  accessToken: string
  refreshToken: string
}

export interface GetMyProfileResponse {
  memberId: string
  name: string
}

export const authLogin = async (code: string): Promise<AuthLoginResponse> => {
  const data = await myFetch("user/v1/auth/login/kakao", {
    method: "POST",
    body: JSON.stringify({ code }),
  })

  return data
}

export const getMyProfile = async (): Promise<GetMyProfileResponse> => {
  const data = await myFetch("user/v1/me", {
    method: "GET",
  })

  return data
}
