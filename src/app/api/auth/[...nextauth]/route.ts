import { NextRequest, NextResponse } from "next/server"

import authMapper from "@/auth"

async function auth(req: NextRequest, res: NextResponse) {
  return await authMapper(req, res)
}

export { auth as GET, auth as POST }
