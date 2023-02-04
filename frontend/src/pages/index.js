import React, {useState, useEffect, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { graphql, Link } from 'gatsby'
import { GatsbyImage } from "gatsby-plugin-image"
import { toggleShowMenu } from '../redux/actions/layout'


export const query = graphql`
query MyQuery{
  allSanityCarouselPictures{
    edges{
      node{
        title
        page
        sortOrder
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
  const [x1, setx1] = useState(0)
  const [x2, setx2] = useState(1)
  const [x3, setx3] = useState(1)
  const [goal, setGoal] = useState(null)
  const [closest, setClosest] = useState(null)  
  carouselRefs.current = []

  useEffect(() => {
    dispatch(toggleShowMenu(false))    
    setCarouselImages(data.allSanityCarouselPictures.edges.sort((a,b) => a.node.sortOrder < b.node.sortOrder ? -1 : 1).map((edge,i) => {
      return {
        ...edge,
        startPosition: i+1,
        position: i+1,
        gatsbyImageData: edge.node.pic.asset.gatsbyImageData
      }
    }))    
  }, [])
    
  useEffect(() => {
    setCurrentPosition(carouselImages && carouselImages.find(img => img.position === 1).startPosition)
  }, [carouselImages])  
  
  useEffect(() => {    
    const temp = Math.min(Math.abs(x1), Math.abs(x2), Math.abs(x3))
    setGoal(temp)
    setClosest([x1, x2, x3].reduce((prev, curr) => Math.abs(curr - temp) < Math.abs(prev - temp) ? curr : prev))      
  }, [x1, x2, x3])  
    
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
    className={`w-full shrink-0 h-full snap-center relative`}>
      {
      image && ['sermons','book-studies',].includes(image.node.page)
      ?
        <Link to={`/${image.node.page}`}>
          <GatsbyImage className={`h-full w-full`} image={image['gatsbyImageData']} alt={"carouselPic"} />
          <div className={`absolute top-0 h-full w-full flex flex-col justify-end items-center`}>
            <div className={`flex w-full text-center justify-center px-5 py-4 bg-gray-500 bg-opacity-20 
            text-gray-50 tracking-wide font-serif text-2xl md:text-4xl md:py-8`}>{image.node.title}</div>
          </div>
        </Link>                
      : 
      image && ['livestream',].includes(image.node.page) 
      ?
        <a href={`https://www.sermonaudio.com/player/webcast/gracecovenantbaptist/`} target="_blank">
          <GatsbyImage className={`h-full w-full`} image={image['gatsbyImageData']} alt={"carouselPic"} />
          <div className={`absolute top-0 h-full w-full flex flex-col justify-end items-center`}>
            <div className={`flex w-full text-center justify-center px-5 py-4 bg-gray-500 bg-opacity-20 
            text-gray-50 tracking-wide font-serif text-2xl md:text-4xl md:py-8`}>{image.node.title}</div>
          </div>
        </a>    
      :
      <div>
        <GatsbyImage className={`h-full w-full`} image={image['gatsbyImageData']} alt={"carouselPic"} />
        <div className={`absolute top-0 h-full w-full flex flex-col justify-end items-center`}>
          <div className={`flex w-full text-center justify-center px-5 py-4 bg-gray-500 bg-opacity-20 
          text-gray-50 tracking-wide font-serif text-2xl md:text-4xl md:py-8`}>{image.node.title}</div>
        </div>
      </div>    
      }
    </div>
    )} else return
  }       
  
  const onClickCarouselButton = (position) => {
    setCurrentPosition(position)
    document.getElementById(`carouselImage-${position}`).scrollIntoView({behavior: "smooth", block: "end"})
  }

  const carouselButton = (x, position) => (
      <button
        onClick={() => onClickCarouselButton(position)} 
        className={`h-2 w-8 pointer-events-none md:pointer-events-auto duration-500 border border-[#09314C] border-opacity-50
        ${closest === x
          ? "bg-[#09314C]" 
          : "" }`}>
      </button>      
    )
  
  const updateCarouselRefs = () => {    
      setx1(carouselRefs.current[0] && carouselRefs.current[0].getBoundingClientRect().x)
      setx2(carouselRefs.current[1] && carouselRefs.current[1].getBoundingClientRect().x)
      setx3(carouselRefs.current[2] && carouselRefs.current[2].getBoundingClientRect().x)              
  }  

  return (
    <Layout>
    <div page={'home'} className={`${showMenu && "pointer-events-none"} flex justify-center pt-20 bg-gray-100`}>        

      <div className={`max-w-[1200px] `}>

        <div className={`pb-48 min-h-screen bg-gray-100 flex flex-col items-center pt-8 justify-center transition-all 
        ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}> 
                        
          {/* carousel images */}
          <div onScroll={updateCarouselRefs} 
          className={`flex w-[90vw] xl:w-[1200px] h-[300px] md:h-[65vh] xl:h-[75vh] 
          relative overflow-x-scroll snap-x snap-mandatory no-scrollbar`}>                          
            {carouselImage(1)}
            {carouselImage(2)}
            {carouselImage(3)}            
          </div>  
      
          {/* carousel buttons */}
          <div className={`flex w-full justify-center items-center py-2 z-10 space-x-4`}>
            {carouselButton(x1,1)}
            {carouselButton(x2,2)}
            {carouselButton(x3,3)}
          </div>

          <div className={`flex justify-center items-center`}>
            <div className={`max-w-[75%] leading-10 tracking-widest py-10 text-center font-light text-md
            md:text-2xl md:leading-[4rem] md:py-20`}>
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


  