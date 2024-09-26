"use client"

import { useEffect, useState } from "react"

import { getAlbum } from "@/app/api/photo"

import { AlbumInfo } from "../types"
import { AlbumPhotos } from "./_component/AlbumPhotos"
import { Header } from "./_component/Header"

const AlbumDetailPage = ({ params }: { params: { id: string } }) => {
  const { id } = params
  const [albumInfo, setAlbumInfo] = useState<AlbumInfo>()

  useEffect(() => {
    const initAlbum = async () => {
      const data = await getAlbum(id)
      if (data) {
        setAlbumInfo(data)
      }
    }
    initAlbum()
  }, [id])

  if (!albumInfo) return

  return (
    <>
      <Header albumInfo={albumInfo} className="sticky top-0 z-10" />
      <AlbumPhotos albumInfo={albumInfo} />
    </>
  )
}

export default AlbumDetailPage
