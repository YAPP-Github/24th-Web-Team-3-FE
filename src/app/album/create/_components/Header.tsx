"use client"
import { useRouter } from "next/navigation"

import Icon from "@/common/Icon"
import { cn } from "@/utils"

interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  type?: "back"
}

export function Header({ type = "back", ...props }: HeaderProps) {
  if (type !== "back") {
    return null
  }

  return (
    <Container {...props}>
      <Back />
    </Container>
  )
}

function Container({
  className,
  children,
}: React.HTMLAttributes<HTMLHeadElement>) {
  return (
    <header className={cn("h-14 w-full px-4 py-[14px]", className)}>
      {children}
    </header>
  )
}

function Back() {
  const router = useRouter()

  return (
    <button onClick={() => router.back()}>
      <Icon name="altArrowLeftOutline" size={28} />
    </button>
  )
}
