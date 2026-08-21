'use client'
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { usePathname } from "next/navigation"
import Layout from "@/components/Layout"
import { toggleShowMenu } from "@/redux/actions/layout"

// Every page has to close the nav menu on mount and apply the blur treatment while it
// is open (see CLAUDE.md). This lives in the beliefs layout rather than each page,
// because the layout is shared by /beliefs, /beliefs/[chapter] and
// /beliefs/[chapter]/[paragraph]. Layouts do not remount when navigating between their
// own children, so the dispatch keys off pathname instead of running once.
export default function BeliefsShell({ children }) {
  const dispatch = useDispatch()
  const pathname = usePathname()
  const showMenu = useSelector((state) => state.layout.showMenu)

  useEffect(() => {
    dispatch(toggleShowMenu(false))
  }, [pathname, dispatch])

  return (
    <Layout>
      <div className={`${showMenu && "pointer-events-none"} pt-20 flex justify-center bg-gray-100`}>
        <div className={`max-w-[1200px] w-full`}>
          <div
            className={`transition-all ${showMenu ? "blur-sm duration-500" : "blur-none duration-[0ms]"}`}
          >
            {children}
          </div>
        </div>
      </div>
    </Layout>
  )
}
