"use client"

import { useEffect, useState } from "react"

import { getAlbums } from "@/app/api/photo"

import { AlbumInfo } from "../types"
import { Album } from "./Album"

export const Albums = () => {
  const [albums, setAlbums] = useState<AlbumInfo[] | null>(null)

  useEffect(() => {
    const albumsInit = async () => {
      const albums = await getAlbums()

      setAlbums(() => albums)
    }
    albumsInit()
  }, [])

  if (!albums) return <></>

  if (!albums.length)
    return (
      <div className="tp-caption1-extralight text-center text-gray-500">
        앨범이 없습니다
      </div>
    )
  return (
    <div className="flex w-full flex-wrap justify-between gap-y-4 p-6">
      {albums.map((album, i) => (
        <Album key={i} album={album} />
      ))}
    </div>
  )
}
