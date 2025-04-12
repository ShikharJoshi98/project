import React from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import PatientNavbar from '../../components/Patient/PatientNavbar';

const PatientDashboard = () => {
  const { user } = useAuthStore();

  return (
    <div>
      <PatientNavbar />
      <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden'>
        <div className='bg-[#e9ecef] w-auto  mx-10 my-6 rounded-lg'>
          <h1 className='text-stone-800 w-fit text:lg sm:text-xl font-semibold md:text-3xl p-5 rounded-lg'>Welcome {user?.fullname} !</h1>
          <div className='flex md:flex-row flex-col items-center md:items-start px-5 py-5 gap-2'>
            <div className='flex gap-3 w-full md:w-1/5 px-5 py-10 lg:py-16.5 rounded-lg bg-gray-300 flex-col items-center'>
              <img src="/user.png" alt="user_image" className='size-20 md:size-28' />
              <h1 className='text-lg md:text-xl  font-semibold'>{user?.fullname}</h1>
              <h1 className='text-sm md:text-base '>{user?.casePaperNo}</h1>
            </div>
            <div className='w-full md:w-4/5 gap-2 flex flex-col '>
              <div className='py-5 px-10 rounded-lg bg-gray-300 text-xs lg:text-lg grid gap-y-5 sm:grid-cols-3 grid-cols-2 '>
                <div><span className='font-semibold'>Age :</span> <span>{user?.age}</span></div>
                <div><span className='font-semibold'>Gender :</span> <span>{user?.gender}</span></div>
                <div><span className='font-semibold'>Weight :</span> <span>67 Kgs</span></div>
              </div>
              <div className='grid gap-y-5 sm:grid-cols-3 grid-cols-2 py-5 px-10 rounded-lg bg-gray-300 text-xs lg:text-lg '>
                <div><span className='font-semibold'>Phone :</span> <span>{user?.phone}</span></div>
                <div><span className='font-semibold'>Email :</span> <span>{user?.email}</span></div>
                <div><span className='font-semibold'>Address :</span> <span>{user?.address}</span></div>
              </div>
              <div className='py-5 px-10 rounded-lg bg-gray-300 text-xs lg:text-lg grid gap-y-5 sm:grid-cols-3 grid-cols-2'>
                <div><span className='font-semibold'>Qualification :</span> <span>{user?.qualification}</span></div>
                <div><span className='font-semibold'>Occupation :</span> <span>{user?.occupation}</span></div>
                <div><span className='font-semibold'>Marital Status :</span> <span>{user?.maritalStatus}</span></div>
              </div>
              <div className='py-5 px-10 rounded-lg bg-gray-300 text-xs lg:text-lg grid gap-y-5 sm:grid-cols-3 grid-cols-2'>
                <div><span className='font-semibold'>Referred By :</span> <span>{user?.referredBy}</span></div>
                <div><span className='font-semibold'>Dietary Preference :</span> <span>{user?.dietaryPreference}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PatientDashboard