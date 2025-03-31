import React, { useEffect, useState } from 'react'
import Sidebar, { SidebarItem } from '../Sidebar'
import { Briefcase, CalendarDays, ClipboardPlus, FileText, LayoutDashboard, LayoutList, ListChecks, Users } from 'lucide-react';
import { FaUserDoctor } from 'react-icons/fa6';
import { IoIosArrowDown } from "react-icons/io";
import AssignTaskModal from './AssignTaskModal';
import ApproveLeaveModal from './ApproveLeaveModal';
import { useLocation, useNavigate } from 'react-router-dom';

const DocSidebar = () => {
  const [isTaskModalOpen, setTaskModalIsOpen] = useState(false);
  const [isLeaveModalOpen, setLeaveModalIsOpen] = useState(false);
  const [certificateDropdown, setCertificateDropdown] = useState(false);
  const [collectionDropdown, setCollectionDropdown] = useState(false);
  const navigate = useNavigate();
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
        <SidebarItem active={path.pathname === '/dashboard-DOCTOR'} onClick={() => navigate('/dashboard-DOCTOR')} icon={<LayoutDashboard />} text={"Dashboard"} />
        <SidebarItem onClick={() => setTaskModalIsOpen(true)} icon={<ListChecks />} text={"Assign Task"} />
        <SidebarItem onClick={() => setLeaveModalIsOpen(true)} icon={<CalendarDays />} text={"Leave Reports"} />
        <SidebarItem active={path.pathname === '/staff-update'} onClick={() => navigate('/staff-update')} icon={<Users />} text={"Staff"} />
        <div>
          <div onClick={() => setCertificateDropdown(prev => !prev)} className="cursor-pointer rounded-md transition-all duration-300">
            <SidebarItem active={path.pathname === '/bill-invoice'||path.pathname === '/previous-issued-invoice'||path.pathname === '/add-certificate'||path.pathname === '/previous-issued-certificate'} icon={<FileText />} text={<div className='flex items-center gap-1'>Certificates <IoIosArrowDown size={16} className={`transition-transform duration-300 ${certificateDropdown ? "rotate-180" : "rotate-0"}`} /></div>} />
          </div>
          <ul className={`ml-8 overflow-hidden transition-all duration-300 ${certificateDropdown ? "max-h-48 opacity-100" : "max-h-0 opacity-0"} `}>
            <li onClick={()=>navigate('/bill-invoice')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Bill Invoice</li>
            <li onClick={()=>navigate('/previous-issued-invoice')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Previous Issued Invoices</li>
            <li onClick={()=>navigate('/add-certificate')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Other Certificates</li>
            <li onClick={()=>navigate('/previous-issued-certificate')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Previous Issued Certificates</li>
          </ul>
        </div>
        <SidebarItem icon={<FaUserDoctor size={20} />} text={"Doctor Fees"} />
        <div>
          <div onClick={() => setCollectionDropdown(prev => !prev)} className="cursor-pointer rounded-md transition-all duration-300">
            <SidebarItem icon={<Briefcase />} text={<div className='flex items-center gap-1'>Todays Collections <IoIosArrowDown size={16} className={`transition-transform duration-300 ${collectionDropdown ? "rotate-180" : "rotate-0"}`} /></div>} />
          </div>
          <ul className={`ml-8 overflow-hidden transition-all duration-300 ${collectionDropdown ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} `}>
            <li className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Dombivili</li>
            <li className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Mulund</li>
          </ul>
        </div>
      </Sidebar>
      {isTaskModalOpen && <AssignTaskModal onClose={() => setTaskModalIsOpen(false)} />}
      {isLeaveModalOpen && <ApproveLeaveModal onClose={() => setLeaveModalIsOpen(false)} />}
    </div>
  )
}

export default DocSidebar