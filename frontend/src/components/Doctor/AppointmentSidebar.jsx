import React, { useEffect, useState } from 'react'
import Sidebar, { SidebarItem } from '../Sidebar'
import { Briefcase, CalendarDays, ClipboardPlus, FileText, History, Image, ImagesIcon, LayoutDashboard, LayoutDashboardIcon, LayoutList, ListChecks, Mic, NotebookIcon, PlusCircle, ScrollTextIcon, Stethoscope, Users, Video } from 'lucide-react';
import { FaMagnifyingGlass, FaMoneyBill, FaUserDoctor } from 'react-icons/fa6';
import AssignTaskModal from './AssignTaskModal';
import ApproveLeaveModal from './ApproveLeaveModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const AppointmentSidebar = () => {
  const [isTaskModalOpen, setTaskModalIsOpen] = useState(false);
  const [isLeaveModalOpen, setLeaveModalIsOpen] = useState(false);

  const navigate = useNavigate();
  const location = useParams();
  const path = useLocation();

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
        <SidebarItem onClick={() => navigate('/dashboard-DOCTOR')} icon={<LayoutDashboardIcon size={20} />} text={"Dashboard "} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/consultation-charges`} onClick={() => navigate(`/appointment-details/${location.id}/consultation-charges`)} icon={<FaMoneyBill size={20} />} text={"Consultation Charges "} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/history-details`} onClick={() => navigate(`/appointment-details/${location.id}/history-details`)} icon={<History />} text={"History Details"} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/present-complaints`} onClick={() => navigate(`/appointment-details/${location.id}/present-complaints`)} icon={<NotebookIcon />} text={"Present Complaints"} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/upload-case-image`} onClick={() => navigate(`upload-case-image`)} icon={<ImagesIcon />} text={"Case Paper Images"} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/investigation`} onClick={() => navigate(`/appointment-details/${location.id}/investigation`)}  icon={<FaMagnifyingGlass size={20} />} text={"Investigation"} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/upload-diagnosis-image`} onClick={() => navigate(`/appointment-details/${location.id}/upload-diagnosis-image`)} icon={<Stethoscope />} text={"Diagnosis Images"} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/report`} onClick={() => navigate(`/appointment-details/${location.id}/report`)} icon={<ScrollTextIcon />} text={"Case Paper Report"} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/audio-recorder`} onClick={() => navigate(`/appointment-details/${location.id}/audio-recorder`)} icon={<Mic />} text={"Record"} />
      </Sidebar>
      {isTaskModalOpen && <AssignTaskModal onClose={() => setTaskModalIsOpen(false)} />}
      {isLeaveModalOpen && <ApproveLeaveModal onClose={() => setLeaveModalIsOpen(false)} />}
    </div>
  )
}

export default AppointmentSidebar