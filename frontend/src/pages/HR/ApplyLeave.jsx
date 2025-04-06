import React from 'react'
import HRnavbar from '../../components/HR/HRnavbar'
import HRSidebar from '../../components/HR/HRSidebar'
import Input from '../../components/Input'
import { Calendar } from 'lucide-react'

const ApplyLeave = () => {
    return (
        <div>
            <HRnavbar />
            <div className='flex'>
                <HRSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Leave Reports</h1>
                        <div className='flex md:flex-row flex-col md:items-start items-center gap-2 mt-10 w-full'>
                            <form className='md:w-1/3 w-full space-y-5'>
                                <h1 className='text-lg text-center font-semibold text-blue-600 mb-4'>Apply Leave</h1>
                                <div className='flex flex-col gap-2'>
                                    <h1>Start Date :</h1>
                                    <Input icon={Calendar} type='Date' />
                                </div>
                                <div className='flex flex-col gap-2'>
                                    <h1>End Date :</h1>
                                    <Input icon={Calendar} type='Date' />
                                </div>
                                <div className='mb-3 '>
                                    <h1 className="text-black mb-2 text-lg font-semibold">Reason :</h1>
                                    <textarea placeholder='Enter Reason' className='w-full bg-white h-56  pl-3 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition duration-200'></textarea>
                                </div>
                                <button type="submit" className="bg-blue-500 w-full transition-all duration-300 cursor-pointer hover:bg-blue-600 py-2 rounded-lg mt-3 text-white">Apply Leave</button>
                            </form>
                            <div className='md:w-2/3 w-full md:mt-10'>
                                <div className='p-2 mx-auto mt-5 overflow-x-auto '>
                                    <table className="border-collapse w-full border-2 border-gray-500 ">
                                        <thead>
                                            <tr className="bg-blue-600 text-white">
                                                <th className='px-1 py-2'>Year</th>
                                                <th className='px-1 py-2'>Month</th>
                                                <th className='px-1 py-2'>Total Leaves (Days)</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                                <div className='p-2 mx-auto mt-5 overflow-x-auto '>
                                    <table className="border-collapse w-full border-2 border-gray-500 ">
                                        <thead>
                                            <tr className="bg-blue-600 text-white">
                                                <th className='px-2 py-2'>Serial No.</th>
                                                <th className='px-2 py-2'>Reason</th>
                                                <th className='px-2 py-2'>Start Date</th>
                                                <th className='px-2 py-2'>End Date</th>
                                                <th className='px-2 py-2'>Duration </th>
                                                <th className='px-2 py-2'>Approval Status</th>
                                            </tr>
                                        </thead>
                                        <tbody></tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ApplyLeave