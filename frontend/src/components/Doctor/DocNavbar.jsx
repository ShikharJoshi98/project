import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { docStore } from '../../store/DocStore';
import { CiHospital1 } from 'react-icons/ci';
import { updateDate } from '../../store/todayDate';

const Docnavbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { setAppointmentSection, appointmentSection,prescription, appointmentSubmit,appointments,getAppDetails,prescriptionSubmit } = docStore();
  const { user } = useAuthStore();   
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isAppointmentHovered, setIsAppointmentHovered] = useState(false);
  const [isRepeatMedicineHovered, setIsRepeatMedicineHovered] = useState(false);
  const [isCourierMedicineHovered, setIsCourierMedicineHovered] = useState(false);
  const todayDate = updateDate();
  useEffect(() => {
      getAppDetails();
  }, [getAppDetails, appointmentSection, appointmentSubmit,prescriptionSubmit,prescription]);
  const menuRef = useRef(null);
  const domGeneralAppointments = appointments.filter((appointment)=>appointment?.date===todayDate && appointment)
   
  useEffect(() => {
    const handleClikcOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClikcOutside);
    return () => {
      document.removeEventListener("mousedown", handleClikcOutside);
    };
  }, []);

  const handleSectionChange = (section,branch) => {
    setAppointmentSection(section);
    navigate(`/dashboard-DOCTOR/appointment-DOCTOR/${branch}`);
  };
  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className='bg-[#404858] w-full pl-20 pr-5 py-5 h-18 sticky top-0 z-50 flex items-center justify-between '>
      <div className='text-white cursor-pointer font-semibold text-base xl:text-2xl flex items-center gap-2 '>
        <CiHospital1 />
        <h1>Wings Classical Homeopathy</h1>
      </div>
      <div>
        {/* <ul className=' hidden lg:flex items-center gap-6 text-white text-sm xl:text-base'>
          <div className="relative" onMouseEnter={() => setIsAppointmentHovered(true)} onMouseLeave={() => setIsAppointmentHovered(false)}>
            {(domGeneralAppointments + mulGeneralAppointments) > 0 && (<div className='absolute w-5 h-5 left-20 xl:left-24 bottom-3 flex items-center justify-center text-sm rounded-full bg-blue-500'>{(domGeneralAppointments + mulGeneralAppointments)}</div>)}
            <li className="hover:text-gray-300 group  cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Appointments</li>
            {isAppointmentHovered && (
              <div className="absolute top-6 left-0 rounded-md border border-white bg-[#404858] w-40 flex flex-col h-auto">
                <div onClick={() => handleSectionChange("general",'Dombivali')} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                  <h1>Dombivali</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {domGeneralAppointments}
                  </span>
                </div>
                <div onClick={() => handleSectionChange("general",'Mulund')} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                  <h1>Mulund</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {mulGeneralAppointments}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => setIsRepeatMedicineHovered(true)} onMouseLeave={() => setIsRepeatMedicineHovered(false)}>
            {(domRepeatAppointments + mulRepeatAppointments) > 0 && (<div className='absolute w-5 h-5 left-28 bottom-3 flex items-center justify-center text-sm rounded-full bg-blue-500'>{domRepeatAppointments + mulRepeatAppointments}</div>)}
            <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Repeat Medicine</li>
            {isRepeatMedicineHovered && (
              <div className="absolute top-6 left-0 rounded-md border border-white bg-[#404858] w-40 flex flex-col h-auto">
                <div
                  onClick={() => handleSectionChange("repeat",'Dombivali')}
                  className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between"
                >
                  <h1>Dombivali</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {domRepeatAppointments}
                  </span>
                </div>
                <div onClick={() => handleSectionChange("repeat",'Mulund')} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                  <h1>Mulund</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {mulRepeatAppointments}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => setIsCourierMedicineHovered(true)} onMouseLeave={() => setIsCourierMedicineHovered(false)}>
            {((domCourierAppointments + mulCourierAppointments) > 0) && (<div className='absolute w-5 h-5 left-28 bottom-3 flex items-center justify-center text-sm rounded-full bg-blue-500'>{domCourierAppointments + mulCourierAppointments}</div>)}
            <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Courier Medicine</li>
            {isCourierMedicineHovered && (
              <div className="absolute top-6 left-0 rounded-md border border-white bg-[#404858] w-40 flex flex-col h-auto">
                <div
                  onClick={() => handleSectionChange("courier",'Dombivali')}
                  className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between"
                >
                  <h1>Dombivali</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {domCourierAppointments}
                  </span>
                </div>
                <div onClick={() => handleSectionChange("courier",'Mulund')} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                  <h1>Mulund</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {mulCourierAppointments}
                  </span>
                </div>
              </div>
            )}
          </div>
          <li onClick={() => navigate('/dashboard-DOCTOR/homeo-bhagwat')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Homeo Bhagwat Gita</li>
          {/* <li onClick={() => navigate('/doc-courier-mail')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Courier Mail</li> */}
          {/* <li onClick={handleLogout} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Logout</li>
        </ul> */} 
        <button onClick={() => setOpen(!isOpen)} class="lg:hidden cursor-pointer hover:text-gray-200 text-white font-semibold text-xl">☰</button>
        {isOpen && <div ref={menuRef} className='absolute lg:hidden border-white border-1 rounded-md w-40 z-10 bg-[#404858] p-4 text-white  right-5 "'>
          <p className='text-center  hover:text-gray-300 cursor-pointer'>Home</p>
          <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Dashboard</p>
          <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Balance History</p>
          <p onClick={() => handleSectionChange("general",'Dombivali')} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Medicine</p>
          <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Courier Mail</p>
          <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Login</p>
        </div>}
      </div>
    </div>
  )
}

export default Docnavbar