'use client'
import React, { useEffect } from "react"
import Link from "next/link"
import ParagraphCard from "./ParagraphCard"
import EditionToggle from "./EditionToggle"
import { chapterTitle, chapterHref, paragraphAnchor } from "@/lib/confession"

export default function ChapterView({ chapter, groups, totalChapters, targetParagraph = null }) {
  const previousChapter = chapter !== 1 ? chapter - 1 : totalChapters
  const nextChapter = chapter !== totalChapters ? chapter + 1 : 1

  // Deep links land on the chapter page and scroll the requested paragraph into view.
  // scroll-mt-24 on the card keeps it clear of the fixed header.
  useEffect(() => {
    if (!targetParagraph) return
    const element = document.getElementById(paragraphAnchor(chapter, targetParagraph))
    if (element) element.scrollIntoView({ behavior: "smooth", block: "start" })
  }, [chapter, targetParagraph])

  return (
    <div className={`min-h-screen pt-8 bg-gray-100 pb-36 flex justify-center text-gray-700 tracking-wide`}>
      <div className={`w-[80vw] max-w-5xl bg-gray-100`}>
        <div className={`flex justify-between`}>
          <div className={`flex space-x-3`}>
            <Link
              href={chapterHref(previousChapter)}
              className={`text-gray-500 text-xl hover:text-gray-800`}
              aria-label={`Chapter ${previousChapter}`}
            >
              {"<"}
            </Link>
            <Link href="/beliefs" className={`text-gray-500 hover:text-gray-800`} aria-label="All chapters">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </Link>
            <Link
              href={chapterHref(nextChapter)}
              className={`text-gray-500 text-xl hover:text-gray-800`}
              aria-label={`Chapter ${nextChapter}`}
            >
              {">"}
            </Link>
          </div>

          <EditionToggle className={`flex space-x-3`} />
        </div>

        <div className={`mt-6`}>
          <div className={`font-semibold text-4xl text-gray-800 py-2`}>{`Chapter ${chapter}`}</div>
          <div className={`text-2xl text-gray-600 font-serif`}>{chapterTitle(chapter)}</div>
        </div>

        <div className={`text-sm md:text-md`}>
          {groups.map((group) => (
            <ParagraphCard
              key={`${group.chapter}-${group.paragraph}`}
              chapter={group.chapter}
              paragraph={group.paragraph}
              nodes={group.nodes}
              highlighted={group.paragraph === targetParagraph}
            />
          ))}
        </div>

        <div className={`flex justify-between pt-12`}>
          {chapter > 1 ? (
            <Link href={chapterHref(chapter - 1)} className={`border border-gray-300 text-xl px-3 py-1 cursor-pointer`}>
              {`< Ch. ${chapter - 1}`}
            </Link>
          ) : (
            <div></div>
          )}

          {chapter < totalChapters ? (
            <Link href={chapterHref(chapter + 1)} className={`border border-gray-300 text-xl px-3 py-1 cursor-pointer`}>
              {`Ch. ${chapter + 1} >`}
            </Link>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </div>
  )
}
