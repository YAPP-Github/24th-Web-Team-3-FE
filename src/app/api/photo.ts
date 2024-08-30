import { AlbumInfo, AlbumType, PhotoInfo } from "../album/types"
import { myFetch } from "./myfetch"

export interface PostQrCodeResponse {
  photoId: string
  photoUrl: string
  albumId: string
  brand: string
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

type GetPhotosResponse = PhotoInfo[]

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

export const getAlbums = async (): Promise<GetAlbumResponse[]> => {
  const data = await myFetch(`/photo/v1/albums`, {
    method: "GET",
  })
  return data
}

export const postAlbum = async (
  name: string,
  type: AlbumType
): Promise<AlbumInfo> => {
  const data = await myFetch(`/photo/v1/albums`, {
    method: "POST",
    body: JSON.stringify({
      name,
      type,
    }),
  })
  return data
}

export const deleteAlbum = async (albumId: string): Promise<AlbumInfo> => {
  const data = await myFetch(`/photo/v1/albums/${albumId}`, {
    method: "DELETE",
  })
  return data
}

export const deletePhoto = async (photoId: string): Promise<null> => {
  await myFetch(`/photo/v1/photos/${photoId}`, {
    method: "DELETE",
  })
  return null
}

export const patchPhotoAlbum = async (
  photoId: string,
  albumId: string
): Promise<PostQrCodeResponse> => {
  const data = await myFetch(`/photo/v1/photos/${photoId}/album`, {
    method: "PATCH",
    body: JSON.stringify({
      albumId,
    }),
  })
  return data
}
