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
          <p className="tp-title2-regular text-gray-400 mix-blend-multiply">
            #{profile.serialNumber}
          </p>
        </div>
      </div>
    </>
  )
}

export default Header
