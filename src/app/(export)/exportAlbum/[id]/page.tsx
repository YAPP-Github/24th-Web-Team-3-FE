import Image from "next/image"

import { getExportAlbumData } from "@/app/api/album/export"
import HeartBoldMonoColor from "@/assets/heartBoldMonoColor"
import MafooLogo2025Icon from "@/assets/MafooLogo2025Icon"
import SecurityEyeIcon from "@/assets/securityEye"
import ColorIcon from "@/common/ColorIcon"
import Icon from "@/common/Icon"
import { ICON_NAME } from "@/constants"

import BottomInteractComponent from "./_components/bottomInteract"
import { COLOR_MAP, colors } from "./_constants/color"

const ExportAlbumPage = async ({ params }: { params: { id: string } }) => {
  const exportId = params.id

  const exportAlbumData = await getExportAlbumData(exportId)
  const selectedColor = COLOR_MAP[exportAlbumData.type]

  return (
    <div className="page-container">
      {/* LinearGradient 대신 background CSS로 적용 */}
      <div
        className="relative flex min-h-screen flex-1 flex-col items-center pt-10"
        style={{
          background: `linear-gradient(to bottom, #ffffff 0%, ${selectedColor.bg} 50%)`,
        }}>
        <div className="flex flex-col items-center gap-2">
          {/* tp 접두어 적용 */}
          <p className="tp-title2-regular text-gray-600">함께 쌓고 연결되다</p>
          <MafooLogo2025Icon
            width={140}
            height={45}
            fill={selectedColor.icon}
          />
        </div>
        <div className="mt-14 flex flex-col items-center gap-6">
          <div
            style={{ width: "196px", height: "180px" }}
            className={`${selectedColor.album.bg} relative flex flex-col rounded-3xl border-2 border-white p-5 shadow-lg`}>
            <p className="tp-title1-semibold">{exportAlbumData.name}</p>
            <p className={`${selectedColor.album.text} tp-body1-regular`}>
              사진 {exportAlbumData.photoCount}장
            </p>
            <ColorIcon
              className="absolute bottom-4 right-4"
              iconColor={exportAlbumData.type}
              size="large"
            />
          </div>
          <div className="flex items-center">
            <div className="flex flex-row items-center gap-2 rounded-full bg-white px-3 py-2">
              <div className="flex flex-row items-center gap-1">
                <HeartBoldMonoColor
                  width={24}
                  height={24}
                  fill={colors.red[500]}
                />
                <p className="tp-body2-semibold text-center text-gray-600">
                  {Number(exportAlbumData.likeCount).toLocaleString()}
                </p>
              </div>
              <div className="h-2.5 w-[1px] border border-gray-400" />
              <div className="flex flex-row items-center gap-1">
                <SecurityEyeIcon width={24} height={24} />
                <p className="tp-body2-semibold text-gray-600">
                  {Number(exportAlbumData.viewCount).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* 하단 고정 영역 */}
        <div className="absolute bottom-0 flex h-[208px] w-full flex-col items-center justify-between rounded-t-3xl bg-white pb-6 pt-14">
          <div
            className="absolute flex flex-row"
            style={{
              height:
                exportAlbumData.sharedMembers.length > 0 ? "80px" : "96px",
              top: exportAlbumData.sharedMembers.length > 0 ? "-40px" : "-48px",
            }}>
            <Image
              src={exportAlbumData.ownerProfileImageUrl}
              alt="profile"
              width={exportAlbumData.sharedMembers.length > 0 ? 80 : 96}
              height={exportAlbumData.sharedMembers.length > 0 ? 80 : 96}
              className="rounded-full border-2 border-white"
            />
            {exportAlbumData.sharedMembers.length > 0 &&
              (exportAlbumData.sharedMembers.length === 1 ? (
                <Image
                  src={exportAlbumData.sharedMembers[0].profileImageUrl}
                  alt="profile"
                  width={80}
                  height={80}
                  className="-z-10 -ml-5 rounded-full border-2 border-white"
                />
              ) : (
                exportAlbumData.sharedMembers
                  .slice(0, 2)
                  .map((sm, idx) => (
                    <Image
                      key={idx}
                      src={sm.profileImageUrl}
                      alt="profile"
                      width={80}
                      height={80}
                      className="-ml-5 rounded-full border-2 border-white"
                      style={{ zIndex: -(idx + 1) }}
                    />
                  ))
              ))}
          </div>
          <div className="flex flex-row items-center">
            <p className="tp-title1-semibold text-gray-800">
              {exportAlbumData.ownerName}
            </p>
            {exportAlbumData.sharedMembers.length > 0 &&
              (exportAlbumData.sharedMembers.length === 1 ? (
                <div className="ml-1.5 flex flex-row gap-1.5">
                  <Icon
                    name={ICON_NAME[exportAlbumData.type]}
                    size={24}
                    color={selectedColor.icon}
                  />
                  <p className="tp-title1-semibold text-gray-600">
                    {exportAlbumData.sharedMembers[0].name}
                  </p>
                </div>
              ) : (
                <p className="tp-title1-semibold text-gray-400">
                  외 {exportAlbumData.sharedMembers.length}명
                </p>
              ))}
          </div>
          <BottomInteractComponent
            exportId={exportId}
            type={exportAlbumData.type}
            isLiked={exportAlbumData.isMeLiked}
          />
        </div>
      </div>
    </div>
  )
}

export default ExportAlbumPage
