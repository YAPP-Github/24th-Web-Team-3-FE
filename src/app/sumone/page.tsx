"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"

import { postAlbum } from "../api/photo"
import { updateName } from "../api/signIn"
import { useGetProfile } from "../profile/hooks/useProfile"

const SumonePage = () => {
  const router = useRouter()
  const { profile } = useGetProfile()
  const [name, setName] = useState<string>("")

  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length > 6) return
    setName(e.target.value)
  }

  const handleClickStart = async () => {
    const data = await updateName(name)
    if (data.name === name) {
      router.push("/album")
    } else {
      throw new Error("이름 변경 실패")
    }
  }

  const handleCreateAlbum = async (code: string) => {
    const data = await postAlbum("썸원 이벤트", "HEART", code)
    console.log("created album", data)
  }

  useEffect(() => {
    const sumoneInviteCode = localStorage.getItem("sumoneCode")
    if (sumoneInviteCode) {
      handleCreateAlbum(sumoneInviteCode)
    }
  }, [])

  useEffect(() => {
    if (!profile || profile.isDefaultName) return
    else {
      router.push("/album")
    }
  }, [profile])

  return (
    profile && (
      <div className="flex h-full w-full flex-col">
        <header className="relative flex h-14 w-full items-center justify-center px-4 py-3.5">
          <span className="absolute left-4">
            <Icon name="altArrowLeftOutline" size={28} />
          </span>
        </header>
        <div className="flex flex-col gap-2.5 p-6">
          <Icon name="heartPink" size={36} />
          <span className="tp-header2-semibold whitespace-pre text-gray-900">
            {`반가워요!\n어떤 이름으로 불리고 싶나요?`}
          </span>
        </div>
        <div className="flex h-full w-full flex-col p-6">
          <input
            className="tp-header1-semibold h-12 w-full rounded-lg bg-gray-100 px-4 py-2 text-center text-gray-800 bg-blend-multiply placeholder:text-gray-400 focus:outline-none"
            type="text"
            placeholder="이름"
            value={name}
            onChange={handleChangeName}
            tabIndex={0}
          />
          <span className="tp-body2-regular flex w-full justify-end py-1 text-gray-500">
            {name.length}/6자
          </span>
        </div>
        <span className="relative mb-6 flex w-full flex-col px-6">
          {name.length > 0 && (
            <div className="relative bottom-6 w-fit translate-x-1/2 whitespace-pre rounded-lg bg-white px-3 py-2.5 shadow-md">
              <span className="w-fit bg-white text-sm leading-[150%] tracking-[0.24px]">
                추억을 쌓는 우리만의 방법💝
              </span>
              <span className="absolute bottom-0 left-1/2 -z-10 h-4 w-4 -translate-x-1/2 translate-y-1/4 rotate-45 bg-white" />
            </div>
          )}
          <SquareButton
            onClick={handleClickStart}
            disabled={name.length === 0}
            className={`flex w-full bg-gray-900 text-white disabled:bg-gray-100 disabled:text-gray-400`}>
            {name.length === 0
              ? "1자 이상의 이름을 지어주세요"
              : "마이푸레임, 마푸 시작하기"}
          </SquareButton>
        </span>
      </div>
    )
  )
}
export default SumonePage
