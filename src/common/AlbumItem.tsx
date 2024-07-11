"use client"

import { VariantProps } from "class-variance-authority"
import { ChangeEvent, useState } from "react"

import { AlbumValue } from "@/app/album/types"
import { albumItemVariants, photoCountVariants } from "@/styles/variants"
import { cn } from "@/utils"

import Badge from "./Badge"
import ColorIcon from "./ColorIcon"

export interface AlbumItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof albumItemVariants> {
  value: AlbumValue
  handleValue: (v: AlbumValue) => void
}

/**
 *
 * @param value album 내부에서 사용되는 값들
 * @param handleValue album 내부에서 사용되는 값을 handle할 수 있는 값
 * @param className className을 추가하여 추가적인 스타일링도 가능합니다.
 */
function AlbumItem({
  value,
  handleValue,
  className,
  ...props
}: AlbumItemProps) {
  const {
    name: initialName,
    type,
    photoCount,
    isNew,
    isSelected,
    isEditable,
  } = value

  const [name, setName] = useState(initialName)

  const handleName = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value.slice(0, 8)
    setName(() => name)

    const nextValue = {
      ...value,
      name,
    }
    handleValue(nextValue)
  }

  return (
    <div
      {...props}
      className={cn(albumItemVariants({ type, isEditable }), className)}>
      {isEditable ? (
        <>
          <input
            className="w-full rounded-lg bg-gray-100 py-1 pl-3 pr-4 text-header-1 font-bold caret-green-600 mix-blend-multiply outline-none"
            value={name}
            onChange={handleName}
            maxLength={8}
            placeholder="새 앨범"
          />
          <div className="mt-1 text-right text-body-2 font-medium text-gray-500">
            {name.length}/8자
          </div>
        </>
      ) : (
        <>
          <h3 className="text-title-2 font-bold text-gray-800">{name}</h3>
          <div className={`${cn(photoCountVariants({ type }))}`}>
            사진 {photoCount}장
          </div>

          {isSelected && (
            <div className="absolute left-0 top-0 h-full w-full rounded-2xl border-[3px] border-green-600" />
          )}
          {isNew && (
            <Badge className="absolute -left-2 -top-[10px]">New!</Badge>
          )}
        </>
      )}
      <ColorIcon
        iconColor={type}
        className="absolute bottom-4 right-4"
        size={isEditable ? "large" : "medium"}
      />
    </div>
  )
}

export default AlbumItem