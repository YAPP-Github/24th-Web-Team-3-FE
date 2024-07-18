"use client"

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { AlbumValue } from "@/app/album/types"
import AlbumItem from "@/common/AlbumItem"
import Button from "@/common/Button"

import { useGetAlbums, usePatchPhotoAlbum } from "../hooks/usePhoto"
import { Header } from "./_component/Header"

const ScannerSelectAlbumPage = () => {
  const { albums } = useGetAlbums()
  const [albumData, setAlbumData] = useState<AlbumValue[] | null>()
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumValue | null>(null)
  const searchParams = useSearchParams()
  const { patchPhotoAlbum } = usePatchPhotoAlbum()

  const photoId = searchParams.get("photoId")
  const router = useRouter()

  const handleSelectAlbum = (idx: number) => {
    if (!albumData) return

    if (selectedAlbum && albumData[idx].albumId === selectedAlbum.albumId) {
      setSelectedAlbum(null)
      return
    }

    const nextAlbums = albumData?.map((album, i) =>
      i !== idx
        ? { ...album, isSelected: false }
        : { ...album, isSelected: true }
    )
    setSelectedAlbum(albumData[idx])
    setAlbumData(nextAlbums)
  }

  const onSubmit = async () => {
    if (!selectedAlbum?.albumId || !photoId) return
    const { albumId } = selectedAlbum

    patchPhotoAlbum({ photoId, albumId })
    router.push(`/album/${albumId}`)
  }

  useEffect(() => {
    if (!albums) return

    const albumArray = albums.map((v) => {
      return {
        ...v,
        photoCount: Number(v.photoCount),
        isNew: false,
        isSelected: false,
        isEditable: false,
      }
    }) as AlbumValue[]
    setAlbumData(albumArray)
  }, [albums])

  if (!albumData) {
    return <></>
  }
  return (
    <main className="relative h-dvh w-full">
      <Header />
      <section className="flex w-full flex-wrap justify-between gap-y-4 p-6">
        {albumData.map((album, i) => (
          <AlbumItem
            key={i}
            value={album}
            handleValue={() => {}}
            className="aspect-[164/150] w-[calc((100%-1rem)/2)]"
            onClick={() => handleSelectAlbum(i)}
          />
        ))}
      </section>
      <div className="absolute bottom-0 w-full p-6 pb-11 pt-3">
        {selectedAlbum ? (
          <Button className="w-full" onClick={onSubmit}>
            선택한 앨범에 추가하기
          </Button>
        ) : (
          <Button className="w-full" disabled>
            앨범을 선택해주세요
          </Button>
        )}
      </div>
    </main>
  )
}

export default ScannerSelectAlbumPage
