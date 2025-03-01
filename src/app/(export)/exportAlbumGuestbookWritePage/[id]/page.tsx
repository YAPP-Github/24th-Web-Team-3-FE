"use client"

import { useRouter } from "next/navigation"
import { useState } from "react"

import AlbumTypeSelectTab from "@/app/album/create/_components/AlbumTypeSelectTab"
import { AlbumType } from "@/app/album/types"
import { createExportNote, ExportNoteType } from "@/app/api/album/export"
import CloseIcon from "@/assets/CloseIcon"
import { GoogleAdSenseComponent } from "@/common/GoogleAd"

import GuestWrite from "./_components/GuestWrite"

const DEFAULT_ALBUM_VALUE: ExportNoteType = {
  type: "HEART",
  nickname: "",
  content: "",
}

const ExportAlbumGuestbookWritePage = ({
  params,
}: {
  params: { id: string }
}) => {
  const exportId = params.id
  const router = useRouter()
  const [value, setValue] = useState(DEFAULT_ALBUM_VALUE)
  const { type } = value
  const [showAdModal, setShowAdModal] = useState(false)

  const handleType = (t: AlbumType) => {
    setValue({ ...value, type: t })
  }

  const handleValue = (v: string) => {
    setValue({ ...value, content: v })
  }

  const handleNickname = (v: string) => {
    setValue({ ...value, nickname: v })
  }

  const handleSubmit = async () => {
    console.log(value, exportId)
    setShowAdModal(true)

    await new Promise((resolve) => {
      setTimeout(() => {
        setShowAdModal(false)
        resolve(true)
      }, 3000)
    })

    await createExportNote(exportId, value)
      .then((res) => {
        console.log("submit 결과", res)
        router.push(`/exportAlbumDetail/${exportId}`)
      })
      .catch((err) => {
        console.log("submit 에러", err)
      })
  }

  const isSubmitDisabled =
    !value.content.length || value.content.length < 3 || !value.nickname

  const handleClickClose = () => {
    router.back()
  }

  return (
    <div className="flex h-full w-full bg-gray-50">
      {/* PageContainer을 div로 대체하고 필요한 스타일을 적용합니다. */}
      <div className="flex h-full w-full flex-col items-center">
        {/* 헤더 영역 */}
        <div className="relative flex w-full items-center justify-center px-4 py-3.5">
          <button className="absolute left-4 top-3" onClick={handleClickClose}>
            <CloseIcon width={28} />
          </button>
          <p className="tp-title2-semibold text-gray-800">방명록 쓰기</p>
        </div>
        {/* 내용 영역 */}
        <div
          className="flex w-full flex-1 flex-grow flex-col items-center justify-center"
          style={{ gap: 24 }}>
          <div className="w-full px-6 pt-6">
            <GuestWrite
              type={type}
              value={value.content}
              setValue={handleValue}
              nickname={value.nickname}
              setNickname={handleNickname}
            />
          </div>
          <p className="tp-body1-regular text-gray-500">
            방명록은 소중히 간직되어 삭제하기 어려워요 💌
          </p>
        </div>
        {/* 하단 영역 */}
        <div className="flex w-full flex-col items-center justify-center border-t border-t-[#F0F2F4] bg-white">
          <AlbumTypeSelectTab type={type} handleType={handleType} />
          <div className="w-full px-6">
            <button
              disabled={isSubmitDisabled}
              className={`my-3 w-full items-center rounded-lg bg-black py-3 ${
                isSubmitDisabled ? "disabled:bg-gray-100" : ""
              }`}
              onClick={handleSubmit}>
              <p
                className={`${
                  isSubmitDisabled ? "text-[#B1B7BE]" : "text-white"
                } tp-body1-semibold`}>
                {isSubmitDisabled ? "최소 3자 이상 작성해주세요" : "작성 완료"}
              </p>
            </button>
          </div>
        </div>
      </div>
      {showAdModal && (
        <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 px-6">
          <div className="flex h-[345px] w-[345px] flex-col gap-4 rounded-xl bg-white p-4">
            <div className="flex w-full flex-col items-center gap-2 p-6 pb-4">
              <p className="tp-title1-semibold text-gray-800">
                방명록이 게시되고 있어요
              </p>
              <p className="tp-body2-regular text-gray-500">
                잠시만 기다려주세요!
              </p>
            </div>
            <div className="relative w-full flex-grow">
              <GoogleAdSenseComponent />
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ExportAlbumGuestbookWritePage
