import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { graphql } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { toggleShowMenu } from '../redux/actions/layout'

export const query = graphql`
query MyQuery{
  allSanityPictures{
    edges{
      node{
        title
        pageAndFunction
        pic{
          asset{
            gatsbyImageData
          }
        }
      }
    }
  }
}
`

const Home = ({ data }) => {
  const dispatch = useDispatch()
  const [carouselImages, setCarouselImages] = useState(null)   
  const [carouselSlidingRight, setCarouselSlidingRight] = useState(false)
  const [carouselSlidingLeft, setCarouselSlidingLeft] = useState(false)
  const [currentPosition, setCurrentPosition] = useState(1)
  const showMenu = useSelector(state => state.layout.showMenu)
  
  useEffect(() => {
    dispatch(toggleShowMenu(false))    
    setCarouselImages(data.allSanityPictures.edges.filter(edge => edge.node.pageAndFunction === "homepageCarousel").map((edge,i) => {
      return {
        startPosition: i+1,
        position: i+1,
        gatsbyImageData: edge.node.pic.asset.gatsbyImageData
      }
    }))    
  }, [])

  useEffect(() => {
    setCurrentPosition(carouselImages && carouselImages.find(img => img.position === 1).startPosition)
  }, [carouselImages])  

  const onClickCarouselRight = () => {        
    setCarouselSlidingRight(true)        
    setTimeout(() => {                   
      setCarouselImages(carouselImages.map(img => {
        return {
          ...img,
          position: img.position === carouselImages.length ? 1 : img.position + 1,        
        }
      }))    
      setCarouselSlidingRight(false)
    }, 1000)
  }

  const onClickCarouselLeft = () => {            
    setCarouselSlidingLeft(true)
    setTimeout(() => {       
      setCarouselImages(carouselImages.map(img => {
        return {
          ...img,
          position: img.position === 1 ? carouselImages.length : img.position - 1,        
        }
      }))   
      setCarouselSlidingLeft(false) 
    }, 1000)
  }  

  const carouselImage = (position) => {
    const image = carouselImages && carouselImages.find(img => img.position === position)  
    if (image) {  
    return (
    <div className={`w-full shrink-0 h-full transition-all
    ${carouselSlidingRight 
      ? "translate-x-[0px] duration-[1000ms]" 
      : carouselSlidingLeft 
      ? "-translate-x-[180vw] duration-[1000ms]"            
      : "-translate-x-[90vw] duration-[0ms]"                            
      }`}>
      {image && <GatsbyImage className={`h-full`} image={image['gatsbyImageData']} alt={"carouselPic"} /> }
    </div>
    )} else return
  }

  const carouselRightArrowButton = () => (
    <button className={`grid place-content-center absolute h-full px-1 right-0 top-0 z-10 text-3xl bg-gray-100 text-gray-500 text-opacity-40
    transition-all duration-300 ease-in bg-opacity-10 hover:bg-opacity-60 hover:text-gray-900`}
    onClick={() => onClickCarouselLeft()}>
      <div>&#9654;</div>
    </button>
  )

  const carouselLeftArrowButton = () => (
    <button className={`grid place-content-center absolute h-full px-1 left-0 top-0 z-10 text-3xl bg-gray-100 text-gray-500 text-opacity-40
    transition-all duration-300 ease-in bg-opacity-10 hover:bg-opacity-60 hover:text-gray-900 `}
    onClick={() => onClickCarouselRight()}>
      <div>&#9664;</div>
    </button>
  )

  return (
    <Layout>
      <div page={'home'} className={`mt-20`}> 
        <div className={`pb-48 min-h-screen bg-gray-100 flex flex-col items-center pt-8 justify-center transition-all ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}> 

          {/* carousel */}
          <div className={`flex w-[90vw] h-[300px] md:h-[65vh] xl:h-[75vh] relative overflow-hidden`}
          style={{"transform":"translate3d(0px, 0px, 0px);"}}>  

            {/* right/left arrow buttons */}
            {carouselLeftArrowButton()}
            {carouselRightArrowButton()}

            {/* page circles */}
            <div className={`absolute bottom-0 flex w-full justify-center items-center py-2 z-10 space-x-4`}>
              <div className={`h-1 w-8 disabled ${currentPosition===3 ? "bg-white" : "bg-gray-200 bg-opacity-40"}`}></div>
              <div className={`h-1 w-8 disabled ${currentPosition===1 ? "bg-white" : "bg-gray-200 bg-opacity-40"}`}></div>
              <div className={`h-1 w-8 disabled ${currentPosition===2 ? "bg-white" : "bg-gray-200 bg-opacity-40"}`}></div>
            </div>
            
            {/* pics */}
            {carouselImage(3)}
            {carouselImage(1)}
            {carouselImage(2)}
            
          </div>  
      
          <div className={`flex justify-center items-center`}>
            <div className={`max-w-[75%] leading-10 tracking-widest py-10 text-center font-light text-md
            lg:text-2xl lg:leading-10`}>
            Grace Covenant Baptist Church exists for its members to 
            <span className={`font-bold text-[#09314C]`}> glorify God</span> in their worship 
            both personally and corporately and to equip its members for gospel life and witness 
            as the body of Christ wherever God leads them in His world.
            </div>
          </div>

        </div>
      </div>
    </Layout>
  )
}


export default Home


  