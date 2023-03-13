import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { graphql } from "gatsby"
import { toggleShowMenu } from "../redux/actions/layout"
import Layout from "../components/Layout"
import { SEO } from "../components/seo"

export const query = graphql`
  query MyQuery {
    allSanityCalendar {
      edges {
        node {
          _id
          title
          startDateTime
          endDateTime
          contact
          url
          description
        }
      }
    }
  }
`

const Calendar = ({ data }) => {
  const dispatch = useDispatch()
  const showMenu = useSelector((state) => state.layout.showMenu)
  const [events, setEvents] = useState([])

  useEffect(() => {
    dispatch(toggleShowMenu(false))
  }, [])

  useEffect(() => {
    const temp = data.allSanityCalendar.edges.map((edge) => ({
      ...edge.node,
      d10: edge.node.startDateTime.slice(0, 10),
    }))
    setEvents(temp)
  }, [])

  const calendar_card = (event) => {
    const d = new Date(event.startDateTime)
    if (d > Date.now())
      return (
        <div className={`bg-gray-50 shadow-md ring-1 ring-gray-300 px-3 py-3`}>
          <div className={`font-serif text-md md:text-lg pb-3`}>
            {event.title}
          </div>
          <div className={`text-sm`}>
            {d.toLocaleString(undefined, {
              month: "short",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
            })}
          </div>
        </div>
      )
  }

  return (
    <Layout>
      <div
        page={"calendar"}
        className={`pt-20 flex justify-center bg-gray-100`}
      >
        <div className={`max-w-[1200px]`}>
          <div
            className={`px-6 md:px-12 pt-12 pb-36 min-h-screen flex flex-col justify-center bg-gray-100 transition-all ${
              showMenu ? "blur-sm duration-500" : "blur-none duration-200"
            }`}
          >
            <div className={`flex flex-col items-center `}>
              <div
                className={`py-2 flex justify-center text-[#09314C] 
            text-2xl md:text-3xl lg:text-4xl font-sans font-bold tracking-widest`}
              >
                Upcoming Events
              </div>
              <div
                className={`font-serif text-gray-600 text-md md:text-xl md:pt-4`}
              >
                what's happening?
              </div>
            </div>

            <div className={`border-b-2 border-gray-300 my-6 md:my-8`}></div>

            <div
              className={`py-8 min-h-screen bg-gray-100 transition-all 
            ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}
            >
              <div className={`pb-8 flex flex-col space-y-5`}>
                {events
                  .sort((a, b) => (a.startDateTime < b.startDateTime ? -1 : 1))
                  .map((event) => calendar_card(event))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default Calendar

export const Head = () => <SEO title="calendar" />
