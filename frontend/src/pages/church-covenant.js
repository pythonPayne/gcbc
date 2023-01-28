import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleShowMenu } from '../redux/actions/layout'
import Layout from '../components/Layout'

const Covenant = () => {  
  
  const dispatch = useDispatch()
  const showMenu = useSelector(state => state.layout.showMenu)

  useEffect(() => {
    dispatch(toggleShowMenu(false))
    window.scrollTo(0,0);
  }, [])
  
  return (
    <Layout>

    <div page={'church-covenant'} className={`pt-20 pb-48 md:pb-96 flex justify-center bg-gray-100`}>        

      <div className={`max-w-[1200px]`}>
      
        <div className={`px-12 md:px-12 pt-12 pb-36 min-h-screen flex flex-col bg-gray-100 transition-all ${showMenu ? "blur-sm duration-500" : "blur-none duration-200"}`}>
          
          <div className={`text-3xl lg:text-4xl font-semibold text-[#09314C]`}>Church Covenant</div>

          <div className={`pt-10`}>

            <p className={`pb-6 leading-7 text-lg text-justify text-gray-700`}>
              Having been led, as we believe, by the Spirit of God, to receive the Lord Jesus Christ as Savior, and on the profession of our faith, having been baptized in the name of the Father, and of the Son, and of the Holy Spirit, we do now, in the presence of God, angels, and this assembly, most solemnly and joyfully enter into covenant with one another, as one body in Christ.
            </p>

            <p className={`pb-6 leading-7 text-lg text-justify text-gray-700`}>
            We pledge, therefore, by the aid of the Holy Spirit, not to forsake the assembling of ourselves together; to walk together in Christian love; to strive for the advancement of this church in knowledge, holiness, and comfort; to promote its prosperity and spirituality; to sustain its worship, ordinances, discipline, and doctrines; to contribute cheerfully and regularly to the support of the ministry, the expenses of the church, the relief of the poor, and the spread of the gospel through all nations.
            </p>

            <p className={`pb-6 leading-7 text-lg text-justify text-gray-700`}>
            We pledge also to maintain family and secret devotions; to religiously educate our children; to seek the salvation of our kindred and acquaintances; to walk discreetly in the world; to be just in our dealings, faithful in our obligations, and exemplary in our conduct; to avoid all gossiping, backbiting, and excessive anger; to abstain from all appearance of evil; and to be zealous in our efforts to advance the Kingdom of our Savior.
            </p>

            <p className={`pb-6 leading-7 text-lg text-justify text-gray-700`}>
            We pledge further to watch over one another in brotherly love; to remember each other in prayer; to aid each other in sickness and distress; to cultivate Christian sympathy in feeling and courtesy in speech; to be slow to take offense, but always ready for reconciliation, and mindful of the rules of our Savior to secure it without delay.
            </p>

            <p className={`pb-6 leading-7 text-lg text-justify text-gray-700`}>
            We pledge moreover to unite as soon as possible with some other church where we can carry out the spirit of this covenant and the principles of God’s Word when we remove from this place.    
            </p>

          </div>

        </div>

      </div>

    </div>

    </Layout>
  )
}

export default Covenant