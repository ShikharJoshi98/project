import Portfolio from '../components/Portfolio'
import AboutCard from '../components/AboutCard'
import Contact from '../components/Contact'
import React from 'react'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <div >   
      <video autoPlay muted loop src="/src/public/wings.mp4" className=' max-w-[326px]  md:max-w-[760px]  lg:max-w-[900px]  h-auto mx-auto  mt-4 shadow-gray-700 shadow-lg rounded-lg '></video>
      <Contact/>
      <AboutCard />
      <Portfolio />
      <Footer/>
    </div>
  )
}

export default Home