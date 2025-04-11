import { Hospital } from 'lucide-react';
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { recStore } from '../../store/RecStore';

const RecNavbar = () => {
    const { logout } = useAuthStore();
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);
    const [isMedicineHovered, setIsMedicineHovered] = useState(false);
    const { setAppointmentSection } = recStore();
    const navigate = useNavigate();
    function handleLogout() {
        logout();
        navigate('/login');
    }
    return (
        <div className='bg-[#404858]   w-full px-14 md:px-20 py-5 sticky top-0 z-50 flex items-center justify-between'>
            <div className='text-white cursor-pointer font-semibold text-sm md:text-2xl flex items-center gap-2 '>
                <Hospital />
                <h1 >Wings Classical Homeopathy</h1>
            </div>
            <div className='relative'>
                <ul className=' hidden lg:flex  items-center gap-6 text-white text-base'>
                    <li onClick={() => navigate('/dashboard-RECEPTIONIST')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Dashboard</li>
                    <li onClick={() => navigate('/register-patient')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Register Patient</li>
                    <div className="relative" onMouseEnter={() => setIsMedicineHovered(true)} onMouseLeave={() => setIsMedicineHovered(false)}>
                        <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Medicine</li>
                        {isMedicineHovered && (
                            <div className="absolute top-6 left-0 rounded-md border border-white bg-[#404858] w-52 flex flex-col h-auto">
                                <div onClick={() => { navigate('/appointment-details-rec'); setAppointmentSection('General') }} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                                    <h1>General</h1>
                                    <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">0</span>
                                </div>
                                <div onClick={() => { navigate('/appointment-details-rec'); setAppointmentSection('Repeat Medicine') }} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                                    <h1>Repeat Medicine</h1>
                                    <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">0</span>
                                </div>
                                <div onClick={() => { navigate('/appointment-details-rec'); setAppointmentSection('Courier Medicine') }} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                                    <h1>Courier Medicine</h1>
                                    <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">0</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <li onClick={handleLogout} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Logout</li>
                </ul>
                <button onClick={() => setOpen(!isOpen)} class="lg:hidden cursor-pointer hover:text-gray-200 text-white font-semibold text-xl">☰</button>
                {isOpen && <div ref={menuRef} className='absolute md:hidden border-white border-1 rounded-md w-40 z-10 bg-[#404858] p-4 text-white  right-5 "'>
                    <p className='text-center  hover:text-gray-300 cursor-pointer'>Home</p>
                    <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Dashboard</p>
                    <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Balance History</p>
                    <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Medicine</p>
                    <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Courier Mail</p>
                    <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Login</p>

                </div>}
            </div>
        </div>
    )
}

export default RecNavbar