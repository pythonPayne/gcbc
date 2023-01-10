import React, { useState, useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Layout from '../components/Layout'
import { toggleShowMenu } from '../redux/actions/layout'

const Contact = () => {
  const [emailSubjectText, setEmailSubjectText] = useState('')
  const [emailBodyText, setEmailBodyText] = useState('')
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const showMenu = useSelector(state => state.layout.showMenu)
  
  useEffect(() => {
    dispatch(toggleShowMenu(false))
  }, [])

  return (
    <Layout>
      <div page={'contact'} className={`pt-20`}>
        <div className={`px-12 pb-72 pt-4 text-gray-700 min-h-screen flex justify-center bg-gray-100 transition-all ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}>

        {!emailSent &&
          <div className={`w-full flex flex-col max-w-5xl`}>

            <div className={`text-2xl py-8 text-gray-600 font-serif`}>Send the elders an email</div>

            <input className={`w-full bg-white border px-2 py-2 text-xl`} placeholder={'Subject...'}
            value={emailSubjectText} onChange={(e) => setEmailSubjectText(e.target.value)}></input>

            <br />

            <textarea className={`w-full min-h-[300px] max-h-[500px] bg-white p-2 text-xl`} placeholder={'Write us an email here...'}
            value={emailBodyText} onChange={(e) => setEmailBodyText(e.target.value)}></textarea>

            <br />

            <button className={`w-full bg-gray-200 p-2 hover:bg-gray-300 focus:outline-none hover:-translate-y-[.05rem] active:translate-y-1`}
            onClick={() => {
              setEmailSubjectText('')
              setEmailBodyText('')      
              setEmailSent(true)    
            }}>Send</button>

          </div>
        }

        {emailSent &&
          <div className={`grid place-content-center text-2xl font-serif text-center`}>
            <p>Thank you for your email.</p>
            <br/>
            <p>We will respond asap.</p>
          </div>
        }
          
        </div>
      </div>
    </Layout>
  )
}

export default Contact