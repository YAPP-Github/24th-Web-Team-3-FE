"use client"

import { useRouter } from "next/navigation"

import Button from "@/common/Button"
import Icon from "@/common/Icon"
import { LIST_ITEM_INFO } from "@/constants"

interface ButtonAction {
  label: string
  actionType: "button"
  action: () => Promise<void> | void
}

interface LinkAction {
  label: string
  actionType: "link"
  link: string
}

type ItemButtonType = ButtonAction | LinkAction

export interface ListItemProps {
  title: string
  items: ItemButtonType[]
}

const ListItem = () => {
  const router = useRouter()

  const handleClick = (item: ItemButtonType) => {
    if (item.actionType === "button") {
      item.action()
    } else if (item.actionType === "link") {
      router.push(item.link)
    }
  }

  return (
    <section>
      {LIST_ITEM_INFO.map(({ title, items }, index) => (
        <ul key={`${title}-${index}`}>
          <p className="tp-body2-regular px-[24px] pb-[12px] pt-[16px] text-gray-500">
            {title}
          </p>

          {items.map((item, index) => (
            <li key={index}>
              <Button
                onClick={() => handleClick(item)}
                className="flex h-[54px] w-full items-center justify-between bg-white pl-[32px] pr-[24px]">
                <p className="tp-body1-regular text-gray-600">{item.label}</p>
                <Icon name="arrowRight" size={24} color="gray-500" />
              </Button>
            </li>
          ))}
        </ul>
      ))}
    </section>
  )
}

export default ListItem
