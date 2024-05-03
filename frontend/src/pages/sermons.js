import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import {
  setSermonBookFilter,
  setSermonSpeakerFilter,
  setSermonSearchFilter,
  toggleShowSermonsFilterMenu,
} from "../redux/actions/sermons"
import { toggleShowMenu } from "../redux/actions/layout"
import { SEO } from "../components/seo"

export const query = graphql`
  query MyQuery {
    allSanitySermons {
      edges {
        node {
          _id
          date
          speaker
          title
          passage
          book
          audioLink
        }
      }
    }
  }
`

const Sermons = ({ data }) => {
  let sermons = data.allSanitySermons.edges
  sermons = sermons.map((edge) => {
    return {
      ...edge.node,
      bookPassage: edge.node.book + " " + edge.node.passage,
    }
  })
  const [book, setBook] = useState(null)
  const [sortVar, setSortVar] = useState("date")
  const [sortDir, setSortDir] = useState(1)
  const [sorting, setSorting] = useState(false)
  const [filterBookOpen, setFilterBookOpen] = useState(false)
  const [filterSpeakerOpen, setFilterSpeakerOpen] = useState(false)

  const dispatch = useDispatch()

  const sermonBookFilter = useSelector(
    (state) => state.sermons.sermonBookFilter
  )
  const sermonSpeakerFilter = useSelector(
    (state) => state.sermons.sermonSpeakerFilter
  )
  const showMenu = useSelector((state) => state.layout.showMenu)
  const showSermonsFilterMenu = useSelector(
    (state) => state.sermons.showSermonsFilterMenu
  )
  const sermonSearchFilter = useSelector(
    (state) => state.sermons.sermonSearchFilter
  )

  const booksOT = [
    "Genesis",
    "Ruth",
    "Esther",
    "Psalms",
    "Ecclesiastes",
    "Isaiah",
    "Jonah",
    "Habakkuk",
  ]
  const booksNT = [
    "Matthew",
    "Mark",
    "Luke",
    "John",
    "Acts",
    "Romans",
    "1 Corinthians",
    "2 Corinthians",
    "Galatians",
    "Ephesians",
    "Philippians",
    "Colossians",
    "1 Timothy",
    "2 Timothy",
    "Philemon",
    "Hebrews",
    "1 Peter",
    "2 Peter",
    "1 John",
    "2 John",
    "3 John",
    "Jude",
    "Revelation",
  ]

  const speakers = [
    "Todd Wilson",
    "Stephen Hyde",
    "Stephen Payne",
    "Steve Cowan",
  ]

  useEffect(() => {
    dispatch(toggleShowMenu(false))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setSorting(false)
    }, 1500)
  }, [sortDir])

  const sermon_card = (sermon) => {
    return (
      <div
        key={sermon._id}
        className={`bg-white relative grid place-content-center text-center h-52 md:h-56 shadow-md bg-payne`}
      >
        <div className={`flex flex-col px-4`}>
          <a
            className={`font-serif text-xl font-semibold text-opacity-80 text-[#09314C] hover:text-opacity-60`}
            href={sermon.audioLink}
            target="_blank"
          >
            {sermon.title}
          </a>
          <div className={`font-sans text-md text-gray-500`}>{sermon.book}</div>
          <div className={`font-sans text-md text-gray-500`}>
            {sermon.passage}
          </div>
        </div>

        <div
          className={`absolute bottom-0 flex w-full justify-between items-center py-2 px-4`}
        >
          <div className={`text-left`}>
            <div className={`text-xs text-gray-400`}>{sermon.speaker}</div>
            <div
              className={`text-xs transition-colors ${
                sorting ? "bg-[#09314C] text-white" : "bg-white text-gray-400"
              }`}
            >
              {sermon.date}
            </div>
          </div>
          <a
            className={`text-md text-gray-400`}
            href={sermon.audioLink}
            target="_blank"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={`w-6 h-6`}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z"
              />
            </svg>
          </a>
        </div>
      </div>
    )
  }

  // FILTER SERMONS
  let filteredSermons = sermonBookFilter
    ? sermons.filter((sermon) => sermon.book === sermonBookFilter)
    : sermons
  filteredSermons = sermonSpeakerFilter
    ? filteredSermons.filter((sermon) => sermon.speaker === sermonSpeakerFilter)
    : filteredSermons

  filteredSermons = sermonSearchFilter
    ? filteredSermons.filter(
        (sermon) =>
          sermon.title
            .toLowerCase()
            .includes(sermonSearchFilter.toLowerCase()) |
          (sermon.book &&
            sermon.book
              .toLowerCase()
              .includes(sermonSearchFilter.toLowerCase())) |
          (sermon.bookPassage &&
            sermon.bookPassage
              .toLowerCase()
              .includes(sermonSearchFilter.toLowerCase())) |
          sermon.date.toLowerCase().includes(sermonSearchFilter.toLowerCase()) |
          sermon.speaker
            .toLowerCase()
            .includes(sermonSearchFilter.toLowerCase())
      )
    : filteredSermons

  sortDir === 1 &&
    filteredSermons.sort((a, b) => (a[sortVar] > b[sortVar] ? -1 : 1))
  sortDir === -1 &&
    filteredSermons.sort((a, b) => (a[sortVar] > b[sortVar] ? 1 : -1))

  return (
    <Layout>
      <div
        page={"sermons"}
        className={`${
          showMenu && "pointer-events-none"
        } pt-20 flex justify-center bg-gray-100`}
      >
        <div
          className={`min-h-screen max-w-[1200px] w-[100vw] md:w-[70vw] pb-96`}
        >
          {showSermonsFilterMenu && (
            <div className={`flex flex-col`}>
              <div className={`flex justify-between mx-8 py-8`}>
                {/* clear filter buttons */}
                <button
                  className={`text-xs bg-red-600 bg-opacity-80 ring-1 ring-red-600 py-3 px-4 text-white shadow-lg
                  ${
                    sermonBookFilter === null &&
                    sermonSpeakerFilter === null &&
                    "invisible"
                  }`}
                  onClick={() => {
                    dispatch(toggleShowSermonsFilterMenu(false))
                    dispatch(setSermonBookFilter(null))
                    dispatch(setSermonSpeakerFilter(null))
                    setFilterBookOpen(false)
                    setFilterSpeakerOpen(false)
                    window.scrollTo(0, 0)
                  }}
                >
                  Clear Filters
                </button>

                {/* close button */}
                <button
                  className={`flex justify-end shadow-md px-3 items-center ring-1 ring-gray-400`}
                  onClick={() => {
                    dispatch(toggleShowSermonsFilterMenu(false))
                    setFilterBookOpen(false)
                    setFilterSpeakerOpen(false)
                    window.scrollTo(0, 0)
                  }}
                >
                  <div className={``}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                </button>
              </div>

              {/* by book */}
              <div className={`flex flex-col mx-8 border shadow-md mb-4`}>
                <button
                  className={`flex justify-between px-8 py-4 bg-[#09314C] bg-opacity-50 text-white ring-1 ring-[#09314C]`}
                  onClick={() => setFilterBookOpen(!filterBookOpen)}
                >
                  <div className={`flex text-xl font-serif`}>Book</div>
                  <div>
                    {filterBookOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                <div
                  className={`${
                    filterBookOpen
                      ? "h-full p-4 overflow-auto text-gray-900"
                      : "h-0 p-0 overflow-hidden text-white"
                  }`}
                >
                  <div className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-4`}>
                    <div
                      className={`col-span-2 pl-2 py-2 font-serif font-semibold`}
                    >
                      Old Testament
                    </div>
                    {booksOT.map((book, i) => (
                      <div
                        key={i}
                        className={`text-center text-sm p-2 border cursor-pointer ${
                          sermonBookFilter === book && "bg-gray-300"
                        }`}
                        onClick={() => {
                          dispatch(
                            setSermonBookFilter(
                              book !== sermonBookFilter ? book : null
                            )
                          )
                        }}
                      >
                        {book}
                      </div>
                    ))}
                  </div>

                  <div className={`grid grid-cols-2 gap-x-4 gap-y-2`}>
                    <div
                      className={`col-span-2 pl-2 py-2 font-serif font-semibold`}
                    >
                      New Testament
                    </div>
                    {booksNT.map((book, i) => (
                      <div
                        key={i}
                        className={`text-center text-sm p-2 border cursor-pointer ${
                          sermonBookFilter === book && "bg-gray-300"
                        }`}
                        onClick={() => {
                          dispatch(
                            setSermonBookFilter(
                              book !== sermonBookFilter ? book : null
                            )
                          )
                        }}
                      >
                        {book}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* by speaker */}
              <div className={`flex flex-col mx-8 border shadow-md mb-4`}>
                <button
                  className={`flex justify-between px-8 py-4 bg-[#09314C] bg-opacity-50 text-white ring-1 ring-[#09314C]`}
                  onClick={() => setFilterSpeakerOpen(!filterSpeakerOpen)}
                >
                  <div className={`flex text-xl font-serif`}>Speaker</div>
                  <div>
                    {filterSpeakerOpen ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75"
                        />
                      </svg>
                    )}
                  </div>
                </button>

                <div
                  className={`flex justify-center ${
                    filterSpeakerOpen
                      ? "h-full p-4 overflow-auto text-gray-900"
                      : "h-0 p-0 overflow-hidden text-white"
                  }`}
                >
                  <div
                    className={`flex flex-col justify-center w-[50%] space-y-5`}
                  >
                    {speakers.map((speaker, i) => (
                      <div
                        key={i}
                        className={`text-sm text-center px-4 py-2 border cursor-pointer ${
                          sermonSpeakerFilter === speaker && "bg-gray-300"
                        }`}
                        onClick={() => {
                          dispatch(
                            setSermonSpeakerFilter(
                              speaker !== sermonSpeakerFilter ? speaker : null
                            )
                          )
                        }}
                      >
                        {speaker}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* search and filter */}
          {!showSermonsFilterMenu && (
            <div
              className={`pb-36 px-6 transition-all 
              ${
                showMenu ? "blur-sm duration-500" : "blur-none duration-[200]"
              }               
              `}
            >
              <div className={`py-8`}>
                <div className={`shadow-md rounded-md mb-2`}>
                  <input
                    className={`bg-gray-200 py-2 w-full px-2 text-xl`}
                    type="text"
                    value={sermonSearchFilter}
                    placeholder={"Search sermons..."}
                    onChange={(e) =>
                      dispatch(setSermonSearchFilter(e.target.value))
                    }
                  />
                </div>

                <div
                  className={`flex py-2 justify-between items-center text-gray-600`}
                >
                  <div className={`flex space-x-3`}>
                    <button
                      className={`flex space-x-1 text-xs items-center shadow-md border border-gray-300 px-2 py-1`}
                      onClick={() =>
                        dispatch(toggleShowSermonsFilterMenu(true))
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className={`w-6 h-6 cursor-pointer`}
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
                        />
                      </svg>
                      <div>filter</div>
                    </button>

                    <button
                      className={`flex space-x-1 text-xs items-center shadow-md border border-gray-300 px-2 py-1`}
                      onClick={() => {
                        setSorting(true)
                        setSortDir(-1 * sortDir)
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-6 h-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                        />
                      </svg>
                      <div>sort by date</div>
                    </button>
                  </div>

                  <div className={`text-gray-600`}>
                    {filteredSermons.length}{" "}
                    {filteredSermons.length === 1 ? "sermon" : "sermons"}
                  </div>
                </div>
              </div>

              <div
                className={`grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-2 2xl:grid-cols-3`}
              >
                {filteredSermons.map((sermon) => sermon_card(sermon))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Sermons

export const Head = () => <SEO title="sermons" />
