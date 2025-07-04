import { useEffect, useState } from 'react'
import RecNavbar from '../../components/Receptionist/RecNavbar'
import RecSidebar from '../../components/Receptionist/RecSidebar'
import { recStore } from '../../store/RecStore';
import Input from '../../components/Input';
import { SearchIcon } from 'lucide-react';
import { TbPencilPlus } from 'react-icons/tb';
import AppointmentModal from '../../components/Doctor/AppointmentModal';
import { docStore } from '../../store/DocStore';
import { useAuthStore } from '../../store/authStore';

const AppointmentList = () => {
    const [currentDate, setCurrentDate] = useState("");
    const { appointmentSubmit, getAppdetails, appointments } = docStore();
    const { user } = useAuthStore();
    const { setAppointmentSection, appointmentSection } = recStore();
    const [isAppointmentModalOpen, setAppointmentModalIsOpen] = useState(false);
    const [searchTerm,setSearchTerm] = useState('');
    useEffect(() => {
        getAppdetails(appointmentSection);
    }, [getAppdetails, appointmentSection, appointmentSubmit]);

    useEffect(() => {
        const updateDate = () => {
            const today = new Date();

            const day = String(today.getDate()).padStart(2, '0');
            const month = String(today.getMonth() + 1).padStart(2, '0'); 
            const year = today.getFullYear();

            const formattedDate = `${day}-${month}-${year}`;
            setCurrentDate(formattedDate);
        };

        updateDate();
    }, []);

    const appointmentList = appointments.filter((appointment) => (appointment?.date === currentDate && appointment?.appointmentType === appointmentSection && appointment?.PatientCase?.branch === appointment?.Doctor?.branch) &&(appointment?.PatientCase?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) || appointment?.PatientCase?.casePaperNo?.toLowerCase().includes(searchTerm.toLowerCase()) || appointment?.PatientCase?.phone?.toLowerCase().includes(searchTerm.toLowerCase())));
    console.log(appointments,appointmentSection);
    return (
        <div>
            <RecNavbar />
            <div className="flex">
                <RecSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className=' px-10 pt-10 '>
                        <button onClick={() => setAppointmentModalIsOpen(true)} className='cursor-pointer place-self-center md:place-self-start flex items-center gap-3 text-white font-semibold text-lg md:text-2xl hover:scale-98 transition-all duration-300 shadow-gray-600 shadow-md border-1 border-gray-600 bg-blue-500 p-2 hover:bg-blue-700 rounded-lg'>Create Appointment <TbPencilPlus /></button>
                    </div>
                    <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>{appointmentSection.toUpperCase()} {(appointmentSection === 'repeat' || appointmentSection === 'courier') && "MEDICINE"} DETAILS</h1>
                        <h1 className="text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4">{currentDate}</h1>
                        <div className='sm:flex grid grid-cols-2 mt-8 sm:flex-row text-stone-800 font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[10px] sm:text-base md:text-lg'>
                            <button onClick={() => setAppointmentSection("general")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${appointmentSection === 'general' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>GENERAL </button>
                            <button onClick={() => setAppointmentSection("repeat")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${appointmentSection === 'repeat' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>REPEAT MEDICINE </button>
                            <button onClick={() => setAppointmentSection("courier")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${appointmentSection === 'courier' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>COURIER MEDICINE</button>
                        </div>
                        <div className='flex items-center gap-2 mt-10'>
                            <Input onChange={(e)=>setSearchTerm(e.target.value)} icon={SearchIcon} placeholder='Search for Patient&apos;s Name/Case Paper No./Mobile No.' />
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
                                <tbody className="bg-gray-200 text-black">
                                    {
                                        appointmentList.map((appointment, index) => (
                                            <tr key={index} className={`${appointment?.medicine_issued_flag===true?'bg-pink-200':appointment?.complete_appointment_flag===true?'bg-blue-200':appointment?.new_appointment_flag===true?'bg-yellow-200':'bg-green-200'} `}>
                                                <td className="px-1 py-2 text-center">{index + 1}</td>
                                                <td className="px-1 py-2 text-center">{appointment?.PatientCase?.casePaperNo || '-'}</td>
                                                <td className="px-1 py-2 text-center">{appointment?.time || '-'}</td>
                                                <td className="px-1 py-2 text-center">{appointment?.PatientCase?.fullname || '-'}</td>
                                                <td className="px-1 py-2 text-center">{appointment?.Doctor?.fullname || '-'}</td>
                                                <td className="px-1 py-2 text-center">{appointment?.PatientCase?.phone || '-'}</td>
                                                <td className="px-1 py-2 text-center">{appointment?.appointmentType?.toUpperCase() || '-'}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                        <div className='flex flex-col gap-4 mt-20'>
                            <div className='flex items-center gap-4'><div className='w-7 h-7 inline-block border-1 bg-yellow-200'></div><div>New Patient Appointment</div></div>
                            <div className='flex items-center gap-4'><div className='w-7 h-7 inline-block border-1 bg-green-200'></div><div>Follow Up Appointment</div></div>
                            <div className='flex items-center gap-4'><div className='w-7 h-7 inline-block border-1 bg-blue-200'></div><div>Medicine Not Issued</div></div>
                            <div className='flex items-center gap-4'><div className='w-7 h-7 inline-block border-1 bg-red-200'></div><div>Medicine Issued</div></div>
                        </div>
                    </div>
                </div>
            </div>
            {isAppointmentModalOpen && <AppointmentModal onClose={() => setAppointmentModalIsOpen(false)} />}
        </div>
    )
}

export default AppointmentList