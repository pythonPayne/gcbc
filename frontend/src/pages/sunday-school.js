import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import {   
  setSundayschoolBookFilter,
  setSundayschoolSpeakerFilter,
  setSundayschoolSearchFilter,
  setSundayschoolSeriesFilter,
  toggleShowSundayschoolFilterMenu,
} from '../redux/actions/sundayschool'
import { toggleShowMenu } from '../redux/actions/layout'

export const query = graphql`
query MyQuery {
  allSanitySundayschool{
    edges{
      node{
        _id
        date
        speaker
        title
        passage
        book        
        sundaySchoolSeries
        oldAudioLink
        oldHandoutLink
      }
    }
  }
}
`

const SundaySchool = ({data}) => {
  let sermons = data.allSanitySundayschool.edges  
  sermons = sermons.map(edge => {
    return {
      ...edge.node,
      bookPassage: edge.node.book + " " + edge.node.passage
    }
  })  
  const [book, setBook] = useState(null)
  const [sortVar, setSortVar] = useState('date')
  const [sortDir, setSortDir] = useState(1)
  const [sorting, setSorting] = useState(false)
  const [filterBookOpen, setFilterBookOpen] = useState(false)
  const [filterSpeakerOpen, setFilterSpeakerOpen] = useState(false)

  const dispatch = useDispatch()
  
  const sundayschoolBookFilter = useSelector(state => state.sundayschool.sundayschoolBookFilter)
  const sundayschoolSpeakerFilter = useSelector(state => state.sundayschool.sundayschoolSpeakerFilter)
  const showMenu = useSelector(state => state.layout.showMenu)
  const showSundayschoolFilterMenu = useSelector(state => state.sundayschool.showSundayschoolFilterMenu)  
  const sundayschoolSearchFilter = useSelector(state => state.sundayschool.sundayschoolSearchFilter)  
  const sundayschoolSeriesFilter = useSelector(state => state.sundayschool.sundayschoolSeriesFilter)  
  
  const testLink = "https://www.gracecovenantbaptist.org/wp-content/uploads/2022/12/Luke-12.1-12.mp3"
  const booksOT = [
  'Genesis',
  'Exodus',
  'Leviticus',
  'Numbers',
  'Deuteronomy',
  'Joshua',
  'Judges',
  'Ruth',
  '1 Samuel',
  '2 Samuel',
  '1 Kings',
  '2 Kings',
  '1 Chronicles',
  '2 Chronicles',
  'Ezra',
  'Nehemiah',
  'Esther',
  'Job',
  'Psalms',
  'Proverbs',
  'Ecclesiastes',
  'Song of Solomon',
  'Isaiah',
  'Jeremiah',
  'Lamentations',
  'Ezekiel',
  'Daniel',
  'Hosea',
  'Joel',
  'Amos',
  'Obadiah',
  'Jonah',
  'Micah',
  'Nahum',
  'Habakkuk',
  'Zephaniah',
  'Haggai',
  'Zechariah',
  'Malachi',  
  ]
  const booksNT = [
  'Matthew',
  'Mark',
  'Luke',
  'John',
  'Acts',
  'Romans',
  '1 Corinthians',
  '2 Corinthians',
  'Galatians',
  'Ephesians',
  'Philippians',
  'Colossians',
  '1 Thessalonians',
  '2 Thessalonians',
  '1 Timothy', 
  '2 Timothy',
  'Titus',
  'Philemon',
  'Hebrews',
  'James',
  '1 Peter',
  '2 Peter',
  '1 John',
  '2 John',
  '3 John',
  'Jude',
  'Revelation',
  ]

  const speakers = 
  [
  'Darrell Cook',
  'David Wickiser',
  'Dustin Curtis',
  'Ed Wallen',
  'Jayson Faulkner',
  'Louie Davis',
  'Matt Carver',
  'Matt Posey',
  'Michael Gaydosh',
  'Richard Hughes',
  'Stephen Hyde',
  'Steve Cowan',
  'Todd Wilson',
  'Wade Potts',
  ]


  useEffect(() => {
    dispatch(toggleShowMenu(false))
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setSorting(false)
    }, 1500);
  },[sortDir])

  const sermon_card = (sermon) => {
    return (
      
        <div key={sermon._id} className={`bg-white relative grid place-content-center text-center h-52 md:h-56 shadow-md bg-payne`}>
          
          <div className={`flex flex-col px-4`}>
            <div className={`font-serif text-xl font-semibold text-opacity-80 text-[#09314C]`}>{sermon.title}</div>  
            <div className={`font-sans text-md text-gray-500`}>{sermon.book}</div>
            <div className={`font-sans text-md text-gray-500`}>{sermon.passage}</div>            
          </div>

          <div className={`absolute top-0 flex w-full justify-start py-4 px-2`}>
            <div className={`text-left`}>
              <div className={`font-sans text-xs text-gray-400`}>{sermon.sundaySchoolSeries}</div>  
            </div>            
          </div>

          <div className={`absolute bottom-0 flex w-full justify-between items-center py-2 px-4`}>

            <div className={`text-left`}>
              <div className={`text-xs text-gray-400`}>{sermon.speaker}</div>        
              <div className={`text-xs transition-colors ${sorting ? "bg-[#09314C] text-white" : "bg-white text-gray-400"}`}>{sermon.date}</div>        
            </div>

            <div className={`flex space-x-5`}>
              {sermon.oldAudioLink !== ""
              ?
              <a className={`text-md text-gray-400`} href={sermon.oldAudioLink} target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`w-6 h-6`}>
                  <path strokeLinecap="round" strokeLinejoin="round" 
                  d="M19.114 5.636a9 9 0 010 12.728M16.463 8.288a5.25 5.25 0 010 7.424M6.75 8.25l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
                </svg>
              </a>
              :
              <div className={`text-xs text-gray-400`}>No<br />Audio</div>
              }
              {sermon.oldHandoutLink !== ""
              ?
              <a className={`text-md text-gray-400`} href={sermon.oldHandoutLink} target="_blank">                
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13" />
                </svg>

              </a>
              :
              <div className={`text-xs text-gray-400`}></div>
              }              
            </div>

          </div>


        </div>
        
    )
  }

  // FILTER SERMONS
  let filteredSermons = sundayschoolBookFilter ? sermons.filter(sermon => sermon.book === sundayschoolBookFilter) : sermons
  filteredSermons = sundayschoolSpeakerFilter ? filteredSermons.filter(sermon => sermon.speaker === sundayschoolSpeakerFilter) : filteredSermons
  

  filteredSermons = sundayschoolSearchFilter 
  ? filteredSermons.filter(sermon => 
      (sermon.title.toLowerCase().includes(sundayschoolSearchFilter.toLowerCase()))
      |
      (sermon.book.toLowerCase().includes(sundayschoolSearchFilter.toLowerCase()))
      |
      (sermon.bookPassage.toLowerCase().includes(sundayschoolSearchFilter.toLowerCase()))
      |
      (sermon.date.toLowerCase().includes(sundayschoolSearchFilter.toLowerCase()))
      |
      (sermon.speaker.toLowerCase().includes(sundayschoolSearchFilter.toLowerCase()))      
      |
      (sermon.sundaySchoolSeries.toLowerCase().includes(sundayschoolSearchFilter.toLowerCase()))      
    )
  : filteredSermons

  sortDir === 1 && filteredSermons.sort((a,b) => a[sortVar] > b[sortVar] ? -1 : 1)
  sortDir === -1 && filteredSermons.sort((a,b) => a[sortVar] > b[sortVar] ? 1 : -1)

  return (
    <Layout>    
      <div page={'sunday-school'} className={`${showMenu && "pointer-events-none"} pt-20 flex justify-center bg-gray-100`}>        

        <div className={`min-h-screen max-w-[1200px] w-[100vw] md:w-[70vw] pb-96`}>

        {showSundayschoolFilterMenu &&

          <div className={`flex flex-col`}>

            {/* close button */}
            <button className={`flex justify-end px-6 py-6`} onClick={() => {
              dispatch(toggleShowSundayschoolFilterMenu(false));
              setFilterBookOpen(false);
              setFilterSpeakerOpen(false);
              window.scrollTo(0,0);
            }}>
              <div className={``}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
            </button>

            {/* by book */}            
            <div className={`flex flex-col mx-8 border shadow-md mb-4`}>
              <button className={`flex justify-between px-8 py-4 bg-[#09314C] bg-opacity-50 text-white ring-1 ring-[#09314C]`}
              onClick={() => setFilterBookOpen(!filterBookOpen)}>
                <div className={`flex text-xl font-serif`}>Book</div>
                <div>
                  {filterBookOpen
                  ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                    </svg>
                  :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                    </svg>                
                  }
                </div>
              </button>
              
                <div className={`${(filterBookOpen) ? "h-full p-4 overflow-auto text-gray-900" : "h-0 p-0 overflow-hidden text-white"}`}>
                  
                  <div className={`grid grid-cols-2 gap-x-4 gap-y-2 mb-4`}>
                  <div className={`col-span-2 pl-2 py-2 font-serif font-semibold`}>Old Testament</div>
                  {booksOT.map((book,i) => (
                    <div key={i} className={`text-center text-sm p-2 border cursor-pointer ${sundayschoolBookFilter === book && "bg-gray-300"}`} onClick={() => {                    
                      dispatch(setSundayschoolBookFilter(book !== sundayschoolBookFilter ? book : null ));
                      }}>
                      {book}
                    </div>
                  ))}
                  </div>

                  <div className={`grid grid-cols-2 gap-x-4 gap-y-2`}>
                  <div className={`col-span-2 pl-2 py-2 font-serif font-semibold`}>New Testament</div>
                  {booksNT.map((book,i) => (
                    <div key={i} className={`text-center text-sm p-2 border cursor-pointer ${sundayschoolBookFilter === book && "bg-gray-300"}`} onClick={() => {                    
                      dispatch(setSundayschoolBookFilter(book !== sundayschoolBookFilter ? book : null ));
                      }}>
                      {book}
                    </div>
                  ))}
                  </div>                
                </div>              
            </div>
            
            {/* by speaker */}            
            <div className={`flex flex-col mx-8 border shadow-md mb-4`}>

              <button className={`flex justify-between px-8 py-4 bg-[#09314C] bg-opacity-50 text-white ring-1 ring-[#09314C]`}
              onClick={() => setFilterSpeakerOpen(!filterSpeakerOpen)}>
                <div className={`flex text-xl font-serif`}>Speaker</div>
                <div>
                  {filterSpeakerOpen
                  ?
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 19.5v-15m0 0l-6.75 6.75M12 4.5l6.75 6.75" />
                    </svg>
                  :
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m0 0l6.75-6.75M12 19.5l-6.75-6.75" />
                    </svg>                
                  }
                </div>
              </button>
              
                <div className={`flex justify-center ${(filterSpeakerOpen) ? "h-full p-4 overflow-auto text-gray-900" : "h-0 p-0 overflow-hidden text-white"}`}>
                  <div className={`flex flex-col justify-center w-[50%] space-y-5`}>
                    {speakers.map((speaker,i) => (
                      <div key={i} className={`text-sm text-center px-4 py-2 border cursor-pointer ${sundayschoolSpeakerFilter === speaker && "bg-gray-300"}`} onClick={() => {                    
                        dispatch(setSundayschoolSpeakerFilter(speaker !== sundayschoolSpeakerFilter ? speaker : null ));                      
                        }}>
                        {speaker}
                      </div>
                    ))}
                  </div>        
                </div>      
            </div>    

            {/* clear filter */}            
            {/* <div className={`flex flex-col mx-8 border shadow-md mb-4 mt-16`}>

              <button className={`flex justify-between px-8 py-4 bg-red-400 text-gray-50 ring-1 ring-gray-400`}
              onClick={() => {
                setSundayschoolSearchFilter('');
                dispatch(setSundayschoolBookFilter(null));
                dispatch(setSundayschoolSpeakerFilter(null));
                dispatch(toggleShowSundayschoolFilterMenu(false));
              }}>
                <div className={`flex text-xl font-serif`}>Clear All Filters</div>
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </button>
                  
            </div>     */}

          </div>
          }


          {/* search and filter */}          
          {!showSundayschoolFilterMenu &&          
          <div className={`pb-36 px-6 transition-all 
              ${showMenu ? "blur-sm duration-500" : "blur-none duration-[200]"}               
              `}>
              
              <div className={`py-8`}>            

                  <div className={`shadow-md rounded-md mb-2`}>
                    <input className={`bg-gray-200 py-2 w-full px-2 text-xl`} 
                    type='text'
                    value={sundayschoolSearchFilter} placeholder={"Search lessons..."}
                    onChange={(e) => dispatch(setSundayschoolSearchFilter(e.target.value))} />
                  </div>
                  
                  <div className={`flex py-2 justify-between items-center text-gray-600`}>

                    <div className={`flex space-x-3`}>

                      <button className={`flex space-x-1 text-xs items-center shadow-md border border-gray-300 px-2 py-1`}
                      onClick={() => dispatch(toggleShowSundayschoolFilterMenu(true))}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
                        className={`w-6 h-6 cursor-pointer`}                
                        >
                          <path 
                          strokeLinecap="round" 
                          strokeLinejoin="round" 
                          d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                        </svg>
                        <div>filter</div>                
                      </button>

                      <button className={`flex space-x-1 text-xs items-center shadow-md border border-gray-300 px-2 py-1`}
                      onClick={() => {setSorting(true); setSortDir(-1*sortDir);}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5" />
                        </svg>
                        <div>sort by date</div>                
                      </button>

                    </div>         
                    
                    <div className={`text-gray-600`}>{filteredSermons.length} {filteredSermons.length === 1 ? "lesson" : "lessons"}</div>
                  </div>
                                  
              </div>                            

              <div className={`grid grid-cols-1 gap-6 md:gap-10 md:grid-cols-2 2xl:grid-cols-3`}>
                {filteredSermons.map(sermon => sermon_card(sermon))}
              </div>                            
          </div>
          }
          
          </div>
        </div>
      
    </Layout>
  )
}

export default SundaySchool

