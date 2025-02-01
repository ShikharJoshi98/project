import React from 'react'
import { FaPhoneAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
const Contact = () => {
    const contactCard = [{location:"Dombivali Branch",phone:888888888},{location:"Mulund Branch",phone:8080848403}]
    const navigate = useNavigate();
  return (
    <div >
        <div className='flex flex-col  p-6 items-center gap-7 max-w-[326px]  md:max-w-[760px]  lg:max-w-[900px] h-auto mt-20 bg-white mx-auto shadow-gray-700 shadow-lg rounded-lg'>
          <h1 className='text-xl md:text-4xl font-semibold text-slate-800'>FOR APPOINTMENTS</h1>
          <hr className='bg-[#4a9acc] h-1 border-none rounded-sm w-28 ' />
          <h1 className='text-2xl font-semibold mt-6 text-slate-800'>"Call Us"</h1>
          <div className=' md:flex-row flex  md:items-stretch flex-col gap-4  items-center '>
            {contactCard.map((detail) => (
              <div className=' max-w-[210px] md:max-w-[300px] rounded-xl hover:shadow-gray-600 hover:shadow-2xs  hover:scale-[102%] transition-all  duration-300 flex flex-col items-center gap-4 p-10 h-auto bg-[#c0c0c0] '>
                <div className='w-auto px-5 h-auto py-3  border-white border-2 rounded-md text-center bg-[#afdbf5] '>
                    <h1 className='text-xl font-bold text-zinc-900'>{detail.location}</h1>
                </div>
                <hr className='bg-[#4a9acc] h-1 border-none rounded-sm w-16 mt-2 ' />
                <div className='flex items-center gap-3 group '>
                  <FaPhoneAlt style={{ width: '25px', height: '25px', color:'white', backgroundColor:'#1e232f', padding:'5px',borderRadius:'50%', }} className='group-hover:rotate-[20deg]'  />
                  <h2 className='text-lg font-semibold'>{ detail.phone}</h2>
                  </div>

                </div>
            ))}
                 
              </div>
              <div className='flex mt-4 mb-4 items-center gap-6'>
                      <h1 className='text-lg font-semibold'>Visit Us </h1>
                      <button onClick={()=>navigate('/register')} className='bg-blue-400 cursor-pointer hover:bg-blue-600 hover:scale-102 hover:text-gray-200 text-lg transition-all duration-300 text-white font-semibold w-40 h-10 rounded-full' >Register</button>
                  </div>
        </div>
      </div>
  )
}

export default Contact