import { useEffect, useState } from 'react'
import ReactDOM from "react-dom";
import Input from '../../Input'
import axios from 'axios';
import { DOC_API_URL, docStore } from '../../../store/DocStore';
import { RxCross2 } from 'react-icons/rx';
import { CiCirclePlus } from 'react-icons/ci';
import { FaTrash } from 'react-icons/fa';

const AddComplaintModal = ({ onClose, complaint }) => {
    const [disease, setDisease] = useState('');
    const [submit, setSubmit] = useState(false);
    const { getCaseData, list } = docStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(`${DOC_API_URL}/addNewCaseMaster`, { name: disease, type: complaint });
            setSubmit(prev => !prev);
            setDisease("");
        } catch (error) {
            console.log(error.message);
        }
    }
    const deleteData = async (id) => {
        try {
            await axios.delete(`${DOC_API_URL}/deleteCaseMaster/${complaint.replace(/\s+/g, "")}/${id}`);
            setSubmit(prev => !prev);
        } catch (error) {
            console.log(error.message);
        }
    }
    useEffect(() => {
        getCaseData(complaint);
    }, [getCaseData, submit]);

    return ReactDOM.createPortal(
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                ><RxCross2 size={24} /></button>
                <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">Add New - {complaint}</h1>
                <div className='flex sm:flex-row flex-col items-center sm:items-start w-full gap-10 mt-10 mb-2 pr-5'>
                    <form onSubmit={handleSubmit} className='sm:w-1/2 w-full space-y-5'>
                        <div className='flex flex-col gap-2'>
                            <h1>Add Disease Name</h1>
                            <Input icon={CiCirclePlus} type='text' value={disease} onChange={(e) => setDisease(e.target.value)} required placeholder='Enter a disease name' />
                        </div>
                        <button className="bg-blue-500 block mx-auto transition-all duration-300 cursor-pointer hover:bg-blue-600 px-5 py-2 rounded-lg mt-3 text-white">Add</button>
                    </form>
                    <div className='sm:w-1/2 w-full'>
                        <h1 className='text-black text-xl font-semibold mb-4'>Recent List</h1>
                        <div className='flex flex-col h-[500px] overflow-y-auto gap-1 bg-gray-200 border rounded-2xl pt-3 mt-5'>
                            {list?.map((investigation, index) => (
                                <div key={index} >
                                    <div className='flex items-center justify-between px-10'>
                                        <h1 className='text-xl cursor-pointer p-1'>{investigation?.name}</h1>
                                        <FaTrash className='text-red-500' onClick={() => deleteData(investigation?._id)} />
                                    </div>
                                    <hr className='border-none h-[0.5px] w-full bg-gray-300' />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default AddComplaintModal