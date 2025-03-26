import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import AppointmentSidebar from '../../components/Doctor/AppointmentSidebar'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { recStore } from '../../store/RecStore'
import { useNavigate, useParams } from 'react-router-dom'
import HealthAssessment from '../../components/Doctor/HealthAssessment'

const CaseReport = () => {
    const { patients, getPatientDetails } = recStore();
    const location = useParams();
    const navigate = useNavigate();
    const [currentDate, setCurrentDate] = useState("");

    useEffect(() => {
        getPatientDetails();
    }, [getPatientDetails])
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

    const patient = patients.filter((cand => (cand._id) === location.id));
    return (
        <div>
            <Docnavbar />
            <div className="flex">
                <AppointmentSidebar />
                <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
                    <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
                        <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-5 text-[#337ab7]'>Patient Details</h1>
                        <div className='flex md:flex-row flex-col items-center md:items-start gap-2 mt-10'>
                            <div className='flex gap-3 w-full md:w-1/5 px-5 py-13.5 rounded-lg bg-gray-300 flex-col items-center'>
                                <img src="/user.png" alt="user_image" className='size-20 md:size-28' />
                                <h1 className='text-lg md:text-xl  font-semibold'>{patient[0]?.fullname}</h1>
                                <h1 className='text-sm md:text-base '>{patient[0]?.casePaperNo}</h1>
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
                    </div>
                    <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
                        <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
                        <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-5 text-[#337ab7]'>New Case - Final Report</h1>
                        <div className='flex items-center justify-between my-5'>
                            <h1 className=' text-blue-500 font-semibold mb-3 text-lg md:text-2xl '>{currentDate}</h1>
                            <button className='bg-green-500 text-white p-2 rounded-lg cursor-pointer font-semibold'>Generate PDF</button>
                        </div>
                        <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
                        <div className='mt-12'>
                            <h1 className='text-blue-500 font-semibold text-2xl'>Health Assessment</h1>
                            <div className='p-2  overflow-x-auto w-full mt-5'>
                                <table className="border-collapse  w-full border-2 border-gray-500 ">
                                    <thead>
                                        <tr className="bg-blue-500 text-lg text-white">
                                            <th className="border border-gray-500 p-2">SNo.</th>
                                            <th className="border border-gray-500 p-2">Assesment Date</th>
                                            <th className="border border-gray-500 p-2">Blood Pressure</th>
                                            <th className="border border-gray-500 p-2">Weight</th>
                                            <th className="border border-gray-500 p-2">Delete</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaseReport