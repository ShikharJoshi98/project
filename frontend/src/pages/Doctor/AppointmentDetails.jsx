import React, { useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import AppointmentSidebar from '../../components/Doctor/AppointmentSidebar'
import { useLocation, useParams } from 'react-router-dom'
import { recStore } from '../../store/RecStore'
import HealthAssessment from '../../components/Doctor/HealthAssessment'
import PreviousPrescriptions from '../../components/Doctor/PreviousPrescriptions'
import TodayPrescriptions from '../../components/Doctor/TodayPrescription'
import PrescribeMedicine from '../../components/Doctor/PrescribeMedicine'
import { Plus } from 'lucide-react'

const AppointmentDetails = () => {
    const { patients } = recStore();
  const [isDiagnosisModalOpen, setDiagnosisModalIsOpen] = useState(false);

    const location = useParams();
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
                        <div className='flex md:flex-row flex-col items-center md:items-start gap-2 mt-10'>
                            <div className='flex gap-3 w-full md:w-1/5 px-5 py-13.5 rounded-lg bg-gray-300 flex-col items-center'>
                                <img src="/user.png" alt="user_image" className='size-20 md:size-28' />
                                <h1 className='text-lg md:text-xl  font-semibold'>Rakesh</h1>
                                <h1 className='text-sm md:text-base '>DOM-1001</h1>
                            </div>
                            <div className='w-full md:w-4/5 gap-2 flex flex-col '>
                                <div className='flex flex-wrap p-5 rounded-lg bg-gray-300 text-xs lg:text-lg items-center justify-around'>
                                    <div><span className='font-semibold'>Age :</span> <span>{patient[0]?.age}</span></div>
                                    <div><span className='font-semibold'>Gender :</span> <span>{patient[0]?.gender}</span></div>
                                    <div><span className='font-semibold'>Weight :</span> <span>67 Kgs</span></div>
                                </div>
                                <div className='flex flex-wrap p-5 rounded-lg bg-gray-300 text-xs lg:text-lg items-center justify-around'>
                                    <div><span className='font-semibold'>Phone :</span> <span>{patient[0]?.phone}</span></div>
                                    <div><span className='font-semibold'>Email :</span> <span>{patient[0]?.email}</span></div>
                                    <div><span className='font-semibold'>Address :</span> <span>{patient[0]?.address}</span></div>
                                </div>
                                <div className='flex flex-wrap p-5 rounded-lg bg-gray-300 text-xs lg:text-lg items-center justify-around'>
                                    <div><span className='font-semibold'>Qualification :</span> <span>{patient[0]?.qualification}</span></div>
                                    <div><span className='font-semibold'>Occupation :</span> <span>{patient[0]?.occupation}</span></div>
                                    <div><span className='font-semibold'>Marital Status :</span> <span>{patient[0]?.maritalStatus}</span></div>
                                </div>
                                <div className='flex flex-wrap p-5 rounded-lg bg-gray-300 text-xs lg:text-lg items-center justify-evenly'>
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
                            <PreviousPrescriptions />
                        </div>
                        <hr className='bg-blue-500 h-[0.5px] border-none w-full mt-12' />
                        <div className='mt-12 '>
                            <PrescribeMedicine/>
                        </div>
                        <hr className='bg-blue-500 h-[0.5px] border-none w-full mt-12' />
                        <div className='mt-12'>
                            <TodayPrescriptions />
                        </div>
                        <hr className='bg-blue-500 h-[0.5px] border-none w-full mt-12' />

                    </div>
                </div>

            </div>
            {isDiagnosisModalOpen && <PrescriptionModal onClose={() => setDiagnosisModalIsOpen(false)} />}


        </div>
    )
}

export default AppointmentDetails