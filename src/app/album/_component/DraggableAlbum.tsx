"use client"
import { useQueryClient } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { useDrag } from "react-dnd"

import {
  deleteSharedMember,
  GetBulkAlbumResponse,
  ShareStatus,
  updateSharedMemberStatus,
} from "@/app/api/photo"
import AlbumItem from "@/common/AlbumItem"
import WaitingAlbumItem from "@/common/WaitingAlbumItem"

import { usePatchAlbumMove } from "../hooks/useAlbum"

interface AlbumItemProps {
  album: GetBulkAlbumResponse
  index: number
  moveAlbum: (dragIndex: number, hoverIndex: number) => void
}
const ItemType = "ALBUM"

const DraggableAlbum = ({ album, index }: AlbumItemProps) => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const { patchAlbumMove } = usePatchAlbumMove()
  const isDisplayable = !album.shareStatus || album.shareStatus != "REJECTED"
  const isShared = !album.shareStatus || album.shareStatus == "ACCEPTED"

  const [isSelected, setIsSelected] = useState("")

  const [{ isDragging }] = useDrag({
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

  // const [, drop] = useDrop({
  //   accept: ItemType,
  //   hover: (draggedItem: { albumId: string; originalIndex: number }) => {
  //     if (draggedItem.originalIndex !== index) {
  //       moveAlbum(draggedItem.originalIndex, index)
  //       draggedItem.originalIndex = index
  //     }
  //   },
  // })

  const opacity = isDragging ? 0.5 : 1

  const onTapAccept = () => {
    if (album.sharedMemberId) {
      updateSharedMemberStatus(album.sharedMemberId, ShareStatus.ACCEPTED).then(
        () => {
          queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
        }
      )
    }
  }

  const onTapReject = () => {
    if (album.sharedMemberId) {
      deleteSharedMember(album.sharedMemberId).then(() => {
        queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
      })
    }
  }

  const value = {
    ...album,
    photoCount: Number(album.photoCount),
    isNew: false,
    isSelected: album.albumId === isSelected,
    isEditable: false,
  }

  const onClick = () => {
    if (isDisplayable && isShared) {
      setIsSelected(album.albumId)
      router.push(`/album/${album.albumId}`)
    }
  }

  return (
    <div
      //ref={dragDropRef}
      onClick={onClick}
      style={{ opacity }}
      className="aspect-[164/150] w-[calc((100%-1rem)/2)] rounded-2xl transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg">
      {isDisplayable &&
        (isShared ? (
          <AlbumItem
            value={value}
            handleValue={() => null}
            className="h-full w-full"
          />
        ) : (
          <WaitingAlbumItem
            value={value}
            onAccept={onTapAccept}
            onReject={onTapReject}
            className="h-full w-full"
          />
        ))}
    </div>
  )
}

export default DraggableAlbum
