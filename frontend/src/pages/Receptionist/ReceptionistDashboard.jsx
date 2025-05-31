import React, { useEffect, useState } from 'react'
import { MapPin } from 'lucide-react';
import { TbPencilPlus } from "react-icons/tb";
import { useAuthStore } from '../../store/authStore';
import RecNavbar from '../../components/Receptionist/RecNavbar';
import RecSidebar from '../../components/Receptionist/RecSidebar';
import { FaUserDoctor } from 'react-icons/fa6';
import { FaRegCheckCircle, FaUsers } from 'react-icons/fa';
import AppointmentModal from '../../components/Doctor/AppointmentModal';
import { docStore } from '../../store/DocStore';

const ReceptionistDashboard = () => {
  const [isAppointmentModalOpen, setAppointmentModalIsOpen] = useState(false);
  const { user } = useAuthStore();
  const { appointmentSubmit, getAppdetails, appointments } = docStore();
  const [currentDate, setCurrentDate] = useState('');

  useEffect(() => {
        const updateDate = () => {
            const today = new Date();

            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0'); 
            const year = today.getFullYear();

            const formattedDate = `${day}-${month}-${year}`;
            setCurrentDate(formattedDate);
        };

        updateDate();
    }, []);

  useEffect(() => {
    getAppdetails();
  },[getAppdetails,appointmentSubmit])
  
  const appointmentList = appointments.filter((appointment) => appointment?.date === currentDate);

  return (
    <div >
      <RecNavbar />
      <div className="flex">
        <RecSidebar />
        <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden'>
          <div className='flex md:flex-row h-fit flex-col items-center justify-between '>
            <h1 className='text-stone-800 w-fit text:lg sm:text-xl font-semibold md:text-3xl m-2 md:m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg'>Welcome Receptionist</h1>
            <h1 className='text-stone-800 flex text-lg sm:text-xl items-center gap-2 w-fit font-semibold md:text-3xl m-2 md:m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg'><span><MapPin /></span>{user?.branch}</h1>
          </div>
          <div className='mb-10 p-5 md:pl-10'>
            <button onClick={() => setAppointmentModalIsOpen(true)} className='cursor-pointer place-self-center md:place-self-start flex items-center gap-3 text-white font-semibold text-lg md:text-2xl hover:scale-102 transition-all duration-300 shadow-gray-600 shadow-md border-1 border-gray-600 bg-blue-500 p-2 hover:bg-blue-700 rounded-lg'>Create Appointment <TbPencilPlus /></button>
          </div>
          <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
            <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Dashboard</h1>
            <hr className='h-[0.5px] px-5 border-none bg-blue-500 mb-10' />
            <div className='flex flex-col items-center gap-10 md:flex-row mt-12 justify-evenly'>
              <div className='w-full md:w-auto hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300  py-5 px-8  rounded-lg bg-green-300 '>
                <span className='text-zinc-800  mb-3 flex text-lg'>Total Appointments</span>
                <hr className='h-0.5 border-none mb-4 bg-white' />
                <h1 className='text-base sm:text-2xl flex font-semibold  items-center gap-10 sm:gap-36 md:gap-10'><span>    <FaUserDoctor />
                </span>{appointmentList.length}</h1>
              </div>
              <div className='w-full md:w-auto hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300  py-5 px-8  rounded-lg bg-[#ffc36d] '>
                <span className='text-zinc-800  mb-3 flex text-lg'>Pending Appointments</span>
                <hr className='h-0.5 border-none mb-4 bg-white' />
                <h1 className='text-base sm:text-2xl flex font-semibold  items-center gap-8 sm:gap-36 md:gap-10'><span>    <FaUsers /></span>0</h1>
              </div>
              <div className='w-full md:w-auto hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300 py-5 px-8 rounded-lg bg-[#55abff] '>
                <span className='text-zinc-800  mb-3 flex text-lg'>Appointments Completed</span>
                <hr className='h-0.5 border-none mb-4 bg-white' />
                <h1 className='text-base sm:text-2xl   flex font-semibold  items-center gap-10 sm:gap-36 md:gap-10'><span>    <FaRegCheckCircle />
                </span>0</h1>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAppointmentModalOpen && <AppointmentModal onClose={() => setAppointmentModalIsOpen(false)} />}
    </div>
  )
}

export default ReceptionistDashboard