"use client"

import Link from "next/link"

import Icon from "@/common/Icon"
import { bottomBarVariants } from "@/styles/variants"

import Button from "./Button"

interface BottomBarProps {
  variant: "album" | "scanner" | "profile"
}
const TAB_ITEM_CLASSNAME =
  "flex h-[54px] w-[54px] flex-col items-center justify-center gap-[2px]"

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
      <Button className={TAB_ITEM_CLASSNAME} disabled>
        <Icon name="albumBold" size={28} color="gray-800" />
        <span className="text-gray-800">내 앨범</span>
      </Button>
      <Link href="/scanner">
        <Button className="rounded-full" tabIndex={-1}>
          <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-gray-100">
            <Icon name="scannerOutline" size={28} color="gray-400" />
          </div>
        </Button>
      </Link>
      <Link href="/profile">
        <Button className="rounded-lg" tabIndex={-1}>
          <div className={TAB_ITEM_CLASSNAME}>
            <Icon name="userCircleOutline" size={28} color="gray-400" />
            <span>마이</span>
          </div>
        </Button>
      </Link>
    </>
  )
}

const Scanner = () => {
  return (
    <>
      <Link href="/album">
        <Button className="rounded-lg" tabIndex={-1}>
          <div className={TAB_ITEM_CLASSNAME}>
            <Icon name="albumBold" size={28} color="gray-400" />
            <span>내 앨범</span>
          </div>
        </Button>
      </Link>
      <Button className="rounded-full" disabled>
        <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-white">
          <Icon name="scannerOutline" size={28} color="green-600" />
        </div>
      </Button>
      <Link href="/profile">
        <Button className="rounded-lg" tabIndex={-1}>
          <div className={TAB_ITEM_CLASSNAME}>
            <Icon name="userCircleOutline" size={28} color="gray-400" />
            <span>마이</span>
          </div>
        </Button>
      </Link>
    </>
  )
}

const Profile = () => {
  return (
    <>
      <Link href="/album">
        <Button className="rounded-lg" tabIndex={-1}>
          <div className={TAB_ITEM_CLASSNAME}>
            <Icon name="albumOutline" size={28} color="gray-400" />
            <span>내 앨범</span>
          </div>
        </Button>
      </Link>
      <Link href="/scanner">
        <Button className="rounded-full" tabIndex={-1}>
          <div className="flex h-[54px] w-[54px] items-center justify-center rounded-full bg-gray-100">
            <Icon name="scannerOutline" size={28} color="gray-400" />
          </div>
        </Button>
      </Link>
      <Button className="rounded-lg" disabled>
        <div className={TAB_ITEM_CLASSNAME}>
          <Icon name="userCircleBold" size={28} color="gray-800" />
          <span className="text-gray-800">마이</span>
        </div>
      </Button>
    </>
  )
}
