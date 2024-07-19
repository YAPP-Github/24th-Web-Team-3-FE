import { useMutation, useSuspenseQuery } from "@tanstack/react-query"

import {
  deletePhoto,
  getPhotos,
  patchPhotoAlbum,
  postQrCode,
} from "@/app/api/photo"
import { useAlert } from "@/store/AlertContext"

export const usePostQrCode = () => {
  const { showAlert } = useAlert()

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

export const usePatchPhotoAlbum = () => {
  const { showAlert } = useAlert()

  const { mutate } = useMutation({
    mutationFn: ({ photoId, albumId }: { photoId: string; albumId: string }) =>
      patchPhotoAlbum(photoId, albumId),
    mutationKey: ["patchPhotoAlbum"],
    onError: (error) => {
      showAlert("앗! 앨범에 사진을 추가하지 못했어요", error.message)
    },
  })

  return { patchPhotoAlbum: mutate }
}

export const useDeletePhoto = () => {
  const { showAlert } = useAlert()

  const { mutate } = useMutation({
    mutationFn: (photoId: string) => deletePhoto(photoId),
    mutationKey: ["deletePhoto"],
    onError: (error) => {
      showAlert("앗! 사진을 삭제하지 못했어요", error.message)
    },
    throwOnError: true,
  })

  return { deletePhoto: mutate }
}

export const useGetPhotos = (albumId: string) => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ["getPhotos", albumId],
    queryFn: () => getPhotos(albumId),
  })

  return {
    photos: data,
    photosRefetch: refetch,
  }
}
