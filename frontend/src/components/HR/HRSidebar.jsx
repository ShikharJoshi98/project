import React, { useEffect, useState } from 'react'
import { Banknote, Box, CalendarDays, ListTodo, PillBottle, ShoppingCart } from 'lucide-react'
import Sidebar, { SidebarItem } from '../Sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { docStore } from '../../store/DocStore'
import { LuFileText } from 'react-icons/lu'
import { IoIosArrowDown } from 'react-icons/io'

const HRSidebar = () => {
    const navigate = useNavigate();
    const { tasks, getTasks, addTaskToggle } = docStore();
    const { user } = useAuthStore();
    const hrTasks = tasks.filter((task) => task?.username === user?.username && task?.status === "INCOMPLETE");
    const path = useLocation();
    const [certificateDropdown, setCertificateDropdown] = useState(false);

    useEffect(() => {
        getTasks(user?.username);
    }, [getTasks, addTaskToggle])
    return (
        <div>
            <Sidebar>
                <SidebarItem active={path.pathname === '/dashboard-HR/items-stock'} onClick={() => navigate("/dashboard-HR/items-stock")} icon={<ShoppingCart />} text={"Items Stock"} />
                <SidebarItem active={path.pathname === '/dashboard-HR/medicine-stock'} onClick={() => navigate("/dashboard-HR/medicine-stock")} icon={<PillBottle />} text={"Medicine Stock"} />
                <div className='relative'>
                    <SidebarItem active={path.pathname === '/dashboard-HR/task-details-HR'} onClick={() => navigate("/dashboard-HR/task-details-HR")} icon={<ListTodo />} text={"Task Details"} />
                    {hrTasks.length > 0 && <div className='absolute w-5 h-5 flex items-center justify-center  bg-red-400 rounded-full top-0 right-1'><span className='p-1'>{hrTasks.length}</span></div>}
                </div>
                <div>
                    <div onClick={() => setCertificateDropdown(prev => !prev)} className="cursor-pointer rounded-md transition-all duration-300">
                        <SidebarItem active={path.pathname === '/dashboard-HR/bill-invoice' || path.pathname === '/dashboard-HR/previous-issued-invoice' || path.pathname === '/dashboard-HR/add-certificate' || path.pathname === '/dashboard-HR/previous-issued-certificate'} icon={<LuFileText size={20} />} text={<div className='flex items-center gap-1'>Certificates <IoIosArrowDown size={16} className={`transition-transform duration-300 ${certificateDropdown ? "rotate-180" : "rotate-0"}`} /></div>} />
                    </div>
                    <ul className={`ml-8 overflow-hidden transition-all duration-300 ${certificateDropdown ? "max-h-48 opacity-100" : "max-h-0 opacity-0"} `}>
                        <li onClick={() => navigate('/dashboard-HR/bill-invoice')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Bill Invoice</li>
                        <li onClick={() => navigate('/dashboard-HR/previous-issued-invoice')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Previous Issued Invoices</li>
                        <li onClick={() => navigate('/dashboard-HR/add-certificate')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Other Certificates</li>
                        <li onClick={() => navigate('/dashboard-HR/previous-issued-certificate')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Previous Issued Certificates</li>
                    </ul>
                </div>
                <SidebarItem active={path.pathname === '/dashboard-HR/apply-leave-HR'} onClick={() => navigate("/dashboard-HR/apply-leave-HR")} icon={<CalendarDays />} text={"Apply Leave"} />
                <SidebarItem active={path.pathname === `/dashboard-HR/all-courier/${user?.branch}`} onClick={() => navigate(`/dashboard-HR/all-courier/${user?.branch}`)} icon={<Box />} text={"Courier List"} />
                <SidebarItem active={path.pathname === '/dashboard-HR/collections-HR'} onClick={() => navigate("/dashboard-HR/collections-HR")} icon={<Banknote />} text={"Collections"} />
            </Sidebar>
        </div>
    )
}

export default HRSidebar