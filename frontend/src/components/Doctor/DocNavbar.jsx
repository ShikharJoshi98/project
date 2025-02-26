import { Hospital } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../../store/authStore';
import {  useNavigate } from 'react-router-dom';
import { docStore } from '../../store/DocStore';

const Docnavbar = () => {
    const [isOpen, setOpen] = useState(false);
    const [appopen, setappopen] = useState(false);
    const {  setbranch, appointments } = docStore();
    const domappointments = appointments.filter((appointment)=>appointment?.PatientCase?.branch==='Dombivali'
    )
    const mulappointments = appointments.filter((appointment)=>appointment?.PatientCase?.branch==='Mulund'
    )
    console.log(mulappointments);
    const menuRef = useRef(null);
      const { user, logout } = useAuthStore();
    const navigate = useNavigate();
    useEffect(() => {
          const savedBranch = localStorage.getItem("selectedBranch");
          if (savedBranch) {
            setbranch(savedBranch);
          }
        }, []);
      
        const handleSectionChange = (newBranch) => {
            setbranch(newBranch);
            localStorage.setItem("selectedBranch", newBranch); 
            navigate('/general-appointment');
        };
    function handleLogout() {
        logout();
        navigate('/login');
      }
        useEffect(() => {
            const handleClikcOutside = (e) => {
                if (menuRef.current && !menuRef.current.contains(e.target)) {
                    setOpen(false);
                }
                
            }
            document.addEventListener("mousedown", handleClikcOutside);
                return () => {
                    document.removeEventListener("mousedown", handleClikcOutside);
                };
        }, []);
        const [isHovered, setIsHovered] = useState(false);

  return (
    <div className='bg-[#404858]   w-full px-14 md:px-20 py-5 sticky top-0 z-50 flex items-center justify-between'>
          <div  className='text-white cursor-pointer font-semibold text-sm md:text-2xl flex items-center gap-2 '>
              <Hospital />
              <h1 >Wings Classical Homeopathy</h1>
          </div>
          <div className='relative'>
              <ul className=' hidden lg:flex  items-center gap-6 text-white text-base'>
                  <div className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
                  <li  className="hover:text-gray-300 group   cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Appointments</li>
                  {isHovered && (
        <div className="absolute top-6 left-0 rounded-md border border-white z-50 bg-[#404858] w-40 flex flex-col h-auto">
          <div
            onClick={() => handleSectionChange("Dombivali")}
            className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between"
          >
            <h1>Dombivali</h1>
            <span className="bg-blue-400 py-0.5 px-2 rounded-full text-white font-semibold">
              {domappointments.length}
            </span>
          </div>
          <div
            onClick={() => handleSectionChange("Mulund")}
            className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between"
          >
            <h1>Mulund</h1>
            <span className="bg-blue-400 py-0.5 px-2 rounded-full text-white font-semibold">
              {mulappointments.length}
            </span>
          </div>
        </div>
      )}
    </div>
                  <li onClick={()=>navigate('/homeo-book-medicine')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Homeo Bhagwat Gita</li>
                  <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Repeat Medicine</li>
                  <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Courier Mail</li>

                  <li onClick={handleLogout} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Logout</li>
              </ul>

              <button onClick={() => setOpen(!isOpen)} class="lg:hidden cursor-pointer hover:text-gray-200 text-white font-semibold text-xl">☰</button>
                  {isOpen && <div ref={menuRef} className='absolute lg:hidden border-white border-1 rounded-md w-40 z-10 bg-[#404858] p-4 text-white  right-5 "'>
                  <p className='text-center  hover:text-gray-300 cursor-pointer'>Home</p> 
                  <p  className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Dashboard</p>
                  <p  className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Balance History</p>

                  <p  className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Medicine</p>
                  <p  className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Courier Mail</p>

                  <p   className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Login</p>
                
                  </div>}
          </div>
      </div>
  )
}

export default Docnavbar