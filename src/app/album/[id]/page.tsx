"use client"

import { useQueryClient } from "@tanstack/react-query"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import {
  AlbumMenuAction,
  AlbumMenuDialog,
} from "@/app/album/[id]/_component/AlbumMenuDialog"
import { Dialog } from "@/app/album/[id]/_component/Dialog"
import {
  deleteAlbum,
  deleteSharedMember,
  getAlbum,
  GetSharedAlbumResponse,
  PermissionLevel,
  SharedMember,
} from "@/app/api/photo"
import { useGetProfile } from "@/app/profile/hooks/useProfile"
import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"
import { albumDetailStickyHeaderVariants as headerVariants } from "@/styles/variants"
import { cn } from "@/utils"

import { AlbumPhotos } from "./_component/AlbumPhotos"
import { Header } from "./_component/Header"

const AlbumDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const [albumInfo, setAlbumInfo] = useState<GetSharedAlbumResponse>()
  const profile = useGetProfile()
  const [isMenuVisible, setIsMenuVisible] = useState(false)
  const [isDeleteModalShown, setIsDeleteModalShown] = useState(false)
  const [isQuitModalShown, setIsQuitModalShown] = useState(false)
  const router = useRouter()
  const queryClient = useQueryClient()

  useEffect(() => {
    const initAlbum = async () => {
      const data = await getAlbum(id)
      if (data) {
        setAlbumInfo(data)
      }
    }
    initAlbum()
  }, [id])

  if (!albumInfo) return

  const sharedMembers = albumInfo?.sharedMembers || []
  const ownerShared: SharedMember = {
    sharedMemberId: albumInfo.ownerMemberId ?? "",
    memberId: albumInfo.ownerMemberId ?? "",
    albumId: albumInfo.albumId ?? "",
    profileImageUrl: albumInfo.ownerProfileImageUrl ?? "",
    permissionLevel: PermissionLevel.OWNER,
    shareStatus: "SHARED",
    name: albumInfo.ownerName ?? "",
    serialNumber: "0000",
  }
  const isOwner = albumInfo.ownerMemberId === profile.profile?.memberId
  const me = sharedMembers.find(
    (member) => member.memberId === profile.profile?.memberId
  )
  const myPermission = isOwner ? PermissionLevel.OWNER : me?.permissionLevel

  const sharedMembersPreview = [ownerShared, ...sharedMembers.slice(0, 5)]

  const handleDeleteAlbum = async () => {
    await deleteAlbum(albumInfo.albumId)
    await queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
    router.push("/album")
  }

  const handleQuitAlbum = async () => {
    if (me) {
      await deleteSharedMember(me.sharedMemberId)
      await queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
      router.push("/album")
    }
  }

  const deleteDialogProps = {
    title: `'${albumInfo.name}' 앨범을 삭제할까요?`,
    desc: "모든 사진도 함께 삭제되며, 복구할 수 없어요",
    confirmBtnContext: "앨범 삭제",
    onClose: () => {
      setIsDeleteModalShown(false)
    },
    onConfirm: handleDeleteAlbum,
  }

  const quitDialogProps = {
    title: `'${albumInfo.name}' 앨범에서 나갈까요?`,
    desc: "앨범 내의 사진은 그대로 유지되어요",
    confirmBtnContext: "앨범 나가기",
    onClose: () => {
      setIsQuitModalShown(false)
    },
    onConfirm: handleQuitAlbum,
  }

  const onTapMenuAction = (action: AlbumMenuAction) => {
    setIsMenuVisible(false)
    switch (action) {
      case AlbumMenuAction.DELETE:
        setIsDeleteModalShown(true)
        break
      case AlbumMenuAction.QUIT:
        setIsQuitModalShown(true)
        break
      default:
    }
  }

  const typeToBackgroundColor: Record<string, string> = {
    HEART: "bg-red-200",
    FIRE: "bg-butter-200",
    BASKETBALL: "bg-green-200",
    BUILDING: "bg-skyblue-200",
    STARFALL: "bg-purple-200",
    SMILE_FACE: "bg-pink-200",
  }

  const backgroundColorClass = albumInfo?.type
    ? typeToBackgroundColor[albumInfo.type]
    : "bg-gray-200"

  return (
    <>
      <div className={cn(headerVariants({ type: albumInfo.type }))}>
        <Header
          albumInfo={albumInfo}
          className={`sticky top-0 z-20 ${backgroundColorClass}`}
          onTapMenu={() => setIsMenuVisible(true)}
        />
        {isDeleteModalShown && <Dialog {...deleteDialogProps} />}
        {isQuitModalShown && <Dialog {...quitDialogProps} />}
        {myPermission && (
          <AlbumMenuDialog
            isVisible={isMenuVisible}
            myPermission={myPermission}
            onTapBackdrop={() => setIsMenuVisible(false)}
            onTapAction={onTapMenuAction}
          />
        )}
        {/* <div
          className={cn(
            headerVariants({ type: albumInfo.type }),
            "flex flex-row justify-center"
          )}>
          <span className="tp-title1-semibold text-gradient-purple my-3 bg-clip-text text-center">
            함께 찍은 친구랑
            <br />
            앨범을 공유해보세요
          </span>
        </div> */}
        <div
          className={cn(
            headerVariants({ type: albumInfo.type }),
            "z-10 h-20 w-full px-4"
          )}>
          <ShareBar
            canAddFriend={
              myPermission == PermissionLevel.OWNER ||
              myPermission == PermissionLevel.FULL_ACCESS
            }
            onTapFindFriend={() => router.push(`/album/${id}/friend/add`)}
            onTapViewFriend={() => router.push(`/album/${id}/friend`)}
            previewMembers={sharedMembersPreview}
          />
        </div>
        <div
          className="sticky top-14 z-10 flex w-full flex-row justify-between bg-white"
          style={{ borderRadius: "24px 24px 0 0" }}>
          <div className="flex flex-col px-6 pb-2 pt-6">
            <span className="tp-body2-regular text-gray-500">
              함께 찍은 추억
            </span>
            <span className="tp-header1-semibold text-gray-800">
              {albumInfo.photoCount}장
            </span>
          </div>
        </div>
        <AlbumPhotos albumInfo={albumInfo} myPermission={myPermission} />
      </div>
    </>
  )
}

