import { getAccessToken } from "@/libs/cookie"

import { myFetch } from "./index"

export interface PostQrCodeResponse {
  photoId: string
  photoUrl: string
  albumId: string
}

export const postQrCode = async (
  qrUrl: string
): Promise<PostQrCodeResponse> => {
  const data = await myFetch("photo/v1/photos", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${getAccessToken()}`,
    },
    body: JSON.stringify({ qrUrl }),
  })

  return data
}
