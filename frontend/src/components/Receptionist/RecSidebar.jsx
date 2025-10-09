import React, { useEffect, useState } from 'react'
import { BiSolidUserDetail } from "react-icons/bi";
import { LuFileText, LuScrollText } from "react-icons/lu";
import Sidebar, { SidebarItem } from '../Sidebar';
import { Box, CalendarDays, ListTodo, PillBottle, ShoppingCart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadCase from '../Doctor/UploadCase';
import { useAuthStore } from '../../store/authStore';
import { docStore } from '../../store/DocStore';
import { IoIosArrowDown } from 'react-icons/io';

const RecSidebar = () => {
    const [isUploadModalOpen, setUploadModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const path = useLocation();
    const { tasks, getTasks, addTaskToggle } = docStore();
    const { user } = useAuthStore();
    const recTasks = tasks.filter((task) => task?.username === user?.username && task?.status === "INCOMPLETE");
    const [certificateDropdown, setCertificateDropdown] = useState(false);

    useEffect(() => {
        getTasks(user?.username);
    }, [getTasks, addTaskToggle])

    return (
        <Sidebar>
            <SidebarItem active={path.pathname === '/dashboard-RECEPTIONIST/patient-details'} onClick={() => navigate('/dashboard-RECEPTIONIST/patient-details')} icon={<BiSolidUserDetail size={25} />} text={"Patient Details"} />
            <SidebarItem active={path.pathname === '/dashboard-RECEPTIONIST/items-stock-rec'} onClick={() => navigate('/dashboard-RECEPTIONIST/items-stock-rec')} icon={<ShoppingCart />} text={"Items Stock"} />
            <SidebarItem active={path.pathname === '/dashboard-RECEPTIONIST/medicine-stock-rec'} onClick={() => navigate('/dashboard-RECEPTIONIST/medicine-stock-rec')} icon={<PillBottle />} text={"Medicine Stock"} />
            <div className='relative'>
                <SidebarItem active={path.pathname === '/dashboard-RECEPTIONIST/task-details-rec'} onClick={() => navigate('/dashboard-RECEPTIONIST/task-details-rec')} icon={<ListTodo />} text={"Task Details"} />
                {recTasks.length > 0 && <div className='absolute w-5 h-5 flex items-center justify-center  bg-red-500 rounded-full top-0 right-1'><span className='p-1'>{recTasks.length}</span></div>}
            </div>
            <div>
                <div onClick={() => setCertificateDropdown(prev => !prev)} className="cursor-pointer rounded-md transition-all duration-300">
                    <SidebarItem active={path.pathname === '/dashboard-RECEPTIONIST/bill-invoice' || path.pathname === '/dashboard-RECEPTIONIST/previous-issued-invoice' || path.pathname === '/dashboard-RECEPTIONIST/add-certificate' || path.pathname === '/dashboard-RECEPTIONIST/previous-issued-certificate'} icon={<LuFileText size={20} />} text={<div className='flex items-center gap-1'>Certificates <IoIosArrowDown size={16} className={`transition-transform duration-300 ${certificateDropdown ? "rotate-180" : "rotate-0"}`} /></div>} />
                </div>
                <ul className={`ml-8 overflow-hidden transition-all duration-300 ${certificateDropdown ? "max-h-48 opacity-100" : "max-h-0 opacity-0"} `}>
                    <li onClick={() => navigate('/dashboard-RECEPTIONIST/bill-invoice')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Bill Invoice</li>
                    <li onClick={() => navigate('/dashboard-RECEPTIONIST/previous-issued-invoice')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Previous Issued Invoices</li>
                    <li onClick={() => navigate('/dashboard-RECEPTIONIST/add-certificate')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Other Certificates</li>
                    <li onClick={() => navigate('/dashboard-RECEPTIONIST/previous-issued-certificate')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Previous Issued Certificates</li>
                </ul>
            </div>
            <SidebarItem active={path.pathname === '/dashboard-RECEPTIONIST/apply-leave-rec'} onClick={() => navigate('/dashboard-RECEPTIONIST/apply-leave-rec')} icon={<CalendarDays />} text={"Apply Leave"} />
            <SidebarItem active={path.pathname === `/dashboard-RECEPTIONIST/courier-list-rec/${user?.branch}`} onClick={() => navigate(`/dashboard-RECEPTIONIST/courier-list-rec/${user?.branch}`)} icon={<Box />} text={"Courier List"} />
            <SidebarItem onClick={() => setUploadModalIsOpen(true)} icon={<LuScrollText size={25} />} text={"Upload Old Case Paper"} />
            {isUploadModalOpen && <UploadCase onClose={() => setUploadModalIsOpen(false)} />}
        </Sidebar>
    )
}

export default RecSidebar