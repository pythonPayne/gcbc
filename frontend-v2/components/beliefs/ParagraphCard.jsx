'use client'
import React, { useState } from "react"
import Link from "next/link"
import { useEdition } from "./EditionContext"
import { paragraphHref, paragraphAnchor } from "@/lib/confession"

// A citation is stored as "Reference||verse text".
const citationOf = (ref) => ref.split("||")[0]
const verseTextOf = (ref) => ref.split("||")[1]

const NO_REFERENCE = 99

function ReferenceList({ nodes }) {
  const [openReference, setOpenReference] = useState(null)

  return (
    <div className={`text-sm pt-12 leading-6 relative min-h-[200px]`}>
      {nodes.map((node, i) => {
        if (node.referenceNum === NO_REFERENCE) return null
        return (
          <div key={i} className={`flex ${openReference && "invisible"}`}>
            <div className={`w-4 text-right shrink-0 mr-2`}>
              <sup className={`font-bold`}>{node.referenceNum}</sup>
            </div>
            <div className={`flex flex-wrap`}>
              {node.paragraphRef?.map((item, j, arr) => (
                <div
                  key={j}
                  className="mr-2 hover:cursor-pointer hover:text-blue-800"
                  onClick={() => setOpenReference(item)}
                >
                  {citationOf(item)}
                  {arr.length - 1 !== j && ";"}
                </div>
              ))}
            </div>
          </div>
        )
      })}

      {openReference && (
        <div className="absolute top-0 left-0 pt-12 h-full">
          <div className="flex">
            <div className="grid place-content-center" onClick={() => setOpenReference(null)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4 mr-2 hover:text-blue-800 cursor-pointer">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
              </svg>
            </div>
            <div className="font-semibold">{citationOf(openReference)}</div>
          </div>
          <hr className="border-gray-300 my-1" />
          <div className="text-gray-500 h-full overflow-auto">{verseTextOf(openReference)}</div>
        </div>
      )}
    </div>
  )
}

export default function ParagraphCard({ chapter, paragraph, nodes, highlighted = false }) {
  const { edition } = useEdition()

  return (
    <div
      id={paragraphAnchor(chapter, paragraph)}
      className={`border-b border-gray-300 py-8 leading-8 scroll-mt-24 transition-colors duration-700 ${
        highlighted ? "bg-[#09314C]/5" : ""
      }`}
    >
      <Link
        href={paragraphHref(chapter, paragraph)}
        className={`text-xl font-bold py-2 block w-fit hover:text-blue-800`}
        title="Link to this paragraph"
      >
        {chapter}.{paragraph}
      </Link>

      <p className={`break-words`}>
        {nodes.map((node, i) => (
          <span key={i}>
            {node[edition]?.trim()}
            <sup className={`font-bold`}>
              {node.referenceNum !== NO_REFERENCE && node.referenceNum}
            </sup>
            &nbsp;
          </span>
        ))}
      </p>

      <ReferenceList nodes={nodes} />
    </div>
  )
}
