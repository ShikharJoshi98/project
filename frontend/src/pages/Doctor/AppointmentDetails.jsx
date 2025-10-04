import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { recStore } from '../../store/RecStore'
import HealthAssessment from '../../components/Doctor/HealthAssessment'
import PreviousPrescriptions from '../../components/Doctor/PreviousPrescriptions'
import TodayPrescriptions from '../../components/Doctor/TodayPrescription'
import PrescribeMedicine from '../../components/Doctor/PrescribeMedicine'
import FollowUp from '../../components/Doctor/FollowUp'
import { FaPen } from "react-icons/fa";
import { docStore } from '../../store/DocStore'

const AppointmentDetails = () => {
    const { getBalanceDue, balanceDue } = docStore();
    const { patient, getPatient } = recStore();
    const { id } = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getPatient(id);
    }, [getPatient])
    useEffect(() => {
        getBalanceDue(id);
    }, [getBalanceDue])
    return (
        <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen overflow-hidden w-full p-8">
            <div className="bg-[#e9ecef] w-auto p-5 rounded-lg">
                <h1 className='text-xl sm:text-4xl text-center font-semibold mt-10 text-[#337ab7]'>
                    PATIENT DETAILS
                </h1>
                <span className='flex items-center gap-3 my-6 justify-center sm:text-xl text-base font-semibold'>
                    <h2>Balance : </h2>
                    <h2>{balanceDue?.dueBalance >= 0 ? `Rs ${balanceDue?.dueBalance} due` : `Rs ${balanceDue?.dueBalance} advance`}</h2>
                </span>
                {patient?.First_Appointment_Flag && <button onClick={() => navigate(`/new-case-details/${patient?._id}`)} className='bg-blue-500 text-white py-2 px-10 rounded-lg cursor-pointer font-semibold my-10 mx-auto flex items-center gap-5'>New Case <FaPen /></button>}
                <div className='flex md:flex-row flex-col items-center md:items-start gap-2 mt-10'>
                    <div className='flex gap-3 w-full md:w-1/5  min-h-72 rounded-lg bg-gray-300 flex-col items-center justify-center'>
                        {
                            patient?.gender === 'Female' ? <img src="/user_female.webp" alt="user_image" className='size-20 md:size-28' /> : <img src="/user.png" alt="user_image" className='size-20 md:size-28' />
                        }
                        <h1 className='text-lg md:text-xl  font-semibold'>{patient?.fullname}</h1>
                        <h1 className='text-sm md:text-base '>{patient?.casePaperNo}</h1>
                    </div>
                    <div className='w-full md:w-4/5  gap-2 flex min-h-72 flex-col justify-between text-xs lg:text-base'>
                        <div className='p-5 rounded-lg bg-gray-300 grid gap-y-5 sm:grid-cols-3 grid-cols-2'>
                            <div><span className='font-semibold'>Age :</span> <span>{patient?.age}</span></div>
                            <div><span className='font-semibold'>Gender :</span> <span>{patient?.gender}</span></div>
                            <div><span className='font-semibold'>Phone :</span> <span>{patient?.phone}</span></div>
                        </div>
                        <div className='p-5 rounded-lg bg-gray-300 grid gap-y-5 sm:grid-cols-3 grid-cols-2'>
                            <div><span className='font-semibold'>Email :</span> <span>{patient?.email}</span></div>
                            <div><span className='font-semibold'>Address :</span> <span>{patient?.address}</span></div>
                            <div><span className='font-semibold'>Qualification :</span> <span>{patient?.qualification}</span></div>
                        </div>
                        <div className='p-5 rounded-lg bg-gray-300 grid gap-y-5 sm:grid-cols-3 grid-cols-2'>
                            <div><span className='font-semibold'>Occupation :</span> <span>{patient?.occupation}</span></div>
                            <div><span className='font-semibold'>Marital Status :</span> <span>{patient?.maritalStatus}</span></div>
                            <div><span className='font-semibold'>Referred By :</span> <span>{patient?.referredBy}</span></div>
                        </div>
                        <div className='p-5 rounded-lg bg-gray-300 grid gap-y-5  sm:grid-cols-3 grid-cols-2'>
                            <div><span className='font-semibold'>Dietary Preference :</span> <span>{patient?.dietaryPreference}</span></div>
                        </div>
                    </div>
                </div>
                <hr className='bg-blue-500 h-[0.5px] border-none w-full mt-12' />
                <div className='mt-12'>
                    <HealthAssessment />
                </div>
                <hr className='bg-blue-500 h-[0.5px] border-none w-full mt-12' />
                <div className='mt-12'>
                    <FollowUp />
                </div>
                <hr className='bg-blue-500 h-[0.5px] border-none w-full mt-12' />
                <div className='mt-12'>
                    <PreviousPrescriptions />
                </div>
                <hr className='bg-blue-500 h-[0.5px] border-none w-full mt-12' />
                <div className='mt-12'>
                    <PrescribeMedicine />
                </div>
                <hr className='bg-blue-500 h-[0.5px] border-none w-full mt-12' />
                <div className='mt-12'>
                    <TodayPrescriptions />
                </div>
            </div>
        </div>
    )
}

export default AppointmentDetails