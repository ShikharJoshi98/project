import { useEffect, useState } from 'react'
import Input from '../../Input'
import { BiCalendar } from 'react-icons/bi'
import { MdAssignmentAdd } from 'react-icons/md'
import AddComplaintModal from './AddComplaintModal'
import axios from 'axios'
import { DOC_API_URL, docStore } from '../../../store/DocStore'
import { useParams } from 'react-router-dom'
import { CiCalendar, CiMedicalClipboard, CiTrash } from 'react-icons/ci'

const PresentComplaints = ({ complaint }) => {
    const [presentComplaintInput, setpresentComplaintInput] = useState("");
    const [duration, setDuration] = useState("");
    const [durationType, setDurationType] = useState("");
    const [isComplaintModalOpen, setComplaintModalIsOpen] = useState(false);
    const { id } = useParams();
    const { getCaseData, list, getPresentComplaintData, PresentComplaintData } = docStore();
    const [submit, setSubmit] = useState(false);

    useEffect(() => { getCaseData(complaint); getPresentComplaintData(id) },
        [getCaseData, getPresentComplaintData, submit]);

    const handleSubmit = async (e) => {
        try {
            e.preventDefault();
            await axios.post(`${DOC_API_URL}/add-present-complaints-patient/${id}`,
                {
                    complaintName: presentComplaintInput,
                    duration,
                    durationSuffix: durationType
                }
            )
            setSubmit(prev => !prev);
            setDuration("");
            setDurationType("");
            setpresentComplaintInput("");
        } catch (error) {
            console.error(error.message);
        }
    }

    const deletePresentComplaint = async (id) => {
        try {
            const respose = await axios.delete(`${DOC_API_URL}/deletepresentComplaints/${id}`);
            setSubmit(prev => !prev);
        } catch (error) {
            console.error(error.message);
        }
    }

    return (
        <div>
            <div className='flex sm:flex-row flex-col items-center sm:items-start w-full gap-10 mt-10 mb-2 pr-5'>
                <form onSubmit={handleSubmit} className='sm:w-1/2 w-full space-y-5'>
                    <h1 className='text-black text-2xl font-semibold mb-9'>Add {complaint}</h1>
                    <button type='button' onClick={() => { setDuration(""); setDurationType(""); setpresentComplaintInput(""); }} className="bg-gray-700 block place-self-end transition-all duration-300 cursor-pointer hover:bg-black px-5 py-2 rounded-lg mt-3 text-white">Clear Form</button>
                    <div className='flex flex-col gap-2 '>
                        <h1>Complaint*</h1>
                        <Input icon={CiMedicalClipboard} onChange={(e) => setpresentComplaintInput(e.target.value)} type="text" placeholder="Enter Complaint" value={presentComplaintInput} required />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Duration*</h1>
                        <Input icon={CiCalendar} onChange={(e) => setDuration(e.target.value)} value={duration} type="text" placeholder="Enter Number for Duration" required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Duration Suffix* </h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <BiCalendar className="size-4 text-blue-500" />
                            </div>
                            <select onChange={(e) => setDurationType(e.target.value)} value={durationType} className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                <option value="" disabled className='font-normal'>Please Select Days / Weeks / Months / Years</option>
                                <option value="Days">Days</option>
                                <option value="Week">Week</option>
                                <option value="Months">Months</option>
                                <option value="Year">Year</option>
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
                        {list?.map((investigation, index) => (
                            <div key={index}>
                                <h1 onClick={() => setpresentComplaintInput(investigation?.name)} className='text-xl cursor-pointer p-1' key={index}>{investigation?.name}</h1>
                                <hr className='border-none h-[0.5px] w-full bg-gray-300' />
                            </div>
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
                            <th className="px-1 py-4">Date</th>
                            <th className="px-2 py-4">Complain</th>
                            <th className="px-2 py-4">Duration</th>
                            <th className="py-4 ">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            PresentComplaintData.map((complaint, index) => (
                                <tr key={index} className="bg-blue-200 text-lg">
                                    <td className='py-2 px-1 text-center'>{complaint?.created_at}</td>
                                    <td className='py-2 px-2 text-center'>{complaint?.complaintName}</td>
                                    <td className='py-2 px-2 text-center'>{complaint?.duration} {complaint?.durationSuffix}</td>
                                    <td onClick={() => deletePresentComplaint(complaint?._id)} className='py-2 px-1 place-items-center'><CiTrash /></td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            {isComplaintModalOpen && <AddComplaintModal onClose={() => setComplaintModalIsOpen(false)} complaint={complaint} />}
        </div>
    )
}

export default PresentComplaints