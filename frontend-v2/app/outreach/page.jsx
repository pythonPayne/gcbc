'use client'
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleShowMenu } from "@/redux/actions/layout"
import Image from "next/image"
import Layout from "@/components/Layout"
import { client, urlFor } from "@/lib/sanity"

async function getMinistries() {
  return await client.fetch(`*[_type == "outreach"] {
    _id, title, displayText, url, contactName, contactEmail,
    pic { asset-> }
  }`)
}

export default function Outreach() {
  const dispatch = useDispatch()
  const showMenu = useSelector((state) => state.layout.showMenu)
  const [ministries, setMinistries] = useState([])

  useEffect(() => {
    dispatch(toggleShowMenu(false))
    window.scrollTo(0, 0)
    getMinistries().then(setMinistries)
  }, [])

  const ministryCard = (title, order1, order2) => {
    const item = ministries.find((m) => m.title === title)
    if (!item) return null

    const image = (
      <div className={`relative shadow-xl h-64 md:h-full rounded md:rounded-lg ${order1} md:order-none`}>
        <Image src={urlFor(item.pic.asset)} alt={title} fill style={{ objectFit: 'cover' }} className="rounded md:rounded-lg" />
      </div>
    )

    const words = (
      <div className={`flex flex-col ${order2} md:order-none pb-28 md:pb-0`}>
        <div className={`flex space-x-5 items-center`}>
          <a href={item.url} target="_blank" className={`text-3xl md:text-4xl font-semibold py-6 text-gray-600`}>
            {item.title}
          </a>
          <a href={item.url} target="_blank">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} className={`w-6 h-6 text-gray-500 stroke-current`}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
            </svg>
          </a>
        </div>

        {item.title === "Portuguese-Speaking Pastors" && (
          <div className="flex pb-6 text-xl space-x-3 items-center text-[#09314C]">
            <a href="https://give.tithe.ly/?formId=741dec33-6cf6-4290-ac96-4944d6096e92" target="_blank"
              className="font-semibold italic underline decoration-[1px] underline-offset-4 text-blue-700 text-opacity-70 hover:text-blue-800">
              Give $ here
            </a>
          </div>
        )}

        <div className={`leading-[1.8rem] text-[#09314C]/60`}>{item.displayText}</div>

        <div className={`py-3 text-gray-400`}>
          Contact: &nbsp;
          <span>
            <a href={`mailto: ${item.contactEmail}`} className={`text-blue-400 underline`}>
              {item.contactName}
            </a>
          </span>
        </div>
      </div>
    )

    return (
      <React.Fragment key={title}>
        {["Portuguese-Speaking Pastors", "African Christian University", "Alabama Baptist Children's Homes", "Sav-A-Life"].includes(title) ? (
          <>{image}{words}</>
        ) : (
          <>{words}{image}</>
        )}
      </React.Fragment>
    )
  }

  return (
    <Layout>
      <div className={`${showMenu && "pointer-events-none"} pt-20 pb-48 md:pb-96 flex justify-center bg-gray-100`}>
        <div className={`max-w-[1200px]`}>
          <div className={`px-6 md:px-12 pt-12 pb-36 min-h-screen flex flex-col justify-center bg-gray-100 transition-all ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}>

            <div className={`flex flex-col items-center`}>
              <div className={`py-2 flex justify-center text-[#09314C] text-3xl md:text-5xl lg:text-6xl font-sans font-bold tracking-widest`}>
                Outreach
              </div>
              <div className={`font-serif text-gray-600 text-lg md:text-xl md:pt-4`}>
                the ministries we serve
              </div>
            </div>

            <div className={`border-b-2 border-gray-300 my-6 md:my-8`}></div>

            <div className={`flex flex-col pt-4 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-24 md:pt-12`}>
              {ministries.length > 0 && (
                <>
                  {ministryCard("Portuguese-Speaking Pastors", "order-1", "order-2")}
                  {ministryCard("Brother Bryan", "order-3", "order-4")}
                  {ministryCard("African Christian University", "order-5", "order-6")}
                  {ministryCard("African Pastors Conference", "order-7", "order-8")}
                  {ministryCard("Alabama Baptist Children's Homes", "order-9", "order-10")}
                  {ministryCard("Founders Ministries", "order-11", "order-12")}
                  {ministryCard("Sav-A-Life", "order-[13]", "order-[14]")}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}