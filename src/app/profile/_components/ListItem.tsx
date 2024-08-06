"use client"

import { useRouter } from "next/navigation"

import Button from "@/common/Button"
import Icon from "@/common/Icon"
import { LIST_ITEM_INFO } from "@/constants"
import { isExternalLink, isInternalLink } from "@/libs"
import { useAlert } from "@/store/AlertContext"

interface ItemButtonType {
  label: string
  action?: () => Promise<void> | void
  link?: string
}

export interface ListItemProps {
  title: string
  items: ItemButtonType[]
}

const ListItem = () => {
  const router = useRouter()
  const { showAlert } = useAlert()

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
    <section>
      {LIST_ITEM_INFO.map(({ title, items }, index) => (
        <ul key={`${title}-${index}`}>
          <p className="tp-body2-regular px-[24px] pb-[12px] pt-[16px] text-gray-500">
            {title}
          </p>

          {items.map((item, index) => (
            <li key={index}>
              <Button onClick={() => handleClick(item)} className="w-full">
                <div className="flex h-[54px] w-full items-center justify-between px-6">
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
