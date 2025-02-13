import Portfolio from '../components/Portfolio'
import AboutCard from '../components/AboutCard'
import Contact from '../components/Contact'
import React from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'

const Home = () => {
  return (
    <div className='bg-gradient-to-br from-blue-400 via-[#4a9acc] to-blue-900 ' >   
      <Navbar/>
      <video autoPlay muted loop src="/wings.mp4" className=' max-w-[326px] mt-4  md:max-w-[760px]  lg:max-w-[900px]  h-auto mx-auto   shadow-gray-700 shadow-lg rounded-lg '></video>
      <Contact/>
      <AboutCard />
      <Portfolio />
      <Footer/>
    </div>
  )
}

export default Home