'use client'
import React, { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleShowMenu } from "@/redux/actions/layout"
import Image from "next/image"
import Layout from "@/components/Layout"
import { client, urlFor } from "@/lib/sanity"

async function getAboutData() {
  const [gcbcs, elders] = await Promise.all([
    client.fetch(`*[_type == "aboutGCBC"] { _id, title, displayText, pic { asset-> } }`),
    client.fetch(`*[_type == "aboutElders"] { _id, title, displayText, pic { asset-> } }`),
  ])
  return { gcbcs, elders }
}

export default function About() {
  const dispatch = useDispatch()
  const showMenu = useSelector((state) => state.layout.showMenu)
  const [gcbcs, setGcbcs] = useState([])
  const [elders, setElders] = useState([])

  useEffect(() => {
    dispatch(toggleShowMenu(false))
    window.scrollTo(0, 0)
    getAboutData().then(({ gcbcs, elders }) => {
      setGcbcs(gcbcs)
      setElders(elders)
    })
  }, [])

  const gcbcCard = (title, order1, order2) => {
    const item = gcbcs.find((g) => g.title === title)
    if (!item) return null
    const image = (
      <div className={`relative shadow-xl h-64 md:h-full rounded md:rounded-lg ${order1} md:order-none`}>
        <Image src={urlFor(item.pic.asset)} alt={title} fill style={{ objectFit: 'cover' }} className="rounded md:rounded-lg" />
      </div>
    )
    const words = (
      <div className={`flex flex-col ${order2} md:order-none pb-28 md:pb-0`}>
        <div className={`text-3xl md:text-4xl font-semibold py-6 text-gray-600`}>{item.title}</div>
        <div className={`leading-[1.8rem] text-[#09314C]/60`}>{item.displayText}</div>
      </div>
    )
    return (
      <React.Fragment key={title}>
        {["Grace", "Baptist"].includes(title) ? <>{image}{words}</> : <>{words}{image}</>}
      </React.Fragment>
    )
  }

  const elderCard = (elder) => {
    if (!elder) return null
    return (
      <React.Fragment key={elder._id}>
        <div className={`relative shadow-xl h-64 md:h-full rounded-lg`}>
          <Image src={urlFor(elder.pic.asset)} alt={elder.title} fill style={{ objectFit: 'cover' }} className="rounded-lg" />
        </div>
        <div className={`flex flex-col pb-32 md:pb-0`}>
          <div className={`text-2xl md:text-3xl font-semibold py-6 text-gray-600`}>{elder.title}</div>
          {elder.title === "Stephen Payne" ? (
            <div className={`leading-[1.8rem] text-[#09314C]/60`}>
              {elder.displayText.replace("Greek NT interlinear website, https://greeknt.netlify.app/.", "")}
              <span>
                <a className="text-blue-500" target="_blank" href="https://greeknt.netlify.app">
                  Greek NT interlinear website
                </a>.
              </span>
            </div>
          ) : (
            <div className={`leading-[1.8rem] text-[#09314C]/60`}>{elder.displayText}</div>
          )}
        </div>
      </React.Fragment>
    )
  }

  return (
    <Layout>
      <div className={`${showMenu && "pointer-events-none"} pt-20 pb-48 md:pb-96 flex justify-center bg-gray-100`}>
        <div className={`max-w-[1200px]`}>
          <div className={`px-6 md:px-12 pt-12 pb-36 min-h-screen flex flex-col justify-center bg-gray-100 transition-all ${
            showMenu ? "blur-sm duration-500" : "blur-none duration-200"
          }`}>

            {/* G C B C */}
            <div className={`flex flex-col items-center`}>
              <div className={`py-2 flex justify-center text-[#09314C] text-4xl md:text-5xl lg:text-6xl font-sans font-bold tracking-widest`}>
                G &nbsp;C &nbsp;B &nbsp;C
              </div>
              <div className={`font-serif text-gray-600 text-lg md:text-xl md:pt-4`}>what's in a name?</div>
            </div>

            <div className={`border-b-2 border-gray-300 my-6 md:my-8`}></div>

            <div className={`flex flex-col pt-4 md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-24 md:pt-12`}>
              {gcbcs.length > 0 && (
                <>
                  {gcbcCard("Grace", "order-1", "order-2")}
                  {gcbcCard("Covenant", "order-3", "order-4")}
                  {gcbcCard("Baptist", "order-5", "order-6")}
                  {gcbcCard("Church", "order-7", "order-8")}
                </>
              )}
            </div>

            <div className={`py-6 md:py-12`}></div>

            {/* OUR ELDERS */}
            <div className={`flex flex-col items-center`}>
              <div className={`py-2 flex justify-center text-[#09314C] text-4xl md:text-6xl font-sans font-bold tracking-widest`}>
                Our Elders
              </div>
            </div>

            <div className={`border-b-2 my-6 md:my-8`}></div>

            <div className={`flex flex-col md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-48 md:pt-12`}>
              {elders.length > 0 && (
                <>
                  {elderCard(elders.find((e) => e.title === "Todd Wilson"))}
                  {elderCard(elders.find((e) => e.title === "Stephen Payne"))}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}