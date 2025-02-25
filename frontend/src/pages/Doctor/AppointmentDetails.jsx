import React from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'

const AppointmentDetails = () => {

  return (
      <div>
          <Docnavbar />
          <div className="flex">
              <DocSidebar />
              <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
                  <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
                      <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-10 text-[#337ab7]'>
                          PATIENT DETAILS
                      </h1>
                      <div className='flex gap-2 mt-10'>
                          <div className='flex gap-3 w-1/5 px-5 py-10 rounded-lg bg-gray-300 flex-col items-center'>
                              <img src="/user.png" alt="user_image" className='size-28' />
                              <h1 className='text-2xl  font-semibold'>Rakesh</h1>
                              <h1 className='text-lg '>DOM-1001</h1>
                          </div>
                          <div className='w-4/5 gap-2 flex flex-col '>
                              <div className='flex p-5 rounded-lg bg-gray-300  text-lg items-center justify-around'>
                                  <div><span className='font-semibold'>Age :</span> <span>28 yrs</span></div>
                                  <div><span className='font-semibold'>Gender :</span> <span>Male</span></div>
                                  <div><span className='font-semibold'>Weight :</span> <span>67 Kgs</span></div>
                              </div>
                              <div className='flex p-5 rounded-lg bg-gray-300  text-lg items-center justify-around'>
                              <div><span className='font-semibold'>Phone :</span> <span>9780654312</span></div>
                              <div><span className='font-semibold'>Email :</span> <span>Rakesh@123.com</span></div>
                              <div><span className='font-semibold'>Address :</span> <span>21 street</span></div>
                              </div>
                              <div className='flex p-5 rounded-lg bg-gray-300  text-lg items-center justify-around'>
                              <div><span className='font-semibold'>Qualification :</span> <span>B.Tech</span></div>
                              <div><span className='font-semibold'>Occupation :</span> <span>Engineer</span></div>
                              <div><span className='font-semibold'>Marital Status :</span> <span>married</span></div>
                              </div>
                              <div className='flex p-5 rounded-lg bg-gray-300  text-lg items-center justify-evenly'>
                              <div><span className='font-semibold'>Referred By :</span> <span>Self</span></div>
                              <div><span className='font-semibold'>Dietary Preference :</span> <span>Vegetarian</span></div>
                              </div>
                          </div>
                      </div>
                 </div>
              </div>

          </div>

    </div>
  )
}

export default AppointmentDetails