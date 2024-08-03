"use client"

import { useRouter } from "next/navigation"
import { signIn, useSession } from "next-auth/react"
import { useEffect } from "react"

import Button from "@/common/Button"
import Icon from "@/common/Icon"

const LoginButton = () => {
  const router = useRouter()
  const { data: session } = useSession()

  useEffect(() => {
    if (!session || !session.user.accessToken) return

    router.push("/scanner")
  }, [router, session])

  const handleSignIn = async () => {
    await signIn("kakao", { callbackUrl: "/scanner" })
  }

  return (
    <Button
      onClick={handleSignIn}
      className="w-full bg-kakao-600 text-gray-1000 active:bg-kakao-700">
      <Icon name={"kakaoLogo"} size={28}></Icon>
      카카오로 3초만에 계속하기
    </Button>
  )
}

export default LoginButton
