import React from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import Input from '../../components/Input'
import { SearchIcon } from 'lucide-react'

const PreviousIssuedInvoice = () => {
    return (
        <div>
            <Docnavbar />
            <div className='flex'>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden'>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 mb-10 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Invoice History</h1>
                        <div className='flex items-center gap-2 '>
                            <Input icon={SearchIcon} placeholder="Enter Patient's Name/Case Paper no./Mobile Number here" />
                            <button className='py-2 px-4 bg-blue-500 cursor-pointer font-semibold text-white rounded-lg'>Search</button>
                        </div>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                            <thead className="bg-[#337ab7]  text-white">
                                    <tr >
                                        <th className="px-2 py-4 ">INVOICE DATE</th>
                                        <th className="px-2 py-4 ">CASE PAPER NO.</th>
                                        <th className="px-4 py-4 ">NAME</th>
                                        <th className="px-2 py-4 ">CONTACT NO.</th>
                                        <th className="px-2 py-4 ">INVOICE</th>
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

export default PreviousIssuedInvoice