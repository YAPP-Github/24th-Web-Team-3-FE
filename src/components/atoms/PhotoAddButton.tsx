"use client"
import { Icon } from "@/components"

export const PhotoAddButton = () => {
  const onClick = () => {
    // TODO: router를 이용한 페이지 라우팅
  }
  return (
    <button
      className="w-full aspect-square bg-gray-100 border border-gray-200 flex justify-center items-center rounded-xl mb-[13px]"
      onClick={onClick}>
      <Icon name="galleryAddOutline" size={56} color="gray-300" />
    </button>
  )
}
