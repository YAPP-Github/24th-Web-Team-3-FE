import { Header } from "@/components"

const AlbumLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-dvh flex justify-center bg-gray-500">
      <div className="max-w-[390px] w-full bg-white relative">
        <Header />
        {children}
      </div>
    </div>
  )
}

export default AlbumLayout
