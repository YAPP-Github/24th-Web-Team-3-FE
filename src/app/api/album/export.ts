import { myFetch } from "../myfetch"

type AlbumType =
  | "HEART"
  | "FIRE"
  | "BASKETBALL"
  | "BUILDING"
  | "STARFALL"
  | "SMILE_FACE"

interface PhotoInfo {
  photoId: string
  photoUrl: string
  albumId: string
  brand: string
  createdAt?: string
}

interface MemberSearchResult {
  memberId: string
  name: string
  profileImageUrl: string
  serialNumber: string
  sharedMemberId: string
  shareStatus?: string
  permissionLevel: string
}

interface createExportResponse {
  exportId: string
  albumId: string
}

export const createExport = async (
  albumId: string
): Promise<createExportResponse> => {
  try {
    const response = await myFetch("photo/v1/exports", {
      method: "POST",
      body: JSON.stringify({ albumId }),
    })
    return response
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
  }
}

export const unlikeExport = async (exportId: string) => {
  try {
    const response = await myFetch(`photo/v1/exports/${exportId}/unlike`, {
      method: "POST",
    })
    return response
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
  }
}

export const likeExport = async (exportId: string) => {
  try {
    const response = await myFetch(`photo/v1/exports/${exportId}/like`, {
      method: "POST",
    })
    return response
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
  }
}

export interface ExportNoteType {
  type: AlbumType
  nickname: string
  content: string
}

interface createExportNoteResponse extends ExportNoteType {
  noteId: string
  exportId: string
}

export const getExportNote = async (
  exportId: string
): Promise<ExportNoteType[]> => {
  try {
    const response = await myFetch(`photo/v1/exports/${exportId}/notes`, {
      method: "GET",
    })
    return response
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
  }
}

export const createExportNote = async (
  exportId: string,
  note: ExportNoteType
): Promise<createExportNoteResponse> => {
  try {
    const response = await myFetch(`photo/v1/exports/${exportId}/notes`, {
      method: "POST",
      body: JSON.stringify(note),
    })
    return response
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
  }
}

export interface ExportAlbumType {
  exportId: string
  name: string
  type: AlbumType
  photoCount: number
  ownerMemberId: string
  ownerName: string
  ownerProfileImageUrl: string
  ownerSerialNumber: string
  likeCount: number
  noteCount: number
  viewCount: number
  isMeLiked: boolean
  sharedMembers: MemberSearchResult[]
}

export const getExportAlbumData = async (
  exportId: string
): Promise<ExportAlbumType> => {
  try {
    const response = await myFetch(`photo/v1/exports/${exportId}/album`, {
      method: "GET",
    })
    return response
  } catch (err: unknown) {
    console.log(err)
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
  }
}

export const getExportAlbumPhotos = async (
  exportId: string
): Promise<PhotoInfo[]> => {
  try {
    const response = await myFetch(
      `photo/v1/exports/${exportId}/album/photos`,
      {
        method: "GET",
      }
    )
    return response
  } catch (err: unknown) {
    if (typeof err === "object" && err !== null && "response" in err) {
      const errorWithResponse = err as { response?: { data?: any } }
      throw errorWithResponse.response?.data
    }
    throw new Error("Unknown error occurred")
  }
}
