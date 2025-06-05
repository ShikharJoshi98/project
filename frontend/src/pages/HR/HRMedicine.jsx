import React, { useEffect, useState } from 'react'
import HRnavbar from '../../components/HR/HRnavbar'
import HRSidebar from '../../components/HR/HRSidebar'
import Input from '../../components/Input'
import { SearchIcon } from 'lucide-react'
import { useStore } from '../../store/UpdateStore'
import { docStore } from '../../store/DocStore'
import { useNavigate } from 'react-router-dom'

const HRMedicine = () => {
    const [currentDate, setCurrentDate] = useState("");
    const { setMedSection, medSection } = useStore();
    const { appointmentSubmit, getAppdetails, appointments } = docStore();
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
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
        getAppdetails(medSection);
    }, [getAppdetails, appointmentSubmit, medSection]);
    const medicineArray = appointments.filter((appointment) => (appointment?.date === currentDate && appointment?.complete_appointment_flag === true && appointment?.appointmentType === medSection) && (appointment?.PatientCase?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) || appointment?.PatientCase?.casePaperNo?.toLowerCase().includes(searchTerm.toLowerCase()) || appointment?.PatientCase?.phone?.toLowerCase().includes(searchTerm.toLowerCase())));
    console.log(medicineArray);
    const newAppointmentLength = medicineArray.filter((medicine) => medicine?.new_appointment_flag === true).length;
    const medicineNotIssuedLength = medicineArray.filter((medicine) => medicine?.new_appointment_flag === false && medicine?.medicine_issued_flag === false).length;
    const medicineIssuedLength = medicineArray.filter((medicine) => medicine?.new_appointment_flag === false && medicine?.medicine_issued_flag === true).length;

    return (
        <div>
            <HRnavbar />
            <div className="flex">
                <HRSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>{medSection.toUpperCase()} MEDICINE</h1>
                        <h1 className="text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4">{currentDate}</h1>
                        <div className='sm:flex grid grid-cols-2 mt-8 sm:flex-row text-stone-800 font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[10px] sm:text-base md:text-lg'>
                            <button onClick={() => setMedSection("general")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${medSection === 'general' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>GENERAL </button>
                            <button onClick={() => setMedSection("repeat")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${medSection === 'repeat' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>REPEAT MEDICINE </button>
                            <button onClick={() => setMedSection("courier")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${medSection === 'courier' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>COURIER MEDICINE</button>
                        </div>
                        <div className='flex items-center gap-2 mt-10'>
                            <Input icon={SearchIcon} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search for Items here' />
                            <button className='py-2 px-4 bg-blue-500 font-semibold rounded-lg text-white'>Search</button>
                        </div>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7] whitespace-nowrap text-white">
                                    <tr >
                                        <th className="px-1 py-2 ">Case Paper No.</th>
                                        <th className="px-1 py-2 ">Date</th>
                                        <th className="px-1 py-2 ">Phone</th>
                                        <th className="px-1 py-2 ">Patient's Name</th>
                                        <th className="px-1 py-2 ">Status</th>
                                        <th className="px-1 py-2 ">Branch</th>
                                        <th className="px-1 py-2 ">Details</th>
                                        <th className="px-1 py-2 ">Mail Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        medicineArray.map((appointment, index) => (
                                            <tr key={index} className={`${appointment?.new_appointment_flag===true?'bg-yellow-200':(appointment?.new_appointment_flag === false && appointment?.medicine_issued_flag) === false?'bg-green-200':(appointment?.new_appointment_flag === false && appointment?.medicine_issued_flag === true)?'bg-pink-200':''}`} >
                                                <td className="py-2 px-4 border">{appointment?.PatientCase?.casePaperNo}</td>
                                                <td className="py-2 px-4 border">{appointment?.date}</td>
                                                <td className="py-2 px-4 border">{appointment?.PatientCase?.phone}</td>
                                                <td className="py-2 px-4 border">{appointment?.PatientCase?.fullname}</td>
                                                <td className="py-2 px-4 border">{appointment?.AppointmentType}</td>
                                                <td className="py-2 px-4 border">{appointment?.PatientCase?.branch}</td>
                                                <td onClick={() => navigate(`/prescription-HR/${appointment?.PatientCase._id}`)} className="py-2 px-4 border"><button className="bg-blue-500 p-2 rounded-md text-white cursor-pointer">Details</button></td>
                                                <td className="py-2 px-4 border">{appointment?.PatientCase?.email}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                        <div className="flex mt-10 flex-col gap-5">
                            <div className="flex gap-5"><div className="w-5 h-5 border-1 bg-yellow-200"></div><span>New Patient Appointment Due ({newAppointmentLength})</span></div>
                            <div className="flex gap-5"><div className="w-5 h-5 border-1 bg-green-200"></div><span>Medicine Not Issued ({medicineNotIssuedLength})</span></div>
                            <div className="flex gap-5"><div className="w-5 h-5 border-1 bg-pink-200"></div><span>Medicine Issued  ({medicineIssuedLength})</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HRMedicine