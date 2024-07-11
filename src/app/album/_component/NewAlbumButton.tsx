import Link from "next/link"

import Icon from "@/common/Icon"

export const NewAlbumButton = () => {
  return (
    <Link
      href="/album/create"
      aria-label="새 앨범 만들기"
      className="absolute bottom-[114px] left-[calc(100%/2-79px)]">
      <div className="flex items-center gap-2 rounded-full bg-green-600 p-5 py-3 text-white">
        <span>새 앨범 만들기</span>
        <Icon name="widgetAddOutline" size={20} color="white" />
      </div>
    </Link>
  )
}