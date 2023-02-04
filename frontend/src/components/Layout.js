import React, { useState, useEffect } from 'react'
import { StaticImage } from "gatsby-plugin-image"
import { useDispatch, useSelector } from 'react-redux'
import { 
    toggleShowMenu,     
} from '../redux/actions/layout'
import { Link } from 'gatsby'


const Layout = (props) => {    
  const page = props.children.props.page
  const dispatch = useDispatch()
  const showMenu = useSelector(state => state.layout.showMenu)  
  const [hoverMenu, setHoverMenu] = useState(null)
    
    return (
        <>
            {/* Top navigation bar, Links hidden on SM & MD screens */}
            <div className={`fixed w-full z-50 h-20 bg-white shadow`}>
                
                <div className={`flex h-full justify-between items-center pl-1 pr-4 md:pl-5 md:pr-10`}>
                    <Link to={`/`}>
                        <StaticImage backgroundColor="white" class={`bg-white`} height={65} src={"../images/Logo_Blue.png"} alt={`logo`} />
                    </Link>
                    
                    <div className={`lg:hidden flex flex-col space-y-2 h-10 w-10 justify-center items-center cursor-pointer border`}
                        onClick={() => dispatch(toggleShowMenu(!showMenu)) }
                        >
                        <div className={`transition-all duration-200 bg-gray-400
                            ${showMenu 
                                ? "w-[.15rem] h-5 rotate-45 translate-y-[.715rem]" 
                                : "h-[.15rem] w-5"                
                            }`}>                
                        </div>
                        
                        <div className={`transition-all duration-200 bg-gray-400
                            ${showMenu 
                                ? "w-[.15rem] h-5 -rotate-45 -translate-y-[.715rem]" 
                                : "h-[.15rem] w-5"
                            }`}>                    
                        </div> 
                    </div>

                    <div className={`hidden lg:flex lg:space-x-5 lg:font-sans lg:items-center`}>

                        <div onMouseLeave={() => setHoverMenu(null)} className={`relative`}>
                            <div className={`select-none px-6 py-1 ring-2 ring-gray-200 border-gray-100 shadow font-semibold text-gray-600`} onMouseOver={() => setHoverMenu('About')}>About</div>
                            {hoverMenu==='About' && 
                            <div className={`absolute ring-2 ring-gray-200 -mt-[.04rem] z-10 bg-white pl-2 pr-24 pb-2 flex flex-col pt-2 w-48 border border-gray-100`}>
                                <Link to={`/about`} className={`whitespace-nowrap px-2 py-2 text-gray-600 hover:font-semibold hover:text-[#09314C]`}>About Us</Link>                                
                                <Link to={`/beliefs`} className={`whitespace-nowrap px-2 py-2 text-gray-600 hover:font-semibold hover:text-[#09314C]`}>Beliefs</Link>                                
                                <Link to={`/church-covenant`} className={`whitespace-nowrap px-2 py-2 text-gray-600 hover:font-semibold hover:text-[#09314C]`}>Church Covenant</Link>                                
                                <a href={`https://drive.google.com/drive/folders/1My0xUd9s0d3Rn2bGjeoLn_YeONPIpzpD?usp=share_link`} target="_blank" className={`whitespace-nowrap px-2 py-2 text-gray-600 hover:font-semibold hover:text-[#09314C]`}>Members</a>                                          
                            </div>                     
                            }       
                        </div>  

                        <div onMouseLeave={() => setHoverMenu(null)} className={`relative`}>
                            <div className={`select-none px-6 py-1 ring-2 ring-gray-200 border-gray-100 shadow font-semibold text-gray-600`} onMouseOver={() => setHoverMenu('Media')}>Media</div>
                            {hoverMenu==='Media' && 
                            <div className={`absolute ring-2 ring-gray-200 -mt-[.04rem] z-10 bg-white pl-2 pr-24 pb-2 flex flex-col pt-2 w-48 border border-gray-100`}>
                                <Link to={`/sermons`} className={`whitespace-nowrap px-2 py-2 text-gray-600 hover:font-semibold hover:text-[#09314C]`}>Sermons</Link>
                                <Link to={`/sunday-school`} className={`whitespace-nowrap px-2 py-2 text-gray-600 hover:font-semibold hover:text-[#09314C]`}>Sunday School</Link>                                
                                <a href={`https://www.sermonaudio.com/player/webcast/gracecovenantbaptist/`} target="_blank" className={`whitespace-nowrap px-2 py-2 text-gray-600 hover:font-semibold hover:text-[#09314C]`}>Livestream</a>                                                                          
                            </div>                     
                            }       
                        </div>


                        <div onMouseLeave={() => setHoverMenu(null)} className={`relative`}>
                            <div className={`select-none px-6 py-1 ring-2 ring-gray-200 border-gray-100 shadow font-semibold text-gray-600`} onMouseOver={() => setHoverMenu('Studies')}>Studies</div>
                            {hoverMenu==='Studies' && 
                            <div className={`absolute ring-2 ring-gray-200 -mt-[.04rem] z-10 bg-white pl-2 pr-24 pb-2 flex flex-col pt-2 w-60 border border-gray-100`}>
                                <Link to={`/book-studies`} className={`whitespace-nowrap px-2 py-2 text-gray-600 hover:font-semibold hover:text-[#09314C]`}>Book Studies</Link>                                
                            </div>                     
                            }       
                        </div>                               
                                       
                        <div onMouseLeave={() => setHoverMenu(null)} className={`relative`}>
                            <div className={`select-none px-6 py-1 ring-2 ring-gray-200 border-gray-100 shadow font-semibold text-gray-600`} onMouseOver={() => setHoverMenu('Outreach')}>Outreach</div>
                            {hoverMenu==='Outreach' && 
                            <div className={`absolute ring-2 ring-gray-200 -mt-[.04rem] z-10 bg-white pl-2 pr-24 pb-2 flex flex-col pt-2 w-48 border border-gray-100`}>
                                <Link to={`/outreach`} className={`whitespace-nowrap px-2 py-2 text-gray-600 hover:font-semibold hover:text-[#09314C]`}>Missions</Link>
                                <Link to={`/outreach`} className={`whitespace-nowrap px-2 py-2 text-gray-600 hover:font-semibold hover:text-[#09314C]`}>Ministries</Link>
                            </div>                     
                            }       
                        </div>                                                     

                        <div onMouseLeave={() => setHoverMenu(null)} className={`relative`}>
                            <div className={`select-none px-6 py-1 ring-2 ring-gray-200 border-gray-100 shadow font-semibold text-gray-600`} onMouseOver={() => setHoverMenu('Contact')}>
                                <Link to={`/contact`}>Contact</Link>                                                        
                            </div>                                                        
                        </div>                                

                    </div>
                </div>

                
            </div>

            {/* side menus */}
            <div className={`flex lg:hidden`}>

                {/* right side menu */}
                <div className={`transition-all fixed text-gray-600 top-20 right-0 border-l bg-white shadow-2xl min-h-screen z-20 overflow-auto max-w-[500px] no-scrollbar
                ${showMenu ? "w-[50vw] md:w-[25vw] duration-1000" : "w-0 text-white duration-[0ms]"}
                `}
                >                                
                    <div className={`relative`}>
                        <div className={`absolute pb-[50vh] w-full pl-4 pr-4 pt-8`}>                                
                            <div className={`flex flex-col space-y-2`}>                                
                                
                                <Link className={`font-serif border-l-4 pl-4 py-2 hover:text-gray-800 ${page === 'about' ? "text-gray-800 border-[#09314C] border-opacity-50 bg-gradient-to-l from-white to-[#09314C]/[4%]" : "text-gray-500 border-white"}`} to={`/about`}>About</Link>
                                <Link className={`font-serif border-l-4 pl-4 py-2 hover:text-gray-800 ${page === 'beliefs' ? "text-gray-800 border-[#09314C] border-opacity-50 bg-gradient-to-l from-white to-[#09314C]/[4%]" : "text-gray-500 border-white"}`} to={`/beliefs`}>Beliefs</Link>
                                <Link className={`overflow-hidden whitespace-nowrap font-serif border-l-4 pl-4 py-2 hover:text-gray-800 ${page === 'church-covenant' ? "text-gray-800 border-[#09314C] border-opacity-50 bg-gradient-to-l from-white to-[#09314C]/[4%]" : "text-gray-500 border-white"}`} to={`/church-covenant`}>Church Covenant</Link> 
                                <a className={`overflow-hidden whitespace-nowrap font-serif border-l-4 pl-4 py-2 hover:text-gray-800 text-gray-500 border-white`} href={`https://drive.google.com/drive/folders/1My0xUd9s0d3Rn2bGjeoLn_YeONPIpzpD?usp=share_link`} target="_blank">Members</a>
                                <hr/>                                                                                               
                                <Link className={`font-serif border-l-4 pl-4 py-2 hover:text-gray-800 ${page === 'sermons' ? "text-gray-800 border-[#09314C] border-opacity-50 bg-gradient-to-l from-white to-[#09314C]/[4%]" : "text-gray-500 border-white"}`} to={`/sermons`}>Sermons</Link>                                
                                <Link className={`overflow-hidden whitespace-nowrap font-serif border-l-4 pl-4 py-2 hover:text-gray-800 ${page === 'sunday-school' ? "text-gray-800 border-[#09314C] border-opacity-50 bg-gradient-to-l from-white to-[#09314C]/[4%]" : "text-gray-500 border-white"}`} to={`/sunday-school`}>Sunday School</Link>                                   
                                <a className={`overflow-hidden whitespace-nowrap font-serif border-l-4 pl-4 py-2 hover:text-gray-800 text-gray-500 border-white`} href={`https://www.sermonaudio.com/player/webcast/gracecovenantbaptist/`} target="_blank">Livestream</a>
                                <hr/>
                                <Link className={`overflow-hidden whitespace-nowrap font-serif border-l-4 pl-4 py-2 hover:text-gray-800 ${page === 'book-studies' ? "text-gray-800 border-[#09314C] border-opacity-50 bg-gradient-to-l from-white to-[#09314C]/[4%]" : "text-gray-500 border-white"}`} to={`/book-studies`}>Book Studies</Link>                                                  
                                <Link className={`font-serif border-l-4 pl-4 py-2 hover:text-gray-800 ${page === 'outreach' ? "text-gray-800 border-[#09314C] border-opacity-50 bg-gradient-to-l from-white to-[#09314C]/[4%]" : "text-gray-500 border-white"}`} to={`/outreach`}>Outreach</Link>                                
                                <Link className={`font-serif border-l-4 pl-4 py-2 hover:text-gray-800 ${page === 'contact' ? "text-gray-800 border-[#09314C] border-opacity-50 bg-gradient-to-l from-white to-[#09314C]/[4%]" : "text-gray-500 border-white"}`} to={`/contact`}>Contact</Link>                                

                            </div>
                        </div>
                    </div>                        
                                                    
                </div>     
                       
            </div>

            {/* Main content */}                            
            <div className={`w-full`}
            onClick={() => {showMenu && dispatch(toggleShowMenu(false))}}>
                {props.children}
            </div>
            

            {/* Footer */}
            <div className={`bg-[#09314C] text-gray-300 text-opacity-80 grid grid-cols-1 text-center gap-y-[3rem] py-28
            lg:grid-cols-2`}>

                <div className={`py-10 tracking-wide text-lg lg:text-xl`}>
                    <div className={`font-bold text-2xl lg:text-4xl font-serif py-1 tracking-wider`}>Contact</div>
                    <div className={`pt-2 space-y-1`}>
                        <div>(205) 426-2234</div>
                        <div>pastor@gracecovenantbaptist.org</div>                    
                    </div>
                    <div className={`pt-2`}>
                        <a className={`underline`} target="_blank" href="https://www.google.com/maps/dir//Grace+Covenant+Baptist+Church,+2565+Rocky+Ridge+Rd,+Vestavia+Hills,+AL+35243/@33.4295652,-86.8408153,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x888918455c0624b3:0x25d19d79c0c6e263!2m2!1d-86.7707752!2d33.4295849">
                            2565 Rocky Ridge Road
                            <br/>
                            Vestavia Hills Alabama 35243
                        </a>
                    </div>
                    
                    
                    
                </div>               

                <div className={`py-10 tracking-wide text-lg lg:text-xl`}>
                    <div className={`font-bold text-2xl lg:text-4xl font-serif py-1 tracking-wider`}>Service Times</div>
                    <div className={`pt-2 flex flex-col space-y-1`}>
                        <div>Sunday School: 9:30 am</div>
                        <div>Sunday Worship: 11 am</div>
                        <div>Wednesday Prayer: 6:30 pm</div>
                    </div>
                </div>

            </div>
        </>
    )
  
}

export default Layout