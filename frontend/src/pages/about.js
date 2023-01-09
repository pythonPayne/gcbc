import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowMenu } from '../redux/actions/layout'
import Layout from '../components/Layout'

const About = () => {
  const dispatch = useDispatch()
  const showMenu = useSelector(state => state.layout.showMenu)

  useEffect(() => {
    dispatch(toggleShowMenu(false))
    window.scrollTo(0,0);
  }, [])
  
  return (
    <Layout>

    <div page={'about'} className={`mt-20 flex justify-center bg-gray-100`}>        

      <div className={`max-w-[1200px]`}>
      
        <div className={`px-12 pt-6 pb-36 min-h-screen flex flex-col justify-center bg-gray-100 transition-all ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}>

          <div className={`flex flex-col space-y-10 max-w-5xl pb-12 border-b-2 border-gray-300 text-gray-600`}>

            <div>
              <div className={`text-4xl font-bold py-6 text-gray-600`}>Grace</div>
              <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada nunc vel risus commodo viverra maecenas accumsan. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Eget magna fermentum iaculis eu non. Ut faucibus pulvinar elementum integer enim neque. Turpis egestas pretium aenean pharetra magna ac. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Tristique risus nec feugiat in fermentum posuere urna nec. Aenean vel elit scelerisque mauris. Mauris commodo quis imperdiet massa tincidunt.
              </div>
            </div>

            <div>
              <div className={`text-4xl font-bold py-6 text-gray-600`}>Covenant</div>
              <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada nunc vel risus commodo viverra maecenas accumsan. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Eget magna fermentum iaculis eu non. Ut faucibus pulvinar elementum integer enim neque. Turpis egestas pretium aenean pharetra magna ac. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Tristique risus nec feugiat in fermentum posuere urna nec. Aenean vel elit scelerisque mauris. Mauris commodo quis imperdiet massa tincidunt.
              </div>
            </div>

            <div>
              <div className={`text-4xl font-bold py-6 text-gray-600`}>Baptist</div>
              <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada nunc vel risus commodo viverra maecenas accumsan. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Eget magna fermentum iaculis eu non. Ut faucibus pulvinar elementum integer enim neque. Turpis egestas pretium aenean pharetra magna ac. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Tristique risus nec feugiat in fermentum posuere urna nec. Aenean vel elit scelerisque mauris. Mauris commodo quis imperdiet massa tincidunt.
              </div>
            </div>

            <div>
              <div className={`text-4xl font-bold py-6 text-gray-600`}>Church</div>
              <div>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Malesuada nunc vel risus commodo viverra maecenas accumsan. Pellentesque pulvinar pellentesque habitant morbi tristique senectus. Eget magna fermentum iaculis eu non. Ut faucibus pulvinar elementum integer enim neque. Turpis egestas pretium aenean pharetra magna ac. Augue interdum velit euismod in pellentesque massa placerat duis ultricies. Tristique risus nec feugiat in fermentum posuere urna nec. Aenean vel elit scelerisque mauris. Mauris commodo quis imperdiet massa tincidunt.
              </div>        
            </div>

          </div>

          <div className={`flex flex-col space-y-10 max-w-5xl text-gray-600`}>

            <div>
              <div className={`text-4xl font-bold py-6 text-gray-600`}>Our Elders</div>
              <div>
              To do...
              </div>
              
            </div>

          
            
          </div>        
        </div>
      </div>
    </div>
    </Layout>
  )
}

export default About