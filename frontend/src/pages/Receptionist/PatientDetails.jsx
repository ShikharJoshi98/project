import React, { useEffect, useState } from 'react'
import RecNavbar from '../../components/Receptionist/RecNavbar'
import RecSidebar from '../../components/Receptionist/RecSidebar'
import Input from '../../components/Input'
import { SearchIcon } from 'lucide-react'
import { TbPencilPlus } from 'react-icons/tb'
import PatientUpdateModal from '../../components/Receptionist/PatientUpdateModal'
import AppointmentModal from '../../components/Doctor/AppointmentModal'
import { recStore } from '../../store/RecStore'
import { LuSquarePen } from 'react-icons/lu'

const PatientDetails = () => {
    const { getPatientDetails, patients, update } = recStore();
    const [isPatientUpdateModalOpen, setPatientUpdateModalIsOpen] = useState(false);
    const [isAppointmentModalOpen, setAppointmentModalIsOpen] = useState(false);
    const [patientId, setPatientId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        getPatientDetails();
    }, [getPatientDetails, update]);
    console.log(patients)
    const filteredPatient = patients.filter((patient) => (patient?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) || patient?.casePaperNo?.toLowerCase().includes(searchTerm.toLowerCase()) || patient?.phone?.toLowerCase().includes(searchTerm.toLowerCase())));

    return (
        <div>
            <RecNavbar />
            <div className="flex">
                <RecSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden'>
                    <div className='p-5 md:p-10'>
                        <button onClick={() => setAppointmentModalIsOpen(true)} className='cursor-pointer flex items-center gap-3 text-white font-semibold text-2xl hover:scale-102 transition-all duration-300 shadow-gray-600 shadow-md border-1 border-gray-600 bg-blue-500 p-2 hover:bg-blue-700 rounded-lg'>Create Appointment <TbPencilPlus /></button>
                    </div>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10  rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Patient's Details</h1>
                        <div className='flex items-center gap-2 mt-10'>
                            <Input icon={SearchIcon} onChange={(e) => setSearchTerm(e.target.value)} placeholder="Search for Patient's Name/Case Paper No./Mobile No." />
                        </div>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7] whitespace-nowrap text-white">
                                    <tr >
                                        <th className="px-1 py-2 ">Serial No.</th>
                                        <th className="px-1 py-2 ">Case Paper No.</th>
                                        <th className="px-1 py-2 ">Username</th>
                                        <th className="px-1 py-2 ">Name</th>
                                        <th className="px-1 py-2 ">Phone Number</th>
                                        <th className="px-1 py-2 ">Email</th>
                                        <th className="px-1 py-2 ">Gender</th>
                                        <th className="px-1 py-2 ">Age</th>
                                        <th className="px-1 py-2 ">Address</th>
                                        <th className="px-1 py-2 ">Update</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredPatient.map((patient, index) => (
                                        <tr key={index} className={`${patient?.Case_Assignment_Flag===false?'bg-yellow-200 hover:bg-yellow-300':'hover:bg-blue-300 bg-blue-200'} transition-all`}>
                                            <td className="px-1 py-2 text-center">{index + 1}.</td>
                                            <td className="px-1 py-2 text-center">{patient?.casePaperNo}</td>
                                            <td className="px-1 py-2 text-center">{patient?.username}</td>
                                            <td className="px-1 py-2 text-center">{patient?.fullname}</td>
                                            <td className="px-1 py-2 text-center">{patient?.phone}</td>
                                            <td className="px-1 py-2 text-center">{patient?.email}</td>
                                            <td className="px-1 py-2 text-center">{patient?.gender}</td>
                                            <td className="px-1 py-2 text-center">{patient?.age}</td>
                                            <td className="px-1 py-2 text-center">{patient?.address}</td>
                                            <td className="px-1 py-2" onClick={() => { setPatientUpdateModalIsOpen(true); setPatientId(patient?._id) }}><LuSquarePen size={32} className='mx-auto bg-blue-500 text-white p-1 rounded-md cursor-pointer' /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isPatientUpdateModalOpen && <PatientUpdateModal patientId={patientId} onClose={() => setPatientUpdateModalIsOpen(false)} />}
            {isAppointmentModalOpen && <AppointmentModal onClose={() => setAppointmentModalIsOpen(false)} />}
        </div>
    )
}

export default PatientDetails