"use client"

import { VariantProps } from "class-variance-authority"
import { useState } from "react"

import { AlbumValue } from "@/app/album/types"
import SquareButton from "@/common/SquareButton"
import { albumItemVariants, photoCountVariants } from "@/styles/variants"
import { cn } from "@/utils"

import Badge from "./Badge"

export interface WaitingAlbumItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof albumItemVariants> {
  value: AlbumValue
  onAccept?: (value: AlbumValue) => void
  onReject?: (value: AlbumValue) => void
}
/**
 *
 * @param value album 내부에서 사용되는 값들
 * @param handleValue album 내부에서 사용되는 값을 handle할 수 있는 값
 * @param className className을 추가하여 추가적인 스타일링도 가능합니다.
 */
function WaitingAlbumItem({
  value,
  onAccept,
  onReject,
  className,
  ...props
}: WaitingAlbumItemProps) {
  const {
    name: initialName,
    type,
    photoCount,
    isNew,
    isEditable,
    ownerProfileImageUrl,
  } = value

  const [name] = useState(initialName)

  return (
    <div
      {...props}
      className={cn(
        albumItemVariants({ type, isEditable }),
        !isEditable && "group",
        "flex flex-col justify-between",
        className
      )}>
      <div>
        <div className="flex flex-row justify-between">
          <div className="flex flex-col">
            <h3 className="tp-title2-semibold text-gray-800">{name}</h3>
            <div className={`${cn(photoCountVariants({ type }))}`}>
              사진 {photoCount}장
            </div>
          </div>
          <img
            crossOrigin="anonymous"
            src={ownerProfileImageUrl}
            className="h-[36px] w-[36px] rounded-[50%]"
            width="36px"
            height="36px"
            alt="friend"
          />
        </div>

        {/*<div*/}
        {/*  className={`absolute left-0 top-0 h-full w-full rounded-2xl border-[3px] border-green-600 opacity-0 ${isSelected && "opacity-100"}`}*/}
        {/*/>*/}

        {isNew && <Badge className="absolute -left-2 -top-[10px]">New!</Badge>}
      </div>
      <div className="flex flex-row justify-between gap-2">
        <SquareButton
          onClick={(e) => {
            e.stopPropagation()
            onReject?.call(globalThis, value)
          }}
          className="tp-body2-semibold round-[10px] h-10 grow bg-white px-5 py-0 text-gray-600">
          거절
        </SquareButton>
        <SquareButton
          onClick={(e) => {
            e.stopPropagation()
            onAccept?.call(globalThis, value)
          }}
          className="tp-body2-semibold round-[10px] h-10 grow bg-purple-600 px-5 py-0 text-white">
          수락
        </SquareButton>
      </div>
    </div>
  )
}

export default WaitingAlbumItem
