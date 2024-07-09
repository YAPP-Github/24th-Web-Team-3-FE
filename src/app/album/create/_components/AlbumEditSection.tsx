"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import AlbumItem from "@/common/AlbumItem"
import Button from "@/common/Button"

import { AlbumType, AlbumValue } from "../../types"
import AlbumTypeSelectTab from "./AlbumTypeSelectTab"

interface AlbumCreateSectionProps extends React.HTMLAttributes<HTMLDivElement> {
  albumValue?: AlbumValue
}

const DEFAULT_ALBUM_VALUE: AlbumValue = {
  name: "",
  type: "HEART",
  photoCount: 0,
  isNew: false,
  isSelected: false,
  isEditable: true,
}

export function AlbumEditSection({
  albumValue: albumValueInit = DEFAULT_ALBUM_VALUE,
}: AlbumCreateSectionProps) {
  const [value, setValue] = useState(albumValueInit)
  const { type } = value
  const router = useRouter()

  const handleType = (type: AlbumType) => {
    const nextValue = {
      ...value,
      type,
    }
    setValue(() => nextValue)
  }

  const handleValue = (v: AlbumValue) => {
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
