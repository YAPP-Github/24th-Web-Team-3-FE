import { NextResponse } from "next/server"

import { auth } from "./app/api/auth/[...nextauth]"

export async function middleware() {
  const session = await auth()
  if (!session) {
    return NextResponse.redirect(process.env.NEXT_PUBLIC_URL as string)
  }
}

export const config = {
  matcher: ["/scanner", "/profile", "/album/:path*"],
}
