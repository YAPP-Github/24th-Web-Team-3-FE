"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"

import { usePatchPhotoAlbum } from "@/app/scanner/hooks/usePhoto"
import AlbumItem from "@/common/AlbumItem"
import Button from "@/common/Button"
import Loading from "@/common/Loading"

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
  const { patchPhotoAlbum } = usePatchPhotoAlbum()
  const { albumInfo, postAlbum, isPending } = usePostAlbum()
  const [value, setValue] = useState(albumValueInit)
  const router = useRouter()
  const searchParams = useSearchParams()
  const photoId = searchParams.get("photoId")

  const handleType = (type: AlbumType) => {
    setValue((prev) => ({
      ...prev,
      type,
    }))
  }

  const handleValue = (v: AlbumValue) => {
    setValue(v)
  }

  const handleSubmit = async () => {
    const { name, type } = value
    postAlbum({ name, type })
  }

  useEffect(() => {
    if (!albumInfo || !photoId) return

    const { albumId } = albumInfo

    patchPhotoAlbum({ photoId, albumId })

    router.push(`/album/${albumId}`)
  }, [albumInfo, patchPhotoAlbum, photoId, router])

  return (
    <>
      {isPending && <Loading />}

      <div className="flex w-full justify-center pt-6">
        <AlbumItem value={value} handleValue={handleValue} />
      </div>
      <div className="fixed bottom-0 flex w-full max-w-[430px] flex-col items-center">
        <AlbumTypeSelectTab type={value.type} handleType={handleType} />
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
