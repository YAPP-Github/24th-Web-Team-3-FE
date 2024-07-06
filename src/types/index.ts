export type iconTypes =
  | "basketballBold"
  | "buildingsBold"
  | "emojiFunnyCircleBold"
  | "fireBold"
  | "heartAngleBold"
  | "starFallMinimalisticBold"
  | "altArrowLeftOutline"
  | "galleryAddOutline"

export type albumType = "red" | "yellow" | "green" | "blue" | "purple" | "pink"

export interface albumValue {
  name: string
  type: albumType
  photoCount: number
  isNew: boolean
  isSelected: boolean
  isEditable: boolean
}
