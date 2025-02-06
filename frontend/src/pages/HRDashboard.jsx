import React, { useEffect, useState } from 'react'
import HRnavbar from '../components/HR/HRnavbar'
import Sidebar, { SidebarItem } from '../components/Sidebar'
import { FaUserDoctor, FaUsers } from "react-icons/fa6";
import { FaRegCheckCircle } from "react-icons/fa";
import { Banknote, Box, CalendarDays, ListTodo, MapPin, PillBottle, ShoppingCart } from 'lucide-react'

const HRDashboard = () => {
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
    <div >
      <HRnavbar />
      <div className='flex '>
        <Sidebar>
          <SidebarItem icon={<ShoppingCart />} text={"ITEMS STOCK"} />
          <SidebarItem icon={<PillBottle />} text={"MEDICINE STOCK"} />
          <SidebarItem icon={ <ListTodo /> } text={"TASK DETAILS"} />
          <SidebarItem icon={    <CalendarDays />} text={"APPLY LEAVE"} />
          <SidebarItem icon={    <Box />} text={"COURIER LIST"} />
          <SidebarItem icon={    <Banknote />} text={"COLLECTIONS"} />

        </Sidebar>
        <div className='bg-blue-400 min-h-screen  w-full overflow-hidden '>
          <div className='flex md:flex-row  h-fit flex-col items-center justify-between '>
            <h1 className='text-stone-800 w-fit text:lg sm:text-xl font-semibold md:text-3xl m-2 md:m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg'>Welcome to the HR Admin Panel</h1>
            <h1 className='text-stone-800 flex text-lg sm:text-xl items-center gap-2 w-fit font-semibold md:text-3xl m-2 md:m-10   bg-[#dae5f4] p-3 md:p-5 rounded-lg'><span>    <MapPin />
            </span>Dombivali</h1>
          </div>
          <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
            <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Dashboard</h1>
            <h1 className=' text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4'>{currentDate}</h1>
            <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
            <div className='flex flex-col items-center gap-10 md:flex-row  mt-20 justify-evenly'>
              <div className='w-full md:w-auto hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300  py-5 px-8  rounded-lg bg-green-300 '>

                <span className='text-zinc-800  mb-3 flex text-lg'>Total Doctors</span>
                <hr className='h-0.5 border-none mb-4 bg-white' />
                <h1 className='text-base sm:text-2xl flex font-semibold  items-center gap-10 sm:gap-36 md:gap-10'><span>    <FaUserDoctor />


                </span>2</h1>
                
              </div>
              
              <div className='w-full md:w-auto hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300  py-5 px-8  rounded-lg bg-[#ffc36d] '>

                <span className='text-zinc-800  mb-3 flex text-lg'>Total Patients</span>
                <hr className='h-0.5 border-none mb-4 bg-white' />  
                <h1 className='text-base sm:text-2xl flex font-semibold  items-center gap-8 sm:gap-36 md:gap-10'><span>    <FaUsers /></span>2788</h1>
                
              </div>
              <div className='w-full md:w-auto hover:scale-102 hover:shadow-md hover:shadow-gray-600 transition-all duration-300 py-5 px-8 rounded-lg bg-[#55abff] '>

                <span className='text-zinc-800  mb-3 flex text-lg'>On Duty Doctors</span>
                <hr className='h-0.5 border-none mb-4 bg-white' />  
                <h1 className='text-base sm:text-2xl   flex font-semibold  items-center gap-10 sm:gap-36 md:gap-10'><span>    <FaRegCheckCircle />
                </span>2</h1>
                
              </div>
            </div>
            <hr className='h-[0.5px] px-5 mt-20 border-none bg-blue-500' />

            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-10 text-[#337ab7]'>Doctor</h1>
            <div className="overflow-x-auto mt-10 rounded-lg">
      <table className="min-w-full border border-gray-300 bg-white shadow-md ">
        <thead className="bg-[#337ab7]  text-white">
          <tr >
            <th className="px-2 py-4 ">NAME</th>
            <th className=" py-4 ">CONTACT NUMBER</th>
            <th className="px-4 py-4 ">EMAIL</th>
            <th className="px-2 py-4 ">GENDER</th>
            <th className="px-2 py-4 ">AGE</th>
            <th className="px-2 py-4 ">STATUS</th>
            <th className="px-2 py-4 ">DEPARTMENT</th>
            <th className="px-3 py-4 ">UPDATE</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-blue-200 text-lg bg-blue-300 transition">
            <td className="px-2 py-4  text-center">Dr. Santosh K. Yadav</td>
            <td className=" py-4  text-center">9876546372</td>
            <td className="px-4 py-4  text-center">giyab22845@wlmycn.com</td>
            <td className="px-2 py-4  text-center">Male</td>
            <td className="px-2 py-4  text-center">44</td>
            <td className="px-2 py-4  text-center text-green-600 font-semibold">Active</td>
            <td className="px-2 py-4  text-center">Homeopathic</td>
            <td className="px-2 py-4  text-center">
              <button className="bg-blue-500 font-semibold hover:scale-105 transition-all duration-300 cursor-pointer text-white px-2 py-1 rounded-md">Update</button>
            </td>
          </tr>
          <tr className="hover:bg-blue-200 text-lg bg-blue-300 transition">
            <td className="px-4 py-4  text-center">Dr. Mohit</td>
            <td className="px-4 py-4  text-center">777765678</td>
            <td className="px-4 py-4  text-center">mohit@abc.com</td>
            <td className="px-4 py-4  text-center">Male</td>
            <td className="px-4 py-4  text-center">30</td>
            <td className="px-4 py-4  text-center text-green-600 font-semibold">Active</td>
            <td className="px-4 py-4  text-center">Homeopathic</td>
            <td className="px-4 py-4  text-center">
              <button className="bg-blue-500 font-semibold hover:scale-105 transition-all duration-300 cursor-pointer text-white px-2 py-1 rounded-md">Update</button>
            </td>
          </tr>
        </tbody>
      </table>
            </div>
            <hr className='h-[0.5px] px-5 mt-20 border-none bg-blue-500' />

<h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-10 text-[#337ab7]'>Receptionist</h1>
            <div className="overflow-x-auto mt-10 rounded-lg">
      <table className="min-w-full border  border-gray-300 bg-white shadow-md ">
        <thead className="bg-[#337ab7] text-white">
          <tr >
            <th className="px-2 py-4 ">NAME</th>
            <th className=" py-4 ">CONTACT NUMBER</th>
            <th className="px-4 py-4 ">EMAIL</th>
            <th className="px-2 py-4 ">ADDRESS</th>
            <th className="px-2 py-4 ">BRANCH</th>
            <th className="px-2 py-4 ">USERNAME</th>
            <th className="px-3 py-4 ">UPDATE</th>
          </tr>
        </thead>
        <tbody>
          <tr className="hover:bg-blue-200 text-lg bg-blue-300 transition">
            <td className="px-2 py-4  text-center">Raman Singh</td>
            <td className=" py-4  text-center">979867113</td>
            <td className="px-4 py-4  text-center">giyab22845@wlmycn.com</td>
            <td className="px-2 py-4  text-center">snt 2nd floor new</td>
            <td className="px-2 py-4  text-center">Dombivali</td>
            <td className="px-2 py-4  text-center">Receptionist1</td>
            <td className="px-2 py-4  text-center">
              <button className="bg-blue-500 font-semibold hover:scale-105 transition-all duration-300 cursor-pointer text-white px-2 py-1 rounded-md">Update</button>
            </td>
          </tr>
          
        </tbody>
      </table>
    </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HRDashboard