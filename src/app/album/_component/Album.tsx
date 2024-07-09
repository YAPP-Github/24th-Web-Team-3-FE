"use client"

import { useRouter } from "next/navigation"
import React from "react"

import AlbumItem from "@/common/AlbumItem"

import { AlbumInfo } from "../types"

interface AlbumProps extends React.HTMLAttributes<HTMLDivElement> {
  album: AlbumInfo
}

export const Album = ({ album }: AlbumProps) => {
  const router = useRouter()
  const value = {
    ...album,
    photoCount: Number(album.photoCount),
    isNew: false,
    isSelected: false,
    isEditable: false,
  }

  const onClick = () => {
    router.push(`/album/${album.albumId}`)
  }
  return (
    <div className="aspect-[164/150] w-[calc((100%-1rem)/2)]" onClick={onClick}>
      <AlbumItem
        value={value}
        handleValue={() => {}}
        className="h-full w-full"
      />
    </div>
  )
}
