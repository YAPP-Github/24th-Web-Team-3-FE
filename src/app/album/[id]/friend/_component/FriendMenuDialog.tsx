import Icon from "@/common/Icon"

export const FriendMenuDialog = ({
  isVisible,
  onTapBackdrop,
  onTapKick,
  onTapPermission,
}: {
  isVisible: boolean
  onTapBackdrop: () => void
  onTapKick: () => void
  onTapPermission: () => void
}) => {
  return (
    <>
      {isVisible && (
        <div
          className="fixed left-0 top-0 z-10 flex h-dvh w-dvw items-end justify-center bg-gray-800/50 px-5 pb-5 transition-all duration-500"
          onClick={onTapBackdrop}>
          <div className="w-full rounded-2xl bg-white p-3 px-5">
            <div className="flex flex-row">
              <div
                className="flex shrink grow basis-0 flex-col items-center justify-center gap-2 py-4"
                onClick={onTapKick}>
                <Icon name="qrIcon" size={28} color="gray-500" />
                <span className="tp-body1-semibold text-gray-600">
                  친구 내보내기
                </span>
              </div>
              <div className="divide-x bg-gray-200" style={{ width: "1px" }} />
              <div
                className="flex shrink grow basis-0 flex-col items-center justify-center gap-2 py-4"
                onClick={onTapPermission}>
                <Icon name="galleryIcon" size={28} color="gray-500" />
                <span className="tp-body1-semibold text-gray-600">
                  권한 수정하기
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
