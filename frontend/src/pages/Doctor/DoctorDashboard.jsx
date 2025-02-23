import React, { useEffect, useState } from 'react'
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import Docnavbar from '../../components/Doctor/DocNavbar';
import { Briefcase, CalendarDays, ClipboardPlus, FileText, LayoutList, MapPin, Users } from 'lucide-react';
import { FaUserDoctor } from 'react-icons/fa6';
import Sidebar, { SidebarItem } from '../../components/Sidebar';
import AssignTaskModal from '../../components/Doctor/AssignTaskModal';
import ApproveLeaveModal from '../../components/Doctor/ApproveLeaveModal';
import DocSidebar from '../../components/Doctor/DocSidebar';

const DoctorDashboard = () => {
  const { user, logout } = useAuthStore();
   
  console.log(user);
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate('/login');
  }
  const [currentDate, setCurrentDate] = useState("");
    useEffect(() => {
      const updateDate = () => {
        const date = new Date().toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
          timeZone: "Asia/Kolkata",
        });
        setCurrentDate(date);
      };
  
      updateDate();
    }, []);
 return(
    <div >
      <Docnavbar />
      <div className='flex '>
        <DocSidebar/>
        <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
        <div className='flex md:flex-row h-fit flex-col items-center justify-between '>
            <h1 className='text-stone-800 w-fit text:lg sm:text-xl font-semibold md:text-3xl m-2 md:m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg'>Welcome {user?.fullname }</h1>
            <h1 className='text-stone-800 flex text-lg sm:text-xl items-center gap-2 w-fit font-semibold md:text-3xl m-2 md:m-10   bg-[#dae5f4] p-3 md:p-5 rounded-lg'><span>    <MapPin />
            </span>{ user?.branch}</h1>
          </div>
          <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
          <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Dashboard</h1>
            <h1 className=' text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4'>{currentDate}</h1>
            <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
            <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-white font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[6px] sm:text-[8px] md:text-sm'>
            <button   className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>BALANCE LIST DOMBIVALI</button>
              <button  className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>BALANCE LIST MULUND</button>
              <button  className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>DIAGNOSE HISTORY</button>
              <button className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>COURIER LIST DOMBIVALI</button>
              <button className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>COURIER LIST MULUND</button>

            </div>
          </div>
        </div>
      </div>
      

      </div>
  )
}

export default DoctorDashboard