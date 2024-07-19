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
}

export interface PhotoInfo {
  photoId: string
  photoUrl: string
  albumId: string
}

export interface AlbumInfo {
  albumId: string
  name: string
  type: AlbumType
  photoCount: string
}
