import { createPrivateKey } from "crypto"
import { SignJWT } from "jose"
import { cookies } from "next/headers"
import NextAuth from "next-auth"
import AppleProvider from "next-auth/providers/apple"
import KakaoProvider from "next-auth/providers/kakao"

import { authLogin } from "@/app/api/signIn"
import { ACCESS_TOKEN_KEY } from "@/constants"

import { useAuthStore } from "./store/auth"

const getAppleToken = async () => {
  const key = `-----BEGIN PRIVATE KEY-----\n${process.env.NEXT_PUBLIC_APPLE_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`

  //토큰 생성시간
  const issuedAt = new Date().getTime() / 1000

  //expireTime이 만료되면 해당 apple login이 되지 않는다.
  //토큰생성은 배포시점에 next sever가 실행되는 처음 한번만 생성된다.
  //6개월, 이를 초과할 경우도 login이 되지않는다.(원인은 애플정책일것으로 추측)
  const expireTime = issuedAt + 60 * 60 * 24 * 30 * 6

  const appleToken = await new SignJWT({})
    .setAudience("https://appleid.apple.com")
    .setIssuer(process.env.NEXT_PUBLIC_APPLE_TEAM_ID as string)
    .setIssuedAt(issuedAt)
    .setExpirationTime(expireTime)
    .setSubject(process.env.NEXT_PUBLIC_APPLE_CLIENT_ID as string)
    .setProtectedHeader({
      alg: "ES256",
      kid: process.env.NEXT_PUBLIC_APPLE_KEY_ID,
    })
    .sign(createPrivateKey(key))

  return appleToken
}

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  /**
   * 애플 로그인 시 쿠키옵션 적용해 주어야 callbackUrl이 정상 작동
   */
  cookies: {
    callbackUrl: {
      name: `__Secure-next-auth.callback-url`,
      options: {
        httpOnly: false,
        sameSite: "none",
        path: "/",
        secure: true,
      },
    },
  },
  trustHost: true,
  pages: {
    signIn: "/",
  },
  providers: [
    KakaoProvider({
      clientId: process.env.AUTH_KAKAO_ID,
      clientSecret: process.env.AUTH_KAKAO_SECRET,
    }),
    AppleProvider({
      clientId: process.env.NEXT_PUBLIC_APPLE_CLIENT_ID,
      clientSecret: await getAppleToken(), //최상위 await es2017 이상에서 사용가능.
    }),
  ],
  callbacks: {
    async signIn({ account }) {
      if (account?.access_token) {
        const authResponse = await authLogin(account.access_token)

        cookies().set(ACCESS_TOKEN_KEY, authResponse.accessToken, {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          maxAge: 30 * 24 * 60 * 60, // 30일
        })

        const updatedAccount = {
          ...account,
          access_token: authResponse.accessToken,
          refresh_token: authResponse.refreshToken,
        }
        account = updatedAccount
      }

      return true
    },
    jwt({ token, account }) {
      if (account) {
        token.accessToken = account.access_token
        token.refreshToken = account.refresh_token
      }
      return token
    },
    session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          ...token,
        },
      }
    },
  },
  events: {
    signOut() {
      cookies().delete(ACCESS_TOKEN_KEY)
      useAuthStore.getState().clearAuth()
      return
    },
  },
  secret: process.env.NEXT_PUBLIC_NEXTAUTH_SECRET,
})
