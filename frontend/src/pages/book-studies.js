import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { graphql } from "gatsby"
import { toggleShowMenu } from "../redux/actions/layout"
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from "../components/Layout"
import { SEO } from "../components/seo"

export const query = graphql`
  query MyQuery {
    allSanityBookStudies {
      edges {
        node {
          _id
          menOrWomen
          location
          startDateTime
          bookType
          title
          author
          cover {
            asset {
              gatsbyImageData(
                layout: CONSTRAINED
                width: 250
                placeholder: BLURRED
              )
            }
          }
          linkToPurchase
        }
      }
    }
  }
`

const BookStudies = ({ data }) => {
  const dispatch = useDispatch()
  const showMenu = useSelector((state) => state.layout.showMenu)

  // temp fix, whlie we update backend to allow for a study to temporarily not be shown
  // let bookStudies = data.allSanityBookStudies.edges.filter(
  //   (item) => item.node.menOrWomen === "men"
  // )
  let bookStudies = data.allSanityBookStudies.edges

  useEffect(() => {
    dispatch(toggleShowMenu(false))
  }, [])

  const bookCard = (node) => {
    const d = new Date(node.startDateTime)
    const weekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    const day = weekday[d.getDay()]
    return (
      <div className={`flex flex-col items-center justify-between`}>
        <div className={`flex flex-col items-center`}>
          <div
            className={`text-3xl font-serif text-gray-500 text-center py-4 lg:py-6`}
          >
            <div>
              Current {node.menOrWomen === "men" ? "Men's " : "Women's "} Study
            </div>
          </div>
          <a href={node.linkToPurchase} target="_blank">
            <GatsbyImage
              className={``}
              image={node.cover.asset["gatsbyImageData"]}
              alt={node.title}
            />
          </a>
        </div>

        <div
          className={`flex flex-col space-y-2 pt-8 lg:pt-0 lg:pb-8 items-center`}
        >
          <div className={`text-lg lg:text-xl text-gray-600`}>
            {d > Date.now() ? "Starting" : "Started"} {d.toLocaleDateString()}
          </div>
          <div className={`text-lg lg:text-xl text-gray-600`}>
            {day}s, {d.toLocaleTimeString([], { timeStyle: "short" })}
          </div>
          <div className={`text-lg lg:text-xl text-gray-600`}>
            at {node.location}
          </div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div
        page={"book-studies"}
        className={`${
          showMenu && "pointer-events-none"
        } pt-20 flex justify-center bg-gray-100`}
      >
        <div className={`max-w-[1200px] pb-96`}>
          <div
            className={`px-8 py-8 min-h-screen bg-gray-100 transition-all 
            ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}
          >
            <div
              className={`flex flex-col space-y-28 lg:max-h-[650px] lg:min-h-[650px] lg:flex-row lg:space-y-0 lg:space-x-64`}
            >
              {/* {bookStudies.map((bookStudy) => bookCard(bookStudy.node))} */}
              Our book studies just finished on 1/30/24. We will begin new men's
              and women's studies very soon and will post them here.
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default BookStudies

export const Head = () => <SEO title="book-studies" />
