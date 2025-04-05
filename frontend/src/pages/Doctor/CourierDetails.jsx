import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { useParams } from 'react-router-dom'
import Input from '../../components/Input'
import { Calendar, Search } from 'lucide-react'

const CourierDetails = () => {
    const location = useParams();
    const [currentDate, setCurrentDate] = useState("");
    useEffect(() => {
        const updateDate = () => {
            const date = new Date().toLocaleDateString("en-GB", {
                day: "2-digit",
                month: "short",
                year: "numeric",
                timeZone: "Asia/Kolkata",
            });
            setCurrentDate(date);
        };
        updateDate();}, []);
    
    return (
        <div>
            <Docnavbar />
            <div className='flex'>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Courier Medicine List - {location.location}</h1>
                        <h1 className=' text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4'>{currentDate}</h1>
                        <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
                        <div className='flex flex-wrap md:flex-row flex-col items-center gap-5 md:gap-10 my-10'>
                            <div className='flex sm:flex-row flex-col items-center gap-1'>
                                <p className='whitespace-nowrap'>Start Date :</p>
                                <Input icon={Calendar} type='Date' />
                            </div>
                            <div className='flex sm:flex-row flex-col items-center gap-1'>
                                <p className='whitespace-nowrap'>End Date :</p>
                                <Input icon={Calendar} type='Date' />
                            </div>
                            <button className='py-2 px-4 bg-blue-500 flex items-center gap-5 text-lg font-semibold rounded-lg text-white'>Filter Data <Search /></button>
                        </div>
                        <h1 className=' text-blue-500 font-semibold mb-3 text-lg md:text-2xl text-center my-4'>Courier Details</h1>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7]  text-white">
                                    <tr >
                                        <th className="px-2 py-4 ">Count</th>
                                        <th className="px-2 py-4 ">Patient Name</th>
                                        <th className="px-4 py-4 ">Patient Case Paper</th>
                                        <th className="px-2 py-4 ">Contact Number</th>
                                        <th className="px-2 py-4 ">Address</th>
                                        <th className="px-2 py-4 ">Order Date</th>
                                        <th className="px-2 py-4 ">Balance Amount</th>
                                        <th className="px-2 py-4 ">Payment Details</th>
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

export default CourierDetails