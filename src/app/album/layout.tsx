const AlbumLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full min-h-dvh flex justify-center bg-gray-500">
      <div className="max-w-[390px] w-full bg-white relative">{children}</div>
    </div>
  )
}

export default AlbumLayout