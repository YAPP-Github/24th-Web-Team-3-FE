import { useMutation } from "@tanstack/react-query"

import { postAlbum } from "@/app/api/photo"
import { useAlert } from "@/store/AlertContext"

import { AlbumType } from "../../types"

export const usePostAlbum = () => {
  const { showAlert } = useAlert()

  const { data, mutate, isPending } = useMutation({
    mutationFn: ({ name, type }: { name: string; type: AlbumType }) =>
      postAlbum(name, type),
    mutationKey: ["postAlbum"],
    onError: (error) => {
      showAlert("앗! 앨범을 추가하지 못했어요", error.message)
    },
    throwOnError: true,
  })

  return { albumInfo: data, postAlbum: mutate, isPending }
}
