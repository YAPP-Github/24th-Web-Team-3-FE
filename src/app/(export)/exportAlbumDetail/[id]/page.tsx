"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { ExportAlbumType, getExportAlbumData } from "@/app/api/album/export"
import ClipboardHeart from "@/assets/clipboardHeart"
import FilledPen from "@/assets/filledPen"
import GalleryImageIcon from "@/assets/galleryImageIcon"
import HeartBoldMonoColor from "@/assets/heartBoldMonoColor"
import Icon from "@/common/Icon"
import { ICON_NAME } from "@/constants"

import { colors } from "../../exportAlbum/[id]/_constants/color"
import { COLOR_MAP } from "../../exportAlbum/[id]/_constants/color"
import AlbumPhotos from "./_components/AlbumPhotos"
import GuestBooks from "./_components/GuestBooks"

const ExportAlbumDetailPage = ({ params }: { params: { id: string } }) => {
  const exportId = params.id
  const router = useRouter()
  const [exportAlbumData, setExportAlbumData] =
    useState<ExportAlbumType | null>(null)
  const [currentTab, setCurrentTab] = useState<"photo" | "guestbook">("photo")

  useEffect(() => {
    if (!exportId) return
    getExportAlbumData(exportId).then((res) => {
      setExportAlbumData(res)
    })
  }, [exportId])

  if (!exportAlbumData) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Loading...
      </div>
    )
  }

  const selectedColor = COLOR_MAP[exportAlbumData.type]

  const handleClickGuestBookWrite = () => {
    router.push(`/exportAlbumGuestbookWritePage/${exportId}`)
  }

  const handleClickHeartClick = async () => {
    console.log("handleLikeClicked")
  }

  return (
    <div
      className="relative flex min-h-screen flex-col"
      style={{ backgroundColor: selectedColor.bg }}>
      {/* Header */}
      <div className="flex flex-row justify-between px-4 py-3">
        <div className="flex flex-row items-center gap-2">
          <Icon
            name={ICON_NAME[exportAlbumData.type]}
            size={24}
            color={selectedColor.icon}
          />
          <span className="tp-header2-semibold text-gray-800">
            {exportAlbumData.name}
          </span>
        </div>
      </div>
      {/* Content 영역 */}
      <div className="flex w-full flex-1 flex-col items-center rounded-t-3xl bg-white pb-5 pt-4">
        {/* 탭 전환 */}
        <div className="flex flex-row rounded-full bg-gray-100 p-1.5">
          <button
            onClick={() => setCurrentTab("photo")}
            style={{
              backgroundColor: currentTab === "photo" ? "#fff" : "transparent",
            }}
            className="rounded-full px-5 py-1.5">
            <span
              className={`tp-body1-semibold ${
                currentTab === "photo" ? "text-gray-800" : "text-gray-500"
              }`}>
              사진
            </span>
          </button>
          <button
            onClick={() => setCurrentTab("guestbook")}
            style={{
              backgroundColor:
                currentTab === "guestbook" ? "#fff" : "transparent",
            }}
            className="rounded-full px-5 py-1.5">
            <span
              className={`tp-body1-semibold ${
                currentTab === "guestbook" ? "text-gray-800" : "text-gray-500"
              }`}>
              방명록
            </span>
          </button>
        </div>
        {/* 좋아요, 사진/방명록 갯수 표시 */}
        <div className="flex flex-row items-center gap-2 px-3 py-2">
          <div className="flex flex-row items-center gap-2">
            {/* <Icon name="heartBoldMonoColor" size={24} color={colors.red[500]} /> */}
            <HeartBoldMonoColor width={24} height={24} fill={colors.red[500]} />
            <span className="tp-body2-semibold text-gray-600">
              {exportAlbumData.likeCount}
            </span>
          </div>
          <div className="h-[10px] w-[1px] bg-[#E1E4E8]" />
          {currentTab === "photo" ? (
            <div className="flex flex-row items-center gap-2">
              {/* <Icon name="galleryImageIcon" size={24} color={colors.red[500]} /> */}
              <GalleryImageIcon
                width={24}
                height={24}
                fill={colors.gray[300]}
              />
              <span className="tp-body2-semibold text-gray-600">
                {exportAlbumData.photoCount}장
              </span>
            </div>
          ) : (
            <div className="flex flex-row items-center gap-2">
              {/* <Icon name="clipboardHeart" size={24} color={colors.red[500]} /> */}
              <ClipboardHeart width={24} height={24} fill={colors.red[500]} />
              <span className="tp-body2-semibold text-gray-600">
                {exportAlbumData.noteCount}장
              </span>
            </div>
          )}
        </div>
        {/* 탭에 따른 콘텐츠 렌더링 */}
        <div className="w-full flex-1">
          {currentTab === "photo" ? (
            <AlbumPhotos exportId={exportId} />
          ) : (
            <GuestBooks exportId={exportId} />
          )}
        </div>
        {/* 하단 고정 영역 */}
        <div className="absolute bottom-5 w-full px-6">
          <div className="flex w-full flex-row gap-2 rounded-lg bg-white p-3 shadow-lg">
            <button
              onClick={handleClickHeartClick}
              className="rounded-xl p-2.5"
              style={{
                backgroundColor: exportAlbumData.isMeLiked
                  ? colors.red[100]
                  : colors.gray[100],
              }}>
              {/* <Icon
                name="heartBoldMonoColor"
                size={28}
                color={
                  exportAlbumData.isMeLiked ? colors.red[500] : colors.gray[300]
                }
              /> */}
              <HeartBoldMonoColor
                width={28}
                height={28}
                fill={
                  exportAlbumData.isMeLiked ? colors.red[500] : colors.gray[300]
                }
              />
            </button>
            <button
              onClick={handleClickGuestBookWrite}
              className="flex flex-1 flex-row items-center justify-between rounded-xl bg-gray-100 px-4 py-2">
              <span className="tp-body2-regular text-gray-500">
                방명록을 작성해주세요
              </span>
              {/* <Icon name="filledPen" size={24} /> */}
              <FilledPen width={24} height={24} />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ExportAlbumDetailPage
