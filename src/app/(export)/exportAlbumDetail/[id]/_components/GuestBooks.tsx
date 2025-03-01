import { useEffect, useState } from "react"

import { ExportNoteType, getExportNote } from "@/app/api/album/export"

export const GUEST_WRITE_BG_COLOR = {
  HEART: "#FFEDEC",
  FIRE: "#FFFAE1",
  BASKETBALL: "#EEFAE1",
  BUILDING: "#ECF9FF",
  STARFALL: "#F2E8FB",
  SMILE_FACE: "#FFECF9",
}

const GuestBooks = ({ exportId }: { exportId: string }) => {
  const [guestNotes, setGuestNotes] = useState<ExportNoteType[]>([])

  const fetchGuestNotes = async () => {
    await getExportNote(exportId)
      .then((res) => {
        console.log(res)
        setGuestNotes(res)
      })
      .catch((err) => {
        console.log("fetchGuestNotes error", err)
      })
  }

  useEffect(() => {
    fetchGuestNotes()
  }, [exportId])

  return (
    <div className="flex flex-row flex-wrap px-8 pt-6">
      {guestNotes.length > 0 ? (
        guestNotes.map((note, index) => (
          <div
            key={index}
            className="mb-8 flex w-1/3 flex-col justify-between rounded-xl p-2"
            style={{
              aspectRatio: "6 / 7",
              backgroundColor: GUEST_WRITE_BG_COLOR[note.type],
              transform: `rotate(${index % 2 === 0 ? "-10deg" : "10deg"})`,
            }}>
            <div className="flex flex-1 items-center justify-center">
              <p className="break-words text-center text-[12px] font-bold">
                {note.content}
              </p>
            </div>
            <div className="flex flex-row justify-between">
              <p>보낸 이</p>
              <div className="bg-gray-100 px-1.5 py-0.5">
                <p className="text-[9px] font-semibold">{note.nickname}</p>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div
          className="flex w-full flex-col items-center justify-center py-28"
          style={{ gap: "16px" }}>
          {/* <Icon name="clipboardRemove" size={64} /> */}
          <div className="flex flex-col items-center" style={{ gap: "4px" }}>
            <p className="tp-title1-semibold text-gray-400">
              아직 방명록이 없어요
            </p>
            <p className="tp-body2-regular text-gray-400">
              처음으로 방명록을 작성해볼까요?
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export default GuestBooks
