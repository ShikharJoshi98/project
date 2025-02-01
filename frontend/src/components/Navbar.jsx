import React, { useEffect, useState } from 'react'
import { Hospital } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useRef } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);
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
      <div className='bg-[#404858] min-w-full px-14 md:px-28 py-5 sticky top-0 z-20 flex items-center justify-between'>
          <div onClick={()=>navigate('/')} className='text-white cursor-pointer font-semibold text-sm md:text-2xl flex items-center gap-2 '>
              <Hospital />
              <h1 >Wings Classical Homeopathy</h1>
          </div>
          <div className='relative'>
              <ul className=' hidden md:flex  items-center gap-8 text-white text-lg'>
                  <li onClick={()=>navigate('/')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Home</li>
                  <li onClick={()=>navigate('/register')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Register</li>
                  <li onClick={()=>navigate('/login')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Login</li>
              </ul>
              
                  
                  <button onClick={() => setOpen(!isOpen)} class="md:hidden cursor-pointer hover:text-gray-200 text-white font-semibold text-xl">☰</button>
                  {isOpen && <div ref={menuRef} className='absolute md:hidden border-white border-1 rounded-md w-28 z-10 bg-[#404858] p-4 text-white  right-5 overflow-hidden"'>
                  <p onClick={()=>navigate('/')} className='text-center  hover:text-gray-300 cursor-pointer'>Home</p>                         
                 <p onClick={()=>navigate('/register')} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Register</p>
                  <p onClick={()=>navigate('/login')} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Login</p>
                
                  </div>}

          </div>
    </div>
  )
}

export default Navbar