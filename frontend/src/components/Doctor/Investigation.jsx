import React from 'react'
import Docnavbar from './DocNavbar'
import AppointmentSidebar from './AppointmentSidebar'
import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleDoubleLeft } from 'react-icons/fa';

const Investigation = () => {
  const location = useParams();
  const navigate = useNavigate();

  return (
    <div>
      <Docnavbar />
      <div className="flex">
        <AppointmentSidebar />
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
          <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
            <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-5 text-[#337ab7]'>
              INVESTIGATION
            </h1>
            <form className='mt-10'>
              <div className='flex  items-center justify-between mb-2 pr-5'>
                <h1 className='text-black text-xl font-semibold '>Advice Investigations : </h1>
                <div className='relative'>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Investigation