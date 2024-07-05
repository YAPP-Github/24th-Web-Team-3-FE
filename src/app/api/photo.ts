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
    body: JSON.stringify({ qrUrl }),
  })

  return data
}
