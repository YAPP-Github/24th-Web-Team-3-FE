export type AlbumType =
  | "HEART"
  | "FIRE"
  | "BASKETBALL"
  | "BUILDING"
  | "STARFALL"
  | "SMILE_FACE"

export interface AlbumValue {
  albumId?: string
  name: string
  type: AlbumType
  photoCount: number
  isNew: boolean
  isSelected: boolean
  isEditable: boolean
  shareStatus?: string
  permissionLevel?: string
  ownerMemberId?: string
  ownerName?: string
  ownerProfileImageUrl?: string
}

export interface PhotoInfo {
  photoId: string
  photoUrl: string
  albumId: string
  brand: string
  createdAt: string
}

export interface AlbumInfo {
  albumId: string
  name: string
  type: AlbumType
  photoCount: string
}
