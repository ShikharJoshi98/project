import { useEffect, useState } from 'react'
import Input from '../../components/Input'
import { TbPencilPlus } from 'react-icons/tb'
import PatientUpdateModal from '../../components/Receptionist/PatientUpdateModal'
import AppointmentModal from '../../components/Doctor/AppointmentModal'
import { recStore } from '../../store/RecStore'
import { LuLoaderCircle, LuSquarePen } from 'react-icons/lu'
import { useAuthStore } from '../../store/authStore'
import { CiSearch } from 'react-icons/ci'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa6'

const PatientDetails = () => {
    const { getPatientDetails, patients, update, patientLength } = recStore();
    const { user } = useAuthStore();
    const [isPatientUpdateModalOpen, setPatientUpdateModalIsOpen] = useState(false);
    const [isAppointmentModalOpen, setAppointmentModalIsOpen] = useState(false);
    const [patientId, setPatientId] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [startSearch, setStartSearch] = useState(false);

    useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            try {
                await getPatientDetails(page, searchTerm, user?.branch);
            }
            finally {
                setLoading(false);
            };
        }
        fetchPatients();
    }, [getPatientDetails, page, update, startSearch]);
    const rightPageHandler = () => {
        if (page < Math.ceil(patientLength / 10)) {
            setPage(prev => prev = prev + 1);
        }
    }
    const leftPageHandler = () => {
        if (page > 1) {
            setPage(prev => prev = prev - 1);
        }
    }

    return (
        <>
            <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen p-8 w-full overflow-hidden'>
                <button onClick={() => setAppointmentModalIsOpen(true)} className='cursor-pointer place-self-center md:place-self-start flex items-center gap-3 text-white font-semibold hover:scale-99 transition-all duration-300 shadow-gray-600 shadow-md text-lg bg-blue-500 px-4 py-2 hover:bg-blue-700 rounded-lg'>Create Appointment<TbPencilPlus /></button>
                <div className='bg-[#e9ecef] w-auto p-5 mt-10 rounded-lg'>
                    <h1 className='w-fit mx-auto font-semibold text-[#337ab7] text-lg sm:text-xl md:text-4xl'>Patient's Details</h1>
                    <div className='mt-10 flex items-center gap-2'>
                        <Input icon={CiSearch} onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} placeholder="Search for Patient's Name/Case Paper No./Mobile No." />
                        <button onClick={() => setStartSearch(true)} className='p-2 cursor-pointer bg-blue-500 text-white rounded-md'>Search</button>
                        <button onClick={() => { setStartSearch(false); setSearchTerm("") }} className='p-2 cursor-pointer bg-green-500 text-white rounded-md'>Clear</button>
                    </div>
                    {loading ? <LuLoaderCircle className='animate-spin mx-auto mt-10' size={24} /> : <div className="overflow-x-auto mt-10 rounded-lg">
                        <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7] whitespace-nowrap text-white">
                                <tr>
                                    <th className="px-1 py-2">Serial No.</th>
                                    <th className="px-1 py-2">Case Paper No.</th>
                                    <th className="px-1 py-2">Username</th>
                                    <th className="px-1 py-2">Name</th>
                                    <th className="px-1 py-2">Phone Number</th>
                                    <th className="px-1 py-2">Email</th>
                                    <th className="px-1 py-2">Gender</th>
                                    <th className="px-1 py-2">Age</th>
                                    <th className="px-1 py-2">Address</th>
                                    <th className="px-1 py-2">Update</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patients?.map((patient, index) => (
                                    <tr key={index} className={`${patient?.Case_Assignment_Flag === false ? 'bg-yellow-200 hover:bg-yellow-300' : 'hover:bg-blue-300 bg-blue-200'} transition-all`}>
                                        <td className="px-1 py-2 text-center">{index + 1}.</td>
                                        <td className="px-1 py-2 text-center">{patient?.casePaperNo === '' ? `${patient?.branch === 'Mulund' ? 'MUL-NEW' : 'DOM-NEW'}` : patient?.casePaperNo}</td>
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
                    }
                    <div className="flex mt-10 flex-col gap-5">
                        <div className="flex w-fit gap-5"><div className="w-5 h-5 border-1 bg-yellow-200"></div><span> New Patient (Case Paper Number Not Issued)</span></div>
                    </div>
                    {patients?.length > 0 && <div className='mt-10 flex items-center w-fit mx-auto gap-4'>
                        <FaChevronLeft className='cursor-pointer' onClick={() => leftPageHandler()} />
                        <p>Page : <span className='bg-white p-2 rounded-md'>{page}</span> of {Math.ceil(patientLength / 10)}</p>
                        <FaChevronRight className='cursor-pointer' onClick={() => rightPageHandler()} />
                    </div>}
                </div>
            </div>
            {isPatientUpdateModalOpen && <PatientUpdateModal patientId={patientId} onClose={() => setPatientUpdateModalIsOpen(false)} />}
            {isAppointmentModalOpen && <AppointmentModal onClose={() => setAppointmentModalIsOpen(false)} />}
        </>
    )
}

export default PatientDetails