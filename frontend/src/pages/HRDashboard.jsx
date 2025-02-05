import React from 'react'
import { useAuthStore } from '../store/authStore';
import { useNavigate } from 'react-router-dom';
import HRnavbar from '../components/HRnavbar';
import Sidebar, { SidebarItem } from '../components/Sidebar';
import { Banknote, Box, ListTodo, PillBottle, ShoppingCart, SquarePen } from 'lucide-react';

const HRDashboard = () => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  function handleLogout() {
    logout();
    navigate('/login');
  }
  return (
    <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700   relative overflow-hidden'>
      <HRnavbar />
      <Sidebar>
        <SidebarItem icon={<ShoppingCart size={20} />} text={"ITEMS STOCK"} active/>
        <SidebarItem icon={<PillBottle size={20} />} text={"MEDICINE STOCK"} />
        <SidebarItem icon={<ListTodo size={20} />} text={"TASK DETAILS"} />
        <SidebarItem icon={<SquarePen size={20} />} text={"APPLY LEAVE"} />
        <SidebarItem icon={<Box size={20} />} text={"COURIER LIST"} />
        <SidebarItem icon={<Banknote size={20} />} text={"COLLECTIONS"} />

      </Sidebar>
      </div>
  )
}

export default HRDashboard