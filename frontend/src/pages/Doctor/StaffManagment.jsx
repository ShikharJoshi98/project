import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { useStore } from '../../store/UpdateStore';
import { useNavigate } from 'react-router-dom';
import { Plus, Trash } from 'lucide-react';
import AddStaffModal from '../../components/Doctor/AddStaffModal';
import axios from 'axios';
import { DOC_API_URL } from '../../store/DocStore';

const StaffManagment = () => {
    const doccolumns = ['fullname', 'phone', 'email', 'gender', 'age', 'username'];
    const columns = ['fullname', 'phone', 'email', 'address', 'branch', 'username'];
    const [isAddStaffModalOpen, setAddStaffModalIsOpen] = useState(false);
    const [submit, setSubmit] = useState(false);
    const { getDetails, employees } = useStore();
    const navigate = useNavigate();
    useEffect(() => {
        getDetails();
    }, [getDetails,submit]);
    const doctors = employees.filter(emp => emp?.role === 'doctor');
    const receptionists = employees.filter(emp => emp?.role === 'receptionist');
    const hr = employees.filter(emp => emp?.role === 'hr');
    async function deleteCol(id) {
        try {
            const response = await axios.delete(`${DOC_API_URL}/delete-employee/${id}`)
            setSubmit(prev => !prev);           
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <Docnavbar />
            <div className='flex '>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef] w-auto py-5 px-2 md:px-5 mx-10 my-6 rounded-lg '>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Staff Managment</h1>
                        <button onClick={() => setAddStaffModalIsOpen(true)} className='py-2 px-5 place-self-center my-10 flex items-center gap-2 bg-blue-500 text-white font-semibold rounded-md cursor-pointer'>ADD EMPLOYEE <Plus /></button>
                        <h1 className='text-xl sm:text-3xl text-center font-semibold mt-16 text-[#337ab7]'>Doctor</h1>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7]  text-white">
                                    <tr >
                                        <th className="px-1 py-4 ">Name</th>
                                        <th className="px-1 py-4 ">Contact Number</th>
                                        <th className="px-1 py-4 ">Email</th>
                                        <th className="px-1 py-4 ">Gender</th>
                                        <th className="px-1 py-4 ">Age</th>
                                        <th className="px-1 py-4 ">Username</th>
                                        <th className="px-1 py-4 ">Update</th>
                                        <th className="px-1 py-4 ">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctors.map((emp, idx) => (
                                        <tr key={idx} className="hover:bg-blue-300 text-lg bg-blue-200 transition-all">
                                            {doccolumns.map((col) => (
                                                <td key={col} className={`border border-gray-300 px-1 py-4 `}>
                                                    {emp[col]}
                                                </td>

                                            ))}
                                            <td className="px-1 py-4  text-center">
                                                <button onClick={() => navigate(`/update-employee/${emp?._id}`)} className="bg-blue-500 font-semibold hover:scale-105 transition-all duration-300 cursor-pointer text-white px-2 py-1 rounded-md">Update</button>
                                            </td>
                                            <td onClick={() => { deleteCol(emp._id); setSubmit(prev=>!prev) }} className="font-semibold cursor-pointer text-red-500 px-1 py-1"><Trash /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <hr className='h-[0.5px] px-5 mt-20 border-none bg-blue-500' />
                        <h1 className='text-xl sm:text-3xl text-center font-semibold mt-10 text-[#337ab7]'>Receptionist</h1>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border  border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7] text-white">
                                    <tr >
                                        <th className="px-1 py-4">Name</th>
                                        <th className=" py-4 ">Contact Number</th>
                                        <th className="px-1 py-4 ">Email</th>
                                        <th className="px-1 py-4 ">Address</th>
                                        <th className="px-1 py-4 ">Branch</th>
                                        <th className="px-1 py-4 ">Username</th>
                                        <th className="px-1 py-4 ">Update</th>
                                        <th className="px-1 py-4 ">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {receptionists.map((emp, idx) => (
                                        <tr key={idx} className="hover:bg-blue-300 text-lg bg-blue-200 transition-all">
                                            {columns.map((col) => (
                                                <td key={col} className={`border border-gray-300 px-1 py-4 `}>
                                                    {emp[col]}
                                                </td>

                                            ))}
                                            <td className="px-1 py-4 text-center">
                                                <button onClick={() => navigate(`/update-employee/${emp?._id}`)} className="bg-blue-500 font-semibold hover:scale-105 transition-all duration-300 cursor-pointer text-white px-2 py-1 rounded-md">Update</button>
                                            </td>
                                            <td className="font-semibold cursor-pointer text-red-500 px-1 py-1"><Trash /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                        <hr className='h-[0.5px] px-5 mt-20 border-none bg-blue-500' />
                        <h1 className='text-xl sm:text-3xl text-center font-semibold mt-10 text-[#337ab7]'>HR</h1>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border  border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7] text-white">
                                    <tr >
                                    <th className="px-1 py-4">Name</th>
                                        <th className=" py-4 ">Contact Number</th>
                                        <th className="px-1 py-4 ">Email</th>
                                        <th className="px-1 py-4 ">Address</th>
                                        <th className="px-1 py-4 ">Branch</th>
                                        <th className="px-1 py-4 ">Username</th>
                                        <th className="px-1 py-4 ">Update</th>
                                        <th className="px-1 py-4 ">Delete</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {hr.map((emp, idx) => (
                                        <tr key={idx} className="hover:bg-blue-300 text-lg bg-blue-200 transition-all">
                                            {columns.map((col) => (
                                                <td key={col} className={`border border-gray-300 px-1 py-4 text-center `}>
                                                    {emp[col]}
                                                </td>

                                            ))}
                                            <td className="px-1 py-4  text-center">
                                                <button onClick={() => navigate(`/update-employee/${emp?._id}`)} className="bg-blue-500 font-semibold hover:scale-105 transition-all duration-300 cursor-pointer text-white px-2 py-1 rounded-md">Update</button>
                                            </td>
                                            <td className="font-semibold cursor-pointer text-red-500 px-1 py-1"><Trash /></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {isAddStaffModalOpen && <AddStaffModal onClose={() => setAddStaffModalIsOpen(false)} />}
        </div>
    )
}

export default StaffManagment