import SquareButton from "@/common/SquareButton"

interface DeleteDialogProps {
  title: string
  desc: string
  confirmBtnContext: string
  onClose: () => void
  onConfirm: () => void
}

export const Dialog = ({
  title,
  desc,
  confirmBtnContext,
  onClose,
  onConfirm,
}: DeleteDialogProps) => {
  return (
    <div className="fixed left-0 top-0 z-10 flex h-dvh w-dvw items-center justify-center bg-gray-800/50">
      <div className="w-[350px] rounded-3xl bg-white p-8 px-5">
        <div>
          <p className="tp-title1-semibold text-gray-800">{title}</p>
          <p className="tp-body1-regular mt-3 text-gray-600">{desc}</p>
        </div>
        <div className="mt-7 flex w-full gap-3">
          <SquareButton
            className="flex-1"
            variant="solid"
            size="large"
            theme="gray"
            onClick={onClose}>
            닫기
          </SquareButton>
          <SquareButton
            className="flex-1"
            variant="solid"
            size="large"
            theme="red"
            onClick={onConfirm}>
            {confirmBtnContext}
          </SquareButton>
        </div>
      </div>
    </div>
  )
}
