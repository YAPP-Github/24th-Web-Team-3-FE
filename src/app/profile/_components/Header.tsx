"use client"

import Image from "next/image"

import { useGetMyProfile } from "../hooks/useProfile"

const Header = () => {
  const { userInfo } = useGetMyProfile()

  return (
    <>
      <h1 className="tp-header2-semibold bg-green-200 p-4 py-[14px] text-gray-800">
        마이
      </h1>
      <div className="flex flex-col items-center justify-center gap-[12px] bg-green-200 px-[24px] py-[24px]">
        <Image
          src={userInfo.profileImageUrl}
          alt="프로필 이미지"
          width={108}
          height={108}
          className="h-[108px] w-[108px] rounded-full object-cover"
        />
        <p className="tp-header2-semibold text-gray-700">{userInfo.name}</p>
      </div>
    </>
  )
}

export default Header
