import { BottomBar } from "@/common/BottomBar"

import { Albums } from "./_component/Albums"
import { NewAlbumButton } from "./_component/NewAlbumButton"

const AlbumsPage = () => {
  return (
    <>
      <h1 className="tp-header2-semibold w-full p-4 py-[14px]">내 앨범</h1>
      <Albums />
      <NewAlbumButton />
      <div className="h-[106px]" />
      <BottomBar variant="album" />
    </>
  )
}

export default AlbumsPage
