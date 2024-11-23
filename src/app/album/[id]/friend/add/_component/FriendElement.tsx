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
      <div className="flex flex-row gap-2">
        <img
          crossOrigin="anonymous"
          src={imageUrl}
          className="h-[54px] w-[54px] rounded-[50%] border-2 border-white"
          width="54px"
          height="54px"
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
    ? "rounded-[100px] bg-purple-300 px-4 py-1.5 flex justify-center items-center text-purple-600"
    : "rounded-[100px] bg-white px-4 py-1.5 flex justify-center items-center text-purple-600"
  return (
    <button className={buttonProps} onClick={onTapShare}>
      {isShared ? "공유됨" : "공유하기"}
    </button>
  )
}

export default FriendElement
