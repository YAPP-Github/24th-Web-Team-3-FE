import { useMutation, useSuspenseQuery } from "@tanstack/react-query"

import { getAlbums, patchPhotoAlbum, postQrCode } from "@/app/api/photo"
import { useAlert } from "@/store/AlertContext"

export const usePostQrCode = () => {
  const { showAlert } = useAlert()

  const { data, mutate, isPending } = useMutation({
    mutationFn: (code: string) => postQrCode(code),
    mutationKey: ["postQrCode"],
    onError: (error) => {
      showAlert("스캔에 문제가 발생했습니다", error.message)
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
  const { data } = useSuspenseQuery({
    queryKey: ["getAlbums"],
    queryFn: getAlbums,
  })

  return {
    albumLength: data.length,
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
