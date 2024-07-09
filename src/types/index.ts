export type iconTypes =
  | "basketballBold"
  | "buildingsBold"
  | "emojiFunnyCircleBold"
  | "fireBold"
  | "heartAngleBold"
  | "starFallMinimalisticBold"
  | "altArrowLeftOutline"
  | "galleryAddOutline"
  | "kakaoLogo"

export type albumType =
  | "HEART"
  | "FIRE"
  | "BASKETBALL"
  | "BUILDING"
  | "STARFALL"
  | "SMILE_FACE"

export interface albumValue {
  name: string
  type: albumType
  photoCount: number
  isNew: boolean
  isSelected: boolean
  isEditable: boolean
}

export interface album {
  albumId: string
  name: string
  type: albumType
  photoCount: string
}
