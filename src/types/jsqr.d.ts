// src/types/jsqr.d.ts
declare module "jsqr" {
  interface Point {
    x: number
    y: number
  }

  interface QRCode {
    binaryData: Uint8ClampedArray
    data: string
    location: {
      bottomLeftCorner: Point
      bottomRightCorner: Point
      topLeftCorner: Point
      topRightCorner: Point
    }
  }

  function jsQR(
    data: Uint8ClampedArray,
    width: number,
    height: number,
    options?: {
      inversionAttempts?: "attemptBoth" | "dontInvert" | "onlyInvert"
    }
  ): QRCode | null

  export default jsQR
}
