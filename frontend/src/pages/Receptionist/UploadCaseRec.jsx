import React from 'react'
import RecSidebar from '../../components/Receptionist/RecSidebar'
import { Image, User } from 'lucide-react'
import RecNavbar from '../../components/Receptionist/RecNavbar'
import Input from '../../components/Input'

const UploadCaseRec = () => {
    
    return (
        <div>
            <RecNavbar />
            <div className="flex">
                <RecSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Upload Old Case Paper Images</h1>
                        <div className='flex flex-col gap-2 mt-10'>
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
                        <div className="flex flex-col mt-10 gap-2">
                            <h1 className='text-lg'>Old Case Paper Images</h1>
                            <Input icon={Image} type="file" name="diagnoseImage" required />
                            <div className="w-full flex items-center justify-center">
                                <button className="cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full" type="submit">Upload</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadCaseRec