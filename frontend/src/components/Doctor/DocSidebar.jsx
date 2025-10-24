import { useEffect, useState } from 'react'
import Sidebar, { SidebarItem } from '../Sidebar'
import { FaUserDoctor } from 'react-icons/fa6';
import { IoIosArrowDown } from "react-icons/io";
import AssignTaskModal from './AssignTaskModal';
import ApproveLeaveModal from './ApproveLeaveModal';
import { useLocation, useNavigate } from 'react-router-dom';
import { LuBriefcase, LuCalendarDays, LuFileText, LuHospital, LuLayoutDashboard, LuListChecks } from 'react-icons/lu';
import { FaUsers } from 'react-icons/fa';
import { docStore } from '../../store/DocStore';

const DocSidebar = () => {
  const { leaves, LeaveDetails, approveLeaveToggle } = docStore();
  const [isTaskModalOpen, setTaskModalIsOpen] = useState(false);
  const [isLeaveModalOpen, setLeaveModalIsOpen] = useState(false);
  const [certificateDropdown, setCertificateDropdown] = useState(false);
  const [collectionDropdown, setCollectionDropdown] = useState(false);
  const navigate = useNavigate();
  const path = useLocation();

  useEffect(() => {
    LeaveDetails();
  }, [approveLeaveToggle]);

  const pendingLeaves = leaves?.filter((leave, _) => leave?.status === 'PENDING');

  return (
    <div >
      <Sidebar>
        <SidebarItem active={path.pathname === '/dashboard-DOCTOR'} onClick={() => navigate('/dashboard-DOCTOR')} icon={<LuLayoutDashboard size={20} />} text={"Dashboard"} />
        <SidebarItem onClick={() => setTaskModalIsOpen(true)} icon={<LuListChecks size={20} />} text={"Assign Task"} />
        <div className='relative'>
          <SidebarItem onClick={() => setLeaveModalIsOpen(true)} icon={<LuCalendarDays size={20} />} text={"Leave Reports"} />
          {pendingLeaves.length > 0 && <div className='absolute w-3 h-3 flex items-center justify-center  bg-red-400 rounded-full top-2 right-2'></div>}
        </div>
        <SidebarItem active={path.pathname === '/dashboard-DOCTOR/staff-update'} onClick={() => navigate('/dashboard-DOCTOR/staff-update')} icon={<FaUsers size={20} />} text={"Staff"} />
        <div>
          <div onClick={() => setCertificateDropdown(prev => !prev)} className="cursor-pointer rounded-md transition-all duration-300">
            <SidebarItem active={path.pathname === '/dashboard-DOCTOR/bill-invoice' || path.pathname === '/dashboard-DOCTOR/previous-issued-invoice' || path.pathname === '/dashboard-DOCTOR/add-certificate' || path.pathname === '/dashboard-DOCTOR/previous-issued-certificate'} icon={<LuFileText size={20} />} text={<div className='flex items-center gap-1'>Certificates <IoIosArrowDown size={16} className={`transition-transform duration-300 ${certificateDropdown ? "rotate-180" : "rotate-0"}`} /></div>} />
          </div>
          <ul className={`ml-8 overflow-hidden transition-all duration-300 ${certificateDropdown ? "max-h-48 opacity-100" : "max-h-0 opacity-0"} `}>
            <li onClick={() => navigate('/dashboard-DOCTOR/bill-invoice')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Bill Invoice</li>
            <li onClick={() => navigate('/dashboard-DOCTOR/previous-issued-invoice')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Previous Issued Invoices</li>
            <li onClick={() => navigate('/dashboard-DOCTOR/add-certificate')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Other Certificates</li>
            <li onClick={() => navigate('/dashboard-DOCTOR/previous-issued-certificate')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Previous Issued Certificates</li>
          </ul>
        </div>
        <SidebarItem onClick={() => navigate('/dashboard-DOCTOR/pricing')} icon={<FaUserDoctor size={20} />} text={"Doctor Fees"} />
        <div>
          <div onClick={() => setCollectionDropdown(prev => !prev)} className="cursor-pointer rounded-md transition-all duration-300">
            <SidebarItem active={path.pathname === '/dashboard-DOCTOR/collection/Dombivili' || path.pathname === '/collection/Mulund'} icon={<LuBriefcase size={20} />} text={<div className='flex items-center gap-1'>Todays Collections <IoIosArrowDown size={16} className={`transition-transform duration-300 ${collectionDropdown ? "rotate-180" : "rotate-0"}`} /></div>} />
          </div>
          <ul className={`ml-8 overflow-hidden transition-all duration-300 ${collectionDropdown ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} `}>
            <li onClick={() => navigate('/dashboard-DOCTOR/collection/Dombivali')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Dombivili</li>
            <li onClick={() => navigate('/dashboard-DOCTOR/collection/Mulund')} className="py-1 px-1 cursor-pointer hover:bg-gray-400/30 hover:text-white rounded-md transition">Mulund</li>
          </ul>
        </div>
        <SidebarItem onClick={() => navigate('/dashboard-DOCTOR/clinic-details')} icon={<LuHospital size={20} />} text={"Clinic Details"} />
      </Sidebar>
      {isTaskModalOpen && <AssignTaskModal onClose={() => setTaskModalIsOpen(false)} />}
      {isLeaveModalOpen && <ApproveLeaveModal onClose={() => setLeaveModalIsOpen(false)} />}
    </div>
  )
}

export default DocSidebar