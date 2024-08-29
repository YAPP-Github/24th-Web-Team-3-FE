import type { NextApiRequest, NextApiResponse } from "next"

import authMapper from "@/auth"

async function auth(req: NextApiRequest, res: NextApiResponse) {
  return await authMapper(req, res)
}

export { auth as GET, auth as POST }
