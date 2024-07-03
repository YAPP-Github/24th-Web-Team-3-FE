"use client"
import { useRouter } from "next/navigation"

import { cn } from "@/utils"

import { Icon } from "./Icon"

interface HeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  type?: "back"
}

export function Header({ type = "back", ...props }: HeaderProps) {
  if (type === "back") {
    return (
      <Container {...props}>
        <Back />
      </Container>
    )
  }
}

function Container({
  className,
  children,
}: React.HTMLAttributes<HTMLHeadElement>) {
  return (
    <header className={cn("w-full h-14 px-4 py-[14px]", className)}>
      {children}
    </header>
  )
}

function Back() {
  const router = useRouter()

  return (
    <Icon name="altArrowLeftOutline" size={28} onClick={() => router.back()} />
  )
}
