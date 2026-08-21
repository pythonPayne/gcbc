'use client'
import React from "react"
import { EditionProvider } from "@/components/beliefs/EditionContext"
import BeliefsShell from "@/components/beliefs/BeliefsShell"

// Client layout wrapping server-rendered children: it holds the Original/Modern choice
// and the nav-menu chrome, and survives navigation between chapters without remounting.
export default function BeliefsLayout({ children }) {
  return (
    <EditionProvider>
      <BeliefsShell>{children}</BeliefsShell>
    </EditionProvider>
  )
}
