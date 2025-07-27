import { useEffect } from 'react'
import { FaAngleDoubleLeft } from 'react-icons/fa'
import { recStore } from '../../store/RecStore'
import { useNavigate, useParams } from 'react-router-dom'
import { docStore } from '../../store/DocStore'
import { generateTablePDF } from '../../store/generatePDF'
import { updateDate } from '../../store/todayDate'

const CaseReport = () => {
    const { patient, getPatient } = recStore();
    const { getPresentComplaintData, PresentComplaintData, getChiefComplaints, chiefComplaints, getPastHistoryData, PastHistoryData, getPersonalHistory, personalHistory, getFamilyMedicalData, FamilyMedicalData, getMentalCausative, MentalCausativeData, mentalCausativeScribble, getMentalCausativeScribble, MentalPersonalityData, getMentalPersonality, getMentalPersonalityScribble, mentalPersonalityScribble, getBriefMindSymptomScribble, briefMindSymptomScribble, ThermalReactionData, getThermalReaction, getMiasm, MiasmData } = docStore();
    const location = useParams();
    const navigate = useNavigate();
    const today = updateDate();
    
    useEffect(() => {
        getPatient(location.id); getPresentComplaintData(location.id); getChiefComplaints(location.id); getPastHistoryData(location.id); getPersonalHistory(location.id); getFamilyMedicalData(location.id); getMentalCausative(location.id);
        getMentalCausativeScribble(location.id); getMentalPersonality(location.id); getMentalPersonalityScribble(location.id); getBriefMindSymptomScribble(location.id); getThermalReaction(location.id); getMiasm(location.id);
    }, [getPatient, getPresentComplaintData, getChiefComplaints, getPersonalHistory, getFamilyMedicalData, getMentalCausative, getMentalCausativeScribble, getMentalPersonality, getMentalPersonalityScribble, getBriefMindSymptomScribble, getThermalReaction, getMiasm])
    
    return (
        <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 p-8 min-h-screen w-full">
            <div className="bg-[#e9ecef] w-auto p-5 rounded-lg">
                <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
                <h1 className='text-xl sm:text-4xl text-center font-semibold mt-5 text-[#337ab7]'>Patient Details</h1>
                <div className='flex md:flex-row flex-col items-center md:items-start gap-2 mt-10'>
                    <div className='flex gap-3 w-full md:w-1/5  min-h-72 rounded-lg bg-gray-300 flex-col items-center justify-center'>
                        <img src="/user.png" alt="user_image" className='size-20 md:size-28' />
                        <h1 className='text-lg md:text-xl  font-semibold'>{patient?.fullname}</h1>
                        <h1 className='text-sm md:text-base '>{patient?.casePaperNo}</h1>
                    </div>
                    <div className='w-full md:w-4/5  gap-2 flex min-h-72 flex-col justify-between text-xs lg:text-base '>
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
                        <div className='p-5 rounded-lg bg-gray-300 grid gap-y-5  sm:grid-cols-2 grid-cols-2'>
                            <div><span className='font-semibold'>Dietary Preference :</span> <span>{patient?.dietaryPreference}</span></div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="bg-[#e9ecef] w-auto p-5 mt-5 rounded-lg">
                <h1 onClick={() => navigate(`/new-case-details/${location.id}`)} className='text-lg flex items-center gap-3 py-1 px-3 bg-blue-500 rounded-md text-white w-fit cursor-pointer'><FaAngleDoubleLeft /> New Case</h1>
                <h1 className='text-xl sm:text-4xl text-center font-semibold mt-5 text-[#337ab7]'>New Case - Final Report</h1>
                <div className='flex items-center justify-between my-5'>
                    <h1 className=' text-blue-500 font-semibold mb-3 text-lg'>{today}</h1>
                    <button onClick={() => generateTablePDF(patient, PresentComplaintData, chiefComplaints, PastHistoryData,personalHistory, FamilyMedicalData, MentalCausativeData[0]?.diseases, mentalCausativeScribble, MentalPersonalityData[0]?.diseases, mentalPersonalityScribble, briefMindSymptomScribble, ThermalReactionData[0]?.diseases, MiasmData[0]?.diseases)} className='bg-green-500 text-white p-2 rounded-lg cursor-pointer font-semibold'>Generate PDF</button>
                </div>
                <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
                <div className='mt-12'>
                    <h1 className='text-blue-500 font-semibold text-xl'>Health Assessment</h1>
                    <div className='p-2  overflow-x-auto w-full mt-5'>
                        <table className="border-collapse w-full border-2 border-gray-500 ">
                            <thead>
                                <tr className="bg-blue-500 text-white">
                                    <th className="border border-gray-500 p-2">SNo.</th>
                                    <th className="border border-gray-500 p-2">Assesment Date</th>
                                    <th className="border border-gray-500 p-2">Blood Pressure</th>
                                    <th className="border border-gray-500 p-2">Weight</th>
                                </tr>
                            </thead>
                            <tbody>
                                {patient?.healthRecords.map((healthRecord, index) => (
                                    <tr key={index} className="bg-blue-200">
                                        <td className="border border-gray-300 px-4 py-2 text-center">{index + 1}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">{healthRecord?.date}</td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {healthRecord?.bloodPressure} mmHg                  </td>
                                        <td className="border border-gray-300 px-4 py-2 text-center">
                                            {healthRecord?.weight} Kg
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className='mt-12'>
                    <h1 className='text-blue-500 font-semibold text-xl'>Present Complaints</h1>
                    <div className="overflow-x-auto mt-10 rounded-lg">
                        <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7] text-white">
                                <tr >
                                    <th className="px-1 py-4 ">Date</th>
                                    <th className="px-2 py-4 ">Complain</th>
                                    <th className="px-2 py-4 ">Duration</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PresentComplaintData.map((complaint, index) => (
                                    <tr key={index} className="bg-blue-200">
                                        <td className='py-2 px-1 text-center'>{complaint?.created_at}</td>
                                        <td className='py-2 px-2 text-center'>{complaint?.complaintName}</td>
                                        <td className='py-2 px-2 text-center'>{complaint?.duration} {complaint?.durationSuffix}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-12">
                    <h1 className='text-blue-500 font-semibold text-xl'>Cheif Complaints</h1>
                    {chiefComplaints.map((complaint, index) => (
                        <img src={complaint?.image} key={index} className='mt-5' />
                    ))}
                </div>
                <div className="mt-12">
                    <h1 className='text-blue-500 font-semibold text-xl'>Past History</h1>
                    <div className="overflow-x-auto mt-10 rounded-lg">
                        <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7]  text-white">
                                <tr >
                                    <th className="px-1 py-4 ">Date</th>
                                    <th className="px-2 py-4 ">Complain</th>
                                    <th className="px-2 py-4 ">Last Diagnosed</th>
                                    <th className="px-4 py-4 ">Duration</th>
                                    <th className="px-2 py-4 ">Remarks</th>
                                </tr>
                            </thead>
                            <tbody>
                                {PastHistoryData.map((data, index) => (
                                    <tr key={index} className="bg-blue-200">
                                        <td className='py-2 px-1 text-center'>{data?.created_at}</td>
                                        <td className='py-2 px-2 text-center'>{data?.complaintName}</td>
                                        <td className='py-2 px-2 text-center'>{data?.lastDiagnosed} {data?.lastSuffix}</td>
                                        <td className='py-2 px-2 text-center'>{data?.duration} {data?.durationSuffix}</td>
                                        <td className='py-2 px-2 text-center'>{data?.remark}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-12">
                    <h1 className='text-blue-500 font-semibold text-xl'>Personal History</h1>
                    <div>
                        {personalHistory.map((complaint, index) => (
                            <img src={complaint?.image} key={index} className='mt-5' />
                        ))}
                    </div>
                </div>
                <div className="mt-12">
                    <h1 className='text-blue-500 font-semibold text-xl'>Family Medical History</h1>
                    <div className="overflow-x-auto mt-10 rounded-lg">
                        <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7]  text-white">
                                <tr >
                                    <th className="px-1 py-4 ">Relation</th>
                                    <th className="px-2 py-4 ">Age</th>
                                    <th className="px-2 py-4 ">Diseases</th>
                                    <th className="px-4 py-4 ">Any Other</th>
                                    <th className="px-2 py-4 ">Dead/Alive</th>
                                </tr>
                            </thead>
                            <tbody>
                                {FamilyMedicalData.map((data, index) => (
                                    <tr key={index} className="bg-blue-200">
                                        <td className='py-2 px-1 text-center'>{data?.relation}</td>
                                        <td className='py-2 px-2 text-center'>{data?.age}</td>
                                        <td className='py-2 px-2 text-center'>{data?.diseases.join(',')}</td>
                                        <td className='py-2 px-2 text-center'>{data?.anyOther}</td>
                                        <td className='py-2 px-2 text-center'>{data?.lifeStatus}</td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="mt-12">
                    <h1 className='text-blue-500 font-semibold text-xl'>Mental Causative Factors</h1>
                    <div className='flex flex-col gap-3 items-center mt-5'>
                        {MentalCausativeData[0]?.diseases.map((disease, index) => (
                            <div className='text-xl flex items-center gap-8' key={index}>
                                <p>{index + 1}. {disease}</p>

                            </div>
                        ))}
                    </div>
                    <div>
                        {mentalCausativeScribble.map((complaint, index) => (
                            <img src={complaint?.image} key={index} className='mt-5' />
                        ))}
                    </div>
                </div>
                <div className="mt-12">
                    <h1 className='text-blue-500 font-semibold text-xl'>Mental Personality Character</h1>
                    <div className='flex flex-col gap-3 items-center mt-5'>
                        {MentalPersonalityData[0]?.diseases.map((disease, index) => (
                            <div className='flex items-center gap-8' key={index}>
                                <p>{index + 1}. {disease}</p>
                            </div>
                        ))}
                    </div>
                    <div>
                        {mentalPersonalityScribble.map((complaint, index) => (
                            <img src={complaint?.image} key={index} className='mt-5' />
                        ))}
                    </div>
                </div>
                <div className="mt-12">
                    <h1 className='text-blue-500 font-semibold text-xl'>Brief Mind Symptom</h1>
                    <div>
                        {briefMindSymptomScribble.map((complaint, index) => (
                            <img src={complaint?.image} key={index} className='mt-5' />
                        ))}
                    </div>
                </div>
                <div className="mt-12">
                    <h1 className='text-blue-500 font-semibold text-xl'>Thermal Reaction</h1>
                    <div className='flex flex-col items-center mt-3 gap-2'>
                        {ThermalReactionData[0]?.diseases.map((data, index) => (
                            <div className='flex items-center gap-8' key={index}>
                                <p>{index + 1}. {data}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="mt-12">
                    <h1 className='text-blue-500 font-semibold text-xl'>Miasm</h1>
                    <div className='flex flex-col items-center mt-3 gap-2'>
                        <div className='flex flex-col items-center mt-3 gap-2'>
                            {MiasmData[0]?.diseases.map((data, index) => (
                                <div className='text-xl flex items-center gap-8' key={index}>
                                    <p>{index + 1}. {data}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CaseReport