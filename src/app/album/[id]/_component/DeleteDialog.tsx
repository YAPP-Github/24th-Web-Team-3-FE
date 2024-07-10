import { useRouter } from "next/navigation"

import { deleteAlbum } from "@/app/api/photo"
import Button from "@/common/Button"

import { AlbumInfo } from "../../types"

interface DeleteDialogProps {
  albumInfo: AlbumInfo
  onClose: () => void
}

export const DeleteDialog = ({ albumInfo, onClose }: DeleteDialogProps) => {
  const { albumId, name } = albumInfo
  const router = useRouter()

  const onDeleteClick = async () => {
    await deleteAlbum(albumId)
    router.push("/album")
  }

  return (
    <div className="fixed left-0 top-0 z-10 flex h-dvh w-dvw items-center justify-center bg-gray-800/50">
      <div className="w-[350px] rounded-3xl bg-white p-8 px-5">
        <div>
          <div className="tp-title1-semibold text-gray-800">
            {`'${name}'`} 앨범을 삭제할까요?
          </div>
          <p className="tp-body1-regular mt-3 text-gray-600">
            모든 사진도 함께 삭제되며, 복구할 수 없어요.
          </p>
        </div>
        <div className="mt-7 flex w-full gap-3">
          <Button
            className="flex-1"
            variant="solid"
            size="large"
            theme="gray"
            onClick={onClose}>
            닫기
          </Button>
          <Button
            className="flex-1"
            variant="solid"
            size="large"
            theme="red"
            onClick={onDeleteClick}>
            앨범 삭제
          </Button>
        </div>
      </div>
    </div>
  )
}
