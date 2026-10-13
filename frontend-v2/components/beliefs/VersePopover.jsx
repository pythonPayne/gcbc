'use client'
import { useEffect, useId, useLayoutEffect, useRef, useState } from "react"
import {
  useFloating,
  autoUpdate,
  offset,
  shift,
  size,
  arrow,
  useDismiss,
  useRole,
  useInteractions,
  FloatingArrow,
  FloatingPortal,
  FloatingFocusManager,
} from "@floating-ui/react"

// Room the popover needs below its citation before the page is scrolled to make some.
const MIN_ROOM_BELOW = 320

// The popover always opens below its citation: above it would cover the paragraph, which
// is where the cited sentence is highlighted. When the citation sits too low on screen
// for that, scroll the page up first rather than flipping the popover. Only when the page
// cannot scroll far enough -- the last paragraph of a chapter -- does it open above.
// Returns the placement to use.
export function makeRoomBelow(element) {
  const shortfall = MIN_ROOM_BELOW - (window.innerHeight - element.getBoundingClientRect().bottom)
  if (shortfall <= 0) return "bottom"
  const scrollable = document.documentElement.scrollHeight - window.innerHeight - window.scrollY
  // Instant, not smooth: the popover focuses its close button as it opens, and the
  // browser cancels a smooth scroll in progress to bring a newly focused element into view.
  window.scrollBy({ top: shortfall, behavior: "instant" })
  return scrollable >= shortfall ? "bottom" : "top"
}

// Multi-verse passages carry their verse numbers inline as plain digits
// ("...every good work. 16 All Scripture..."). Only a handful of entries have them, and
// checked against all 880 stored passages this matches nothing but real verse numbers;
// note one is followed by a lowercase word ("17 that the man of God").
const VERSE_NUMBER = /(^|[\s.,;:!?”’"')\]])(\d{1,3})\s+(?=[A-Za-z“‘"'(\[])/g

function VerseText({ text }) {
  const parts = []
  let last = 0
  for (const match of text.matchAll(VERSE_NUMBER)) {
    const start = match.index + match[1].length
    parts.push(text.slice(last, start))
    parts.push(
      <sup key={start} className={`font-bold text-gray-400 mr-0.5`}>
        {match[2]}
      </sup>
    )
    last = start + match[0].length - match[1].length
  }
  parts.push(text.slice(last))
  return parts
}

const iconClass = "w-5 h-5"

function NavButton({ label, disabled, onClick, children }) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={`p-1 text-gray-500 hover:text-blue-800 disabled:text-gray-300 disabled:cursor-default cursor-pointer`}
    >
      {children}
    </button>
  )
}

// One verse in a callout pointing at what opened it and sized to the verse. `citations`
// is what prev/next steps through, and `index` is the position within it. The same
// callout serves every screen size; on a phone it simply runs nearly full width.
export default function VersePopover({
  id,
  citations,
  index,
  anchor,
  placement,
  isTrigger,
  onNavigate,
  onClose,
}) {
  const closeRef = useRef(null)
  const [arrowElement, setArrowElement] = useState(null)
  const [floating, setFloating] = useState(null)
  const titleId = useId()
  const { citation, referenceNum, text } = citations[index]
  const hasPrevious = index > 0
  const hasNext = index < citations.length - 1

  const { refs, floatingStyles, context } = useFloating({
    open: true,
    onOpenChange: (open, event, reason) => !open && onClose(reason),
    placement,
    elements: { floating },
    whileElementsMounted: autoUpdate,
    middleware: [
      offset(10),
      shift({ padding: 16 }),
      arrow({ element: arrowElement, padding: 12 }),
      // Long passages (whole chapters like Psalm 107) scroll inside the popover instead
      // of running off screen or under the fixed header.
      size({
        // The top keeps clear of Layout's fixed header when the popover opens above.
        padding: { top: 96, bottom: 16 },
        apply({ availableHeight, elements }) {
          elements.floating.style.setProperty("--available-height", `${availableHeight}px`)
        },
      }),
    ],
  })

  // Re-anchor as prev/next moves to another citation. Passing the anchor through
  // useFloating's `elements` option only took effect on first open.
  useLayoutEffect(() => {
    refs.setReference(anchor)
  }, [refs, anchor])

  // Clicks on this paragraph's own verse triggers (a citation, or a sentence and its
  // footnote) switch verse or toggle the open one shut, so they are not a dismiss.
  const dismiss = useDismiss(context, {
    outsidePress: (event) => !isTrigger(event.target),
  })
  const role = useRole(context, { role: "dialog" })
  const { getFloatingProps } = useInteractions([dismiss, role])

  // Arrow keys step prev/next from anywhere on the page, not only from inside the popover:
  // clicking another citation while it is open leaves focus on that citation.
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.target.closest?.("input, textarea, select, [contenteditable]")) return
      if (event.key === "ArrowLeft" && hasPrevious) onNavigate(index - 1)
      if (event.key === "ArrowRight" && hasNext) onNavigate(index + 1)
    }
    document.addEventListener("keydown", onKeyDown)
    return () => document.removeEventListener("keydown", onKeyDown)
  }, [index, hasPrevious, hasNext, onNavigate])

  return (
    <FloatingPortal>
      <FloatingFocusManager context={context} modal={false} initialFocus={closeRef} returnFocus={false}>
        <div
          ref={setFloating}
          id={id}
          aria-labelledby={titleId}
          {...getFloatingProps()}
          style={floatingStyles}
          className={`z-40 flex flex-col w-[28rem] max-w-[calc(100vw-2rem)] max-h-[min(60vh,var(--available-height))] bg-white ring-1 ring-gray-200 shadow-lg text-gray-700 tracking-wide`}
        >
          <FloatingArrow ref={setArrowElement} context={context} fill="white" stroke="#e5e7eb" strokeWidth={1} />
          <div className={`flex items-center gap-2 px-4 py-2 border-b border-gray-200`}>
            <div id={titleId} className={`flex-1 font-semibold text-[#09314C]`}>
              <sup className={`font-bold mr-1`}>{referenceNum}</sup>
              {citation}
            </div>
            {citations.length > 1 && (
              <>
                <span className={`text-xs text-gray-400 whitespace-nowrap`}>
                  {index + 1} of {citations.length}
                </span>
                <NavButton label="Previous verse" disabled={!hasPrevious} onClick={() => onNavigate(index - 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={iconClass}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5 8.25 12l7.5-7.5" />
                  </svg>
                </NavButton>
                <NavButton label="Next verse" disabled={!hasNext} onClick={() => onNavigate(index + 1)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={iconClass}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
                  </svg>
                </NavButton>
              </>
            )}
            <button
              ref={closeRef}
              type="button"
              aria-label="Close"
              onClick={() => onClose("close-button")}
              className={`p-1 text-gray-500 hover:text-blue-800 cursor-pointer`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={iconClass}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div className={`min-h-0 flex-1 overflow-y-auto px-4 py-3 text-sm leading-7 text-gray-600`}>
            <VerseText text={text} />
          </div>
        </div>
      </FloatingFocusManager>
    </FloatingPortal>
  )
}
