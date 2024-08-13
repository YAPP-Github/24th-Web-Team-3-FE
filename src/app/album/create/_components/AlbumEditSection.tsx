"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"

import AlbumItem from "@/common/AlbumItem"
import SquareButton from "@/common/SquareButton"

import { AlbumType, AlbumValue } from "../../types"
import { usePostAlbum } from "../hooks/useAlbum"
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
  const searchParams = useSearchParams()
  const photoId = searchParams.get("photoId")
  const { postAlbum } = usePostAlbum()

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

  const handleSubmit = async () => {
    const { name, type } = value
    postAlbum({ name, type, photoId })
  }

  return (
    <>
      <div className="flex w-full justify-center pt-6">
        <AlbumItem value={value} handleValue={handleValue} />
      </div>
      <div className="fixed bottom-0 flex w-full max-w-[430px] flex-col items-center">
        <AlbumTypeSelectTab type={type} handleType={handleType} />
        <SquareButton
          className="mb-11 mt-3 w-[calc(100%-3rem)]"
          onClick={handleSubmit}
          disabled={!value.name.length}>
          다음으로
        </SquareButton>
      </div>
    </>
  )
}
