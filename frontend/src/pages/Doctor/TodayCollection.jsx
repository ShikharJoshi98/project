import React, { useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { useParams } from 'react-router-dom'
import { User } from 'lucide-react'

const TodayCollection = () => {
    const location = useParams();
    const [collectionType, setCollectionType] = useState('Collections');
    
    return (
        <div>
            <Docnavbar />
            <div className='flex '>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>{collectionType} {location.location}</h1>
                        <div className='sm:flex grid grid-cols-2 mt-10 sm:flex-row text-white font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[6px] sm:text-[8px] md:text-sm'>
                            <button onClick={()=>setCollectionType('Collections')} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>All Collections</button>
                            <button onClick={()=>setCollectionType('General Collections')} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>General Collections</button>
                            <button onClick={()=>setCollectionType('Repeat Medicine Collections')} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Repeat Medicine Collections</button>
                            <button onClick={()=>setCollectionType('Courier Medicine Collections')} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Courier Medicine Collections</button>
                        </div>
                        {collectionType==='Collections'&&<><div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7]  text-white">
                                    <tr >
                                        <th className="px-2 py-4 ">AMOUNT COLLECTED TODAY</th>
                                        <th className="px-2 py-4 ">CASH PAYMENT</th>
                                        <th className="px-4 py-4 ">ONLINE PAYMENT</th>
                                        <th className="px-2 py-4 ">BALANCE(DUES TODAY)</th>
                                        <th className="px-2 py-4 ">ADVANCE (TODAY)</th>
                                    </tr>
                                </thead>
                                <tbody></tbody>
                            </table>
                        </div>
                        <h1 className='p-4 text-center mt-10 font-semibold text-[#337ab7] text-lg sm:text-xl md:text-3xl'>Collections Details</h1>
                        <div className='flex flex-col gap-2'>
                            <h1>Select Payment Collected by :  </h1>
                            <div className='relative'>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <User className="size-4 text-blue-500" />
                                </div>
                                <select name="patient" required id="patient" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                    <option value="" disabled selected className='font-normal' >Select Here</option>
                                    <option value="Patient 1">All</option>
                                    <option value="Patient 3">Rajesh Tiwari - HR1</option>
                                    <option value="Patient 3">Saloni Sharma - HR3</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2 mt-8'>
                            <p className='text-lg'>Total Amount Collected Rs 0.00</p>
                            <p className='text-lg'>Total Cash Rs 0.00</p>
                            <p className='text-lg'>Total Online Rs 0.00</p>
                            <p className='text-lg'>Total Balance Rs 0.00</p>
                            <p className='text-lg'>Total Advance Rs 0.00</p>
                        </div></>}
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7] whitespace-nowrap text-sm text-white">
                                    <tr >
                                        <th className="px-1 py-4 ">Case Paper No.</th>
                                        <th className="px-1 py-4 ">Name</th>
                                        <th className="px-1 py-4 ">Total Amount</th>
                                        <th className="px-1 py-4 ">Amount Paid</th>
                                        <th className="px-1 py-4 ">Cash</th>
                                        <th className="px-1 py-4 ">Online</th>
                                        <th className="px-1 py-4 ">Transaction Details</th>
                                        <th className="px-1 py-4 ">Status</th>
                                        <th className="px-1 py-4 ">Type</th>
                                        <th className="px-1 py-4 ">Balance(Dues Today)</th>
                                        <th className="px-1 py-4 ">Payment Collected By</th>
                                        <th className="px-1 py-4 ">Edit</th>
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

export default TodayCollection