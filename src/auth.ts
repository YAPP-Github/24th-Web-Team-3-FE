import { createPrivateKey } from "crypto"
import { SignJWT } from "jose"
import { cookies } from "next/headers"
import { NextRequest } from "next/server"
import NextAuth from "next-auth"
import AppleProvider from "next-auth/providers/apple"
import KakaoProvider from "next-auth/providers/kakao"

import { appleLogin, kakaoLogin } from "@/app/api/signIn"
import { ACCESS_TOKEN_KEY } from "@/constants"

import { useAuthStore } from "./store/auth"

export default async function auth(req: NextRequest, res: any) {
  return await NextAuth(req, res, {
    pages: {
      signIn: "/",
    },
    providers: [
      KakaoProvider({
        clientId: process.env.AUTH_KAKAO_ID ?? "",
        clientSecret: process.env.AUTH_KAKAO_SECRET ?? "",
      }),
      AppleProvider({
        clientId: process.env.APPLE_ID ?? "",
        clientSecret: await getAppleToken(),
      }),
    ],
    cookies: {
      pkceCodeVerifier: {
        name: "next-auth.pkce.code_verifier",
        options: {
          httpOnly: true,
          sameSite: "none",
          path: "/",
          secure: true,
        },
      },
    },
    callbacks: {
      async signIn({ account }) {
        if (account?.access_token) {
          let authResponse
          if (account.provider === "apple") {
            authResponse = await appleLogin(account.id_token ?? "")
          } else {
            authResponse = await kakaoLogin(account.access_token)
          }

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
}

const getAppleToken = async () => {
  const key = `-----BEGIN PRIVATE KEY-----\n${process.env.APPLE_PRIVATE_KEY}\n-----END PRIVATE KEY-----\n`

  const appleToken = await new SignJWT({})
    .setAudience("https://appleid.apple.com")
    .setIssuer(process.env.APPLE_TEAM_ID ?? "")
    .setIssuedAt(new Date().getTime() / 1000)
    .setExpirationTime(new Date().getTime() / 1000 + 3600 * 2)
    .setSubject(process.env.APPLE_ID ?? "")
    .setProtectedHeader({
      alg: "ES256",
      kid: process.env.APPLE_KEY_ID,
    })
    .sign(createPrivateKey(key))
  return appleToken
}
