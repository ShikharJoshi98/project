import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import AppointmentSidebar from '../../components/Doctor/AppointmentSidebar'
import { useNavigate, useParams } from 'react-router-dom'
import { recStore } from '../../store/RecStore'
import HealthAssessment from '../../components/Doctor/HealthAssessment'
import PreviousPrescriptions from '../../components/Doctor/PreviousPrescriptions'
import TodayPrescriptions from '../../components/Doctor/TodayPrescription'
import PrescribeMedicine from '../../components/Doctor/PrescribeMedicine'
import FollowUp from '../../components/Doctor/FollowUp'
import { Pen } from 'lucide-react'

const AppointmentDetails = () => {
    const { patients, getPatientDetails } = recStore();
    const location = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        getPatientDetails();
    }, [getPatientDetails])

    const patient = patients.filter((cand => (cand._id) === location.id));
    return (
        <div>
            <Docnavbar />
            <div className="flex">
                <AppointmentSidebar />
                <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
                    <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
                        <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-10 text-[#337ab7]'>
                            PATIENT DETAILS
                        </h1>
                        {patient[0]?.First_Appointment_Flag && <button onClick={()=>navigate(`/new-case-details/${patient[0]._id}`)} className='bg-blue-500 text-white text-lg py-2 px-10 rounded-lg cursor-pointer hover:scale-105 transition-all duration-300 font-semibold my-10 mx-auto flex items-center gap-5'>New Case <Pen /></button>}
                        <div className='flex md:flex-row flex-col items-center md:items-start gap-2 mt-10'>
                            <div className='flex gap-3 w-full md:w-1/5  min-h-72 rounded-lg bg-gray-300 flex-col items-center justify-center'>
                                {
                                   patient[0]?.gender==='Female'?<img src="/user_female.webp" alt="user_image" className='size-20 md:size-28'/>:<img src="/user.png" alt="user_image" className='size-20 md:size-28'/>
                                }
                                <h1 className='text-lg md:text-xl  font-semibold'>{patient[0]?.fullname}</h1>
                                <h1 className='text-sm md:text-base '>{patient[0]?.casePaperNo}</h1>
                            </div>
                            <div className='w-full md:w-4/5  gap-2 flex min-h-72 flex-col justify-between text-xs lg:text-base'>
                                <div className='p-5 rounded-lg bg-gray-300 grid gap-y-5 sm:grid-cols-3 grid-cols-2'>
                                    <div><span className='font-semibold'>Age :</span> <span>{patient[0]?.age}</span></div>
                                    <div><span className='font-semibold'>Gender :</span> <span>{patient[0]?.gender}</span></div>
                                    <div><span className='font-semibold'>Weight :</span> <span>67 Kgs</span></div>
                                </div>
                                <div className='p-5 rounded-lg bg-gray-300 grid gap-y-5 sm:grid-cols-3 grid-cols-2'>
                                    <div><span className='font-semibold'>Phone :</span> <span>{patient[0]?.phone}</span></div>
                                    <div><span className='font-semibold'>Email :</span> <span>{patient[0]?.email}</span></div>
                                    <div><span className='font-semibold'>Address :</span> <span>{patient[0]?.address}</span></div>
                                </div>
                                <div className='p-5 rounded-lg bg-gray-300 grid gap-y-5 sm:grid-cols-3 grid-cols-2'>
                                    <div><span className='font-semibold'>Qualification :</span> <span>{patient[0]?.qualification}</span></div>
                                    <div><span className='font-semibold'>Occupation :</span> <span>{patient[0]?.occupation}</span></div>
                                    <div><span className='font-semibold'>Marital Status :</span> <span>{patient[0]?.maritalStatus}</span></div>
                                </div>
                                <div className='p-5 rounded-lg bg-gray-300 grid gap-y-5  sm:grid-cols-3 grid-cols-2'>
                                    <div><span className='font-semibold'>Referred By :</span> <span>{patient[0]?.referredBy}</span></div>
                                    <div><span className='font-semibold'>Dietary Preference :</span> <span>{patient[0]?.dietaryPreference}</span></div>
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
                        <div className='mt-12 '>
                            <PrescribeMedicine />
                        </div>
                        <hr className='bg-blue-500 h-[0.5px] border-none w-full mt-12' />
                        <div className='mt-12'>
                            <TodayPrescriptions />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AppointmentDetails