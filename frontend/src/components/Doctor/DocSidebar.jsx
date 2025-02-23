import React, { useEffect, useState } from 'react'
import Sidebar, { SidebarItem } from '../Sidebar'
import { Briefcase, CalendarDays, ClipboardPlus, FileText, LayoutList, Users } from 'lucide-react';
import { FaUserDoctor } from 'react-icons/fa6';
import AssignTaskModal from './AssignTaskModal';
import ApproveLeaveModal from './ApproveLeaveModal';
import { useNavigate } from 'react-router-dom';

const DocSidebar = () => {
  const [isTaskModalOpen, setTaskModalIsOpen] = useState(false);
  const [isLeaveModalOpen, setLeaveModalIsOpen] = useState(false);
  const navigate = useNavigate();
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
    <div>
      <Sidebar>
        <SidebarItem onClick={()=>navigate('/general-appointment')}   icon={<ClipboardPlus />} text={"APPOINTMENTS "} />
          <SidebarItem onClick={()=>setTaskModalIsOpen(true)}  icon={<LayoutList />} text={"ASSIGN TASK"} />
          <SidebarItem onClick={()=>setLeaveModalIsOpen(true)} icon={<CalendarDays />} text={"LEAVE REPORTS "} />          
          <SidebarItem  icon={<Users /> } text={"STAFF"} />
          <SidebarItem icon={<FileText />} text={"CERTIFICATES"} />
          <SidebarItem icon={<FaUserDoctor size={20}/>} text={"DOCTOR FEES"} />
          <SidebarItem icon={<Briefcase />} text={"TODAYS COLLECTIONS"} />

      </Sidebar>
      {isTaskModalOpen && <AssignTaskModal onClose={() => setTaskModalIsOpen(false)} />}
      {isLeaveModalOpen && <ApproveLeaveModal onClose={() => setLeaveModalIsOpen(false)} />}
    </div>
  )
}

export default DocSidebar