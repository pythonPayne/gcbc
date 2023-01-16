import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { graphql } from 'gatsby'
import { toggleShowMenu } from '../redux/actions/layout'
import Layout from '../components/Layout'

export const query = graphql`
query MyQuery {
  allSanityCalendar{
    edges{
      node{
        _id
        title
        startDateTime
        endDateTime
        contact
        url
        description        
      }
    }
  }
}
`

const Calendar = ({data}) => {  
  const dispatch = useDispatch()
  const showMenu = useSelector(state => state.layout.showMenu)
  const [events, setEvents] = useState(data.allSanityCalendar.edges.sort(
    (a,b) => a.startDateTime < b.startDateTime ? 1 : -1))

  useEffect(() => {
    dispatch(toggleShowMenu(false))
  }, [])

  const calendar_card = (node) => {
    const d = new Date(node.startDateTime)    
    if(d > Date.now())
    return (
      <div className={`ring-1 ring-gray-300 p-3`}>
        <div className={`font-serif text-lg`}>{node.title}</div>          
        <div className={`text-sm`}>{d.toDateString()}</div>      
        <div className={`text-sm`}>{d.toLocaleTimeString()}</div>      
      </div>
    )
  }

  return (
    <Layout>
      <div page={'calendar'} className={`pt-20 flex justify-center bg-gray-100`}>        

        <div className={`max-w-[1200px]`}>
          <div className={`px-12 py-8 min-h-screen bg-gray-100 transition-all 
            ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}> 
            
            <div className={`pb-8 flex flex-col space-y-5`}>
              {events.map(event => calendar_card(event.node))}
            </div>

          </div>
        </div>

      </div>
    </Layout>
  )
}

export default Calendar