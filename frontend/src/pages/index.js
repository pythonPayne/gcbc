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
  const showMenu = useSelector(state => state.layout.showMenu)    
  const carouselRefs = useRef([])
  const [x0, setx0] = useState(0)
  const [x1, setx1] = useState(1)
  const [x2, setx2] = useState(1)
  carouselRefs.current = []

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
  
  const addToRefs = (el) => {
    if (el && !carouselRefs.current.includes(el)){
      carouselRefs.current.push(el)
    }    
  }

  const carouselImage = (position) => {
    const image = carouselImages && carouselImages.find(img => img.position === position)  
    if (image) {  
    return (
    <div id={`carouselImage-${position}`} ref={addToRefs}
    className={`w-full shrink-0 h-full snap-center`}>
      {image && <GatsbyImage className={`h-full`} image={image['gatsbyImageData']} alt={"carouselPic"} /> }
    </div>
    )} else return
  }        

  const updateCarouselRefs = () => {
    setx0(carouselRefs.current[0] && carouselRefs.current[0].getBoundingClientRect().x)
    setx1(carouselRefs.current[1] && carouselRefs.current[1].getBoundingClientRect().x)
    setx2(carouselRefs.current[2] && carouselRefs.current[2].getBoundingClientRect().x)    
  }
  
  const goal = Math.min(Math.abs(x0), Math.abs(x1), Math.abs(x2))
  const closest = [x0, x1, x2].reduce((prev, curr) => Math.abs(curr - goal) < Math.abs(prev - goal) ? curr : prev);
  
  return (
    <Layout>
    <div page={'home'} className={`mt-20 flex justify-center bg-gray-100`}>        

      <div className={`max-w-[1200px] `}>

        <div className={`pb-48 min-h-screen bg-gray-100 flex flex-col items-center pt-8 justify-center transition-all 
        ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}> 
                        
          {/* carousel */}
          <div onScroll={updateCarouselRefs} className={`flex w-[90vw] xl:w-[1200px] h-[300px] md:h-[65vh] xl:h-[75vh] relative overflow-x-scroll snap-x snap-mandatory`}>  
                        
            {carouselImage(1)}
            {carouselImage(2)}
            {carouselImage(3)}
            
          </div>  
      
          <div className={`flex w-full justify-center items-center py-2 z-10 space-x-4`}>
            <div className={`h-2 w-8 disabled ${closest === x0 ? "bg-[#09314C]" : "border border-[#09314C] border-opacity-50"}`}></div>
            <div className={`h-2 w-8 disabled ${closest === x1 ? "bg-[#09314C]" : "border border-[#09314C] border-opacity-50"}`}></div>
            <div className={`h-2 w-8 disabled ${closest === x2 ? "bg-[#09314C]" : "border border-[#09314C] border-opacity-50"}`}></div>
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
    </div>
    </Layout>
  )
}


export default Home


  