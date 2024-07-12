"use client"
import { useRouter } from "next/navigation"

import Icon from "@/common/Icon"

export const Header = () => {
  const router = useRouter()
  return (
    <header className="w-full p-4 py-[14px]">
      <Icon
        name="altArrowLeftOutline"
        size={28}
        color="gray-800"
        onClick={() => router.back()}
      />
    </header>
  )
}
