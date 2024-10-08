import { recapColorVariants } from "@/styles/variants"
import { cn } from "@/utils"

import { AlbumType } from "../../types"

interface RecapContainerProps {
  type: AlbumType
}

const RecapContainer = ({ type }: RecapContainerProps) => {
  return (
    <div
      className={cn(
        recapColorVariants({ type }),
        "h-[680px] w-[390px] rounded-[24px]"
      )}></div>
  )
}
export default RecapContainer
