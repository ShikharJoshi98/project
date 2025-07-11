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
        <SidebarItem active={path.pathname === `/consulation-charges/${location.id}`} onClick={() => navigate(`/consultation-charges/${location.id}`)} icon={<FaMoneyBill size={20} />} text={"Consultation Charges "} />
        <SidebarItem active={path.pathname === `/history-details/${location.id}`} onClick={() => navigate(`/history-details/${location.id}`)} icon={<History />} text={"History Details"} />
        <SidebarItem active={path.pathname === `/present-complaints/${location.id}`} onClick={() => navigate(`/present-complaints/${location.id}`)} icon={<NotebookIcon />} text={"Present Complaints"} />
        <SidebarItem active={path.pathname === `/upload-case-image/${location.id}`} onClick={() => navigate(`/upload-case-image/${location.id}`)} icon={<ImagesIcon />} text={"Case Paper Images"} />
        <SidebarItem active={path.pathname === `/investigation/${location.id}`} onClick={() => navigate(`/investigation/${location.id}`)}  icon={<FaMagnifyingGlass size={20} />} text={"Investigation"} />
        <SidebarItem active={path.pathname === `/upload-diagnosis-image/${location.id}`} onClick={() => navigate(`/upload-diagnosis-image/${location.id}`)} icon={<Stethoscope />} text={"Diagnosis Images"} />
        <SidebarItem active={path.pathname === `/report/${location.id}`} onClick={() => navigate(`/report/${location.id}`)} icon={<ScrollTextIcon />} text={"Case Paper Report"} />
        <SidebarItem active={path.pathname === `/audio-recorder/${location.id}`} onClick={() => navigate(`/audio-recorder/${location.id}`)} icon={<Mic />} text={"Record"} />
      </Sidebar>
      {isTaskModalOpen && <AssignTaskModal onClose={() => setTaskModalIsOpen(false)} />}
      {isLeaveModalOpen && <ApproveLeaveModal onClose={() => setLeaveModalIsOpen(false)} />}
    </div>
  )
}

export default AppointmentSidebar