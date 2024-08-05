import { useMutation } from "@tanstack/react-query"

import { postAlbum } from "@/app/api/photo"
import { getQueryClient } from "@/common/QueryProviders"
import { useAlert } from "@/store/AlertContext"

import type { AlbumType } from "../../types"

export const usePostAlbum = () => {
  const { showAlert } = useAlert()

  const { data, mutate, isPending } = useMutation({
    mutationFn: ({ name, type }: { name: string; type: AlbumType }) =>
      postAlbum(name, type),
    mutationKey: ["postAlbum"],
    onError: (error) => {
      showAlert("앗! 앨범을 만들지 못했어요", error.message)
    },
    onSuccess: () => {
      const queryClient = getQueryClient()
      queryClient.invalidateQueries({ queryKey: ["getAlbums"] })
    },
    throwOnError: true,
  })
  return {
    albumInfo: data,
    postAlbum: mutate,
    isPending,
  }
}
