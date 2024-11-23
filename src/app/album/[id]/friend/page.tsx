"use client"

import { Header } from "@/app/album/[id]/friend/_component/Header"
import SharedFriendElement from "@/app/album/[id]/friend/_component/SharedFriendElement"
import Icon from "@/common/Icon"

const SharedFriendPage = () => {
  return (
    <div className="relative h-dvh w-full bg-white">
      <Header friendCount={0} />
      <div className="flex flex-col gap-4 px-6 pb-6 pt-4">
        <div className="flex flex-row items-center gap-1 py-2">
          <span className="tp-body2-regular text-gray-500">앨범장</span>
          <Icon name="info" size={16} />
        </div>
        <SharedFriendElement
          imageUrl={"/images/favicon.png"}
          name={"Clover"}
          tag={"#1111"}
          isOwner={true}
          onTapShare={() => {}}
        />
      </div>
      <div className="h-4 w-full bg-gray-50" />
      <div className="flex flex-col gap-4 px-6 pb-6 pt-4">
        <SharedFriendElement
          imageUrl={"/images/favicon.png"}
          name={"Clover"}
          tag={"#1111"}
          isOwner={false}
          onTapShare={() => {}}
        />
      </div>
    </div>
  )
}

export default SharedFriendPage
