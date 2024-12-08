"use client"

import { useRouter } from "next/navigation"

import Button from "@/common/Button"
import Icon from "@/common/Icon"
import { LIST_ITEM_INFO } from "@/constants"
import { isExternalLink, isInternalLink } from "@/libs"
import { useAlertStore } from "@/store/alert"

interface ItemButtonType {
  label: string
  action?: () => Promise<void> | void
  link?: string
}

export interface ListItemProps {
  items: ItemButtonType[]
}

const ListItem = () => {
  const router = useRouter()
  const { showAlert } = useAlertStore()

  const handleClick = async (item: ItemButtonType) => {
    if (item.action) {
      await item.action()
    }
    if (item.link) {
      const { link } = item

      if (isExternalLink(link)) {
        window.open(link, "_blank")
      } else if (isInternalLink(link)) {
        router.push(link)
      } else {
        showAlert("알림", "해당 링크는 지원하지 않습니다.")
      }
    }
  }

  return (
    <section className="grow rounded-t-[32px] bg-white pt-[24px]">
      {LIST_ITEM_INFO.map(({ items }, index) => (
        <ul key={`${index}`} className="flex flex-col gap-2">
          {items.map((item, index) => (
            <li key={index}>
              <Button onClick={() => handleClick(item)} className="w-full">
                <div className="flex h-[54px] w-full items-center justify-between pl-[32px] pr-[24px]">
                  <p className="tp-body1-regular text-gray-600">{item.label}</p>
                  <Icon name="arrowRight" size={24} color="gray-500" />
                </div>
              </Button>
            </li>
          ))}

          {LIST_ITEM_INFO.length - 1 !== index && (
            <div className="h-[10px] bg-gray-50"></div>
          )}
        </ul>
      ))}
    </section>
  )
}

export default ListItem
