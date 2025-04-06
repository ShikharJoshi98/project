import React from 'react'
import { Banknote, Box, CalendarDays, ListTodo, PillBottle, ShoppingCart } from 'lucide-react'
import Sidebar, { SidebarItem } from '../Sidebar'
import { useNavigate } from 'react-router-dom'

const HRSidebar = () => {
    const navigate = useNavigate();
    return (
        <div>
            <Sidebar>
                <SidebarItem onClick={() => navigate("/items-stock")} icon={<ShoppingCart />} text={"Items Stock"} />
                <SidebarItem onClick={() => navigate("/medicine-stock")} icon={<PillBottle />} text={"Medicine Stock"} />
                <SidebarItem onClick={() => navigate("/task-details-HR")} icon={<ListTodo />} text={"Task Details"} />
                <SidebarItem onClick={() => navigate("/apply-leave-HR")} icon={<CalendarDays />} text={"Apply Leave"} />
                <SidebarItem icon={<Box />} text={"Courier List"} />
                <SidebarItem icon={<Banknote />} text={"Collections"} />
            </Sidebar>
        </div>
    )
}

export default HRSidebar