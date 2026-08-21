'use client'
import React from "react"
import { useEdition, ORIGINAL, MODERN } from "./EditionContext"

const selected = "bg-[#09314C]/70 text-white"
const unselected = "bg-gray-100 text-gray-700 border-2 border-gray-300"

export default function EditionToggle({ className = "", buttonClassName = "py-2 px-2 tracking-wide text-xs" }) {
  const { edition, setEdition } = useEdition()

  return (
    <div className={className}>
      <button
        className={`${buttonClassName} ${edition === ORIGINAL ? selected : unselected}`}
        onClick={() => setEdition(ORIGINAL)}
      >
        Original
      </button>
      <button
        className={`${buttonClassName} ${edition === MODERN ? selected : unselected}`}
        onClick={() => setEdition(MODERN)}
      >
        Modern
      </button>
    </div>
  )
}
