"use client"

import { cva, VariantProps } from "class-variance-authority"
import { ChangeEvent, useState } from "react"

import { Badge, ColorIcon } from "@/components"
import type { albumValue } from "@/types"
import { cn } from "@/utils"

const albumItemVariants = cva("w-[164px] h-[150px] rounded-2xl relative p-4", {
  variants: {
    type: {
      HEART: "bg-red-200",
      FIRE: "bg-butter-200",
      BASKETBALL: "bg-green-200",
      BUILDING: "bg-blue-200",
      STARFALL: "bg-purple-200",
      SMILE_FACE: "bg-pink-200",
    },

    isEditable: {
      true: "w-60 h-[219.51px] rounded-[23.41px]",
    },
  },
  defaultVariants: {
    type: "HEART",
  },
})

const photoCountVariants = cva("text-caption-1 font-medium", {
  variants: {
    type: {
      HEART: "text-red-500",
      FIRE: "text-orange-600",
      BASKETBALL: "text-green-700",
      BUILDING: "text-sky-blue-700",
      STARFALL: "text-purple-600",
      SMILE_FACE: "text-pink-600",
    },
  },
  defaultVariants: {
    type: "HEART",
  },
})

export interface AlbumItemProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof albumItemVariants> {
  value: albumValue
  handleValue: (v: albumValue) => void
}

/**
 *
 * @param value album 내부에서 사용되는 값들
 * @param handleValue album 내부에서 사용되는 값을 handle할 수 있는 값
 * @param className className을 추가하여 추가적인 스타일링도 가능합니다.
 */
function AlbumItem({ value, handleValue, ...props }: AlbumItemProps) {
  const {
    name: initialName,
    type,
    photoCount,
    isNew,
    isSelected,
    isEditable,
  } = value
  const { className } = props

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
      className={`${cn(albumItemVariants({ type, isEditable }), className)}`}
      {...props}>
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

export { AlbumItem }
