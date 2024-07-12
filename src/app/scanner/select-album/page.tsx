"use client"

import { useSearchParams } from "next/navigation"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

import { AlbumValue } from "@/app/album/types"
import { getAlbums, patchPhotoAlbum } from "@/app/api/photo"
import AlbumItem from "@/common/AlbumItem"
import Button from "@/common/Button"

import { Header } from "./_component/Header"

const ScannerSelectAlbumPage = () => {
  const [albums, setAlbums] = useState<AlbumValue[] | null>(null)
  const [selectedAlbum, setSelectedAlbum] = useState<AlbumValue | null>(null)
  const searchParams = useSearchParams()
  const photoId = searchParams.get("photoId")
  const router = useRouter()

  const handleSelectAlbum = (idx: number) => {
    if (!albums) return

    if (selectedAlbum && albums[idx].albumId === selectedAlbum.albumId) {
      setSelectedAlbum(() => null)
      return
    }

    const nextAlbums = albums?.map((album, i) =>
      i !== idx
        ? { ...album, isSelected: false }
        : { ...album, isSelected: true }
    )
    setSelectedAlbum(() => albums[idx])
    setAlbums(() => nextAlbums)
  }

  const onSubmit = async () => {
    if (!selectedAlbum || !photoId) return

    const { albumId } = await patchPhotoAlbum(photoId, selectedAlbum.albumId!)
    router.push(`/album/${albumId}`)
  }

  useEffect(() => {
    const initAlbums = async () => {
      const data = await getAlbums()
      const albums = data.map((v) => {
        return {
          ...v,
          photoCount: Number(v.photoCount),
          isNew: false,
          isSelected: false,
          isEditable: false,
        }
      }) as AlbumValue[]
      setAlbums(() => albums)
    }
    initAlbums()
  }, [])

  if (!albums) {
    return <></>
  }
  return (
    <main className="relative h-dvh w-full">
      <Header />
      <section className="flex w-full flex-wrap justify-between gap-y-4 p-6">
        {albums.map((album, i) => (
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