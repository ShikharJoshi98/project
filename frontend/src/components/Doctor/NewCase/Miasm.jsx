import { useEffect, useState } from 'react'
import MultiSelectDropdown from '../MultiSelectInput';
import { MdAssignmentAdd } from 'react-icons/md';
import AddComplaintModal from './AddComplaintModal';
import { DOC_API_URL, docStore } from '../../../store/DocStore';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { CiTrash } from 'react-icons/ci';

const Miasm = ({ complaint }) => {
    const [isComplaintModalOpen, setComplaintModalIsOpen] = useState(false);
    const [selectedInvestigationOptions, setSelectedInvestigationOptions] = useState([]);
    const { getCaseData, list, getMiasm, MiasmData } = docStore();
    const [submit, setSubmit] = useState(false);

    const listType = list.map((data) => data?.name);
    const { id } = useParams();
    useEffect(() => { getCaseData(complaint); getMiasm(id) },
        [getCaseData, getMiasm, submit]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post(`${DOC_API_URL}/add-miasm-patient/${id}`, {
            selectedInvestigationOptions
        })
        setSubmit(prev => !prev);
        setSelectedInvestigationOptions([]);
    }

    const deleteData = async (id, index) => {
        try {
            await axios.delete(`${DOC_API_URL}/deleteMiasm/${id}/${index}`);
            setSubmit(prev => !prev);
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <div className='flex sm:flex-row flex-col items-center sm:items-start w-full gap-10 mt-10 mb-2 pr-5'>
                <form onSubmit={handleSubmit} className='sm:w-1/2 w-full space-y-5'>
                    <h1 className='text-black text-2xl font-semibold'>Add {complaint}</h1>
                    <div className='flex flex-col gap-2 '>
                        <h1 >List of disease*</h1>
                        <MultiSelectDropdown Options={listType} selectedOptions={selectedInvestigationOptions} setSelectedOptions={setSelectedInvestigationOptions} />
                    </div>
                    <button className="bg-blue-500 block mx-auto transition-all duration-300 cursor-pointer hover:bg-blue-600 px-5 py-2 rounded-lg mt-3 text-white">Add</button>
                </form>
                <div className='sm:w-1/2 w-full'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-black text-xl font-semibold mb-4'>Recent List</h1>
                        <MdAssignmentAdd onClick={() => setComplaintModalIsOpen(true)} size={30} className='text-blue-500 cursor-pointer' />
                    </div>
                    <div className='flex flex-col items-center h-[500px] overflow-y-auto gap-1 bg-gray-200 border rounded-2xl pt-3 mt-5'>
                        {list.map((investigation, index) => (
                            <>
                                <h1 className='text-xl p-1' key={index}>{investigation?.name}</h1>
                                <hr className='border-none h-[0.5px] w-full bg-gray-300' />
                            </>
                        ))}
                    </div>
                </div>
            </div>
            <div>
                <h1 className='sm:text-xl bg-blue-400 text-white text-lg font-semibold mt-10 text-center py-2'>Miasm Added
                </h1>
                <div className='flex flex-col items-center mt-3 gap-2'>
                    {MiasmData[0]?.diseases.map((data, index) => (
                        <div className='text-xl flex items-center gap-8' key={index}>
                            <p>{index + 1}. {data}</p>
                            <CiTrash onClick={() => deleteData(MiasmData[0]?.patient, index)} className='cursor-pointer' />
                        </div>
                    ))}
                </div>
            </div>
            {isComplaintModalOpen && <AddComplaintModal onClose={() => setComplaintModalIsOpen(false)} complaint={complaint} />}
        </div>
    )
}

export default Miasm