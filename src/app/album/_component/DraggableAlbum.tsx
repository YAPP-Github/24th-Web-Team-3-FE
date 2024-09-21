"use client"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDrag, useDrop } from "react-dnd"

import AlbumItem from "@/common/AlbumItem"

import { usePatchAlbumMove } from "../hooks/useAlbum"
import { AlbumInfo } from "../types"

interface AlbumItemProps {
  album: AlbumInfo
  index: number
  moveAlbum: (dragIndex: number, hoverIndex: number) => void
}
const ItemType = "ALBUM"

const DraggableAlbum = ({ album, index, moveAlbum }: AlbumItemProps) => {
  const router = useRouter()
  const { patchAlbumMove } = usePatchAlbumMove()

  const [isSelected, setIsSelected] = useState("")

  const [{ isDragging }, ref] = useDrag({
    type: ItemType,
    item: { albumId: album.albumId, originalIndex: index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
    end: (item: { albumId: string; originalIndex: number }) => {
      patchAlbumMove({
        albumId: item.albumId,
        newDisplayIndex: item.originalIndex,
      })
    },
  })

  const [, drop] = useDrop({
    accept: ItemType,
    hover: (draggedItem: { albumId: string; originalIndex: number }) => {
      if (draggedItem.originalIndex !== index) {
        moveAlbum(draggedItem.originalIndex, index)
        draggedItem.originalIndex = index
      }
    },
  })

  const opacity = isDragging ? 0.5 : 1

  const dragDropRef = (node: HTMLDivElement | null) => {
    ref(node)
    drop(node)
  }

  const value = {
    ...album,
    photoCount: Number(album.photoCount),
    isNew: false,
    isSelected: album.albumId === isSelected,
    isEditable: false,
  }

  const onClick = () => {
    setIsSelected(album.albumId)
    router.push(`/album/${album.albumId}`)
  }

  return (
    <div
      ref={dragDropRef}
      onClick={onClick}
      style={{ opacity }}
      className="aspect-[164/150] w-[calc((100%-1rem)/2)] rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      <AlbumItem
        value={value}
        handleValue={() => null}
        className="h-full w-full"
      />
    </div>
  )
}

export default DraggableAlbum
