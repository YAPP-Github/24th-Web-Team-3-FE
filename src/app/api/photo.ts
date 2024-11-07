import { AlbumInfo, AlbumType, PhotoInfo } from "../album/types"
import { myFetch } from "./myfetch"

export interface PostQrCodeResponse {
  photoId: string
  photoUrl: string
  albumId: string
  brand: string
}

export interface GenerateRecapResponse {
  recapUrl: string
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

export interface GetAlbumResponse {
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

export const patchAlbumMove = async (
  albumId: string,
  newDisplayIndex: number
) => {
  const data = await myFetch(`/photo/v1/albums/${albumId}/display-index`, {
    method: "PATCH",
    body: JSON.stringify({
      newDisplayIndex,
    }),
  })
  return data
}

export const generatePreSignedUrls = async (
  fileNames: string[]
): Promise<{ urls: string[] }> => {
  const data = await myFetch(`/photo/v1/object-storage`, {
    method: "POST",
    body: JSON.stringify({
      fileNames: fileNames,
    }),
  })
  return data
}

export const uploadPhotosWithUrls = async (
  fileUrls: string[],
  albumId: string
): Promise<GetPhotosResponse> => {
  const data = await myFetch(`/photo/v1/photos/file-urls`, {
    method: "POST",
    body: JSON.stringify({
      fileUrls: fileUrls,
      albumId: albumId,
    }),
  })
  return data
}

export const updatePhotoAlbumBulk = async (
  albumId: string,
  photoIds: string[]
) => {
  const data = await myFetch(`/photo/v1/photos/bulk/album`, {
    method: "PATCH",
    body: JSON.stringify({
      albumId,
      photoIds,
    }),
  })
  return data
}

export const generateRecap = async (
  albumId: string
): Promise<GenerateRecapResponse> => {
  const data = await myFetch(`/photo/v1/recaps`, {
    method: "POST",
    body: JSON.stringify({
      albumId,
    }),
  })
  return data
}
