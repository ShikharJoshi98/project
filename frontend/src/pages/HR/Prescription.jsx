import React, { useEffect } from 'react'
import HRnavbar from '../../components/HR/HRnavbar'
import { docStore } from '../../store/DocStore';
import { useNavigate, useParams } from 'react-router-dom';

const Prescription = () => {
    const { id } = useParams();
    const { prescriptionSubmit, fetchPrescription, prescription } = docStore();
    const navigate = useNavigate();
    useEffect(() => {
        fetchPrescription(id);
    }, [fetchPrescription, prescriptionSubmit])
    console.log(prescription);
    return (
        <div>
            <HRnavbar />
            <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                    <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Prescription Today</h1>
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
                                    <th className="px-1 py-2 ">Status</th>
                                    <th className="px-1 py-2 ">Balance Due</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    prescription.map((pres, index) => (
                                        <tr key={index} className='bg-blue-200'>
                                            <td className='py-2 px-1 text-center'>{pres?.medicine}</td>
                                             <td className='py-2 px-1 text-center'>{pres?.potency}</td>
                                            <td className='py-2 px-1 text-center'>{pres?.prescription_date}</td>
                                            <td className='py-2 px-1 text-center'>{pres?.start_date}</td>
                                            <td className='py-2 px-1 text-center'>{pres?.dose}</td>
                                            <td className='py-2 px-1 text-center'>{pres?.note}</td>
                                            <td className='py-2 px-1 text-center'>{pres?.duration}</td>
                                            <td onClick={()=>{navigate(`/medicine-payment/${id}`)}} className='py-2 px-1 text-center'><button className="bg-red-500 p-2 rounded-md text-white cursor-pointer">Pay Now</button></td>
                                            <td className='py-2 px-1 text-center'>Balance</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Prescription