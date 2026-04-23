'use client'
import React, { useEffect } from "react"
import { useDispatch } from "react-redux"
import { toggleShowMenu } from "@/redux/actions/layout"
import Layout from "@/components/Layout"

export default function NotFound() {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(toggleShowMenu(false))
  }, [])

  return (
    <Layout>
      <div className={`min-h-screen bg-gray-100 flex w-full justify-center items-center`}>
        <div className={`pt-20 text-center text-md md:text-lg`}>
          <p>Page not found.</p>
          <br />
        </div>
      </div>
    </Layout>
  )
}