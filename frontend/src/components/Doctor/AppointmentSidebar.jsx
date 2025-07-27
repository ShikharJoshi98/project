import { useState } from 'react'
import Sidebar, { SidebarItem } from '../Sidebar'
import { FaMagnifyingGlass, FaMoneyBill } from 'react-icons/fa6';
import AssignTaskModal from './AssignTaskModal';
import ApproveLeaveModal from './ApproveLeaveModal';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { LuLayoutDashboard, LuNotebook, LuScrollText } from 'react-icons/lu';
import { FaHistory, FaMicrophone, FaRegImage, FaStethoscope } from 'react-icons/fa';

const AppointmentSidebar = () => {
  const [isTaskModalOpen, setTaskModalIsOpen] = useState(false);
  const [isLeaveModalOpen, setLeaveModalIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useParams();
  const path = useLocation();

  return (
    <div >
      <Sidebar>
        <SidebarItem onClick={() => navigate('/dashboard-DOCTOR')} icon={<LuLayoutDashboard size={20} />} text={"Dashboard "} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/consultation-charges`} onClick={() => navigate(`/appointment-details/${location.id}/consultation-charges`)} icon={<FaMoneyBill size={20} />} text={"Consultation Charges "} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/history-details`} onClick={() => navigate(`/appointment-details/${location.id}/history-details`)} icon={<FaHistory size={20}/>} text={"History Details"} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/present-complaints`} onClick={() => navigate(`/appointment-details/${location.id}/present-complaints`)} icon={<LuNotebook size={20}/>} text={"Present Complaints"} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/upload-case-image`} onClick={() => navigate(`upload-case-image`)} icon={<FaRegImage size={20}/>} text={"Case Paper Images"} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/investigation`} onClick={() => navigate(`/appointment-details/${location.id}/investigation`)}  icon={<FaMagnifyingGlass size={20} />} text={"Investigation"} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/upload-diagnosis-image`} onClick={() => navigate(`/appointment-details/${location.id}/upload-diagnosis-image`)} icon={<FaStethoscope size={20}/>} text={"Diagnosis Images"} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/report`} onClick={() => navigate(`/appointment-details/${location.id}/report`)} icon={<LuScrollText size={20}/>} text={"Case Paper Report"} />
        <SidebarItem active={path.pathname === `/appointment-details/${location.id}/audio-recorder`} onClick={() => navigate(`/appointment-details/${location.id}/audio-recorder`)} icon={<FaMicrophone size={20}/>} text={"Record"} />
      </Sidebar>
      {isTaskModalOpen && <AssignTaskModal onClose={() => setTaskModalIsOpen(false)} />}
      {isLeaveModalOpen && <ApproveLeaveModal onClose={() => setLeaveModalIsOpen(false)} />}
    </div>
  )
}

export default AppointmentSidebar