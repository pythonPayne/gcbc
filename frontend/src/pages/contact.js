import React, { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import Layout from "../components/Layout"
import { toggleShowMenu } from "../redux/actions/layout"
import { SEO } from "../components/seo"

const Contact = () => {
  const [emailSending, setEmailSending] = useState(false)
  const [emailSenderEmail, setEmailSenderEmail] = useState("")
  const [emailSubjectText, setEmailSubjectText] = useState("")
  const [emailBodyText, setEmailBodyText] = useState("")
  const [emailSent, setEmailSent] = useState(false)
  const dispatch = useDispatch()
  const showMenu = useSelector((state) => state.layout.showMenu)

  const FORM_ENDPOINT =
    "https://public.herotofu.com/v1/37700e80-b97b-11ed-aecb-e7ff0a88dd7c"

  useEffect(() => {
    dispatch(toggleShowMenu(false))
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    setEmailSending(true)
    // Anything you need to inject dynamically
    const injectedData = {
      DYNAMIC_DATA_EXAMPLE: 123,
    }
    const inputs = e.target.elements
    const data = {}

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value
      }
    }

    Object.assign(data, injectedData)

    fetch(FORM_ENDPOINT, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        // It's likely a spam/bot request, so bypass it to validate via captcha
        if (response.status === 422) {
          Object.keys(injectedData).forEach((key) => {
            const el = document.createElement("input")
            el.type = "hidden"
            el.name = key
            el.value = injectedData[key]

            e.target.appendChild(el)
          })

          e.target.submit()
          throw new Error("Please finish the captcha challenge")
        }

        if (response.status !== 200) {
          throw new Error(response.statusText)
        }

        return response.json()
      })
      .then(() => {
        setEmailSent(true)
        setEmailSending(false)
        setEmailSubjectText("")
        setEmailBodyText("")
      })
      .catch((err) => setEmailSent(true))
  }

  return (
    <Layout>
      <div
        page={"contact"}
        className={`${showMenu && "pointer-events-none"} pt-20`}
      >
        <div
          className={`px-12 pb-72 pt-4 text-gray-700 min-h-screen flex justify-center bg-gray-100 transition-all ${
            showMenu ? "blur-sm duration-500" : "blur-none duration-200"
          }`}
        >
          {!emailSent && !emailSending && (
            <div className={`w-full flex flex-col max-w-4xl`}>
              <div className={`text-2xl py-8 text-gray-600 font-serif`}>
                Send the elders an email
              </div>
              <form
                action={FORM_ENDPOINT}
                onSubmit={(e) => handleSubmit(e)}
                method="post"
              >
                <div className={`ring-1 ring-gray-300 shadow-md mb-4`}>
                  <input
                    className={`w-full bg-white px-2 py-2 text-xl 
                    placeholder-gray-300 text-gray-500`}
                    placeholder={"Your email address..."}
                    required
                    name="emailSenderEmail"
                    value={emailSenderEmail}
                    type="email"
                    onChange={(e) => setEmailSenderEmail(e.target.value)}
                  />
                </div>

                <div className={`ring-1 ring-gray-300 shadow-md mb-4`}>
                  <input
                    className={`w-full bg-white px-2 py-2 text-xl
                placeholder-gray-300 text-gray-500`}
                    placeholder={"Subject..."}
                    required
                    name="emailSubjectText"
                    value={emailSubjectText}
                    type="text"
                    onChange={(e) => setEmailSubjectText(e.target.value)}
                  />
                </div>

                <div
                  className={`ring-1 ring-gray-300 shadow-md h-[250px] overflow-y-scroll`}
                >
                  <textarea
                    className={`bg-white text-xl w-full p-2
                placeholder-gray-300 text-gray-500 h-[250px]`}
                    placeholder={"Email..."}
                    required
                    name="emailBodyText"
                    value={emailBodyText}
                    type="text"
                    onChange={(e) => setEmailBodyText(e.target.value)}
                  ></textarea>
                </div>

                <button
                  className={`mt-8 shadow-md ring-1 ring-gray-400 w-full p-2 text-white bg-gray-400 font-semibold tracking-wider hover:bg-gray-500 focus:outline-none hover:-translate-y-[.05rem] active:translate-y-1`}
                  type="submit"
                >
                  Send
                </button>
              </form>
            </div>
          )}

          {emailSending && (
            <div
              className={`grid place-content-center text-2xl font-serif text-center`}
            >
              <p>Email on it's way.</p>
              <br />
              <p>Will confirm in just a second...</p>
            </div>
          )}

          {emailSent && (
            <div
              className={`grid place-content-center text-2xl font-serif text-center`}
            >
              <p>Thank you for your email.</p>
              <br />
              <p>We will get back with you ASAP.</p>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

export default Contact

export const Head = () => <SEO title="contact" />
