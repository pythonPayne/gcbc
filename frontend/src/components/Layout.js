import React, { useState } from 'react'
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
  
  
    return (
        <>
            {/* Top navigation bar, Links hidden on SM & MD screens */}
            <div className={`fixed w-full top-0 z-50 h-20 bg-white shadow`}>
                
                <div className={`flex h-full justify-between items-center pl-1 pr-4 md:px-10`}>
                    <StaticImage backgroundColor="white" class={`bg-white`} height={65} src={"../images/Logo_Blue.png"} alt={`logo`} />

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
                </div>

                <div className={`hidden lg:flex space-x-5 font-sans`}>

                    <Link to={`/`}>Home</Link>
                    <Link to={`/about`}>About</Link>
                    <Link to={`/contact`}>Contact</Link>
                    <Link to={`/sermons`}>Sermons</Link>
                    <Link to={`/confession`}>1689 BCF</Link>                    
                    <Link to={`/calendar`}>Calendar</Link>

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
                        <div className={`absolute pb-[50vh] w-full px-4 pt-8`}>                                
                            <div className={`flex flex-col space-y-5`}>
                                <Link className={`border-l-4 pl-4 ${page === 'home' ? "border-gray-600" : " border-white"}`} to={`/`}>Home</Link>
                                <Link className={`border-l-4 pl-4 ${page === 'about' ? "border-gray-600" : " border-white"}`} to={`/about`}>About</Link>
                                <Link className={`border-l-4 pl-4 ${page === 'contact' ? "border-gray-600" : " border-white"}`} to={`/contact`}>Contact</Link>
                                <Link className={`border-l-4 pl-4 ${page === 'sermons' ? "border-gray-600" : " border-white"}`} to={`/sermons`}>Sermons</Link>
                                <Link className={`border-l-4 pl-4 ${page === 'calendar' ? "border-gray-600" : " border-white"}`} to={`/calendar`}>Calendar</Link>                  
                                <Link className={`w-[50vw] whitespace-pre-wrap border-l-4 pl-4 ${page === 'confession' ? "border-gray-600" : " border-white"}`} to={`/confession`}>
                                    The 1689 Baptist<br/>Confession of Faith</Link>                                                                
                            </div>
                        </div>
                    </div>                        
                                                    
                </div>     
                       
            </div>

            {/* Main content */}                            
            <div className={`w-full`}>
                {props.children}
            </div>
            

            {/* Footer */}
            <div className={`bg-[#09314C] text-gray-300 text-opacity-80 grid grid-cols-1 text-center gap-y-[3rem] py-28
            lg:grid-cols-2`}>

                <div className={`py-10 tracking-wide`}>
                    <div className={`font-bold text-2xl font-serif py-1`}>Contact</div>
                    <div>2565 Rocky Ridge Road</div>
                    <div>Vestavia Hills Alabama 35243</div>
                    <div>pastor@gracecovenantbaptist.org</div>
                    <div>(205) 426-2234</div>
                </div>               

                <div className={`py-10 tracking-wide`}>
                    <div className={`font-bold text-2xl font-serif py-1`}>Service Times</div>
                    <div>Sunday School: 9:30 am</div>
                    <div>Sunday Worship: 11 am</div>
                    <div>Wednesday Prayer: 6:30 pm</div>
                </div>

            </div>
        </>
    )
  
}

export default Layout