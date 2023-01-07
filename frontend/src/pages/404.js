import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowMenu } from '../redux/actions/layout'
import Layout from '../components/Layout'

const NotFoundPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(toggleShowMenu(false))
  }, [])

  return (
    <Layout>
      <div page={'notfound'} className={`mt-20 min-h-screen`}>      
      </div>
    </Layout>
  )
}

export default NotFoundPage