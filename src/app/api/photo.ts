import { myFetch } from "./myfetch"

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

type GetPhotosResponse = {
  photoId: string
  photoUrl: string
  albumId: string
}[]

export const getPhotos = async (
  albumId: string
): Promise<GetPhotosResponse> => {
  const data = await myFetch(`photo/v1/photos?albumId=${albumId}`, {
    method: "GET",
  })

  return data
}

type GetAlbumResponse = {
  albumId: string
  name: string
  type: "HEART" | "FIRE" | "BASKETBALL" | "BUILDING" | "STARFALL" | "SMILE_FACE"
  photoCount: string
}

export const getAlbum = async (albumId: string): Promise<GetAlbumResponse> => {
  const data = await myFetch(`/photo/v1/albums/${albumId}`, {
    method: "GET",
  })
  return data
}
