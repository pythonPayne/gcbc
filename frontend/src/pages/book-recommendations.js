import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowMenu } from '../redux/actions/layout'
import Layout from '../components/Layout'


const BookRecommendations = ({data}) => {  
  const dispatch = useDispatch()
  const showMenu = useSelector(state => state.layout.showMenu)
  
  useEffect(() => {
    dispatch(toggleShowMenu(false))
  }, [])

  return (
    <Layout>
      <div page={'book-recommendations'} className={`pt-20 flex justify-center bg-gray-100`}>        

        <div className={`max-w-[1200px]`}>
          
          <div className={`px-12 py-8 min-h-screen bg-gray-100 transition-all 
            ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}> 

            <div className={`flex justify-center px-8 py-4 bg-orange-200 mt-4`}>Page in progress...</div>
          

          </div>
          
        </div>

      </div>
    </Layout>
  )
}

export default BookRecommendations