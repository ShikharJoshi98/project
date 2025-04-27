import React, { useState } from 'react'
import Input from '../../Input'
import { Calendar, ClipboardPlus } from 'lucide-react'
import { BiCalendar } from 'react-icons/bi'
import { MdAssignmentAdd } from 'react-icons/md'
import AddComplaintModal from './AddComplaintModal'

const PresentComplaints = ({ complaint }) => {
    const [presentComplaintInput, setpresentComplaintInput] = useState("");
    const [isComplaintModalOpen, setComplaintModalIsOpen] = useState(false);

    const listType = ["AIDS", "Boils"];

    const handleSubmit = () => {

    }
    return (
        <div>
            <div className='flex sm:flex-row flex-col items-center sm:items-start w-full gap-10 mt-10 mb-2 pr-5'>
                <form onSubmit={handleSubmit} className='sm:w-1/2 w-full space-y-5'>
                    <h1 className='text-black text-2xl font-semibold mb-9'>Add {complaint}</h1>
                    <button className="bg-gray-700 block place-self-end transition-all duration-300 cursor-pointer hover:bg-black px-5 py-2 rounded-lg mt-3 text-white">Clear Form</button>
                    <div className='flex flex-col gap-2 '>
                        <h1>Complaint*</h1>
                        <Input icon={ClipboardPlus} type="text" placeholder="Enter Complaint" value={presentComplaintInput} required />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Duration*</h1>
                        <Input icon={Calendar} type="text" placeholder="Enter Number for Duration" required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Duration Suffix* </h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <BiCalendar className="size-4 text-blue-500" />
                            </div>
                            <select className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                <option value="" disabled selected className='font-normal ' >Please Select Days / Weeks / Months / Years</option>
                                <option value="Days">Days</option>
                                <option value="Weeks">Week</option>
                                <option value="Weeks">Months</option>
                                <option value="Weeks">Year</option>
                            </select>
                        </div>
                    </div>
                    <button className="bg-blue-500 block mx-auto transition-all duration-300 cursor-pointer hover:bg-blue-600 px-5 py-2 rounded-lg mt-3 text-white">Add</button>
                </form>
                <div className='sm:w-1/2 w-full'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-black text-xl font-semibold mb-4'>Recent List</h1>
                        <MdAssignmentAdd onClick={() => setComplaintModalIsOpen(true)} size={30} className='text-blue-500 cursor-pointer' />
                    </div>
                    <div className='flex flex-col items-center h-[500px] overflow-y-auto gap-1 bg-gray-200 border rounded-2xl pt-3 mt-5'>
                        {listType.map((investigation, index) => (
                            <>
                                <h1 onClick={() => setpresentComplaintInput(investigation)} className='text-xl cursor-pointer p-1' key={index}>{investigation}</h1>
                                <hr className='border-none h-[0.5px] w-full bg-gray-300' />
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <h1 className='text-lg sm:text-xl md:text-3xl text-center font-semibold my-10 text-[#337ab7]'>Present Complaints Details :
            </h1>
            <div className="overflow-x-auto mt-10 rounded-lg">
                <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                    <thead className="bg-[#337ab7]  text-white">
                        <tr >
                            <th className="px-1 py-4 ">Date</th>
                            <th className="px-2 py-4 ">Complain</th>
                            <th className="px-4 py-4 ">Duration</th>
                            <th className="px-2 py-4 ">Remarks</th>
                            <th className="py-4 ">Delete</th>
                        </tr>
                    </thead>
                    <tbody></tbody>
                </table>
            </div>
            {isComplaintModalOpen && <AddComplaintModal onClose={() => setComplaintModalIsOpen(false)} complaint={complaint} />}

        </div>
    )
}

export default PresentComplaints