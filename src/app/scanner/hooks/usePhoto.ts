import { useMutation, useQuery } from "@tanstack/react-query"

import { getAlbums, patchPhotoAlbum, postQrCode } from "@/app/api/photo"
import { useAlertStore } from "@/store/alert"

export const usePostQrCode = () => {
  const { showAlert } = useAlertStore()

  const { data, mutate, isPending } = useMutation({
    mutationFn: (code: string) => postQrCode(code),
    mutationKey: ["postQrCode"],
    onError: (error) => {
      showAlert("앗! 사진을 불러오지 못했어요", error.message)
    },

    // throwOnError: true,
  })

  return {
    scanInfo: data,
    postQrCodeQuery: mutate,
    isPending,
  }
}

export const useGetAlbums = () => {
  const { data } = useQuery({
    queryKey: ["getAlbums"],
    queryFn: getAlbums,
  })

  return {
    albumLength: data?.length,
  }
}

export const usePatchPhotoAlbum = () => {
  const { mutate } = useMutation({
    mutationFn: ({
      photoId,
      defaultAlbumId,
    }: {
      photoId: string
      defaultAlbumId: string
    }) => patchPhotoAlbum(photoId, defaultAlbumId),
    mutationKey: ["patchPhotoAlbum"],
  })

  return { patchPhotoAlbum: mutate }
}
