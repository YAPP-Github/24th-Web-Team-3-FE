"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

import { patchPhotoAlbum, postAlbum } from "@/app/api/photo"
import AlbumItem from "@/common/AlbumItem"
import Button from "@/common/Button"
import { getQueryClient } from "@/common/QueryProviders"

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
  const searchParams = useSearchParams()
  const photoId = searchParams.get("photoId")
  const queryClient = getQueryClient()

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
    const { albumId } = await postAlbum(name, type)
    queryClient.invalidateQueries({ queryKey: ["getAlbums"] })

    if (photoId) {
      await patchPhotoAlbum(photoId, albumId)
    }
    router.push(`/album/${albumId}`)
  }

  return (
    <>
      <div className="flex w-full justify-center pt-6">
        <AlbumItem value={value} handleValue={handleValue} />
      </div>
      <div className="fixed bottom-0 flex w-full max-w-[430px] flex-col items-center">
        <AlbumTypeSelectTab type={type} handleType={handleType} />
        <Button
          className="mb-11 mt-3 w-[calc(100%-3rem)]"
          onClick={handleSubmit}
          disabled={!value.name.length}>
          다음으로
        </Button>
      </div>
    </>
  )
}
