import React from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { useParams } from 'react-router-dom'
import { CiMedicalClipboard } from 'react-icons/ci'

const BalanceList = () => {
    const location = useParams();
    return (
        <div>
            <Docnavbar />
            <div className='flex'>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden'>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Balance List {location.location}</h1>
                        <div className='flex items-center gap-5 mt-10'>
                            <h1 className='text-xl'>Select Appointment Type </h1>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <CiMedicalClipboard className="size-4 text-blue-500" />
                                </div>
                                <select name="appointment" required id="appontmentType" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                    <option value="All">All</option>
                                    <option value="General">General</option>
                                    <option value="Repeat Medicine">Repeat Medicine</option>
                                    <option value="Courier Medicine">Courier Medicine</option>
                                </select>
                            </div>
                        </div>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7]  text-white">
                                    <tr >
                                        <th className="px-2 py-4 ">Count</th>
                                        <th className="px-2 py-4 ">Patient Name</th>
                                        <th className="px-4 py-4 ">Patient Case Paper</th>
                                        <th className="px-2 py-4 ">Contact No.</th>
                                        <th className="px-2 py-4 ">Appointment Type</th>
                                        <th className="px-2 py-4 ">Date</th>
                                        <th className="px-2 py-4 ">Balance Amount</th>
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

export default BalanceList