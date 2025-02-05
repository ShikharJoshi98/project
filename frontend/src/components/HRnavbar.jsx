import { Hospital } from 'lucide-react'
import React, { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../store/authStore';

const HRnavbar = () => {
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);
      const { user, logout } = useAuthStore();
    
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
  return (
    <div className='bg-[#404858] border-b border-b-black min-w-full px-14 md:px-20 py-5 sticky top-0 z-20 flex items-center justify-between'>
          <div  className='text-white cursor-pointer font-semibold text-sm md:text-2xl flex items-center gap-2 '>
              <Hospital />
              <h1 >Wings Classical Homeopathy</h1>
          </div>
          <div className='relative'>
          <ul className=' hidden md:flex  items-center gap-6 text-white text-lg'>
                  <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Home</li>
                  <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Dashboard</li>
                  <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Balance History</li>
                  <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Medicine</li>
                  <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Courier Mail</li>

                  <li onClick={handleLogout} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Logout</li>
              </ul>

              <button onClick={() => setOpen(!isOpen)} class="md:hidden cursor-pointer hover:text-gray-200 text-white font-semibold text-xl">☰</button>
                  {isOpen && <div ref={menuRef} className='absolute md:hidden border-white border-1 rounded-md w-40 z-10 bg-[#404858] p-4 text-white  right-5 overflow-hidden"'>
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

export default HRnavbar