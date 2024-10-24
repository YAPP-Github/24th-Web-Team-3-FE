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

export function fullDateStr() {
  const today = new Date()
  return `${today.getFullYear()}${today.getMonth() + 1}${today.getDate()}`
}

export const base64ToBlob = (base64Data: string, contentType: string): Blob => {
  const byteCharacters = atob(base64Data)
  const byteNumbers = new Array(byteCharacters.length)
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i)
  }
  const byteArray = new Uint8Array(byteNumbers)
  return new Blob([byteArray], { type: contentType })
}

export const blobToFile = (blob: Blob, fileName: string): File => {
  return new File([blob], fileName, { type: blob.type })
}

export const buildCancelableTask = <T>(asyncFn: () => Promise<T>) => {
  let rejected = false
  const { promise, resolve, reject } = Promise.withResolvers<T>()

  return {
    run: () => {
      if (!rejected) {
        asyncFn().then(resolve, reject)
      }

      return promise
    },

    cancel: () => {
      rejected = true
      reject(new Error("CanceledError"))
    },
  }
}
