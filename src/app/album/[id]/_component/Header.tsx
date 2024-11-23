"use client"

import { useRouter } from "next/navigation"

import Icon from "@/common/Icon"
import { ICON_COLOR_STYLE, ICON_NAME } from "@/constants"
import { albumDetailHeaderVariants as headerVariants } from "@/styles/variants"
import { cn } from "@/utils"

import { AlbumInfo } from "../../types"

interface HeaderProps {
  albumInfo: AlbumInfo
  className?: string
  onTapMenu: () => void
}

export const Header = ({ albumInfo, className, onTapMenu }: HeaderProps) => {
  const router = useRouter()
  if (!albumInfo) {
    return <header className={cn(headerVariants())}></header>
  }

  return (
    <header className={cn(headerVariants({ type: albumInfo.type }), className)}>
      <button onClick={() => router.back()}>
        <Icon name="altArrowLeftOutline" size={28} />
      </button>
      <div className="tp-title2-semibold flex items-center gap-1 text-gray-800">
        <Icon
          name={ICON_NAME[albumInfo.type]}
          color={ICON_COLOR_STYLE[albumInfo.type]}
          size={28}
        />
        {albumInfo.name}
      </div>
      <button className="tp-body1-regular text-gray-800" onClick={onTapMenu}>
        <Icon name="hamburger" size={28} />
      </button>
    </header>
  )
}
