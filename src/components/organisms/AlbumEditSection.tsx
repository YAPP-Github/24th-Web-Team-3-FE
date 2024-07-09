"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import { AlbumItem, Button, ColorIcon } from "@/components"
import type { albumType, albumValue } from "@/types"

export function AlbumEditSection({
  albumValue: albumValueInit = DEFAULT_ALBUM_VALUE,
}: AlbumCreateSectionProps) {
  const [value, setValue] = useState(albumValueInit)
  const { type } = value
  const router = useRouter()

  const handleType = (type: albumType) => {
    const nextValue = {
      ...value,
      type,
    }
    setValue(() => nextValue)
  }

  const handleValue = (v: albumValue) => {
    setValue(() => v)
  }

  const handleSubmit = () => {
    router.push(`/album/${process.env.NEXT_PUBLIC_TEST_ALBUM_ID}`)
    // TODO : Album 생성 API 적용
    // TODO : Album 상세 페이지로의 이동 구현
  }

  return (
    <>
      <div className="w-full flex justify-center pt-6">
        <AlbumItem value={value} handleValue={handleValue} />
      </div>
      <div className="w-full flex flex-col items-center absolute bottom-0">
        <AlbumTypeSelectTab type={type} handleType={handleType} />
        <Button
          className="w-[calc(100%-3rem)] mt-3 mb-11"
          onClick={handleSubmit}>
          다음으로
        </Button>
      </div>
    </>
  )
}

function AlbumTypeSelectTab({ type, handleType }: AlbumTypeSelectTabProps) {
  const colors = ["red", "yellow", "green", "blue", "purple", "pink"] as const

  return (
    <div className="w-full h-20 py-4 px-8 flex justify-between items-center">
      {colors.map((color) => (
        <ColorIcon
          key={color}
          iconColor={color}
          size={color === type ? "large" : "medium"}
          className={color !== type ? "opacity-30" : ""}
          onClick={() => handleType(color)}
        />
      ))}
    </div>
  )
}

interface AlbumCreateSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  albumValue?: albumValue
}

interface AlbumTypeSelectTabProps {
  type: albumType
  handleType: (type: albumType) => void
}

const DEFAULT_ALBUM_VALUE: albumValue = {
  name: "",
  type: "red",
  photoCount: 0,
  isNew: false,
  isSelected: false,
  isEditable: true,
}
