import React, { useEffect, useState } from 'react'
import { BiSolidUserDetail } from "react-icons/bi";
import { LuScrollText } from "react-icons/lu";
import Sidebar, { SidebarItem } from '../Sidebar';
import { Box, CalendarDays, ListTodo, PillBottle, ShoppingCart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';
import UploadCase from '../Doctor/UploadCase';
import { useAuthStore } from '../../store/authStore';
import { docStore } from '../../store/DocStore';

const RecSidebar = () => {
    const [isUploadModalOpen, setUploadModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const path = useLocation();
    const { tasks, getTasks,addTaskToggle } = docStore();
    const { user } = useAuthStore();
    const recTasks = tasks.filter((task) => task?.username === user?.username && task?.status === "INCOMPLETE");
    
    useEffect(() => {
        getTasks(user?.username);
    }, [getTasks,addTaskToggle])

    return (
        <Sidebar>
            <SidebarItem active={path.pathname === '/dashboard-RECEPTIONIST/patient-details'} onClick={() => navigate('/dashboard-RECEPTIONIST/patient-details')} icon={<BiSolidUserDetail size={25} />} text={"Patient Details"} />
            <SidebarItem active={path.pathname === '/dashboard-RECEPTIONIST/items-stock-rec'} onClick={() => navigate('/dashboard-RECEPTIONIST/items-stock-rec')} icon={<ShoppingCart />} text={"Items Stock"} />
            <SidebarItem active={path.pathname === '/dashboard-RECEPTIONIST/medicine-stock-rec'} onClick={() => navigate('/dashboard-RECEPTIONIST/medicine-stock-rec')} icon={<PillBottle />} text={"Medicine Stock"} />
            <div className='relative'>
                <SidebarItem active={path.pathname === '/dashboard-RECEPTIONIST/task-details-rec'} onClick={() => navigate('/dashboard-RECEPTIONIST/task-details-rec')} icon={<ListTodo />} text={"Task Details"} />
                {recTasks.length > 0 && <div className='absolute w-5 h-5 flex items-center justify-center  bg-blue-400 rounded-full top-0 right-1'><span className='p-1'>{recTasks.length}</span></div>}
            </div>
            <SidebarItem active={path.pathname === '/dashboard-RECEPTIONIST/apply-leave-rec'} onClick={() => navigate('/dashboard-RECEPTIONIST/apply-leave-rec')} icon={<CalendarDays />} text={"Apply Leave"} />
            <SidebarItem active={path.pathname === `/dashboard-RECEPTIONIST/courier-list-rec/${user?.branch}`} onClick={() => navigate(`/dashboard-RECEPTIONIST/courier-list-rec/${user?.branch}`)} icon={<Box />} text={"Courier List"} />
            <SidebarItem onClick={() => setUploadModalIsOpen(true)} icon={<LuScrollText size={25} />} text={"Upload Old Case Paper"} />
            {isUploadModalOpen && <UploadCase onClose={() => setUploadModalIsOpen(false)} />}
        </Sidebar>
    )
}

export default RecSidebar