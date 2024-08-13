import Link from "next/link"

import Button from "@/common/Button"
import Icon from "@/common/Icon"

export const NewAlbumButton = () => {
  return (
    <Link
      href="/album/create"
      aria-label="새 앨범 만들기"
      className="fixed bottom-[114px] left-[calc(100%/2-79px)]">
      <Button className="rounded-full">
        <div className="flex items-center gap-2 rounded-full bg-green-600 p-5 py-3 text-white">
          <span>새 앨범 만들기</span>
          <Icon name="widgetAddOutline" size={20} color="white" />
        </div>
      </Button>
    </Link>
  )
}
