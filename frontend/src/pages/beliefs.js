import React, { useState, useEffect } from "react"
import { useSelector, useDispatch } from "react-redux"
import Layout from "../components/Layout"
import { graphql } from "gatsby"
import { toggleShowMenu } from "../redux/actions/layout"
import { SEO } from "../components/seo"

export const query = graphql`
  query MyQuery {
    allSanityConfession(sort: { _id: ASC }) {
      edges {
        node {
          _id
          chapter
          paragraph
          referenceNum
          paragraphTextModern
          paragraphTextOriginal
          paragraphRef
        }
      }
    }
  }
`

const Beliefs = ({ data }) => {
  const confession = data.allSanityConfession.edges
  const dispatch = useDispatch()
  const [chapterSelected, setChapterSelected] = useState(1)
  const [showChapterMenu, setShowChapterMenu] = useState(false)
  const [edition, setEdition] = useState("paragraphTextOriginal")
  const showMenu = useSelector((state) => state.layout.showMenu)
  const [referenceClicked, setReferenceClicked] = useState(false)
  const [referenceItem, setReferenceItem] = useState(null)
  const [referenceItemParagraph, setReferenceItemParagraph] = useState(0)
  const [referenceItemChapter, setReferenceItemChapter] = useState(0)
  const [search, setSearch] = useState("")
  const [searching, setSearching] = useState(false)
  const [searchMatches, setSearchMatches] = useState([])

  useEffect(() => {
    dispatch(toggleShowMenu(false))
    setShowChapterMenu(true)
  }, [])

  useEffect(() => {
    setSearchMatches(
      confession
        .filter((edge) =>
          edge.node[edition].toLowerCase().includes(search.toLowerCase())
        )
        .map((edge) => edge.node.chapter + "-" + edge.node.paragraph)
    )
  }, [confession, search, edition])

  const showParagraphs = !searching || (searching && search.length > 1)

  const numberOfChapters = Math.max(
    ...confession.map((edge) => edge.node.chapter)
  )
  const chapterNums = Array(numberOfChapters)
    .fill(0)
    .map((e, i) => i + 1)
  const chapterTitles = [
    "The Holy Scriptures",
    "God and the Holy Trinity",
    "God's Decree",
    "Creation",
    "Divine Providence",
    "The Fall of Mankind, and Sin and Its Punishment",
    "God's Covenant",
    "Christ the Mediator",
    "Free Will",
    "Effectual Calling",
    "Justification",
    "Adoption",
    "Sanctification",
    "Saving Faith",
    "Repentance to Life and Salvation",
    "Good Works",
    "The Perseverance of the Saints",
    "Assurance of Grace and Salvation",
    "The Law of God",
    "The Gospel and the Extent of Its Grace",
    "Christian Liberty and Liberty of Conscience",
    "Religious Worship and the Sabbath Day",
    "Lawful Oaths and Vows",
    "Civil Government",
    "Marriage",
    "The Church",
    "The Communion of Saints",
    "Baptism and the Lord's Supper",
    "Baptism",
    "The Lord's Supper",
    "The State of Humanity after Death and the Resurrection of the Dead",
    "The Last Judgment",
  ]

  const reset_reference_clicked = () => {
    setReferenceClicked(false)
    setReferenceItem(null)
    setReferenceItemParagraph(0)
    setReferenceItemChapter(0)
  }

  const confession_ref_card = (paragraph) => {
    const paragraphNum = paragraph[0].node.paragraph
    const on = referenceClicked && referenceItemParagraph === paragraphNum
    return (
      <div className={`text-sm pt-12 leading-6 relative min-h-[200px]`}>
        {paragraph.map((edge, i) => {
          if (edge.node.referenceNum !== 99) {
            return (
              <div
                key={i}
                className={`flex ${
                  referenceClicked &&
                  referenceItemParagraph === paragraphNum &&
                  "invisible"
                }`}
              >
                <div className={`w-4 text-right shrink-0 mr-2`}>
                  <sup className={`font-bold`}>{edge.node.referenceNum}</sup>
                </div>
                <div className={`flex flex-wrap`}>
                  {edge.node.paragraphRef.map((item, j, arr) => (
                    <div
                      key={j}
                      className="mr-2 hover:cursor-pointer hover:text-blue-800"
                      onClick={() => {
                        setReferenceClicked(true)
                        setReferenceItem(item)
                        setReferenceItemChapter(edge.node.chapter)
                        setReferenceItemParagraph(edge.node.paragraph)
                      }}
                    >
                      {item.split("||")[0]}
                      {arr.length - 1 !== j && ";"}
                    </div>
                  ))}
                </div>
              </div>
            )
          }
        })}
        {referenceClicked && referenceItemParagraph === paragraphNum && (
          <div className="absolute top-0 left-0 pt-12 h-full">
            <div className="flex">
              <div
                className="grid place-content-center"
                onClick={() => setReferenceClicked(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={3}
                  stroke="currentColor"
                  className="w-4 h-4 mr-2  hover:text-blue-800 cursor-pointer"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                  />
                </svg>
              </div>
              <div className="font-semibold">
                {referenceItem.split("||")[0]}
              </div>
            </div>
            <hr className="border-gray-300 my-1" />
            <div className="text-gray-500 h-full overflow-auto">
              {referenceItem.split("||")[1]}
            </div>
          </div>
        )}
      </div>
    )
  }

  const confession_text_card = (paragraph) => {
    return (
      <p className={`break-words`}>
        {paragraph.map((edge, i) => (
          <span key={i} className={``}>
            {edge.node[edition].trim()}
            <sup className={`font-bold`}>
              {edge.node.referenceNum !== 99 && edge.node.referenceNum}
            </sup>
            &nbsp;
          </span>
        ))}
      </p>
    )
  }

  const confession_paragraph_card = (paragraph) => {
    const id = paragraph[0].node
    return (
      <div className={`border-b border-gray-300 py-8 leading-8`}>
        <div className={`text-xl font-bold py-2`}>
          {id.chapter}.{id.paragraph}
        </div>
        {confession_text_card(paragraph)}
        {confession_ref_card(paragraph)}
      </div>
    )
  }

  const confession_chapter_card = (chapter) => {
    const chapterNum = chapter[0] && chapter[0].node.chapter
    const paragraphNums = [
      ...new Set(
        chapter.map((edge) => edge.node.chapter + "-" + edge.node.paragraph)
      ),
    ]
    return (
      <div>
        <div className={``}>
          <div className={`flex justify-between`}>
            {!searching ? (
              <div className={`flex space-x-3`}>
                <button
                  className={`text-gray-500 text-xl hover:text-gray-800`}
                  onClick={() => {
                    reset_reference_clicked()
                    setChapterSelected(
                      chapterSelected !== 1
                        ? -1 + chapterSelected
                        : numberOfChapters
                    )
                    window.scrollTo(0, 0)
                  }}
                >
                  {"<"}
                </button>

                <button
                  className={`text-gray-500 hover:text-gray-800`}
                  onClick={() => {
                    reset_reference_clicked()
                    setShowChapterMenu(!showChapterMenu)
                    window.scrollTo(0, 0)
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
                      d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                  </svg>
                </button>

                <button
                  className={`text-gray-500 text-xl hover:text-gray-800`}
                  onClick={() => {
                    reset_reference_clicked()
                    setChapterSelected(
                      chapterSelected !== numberOfChapters
                        ? 1 + chapterSelected
                        : 1
                    )
                    window.scrollTo(0, 0)
                  }}
                >
                  {">"}
                </button>
              </div>
            ) : (
              <div className={`grid place-content-center`}>
                <button
                  className={`text-gray-500 hover:text-gray-800`}
                  onClick={() => {
                    reset_reference_clicked()
                    setShowChapterMenu(true)
                    setSearching(false)
                    window.scrollTo(0, 0)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                    />
                  </svg>
                </button>
              </div>
            )}

            <div className={`flex space-x-3`}>
              <button
                className={`py-2 px-2 tracking-wide text-xs ${
                  edition === "paragraphTextOriginal"
                    ? "bg-[#09314C] bg-opacity-70 text-white"
                    : "bg-gray-100 text-gray-700 border-2 border-gray-300"
                }`}
                onClick={() => setEdition("paragraphTextOriginal")}
              >
                Original
              </button>
              <button
                className={`py-2 px-2 tracking-wide text-xs ${
                  edition === "paragraphTextModern"
                    ? "bg-[#09314C] bg-opacity-70 text-white"
                    : "bg-gray-100 text-gray-700 border-2 border-gray-300"
                }`}
                onClick={() => setEdition("paragraphTextModern")}
              >
                Modern
              </button>
            </div>
          </div>

          <div className={`mt-6`}>
            {!searching ? (
              <>
                <div className={`font-semibold text-4xl text-gray-800 py-2`}>
                  {`Chapter ${chapterNum}`}
                </div>
                <div className={`text-2xl text-gray-600 font-serif`}>
                  {chapterTitles[-1 + chapterNum]}
                </div>
              </>
            ) : (
              <div className="relative">
                <input
                  className={`bg-gray-200 py-2 w-full px-2 text-xl`}
                  type="text"
                  value={search}
                  placeholder="search..."
                  onChange={(e) => setSearch(e.target.value)}
                />
                {search.length > 1 && (
                  <div className="absolute top-0 right-0 h-full flex items-center pr-2 text-sm">
                    {`${searchMatches.length} time${
                      searchMatches.length !== 1 ? "s" : ""
                    }`}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {paragraphNums.length === 0 ? (
          <div className="pt-12">No matches</div>
        ) : (
          showParagraphs && (
            <div className={`text-sm md:text-md`}>
              {paragraphNums.map((paragraphNum, i) => (
                <div key={i}>
                  {confession_paragraph_card(
                    chapter.filter(
                      (edge) =>
                        edge.node.chapter + "-" + edge.node.paragraph ===
                        paragraphNum
                    )
                  )}
                </div>
              ))}
            </div>
          )
        )}
      </div>
    )
  }

  return (
    <Layout>
      <div
        page={"beliefs"}
        className={`${
          showMenu && "pointer-events-none"
        } pt-20 flex justify-center bg-gray-100`}
      >
        <div className={`max-w-[1200px] `}>
          {/* showChapterMenu */}
          {showChapterMenu && (
            <div
              className={`min-h-screen bg-gray-100 pb-36 flex justify-center text-gray-700 tracking-wide transition-all ${
                showMenu ? "blur-sm duration-500" : "blur-none duration-[0ms]"
              }`}
            >
              <div
                className={`relative bg-gray-100 h-full z-20 overflow-auto max-w-[1000px] no-scrollbar
                  w-[100vw] md:w-[50vw] `}
              >
                <button
                  className={`absolute top-5 right-5 text-2xl`}
                  onClick={() => {
                    setSearching(true)
                    setShowChapterMenu(false)
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>

                <div className={`px-2 pt-6 text-gray-700`}>
                  <div className={`px-2 pb-36`}>
                    <div
                      className={`font-semibold font-serif text-2xl lg:text-3xl text-center pt-8 tracking-wide`}
                    >
                      The 1689 Baptist
                    </div>
                    <div className="py-1"></div>
                    <div
                      className={`font-semibold font-serif text-2xl lg:text-3xl text-center pb-4 tracking-wide`}
                    >
                      Confession of Faith
                    </div>

                    <div className={`flex space-x-5 py-3`}>
                      <button
                        className={`w-[50%] py-2 tracking-wide ${
                          edition === "paragraphTextOriginal"
                            ? "bg-[#09314C] bg-opacity-70 text-white"
                            : "bg-gray-100 text-gray-700 border-2 border-gray-300"
                        }`}
                        onClick={() => setEdition("paragraphTextOriginal")}
                      >
                        Original
                      </button>
                      <button
                        className={`w-[50%] py-2 tracking-wide ${
                          edition === "paragraphTextModern"
                            ? "bg-[#09314C] bg-opacity-70 text-white"
                            : "bg-gray-100 text-gray-700 border-2 border-gray-300"
                        }`}
                        onClick={() => setEdition("paragraphTextModern")}
                      >
                        Modern
                      </button>
                    </div>

                    {!searching &&
                      chapterNums.map((chapterNum, i) => (
                        <div className={`flex justify-center`}>
                          <div
                            key={i}
                            className={`grid grid-cols-12 w-full max-w-[600px] bg-gray-50 ring-1 ring-[#09314C] ring-opacity-20 shadow-md mt-8`}
                          >
                            <div
                              className={`col-span-2 flex justify-center items-center font-bold text-gray-500`}
                            >
                              {chapterNum}
                            </div>
                            <div
                              className={`col-span-10 cursor-pointer py-2 pr-2`}
                              onClick={() => {
                                reset_reference_clicked()
                                setChapterSelected(chapterNum)
                                setShowChapterMenu(false)
                                setSearching(false)
                                window.scrollTo(0, 0)
                              }}
                            >
                              {chapterTitles[parseInt(chapterNum - 1)]}
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {!showChapterMenu && (
            <div
              className={`min-h-screen pt-8 bg-gray-100 pb-36 flex justify-center text-gray-700 tracking-wide transition-all ${
                showMenu ? "blur-sm duration-500" : "blur-none duration-[0ms]"
              }`}
            >
              <div
                className={`w-[80vw] max-w-5xl transition-all duration-[200] bg-gray-100`}
              >
                {confession_chapter_card(
                  !searching
                    ? confession.filter(
                        (edge) => edge.node.chapter === chapterSelected
                      )
                    : confession.filter((edge) =>
                        searchMatches.includes(
                          edge.node.chapter + "-" + edge.node.paragraph
                        )
                      )
                )}

                <div
                  className={`flex justify-between pt-12 ${
                    searching && "invisible"
                  }`}
                >
                  {chapterSelected > 1 ? (
                    <button
                      className={`border border-gray-300 text-xl px-3 py-1 cursor-pointer`}
                      onClick={() => {
                        reset_reference_clicked()
                        setChapterSelected(-1 + chapterSelected)
                        window.scrollTo(0, 0)
                      }}
                    >
                      {`< Ch. ${chapterSelected - 1}`}
                    </button>
                  ) : (
                    <div></div>
                  )}

                  {chapterSelected < numberOfChapters ? (
                    <button
                      className={`border border-gray-300 text-xl px-3 py-1 cursor-pointer`}
                      onClick={() => {
                        reset_reference_clicked()
                        setChapterSelected(1 + chapterSelected)
                        window.scrollTo(0, 0)
                      }}
                    >
                      {`Ch. ${chapterSelected + 1} >`}
                    </button>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Beliefs

export const Head = () => <SEO title="beliefs" />
