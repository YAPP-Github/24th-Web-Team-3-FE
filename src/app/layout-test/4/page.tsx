import Image from "next/image"

export default function LayoutTest1() {
  const randomFrames = Array.from({ length: 100 }, () => {
    return Math.round(Math.random()) ? <VirticalFrame /> : <HorizonalFrame />
  })
  return <main className="columns-2 gap-8 bg-gray-50">{randomFrames}</main>
}

function VirticalFrame() {
  return (
    <div className="w-full aspect-[3/4] rounded-lg mb-4 relative bg-white">
      <Image
        src="/test-frames/virtical-frame.png"
        alt=""
        fill
        className="object-cover rounded"
      />
    </div>
  )
}

function HorizonalFrame() {
  return (
    <div className="w-full aspect-[3/4] rounded-lg mb-4 relative bg-white">
      <Image
        src="/test-frames/horizontal-frame.png"
        alt=""
        fill
        className="object-cover rounded"
      />
    </div>
  )
}
