import React from 'react'
import RecNavbar from '../../components/Receptionist/RecNavbar'
import RecSidebar from '../../components/Receptionist/RecSidebar'

const TaskDetailsRec = () => {
    return (
        <div>
            <RecNavbar />
            <div className="flex">
                <RecSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Task Details</h1>
                        <div className='p-2 mx-auto mt-5 overflow-x-auto '>
                            <table className="border-collapse w-full border-2 border-gray-500 ">
                                <thead>
                                    <tr className="bg-blue-500 text-white">
                                        <th className='px-4 py-2'>Serial No.</th>
                                        <th className='px-4 py-2'>Task</th>
                                        <th className='px-4 py-2'>Assigned To</th>
                                        <th className='px-4 py-2'>Assigned On</th>
                                        <th className='px-4 py-2'>Status</th>
                                        <th className='px-4 py-2'>Change Status</th>
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

export default TaskDetailsRec