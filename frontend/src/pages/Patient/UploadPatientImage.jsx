import React from 'react'
import PatientNavbar from '../../components/Patient/PatientNavbar'
import Input from '../../components/Input'
import { Image } from 'lucide-react'

const UploadPatientImage = () => {
    return (
        <div>
            <PatientNavbar />
            <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden'>
                <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg'>
                    <h1 className='p-4 text-center mb-10 font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Upload Images</h1>
                    <div className='max-w-[40vw] mx-auto'>
                        <Input icon={Image} type='file' placeholder='Upload Image' />
                        <button className='cursor-pointer block mx-auto bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full' type='submit' >Upload</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default UploadPatientImage