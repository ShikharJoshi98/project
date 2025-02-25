import React, { useEffect, useState } from 'react'
import Sidebar, { SidebarItem } from '../Sidebar'
import { Briefcase, CalendarDays, ClipboardPlus, FileText, History, Image, ImagesIcon, LayoutDashboard, LayoutDashboardIcon, LayoutList, ListChecks, NotebookIcon, PlusCircle, ScrollTextIcon, Stethoscope, Users } from 'lucide-react';
import { FaMagnifyingGlass, FaMoneyBill, FaUserDoctor } from 'react-icons/fa6';
import AssignTaskModal from './AssignTaskModal';
import ApproveLeaveModal from './ApproveLeaveModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AppointmentSidebar = () => {
  const [isTaskModalOpen, setTaskModalIsOpen] = useState(false);
  const [isLeaveModalOpen, setLeaveModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useParams();
    console.log("id",location.id);
   useEffect(() => {
          const savedTaskState = localStorage.getItem("modalTaskState");
          const savedLeaveState = localStorage.getItem("modalLeaveState");
  
          if (savedTaskState === "open") {
            setTaskModalIsOpen(true);
      }
      if (savedLeaveState === "open") {
        setLeaveModalIsOpen(true);
      }
          
    }, []);
     useEffect(() => {
           localStorage.setItem("modalTaskState", isTaskModalOpen ? "open" : "closed");    
           localStorage.setItem("modalLeaveState", isLeaveModalOpen ? "open" : "closed");    
  
         }, [isTaskModalOpen,isLeaveModalOpen]);
  return (
    <div >
      <Sidebar>
      <SidebarItem onClick={()=>navigate('/dashboard-DOCTOR')}  icon={<LayoutDashboardIcon size={20}/>} text={"Dashboard "} />

        <SidebarItem   icon={<FaMoneyBill size={20}/>} text={"Consultation Charges "} />
          <SidebarItem  icon={<History/>} text={"History Details"} />
          <SidebarItem  icon={<PlusCircle />} text={"Follow up "} />          
          <SidebarItem  icon={<NotebookIcon /> } text={"Present Complaints"} />
          <SidebarItem  onClick={()=>navigate(`/upload-case-image/${location.id}`)} icon={<ImagesIcon />} text={"Case Paper Images"} />
          <SidebarItem icon={<FaMagnifyingGlass size={20}/>} text={"Investigation"} />
          <SidebarItem icon={<Stethoscope />} text={"Diagnosis Images"} />
          <SidebarItem icon={<ScrollTextIcon />} text={"Case Paper Report"} />

      </Sidebar>
      {isTaskModalOpen && <AssignTaskModal onClose={() => setTaskModalIsOpen(false)} />}
      {isLeaveModalOpen && <ApproveLeaveModal onClose={() => setLeaveModalIsOpen(false)} />}
    </div>
  )
}

export default AppointmentSidebar