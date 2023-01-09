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
  const [currentPosition, setCurrentPosition] = useState(1)
  const [carouselPosition, setCarouselPosition] = useState(null)  
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

  

  const carouselImage = (position) => {
    const image = carouselImages && carouselImages.find(img => img.position === position)  
    if (image) {  
    return (
    <div id={`carouselImage-${position}`} className={`w-full shrink-0 h-full snap-center`}>
      {image && <GatsbyImage className={`h-full`} image={image['gatsbyImageData']} alt={"carouselPic"} /> }
    </div>
    )} else return
  }  

  const changeBackground = (entries) => {
      entries.forEach((entry) => {
          if (              
              entry.isIntersecting &&
              entry.intersectionRatio.toFixed(2) == 1.00
          ) {
              setCarouselPosition(entry.target.id)
          }
      })
  }
  const observer = new IntersectionObserver(
      changeBackground,
      { threshold: 1}
  )

  document.querySelectorAll('.snap-center').forEach(el => observer.observe(el))
  
  return (
    <Layout>
      <div page={'home'} className={`mt-20`}> 
        <div className={`pb-48 min-h-screen bg-gray-100 flex flex-col items-center pt-8 justify-center transition-all 
        ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}> 
              
          {/* carousel */}
          <div className={`flex w-[90vw] h-[300px] md:h-[65vh] xl:h-[75vh] relative overflow-x-scroll snap-x snap-mandatory`}>  
                        
            {carouselImage(1)}
            {carouselImage(2)}
            {carouselImage(3)}
            
          </div>  
      
          <div className={`flex w-full justify-center items-center py-2 z-10 space-x-4`}>
            <div className={`h-2 w-8 disabled ${carouselPosition==='carouselImage-1' ? "bg-[#09314C]" : "border border-[#09314C] border-opacity-50"}`}></div>
            <div className={`h-2 w-8 disabled ${carouselPosition==='carouselImage-2' ? "bg-[#09314C]" : "border border-[#09314C] border-opacity-50"}`}></div>
            <div className={`h-2 w-8 disabled ${carouselPosition==='carouselImage-3' ? "bg-[#09314C]" : "border border-[#09314C] border-opacity-50"}`}></div>
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


  