import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { useStore } from '../../store/UpdateStore';
import { docStore } from '../../store/DocStore';
import { updateDate } from '../../store/todayDate';
import { FaBell } from 'react-icons/fa';
import { CiHospital1 } from 'react-icons/ci';

const HRnavbar = () => {
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);
    const { getAppointment,courierAppointments,repeatAppointments,generalAppointments,setMedSection } = useStore();
    const { user, logout } = useAuthStore();
    const { appointmentSubmit, getAppdetails, appointments } = docStore();
    const [isMedicineHovered, setIsMedicineHovered] = useState(false);
    const navigate = useNavigate();
    const date = updateDate();

    function handleLogout() {
        logout();
        navigate('/login');
    }
    useEffect(() => {
        getAppointment(user?.branch)
    }, [getAppdetails, appointmentSubmit]);
    
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
        <div className='bg-[#404858]   w-full px-14 md:px-20 py-5 sticky top-0 z-50 flex items-center justify-between'>
            <div className='text-white cursor-pointer font-semibold text-sm md:text-2xl flex items-center gap-2 '>
                <CiHospital1 size={38}/>
                <h1>Wings Classical Homeopathy</h1>
            </div>
            <div className='relative'>
                <ul className=' hidden lg:flex  items-center gap-6 text-white text-base'>
                    <li onClick={() => navigate('/dashboard-HR')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Dashboard</li>
                    <li onClick={() => navigate('/dashboard-HR/HR-balance')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Balance History</li>
                    <div className="relative" onMouseEnter={() => setIsMedicineHovered(true)} onMouseLeave={() => setIsMedicineHovered(false)}>
                        <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Medicine {(generalAppointments+courierAppointments+repeatAppointments)>0 && <div className='absolute bg-blue-500/70 flex items-center p-1 justify-center rounded-full -right-4 -top-2'><FaBell className='size-4'/></div>}</li>
                        {isMedicineHovered && (
                            <div className="absolute top-6 left-0 rounded-md border border-white bg-[#404858] w-52 flex flex-col h-auto">
                                <div onClick={() => { navigate('/dashboard-HR/HR-medicine'); setMedSection('general') }} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                                    <h1>General</h1>
                                    <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">{generalAppointments}</span>
                                </div>
                                <div onClick={() => { navigate('/dashboard-HR/HR-medicine'); setMedSection('repeat') }} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                                    <h1>Repeat Medicine</h1>
                                    <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">{repeatAppointments}</span>
                                </div>
                                <div onClick={() => { navigate('/dashboard-HR/HR-medicine'); setMedSection('courier') }} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                                    <h1>Courier Medicine</h1>
                                    <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">{courierAppointments}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    {/* <li onClick={() => navigate('/email-courier-details')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Courier Mail</li> */}
                    <li onClick={handleLogout} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Logout</li>
                </ul>
                <button onClick={() => setOpen(!isOpen)} className="lg:hidden cursor-pointer hover:text-gray-200 text-white font-semibold text-xl">☰</button>
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

export default HRnavbar