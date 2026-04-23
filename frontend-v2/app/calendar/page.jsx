'use client'
import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleShowMenu } from "@/redux/actions/layout"
import Layout from "@/components/Layout"

export default function Calendar() {
  const dispatch = useDispatch()
  const showMenu = useSelector((state) => state.layout.showMenu)

  useEffect(() => {
    dispatch(toggleShowMenu(false))
    window.scrollTo(0, 0)
  }, [])

  return (
    <Layout>
      <div className={`pt-20 bg-gray-100 min-h-screen ${showMenu && "pointer-events-none"}`}>
        <div className={`max-w-[1200px] transition-all ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}>
          <iframe
            className={`h-screen w-screen`}
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showPrint=0&src=czl1bml2am9wNmk5NDVxNDZjdm9zNmQ1bzRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D81B60"
            frameBorder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </Layout>
  )
}