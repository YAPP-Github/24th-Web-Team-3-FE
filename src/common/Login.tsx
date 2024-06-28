"use client"
import Image from "next/image"
import { Session } from "next-auth"
import { signIn, signOut, useSession } from "next-auth/react"
import { useEffect } from "react"

import { kakaoLogin } from "@/app/api"

interface CustomSession extends Session {
  user: {
    name: string
    image: string
    picture: string
    sub: string
    accessToken: string
    iat: number
    exp: number
    jti: string
  }
  expires: string
}

const Login = () => {
  const { data: session } = useSession() as { data: CustomSession | null }
  const user = session?.user

  useEffect(() => {
    if (!user) return

    kakaoLogin(user.accessToken)
  }, [user])

  if (user) {
    return (
      <>
        <p>Signed in as {user.name} </p>
        <Image src={user.image} alt={user.name} width={500} height={500} />

        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn("kakao")}>Sign in</button>
    </>
  )
}

export default Login
