import { useEffect } from 'react'
import { FaUserDoctor, FaUsers } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { useStore } from '../../store/UpdateStore';
import { useAuthStore } from '../../store/authStore';
import { recStore } from '../../store/RecStore';
import { updateDate } from '../../store/todayDate';
import { LuMapPin } from 'react-icons/lu';

const HRDashboard = () => {
  const { getDetails, employees } = useStore();
  const { user } = useAuthStore();
  const { getAllPatients, allBranchPatients } = recStore();
  const doctors = employees.filter(emp => emp?.role === 'doctor');
  const todayDate = updateDate();

  useEffect(() => {
    getDetails();
    getAllPatients(user?.branch);
  }, [getDetails, getAllPatients]);
  console.log(allBranchPatients);

  return (
    <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 p-8 overflow-hidden min-h-screen w-full'>
      <div className='flex md:flex-row h-fit flex-col items-center justify-between '>
        <h1 className='text-stone-800 w-fit text:lg sm:text-2xl font-semibold bg-[#dae5f4] p-3 md:p-5 rounded-lg'>Welcome to the HR Admin Panel</h1>
        <h1 className='text-stone-800 flex text-lg sm:text-2xl items-center gap-2 w-fit font-semibold bg-[#dae5f4] p-3 md:p-5 rounded-lg'><span><LuMapPin /></span>{user?.branch}</h1>
      </div>
      <div className='bg-[#e9ecef]  w-auto p-5 mt-8 rounded-lg '>
        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-4xl'>Dashboard</h1>
        <h1 className=' text-blue-500 font-semibold mb-3 text-lg mt-4'>{todayDate}</h1>
        <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
        <div className='flex flex-col items-center gap-10 md:flex-row  mt-20 justify-evenly'>
          <div className='w-full md:w-auto hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300  py-5 px-8  rounded-lg bg-green-300 '>
            <span className='text-zinc-800  mb-3 flex'>Total Doctors</span>
            <hr className='h-0.5 border-none mb-4 bg-white' />
            <h1 className='flex font-semibold  items-center gap-10 sm:gap-36 md:gap-10'><span><FaUserDoctor /></span>{doctors.length}</h1>
          </div>
          <div className='w-full md:w-auto hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300  py-5 px-8  rounded-lg bg-[#ffc36d] '>
            <span className='text-zinc-800 mb-3 flex'>Total Patients</span>
            <hr className='h-0.5 border-none mb-4 bg-white' />
            <h1 className='flex font-semibold items-center gap-8 sm:gap-36 md:gap-10'><span><FaUsers /></span>{allBranchPatients.length}</h1>
          </div>
          <div className='w-full md:w-auto hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300 py-5 px-8 rounded-lg bg-[#55abff] '>
            <span className='text-zinc-800  mb-3 flex'>On Duty Doctors</span>
            <hr className='h-0.5 border-none mb-4 bg-white' />
            <h1 className='flex font-semibold  items-center gap-10 sm:gap-36 md:gap-10'><span><FaRegCheckCircle /></span>{doctors.length}</h1>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HRDashboard