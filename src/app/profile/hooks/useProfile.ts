import { useSuspenseQuery } from "@tanstack/react-query"

import { getMyProfile } from "@/app/api/login"

export const useGetMyProfile = () => {
  const { data } = useSuspenseQuery({
    queryKey: ["getMyProfile"],
    queryFn: getMyProfile,
  })

  return {
    userInfo: data,
  }
}
