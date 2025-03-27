import React, { useEffect, useState } from 'react'
import Sidebar, { SidebarItem } from '../Sidebar'
import { Briefcase, CalendarDays, ClipboardPlus, FileText, LayoutDashboard, LayoutList, ListChecks, Users } from 'lucide-react';
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
  }, [isTaskModalOpen, isLeaveModalOpen]);
  return (
    <div >
      <Sidebar>
        <SidebarItem onClick={() => navigate('/dashboard-DOCTOR')} icon={<LayoutDashboard />} text={"Dashboard "} />
        <SidebarItem onClick={() => setTaskModalIsOpen(true)} icon={<ListChecks />} text={"Assign Task"} />
        <SidebarItem onClick={() => setLeaveModalIsOpen(true)} icon={<CalendarDays />} text={"Leave Reports "} />
        <SidebarItem onClick={() => navigate('/staff-update')} icon={<Users />} text={"Staff"} />
        <SidebarItem icon={<FileText />} text={"Certificates"} />
        <SidebarItem icon={<FaUserDoctor size={20} />} text={"Doctor Fees"} />
        <SidebarItem icon={<Briefcase />} text={"Todays Collections"} />

      </Sidebar>
      {isTaskModalOpen && <AssignTaskModal onClose={() => setTaskModalIsOpen(false)} />}
      {isLeaveModalOpen && <ApproveLeaveModal onClose={() => setLeaveModalIsOpen(false)} />}
    </div>
  )
}

export default DocSidebar