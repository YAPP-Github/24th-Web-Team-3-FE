import { myFetch } from "./myfetch"

interface AuthLoginResponse {
  accessToken: string
  refreshToken: string
}

export interface GetMyProfileResponse {
  memberId: string
  name: string
  profileImageUrl: string
}

export const authLogin = async (
  accessToken: string
): Promise<AuthLoginResponse> => {
  const data = await myFetch("user/v1/auth/login/kakao", {
    method: "POST",
    body: JSON.stringify({ accessToken }),
  })

  return data
}

export const getMyProfile = async (): Promise<GetMyProfileResponse> => {
  const data = await myFetch("user/v1/me", {
    method: "GET",
  })

  return data
}
