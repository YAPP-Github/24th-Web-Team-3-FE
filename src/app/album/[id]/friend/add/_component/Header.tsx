"use client"

import { useRouter } from "next/navigation"

import Icon from "@/common/Icon"
import { cn } from "@/utils"

interface HeaderProps {
  className?: string
}

export const Header = ({ className }: HeaderProps) => {
  const router = useRouter()
  return (
    <header
      className={cn(
        "flex h-14 w-full items-center justify-between p-4 py-[14px]",
        className
      )}>
      <button onClick={() => router.back()}>
        <Icon name="altArrowLeftOutline" size={28} />
      </button>
      <div />
    </header>
  )
}
