"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import { getMyProfile, GetMyProfileResponse } from "@/app/api/login"

const Header = () => {
  const [userInfo, setUserInfo] = useState<GetMyProfileResponse>()
  useEffect(() => {
    const fetchGetMyProfile = async () => {
      const data = await getMyProfile()
      setUserInfo(data)
    }

    fetchGetMyProfile()
  }, [])

  if (!userInfo) return null

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
          className="rounded-full"
        />

        <p className="text-header-2 font-semibold text-gray-700">
          {userInfo.name}
        </p>
      </div>
    </>
  )
}

export default Header
