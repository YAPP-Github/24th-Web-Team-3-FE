"use client"

import { useRouter } from "next/navigation"

import Icon from "@/common/Icon"
import { cn } from "@/utils"

export interface HeaderProps {
  className?: string
  friendCount: number
}

export const Header = ({ className, friendCount }: HeaderProps) => {
  const router = useRouter()
  return (
    <header
      className={cn(
        "flex w-full items-center justify-between p-4 py-[14px]",
        className
      )}>
      <button onClick={() => router.back()}>
        <Icon name="altArrowLeftOutline" size={28} />
      </button>
      <div className="tp-title2-semibold text-gray-800">
        함께하는 친구 ({friendCount})
      </div>
      <div className="w-7" />
    </header>
  )
}
