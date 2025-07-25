import { useEffect, useState } from 'react'
import { TbPencilPlus } from "react-icons/tb";
import { useAuthStore } from '../../store/authStore';
import { FaUserDoctor } from 'react-icons/fa6';
import { FaRegCheckCircle, FaUsers } from 'react-icons/fa';
import AppointmentModal from '../../components/Doctor/AppointmentModal';
import { docStore } from '../../store/DocStore';
import { LuMapPin } from 'react-icons/lu';
import { recStore } from '../../store/RecStore';

const ReceptionistDashboard = () => {
  const [isAppointmentModalOpen, setAppointmentModalIsOpen] = useState(false);
  const { user } = useAuthStore();
  const { appointmentSubmit } = docStore();
  const { getAppointmentsRec, appointments,completeAppointmentLength,pendingAppointmentLength } = recStore();

  useEffect(() => {
    getAppointmentsRec(user?.branch);
  }, [getAppointmentsRec, appointmentSubmit])

  return (
    <>
      <div className='bg-gradient-to-br from-blue-300 flex flex-col gap-10 via-blue-400 to-sky-700 min-h-screen w-full p-8 overflow-hidden'>
        <div className='flex md:flex-row h-fit flex-col items-center justify-between'>
          <h1 className='text-stone-800 w-fit text:lg sm:text-xl font-semibold md:text-2xl bg-[#dae5f4] p-3 md:p-5 rounded-lg'>Receptionist Admin Panel</h1>
          <h1 className='text-stone-800 flex text-lg sm:text-xl items-center gap-2 w-fit font-semibold md:text-2xl bg-[#dae5f4] p-3 md:p-5 rounded-lg'><span><LuMapPin/></span>{user?.branch}</h1>
        </div>
          <button onClick={() => setAppointmentModalIsOpen(true)} className='cursor-pointer text-lg place-self-center md:place-self-start flex items-center gap-3 text-white font-semibold hover:scale-99 transition-all duration-300 shadow-gray-600 shadow-md bg-blue-500 px-4 py-2 hover:bg-blue-700 rounded-lg'>Create Appointment<TbPencilPlus/></button>
        <div className='bg-[#e9ecef] w-auto p-5 rounded-lg'>
          <h1 className='w-fit mx-auto font-semibold text-[#337ab7] text-lg sm:text-xl md:text-4xl'>Dashboard</h1>
          <hr className='h-[0.5px] px-5 border-none bg-blue-500 my-10'/>
          <div className='flex flex-col items-center gap-10 md:flex-row mt-12 justify-evenly'>
            <div className='w-full md:w-auto hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300 py-5 px-8 rounded-lg bg-green-300 '>
              <span className='text-zinc-800 mb-3 flex'>Total Appointments</span>
              <hr className='h-0.5 border-none mb-4 bg-white' />
              <h1 className='flex font-semibold  items-center gap-10 sm:gap-36 md:gap-10'><span><FaUserDoctor />
              </span>{appointments.length}</h1>
            </div>
            <div className='w-full md:w-auto hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300  py-5 px-8  rounded-lg bg-[#ffc36d] '>
              <span className='text-zinc-800  mb-3 flex'>Pending Appointments</span>
              <hr className='h-0.5 border-none mb-4 bg-white' />
              <h1 className='flex font-semibold items-center gap-8 sm:gap-36 md:gap-10'><span><FaUsers /></span>{pendingAppointmentLength}</h1>
            </div>
            <div className='w-full md:w-auto hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300 py-5 px-8 rounded-lg bg-[#55abff] '>
              <span className='text-zinc-800  mb-3 flex'>Appointments Completed</span>
              <hr className='h-0.5 border-none mb-4 bg-white' />
              <h1 className='flex font-semibold items-center gap-10 sm:gap-36 md:gap-10'><span><FaRegCheckCircle />
              </span>{completeAppointmentLength}</h1>
            </div>
          </div>
        </div>
      </div>
      {isAppointmentModalOpen && <AppointmentModal onClose={() => setAppointmentModalIsOpen(false)} />}
    </>
  )
}

export default ReceptionistDashboard