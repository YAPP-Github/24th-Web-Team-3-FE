import { useQuery } from "@tanstack/react-query"

import { getMyProfile } from "@/app/api/signIn"

export const useGetProfile = () => {
  const { data } = useQuery({
    queryKey: ["getProfile"],
    queryFn: getMyProfile,
  })

  return {
    profile: data,
  }
}
