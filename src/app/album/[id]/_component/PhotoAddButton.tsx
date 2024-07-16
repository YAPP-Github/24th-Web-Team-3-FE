"use client"

import { useRouter } from "next/navigation"

import Icon from "@/common/Icon"

interface PhotoAddButtonProps {
  albumId: string
}

export const PhotoAddButton = ({ albumId }: PhotoAddButtonProps) => {
  const router = useRouter()
  const onClick = () => {
    router.push(`/scanner?albumId=${albumId}`)
  }

  return (
    <button
      className="mb-[13px] flex h-[165px] w-[165px] items-center justify-center rounded-xl border border-gray-200 bg-gray-100"
      onClick={onClick}>
      <Icon name="galleryAddOutline" size={56} color="gray-300" />
    </button>
  )
}
