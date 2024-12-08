import { PermissionLevel } from "@/app/api/photo"
import Icon from "@/common/Icon"

export enum AlbumMenuAction {
  "QUIT" = "QUIT",
  "EDIT" = "EDIT",
  "DELETE" = "DELETE",
}

export const AlbumMenuDialog = ({
  isVisible,
  myPermission,
  onTapBackdrop,
  onTapAction,
}: {
  isVisible: boolean
  myPermission: PermissionLevel
  onTapBackdrop: () => void
  onTapAction: (action: AlbumMenuAction) => void
}) => {
  return (
    <>
      {isVisible && (
        <div
          className="fixed left-0 top-0 z-[1000] flex h-dvh w-dvw items-end justify-center bg-gray-800/50 px-5 pb-5 transition-all duration-500"
          onClick={onTapBackdrop}>
          <div className="w-full rounded-2xl bg-white p-3 px-5">
            <div className="flex flex-col">
              {myPermission == PermissionLevel.OWNER && (
                <>
                  <div
                    className="flex shrink grow basis-0 flex-row items-center justify-center gap-2 py-4"
                    onClick={() => onTapAction(AlbumMenuAction.DELETE)}>
                    <Icon name="qrIcon" size={28} color="gray-500" />
                    <span className="tp-body1-semibold text-gray-600">
                      앨범 삭제하기
                    </span>
                  </div>
                  <div
                    className="divide-x bg-gray-200"
                    style={{ width: "1px" }}
                  />
                </>
              )}
              {(myPermission == PermissionLevel.OWNER ||
                myPermission == PermissionLevel.FULL_ACCESS) && (
                <div
                  className="flex shrink grow basis-0 flex-row items-center justify-center gap-2 py-4"
                  onClick={() => onTapAction(AlbumMenuAction.EDIT)}>
                  <Icon name="galleryIcon" size={28} color="gray-500" />
                  <span className="tp-body1-semibold text-gray-600">
                    앨범 수정하기
                  </span>
                </div>
              )}
              {myPermission != PermissionLevel.OWNER && (
                <div
                  className="divide-x bg-gray-200"
                  style={{ width: "1px" }}
                />
              )}
              {myPermission != PermissionLevel.OWNER && (
                <div
                  className="flex shrink grow basis-0 flex-row items-center justify-center gap-2 py-4"
                  onClick={() => onTapAction(AlbumMenuAction.QUIT)}>
                  <Icon name="galleryIcon" size={28} color="gray-500" />
                  <span className="tp-body1-semibold text-gray-600">
                    앨범에서 나가기
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
