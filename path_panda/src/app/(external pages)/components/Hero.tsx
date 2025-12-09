"use client"

import { useEffect, useState } from "react"

export default function Hero() {
  const tagline = "Show, dont tell. Building interactive tours, one step at a time"
  const [typed, setTyped] = useState("")

  useEffect(() => {
    let index = 0
    const interval = setInterval(() => {
      setTyped(tagline.slice(0, index + 1))
      index++
      if (index === tagline.length) clearInterval(interval)
    }, 80) // typing speed
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative bg-[#f9f7fe] py-32 text-center overflow-hidden">
  
      {/* Heading */}
      <h1 className="text-6xl md:text-7xl font-extrabold text-[#2d2d2f] opacity-0 animate-fadeIn">
        Welcome to <span className="text-[#7a5e46]">PathPanda</span>
      </h1>

      {/* Typing Tagline */}
      <p className="mt-6 text-xl md:text-2xl text-[#2d2d2f]/80 font-medium min-h-10">
        {typed}
        <span className="animate-blink">|</span>
      </p>
    </section>
  )
}
