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
        <div className={`transition-all ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}>
          
          {/* Desktop */}
          <div className={`hidden md:block`}>
            <iframe
              className={`h-screen w-screen`}
              src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showPrint=0&src=czl1bml2am9wNmk5NDVxNDZjdm9zNmQ1bzRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D81B60"
              frameBorder="0"
              scrolling="no"
            ></iframe>
          </div>

          {/* Mobile */}
          <div className={`md:hidden flex flex-col items-center justify-center min-h-[80vh] space-y-6 px-8 text-center`}>
            <div className={`font-serif text-2xl text-[#09314C]`}>Church Calendar</div>
            <div className={`text-gray-500`}>Tap the button below to view our calendar in Google Calendar.</div>
            <a href="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showPrint=0&src=czl1bml2am9wNmk5NDVxNDZjdm9zNmQ1bzRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D81B60" target="_blank" className={`bg-[#09314C] text-white px-8 py-4 font-serif tracking-wide`}>
              Open Calendar
            </a>
          </div>

        </div>
      </div>
    </Layout>
  )
}