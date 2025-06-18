import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import Input from '../../components/Input'
import { MdMedicalInformation } from 'react-icons/md'
import { FaFilePdf } from 'react-icons/fa'
import { docStore } from '../../store/DocStore'

const DiagnoseHistory = () => {
    const { prescriptionsArray, getPrescriptions } = docStore();
        const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        getPrescriptions();
    }, [getPrescriptions]);
        const filteredPrescriptions = prescriptionsArray.filter((prescription) => {
        const diagnosisMatch = prescription?.diagnosis?.some(d => d.toLowerCase().includes(searchTerm.toLowerCase()));
        const medicineMatch = prescription?.medicine?.toLowerCase().includes(searchTerm.toLowerCase());
        return diagnosisMatch || medicineMatch;
    });
    return (
        <div>
            <Docnavbar />
            <div className='flex'>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Diagnose History</h1>
                        <div className='flex items-center gap-2'>
                            <Input onChange={(e)=>setSearchTerm(e.target.value)} icon={MdMedicalInformation} placeholder='Search for Disease or Medicine here ..' />
                        </div>
                        <button className='py-2 px-4 bg-green-500 flex items-center gap-5 text-lg my-10 place-self-end font-semibold rounded-lg text-white'>Generate Pdf <FaFilePdf /></button>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7]  text-white">
                                    <tr >
                                        <th className="px-2 py-4 ">S.No</th>
                                        <th className="px-2 py-4 ">Diagnosis</th>
                                        <th className="px-4 py-4 ">Medicine</th>
                                        <th className="px-2 py-4 ">Date</th>
                                        <th className="px-2 py-4 ">Start Date</th>
                                        <th className="px-2 py-4 ">Duration</th>
                                        <th className="px-2 py-4 ">Case Paper No.</th>
                                        <th className="px-2 py-4 ">Patient Name</th>
                                        <th className="px-2 py-4 ">Pdf</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {searchTerm.length>0 && 
                                        filteredPrescriptions.map((pres, index) => (
                                            <tr key={index} className='bg-blue-200'>
                                                <td className="px-2 py-4 text-center">{index + 1}</td>
                                                <td className="px-2 py-4 ">{pres?.diagnosis.join(',')}</td>
                                                <td className="px-2 py-4 text-center">{pres?.medicine}</td>
                                                <td className="px-2 py-4 text-center">{pres?.prescription_date}</td>
                                                <td className="px-2 py-4 text-center">{pres?.start_date}</td>
                                                <td className="px-2 py-4 text-center">{pres?.duration}</td>
                                                <td className="px-2 py-4 text-center">{pres?.patient?.casePaperNo}</td>
                                                <td className="px-2 py-4 text-center">{pres?.patient?.fullname}</td>
                                                <td className="px-2 py-4 text-center"><button className='text-white bg-green-500 p-2 cursor-pointer rounded-md'><FaFilePdf className='size-6'/></button></td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiagnoseHistory