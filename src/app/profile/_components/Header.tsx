"use client"

import Image from "next/image"

import { useGetProfile } from "../hooks/useProfile"

const Header = () => {
  const { profile } = useGetProfile()

  if (!profile) return null

  return (
    <>
      <h1 className="tp-header2-semibold p-4 py-[14px] text-gray-800">마이</h1>
      <div className="flex flex-col items-center justify-center gap-[12px] px-[24px] py-[24px]">
        <Image
          src={profile.profileImageUrl}
          alt="프로필 이미지"
          width={108}
          height={108}
          className="h-[108px] w-[108px] rounded-full object-cover"
        />

        <div className="flex flex-col items-center gap-[6px]">
          <p className="tp-header2-semibold text-gray-700">{profile.name}</p>
          <p className="tp-title2-regular relative text-gray-400">
            #{profile.serialNumber}
            <span className="tp-body2-regular absolute left-1/2 top-8 z-20 flex w-fit -translate-x-1/2 whitespace-pre rounded-md bg-white px-3 py-2.5 text-gray-700 shadow-md">
              친구가 나를 찾을 수 있는 번호에요
            </span>
          </p>
        </div>
      </div>
    </>
  )
}

export default Header
