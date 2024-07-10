import ColorIcon from "@/common/ColorIcon"

import { AlbumType } from "../../types"

interface AlbumTypeSelectTabProps {
  type: AlbumType
  handleType: (type: AlbumType) => void
}

const colors = [
  "HEART",
  "FIRE",
  "BASKETBALL",
  "BUILDING",
  "STARFALL",
  "SMILE_FACE",
] as const

function AlbumTypeSelectTab({ type, handleType }: AlbumTypeSelectTabProps) {
  return (
    <div className="flex h-20 w-full items-center justify-between px-8 py-4">
      {colors.map((color) => {
        return (
          <ColorIcon
            key={color}
            iconColor={color}
            size={color === type ? "large" : "medium"}
            className={color !== type ? "opacity-30" : ""}
            onClick={() => handleType(color)}
          />
        )
      })}
    </div>
  )
}

export default AlbumTypeSelectTab
