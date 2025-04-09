import React from 'react'
import { BiSolidUserDetail } from "react-icons/bi";
import { LuScrollText } from "react-icons/lu";
import Sidebar, { SidebarItem } from '../Sidebar';
import { Box, CalendarDays, ListTodo, PillBottle, ShoppingCart } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const RecSidebar = () => {
    const navigate = useNavigate();
    const path = useLocation();

    return (
        <Sidebar>
            <SidebarItem active={path.pathname === '/patient-details'} onClick={()=>navigate('/patient-details')} icon={<BiSolidUserDetail size={25} />} text={"Patient Details"} />
            <SidebarItem active={path.pathname === '/items-stock-rec'} onClick={()=>navigate('/items-stock-rec')} icon={<ShoppingCart />} text={"Items Stock"} />
            <SidebarItem active={path.pathname === '/medicine-stock-rec'} onClick={()=>navigate('/medicine-stock-rec')} icon={<PillBottle />} text={"Medicine Stock"} />
            <SidebarItem active={path.pathname === '/task-details-rec'} onClick={()=>navigate('/task-details-rec')} icon={<ListTodo />} text={"Task Details"} />
            <SidebarItem active={path.pathname === '/apply-leave-rec'} onClick={()=>navigate('/apply-leave-rec')} icon={<CalendarDays />} text={"Apply Leave"} />
            <SidebarItem icon={<Box />} text={"Courier List"} />
            <SidebarItem icon={<LuScrollText size={25} />} text={"Upload Old Case Paper"} />
        </Sidebar>
    )
}

export default RecSidebar