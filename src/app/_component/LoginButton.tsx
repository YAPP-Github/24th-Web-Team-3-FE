"use client"

import { signIn } from "next-auth/react"

import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"
import { isIOS, isWebView } from "@/libs"

const LoginButton = () => {
  const handleSignInWithKakao = async () => {
    if (isWebView()) {
      window.ReactNativeWebView.postMessage("kakaoLogin")
      return
    }
    await signIn("kakao", { callbackUrl: "/scanner" })
  }

  const handleSignInWithApple = async () => {
    if (isWebView()) {
      window.ReactNativeWebView.postMessage("appleLogin")
      return
    }
    await signIn("apple", { callbackUrl: "/scanner" })
  }

  return (
    <div className="flex flex-col gap-2">
      <SquareButton
        onClick={handleSignInWithKakao}
        className="w-full bg-kakao-600 text-gray-1000 active:bg-kakao-700">
        <Icon name={"kakaoLogo"} size={28}></Icon>
        카카오로 3초만에 계속하기
      </SquareButton>
      {isIOS() && (
        <SquareButton
          onClick={handleSignInWithApple}
          className="w-full bg-gray-950 text-gray-50 active:bg-gray-1000">
          <Icon name={"appleLogo"} size={24} color={"gray-50"}></Icon>
          Apple로 로그인하기
        </SquareButton>
      )}
    </div>
  )
}

export default LoginButton
