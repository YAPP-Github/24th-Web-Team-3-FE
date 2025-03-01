import { AlbumType } from "@/app/album/types"

interface GuestWriteProps {
  type: AlbumType
  value: string
  setValue: (v: string) => void
  nickname: string
  setNickname: (v: string) => void
}

export const GUEST_WRITE_BG_COLOR = {
  HEART: "#FFEDEC",
  FIRE: "#FFFAE1",
  BASKETBALL: "#EEFAE1",
  BUILDING: "#ECF9FF",
  STARFALL: "#F2E8FB",
  SMILE_FACE: "#FFECF9",
}

const GuestWrite = ({
  type,
  value,
  setValue,
  nickname,
  setNickname,
}: GuestWriteProps) => {
  const handleChangeValue = (v: string) => {
    setValue(v)
  }

  return (
    <div
      style={{
        backgroundColor: GUEST_WRITE_BG_COLOR[type],
        maxHeight: 400,
        minWidth: "100%",
      }}
      className="flex h-full w-full flex-col justify-between rounded-3xl p-8 shadow-lg">
      <textarea
        rows={7}
        placeholder="방명록을 작성해주세요"
        value={value}
        onChange={(e) => handleChangeValue(e.target.value)}
        className="tp-display2-semibold break-words bg-transparent focus:outline-none"
      />
      <div className="flex flex-row items-center justify-between">
        <p className="tp-title2-semibold text-gray-700">보낸 이</p>
        <input
          type="text"
          size={5}
          value={nickname}
          onChange={(e) => setNickname(e.target.value)}
          placeholder="내 별명"
          className="tp-title1-semibold rounded-lg bg-gray-100 px-4 py-2 focus:outline-none"
        />
      </div>
    </div>
  )
}

export default GuestWrite
