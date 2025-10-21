import { useEffect, useMemo, useState } from 'react'
import { recStore } from '../../store/RecStore';
import Input from '../../components/Input';
import { TbPencilPlus } from 'react-icons/tb';
import AppointmentModal from '../../components/Doctor/AppointmentModal';
import { docStore } from '../../store/DocStore';
import { useAuthStore } from '../../store/authStore';
import { updateDate } from '../../store/todayDate';
import { CiSearch } from 'react-icons/ci';
import { LuLoaderCircle } from 'react-icons/lu';

const AppointmentList = () => {
    const { appointmentSubmit } = docStore();
    const { user } = useAuthStore();
    const { setAppointmentSection, appointmentSection, getAppointments, appointments, isShift, getShift, shiftToggle } = recStore();
    const [isAppointmentModalOpen, setAppointmentModalIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const currentDate = updateDate();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchShiftAndAppointments = async () => {
            await getShift(user?.role, user?._id);
            const timeout = setTimeout(() => setLoading(true), 200);
            if (user?.branch === 'Dombivali') {
                getAppointments(user?.branch, appointmentSection, recStore.getState().isShift?.shift).finally(() => {
                    clearTimeout(timeout);
                    setLoading(false);
                });
            } else {
                getAppointments(user?.branch, appointmentSection, 'noShift').finally(() => {
                    clearTimeout(timeout);
                    setLoading(false);
                });
            }
        };

        if (user?._id) fetchShiftAndAppointments();
    }, [appointmentSubmit, appointmentSection, shiftToggle])

    const appointmentList = appointments.filter((appointment) => (appointment?.PatientCase?.fullname.toLowerCase().includes(searchTerm.toLowerCase()) || appointment?.PatientCase?.casePaperNo.toLowerCase().includes(searchTerm.toLowerCase()) || appointment?.PatientCase?.phone.toLowerCase().includes(searchTerm.toLowerCase())));

    return (
        <>
            <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                <div className=' px-10 pt-10 '>
                    <button onClick={() => setAppointmentModalIsOpen(true)} className='cursor-pointer place-self-center md:place-self-start flex items-center gap-3 text-white font-semibold hover:scale-99 transition-all duration-300 shadow-gray-600 shadow-md text-lg bg-blue-500 px-4 py-2 hover:bg-blue-700 rounded-lg'>Create Appointment <TbPencilPlus /></button>
                </div>
                <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                    <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl md:text-4xl'>{appointmentSection.toUpperCase()} {(appointmentSection === 'repeat' || appointmentSection === 'courier') && "MEDICINE"} DETAILS</h1>
                    <h1 className="text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4">{currentDate}</h1>
                    <div className='sm:flex grid grid-cols-2 mt-8 sm:flex-row text-stone-800 font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[10px] sm:text-base'>
                        <button onClick={() => setAppointmentSection("general")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${appointmentSection === 'general' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>GENERAL </button>
                        <button onClick={() => setAppointmentSection("repeat")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${appointmentSection === 'repeat' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>REPEAT MEDICINE </button>
                        <button onClick={() => setAppointmentSection("courier")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${appointmentSection === 'courier' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>COURIER MEDICINE</button>
                    </div>
                    <div className='flex items-center gap-2 mt-10'>
                        <Input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} icon={CiSearch} placeholder='Search for Patient&apos;s Name/Case Paper No./Mobile No.' />
                    </div>
                    {loading ? <LuLoaderCircle className='animate-spin mx-auto mt-10' size={24} /> : <div className="overflow-x-auto mt-10 rounded-lg">
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
                                        <tr key={index} className={`${appointment?.medicine_issued_flag === true ? 'bg-pink-200' : appointment?.complete_appointment_flag === true ? 'bg-blue-200' : appointment?.new_appointment_flag === true ? 'bg-yellow-200' : 'bg-green-200'} `}>
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
                    </div>}
                    <div className='flex flex-col gap-4 mt-20'>
                        <div className='flex items-center gap-4'><div className='w-7 h-7 inline-block border-1 bg-yellow-200'></div><div>New Patient Appointment</div></div>
                        <div className='flex items-center gap-4'><div className='w-7 h-7 inline-block border-1 bg-green-200'></div><div>Follow Up Appointment</div></div>
                        <div className='flex items-center gap-4'><div className='w-7 h-7 inline-block border-1 bg-blue-200'></div><div>Medicine Not Issued</div></div>
                        <div className='flex items-center gap-4'><div className='w-7 h-7 inline-block border-1 bg-red-200'></div><div>Medicine Issued</div></div>
                    </div>
                </div>
            </div>
            {isAppointmentModalOpen && <AppointmentModal onClose={() => setAppointmentModalIsOpen(false)} />}
        </>
    )
}

export default AppointmentList