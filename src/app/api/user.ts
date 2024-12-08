import { myFetch } from "./myfetch"

export interface MemberSearchResult {
  memberId: string
  name: string
  profileImageUrl: string
  serialNumber: string
  sharedMemberId: string
  shareStatus?: string
  permissionLevel: string
}

export const searchMembers = async (
  query: string,
  albumId: string
): Promise<Array<MemberSearchResult>> => {
  const result = await myFetch(
    `user/v1/members?keyword=${query}&albumId=${albumId}`,
    {
      method: "GET",
    }
  )
  return result
}
