"use client"

import { useEffect, useState } from "react"
import { DndProvider } from "react-dnd"
import { HTML5Backend } from "react-dnd-html5-backend"
import { TouchBackend } from "react-dnd-touch-backend"

import { GetAlbumResponse } from "@/app/api/photo"
import { useGetAlbums } from "@/app/scanner/hooks/usePhoto"
import Loading from "@/common/Loading"

import DraggableAlbum from "./DraggableAlbum"

export const Albums = () => {
  const { albums } = useGetAlbums()
  const [albumList, setAlbumList] = useState<GetAlbumResponse[]>()

  useEffect(() => {
    setAlbumList(albums)
  }, [albums])

  const moveAlbum = (dragIndex: number, hoverIndex: number) => {
    setAlbumList((prevAlbumList) => {
      if (!prevAlbumList) return prevAlbumList

      const updatedAlbums = [...prevAlbumList]
      const [draggedAlbum] = updatedAlbums.splice(dragIndex, 1)
      updatedAlbums.splice(hoverIndex, 0, draggedAlbum)

      return updatedAlbums
    })
  }

  const isTouchDevice = () => {
    return "ontouchstart" in window || navigator.maxTouchPoints > 0
  }

  if (!albumList) return <Loading />

  if (!albumList.length)
    return (
      <div className="tp-caption1-extralight text-center text-gray-500">
        앨범이 없습니다
      </div>
    )

  return (
    <DndProvider backend={isTouchDevice() ? TouchBackend : HTML5Backend}>
      <div className="flex w-full flex-wrap justify-between gap-y-4 p-6">
        {albumList.map((album, i) => (
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
