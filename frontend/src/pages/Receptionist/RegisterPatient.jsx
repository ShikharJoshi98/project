import React from 'react'
import RecNavbar from '../../components/Receptionist/RecNavbar'
import RecSidebar from '../../components/Receptionist/RecSidebar'
import Input from '../../components/Input'
import { Hospital, Mail, Phone, User } from 'lucide-react'

const RegisterPatient = () => {
    return (
        <div>
            <RecNavbar />
            <div className="flex">
                <RecSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden'>
                    <form className='z-10 my-8 mx-auto bg-white p-8 max-w-[50vw] w-full border rounded-xl text-zinc-800 text-sm shadow-lg ' >
                        <h1 className='text-3xl font-semibold mb-5 text-center'>Register Patient </h1>
                        <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-10 w-28 mx-auto ' />
                        <div className='flex flex-col gap-4 m-auto '>
                            <div className='flex flex-col gap-2 '>
                                <h1>Name*</h1>
                                <Input icon={User} type='text' placeholder='Full Name' required />
                            </div>
                            <div className='flex flex-col gap-2 '>
                                <h1>Phone Number*</h1>
                                <Input icon={Phone} type='tel' placeholder='Phone Number' required />
                            </div>
                            <div className='flex flex-col gap-2 '>
                                <h1>Alternative Phone Number</h1>
                                <Input icon={Phone} placeholder='Alternative Number if any' type='tel' required />
                            </div>
                            <div className='flex flex-col gap-2 '>
                                <h1>Email Address</h1>
                                <Input icon={Mail} placeholder='eg. abc@example.com' type='email' required />
                            </div>
                            <div className='flex flex-col gap-2'>
                                <h1>Branch* </h1>
                                <div className='relative w-full '>
                                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                        <Hospital className="size-4 text-blue-500" />
                                    </div>
                                    <select name="branch" required id="branch" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                        <option value="" disabled selected className='font-normal' >Select Branch</option>
                                        <option value="Dombivili">Dombivili</option>
                                        <option value="Mulund">Mulund</option>
                                    </select>
                                </div>
                            </div>
                            <button className='cursor-pointer block mx-auto bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full' type='submit' >Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default RegisterPatient