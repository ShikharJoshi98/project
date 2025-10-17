import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';
import { recStore } from '../../store/RecStore';
import { docStore } from '../../store/DocStore';
import { CiHospital1 } from 'react-icons/ci';

const RecNavbar = () => {
    const { logout, user } = useAuthStore();
    const [isOpen, setOpen] = useState(false);
    const menuRef = useRef(null);
    const [isMedicineHovered, setIsMedicineHovered] = useState(false);
    const navigate = useNavigate();
    const { appointmentSubmit } = docStore();
    const { setAppointmentSection, generalAppointments, repeatAppointments, courierAppointments, getAppointmentsRec, isShift, getShift, shiftToggle } = recStore();

    useEffect(() => {
        const fetchShiftAndAppointments = async () => {
            // First, get the new shift
            await getShift(user?.role, user?._id);

            // Now, after shift updates, use the latest value from the store
            if (user?.branch === 'Dombivali') {
                getAppointmentsRec(user?.branch, recStore.getState().isShift?.shift);
            } else {
                getAppointmentsRec(user?.branch, 'noShift');
            }
        };

        if (user?._id) fetchShiftAndAppointments();
    }, [shiftToggle, appointmentSubmit]);

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

    function handleLogout() {
        logout();
        navigate('/login');
    }

    return (
        <div className='bg-[#404858] w-full px-14 md:px-20 py-5 sticky top-0 z-50 flex items-center justify-between'>
            <div className='text-white cursor-pointer font-semibold text-sm md:text-xl flex items-center gap-2 '>
                <CiHospital1 size={28} />
                <h1>Wings Classical Homeopathy</h1>
            </div>
            <div className='relative'>
                <ul className=' hidden lg:flex  items-center gap-6 text-white text-base'>
                    <li onClick={() => navigate('/dashboard-RECEPTIONIST')} className="cursor-pointer text-gray-200 hover:text-white">Dashboard</li>
                    <li onClick={() => navigate('/dashboard-RECEPTIONIST/register-patient')} className="cursor-pointer text-gray-200 hover:text-white">Register Patient</li>
                    <div className="relative" onMouseEnter={() => setIsMedicineHovered(true)} onMouseLeave={() => setIsMedicineHovered(false)}>
                        <li className="cursor-pointer text-gray-200 hover:text-white">Medicine</li>
                        {isMedicineHovered && (
                            <div className="absolute top-6 left-0 rounded-md border border-white bg-[#404858] w-52 flex flex-col h-auto">
                                <div onClick={() => { navigate('/dashboard-RECEPTIONIST/appointment-details-rec'); setAppointmentSection('general') }} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                                    <h1>General</h1>
                                    <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">{generalAppointments}</span>
                                </div>
                                <div onClick={() => { navigate('/dashboard-RECEPTIONIST/appointment-details-rec'); setAppointmentSection('repeat') }} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                                    <h1>Repeat Medicine</h1>
                                    <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">{repeatAppointments}</span>
                                </div>
                                <div onClick={() => { navigate('/dashboard-RECEPTIONIST/appointment-details-rec'); setAppointmentSection('courier') }} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                                    <h1>Courier Medicine</h1>
                                    <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">{courierAppointments}</span>
                                </div>
                            </div>
                        )}
                    </div>
                    <li onClick={handleLogout} className="text-gray-200 hover:text-white cursor-pointer">Logout</li>
                </ul>
                <button onClick={() => setOpen(prev => !prev)} className="lg:hidden cursor-pointer hover:text-gray-200 text-white font-semibold text-xl">☰</button>
                {isOpen && <div ref={menuRef} className='absolute border-white flex flex-col items-center border-1 rounded-md w-40 z-10 bg-[#404858] p-4 text-white right-5'>
                    <p onClick={() => { navigate('/dashboard-RECEPTIONIST'); setOpen(false) }} className='hover:text-gray-300 cursor-pointer'>Dashboard</p>
                    <p onClick={() => { navigate('/dashboard-RECEPTIONIST/register-patient'); setOpen(false) }} className='pt-4 hover:text-gray-300 cursor-pointer'>Register Patient</p>
                    <p onClick={() => { navigate('/dashboard-RECEPTIONIST/appointment-details-rec'); setAppointmentSection('general'); setOpen(false) }} className='pt-4 hover:text-gray-300 flex gap-2 items-center cursor-pointer'>General <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">{generalAppointments}</span></p>
                    <p onClick={() => { navigate('/dashboard-RECEPTIONIST/appointment-details-rec'); setAppointmentSection('repeat'); setOpen(false) }} className='pt-4 hover:text-gray-300 flex gap-2 items-center cursor-pointer'>Repeat <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">{repeatAppointments}</span></p>
                    <p onClick={() => { navigate('/dashboard-RECEPTIONIST/appointment-details-rec'); setAppointmentSection('courier'); setOpen(false) }} className='pt-4 hover:text-gray-300 flex gap-2 items-center cursor-pointer'>Courier <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">{courierAppointments}</span></p>
                    <p onClick={handleLogout} className='pt-4 hover:text-gray-300 cursor-pointer'>Logout</p>
                </div>}
            </div>
        </div>
    )
}

export default RecNavbar