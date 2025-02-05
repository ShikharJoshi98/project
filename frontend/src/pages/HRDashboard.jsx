import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import HRnavbar from '../components/HRnavbar';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import { FaUserDoctor, FaUsers } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { Banknote, Box, ListTodo, MapPin, PillBottle, ShoppingCart, SquarePen } from 'lucide-react';

const HRDashboard = () => {
  const navigate = useNavigate();
  
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
  return (
    <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700   relative overflow-hidden'>
      <HRnavbar />
      <div className='flex '>
      <Sidebar>
        <SidebarItem icon={<ShoppingCart size={20} />} text={"ITEMS STOCK"} active/>
        <SidebarItem icon={<PillBottle size={20} />} text={"MEDICINE STOCK"} />
        <SidebarItem icon={<ListTodo size={20} />} text={"TASK DETAILS"} />
        <SidebarItem icon={<SquarePen size={20} />} text={"APPLY LEAVE"} />
        <SidebarItem icon={<Box size={20} />} text={"COURIER LIST"} />
        <SidebarItem icon={<Banknote size={20} />} text={"COLLECTIONS"} />

        </Sidebar>
        <div className='w-full'>
        <div className='flex items-center h-fit  my-5   px-10 justify-between'>
          <h1 className='text-zinc-800 rounded-lg text-base   font-semibold md:text-2xl p-1 md:p-5 bg-[#dae5f4]'>Welcome To the HR Admin Panel</h1>
          <h1 className='text-zinc-800 rounded-lg text-base  font-semibold md:text-2xl p-1 md:p-5 flex items-center gap-2 bg-[#dae5f4]'><span> <MapPin /></span>Dombivali</h1>
          </div>
          <div className=' mx-10 px-5  rounded-lg py-5 bg-[#dae5f4]'>
            <h1 className='text-center text-blue-600  font-semibold text-5xl'>Dashboard</h1>
            <h1 className=' text-blue-500 font-semibold mb-3 text-2xl mt-4'>{currentDate}</h1>
            <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
            <div className='flex flex-col items-center gap-10 md:flex-row  mt-20 justify-evenly'>
              <div className='w-52 hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300  p-5 rounded-lg bg-green-300 '>

                <span className='text-zinc-800  mb-3 flex text-lg'>Total Doctors</span>
                <hr className='h-0.5 border-none mb-4 bg-white' />
                <h1 className='text-2xl flex font-semibold  items-center gap-15'><span>    <FaUserDoctor />


                </span>2</h1>
                
              </div>
              
              <div className='w-52 hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300  p-5 rounded-lg bg-[#ffc36d] '>

                <span className='text-zinc-800  mb-3 flex text-lg'>Total Patients</span>
                <hr className='h-0.5 border-none mb-4 bg-white' />  
                <h1 className='text-2xl flex font-semibold  items-center gap-10'><span>    <FaUsers /></span>2788</h1>
                
              </div>
              <div className='w-52 hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300 p-5 rounded-lg bg-[#55abff] '>

                <span className='text-zinc-800  mb-3 flex text-lg'>On Duty Doctors</span>
                <hr className='h-0.5 border-none mb-4 bg-white' />  
                <h1 className='text-2xl flex font-semibold  items-center gap-15'><span>    <FaRegCheckCircle />
                </span>2</h1>
                
              </div>
            </div>
            <h1 className='mt-20'>hello</h1>
          </div>
          
        </div>
        
      </div>
         
      </div>
  )
}

export default HRDashboard