'use client'
import React, { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "@/components/Layout"
import Link from "next/link"
import Image from "next/image"
import { toggleShowMenu } from "@/redux/actions/layout"
import { client, urlFor } from "@/lib/sanity"

async function getCarouselImages() {
  return await client.fetch(`
    *[_type == "carouselPictures"] | order(sortOrder asc) {
      title,
      page,
      sortOrder,
      pic {
        asset ->
      }
    }
  `)
}

export default function Home() {
  const dispatch = useDispatch()
  const showMenu = useSelector((state) => state.layout.showMenu)
  const [carouselImages, setCarouselImages] = useState(null)
  const [currentPosition, setCurrentPosition] = useState(1)
  const carouselRefs = useRef([])
  const [x1, setx1] = useState(0)
  const [x2, setx2] = useState(1)
  const [x3, setx3] = useState(1)

  carouselRefs.current = []

  const whitespace1Percent = 100 * (2 / 3) * (Math.abs(x1) / (x3 - x1))
  const whitespace2Percent = 100 - whitespace1Percent - 100 / 3

  useEffect(() => {
    dispatch(toggleShowMenu(false))
    getCarouselImages().then((data) => {
      setCarouselImages(
        data.map((item, i) => ({
          ...item,
          startPosition: i + 1,
          position: i + 1,
        }))
      )
    })
  }, [])

  const addToRefs = (el) => {
    if (el && !carouselRefs.current.includes(el)) {
      carouselRefs.current.push(el)
    }
  }

  const carouselImage = (position) => {
    const image = carouselImages && carouselImages.find((img) => img.position === position)
    if (!image) return null

    const imageUrl = urlFor(image.pic.asset)
    const overlay = (
      <div className={`absolute top-0 h-full w-full flex flex-col justify-end items-center`}>
        <div className={`flex w-full text-center justify-center px-5 py-4 bg-gray-500/20
          text-gray-50 tracking-wide font-serif text-2xl md:text-4xl md:py-8`}>
          {image.title}
        </div>
      </div>
    )

    const inner = (
      <div className="relative h-full w-full">
        <Image src={imageUrl} alt="carouselPic" fill style={{ objectFit: 'cover' }} />
        {overlay}
      </div>
    )

    return (
      <div
        key={position}
        id={`carouselImage-${position}`}
        ref={addToRefs}
        className={`w-full shrink-0 h-full snap-center relative`}
      >
        {["sermons", "book-studies"].includes(image.page) ? (
          <Link href={`/${image.page}`}>{inner}</Link>
        ) : image.page === "livestream" ? (
          <a href="https://www.sermonaudio.com/player/webcast/gracecovenantbaptist/" target="_blank">{inner}</a>
        ) : (
          inner
        )}
      </div>
    )
  }

  const onClickCarouselButton = (position) => {
    setCurrentPosition(position)
    const element = document.getElementById(`carouselImage-${position}`)
    element.scrollIntoView({ behavior: "smooth", block: "nearest" })
  }

  const updateCarouselRefs = () => {
    setx1(carouselRefs.current[0]?.getBoundingClientRect().x)
    setx2(carouselRefs.current[1]?.getBoundingClientRect().x)
    setx3(carouselRefs.current[2]?.getBoundingClientRect().x)
  }

  return (
    <Layout>
      <div className={`${showMenu && "pointer-events-none"} flex justify-center pt-20 bg-gray-100`}>
        <div>
          <div className={`pb-48 min-h-screen bg-gray-100 flex flex-col items-center justify-center transition-all 
            ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}>

            {/* carousel images */}
            <div
              onScroll={updateCarouselRefs}
              className={`flex shadow-lg ring-gray-800 h-[300px] md:h-[70vh] lg:h-[80vh] w-screen
                relative overflow-x-scroll snap-x snap-mandatory no-scrollbar`}
            >
              {carouselImage(1)}
              {carouselImage(2)}
              {carouselImage(3)}
            </div>

            {/* carousel buttons */}
            <div className={`relative flex mt-4 h-3 w-32 md:w-48 lg:w-64`}>
              <div className={`bg-white`} style={{ width: `${whitespace1Percent}%` }}></div>
              <div className={`w-1/3 bg-[#09314C]`}></div>
              <div className={`bg-white`} style={{ width: `${whitespace2Percent}%` }}></div>
              <div className={`absolute z-10 flex w-full h-full ring-1 ring-gray-200`}>
                <button className={`w-1/3 border-r border-gray-300`} onClick={() => onClickCarouselButton(1)}></button>
                <button className={`w-1/3 border-r border-gray-300`} onClick={() => onClickCarouselButton(2)}></button>
                <button className={`w-1/3`} onClick={() => onClickCarouselButton(3)}></button>
              </div>
            </div>

            <div className={`flex justify-center items-center`}>
              <div className={`max-w-[75%] leading-10 tracking-widest py-10 text-center text-md text-[#09314C]/60
                md:text-2xl md:leading-[4rem] md:py-20`}>
                Grace Covenant Baptist Church exists for its members to
                <span className={`font-bold text-[#09314C]`}> glorify God</span>{" "}
                in their worship both personally and corporately and to equip its members for gospel life 
                and witness as the body of Christ wherever God leads them in His world.
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}