"use client"

import Link from "next/link"

import Icon from "@/common/Icon"
import { bottomBarVariants } from "@/styles/variants"

interface BottomBarProps {
  variant: "album" | "scanner" | "profile"
}

export const BottomBar = ({ variant }: BottomBarProps) => {
  return (
    <div className={bottomBarVariants({ variant })}>
      {variant === "album" && <Album />}
      {variant === "scanner" && <Scanner />}
      {variant === "profile" && <Profile />}
    </div>
  )
}

const Album = () => {
  return (
    <>
      <button className="flex flex-col items-center gap-[2px]" disabled>
        <Icon name="albumBold" size={28} color="gray-800" />
        <span className="text-gray-800">내 앨범</span>
      </button>
      <Link href="/scanner">
        <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-gray-100">
          <Icon name="scannerOutline" size={28} color="gray-400" />
        </div>
      </Link>
      <Link href="/profile">
        <button className="flex flex-col items-center gap-[2px]">
          <Icon name="userCircleOutline" size={28} color="gray-400" />
          <span>마이</span>
        </button>
      </Link>
    </>
  )
}

const Scanner = () => {
  return (
    <>
      <Link href="/album">
        <button className="flex flex-col items-center gap-[2px]">
          <Icon name="albumOutline" size={28} color="gray-600" />
          <span>내 앨범</span>
        </button>
      </Link>
      <Link href="/scanner">
        <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white">
          <Icon name="scannerOutline" size={28} color="green-600" />
        </div>
      </Link>
      <Link href="/profile">
        <button className="flex flex-col items-center gap-[2px]">
          <Icon name="userCircleOutline" size={28} color="gray-600" />
          <span>마이</span>
        </button>
      </Link>
    </>
  )
}

const Profile = () => {
  return (
    <>
      <Link href="/album">
        <button className="flex flex-col items-center gap-[2px]">
          <Icon name="albumOutline" size={28} color="gray-400" />
          <span>내 앨범</span>
        </button>
      </Link>
      <Link href="/scanner">
        <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white">
          <Icon name="scannerOutline" size={28} color="green-600" />
        </div>
      </Link>
      <Link href="/profile">
        <button className="flex flex-col items-center gap-[2px]">
          <Icon name="userCircleBold" size={28} color="gray-800" />
          <span className="text-gray-800">마이</span>
        </button>
      </Link>
    </>
  )
}
