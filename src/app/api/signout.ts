import { cookies } from "next/headers"

import { ACCESS_TOKEN_KEY } from "@/constants"

export async function GET() {
  cookies().delete(ACCESS_TOKEN_KEY)

  return new Response("/", { status: 200 })
}
