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
      <div className="flex w-full justify-center pt-6">
        <AlbumItem value={value} handleValue={handleValue} />
      </div>
      <div className="absolute bottom-0 flex w-full flex-col items-center">
        <AlbumTypeSelectTab type={type} handleType={handleType} />
        <Button
          className="mb-11 mt-3 w-[calc(100%-3rem)]"
          onClick={handleSubmit}>
          다음으로
        </Button>
      </div>
    </>
  )
}

function AlbumTypeSelectTab({ type, handleType }: AlbumTypeSelectTabProps) {
  const colors = [
    "HEART",
    "FIRE",
    "BASKETBALL",
    "BUILDING",
    "STARFALL",
    "SMILE_FACE",
  ] as const

  return (
    <div className="flex h-20 w-full items-center justify-between px-8 py-4">
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
  type: "HEART",
  photoCount: 0,
  isNew: false,
  isSelected: false,
  isEditable: true,
}
