import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import DocSidebar from '../../components/Doctor/DocSidebar'
import { useStore } from '../../store/UpdateStore';
import { useNavigate } from 'react-router-dom';
import { Plus } from 'lucide-react';
import AddStaffModal from '../../components/Doctor/AddStaffModal';

const StaffManagment = () => {
    const doccolumns = ['fullname', 'phone', 'email', 'gender', 'age', 'status', 'username'];
    const [isAddStaffModalOpen, setAddStaffModalIsOpen] = useState(false);
    const { getDetails, employees } = useStore();
    const navigate = useNavigate();
    useEffect(() => {
        getDetails();
    }, [getDetails]);
    const doctors = employees.filter(emp => emp?.role === 'doctor');
    const receptionists = employees.filter(emp => emp?.role === 'receptionist');

    return (
        <div>
            <Docnavbar />
            <div className='flex '>
                <DocSidebar />
                <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
                    <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg '>
                        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Staff Managment</h1>
                        <button onClick={() => setAddStaffModalIsOpen(true)}  className='py-2 px-5 place-self-center my-10 flex items-center gap-2 bg-blue-500 text-white font-semibold rounded-md cursor-pointer'>ADD EMPLOYEE <Plus /></button>
                        <h1 className='text-xl sm:text-3xl text-center font-semibold mt-16 text-[#337ab7]'>Doctor</h1>
                        <div className="overflow-x-auto mt-10 rounded-lg">
                            <table className="min-w-full border border-gray-300 bg-white shadow-md ">
                                <thead className="bg-[#337ab7]  text-white">
                                    <tr >
                                        <th className="px-2 py-4 ">NAME</th>
                                        <th className="px-2 py-4 ">CONTACT NUMBER</th>
                                        <th className="px-4 py-4 ">EMAIL</th>
                                        <th className="px-2 py-4 ">GENDER</th>
                                        <th className="px-2 py-4 ">AGE</th>
                                        <th className="px-2 py-4 ">STATUS</th>
                                        <th className="px-2 py-4 ">USERNAME</th>
                                        <th className="px-3 py-4 ">UPDATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {doctors.map((emp, idx) => (
                                        <tr key={idx} className="hover:bg-blue-300 text-lg bg-blue-200 transition-all">
                                            {doccolumns.map((col) => (
                                                <td key={col} className={`border border-gray-300 px-4 py-4 ${col === "status" ? emp[col].toLowerCase() === "active"
                                                    ? "text-green-600" : "text-red-600" : ""}`}>
                                                    {emp[col]}
                                                </td>

                                            ))}
                                            <td className="px-2 py-4  text-center">
                                                <button onClick={() => navigate(`/update-doctor/${emp?._id}`)} className="bg-blue-500 font-semibold hover:scale-105 transition-all duration-300 cursor-pointer text-white px-2 py-1 rounded-md">Update</button>
                                            </td>
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
                                        <th className="px-2 py-4">NAME</th>
                                        <th className=" py-4 ">CONTACT NUMBER</th>
                                        <th className="px-4 py-4 ">EMAIL</th>
                                        <th className="px-2 py-4 ">ADDRESS</th>
                                        <th className="px-2 py-4 ">BRANCH</th>
                                        <th className="px-2 py-4 ">USERNAME</th>
                                        <th className="px-3 py-4 ">UPDATE</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="hover:bg-blue-300 text-lg bg-blue-200 transition">
                                        <td className="px-2 py-4  text-center">{receptionists[0]?.fullname}</td>
                                        <td className=" py-4  text-center">{receptionists[0]?.phone}</td>
                                        <td className="px-4 py-4  text-center">{receptionists[0]?.email}</td>
                                        <td className="px-2 py-4  text-center">{receptionists[0]?.address}</td>
                                        <td className="px-2 py-4  text-center">{receptionists[0]?.branch}</td>
                                        <td className="px-2 py-4  text-center">{receptionists[0]?.username}</td>
                                        <td className="px-2 py-4  text-center">
                                            <button onClick={() => navigate(`/update-receptionist/${receptionists[0]?._id}`)} className="bg-blue-500 font-semibold hover:scale-105 transition-all duration-300 cursor-pointer text-white px-2 py-1 rounded-md">Update</button>
                                        </td>
                                    </tr>

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