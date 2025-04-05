import React from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { Calendar, Calendar1Icon, Clock, User } from 'lucide-react'
import { CiMedicalClipboard } from 'react-icons/ci'
import Input from '../../components/Input'

const AddCertificate = () => {
    const handleSubmit = () => {

    }
    return (
        <div>
            <Docnavbar />
            <div className='flex '>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Certificates</h1>
                        <p className='text-red-500 mt-10 font-semibold '>Note: Fill the Details before generating any Certificate</p>
                        <div className='sm:flex grid grid-cols-2 mt-10 sm:flex-row text-white font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[6px] sm:text-[8px] md:text-sm'>
                            <button className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>MEDICAL CERTIFICATE</button>
                            <button className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>FITNESS CERTIFICATE</button>
                            <button className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>UNFIT CERTIFICATE</button>
                            <button className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>TRAVELLING CERTIFICATE</button>
                        </div>
                        <form onSubmit={handleSubmit} className='relative my-4 mx-auto w-full md:w-[60vw] h-auto p-8 rounded-xl text-zinc-800 text-sm flex flex-col gap-5' >
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
                                <h1>Diagnose (1) : </h1>
                                <Input icon={CiMedicalClipboard} type='text' required placeholder='Diagnose' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Diagnose (2) : </h1>
                                <Input icon={CiMedicalClipboard} type='text' required placeholder='Diagnose' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Diagnose (3) : </h1>
                                <Input icon={CiMedicalClipboard} type='text' required placeholder='Diagnose' />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Date</h1>
                                <Input icon={Calendar} type='Date' required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Rest From</h1>
                                <Input icon={Calendar} type='Date' required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Rest Till</h1>
                                <Input icon={Calendar} type='Date' required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Resume Date</h1>
                                <Input icon={Calendar} type='Date' required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Duration : </h1>
                                <Input icon={Calendar1Icon} type='text' required placeholder='Number of Months'/>
                            </div>
                            <button className='py-2 px-6 mt-5 rounded-lg text-lg bg-green-500 text-white font-semibold block mx-auto cursor-pointer'>Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddCertificate