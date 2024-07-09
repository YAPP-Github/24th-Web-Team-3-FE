export type AlbumType =
  | "HEART"
  | "FIRE"
  | "BASKETBALL"
  | "BUILDING"
  | "STARFALL"
  | "SMILE_FACE"

export interface AlbumValue {
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
