import { type ClassValue, clsx } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

const customTWMerge = extendTailwindMerge<"font-size">({
  extend: {
    classGroups: {
      "font-size": [
        "text-display-1",
        "text-display-2",
        "text-header-1",
        "text-header-2",
        "text-title-1",
        "text-title-2",
        "text-body-1",
        "text-body-2",
        "text-caption-1",
        "text-caption-2",
      ],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return customTWMerge(clsx(inputs))
}
