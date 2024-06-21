import Image from "next/image"

export default function LayoutTest1() {
  // 1. 랜덤 이미지 100개 생성 (가로, 세로)
  const randomFrames = Array.from({ length: 100 }, () => {
    return Math.round(Math.random()) ? <VirticalFrame /> : <HorizonalFrame />
  })
  return <main className="columns-2 gap-8">{randomFrames}</main>
}

function VirticalFrame() {
  return (
    <div className="aspect-[1/3] rounded-lg mb-4 relative">
      <Image src="/test-frames/virtical-frame.png" alt="" fill />
    </div>
  )
}

function HorizonalFrame() {
  return (
    <div className="aspect-[3/2] rounded-lg mb-4 relative">
      <Image src="/test-frames/horizontal-frame.png" alt="" fill />
    </div>
  )
}
