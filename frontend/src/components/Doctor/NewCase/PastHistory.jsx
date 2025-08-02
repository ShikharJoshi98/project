import { useEffect, useState } from 'react'
import Input from '../../Input'
import { BiCalendar } from 'react-icons/bi';
import { MdAssignmentAdd } from 'react-icons/md';
import AddComplaintModal from './AddComplaintModal';
import { DOC_API_URL, docStore } from '../../../store/DocStore';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { CiCalendar, CiMedicalClipboard, CiTrash } from 'react-icons/ci';

const PastHistory = ({ complaint }) => {
    const [pastHistoryInput, setpastHistoryInput] = useState("");
    const [isComplaintModalOpen, setComplaintModalIsOpen] = useState(false);
    const { id } = useParams();
    const { getCaseData, list, getPastHistoryData, PastHistoryData } = docStore();
    const [submit, setSubmit] = useState(false);
    const [formValues, setFormValues] = useState({
        patient: id,
        lastDiagnosed: "",
        lastSuffix: "",
        duration: "",
        durationSuffix: "",
        remark: "",
    });

    useEffect(() => { getCaseData('Present Complaints'); getPastHistoryData(id) },
        [getCaseData, getPastHistoryData, submit]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
            ...prevValues,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post(`${DOC_API_URL}/add-past-history-patient/${id}`, { ...formValues, complaintName: pastHistoryInput });
            setSubmit(prev => !prev);
            setpastHistoryInput("");
            setFormValues({
                patient: "",
                lastDiagnosed: "",
                lastSuffix: "",
                duration: "",
                durationSuffix: "",
                remark: "",
            });
        } catch (error) {
            console.error(error.message);
        }
    }

    const deletePastHistory = async (id) => {
        try {
            const respose = await axios.delete(`${DOC_API_URL}/deletepastHistory/${id}`);
            setSubmit(prev => !prev);
        } catch (error) {
            console.error(error.message);
        }
    }
    return (
        <>
            <div className='flex sm:flex-row flex-col items-center sm:items-start w-full gap-10 mt-10 mb-2 pr-5'>
                <form onSubmit={handleSubmit} className='sm:w-1/2 w-full space-y-5'>
                    <h1 className='text-black text-2xl font-semibold mb-9'>Add {complaint}</h1>
                    <button type='button' onClick={() => { setpastHistoryInput(""); setFormValues({ patient: "", lastDiagnosed: "", lastSuffix: "", duration: "", durationSuffix: "", remark: "", }) }} className="bg-gray-700 block place-self-end transition-all duration-300 cursor-pointer hover:bg-black px-5 py-2 rounded-lg mt-3 text-white">Clear Form</button>
                    <div className='flex flex-col gap-2 '>
                        <h1>Complaint*</h1>
                        <Input icon={CiMedicalClipboard} onChange={(e) => { setpastHistoryInput(e.target.value); handleInputChange(e) }} type="text" placeholder="Enter Complaint" value={pastHistoryInput} required />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Last diagnosed*</h1>
                        <Input icon={CiCalendar} onChange={handleInputChange} name="lastDiagnosed" value={formValues.lastDiagnosed} type="text" placeholder="eg. : 2,4,5 .." required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Last Suffix* </h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <BiCalendar className="size-4 text-blue-500" />
                            </div>
                            <select onChange={handleInputChange} name="lastSuffix" value={formValues.lastSuffix} className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                <option value="" disabled selected className='font-normal ' >Please Select Days / Weeks / Months / Years</option>
                                <option value="Days">Days Back</option>
                                <option value="Week Back">Week Back</option>
                                <option value="Months Back">Months Back</option>
                                <option value="Year Back">Year Back</option>
                                <option value="Years of Age">Years of Age</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Duration*</h1>
                        <Input icon={CiCalendar} onChange={handleInputChange} name="duration" value={formValues.duration} type="text" placeholder="Enter Number for Duration" required />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Duration Suffix* </h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <BiCalendar className="size-4 text-blue-500" />
                            </div>
                            <select onChange={handleInputChange} name="durationSuffix" value={formValues.durationSuffix} className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                <option value="" disabled selected className='font-normal ' >Please Select Days / Weeks / Months / Years</option>
                                <option value="Days">Days</option>
                                <option value="Weeks">Week</option>
                                <option value="Months">Months</option>
                                <option value="Year">Year</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Remark</h1>
                        <Input onChange={handleInputChange} name="remark" value={formValues.remark} icon={CiCalendar} type="text" placeholder="Enter Remark if any" />
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
                                <h1 onClick={() => setpastHistoryInput(investigation?.name)} className='text-xl cursor-pointer p-1' key={index}>{investigation?.name}</h1>
                                <hr className='border-none h-[0.5px] w-full bg-gray-300' />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <h1 className='text-lg sm:text-xl md:text-3xl text-center font-semibold my-10 text-[#337ab7]'>Past History Details :
            </h1>
            <div className="overflow-x-auto mt-10 rounded-lg">
                <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                    <thead className="bg-[#337ab7]  text-white">
                        <tr >
                            <th className="px-1 py-4 ">Date</th>
                            <th className="px-2 py-4 ">Complain</th>
                            <th className="px-2 py-4 ">Last Diagnosed</th>
                            <th className="px-4 py-4 ">Duration</th>
                            <th className="px-2 py-4 ">Remarks</th>
                            <th className="py-4 ">Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            PastHistoryData.map((data, index) => (
                                <tr key={index} className="bg-blue-200 text-lg">
                                    <td className='py-2 px-1 text-center'>{data?.created_at}</td>
                                    <td className='py-2 px-2 text-center'>{data?.complaintName}</td>
                                    <td className='py-2 px-2 text-center'>{data?.lastDiagnosed} {data?.lastSuffix}</td>
                                    <td className='py-2 px-2 text-center'>{data?.duration} {data?.durationSuffix}</td>
                                    <td className='py-2 px-2 text-center'>{data?.remark}</td>
                                    <td onClick={() => deletePastHistory(data?._id)} className='py-2 px-1 place-items-center'><CiTrash /></td>
                                </tr>
                            ))}
                    </tbody>
                </table>
            </div>
            {isComplaintModalOpen && <AddComplaintModal onClose={() => setComplaintModalIsOpen(false)} complaint={complaint} />}
        </>
    )
}

export default PastHistory