"use client"

import { useEffect, useState } from "react"

import { getMyProfile, GetMyProfileResponse } from "@/app/api/login"
import Icon from "@/common/Icon"

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
    <div className="flex flex-col items-center justify-center gap-[12px] bg-green-200 px-[24px] py-[24px]">
      <div className="flex h-[108px] w-[108px] items-center justify-center rounded-full bg-green-600">
        <Icon name="emojiFunnyCircleBold" size={64} color="white"></Icon>
      </div>
      <p className="tp-header2-semibold">{userInfo.name}</p>
    </div>
  )
}

export default Header
