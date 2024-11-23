"use client"

import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { getAlbum, GetSharedAlbumResponse, SharedMember } from "@/app/api/photo"
import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"
import { albumDetailStickyHeaderVariants as headerVariants } from "@/styles/variants"
import { cn } from "@/utils"

import { AlbumPhotos } from "./_component/AlbumPhotos"
import { Header } from "./_component/Header"

const AlbumDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const [albumInfo, setAlbumInfo] = useState<GetSharedAlbumResponse>()
  const router = useRouter()

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

  const sharedMembersPreview = sharedMembers.slice(0, 5)

  return (
    <>
      <div className={cn(headerVariants({ type: albumInfo.type }))}>
        <Header albumInfo={albumInfo} className="sticky top-0 z-10" />
        <div
          className={cn(
            headerVariants({ type: albumInfo.type }),
            "flex flex-row justify-center"
          )}>
          <span className="tp-title1-semibold text-gradient-purple my-3 bg-clip-text text-center">
            함께 찍은 친구랑
            <br />
            앨범을 공유해보세요
          </span>
        </div>
        <div
          className={cn(
            headerVariants({ type: albumInfo.type }),
            "z-10 h-24 w-full px-4"
          )}>
          <ShareBar
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
              함께 칮은 추억
            </span>
            <span className="tp-header1-semibold text-gray-800">
              {albumInfo.photoCount}장
            </span>
          </div>
        </div>
        <AlbumPhotos albumInfo={albumInfo} />
      </div>
    </>
  )
}

const ShareBar = ({
  onTapFindFriend,
  onTapViewFriend,
  previewMembers,
}: {
  onTapFindFriend: () => void
  onTapViewFriend?: () => void
  previewMembers: SharedMember[]
}) => {
  return (
    <div className="tp-title2-semibold flex flex-row items-center justify-between rounded-2xl bg-white p-4 py-[11px] text-gray-700">
      <div className="flex flex-row items-center gap-1.5">
        {previewMembers.length == 0 ? (
          <div className="my-1 flex flex-row items-center gap-1.5">
            <Icon name="message" size={28} />
            <div>친구랑 앨범 공유하기</div>
          </div>
        ) : (
          <div className="flex h-[44px] -space-x-4">
            {previewMembers.map((member, idx) => (
              <Image
                style={{ zIndex: (5 - idx) * 10 }}
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
        <SquareButton
          className="tp-caption1-semibold rounded-[8px] bg-gray-100 px-[12px] py-[8px] text-gray-600"
          size="small"
          onClick={onTapViewFriend}>
          친구들 보기
        </SquareButton>
        <SquareButton
          className="tp-caption1-semibold rounded-[8px] bg-purple-200 px-[12px] py-[8px] text-purple-700"
          size="small"
          onClick={onTapFindFriend}>
          친구 찾기
        </SquareButton>
      </div>
    </div>
  )
}

export default AlbumDetailPage
