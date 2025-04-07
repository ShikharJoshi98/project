import React from 'react'
import HRnavbar from '../../components/HR/HRnavbar'
import HRSidebar from '../../components/HR/HRSidebar'
import Input from '../../components/Input'
import { SearchIcon } from 'lucide-react'

const BalanceHistory = () => {
    return (
        <div>
            <HRnavbar />
            <div className="flex">
                <HRSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Balance History Details</h1>
                        <div className='flex items-center gap-2 mt-2'>
                            <Input icon={SearchIcon} placeholder='Search for Items here' />
                            <button className='py-2 px-4 bg-blue-500 font-semibold rounded-lg text-white'>Search</button>
                        </div>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7] whitespace-nowrap text-white">
                                    <tr >
                                        <th className="px-1 py-4 ">Case Paper No.</th>
                                        <th className="px-1 py-4 ">Name</th>
                                        <th className="px-1 py-4 ">Contact</th>
                                        <th className="px-1 py-4 ">Last Appointment</th>
                                        <th className="px-1 py-4 ">Appointment Type</th>
                                        <th className="px-1 py-4 ">Amount (Rs)</th>
                                        <th className="px-1 py-4 ">Pay Balance Amount</th>
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

export default BalanceHistory