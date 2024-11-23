"use client"

import { useEffect, useState } from "react"

import { FriendMenuDialog } from "@/app/album/[id]/friend/_component/FriendMenuDialog"
import { Header } from "@/app/album/[id]/friend/_component/Header"
import SharedFriendElement from "@/app/album/[id]/friend/_component/SharedFriendElement"
import {
  deleteSharedMember,
  getAlbum,
  GetSharedAlbumResponse,
  SharedMember,
} from "@/app/api/photo"
import { useGetProfile } from "@/app/profile/hooks/useProfile"
import Icon from "@/common/Icon"

const SharedFriendPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const [albumInfo, setAlbumInfo] = useState<GetSharedAlbumResponse>()
  const profile = useGetProfile()
  const [isEditDialogVisible, setIsEditDialogVisible] = useState(false)
  const [selectedMember, setSelectedMember] = useState<SharedMember>()
  const initAlbum = async () => {
    const data = await getAlbum(id)
    if (data) {
      setAlbumInfo(data)
    }
  }
  useEffect(() => {
    initAlbum()
  }, [id])

  const onTapKickFriend = () => {
    if (selectedMember) {
      deleteSharedMember(selectedMember.sharedMemberId).then(() => initAlbum())
    }
  }

  const onTapEditPermission = () => {}

  if (!albumInfo) return
  const isOwner = (albumInfo.ownerMemberId || "") == profile?.profile?.memberId

  const sharedMembers = albumInfo.sharedMembers || []

  return (
    <div className="relative h-dvh w-full bg-white">
      <Header friendCount={sharedMembers.length} />
      <div className="flex flex-col gap-4 px-6 pb-6 pt-4">
        <div className="flex flex-row items-center gap-1 py-2">
          <span className="tp-body2-regular text-gray-500">앨범장</span>
          <Icon name="info" size={16} />
        </div>
        <SharedFriendElement
          imageUrl={albumInfo.ownerProfileImageUrl ?? ""}
          name={albumInfo.ownerName ?? ""}
          tag={`#${albumInfo.ownerSerialNumber ?? ""}`}
          isOwner={true}
          isManageVisible={false}
          onTapShare={() => {}}
        />
      </div>
      <div className="h-4 w-full bg-gray-50" />
      <div className="flex flex-col gap-4 px-6 pb-6 pt-4">
        {sharedMembers.map((member) => (
          <SharedFriendElement
            key={member.memberId}
            imageUrl={member.profileImageUrl}
            name={member.name}
            tag={`#${member.serialNumber}`}
            isOwner={false}
            isManageVisible={isOwner}
            onTapShare={() => {
              setSelectedMember(member)
              setIsEditDialogVisible(true)
            }}
          />
        ))}
      </div>
      <FriendMenuDialog
        isVisible={isEditDialogVisible}
        onTapBackdrop={() => {
          setIsEditDialogVisible(false)
        }}
        onTapKick={onTapKickFriend}
        onTapPermission={onTapEditPermission}
      />
    </div>
  )
}

export default SharedFriendPage
