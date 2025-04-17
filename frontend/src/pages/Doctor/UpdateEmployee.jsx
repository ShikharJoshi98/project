import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import { useStore } from '../../store/UpdateStore';
import Input from '../../components/Input';
import { Calendar, Hospital, Mail, Phone, User } from 'lucide-react';
import { MdOutlineBloodtype } from 'react-icons/md';

const UpdateEmployee = () => {
    const navigate = useNavigate();
    const location = useParams();
    const { getDetails, employees, update } = useStore();
    const employee = employees.filter((emp) => emp._id === location.id);
    useEffect(() => {
        getDetails();
    }, [getDetails])
    const [formValues, setFormValues] = useState({
        fullname: employee[0].fullname || "",
        phone: employee[0].phone || "",
        email: employee[0].email || "",
        address: employee[0].address || "",
        branch: employee[0].branch || "",
        age: employee[0].age || "",
        gender: employee[0].gender || "",
        bloodGroup: employee[0].bloodGroup || "",
        department: employee[0].department || "",
        Salary: employee[0].Salary || "",
        attendance: employee[0].attendance || "",
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
        try {
            await update(location.id, formValues);
            alert("Employee details updated successfully!");
        } catch (error) {
            alert("Employee details updated successfully!");
        }
    }    

    return (
        <div className='min-h-screen flex flex-col   bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 '>
            <Docnavbar />
            <form onSubmit={handleSubmit} className='z-10 my-8 mx-auto bg-white p-8 max-w-[50vw] w-full border rounded-xl text-zinc-600 text-sm shadow-lg ' >
                <h1 onClick={() => navigate('/staff-update')} className='text-2xl cursor-pointer '><FaAngleDoubleLeft /></h1>
                <h1 className='text-3xl font-semibold mb-5 text-center'>UPDATE {employee[0]?.role.toUpperCase()} DETAILS </h1>
                <div className='flex flex-col gap-4 m-auto '>
                    <div className='flex flex-col gap-2 '>
                        <h1>Full Name</h1>
                        <Input icon={User} onChange={handleInputChange} value={formValues.fullname} name="fullname" type='text' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Email Address</h1>
                        <Input icon={Mail} onChange={handleInputChange} name="email" value={formValues.email} type='email' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Contact Number</h1>
                        <Input icon={Phone} name="phone" onChange={handleInputChange} value={formValues.phone} type='tel' />
                    </div>

                    <div className='flex flex-col gap-2 '>
                        <h1>Age</h1>
                        <Input icon={User} name="age" onChange={handleInputChange} value={formValues.age} type='number' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Gender</h1>

                        <div className='relative   w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <User className="size-4 text-blue-500" />
                            </div>
                            <select
                                onChange={handleInputChange} value={formValues.gender}
                                name="gender" id="Gender" className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
                                <option value="male" >Male</option>
                                <option value="female">Female</option>
                                <option value="transgender">Transgender</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Blood Group</h1>

                        <div className='relative   w-full '>
                            <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                                <MdOutlineBloodtype className='size-4 text-blue-500' />
                            </div>
                            <select
                                onChange={handleInputChange} value={formValues.blood}
                                name="bloodGroup" id="Blood Type" className='py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900'>
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

                        <textarea onChange={handleInputChange} value={formValues.address} name='address' className='w-full  h-10  pl-9 pr-3 py-2 font-normal  rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900 placeholder-zinc-500 transition
            duration-200'></textarea>
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Department</h1>
                        <Input icon={Hospital} onChange={handleInputChange} value={formValues.department} name="department" type='text' required />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Salary</h1>
                        <Input icon={User} onChange={handleInputChange} name="salary" value={formValues.salary} type='number' />
                    </div>
                    <div className='flex flex-col gap-2 '>
                        <h1>Attendance</h1>
                        <Input icon={Calendar} name="attendance" onChange={handleInputChange} value={formValues.attendance} type='number' />
                    </div>
                    <button className='block mx-auto cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full' type='submit' >Update</button>
                </div >
            </form>
        </div>
    )
}

export default UpdateEmployee