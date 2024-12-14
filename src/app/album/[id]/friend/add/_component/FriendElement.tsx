import Image from "next/image"

interface FriendElementProps {
  imageUrl: string
  name: string
  tag: string
  isShared: boolean
  onTapShare: () => void
}

const FriendElement = ({
  imageUrl,
  name,
  tag,
  isShared,
  onTapShare,
}: FriendElementProps) => {
  return (
    <div className="flex flex-row items-center justify-between py-2">
      <div className="flex flex-row gap-3">
        <Image
          crossOrigin="anonymous"
          src={imageUrl}
          className="h-[48px] w-[48px] rounded-[50%]"
          width={48}
          height={48}
          alt="friend"
        />
        <div className="flex flex-col items-start justify-center">
          <p className="tp-title2-semibold text-gray-800">{name}</p>
          <p className="tp-body2-regular text-gray-500">{tag}</p>
        </div>
      </div>
      <SharedButton isShared={isShared} onTapShare={onTapShare} />
    </div>
  )
}

const SharedButton = ({
  isShared,
  onTapShare,
}: {
  isShared: boolean
  onTapShare: () => void
}) => {
  const buttonProps = isShared
    ? "rounded-[100px] bg-gray-100 px-4 py-1.5 flex justify-center items-center text-gray-400 mix-blend-multiply"
    : "rounded-[100px] bg-white px-4 py-1.5 flex justify-center items-center text-gray-700 tp-body2-regular"
  return (
    <button className={buttonProps} onClick={onTapShare}>
      {isShared ? "공유됨" : "공유하기"}
    </button>
  )
}

export default FriendElement
