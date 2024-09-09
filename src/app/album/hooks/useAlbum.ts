import { useMutation } from "@tanstack/react-query"

import { patchAlbumMove } from "@/app/api/photo"

export const usePatchAlbumMove = () => {
  const { mutate } = useMutation({
    mutationKey: ["patchAlbumMove"],
    mutationFn: ({
      albumId,
      newDisplayIndex,
    }: {
      albumId: string
      newDisplayIndex: number
    }) => patchAlbumMove(albumId, newDisplayIndex),
  })

  return {
    patchAlbumMove: mutate,
  }
}
