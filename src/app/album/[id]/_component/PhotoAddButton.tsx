"use client"

import Icon from "@/common/Icon"

export const PhotoAddButton = () => {
  const onClick = () => {
    // TODO: router를 이용한 페이지 라우팅
  }
  return (
    <button
      className="mb-[13px] flex aspect-square w-full items-center justify-center rounded-xl border border-gray-200 bg-gray-100"
      onClick={onClick}>
      <Icon name="galleryAddOutline" size={56} color="gray-300" />
    </button>
  )
}
