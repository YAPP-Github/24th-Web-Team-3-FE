import { useMutation } from "@tanstack/react-query"
import { useRouter } from "next/navigation"

import { postAlbum } from "@/app/api/photo"
import { getQueryClient } from "@/common/QueryProviders"
import { useAlertStore } from "@/store/alert"

import { usePatchPhotoAlbum } from "../../../scanner/hooks/usePhoto"
import type { AlbumType } from "../../types"

export const usePostAlbum = () => {
  const { showAlert } = useAlertStore()
  const router = useRouter()
  const { patchPhotoAlbum } = usePatchPhotoAlbum()

  const { data, mutate, isPending } = useMutation({
    mutationFn: ({
      name,
      type,
    }: {
      name: string
      type: AlbumType
      photoId?: string | null
      sumoneInviteCode?: string
    }) => postAlbum(name, type),
    mutationKey: ["postAlbum"],
    onError: (error) => {
      showAlert("앗! 앨범을 만들지 못했어요", error.message)
    },
    onSuccess: (data, { photoId }) => {
      const { albumId } = data
      const queryClient = getQueryClient()
      queryClient.invalidateQueries({ queryKey: ["getAlbums"] })

      if (photoId) {
        patchPhotoAlbum({ photoId, defaultAlbumId: albumId })
      }

      router.replace(`/album/${albumId}`)
    },
    throwOnError: true,
  })
  return {
    albumInfo: data,
    postAlbum: mutate,
    isPending,
  }
}
