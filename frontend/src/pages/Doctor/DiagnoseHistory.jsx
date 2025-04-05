import React from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import Input from '../../components/Input'
import { MdMedicalInformation } from 'react-icons/md'
import { FaFilePdf } from 'react-icons/fa'

const DiagnoseHistory = () => {
    return (
        <div>
            <Docnavbar />
            <div className='flex'>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Diagnose History</h1>
                        <div className='flex items-center gap-2'>
                            <Input icon={MdMedicalInformation} placeholder='Search for Disease or Medicine here ..' />
                            <button className='py-2 px-4 bg-blue-500 font-semibold rounded-lg text-white'>Search</button>
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
                                <tbody></tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DiagnoseHistory