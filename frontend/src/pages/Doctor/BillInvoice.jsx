import React from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { User } from 'lucide-react'
import { CiMedicalClipboard } from "react-icons/ci";
import { AiFillMedicineBox } from 'react-icons/ai';
import Input from '../../components/Input';
import { useNavigate } from 'react-router-dom';

const BillInvoice = () => {
    const navigate = useNavigate();

    const handleSubmit = () => {

    }
    return (
        <div>
            <Docnavbar />
            <div className='flex'>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden'>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Bill Invoice</h1>
                        <p className='text-red-500 mt-10 font-semibold '>Add Diagnoses and Medicines for Patient's For whom Invoice is to be generated.</p>
                        <form onSubmit={handleSubmit} className='relative my-4 mx-auto w-full md:w-[60vw] h-auto p-8  rounded-xl text-zinc-600   text-sm flex flex-col gap-5' >
                            <div className='flex flex-col gap-2'>
                                <h1>Patient Case Paper Number : </h1>
                                <div className='relative w-full '>
                                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                        <User className="size-4 text-blue-500" />
                                    </div>
                                    <select name="patient" required id="patient" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                        <option value="" disabled selected className='font-normal' >Select Case Paper No.</option>
                                        <option value="Patient 1">Patient 1</option>
                                        <option value="Patient 3">Patient 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Diagnose : </h1>
                                <div className='relative w-full '>
                                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                        <CiMedicalClipboard className="size-4 text-blue-500" />
                                    </div>
                                    <select name="patient" required id="patient" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                        <option value="" disabled selected className='font-normal' >Select Diagnosis</option>
                                        <option value="Patient 1">Diagnosis 1</option>
                                        <option value="Patient 3">Diagnosis 2</option>
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Medicine Name : </h1>
                                <Input icon={AiFillMedicineBox} type='text' required placeholder='Please Mention Name of the Medicine if any' />
                            </div>
                            <button className='py-2 px-4 mt-5 rounded-lg text-lg bg-blue-500 text-white font-semibold block mx-auto cursor-pointer'>Submit</button>
                        </form>
                        <p className='text-green-500 font-semibold '>Click on Next, after Completing the Submission of above details</p>
                        <button onClick={()=>navigate('/bill-info')} className='py-2 px-4 sm:mr-20 mt-5 rounded-lg text-lg bg-green-500 text-white font-semibold block mx-auto sm:place-self-end cursor-pointer'>Next</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BillInvoice