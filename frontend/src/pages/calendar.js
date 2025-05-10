import React from "react"
import Layout from "../components/Layout"
import { SEO } from "../components/seo"

const Calendar = () => {
  return (
    <Layout>
      <div page={"calendar"} className={`pt-20 bg-gray-100 min-h-screen`}>
        <div className={`max-w-[1200px]`}>
          <iframe
            className={`h-screen w-screen`}
            src="https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showPrint=0&src=czl1bml2am9wNmk5NDVxNDZjdm9zNmQ1bzRAZ3JvdXAuY2FsZW5kYXIuZ29vZ2xlLmNvbQ&color=%23D81B60"
            frameborder="0"
            scrolling="no"
          ></iframe>
        </div>
      </div>
    </Layout>
  )
}

export default Calendar

export const Head = () => <SEO title="calendar" />
