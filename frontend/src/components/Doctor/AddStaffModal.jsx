import { BriefcaseMedical, Calendar, Hospital, Lock, Mail, MapPin, Phone, User, User2, X } from 'lucide-react'
import React, { useState } from 'react'
import Input from '../Input'
import { MdOutlineBloodtype } from 'react-icons/md'
import axios from 'axios'
import { HR_API_URL } from '../../store/UpdateStore'
import { FaMoneyBill } from 'react-icons/fa6'

const AddStaffModal = ({ onClose }) => {
    const [formValues, setFormValues] = useState({
        fullname: "",
        username: "",
        email: "",
        phone: "",
        age:"",
        gender:"",
        bloodGroup:"",
        address:"",
        department:"",
        Salary:"",
        attendance:0,
        password:"",
        branch:"",
        role:""
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormValues((prevValues) => ({
          ...prevValues,
          [name]: value,
        }));
      };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post(`${HR_API_URL}/register`, formValues);
        alert("Employee registered");
    }
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[70vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1">
                    <X size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl text-center font-semibold">Add Employee</h1>
                <form onSubmit={handleSubmit} className='relative my-8 bg-white mx-auto md:max-w-[600px] w-full md:w-[40vw] h-auto p-8 border rounded-xl text-zinc-600 shadow-lg  text-sm flex flex-col gap-4' >
                    <div className='flex flex-col gap-2'>
                        <h1 >Full Name : </h1>
                        <Input icon={User} type='text' required placeholder='Full Name*' name="fullname" onChange={handleInputChange} value={formValues.fullname} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 >Phone Number : </h1>
                        <Input icon={Phone} type='text' required placeholder='Phone*' name="phone" onChange={handleInputChange} value={formValues.phone} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1 >Age : </h1>
                        <Input icon={User2} type='number' required placeholder='Age' name="age" onChange={handleInputChange} value={formValues.age} />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Email : </h1>
                        <Input icon={Mail} type='email' required placeholder='Email*' onChange={handleInputChange} value={formValues.email} name="email"/>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Username : </h1>
                        <Input icon={User} type='text' required placeholder='Username*' onChange={handleInputChange} value={formValues.username} name="username" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Password : </h1>
                        <Input icon={Lock} type='text' required placeholder='Password*' onChange={handleInputChange} value={formValues.password} name="password" />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Gender : </h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <User className="size-4 text-blue-500" />
                            </div>
                            <select name="gender" required id="Gender" onChange={handleInputChange} value={formValues.gender} className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                <option value="" disabled selected className='font-normal' >Select Gender</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Transgender">Transgender</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Blood Group</h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <MdOutlineBloodtype className='size-4 text-blue-500' />
                            </div>
                            <select name="bloodGroup" required id="Blood Type" onChange={handleInputChange} value={formValues.bloodGroup} className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                <option value="o+ve" >O+ve</option>
                                <option value="a+">A+</option>
                                <option value="b+">B+</option>
                                <option value="ab+">AB+</option>
                                <option value="o+">O+</option>
                                <option value="a-">A-</option>
                                <option value="b-">B-</option>
                                <option value="ab-">AB-</option>
                                <option value="o-">O-</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Address</h1>
                        <textarea placeholder='Add Address' onChange={handleInputChange} value={formValues.address} name="address" className='w-full  h-10  pl-3 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition
            duration-200'></textarea>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Department</h1>
                        <Input placeholder='Add Department' onChange={handleInputChange} value={formValues.department} name="department" icon={Hospital} type='text' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Salary</h1>
                        <Input placeholder='Salary' icon={FaMoneyBill} onChange={handleInputChange} value={formValues.Salary} name="Salary"  type='number'   />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Attendance</h1>
                        <Input placeholder='Attendance' icon={Calendar} onChange={handleInputChange} value={formValues.attendance} name="attendance"  type='number'   />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Branch : </h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <MapPin className="size-4 text-blue-500" />
                            </div>
                            <select name="branch" required id="Branch" onChange={handleInputChange} value={formValues.branch} className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                <option value="" disabled selected>Select Branch</option>
                                <option value="Dombivali">Dombivali</option>
                                <option value="Mulund">Mulund</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h1>Role : </h1>
                        <div className='relative w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <BriefcaseMedical className="size-4 text-blue-500" />
                            </div>
                            <select name="role" required id="role" onChange={handleInputChange} value={formValues.role} className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                <option value="" disabled selected>Select Role</option>
                                <option value="doctor">Doctor</option>
                                <option value="receptionist">Receptionist</option>
                                <option value="hr">HR</option>
                            </select>
                        </div>
                    </div>
                    <button className='py-2 px-4 rounded-lg text-lg bg-blue-500 text-white font-semibold block mx-auto cursor-pointer'>Add</button>
                </form>
            </div>
        </div>
    )
}

export default AddStaffModal