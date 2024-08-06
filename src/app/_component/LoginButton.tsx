"use client"

import { signIn } from "next-auth/react"

import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"

const LoginButton = () => {
  const handleSignIn = async () => {
    await signIn("kakao", { callbackUrl: "/scanner" })
  }

  return (
    <SquareButton
      onClick={handleSignIn}
      className="w-full bg-kakao-600 text-gray-1000 active:bg-kakao-700">
      <Icon name={"kakaoLogo"} size={28}></Icon>
      카카오로 3초만에 계속하기
    </SquareButton>
  )
}

export default LoginButton
