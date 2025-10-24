import { useEffect } from 'react'
import HRnavbar from '../../components/HR/HRnavbar'
import { docStore } from '../../store/DocStore';
import { useNavigate, useParams } from 'react-router-dom';
import { updateDate } from '../../store/todayDate';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { recStore } from '../../store/RecStore';
import { useAuthStore } from '../../store/authStore';
import { useStore } from '../../store/UpdateStore';

const Prescription = () => {
    const { id } = useParams();
    const { patient, getPatient, isShift, shiftToggle, getShift } = recStore();
    const { medSection, getAppointmentDetails, appointments } = useStore();
    const { branch } = useParams();
    const { user } = useAuthStore();
    const { prescriptionSubmit, fetchPrescription, getBillInfo, billInfo, prescription, otherPrescriptions, getOtherPrescription, balanceDue, getBalanceDue, appointmentSection } = docStore();
    const navigate = useNavigate();
    const todayDate = updateDate();

    useEffect(() => {
        if (!user?._id) return;
        getShift(user?.role, user?._id);
    }, []);

    useEffect(() => {
        if (!user?.branch || !isShift) return;
        getAppointmentDetails(user?.branch, medSection, isShift?.shift);
    }, []);

    useEffect(() => {
        fetchPrescription(id);
        getOtherPrescription(id);
        getBalanceDue(id);
        getBillInfo(id);
        getPatient(id);
    }, [fetchPrescription, prescriptionSubmit, getBillInfo, getOtherPrescription, getAppointmentDetails, getPatient]);
    const appointment = appointments.filter((app) => app?.PatientCase?._id === id) || [];
    const currentAppointment = appointment[0];
    return (
        <div>
            <HRnavbar />
            <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen p-8  w-full overflow-hidden'>
                <div className='text-stone-800 w-fit text-sm sm:text-xl flex flex-wrap items-center gap-5 font-semibold bg-[#dae5f4] p-3 md:p-5 rounded-lg'>
                    <h1>{patient?.fullname} </h1>
                    <p className='text-blue-400'>|</p>
                    <div className='flex items-center gap-2'>
                        <h1>Contact No. -</h1>
                        <h1>{patient?.phone}</h1>
                    </div>
                    <p className='text-blue-400'>|</p>
                    <div className='flex items-center gap-2'>
                        <h1>Case Paper No. -</h1>
                        <h1>{patient?.casePaperNo}</h1>
                    </div>
                </div>
                <div className='bg-[#e9ecef] w-auto p-5 mt-10 rounded-lg'>
                    <h1 onClick={() => navigate('/dashboard-HR/HR-medicine')} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
                    <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-4xl'>Prescription Today</h1>
                    <h1 className="text-blue-500 font-semibold mb-3 text-lg mt-4">{todayDate}</h1>
                    <div className="overflow-x-auto mt-10 rounded-lg">
                        <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7] whitespace-nowrap text-white">
                                <tr >
                                    <th className="px-1 py-2 ">Medicine</th>
                                    <th className="px-1 py-2 ">Potency</th>
                                    <th className="px-1 py-2 ">Date</th>
                                    <th className="px-1 py-2 ">Start Date</th>
                                    <th className="px-1 py-2 ">Dose</th>
                                    <th className="px-1 py-2 ">Note</th>
                                    <th className="px-1 py-2 ">Duration</th>
                                    <th className="px-1 py-2 ">Next Visit</th>
                                    <th className="px-1 py-2 ">Status</th>
                                    <th className="px-1 py-2 ">Balance Due</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    prescription.filter((pres) => pres?.prescription_date === todayDate).map((pres, index) => (
                                        <tr key={index} className='bg-blue-200'>
                                            <td className='py-2 px-1 text-center'>{pres?.medicine}</td>
                                            <td className='py-2 px-1 text-center'>{pres?.potency}</td>
                                            <td className='py-2 px-1 text-center'>{pres?.prescription_date}</td>
                                            <td className='py-2 px-1 text-center'>{pres?.start_date}</td>
                                            <td className='py-2 px-1 text-center'>{pres?.dose}</td>
                                            <td className='py-2 px-1 text-center'>{pres?.note}</td>
                                            <td className='py-2 px-1 text-center'>{pres?.duration === '60' ? '2 Months' : pres?.duration === '90' ? '3 Months' : (pres?.duration + ' Days')}</td>
                                            <td className='py-2 px-1 text-center'>{pres?.next_visit}</td>
                                            <td className={`py-2 px-1 ${currentAppointment?.medicine_issued_flag === false ? 'text-red-500' : 'text-green-500'} text-center`}>{currentAppointment?.medicine_issued_flag === false ? 'Pending' : 'Medicine Issued'}</td>
                                            <td className='py-2 px-1 text-center'>{index === 0 && `Rs ${balanceDue === 'No Balance Field' ? 0 : balanceDue.dueBalance}`}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {otherPrescriptions.length > 0 && <div><h1 className='p-4 text-center mt-5 font-semibold text-[#337ab7] text-xl sm:text-4xl'>Other Presciptions</h1>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md">
                                <thead className="bg-[#337ab7] whitespace-nowrap text-white">
                                    <tr >
                                        <th className="px-1 py-2">Serial No.</th>
                                        <th className="px-1 py-2">ANY OTHER MEDICINE</th>
                                        <th className="px-1 py-2">STATUS</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        otherPrescriptions.filter((prescription) => prescription?.date === todayDate).map((prescription, index) => (
                                            <tr key={index} className='bg-blue-200'>
                                                <td className='py-2 px-1 text-center'>{index + 1}</td>
                                                <td className='py-2 px-1 text-center'>{prescription?.medicineName}</td>
                                                <td className='py-2 px-1 text-center'>{prescription?.medicine_issued_flag === false ? 'MEDICINE NOT ISSUED' : 'MEDICINE ISSUED'}</td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                    }
                    {
                        currentAppointment?.medicine_issued_flag === false &&
                        <button onClick={() => { navigate(`/medicine-payment/${id}/${branch}`) }} className='bg-red-500 text-white text-lg hover:scale-99 transition hover:bg-red-600 cursor-pointer font-semibold py-2 px-5 rounded-md mx-auto block mt-8'>Pay Now</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default Prescription