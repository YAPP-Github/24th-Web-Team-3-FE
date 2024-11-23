import Image from "next/image"
import { useState } from "react"

import { PermissionLevel } from "@/app/api/photo"
import SquareButton from "@/common/SquareButton"

export const SharePermissionDialog = ({
  imageUrl,
  name,
  isVisible,
  onExit,
  onTapSave,
  defaultPermissionLevel = PermissionLevel.FULL_ACCESS,
}: {
  imageUrl: string
  name: string
  isVisible: boolean
  onExit: () => void
  onTapSave: (level: PermissionLevel) => void
  defaultPermissionLevel: PermissionLevel
}) => {
  const [permissionLevel, setPermissionLevel] = useState<PermissionLevel>(
    defaultPermissionLevel
  )
  return (
    <>
      {isVisible && (
        <div className="fixed top-0 z-10 flex h-dvh w-dvw items-center justify-center bg-gray-800/50 px-5 pb-5 transition-all duration-500">
          <div className="w-full rounded-2xl bg-white p-3 px-5 pt-6">
            <div className="flex flex-col items-center gap-2">
              <Image
                crossOrigin="anonymous"
                src={imageUrl}
                className="h-[96px] w-[96px] rounded-[50%]"
                width={96}
                height={96}
                alt="friend"
              />
              <div className="tp-title1-semibold text-gray-800">
                {name}님의 편집 권한
              </div>
            </div>
            <div className="my-4 h-[1.5px] w-full bg-gray-100" />

            <div className="tp-title2-regular flex flex-col text-gray-700">
              <div className="flex flex-row gap-2 py-1">
                <input
                  className="w-[20px]"
                  type="radio"
                  name="perm"
                  id="full"
                  onChange={(e) => {
                    if (e.target.value)
                      setPermissionLevel(PermissionLevel.FULL_ACCESS)
                  }}
                  checked={permissionLevel === PermissionLevel.FULL_ACCESS}
                />
                <label htmlFor="full">전체 편집</label>
              </div>
              <div className="flex flex-row gap-2 py-1">
                <input
                  className="w-[20px] border-2 border-purple-600"
                  type="radio"
                  name="perm"
                  id="download"
                  onChange={(e) => {
                    if (e.target.value)
                      setPermissionLevel(PermissionLevel.DOWNLOAD_ACCESS)
                  }}
                  checked={permissionLevel === PermissionLevel.DOWNLOAD_ACCESS}
                />
                <label htmlFor="download">다운로드만</label>
              </div>
              <div className="flex flex-row gap-2 py-1">
                <input
                  className="w-[20px]"
                  type="radio"
                  name="perm"
                  id="view"
                  onChange={(e) => {
                    if (e.target.value)
                      setPermissionLevel(PermissionLevel.VIEW_ACCESS)
                  }}
                  checked={permissionLevel === PermissionLevel.VIEW_ACCESS}
                />
                <label htmlFor="view">보기만</label>
              </div>
            </div>
            <div className="mt-[20px] flex flex-row justify-between gap-3">
              <SquareButton
                className="grow basis-1 bg-gray-100 text-gray-600"
                onClick={onExit}>
                닫기
              </SquareButton>
              <SquareButton
                className="grow basis-1 bg-purple-600 text-white"
                onClick={() => onTapSave(permissionLevel)}>
                공유하기
              </SquareButton>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
