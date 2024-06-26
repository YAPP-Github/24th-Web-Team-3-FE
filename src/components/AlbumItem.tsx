"use client"

import { cva, VariantProps } from "class-variance-authority"
import { ChangeEvent, useState } from "react"

import { Badge, ColorIcon } from "@/components"
import { cn } from "@/utils"

const albumItemVariants = cva("w-[164px] h-[150px] rounded-2xl relative p-4", {
  variants: {
    type: {
      red: "bg-red-200",
      yellow: "bg-butter-200",
      green: "bg-green-200",
      blue: "bg-blue-200",
      purple: "bg-purple-200",
      pink: "bg-pink-200",
    },

    isEditable: {
      true: "w-60 h-[219.51px] rounded-[23.41px]",
    },
  },
  defaultVariants: {
    type: "red",
  },
})

const photoCountVariants = cva("text-caption-1 font-medium", {
  variants: {
    type: {
      red: "text-red-500",
      yellow: "text-orange-600",
      green: "text-green-700",
      blue: "text-sky-blue-700",
      purple: "text-purple-600",
      pink: "text-pink-600",
    },
  },
  defaultVariants: {
    type: "red",
  },
})

interface albumValue {
  name: string
  type: "red" | "yellow" | "green" | "blue" | "purple" | "pink"
  photoCount: number
  isNew: boolean
  isSelected: boolean
  isEditable: boolean
}

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
    const name = e.target.value
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
      className={`${cn(albumItemVariants({ type, isEditable }), className)}`}>
      {!isEditable && (
        <>
          <h3 className="text-title-2 font-bold text-gray-800 ">{name}</h3>
          <div className={`${cn(photoCountVariants({ type }))}`}>
            사진 {photoCount}장
          </div>

          {isSelected && (
            <div className="w-full h-full rounded-2xl border-[3px] border-green-600 absolute top-0 left-0" />
          )}
          {isNew && (
            <Badge className="absolute -top-[10px] -left-2">New!</Badge>
          )}
        </>
      )}
      {isEditable && (
        <>
          <input
            className="w-full text-header-1 font-bold bg-gray-100 mix-blend-multiply rounded-lg py-1 pl-3 pr-4 outline-none caret-green-600"
            value={name}
            onChange={handleName}
            maxLength={8}
          />
          <div className="text-body-2 font-medium text-gray-500 mt-1 text-right">
            {name.length}/8자
          </div>
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
