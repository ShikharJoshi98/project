import React from 'react'
import HRnavbar from '../../components/HR/HRnavbar'
import HRSidebar from '../../components/HR/HRSidebar'

const Collections = () => {
    return (
        <div>
            <HRnavbar />
            <div className='flex'>
                <HRSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Dombivali - Collections</h1>
                        <div className="overflow-x-auto mt-10 rounded-lg">
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
                        <h1 className='p-4 text-center mt-10 font-semibold text-[#337ab7] text-lg sm:text-xl md:text-3xl'>Details</h1>
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

export default Collections