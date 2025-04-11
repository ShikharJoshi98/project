import React, { useEffect, useState } from 'react'
import RecNavbar from '../../components/Receptionist/RecNavbar'
import RecSidebar from '../../components/Receptionist/RecSidebar'
import { recStore } from '../../store/RecStore';
import Input from '../../components/Input';
import { SearchIcon } from 'lucide-react';
import { TbPencilPlus } from 'react-icons/tb';
import AppointmentModal from '../../components/Doctor/AppointmentModal';

const AppointmentList = () => {
    const [currentDate, setCurrentDate] = useState("");
    const { setAppointmentSection, appointmentSection } = recStore();
    const [isAppointmentModalOpen, setAppointmentModalIsOpen] = useState(false);

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
        <div>
            <RecNavbar />
            <div className="flex">
                <RecSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className=' px-10 pt-10 '>
                        <button onClick={() => setAppointmentModalIsOpen(true)} className='cursor-pointer place-self-center md:place-self-start flex items-center gap-3 text-white font-semibold text-lg md:text-2xl hover:scale-102 transition-all duration-300 shadow-gray-600 shadow-md border-1 border-gray-600 bg-blue-500 p-2 hover:bg-blue-700 rounded-lg'>Create Appointment <TbPencilPlus /></button>
                    </div>
                    <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>{appointmentSection} Details</h1>
                        <h1 className="text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4">{currentDate}</h1>
                        <div className='sm:flex grid grid-cols-2 mt-8 sm:flex-row text-stone-800 font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[10px] sm:text-base md:text-lg'>
                            <button onClick={() => setAppointmentSection("General")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${appointmentSection === 'General' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>GENERAL </button>
                            <button onClick={() => setAppointmentSection("Repeat Medicine")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${appointmentSection === 'Repeat Medicine' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>REPEAT MEDICINE </button>
                            <button onClick={() => setAppointmentSection("Courier Medicine")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${appointmentSection === 'Courier Medicine' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>COURIER MEDICINE</button>
                        </div>
                        <div className='flex items-center gap-2 mt-10'>
                            <Input icon={SearchIcon} placeholder='Search for Items here' />
                            <button className='py-2 px-4 bg-blue-500 font-semibold rounded-lg text-white'>Search</button>
                        </div>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7] whitespace-nowrap text-white">
                                    <tr >
                                        <th className="px-1 py-2 ">Token No.</th>
                                        <th className="px-1 py-2 ">Case Paper No.</th>
                                        <th className="px-1 py-2 ">Time</th>
                                        <th className="px-1 py-2 ">Patient</th>
                                        <th className="px-1 py-2 ">Doctor</th>
                                        <th className="px-1 py-2 ">Phone Number</th>
                                        <th className="px-1 py-2 ">Status</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isAppointmentModalOpen && <AppointmentModal onClose={() => setAppointmentModalIsOpen(false)} />}   
        </div>
    )
}

export default AppointmentList