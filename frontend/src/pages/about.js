import React, { useState, useEffect } from 'react'
import { graphql } from 'gatsby'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowMenu } from '../redux/actions/layout'
import { GatsbyImage } from "gatsby-plugin-image"
import Layout from '../components/Layout'

export const query = graphql`
query MyQuery {
  allSanityAboutGcbc{
    edges{
      node{
        _id
        title
        displayText
        pic{
          asset{
            gatsbyImageData
          }
        }                
      }
    }
  }
  allSanityAboutElders{
    edges{
      node{
        _id
        title
        displayText
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

const About = ({data}) => {  
  const gcbcs = data.allSanityAboutGcbc.edges  
  const elders = data.allSanityAboutElders.edges
  
  const dispatch = useDispatch()
  const showMenu = useSelector(state => state.layout.showMenu)

  useEffect(() => {
    dispatch(toggleShowMenu(false))
    window.scrollTo(0,0);
  }, [])
  
  const gcbcCard = (title, order1, order2) => {
    const edge = gcbcs.find(edge => edge.node.title === title)    
    const image = <GatsbyImage className={`shadow-xl h-full rounded md:rounded-lg ${order1} md:order-none`} image={edge.node.pic.asset['gatsbyImageData']} alt={title} />
    const words = <div className={`flex flex-col ${order2} md:order-none pb-28 md:pb-0`}>
                    <div className={`text-3xl md:text-4xl font-semibold py-6 text-gray-600`}>{edge.node.title}</div>
                    <div className={`leading-[1.8rem]`}>{edge.node.displayText}</div>                    
                  </div>

    return (
      <>
        {['Grace','Baptist'].includes(title) 
        ? <>{image}{words}</>
        : <>{words}{image}</>
        }                
      </>
    )
  }

  const elderCard = (elder) => {
    return (
      <>
        <GatsbyImage className={`shadow-xl h-full rounded-lg`} image={elder.node.pic.asset['gatsbyImageData']} alt={elder.node.title} />
        <div className={`flex flex-col pb-32 md:pb-0`}>
          <div className={`text-2xl font-semibold py-6 text-gray-600`}>{elder.node.title}</div>
          <div className={`leading-[1.8rem]`}>{elder.node.displayText}</div>
        </div>        
      </>
    )
  }

  return (
    <Layout>

    <div page={'about'} className={`pt-20 flex justify-center bg-gray-100`}>        

      <div className={`max-w-[1200px]`}>
      
        <div className={`px-6 md:px-12 pt-12 pb-36 min-h-screen flex flex-col justify-center bg-gray-100 transition-all ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}>
          
          {/* G C B C */}
          <div className={`flex flex-col items-center`}>
            <div className={`py-2 flex justify-center text-[#09314C] 
            text-4xl md:text-6xl font-sans font-bold tracking-widest`}>G &nbsp;C &nbsp;B &nbsp;C</div>
            <div className={`font-serif text-gray-500 text-lg md:text-xl`}>what's in a name?</div>
          </div>

          <div className={`border-b-2 my-6 md:my-8`}></div>

          <div className={`flex flex-col md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-24`}>

            {gcbcs && 
            <>
              {gcbcCard('Grace', 'order-1', 'order-2')}
              {gcbcCard('Covenant', 'order-3', 'order-4')}
              {gcbcCard('Baptist', 'order-5', 'order-6')}
              {gcbcCard('Church', 'order-7', 'order-8')}
            </>
            }

          </div>

          <div className={`py-6 md:py-12`}></div>          

          {/* OUR ELDERS */}
          <div className={`flex flex-col items-center`}>
            <div className={`py-2 flex justify-center text-[#09314C] 
            text-4xl md:text-6xl font-sans font-bold tracking-widest`}>Our Elders</div>
            <div className={`font-serif text-gray-500`}></div>
          </div>

          <div className={`border-b-2 my-6 md:my-8`}></div>
  
          <div className={`flex flex-col md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-32`}>
            {elders.sort((a,b) => a.node.title > b.node.title ? -1 : 1).map(elder => elderCard(elder))}
          </div>
                        

        </div>

      </div>

    </div>
    </Layout>
  )
}

export default About