'use client'
import React, { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import ParagraphCard from "./ParagraphCard"
import EditionToggle from "./EditionToggle"
import { useEdition } from "./EditionContext"
import { chapterTitle, chapterHref, groupIntoParagraphs, getAllNodes } from "@/lib/confession"

function SearchView({ onBack }) {
  const { edition } = useEdition()
  const [search, setSearch] = useState("")
  const [nodes, setNodes] = useState(null)
  const [failed, setFailed] = useState(false)

  // Search spans all 32 chapters, but a chapter page only ships its own text, so the
  // full confession is fetched the first time search is opened rather than embedded in
  // every prerendered page.
  useEffect(() => {
    let active = true
    getAllNodes()
      .then((data) => active && setNodes(data))
      .catch(() => active && setFailed(true))
    return () => {
      active = false
    }
  }, [])

  const matches = useMemo(() => {
    if (!nodes || search.length < 2) return []
    const needle = search.toLowerCase()
    const keys = new Set(
      nodes
        .filter((node) => node[edition]?.toLowerCase().includes(needle))
        .map((node) => `${node.chapter}-${node.paragraph}`)
    )
    return groupIntoParagraphs(
      nodes.filter((node) => keys.has(`${node.chapter}-${node.paragraph}`))
    )
  }, [nodes, search, edition])

  const showResults = search.length > 1

  return (
    <div className={`min-h-screen pt-8 bg-gray-100 pb-36 flex justify-center text-gray-700 tracking-wide`}>
      <div className={`w-[80vw] max-w-5xl bg-gray-100`}>
        <div className={`flex justify-between`}>
          <div className={`grid place-content-center`}>
            <button className={`text-gray-500 hover:text-gray-800`} onClick={onBack} aria-label="Back to chapters">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </button>
          </div>

          <EditionToggle className={`flex space-x-3`} />
        </div>

        <div className={`mt-6`}>
          <div className="relative">
            <input
              className={`bg-gray-200 py-2 w-full px-2 text-xl`}
              type="text"
              value={search}
              placeholder="search..."
              autoFocus
              onChange={(e) => setSearch(e.target.value)}
            />
            {showResults && (
              <div className="absolute top-0 right-0 h-full flex items-center pr-2 text-sm">
                {`${matches.length} time${matches.length !== 1 ? "s" : ""}`}
              </div>
            )}
          </div>
        </div>

        {failed && <div className="pt-12">Could not load the confession text.</div>}
        {!failed && !nodes && showResults && <div className="pt-12">Loading…</div>}

        {showResults && nodes && (
          matches.length === 0 ? (
            <div className="pt-12">No matches</div>
          ) : (
            <div className={`text-sm md:text-md`}>
              {matches.map((group) => (
                <ParagraphCard
                  key={`${group.chapter}-${group.paragraph}`}
                  chapter={group.chapter}
                  paragraph={group.paragraph}
                  nodes={group.nodes}
                />
              ))}
            </div>
          )
        )}
      </div>
    </div>
  )
}

export default function ChapterMenu({ chapterNumbers }) {
  const [searching, setSearching] = useState(false)

  if (searching) return <SearchView onBack={() => setSearching(false)} />

  return (
    <div className={`min-h-screen bg-gray-100 pb-36 flex justify-center text-gray-700 tracking-wide`}>
      <div className={`relative bg-gray-100 h-full z-20 overflow-auto max-w-[1000px] no-scrollbar w-[100vw] md:w-[50vw]`}>
        <button
          className={`absolute top-5 right-5 text-2xl`}
          onClick={() => setSearching(true)}
          aria-label="Search the confession"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
          </svg>
        </button>

        <div className={`px-2 pt-6 text-gray-700`}>
          <div className={`px-2 pb-36`}>
            <div className={`font-semibold font-serif text-2xl lg:text-3xl text-center pt-8 tracking-wide`}>The 1689 Baptist</div>
            <div className="py-1"></div>
            <div className={`font-semibold font-serif text-2xl lg:text-3xl text-center pb-4 tracking-wide`}>Confession of Faith</div>

            <EditionToggle className={`flex space-x-5 py-3`} buttonClassName={`w-[50%] py-2 tracking-wide`} />

            {chapterNumbers.map((chapterNum) => (
              <div key={chapterNum} className={`flex justify-center`}>
                <div className={`grid grid-cols-12 w-full max-w-[600px] bg-gray-50 ring-1 ring-[#09314C]/20 shadow-md mt-8`}>
                  <div className={`col-span-2 flex justify-center items-center font-bold text-gray-500`}>{chapterNum}</div>
                  <Link href={chapterHref(chapterNum)} className={`col-span-10 cursor-pointer py-2 pr-2`}>
                    {chapterTitle(chapterNum)}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
