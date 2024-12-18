"use client"

import "./carousel.css"

import { useEffect, useRef, useState } from "react"

const Carousel = () => {
  const initialColors = [
    "first",
    "second",
    "third",
    "fourth",
    "fifth",
    "sixth",
    "seventh",
  ]

  const repeatedColors = Array(3).fill(initialColors).flat()
  const [items, setItems] = useState(repeatedColors)
  const carouselTrackRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const isTransitioningRef = useRef<boolean>(false)

  const ITEM_WIDTH = 125.76 // px
  const GAP = 32 // px
  const TOTAL_MOVE = ITEM_WIDTH + GAP

  const startAutoSlide = () => {
    if (intervalRef.current) return
    intervalRef.current = setInterval(() => {
      slideToNext()
    }, 2000)
  }

  const stopAutoSlide = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }

  const slideToNext = () => {
    if (!carouselTrackRef.current) return

    carouselTrackRef.current.style.transition = "transform 0.4s ease-in-out"
    carouselTrackRef.current.style.transform = `translateX(-${TOTAL_MOVE}px)`

    const current = carouselTrackRef.current.getElementsByClassName(
      "active"
    )[0] as HTMLElement
    const next = carouselTrackRef.current.getElementsByClassName(
      "next"
    )[0] as HTMLElement
    if (current && next) {
      current.style.transform = "scale(1)"
      next.style.transform = "scale(1.36)"
    }
  }

  useEffect(() => {
    if (!carouselTrackRef.current || isTransitioningRef.current) return
    carouselTrackRef.current.style.transition = "none"
    carouselTrackRef.current.style.transform = `translateX(0px)`
  }, [items])

  const handleTransitionEnd = () => {
    if (!carouselTrackRef.current || isTransitioningRef.current) return

    isTransitioningRef.current = true

    const current = carouselTrackRef.current.getElementsByClassName(
      "active"
    )[0] as HTMLElement
    const next = carouselTrackRef.current.getElementsByClassName(
      "next"
    )[0] as HTMLElement
    if (current && next) {
      current.style.transform = "scale(1.36)"
      next.style.transform = "scale(1)"
    }

    void carouselTrackRef.current.offsetWidth

    setTimeout(() => {
      if (carouselTrackRef.current) {
        carouselTrackRef.current.style.transition = "transform 0.5s ease-in-out"
      }

      isTransitioningRef.current = false
    }, 0)

    requestAnimationFrame(() => {
      setItems((prevItems) => {
        const newItems = [...prevItems]
        const firstItem = newItems.shift()
        if (firstItem) {
          newItems.push(firstItem)
        }
        return newItems
      })
    })
  }

  const getItemClass = (index: number) => {
    const mid = Math.floor(items.length / 2)
    if (index === mid) return "carousel active"
    if (index === mid + 1) return "carousel next"
    return "carousel"
  }

  useEffect(() => {
    startAutoSlide()
    return () => stopAutoSlide()
  }, [])

  useEffect(() => {
    const carouselTrack = carouselTrackRef.current
    if (carouselTrack) {
      carouselTrack.addEventListener("transitionend", handleTransitionEnd)
    }

    return () => {
      if (carouselTrack) {
        carouselTrack.removeEventListener("transitionend", handleTransitionEnd)
      }
    }
  }, [items])

  return (
    <div
      className="carousel-container"
      tabIndex={0}
      role="region"
      aria-label="Image Carousel">
      <div
        className="carousel-track"
        ref={carouselTrackRef}
        style={{ transform: `translateX(0px)` }}>
        {items.map((color, index) => {
          return (
            <span
              key={`${color}-${index}`}
              className={`sprite_carousel ${getItemClass(index)} ${color}`}
              role="img"
              aria-label={`${color} item`}
              style={{
                transition: "transform 0.5s ease, scale 0.5s ease",
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Carousel
