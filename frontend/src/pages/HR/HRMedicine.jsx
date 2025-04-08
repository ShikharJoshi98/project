import React, { useEffect, useState } from 'react'
import HRnavbar from '../../components/HR/HRnavbar'
import HRSidebar from '../../components/HR/HRSidebar'
import Input from '../../components/Input'
import { SearchIcon } from 'lucide-react'
import { useStore } from '../../store/UpdateStore'

const HRMedicine = () => {
    const [currentDate, setCurrentDate] = useState("");
    const { setMedSection, medSection } = useStore();
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

        updateDate();
    }, []);
    return (
        <div>
            <HRnavbar />
            <div className="flex">
                <HRSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef]  w-auto p-5 mx-10 my-6 rounded-lg '>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>{medSection} Details</h1>
                        <h1 className="text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4">{currentDate}</h1>
                        <div className='sm:flex grid grid-cols-2 mt-8 sm:flex-row text-stone-800 font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[10px] sm:text-base md:text-lg'>
                            <button onClick={()=>setMedSection("General")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${medSection==='General'?'bg-blue-500 text-white':'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>GENERAL </button>
                            <button onClick={()=>setMedSection("Repeat Medicine")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${medSection==='Repeat Medicine'?'bg-blue-500 text-white':'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>REPEAT MEDICINE </button>
                            <button onClick={()=>setMedSection("Courier Medicine")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${medSection==='Courier Medicine'?'bg-blue-500 text-white':'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>COURIER MEDICINE</button>
                        </div>
                        <div className='flex items-center gap-2 mt-10'>
                            <Input icon={SearchIcon} placeholder='Search for Items here' />
                            <button className='py-2 px-4 bg-blue-500 font-semibold rounded-lg text-white'>Search</button>
                        </div>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7] whitespace-nowrap text-white">
                                    <tr >
                                        <th className="px-1 py-2 ">Case Paper No.</th>
                                        <th className="px-1 py-2 ">Date</th>
                                        <th className="px-1 py-2 ">Phone</th>
                                        <th className="px-1 py-2 ">Patient's Name</th>
                                        <th className="px-1 py-2 ">Status</th>
                                        <th className="px-1 py-2 ">Branch</th>
                                        <th className="px-1 py-2 ">Details</th>
                                        <th className="px-1 py-2 ">Mail Status</th>
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

export default HRMedicine