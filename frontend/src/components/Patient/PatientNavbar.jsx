import { useState } from 'react'
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { CiHospital1 } from "react-icons/ci";

const PatientNavbar = () => {
    const { logout } = useAuthStore();
    const [isOpen, setOpen] = useState(false);
    const navigate = useNavigate();
    const handleLogout=()=> {
        logout();
        navigate('/login');
    }

    return (
        <div className='bg-[#404858] w-full px-14 md:px-20 py-5 sticky top-0 z-50 flex items-center justify-between'>
            <div className='text-white cursor-pointer font-semibold text-sm md:text-2xl flex items-center gap-2 '>
                <CiHospital1 size={38}/>
                <h1 >Wings Classical Homeopathy</h1>
            </div>
            <div className='relative'>
                <ul className=' hidden lg:flex  items-center gap-6 text-white text-base'>
                    <li onClick={() => navigate('/dashboard-PATIENT')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Dashboard</li>
                    <li onClick={() => navigate('update-profile')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Update Profile</li>
                    <li onClick={() => navigate('patient-appointment')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Appointments</li>
                    <li onClick={() => navigate('upload-patient-image')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Update Records</li>
                    <li onClick={handleLogout} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Logout</li>
                </ul>
                <button onClick={() => setOpen(!isOpen)} className="lg:hidden cursor-pointer hover:text-gray-200 text-white font-semibold text-xl">☰</button>
                {isOpen && <div className='absolute lg:hidden border-white border-1 rounded-md w-40 z-10 bg-[#404858] p-4 text-white  right-5'>                    
                    <p onClick={() => navigate('/dashboard-PATIENT')} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Dashboard</p>
                    <p onClick={() => navigate('update-profile')} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Update Profile</p>
                    <p onClick={() => navigate('patient-appointment')} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Appointments</p>
                    <p onClick={() => navigate('upload-patient-image')} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Update Records</p>
                    <p onClick={handleLogout} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Logout</p>
                </div>}
            </div>
        </div>
    )
}

export default PatientNavbar