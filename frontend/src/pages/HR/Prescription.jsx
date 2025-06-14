import React, { useEffect } from 'react'
import HRnavbar from '../../components/HR/HRnavbar'
import { docStore } from '../../store/DocStore';
import { useNavigate, useParams } from 'react-router-dom';

const Prescription = () => {
    const { id } = useParams();
    const { prescriptionSubmit, fetchPrescription, prescription, otherPrescriptions, getOtherPrescription,balanceDue,getBalanceDue,appointmentSection, getAppdetails, appointments } = docStore();
    const navigate = useNavigate();
    useEffect(() => {
        fetchPrescription(id);
        getOtherPrescription(id);
        getBalanceDue(id);
        getAppdetails(appointmentSection);
    }, [fetchPrescription, prescriptionSubmit, getOtherPrescription,getAppdetails])
    console.log(appointments);
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
                                            <td className='py-2 px-1 text-red-500 text-center'>Pending</td>
                                            <td className='py-2 px-1 text-center'>Rs {balanceDue==='No Balance Field'?0:balanceDue.dueBalance}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    {otherPrescriptions.length>0 && <div><h1 className='p-4 text-center mt-5 font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Other Presciptions</h1>
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
                                    otherPrescriptions.map((prescription, index) => (
                                        <tr key={index} className='bg-blue-200'>
                                            <td className='py-2 px-1 text-center'>{index + 1}</td>
                                            <td className='py-2 px-1 text-center'>{prescription?.medicineName}</td>
                                            <td className='py-2 px-1 text-center'>{prescription?.medicine_issued_flag===false?'MEDICINE NOT ISSUED':'MEDICINE ISSUED'}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                        </div>
                        </div>
                    }
                    <button onClick={() => { navigate(`/medicine-payment/${id}`) }} className='bg-red-500 text-white text-2xl hover:scale-99 transition hover:bg-red-600 cursor-pointer font-semibold py-2 px-5 rounded-md mx-auto block mt-5'>Pay Now</button>
                </div>
            </div>
        </div>
    )
}

export default Prescription