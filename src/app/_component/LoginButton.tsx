"use client"

import { signIn } from "next-auth/react"

import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"

const LoginButton = () => {
  const handleSignIn = async (name: string) => {
    await signIn(name, { callbackUrl: "/scanner" })
  }

  return (
    <div className="flex flex-col gap-2">
      <SquareButton
        onClick={() => handleSignIn("kakao")}
        className="w-full bg-kakao-600 text-gray-1000 active:bg-kakao-700">
        <Icon name={"kakaoLogo"} size={28}></Icon>
        카카오로 3초만에 계속하기
      </SquareButton>

      <SquareButton
        onClick={() => handleSignIn("apple")}
        className="w-full border border-black bg-white text-gray-1000 active:bg-kakao-700">
        <Icon name={"appleLogo"} size={28} color="black"></Icon>
        Sign In with Apple
      </SquareButton>
    </div>
  )
}

export default LoginButton
