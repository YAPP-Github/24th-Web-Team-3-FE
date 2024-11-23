import { AlbumInfo, AlbumType, PhotoInfo } from "../album/types"
import { myFetch } from "./myfetch"

export enum PermissionLevel {
  FULL_ACCESS = "FULL_ACCESS",
}

export enum ShareStatus {
  ACCEPTED = "ACCEPTED",
  PENDING = "PENDING",
  REJECTED = "REJECTED",
}

export interface PostQrCodeResponse {
  photoId: string
  photoUrl: string
  albumId: string
  brand: string
}

export interface GenerateRecapResponse {
  recapUrl: string
}

export interface SharedMember {
  sharedMemberId: string
  memberId: string
  albumId: string
  permissionLevel: string
  shareStatus: string
  name: string
  profileImageUrl: string
  serialNumber: string
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

export interface GetBulkAlbumResponse {
  albumId: string
  name: string
  type: "HEART" | "FIRE" | "BASKETBALL" | "BUILDING" | "STARFALL" | "SMILE_FACE"
  photoCount: string
  shareStatus?: string
  permissionLevel?: string
  ownerMemberId?: string
  ownerName?: string
  ownerProfileImageUrl?: string
  sharedMembers?: SharedMember[]
  sharedMemberId?: string
}

export interface GetAlbumResponse {
  albumId: string
  name: string
  type: "HEART" | "FIRE" | "BASKETBALL" | "BUILDING" | "STARFALL" | "SMILE_FACE"
  photoCount: string
  shareStatus?: string
}

export interface GetSharedAlbumResponse {
  albumId: string
  name: string
  type: "HEART" | "FIRE" | "BASKETBALL" | "BUILDING" | "STARFALL" | "SMILE_FACE"
  photoCount: string
  shareStatus?: string
  sharedMembers?: SharedMember[]
}

export const getAlbum = async (albumId: string): Promise<GetAlbumResponse> => {
  const data = await myFetch(`/photo/v1/albums/${albumId}`, {
    method: "GET",
  })
  return data
}

export const getAlbums = async (): Promise<GetBulkAlbumResponse[]> => {
  const data = await myFetch(`/photo/v1/albums`, {
    method: "GET",
  })
  return data
}

export const getSharedAlbum = async (
  albumId: string
): Promise<GetSharedAlbumResponse> => {
  const data = await myFetch(`/photo/v1/shared-albums/${albumId}`, {
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

export const createSharedMember = async (
  albumId: string,
  memberId: string,
  permissionLevel: PermissionLevel
) => {
  await myFetch(`/photo/v1/shared-members`, {
    method: "POST",
    body: JSON.stringify({
      albumId,
      memberId,
      permissionLevel,
    }),
  })
}

export const deleteSharedMember = async (sharedMemberId: string) => {
  await myFetch(`/photo/v1/shared-members/${sharedMemberId}`, {
    method: "DELETE",
  })
}

export const updateSharedMemberStatus = async (
  sharedMemberId: string,
  shareStatus: ShareStatus
) => {
  await myFetch(`/photo/v1/shared-members/${sharedMemberId}/status`, {
    method: "PATCH",
    body: JSON.stringify({
      shareStatus,
    }),
  })
}
