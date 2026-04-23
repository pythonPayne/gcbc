'use client'
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleShowMenu } from "@/redux/actions/layout"
import Image from "next/image"
import Layout from "@/components/Layout"
import { client, urlFor } from "@/lib/sanity"

async function getBookStudies() {
  return await client.fetch(`*[_type == "bookStudies"] {
    _id, menOrWomen, location, startDateTime,
    bookType, title, author, linkToPurchase,
    cover { asset-> }
  }`)
}

export default function BookStudies() {
  const dispatch = useDispatch()
  const showMenu = useSelector((state) => state.layout.showMenu)
  const [bookStudies, setBookStudies] = useState([])

  useEffect(() => {
    dispatch(toggleShowMenu(false))
    getBookStudies().then(setBookStudies)
  }, [])

  const bookCard = (node) => {
    const d = new Date(node.startDateTime)
    return (
      <div className={`flex flex-col items-center justify-between`}>
        <div className={`flex flex-col items-center`}>
          <div className={`text-3xl font-serif text-gray-500 text-center py-4 lg:py-6`}>
            <div>Current {node.menOrWomen === "men" ? "Men's " : "Women's "} Study</div>
          </div>
          <a href={node.linkToPurchase} target="_blank">
            <div className="relative w-[250px] h-[350px]">
              <Image
                src={urlFor(node.cover.asset)}
                alt={node.title}
                fill
                style={{ objectFit: 'contain' }}
              />
            </div>
          </a>
        </div>

        <div className={`flex flex-col space-y-2 pt-8 lg:pt-0 lg:pb-8 items-center`}>
          <div className={`text-lg lg:text-xl text-gray-600`}>
            {d > Date.now() ? "Starting" : "Started"} {d.toLocaleDateString()}
          </div>
          <div className={`text-lg lg:text-xl text-gray-600`}>
            {node.menOrWomen === "men" ? "Every other Thursday, 6:30 PM" : "Every other Thursday, 6:30 PM"}
          </div>
          <div className={`text-lg lg:text-xl text-gray-600`}>at {node.location}</div>
        </div>
      </div>
    )
  }

  return (
    <Layout>
      <div className={`${showMenu && "pointer-events-none"} pt-20 flex justify-center bg-gray-100`}>
        <div className={`max-w-[1200px] pb-96`}>
          <div className={`px-8 py-8 min-h-screen bg-gray-100 transition-all ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}>
            <div className={`flex flex-col space-y-28 lg:max-h-[650px] lg:min-h-[650px] lg:flex-row lg:space-y-0 lg:space-x-64`}>
              {bookStudies.map((study) => (
                <div key={study._id}>{bookCard(study)}</div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}