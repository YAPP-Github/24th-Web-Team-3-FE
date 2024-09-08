"use client"

import { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"

import { getAlbums } from "@/app/api/photo"

import { AlbumInfo } from "../types"
import DraggableAlbum from "./DraggableAlbum"

export const Albums = () => {
  const [albums, setAlbums] = useState<AlbumInfo[] | null>(null)

  useEffect(() => {
    const albumsInit = async () => {
      const albums = await getAlbums()

      setAlbums(() => albums)
    }
    albumsInit()
  }, [])

  const moveAlbum = (dragIndex: number, hoverIndex: number) => {
    if (!albums) return

    const updatedAlbums = [...albums]
    const [draggedAlbum] = updatedAlbums.splice(dragIndex, 1)
    updatedAlbums.splice(hoverIndex, 0, draggedAlbum)

    setAlbums(updatedAlbums)
  }

  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0
  }

  if (!albums) return <></>

  if (!albums.length)
    return (
      <div className="tp-caption1-extralight text-center text-gray-500">
        앨범이 없습니다
      </div>
    )

  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      <div className="flex w-full flex-wrap justify-between gap-y-4 p-6">
        {albums.map((album, i) => (
          <DraggableAlbum
            key={album.albumId}
            index={i}
            album={album}
            moveAlbum={moveAlbum}
          />
        ))}
      </div>
    </DndProvider>
  )
}
