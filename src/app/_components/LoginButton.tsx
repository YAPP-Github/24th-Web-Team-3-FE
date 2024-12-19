"use client"

import { signIn } from "next-auth/react"

import DoubleHeartIcon from "@/assets/DoubleHeartIcon"
import Icon from "@/common/Icon"
import SquareButton from "@/common/SquareButton"
import SumoneButton from "@/common/SumoneButton"
import { isIOS, isWebView } from "@/libs"

interface LoginButtonProps {
  isSumone: boolean
  setIsSumone?: (value: boolean) => void
}

const LoginButton = ({ isSumone, setIsSumone }: LoginButtonProps) => {
  const handleSignInWithKakao = async () => {
    if (isWebView()) {
      window.ReactNativeWebView.postMessage("kakaoLogin")
      return
    }
    await signIn("kakao", { callbackUrl: isSumone ? "/sumone" : "/album" })
  }

  const handleSignInWithApple = async () => {
    await signIn("apple", { callbackUrl: isSumone ? "/sumone" : "/album" })
  }

  const handleSignInWithSumone = () => {
    if (!setIsSumone) return
    setIsSumone(true)
  }

  return (
    <div className="flex w-full flex-col gap-2">
      <span
        className={`${isSumone ? "flex-col" : "flex-row"} flex w-full gap-3`}>
        {isIOS() && (
          <SquareButton
            onClick={handleSignInWithApple}
            className={`flex w-full flex-grow-0 bg-gray-950 text-gray-50 active:bg-gray-1000`}>
            <Icon name={"appleLogo"} size={24} color={"gray-50"}></Icon>
            {isSumone ? "애플로 로그인하기" : "애플 로그인"}
          </SquareButton>
        )}
        <SquareButton
          onClick={handleSignInWithKakao}
          className={`flex w-full flex-grow-0 bg-kakao-600 text-gray-1000 active:bg-kakao-700`}>
          <Icon name={"kakaoLogo"} size={28}></Icon>
          {isSumone ? "카카오로 3초만에 로그인하기" : "카카오 로그인"}
        </SquareButton>
      </span>
      {!isSumone && (
        <SumoneButton
          width="100%"
          height={56}
          fill="#ffffff"
          text="썸원 이벤트 참여자라면?"
          iconLeft={true}
          textClass="text-sumone-pink tp-body1-semibold"
          onClick={handleSignInWithSumone}
          icon={<DoubleHeartIcon width={28} height={28} />}
        />
      )}
    </div>
  )
}

export default LoginButton
