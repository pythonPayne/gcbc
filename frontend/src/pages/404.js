import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toggleShowMenu } from "../redux/actions/layout"
import Layout from "../components/Layout"

const NotFoundPage = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(toggleShowMenu(false))
  }, [])

  return (
    <Layout>
      <div
        page={"notfound"}
        className={`min-h-screen bg-red-100 flex w-full justify-center items-center`}
      >
        <div className={`pt-20 text-center text-md md:text-lg`}>
          <p>Page not found.</p>
          <br />
        </div>
      </div>
    </Layout>
  )
}

export default NotFoundPage
