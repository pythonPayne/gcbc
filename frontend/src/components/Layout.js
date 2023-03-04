import React, { useState, useEffect } from "react"
import { StaticImage } from "gatsby-plugin-image"
import { useDispatch, useSelector } from "react-redux"
import { toggleShowMenu } from "../redux/actions/layout"
import { Link } from "gatsby"

const Layout = (props) => {
  const page = props.children.props.page
  const dispatch = useDispatch()
  const showMenu = useSelector((state) => state.layout.showMenu)
  const [hoverMenu, setHoverMenu] = useState(null)

  const navigation_button = (text, links) => {
    return (
      <div onMouseLeave={() => setHoverMenu(null)} className={`relative`}>
        <div
          className={`text-sm select-none px-6 py-1 ring-1 transition-all duration-1000
            ${
              hoverMenu !== text && hoverMenu !== null
                ? "text-gray-200 ring-gray-100 border-gray-100"
                : "text-gray-600 ring-gray-200 border-gray-100"
            }
            ${hoverMenu === text && "bg-gray-100"}
            `}
          onMouseOver={() => setHoverMenu(text)}
        >
          {text}
        </div>
        {hoverMenu === text && navigation_button_links(links)}
      </div>
    )
  }

  const navigation_button_links = (links) => {
    const linkClass =
      "text-sm whitespace-nowrap px-2 py-2 text-gray-600 hover:text-blue-700"
    return (
      <div
        className={`shadow-2xl absolute ring-1 ring-gray-200 -mt-[.04rem] z-10 bg-white pl-2 pr-24 pb-2 flex flex-col pt-2`}
      >
        {links.map((link) => {
          if (link.tag === "Link")
            return (
              <Link to={link.route} className={linkClass}>
                {link.text}
              </Link>
            )
          else if (link.tag === "a")
            return (
              <a href={link.route} target="_blank" className={linkClass}>
                {link.text}
              </a>
            )
        })}
      </div>
    )
  }

  const side_menu_link = (link) => {
    const linkClass = `font-serif border-l-2 pl-4 py-2 hover:text-gray-800 overflow-hidden whitespace-nowrap
    ${
      page === link.page
        ? "text-gray-800 border-[#09314C] border-opacity-50 bg-gradient-to-l from-white to-[#09314C]/[4%]"
        : "text-gray-500 border-white"
    }`
    if (link.tag === "Link")
      return (
        <Link className={linkClass} to={link.route}>
          {link.text}
        </Link>
      )
    else if (link.tag === "a")
      return (
        <a className={linkClass} href={link.route} target={"_blank"}>
          {link.text}
        </a>
      )
  }

  return (
    <>
      {/* Top navigation bar, Links hidden on SM & MD screens */}
      <div className={`fixed w-full z-50 h-20 bg-white shadow`}>
        <div
          className={`flex h-full justify-between items-center pl-1 pr-4 md:pl-5 md:pr-10`}
        >
          <Link to={`/`}>
            <StaticImage
              backgroundColor="white"
              class={`bg-white h-[75%]`}
              height={70}
              src={"../images/Logo_Blue.png"}
              alt={`logo`}
            />
          </Link>

          <div
            className={`lg:hidden flex flex-col space-y-2 h-10 w-10 justify-center items-center cursor-pointer border`}
            onClick={() => dispatch(toggleShowMenu(!showMenu))}
          >
            <div
              className={`transition-all duration-200 bg-gray-400
                            ${
                              showMenu
                                ? "w-[.15rem] h-5 rotate-45 translate-y-[.715rem]"
                                : "h-[.15rem] w-5"
                            }`}
            ></div>

            <div
              className={`transition-all duration-200 bg-gray-400
                            ${
                              showMenu
                                ? "w-[.15rem] h-5 -rotate-45 -translate-y-[.715rem]"
                                : "h-[.15rem] w-5"
                            }`}
            ></div>
          </div>

          <div
            className={`hidden lg:flex lg:space-x-5 lg:font-sans lg:items-center`}
          >
            {navigation_button("About", [
              {
                tag: "Link",
                route: "/about",
                text: "About Us",
              },
              {
                tag: "Link",
                route: "/beliefs",
                text: "Beliefs",
              },
              {
                tag: "Link",
                route: "/church-covenant",
                text: "Church Covenant",
              },
              {
                tag: "a",
                route:
                  "https://drive.google.com/drive/folders/1My0xUd9s0d3Rn2bGjeoLn_YeONPIpzpD?usp=share_link",
                text: "Members",
              },
            ])}

            {navigation_button("Media", [
              {
                tag: "Link",
                route: "/sermons",
                text: "Sermons",
              },
              {
                tag: "Link",
                route: "/sunday-school",
                text: "Sunday School",
              },
              {
                tag: "a",
                route:
                  "https://www.sermonaudio.com/player/webcast/gracecovenantbaptist/",
                text: "Livestream",
              },
            ])}

            {navigation_button("Studies", [
              {
                tag: "Link",
                route: "/book-studies",
                text: "Book Studies",
              },
            ])}

            {navigation_button("Outreach", [
              {
                tag: "Link",
                route: "/outreach",
                text: "Ministries",
              },
            ])}

            {navigation_button("Contact", [
              {
                tag: "Link",
                route: "/contact",
                text: "Contact",
              },
            ])}
          </div>
        </div>
      </div>

      {/* side menus */}
      <div className={`flex lg:hidden text-sm`}>
        {/* right side menu */}
        <div
          className={`transition-all fixed text-gray-600 top-20 right-0 border-l bg-white shadow-2xl min-h-screen z-20 overflow-auto max-w-[500px] no-scrollbar
                ${
                  showMenu
                    ? "w-[50vw] md:w-[25vw] duration-1000"
                    : "w-0 text-white duration-[0ms]"
                }
                `}
        >
          <div className={`relative`}>
            <div className={`absolute pb-[50vh] w-full pl-4 pr-4 pt-8`}>
              <div className={`flex flex-col space-y-2`}>
                {side_menu_link({
                  tag: "Link",
                  route: "/about",
                  page: "about",
                  text: "About Us",
                })}

                {side_menu_link({
                  tag: "Link",
                  route: "/beliefs",
                  page: "beliefs",
                  text: "Beliefs",
                })}

                {side_menu_link({
                  tag: "Link",
                  route: "/church-covenant",
                  page: "church-covenant",
                  text: "Church Covenant",
                })}

                {side_menu_link({
                  tag: "a",
                  route:
                    "https://drive.google.com/drive/folders/1My0xUd9s0d3Rn2bGjeoLn_YeONPIpzpD?usp=share_link",
                  page: "",
                  text: "Members",
                })}

                <hr className="border border-gray-200" />

                {side_menu_link({
                  tag: "Link",
                  route: "/sermons",
                  page: "sermons",
                  text: "Sermons",
                })}

                {side_menu_link({
                  tag: "Link",
                  route: "/sunday-school",
                  page: "sunday-school",
                  text: "Sunday School",
                })}

                {side_menu_link({
                  tag: "a",
                  route:
                    "https://www.sermonaudio.com/player/webcast/gracecovenantbaptist/",
                  page: "",
                  text: "Livestream",
                })}

                <hr className="border border-gray-200" />

                {side_menu_link({
                  tag: "Link",
                  route: "/book-studies",
                  page: "book-studies",
                  text: "Book Studies",
                })}

                {side_menu_link({
                  tag: "Link",
                  route: "/outreach",
                  page: "outreach",
                  text: "Outreach",
                })}

                {side_menu_link({
                  tag: "Link",
                  route: "/contact",
                  page: "contact",
                  text: "Contact Us",
                })}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div
        className={`w-full`}
        onClick={() => {
          showMenu && dispatch(toggleShowMenu(false))
        }}
      >
        {props.children}
      </div>

      {/* Footer */}
      <div
        className={`bg-[#09314C] text-gray-300 text-opacity-80 grid grid-cols-1 text-center gap-y-[3rem] py-28
            lg:grid-cols-2`}
      >
        <div className={`py-10 tracking-wide text-lg lg:text-xl`}>
          <div
            className={`font-bold text-2xl lg:text-4xl font-serif py-1 tracking-wider text-gray-100`}
          >
            Contact
          </div>
          <div className={`pt-2 space-y-1`}>
            <div>(205) 426-2234</div>
            <div>pastor@gracecovenantbaptist.org</div>
          </div>
          <div className={`pt-3`}>
            <a
              className={`underline`}
              target="_blank"
              href="https://www.google.com/maps/dir//Grace+Covenant+Baptist+Church,+2565+Rocky+Ridge+Rd,+Vestavia+Hills,+AL+35243/@33.4295652,-86.8408153,12z/data=!4m8!4m7!1m0!1m5!1m1!1s0x888918455c0624b3:0x25d19d79c0c6e263!2m2!1d-86.7707752!2d33.4295849"
            >
              2565 Rocky Ridge Road
              <br />
              Vestavia Hills Alabama 35243
            </a>
          </div>
        </div>

        <div className={`py-10 tracking-wide text-lg lg:text-xl`}>
          <div
            className={`font-bold text-2xl lg:text-4xl font-serif py-1 tracking-wider text-gray-100`}
          >
            Service Times
          </div>
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
