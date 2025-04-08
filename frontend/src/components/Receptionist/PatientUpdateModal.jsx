import { BriefcaseBusiness, Carrot, GraduationCap, Hospital, HouseIcon, Image, Mail, Phone, User, X } from 'lucide-react'
import { ImManWoman } from "react-icons/im";
import React from 'react'
import Input from '../Input'

const PatientUpdateModal = ({ onClose }) => {
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[80vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><X size={24} /></button>
                <form className='z-10 my-8 mx-auto bg-white p-8 max-w-[50vw] w-full border rounded-xl text-zinc-800 text-sm shadow-lg ' >
                    <h1 className='text-3xl font-semibold mb-5 text-center'>Update Patient Details</h1>
                    <hr className='bg-[#4a9acc] h-1 border-none rounded-sm mb-10 w-28 mx-auto ' />
                    <div className='flex flex-col gap-4 m-auto '>
                        <div className='flex flex-col gap-2 '>
                            <h1>Patient's Image</h1>
                            <Input icon={Image} type='file' placeholder='Upload Image' />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Username*</h1>
                            <Input icon={User} type='text' placeholder='Full Name' required />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Case Paper No.*</h1>
                            <Input icon={User} type='text' placeholder='Case Paper No.' required />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Name*</h1>
                            <Input icon={User} type='text' placeholder='Full Name' required />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Age*</h1>
                            <Input icon={User} type='text' placeholder='Age' required />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Gender*</h1>
                            <Input icon={User} type='text' placeholder='Gender' required />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Address*</h1>
                            <Input icon={HouseIcon} type='text' placeholder='Address' required />
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
                        <div className='flex flex-col gap-2 '>
                            <h1>Qualification*</h1>
                            <Input icon={GraduationCap } type='text' placeholder='Gender' required />
                        </div>
                        <div className='flex flex-col gap-2 '>
                            <h1>Occupation*</h1>
                            <Input icon={BriefcaseBusiness} type='text' placeholder='Gender' required />
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1>Dietary Preference* </h1>
                            <div className='relative w-full '>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <Carrot className="size-4 text-blue-500" />
                                </div>
                                <select name="diet" required id="diet" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                    <option value="" disabled selected className='font-normal' >Select Dietary Preference</option>
                                    <option value="Vegetarian">Vegetarian</option>
                                    <option value="Non Vegetarian">Non Vegetarian</option>
                                    <option value="Egg">Egg</option>
                                </select>
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <h1>Marital Status* </h1>
                            <div className='relative w-full '>
                                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                    <ImManWoman className="size-4 text-blue-500" />
                                </div>
                                <select name="diet" required id="diet" className='py-2 pl-9 bg-white rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 '>
                                    <option value="" disabled selected className='font-normal' >Select Marital Status</option>
                                    <option value="Single">Single</option>
                                    <option value="Married">Married</option>
                                    <option value="Divorced">Divorced</option>
                                    <option value="Widow">Widow</option>
                                </select>
                            </div>
                        </div>
                        <button className='cursor-pointer block mx-auto bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full' type='submit' >Register</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default PatientUpdateModal