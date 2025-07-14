import React, { useEffect } from 'react'
import { Banknote, Box, CalendarDays, ListTodo, PillBottle, ShoppingCart } from 'lucide-react'
import Sidebar, { SidebarItem } from '../Sidebar'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuthStore } from '../../store/authStore'
import { docStore } from '../../store/DocStore'

const HRSidebar = () => {
    const navigate = useNavigate();
    const { tasks, getTasks, addTaskToggle } = docStore();
    const { user } = useAuthStore();
    const hrTasks = tasks.filter((task) => task?.username === user?.username && task?.status === "INCOMPLETE");
    const path = useLocation();

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
                    {hrTasks.length > 0 && <div className='absolute w-5 h-5 flex items-center justify-center  bg-blue-400 rounded-full top-0 right-1'><span className='p-1'>{hrTasks.length}</span></div>}
                </div>
                <SidebarItem active={path.pathname === '/dashboard-HR/apply-leave-HR'} onClick={() => navigate("/dashboard-HR/apply-leave-HR")} icon={<CalendarDays />} text={"Apply Leave"} />
                <SidebarItem active={path.pathname === `/dashboard-HR/all-courier/${user?.branch}`} onClick={() => navigate(`/dashboard-HR/all-courier/${user?.branch}`)} icon={<Box />} text={"Courier List"} />
                <SidebarItem active={path.pathname === '/dashboard-HR/collections-HR'} onClick={() => navigate("/dashboard-HR/collections-HR")} icon={<Banknote />} text={"Collections"} />
            </Sidebar>
        </div>
    )
}

export default HRSidebar