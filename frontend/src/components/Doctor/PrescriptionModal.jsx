import { Calendar, Clock, Pill, Plus, Tablets, TestTube, X } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import MultiSelectDropdown from './MultiSelectInput';
import Input from '../Input';
import axios from 'axios';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { useParams } from 'react-router-dom';

const PrescriptionModal = ({ onClose }) => {
    const [isDiagnosisOpen, setDiagnosisOpen] = useState(false);
    const [diagnosis, setdiagnosis] = useState('');
    const location = useParams();
    const { Diagnosis, getDiagnosis } = docStore();
    const [submit, setsubmit] = useState(false);

    useEffect(() => {
        getDiagnosis(location.id);
    }, [getDiagnosis,submit]);

    const handleSubmit = (e) => {
        e.preventDefault();
    }

     const handleDiagnosisSubmit = async (diagnosis) => {
         console.log(diagnosis);
         if (!diagnosis) {
            console.error("Diagnosis is empty!");
            return;
        }
    try {
        const response = await axios.post(`${DOC_API_URL}/add-diagnosis/${location.id}`, { diagnosis });        
        setdiagnosis(''); 
        setsubmit(prev => !prev);
    } catch (error) {
        console.error("Error adding diagnosis:", error.response?.data || error.message);
    }
    }

    return (
        <div className="bg-black/50 fixed inset-0 flex items-center justify-center p-4 z-[9999]">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[80vw] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <X size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">
                    Add Prescription
                </h1>
                <form onSubmit={handleSubmit}>
                    <div className='sm:grid flex flex-col pl-10 gap-y-5 gap-x-2 grid-cols-2'>
                        <div>
                            <div className='flex  items-center justify-between mb-2 pr-5'>
                                <h1 className='text-black font-semibold '>Diagnosis:</h1>
                                <div className='relative'>
                                    <button onClick={() => setDiagnosisOpen(prev => !prev)} type='button' className='bg-blue-500 flex items-center gap-2 cursor-pointer  hover:bg-blue-600 rounded-md text-white p-0.5 '>Diagnosis <Plus /></button>
                                    {isDiagnosisOpen && <div className='bg-white w-56 z-60 left-10 border border-black rounded-md absolute p-2'>
                                        <div className='flex items-center flex-col gap-3'>
                                            <Input onChange={(e)=>setdiagnosis(e.target.value)} value={diagnosis} icon={Plus} placeholder='Add diagnosis' />
                                            <button type="button" onClick={()=>handleDiagnosisSubmit(diagnosis)} className='p-1 w-fit cursor-pointer bg-blue-500 text-white rounded-md'>Add</button>
                                        </div>
                                    </div>}
                                </div>
                            </div>
                            <MultiSelectDropdown Diagnosis={Diagnosis}  />
                        </div>
                        <div>
                            <h1 className='text-black font-semibold mb-2'>Medicine:</h1>
                            <Input icon={Pill} placeholder='Enter Medicine Name' />
                        </div>
                        <div>
                            <h1 className='text-black font-semibold mb-2'>Potency:</h1>
                            <div className='relative mt-2   w-full '>

                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <TestTube className="size-4 text-blue-500" />
                                </div>
                                <select
                                    name="potency" required id="potency" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                    <option value="Select Potency">Select Potency</option>
                                    <option value="3X">3X</option>
                                    <option value="6X">6X</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-black font-semibold mb-2'>Start Date:</h1>
                            <div className='relative mt-2   w-full '>

                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <Calendar className="size-4 text-blue-500" />
                                </div>
                                <select
                                    name="potency" required id="potency" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                    <option value="today">Today</option>
                                    <option value="2nd day">2nd Day</option>
                                    <option value="3rd day">3rd Day</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-black font-semibold mb-2'>Dose:</h1>
                            <div className='relative mt-2   w-full '>

                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <Tablets className="size-4 text-blue-500" />
                                </div>
                                <select
                                    name="dose" required id="dose" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                    <option value="today">Single Dose</option>
                                    <option value="3 Dose">3 dose Half-Hour Interval</option>
                                    <option value="2 Dose">2 dose Half-Hour Interval</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <h1 className='text-black font-semibold mb-2'>Duration:</h1>
                            <div className='relative mt-2   w-full '>

                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <Clock className="size-4 text-blue-500" />
                                </div>
                                <select
                                    name="duration" required id="duration" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                    <option value="select duration">Select Duration</option>
                                    <option value="7">7 Days</option>
                                    <option value="15">15 Days</option>
                                </select>
                            </div>
                        </div>
                        <div className='col-span-2'>
                            <h1 className='text-black font-semibold mb-2'>Note:</h1>
                            <textarea placeholder='Mention if any' className='py-2 pl-3 min-h-20 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'></textarea>
                        </div>
                    </div>
                    <div className='flex justify-center mt-5 '>
                        <button className='bg-blue-500 cursor-pointer text-lg hover:bg-blue-600 rounded-md text-white p-2'>Submit</button>
                    </div>

                </form>
            </div>
        </div>
    );
};

export default PrescriptionModal;
