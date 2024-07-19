"use client"

import { useGetAlbums } from "../create/hooks/useAlbum"
import { Album } from "./Album"

export const Albums = () => {
  const { albums } = useGetAlbums()

  if (!albums.length)
    return (
      <div className="text-center text-caption-1 font-light text-gray-500">
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
