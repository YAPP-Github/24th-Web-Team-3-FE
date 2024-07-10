"use client"

import { useRouter } from "next/navigation"

import Icon from "@/common/Icon"

export const BottomBar = () => {
  const router = useRouter()

  const onMyAlbumClick = () => {
    router.push("/album")
  }
  const onProfileClick = () => {
    router.push("/profile")
  }

  return (
    <div className="absolute bottom-0 left-0 z-[1] flex w-full justify-between rounded-t-2xl bg-gray-900 px-[54px] pb-8 pt-5 text-gray-600">
      <button
        className="flex flex-col items-center gap-[2px]"
        onClick={onMyAlbumClick}>
        <Icon name="albumOutline" size={28} color="gray-600" />
        <span>내 앨범</span>
      </button>
      <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white">
        <Icon name="scannerOutline" size={28} color="green-600" />
      </div>
      <button
        className="flex flex-col items-center gap-[2px]"
        onClick={onProfileClick}>
        <Icon name="userCircleOutline" size={28} color="gray-600" />
        <span>마이</span>
      </button>
    </div>
  )
}