const ShareBar = ({
  onTapFindFriend,
  onTapViewFriend,
  previewMembers,
  canAddFriend,
}: {
  onTapFindFriend: () => void
  onTapViewFriend?: () => void
  previewMembers: SharedMember[]
  canAddFriend: boolean
}) => {
  return (
    <div className="tp-title2-semibold flex flex-row items-center justify-between rounded-2xl bg-white p-4 py-[11px] text-gray-700">
      <div className="flex flex-row items-center gap-1.5">
        {previewMembers.length == 1 ? (
          <div className="my-1 flex flex-row items-center gap-1.5">
            <Icon name="message" size={28} />
            <div>친구랑 앨범 공유하기</div>
          </div>
        ) : (
          <div className="flex h-[44px] -space-x-4">
            {previewMembers.map((member, idx) => (
              <Image
                style={{ zIndex: 10 + (5 - idx) }}
                key={member.memberId}
                width={44}
                height={44}
                alt={"hihi"}
                src={member.profileImageUrl}
                className={
                  "h-[44px] w-[44px] rounded-[50%] border border-white"
                }
              />
            ))}
          </div>
        )}
      </div>

      <div className="flex flex-row gap-2">
        {previewMembers.length > 1 && (
          <SquareButton
            className="tp-caption1-semibold rounded-[8px] bg-gray-100 px-[12px] py-[8px] text-gray-600 active:bg-gray-200"
            size="small"
            onClick={onTapViewFriend}>
            친구들 보기
          </SquareButton>
        )}
        {canAddFriend && (
          <SquareButton
            className="tp-caption1-semibold rounded-[8px] bg-gray-100 px-[12px] py-[8px] text-gray-600 active:bg-gray-200"
            size="small"
            onClick={onTapFindFriend}>
            친구 찾기
          </SquareButton>
        )}
      </div>
    </div>
  )
}

export default AlbumDetailPage
