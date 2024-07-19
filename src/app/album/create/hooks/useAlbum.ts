import { useMutation, useSuspenseQuery } from "@tanstack/react-query"

import { deleteAlbum, getAlbum, getAlbums, postAlbum } from "@/app/api/photo"
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

export const useGetAlbums = () => {
  const { data, refetch } = useSuspenseQuery({
    queryKey: ["getAlbums"],
    queryFn: getAlbums,
  })

  return {
    albums: data,
    getAlbumsRefetch: refetch,
  }
}

export const useGetAlbum = (albumId: string) => {
  const { data } = useSuspenseQuery({
    queryKey: ["getAlbum", albumId],
    queryFn: () => getAlbum(albumId),
  })

  return { albumInfo: data }
}

export const useDeleteAlbum = () => {
  const { showAlert } = useAlert()

  const { mutate } = useMutation({
    mutationFn: ({ albumId }: { albumId: string }) => deleteAlbum(albumId),
    mutationKey: ["deleteAlbum"],
    onError: (error) => {
      showAlert("앗! 앨범을 삭제하지 못했어요", error.message)
    },
    throwOnError: true,
  })

  return { deleteAlbum: mutate }
}
