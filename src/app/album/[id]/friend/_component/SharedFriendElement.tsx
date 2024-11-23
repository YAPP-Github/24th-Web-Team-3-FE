import Image from "next/image"

interface FriendElementProps {
  imageUrl: string
  name: string
  tag: string
  isOwner: boolean
  isManageVisible: boolean
  onTapShare: () => void
}

const SharedFriendElement = ({
  imageUrl,
  name,
  tag,
  isOwner,
  isManageVisible,
  onTapShare,
}: FriendElementProps) => {
  return (
    <div className="flex flex-row items-center justify-between py-2">
      <div className="flex flex-row gap-2">
        <Image
          src={imageUrl}
          className="h-[54px] w-[54px] rounded-[50%] border-2 border-white"
          width={54}
          height={54}
          alt="friend"
        />
        <div className="flex flex-col items-start justify-center">
          <p className="tp-title2-semibold text-gray-800">{name}</p>
          <p className="tp-body2-regular text-gray-500">{tag}</p>
        </div>
      </div>
      {!isOwner && isManageVisible && <ManageButton onTapShare={onTapShare} />}
    </div>
  )
}

const ManageButton = ({ onTapShare }: { onTapShare: () => void }) => {
  return (
    <button
      className="tp-body2-regular flex items-center justify-center rounded-[100px] border border-gray-200 bg-white px-4 py-1.5 text-gray-500"
      onClick={onTapShare}>
      관리
    </button>
  )
}

export default SharedFriendElement
