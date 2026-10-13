'use client'
import React, { useId, useRef, useState } from "react"
import Link from "next/link"
import { useEdition } from "./EditionContext"
import VersePopover, { makeRoomBelow } from "./VersePopover"
import { paragraphHref, paragraphAnchor } from "@/lib/confession"

// A citation is stored as "Reference||verse text". Empty strings are skipped as a
// safeguard; the only ones in the data today sit on NO_REFERENCE segments, which are
// skipped anyway (see TODO.md).
const citationOf = (ref) => ref.split("||")[0]
const verseTextOf = (ref) => ref.split("||")[1] ?? ""

const NO_REFERENCE = 99

// Marks the elements that open a verse. Clicks on them inside this card switch or toggle
// the popover rather than counting as a click outside it.
const TRIGGER = "data-verse-trigger"

// Group the paragraph's citations by footnote number for the list, while giving each one
// an index into a single flat list that the list buttons and the popover share.
function collectCitations(nodes) {
  const rows = []
  const flat = []
  for (const node of nodes) {
    if (node.referenceNum === NO_REFERENCE) continue
    const items = (node.paragraphRef ?? []).filter(citationOf).map((ref) => {
      const item = {
        index: flat.length,
        referenceNum: node.referenceNum,
        citation: citationOf(ref),
        text: verseTextOf(ref),
      }
      flat.push(item)
      return item
    })
    if (items.length) rows.push({ referenceNum: node.referenceNum, items })
  }
  return { rows, flat }
}

function ReferenceList({ rows, open, popoverId, buttonRefs, onCitationClick }) {
  return (
    <div className={`text-sm pt-12 leading-6`}>
      {rows.map((row) => (
        <div key={row.referenceNum} className={`flex`}>
          <div className={`w-4 text-right shrink-0 mr-2`}>
            <sup className={`font-bold`}>{row.referenceNum}</sup>
          </div>
          <div className={`flex flex-wrap`}>
            {row.items.map((item, j) => {
              const isOpen = open?.index === item.index
              return (
                <div key={item.index} className="mr-2">
                  <button
                    ref={(element) => (buttonRefs.current[item.index] = element)}
                    {...{ [TRIGGER]: "" }}
                    type="button"
                    aria-haspopup="dialog"
                    aria-expanded={isOpen}
                    aria-controls={isOpen ? popoverId : undefined}
                    className={`text-[#09314C] underline underline-offset-4 hover:text-blue-800 hover:decoration-solid hover:decoration-blue-800 cursor-pointer ${
                      isOpen ? "decoration-solid bg-[#09314C]/10" : "decoration-dotted decoration-[#09314C]/40"
                    }`}
                    title="Read this verse"
                    onClick={() => onCitationClick(item.index)}
                  >
                    {item.citation}
                  </button>
                  {row.items.length - 1 !== j && ";"}
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}

export default function ParagraphCard({ chapter, paragraph, nodes, highlighted = false }) {
  const { edition } = useEdition()
  const { rows, flat } = collectCitations(nodes)
  const firstCitationOf = (referenceNum) => flat.findIndex((c) => c.referenceNum === referenceNum)

  // open: { index, from, anchor, placement } -- which citation is open; whether it was
  // opened from the paragraph text or the citation list; the element the popover points
  // at; and which side of it the popover opens on.
  //
  // Prev/next stay within the open footnote's citations (note 1 of 1.1 steps through its
  // 4, not the paragraph's 11). Opened from the list, the popover points at each citation
  // as prev/next reaches it. Opened from the text, it points at the footnote number ending
  // the highlighted sentence -- below it, so the sentence stays readable.
  const [open, setOpen] = useState(null)
  const cardRef = useRef(null)
  const citationRefs = useRef([])
  const footnoteRefs = useRef({})
  // Where focus goes back to on close; follows prev/next.
  const returnFocusRef = useRef(null)
  const popoverId = useId()
  const activeReferenceNum = open ? flat[open.index].referenceNum : null
  const footnoteCitations = flat.filter((c) => c.referenceNum === activeReferenceNum)

  const openAt = (index, from) => {
    const anchor =
      from === "text" ? footnoteRefs.current[flat[index].referenceNum] : citationRefs.current[index]
    returnFocusRef.current = anchor
    setOpen({ index, from, anchor, placement: makeRoomBelow(anchor) })
  }

  const onCitationClick = (index) =>
    open?.index === index && open.from === "list" ? setOpen(null) : openAt(index, "list")

  const onSentenceClick = (referenceNum) => {
    // Dragging to select text ends in a click; leave the selection alone.
    if (window.getSelection()?.toString()) return
    if (open?.from === "text" && activeReferenceNum === referenceNum) setOpen(null)
    else openAt(firstCitationOf(referenceNum), "text")
  }

  return (
    <div
      ref={cardRef}
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
        {nodes.map((node, i) => {
          const cited = firstCitationOf(node.referenceNum) !== -1
          const isActive = node.referenceNum === activeReferenceNum
          return (
            <span key={i}>
              {/* A sentence with citations opens its first one; the active one is tinted.
                  py-2 stretches each line of the sentence over the full leading-8 line
                  height, so the gap between lines is the sentence too rather than the <p>:
                  otherwise a press there counts as outside the popover while a phone
                  snaps the tap onto the sentence, which closed and reopened it.
                  bg-clip-content keeps the tint on the words, out of that padding. */}
              <span
                {...(cited && { [TRIGGER]: "", onClick: () => onSentenceClick(node.referenceNum) })}
                className={`py-2 bg-clip-content transition-colors duration-300 box-decoration-clone ${
                  isActive ? "bg-[#09314C]/10" : cited ? "cursor-pointer hover:bg-[#09314C]/5" : ""
                }`}
              >
                {node[edition]?.trim()}
                <sup className={`font-bold`}>
                  {cited ? (
                    // The keyboard route to the same thing; its click bubbles to the
                    // sentence's handler.
                    <button
                      ref={(element) => (footnoteRefs.current[node.referenceNum] = element)}
                      type="button"
                      aria-haspopup="dialog"
                      aria-expanded={isActive && open.from === "text"}
                      aria-label={`Scripture for note ${node.referenceNum}`}
                      // leading-none: <sup> has line-height 0, which the button would
                      // inherit and collapse to zero height -- unclickable, and a bad anchor.
                      className={`font-bold px-0.5 leading-none cursor-pointer hover:text-blue-800`}
                    >
                      {node.referenceNum}
                    </button>
                  ) : (
                    node.referenceNum !== NO_REFERENCE && node.referenceNum
                  )}
                </sup>
              </span>
              &nbsp;
            </span>
          )
        })}
      </p>

      <ReferenceList
        rows={rows}
        open={open}
        popoverId={popoverId}
        buttonRefs={citationRefs}
        onCitationClick={onCitationClick}
      />

      {open && (
        <VersePopover
          id={popoverId}
          citations={footnoteCitations}
          index={footnoteCitations.findIndex((c) => c.index === open.index)}
          anchor={open.anchor}
          placement={open.placement}
          isTrigger={(target) => cardRef.current?.contains(target) && target.closest(`[${TRIGGER}]`)}
          onNavigate={(position) => openAt(footnoteCitations[position].index, open.from)}
          onClose={(reason) => {
            setOpen(null)
            // Done here rather than by FloatingFocusManager's returnFocus, which also fires
            // whenever prev/next re-anchors the popover and so threw focus out of it. A
            // click elsewhere keeps focus where the click put it.
            if (reason !== "outside-press") returnFocusRef.current?.focus()
          }}
        />
      )}
    </div>
  )
}
