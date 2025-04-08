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
            <SidebarItem icon={<ShoppingCart />} text={"Items Stock"} />
            <SidebarItem icon={<PillBottle />} text={"Medicine Stock"} />
            <SidebarItem icon={<ListTodo />} text={"Task Details"} />
            <SidebarItem icon={<CalendarDays />} text={"Apply Leave"} />
            <SidebarItem icon={<Box />} text={"Courier List"} />
            <SidebarItem icon={<LuScrollText size={25} />} text={"Upload Old Case Paper"} />
        </Sidebar>
    )
}

export default RecSidebar