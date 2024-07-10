import { BottomBar } from "@/common/BottomBar"

import { Albums } from "./_component/Albums"

const AlbumsPage = () => {
  return (
    <>
      <h1 className="w-full p-4 py-[14px] text-header-2 font-bold">내 앨범</h1>
      <Albums />
      <BottomBar variant="album" />
    </>
  )
}

export default AlbumsPage
