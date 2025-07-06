import { Hospital } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { docStore } from '../../store/DocStore';

const Docnavbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { setAppointmentSection, appointmentSection,prescription, appointmentSubmit, getAppdetails, appointments,prescriptionSubmit } = docStore();
  const [currentDate, setCurrentDate] = useState('');
  const { user } = useAuthStore();
   useEffect(() => {
      getAppdetails(appointmentSection);
  }, [getAppdetails, appointmentSection, appointmentSubmit,prescriptionSubmit,prescription]);
  const domGeneralAppointments = appointments.filter((appointment) => (appointment?.date === currentDate && appointment?.appointmentType === 'general' && appointment?.PatientCase?.branch === 'Dombivali' && appointment?.complete_appointment_flag===false && appointment?.medicine_issued_flag===false && appointment?.Doctor?.fullname===user?.fullname));
  const mulGeneralAppointments = appointments.filter((appointment) => (appointment?.date === currentDate && appointment?.appointmentType === 'general' && appointment?.PatientCase?.branch === 'Mulund' && appointment?.complete_appointment_flag===false && appointment?.medicine_issued_flag===false && appointment?.Doctor?.fullname===user?.fullname));
  const domRepeatAppointments = appointments.filter((appointment) => (appointment?.date === currentDate && appointment?.appointmentType === 'repeat' && appointment?.PatientCase?.branch === 'Dombivali' && appointment?.complete_appointment_flag===false && appointment?.medicine_issued_flag===false && appointment?.Doctor?.fullname===user?.fullname));
  const mulRepeatAppointments = appointments.filter((appointment) => (appointment?.date === currentDate && appointment?.appointmentType === 'repeat' && appointment?.PatientCase?.branch === 'Mulund' && appointment?.complete_appointment_flag===false && appointment?.medicine_issued_flag===false && appointment?.Doctor?.fullname===user?.fullname));
  const domCourierAppointments = appointments.filter((appointment) => (appointment?.date === currentDate && appointment?.appointmentType === 'courier' && appointment?.PatientCase?.branch === 'Dombivali' && appointment?.complete_appointment_flag===false && appointment?.medicine_issued_flag===false && appointment?.Doctor?.fullname===user?.fullname));
  const mulCourierAppointments = appointments.filter((appointment) => (appointment?.date === currentDate && appointment?.appointmentType === 'courier' && appointment?.PatientCase?.branch === 'Mulund' && appointment?.complete_appointment_flag===false && appointment?.medicine_issued_flag===false && appointment?.Doctor?.fullname===user?.fullname));
  const menuRef = useRef(null);
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isAppointmentHovered, setIsAppointmentHovered] = useState(false);
  const [isRepeatMedicineHovered, setIsRepeatMedicineHovered] = useState(false);
  const [isCourierMedicineHovered, setIsCourierMedicineHovered] = useState(false);
 
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

  useEffect(() => {
    const updateDate = () => {
      const today = new Date();
      const day = String(today.getDate()).padStart(2, '0');
      const month = String(today.getMonth() + 1).padStart(2, '0');
      const year = today.getFullYear();
      const formattedDate = `${day}-${month}-${year}`;
      setCurrentDate(formattedDate);
    };
    updateDate();
  }, []);

  const handleSectionChange = (section,branch) => {
    setAppointmentSection(section);
    navigate(`/appointment-DOCTOR/${branch}`);
  };
  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className='bg-[#404858] w-full pl-20 pr-5 py-5 h-18 sticky top-0 z-50 flex items-center justify-between '>
      <div className='text-white cursor-pointer font-semibold text-base xl:text-2xl flex items-center gap-2 '>
        <Hospital />
        <h1 >Wings Classical Homeopathy</h1>
      </div>
      <div>
        <ul className=' hidden lg:flex items-center gap-6 text-white text-sm xl:text-base'>
          <div className="relative" onMouseEnter={() => setIsAppointmentHovered(true)} onMouseLeave={() => setIsAppointmentHovered(false)}>
            {(domGeneralAppointments.length + mulGeneralAppointments.length) > 0 && (<div className='absolute w-5 h-5 left-20 xl:left-24 bottom-3 flex items-center justify-center text-sm rounded-full bg-blue-500'>{(domGeneralAppointments.length + mulGeneralAppointments.length)}</div>)}
            <li className="hover:text-gray-300 group  cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Appointments</li>
            {isAppointmentHovered && (
              <div className="absolute top-6 left-0 rounded-md border border-white bg-[#404858] w-40 flex flex-col h-auto">
                <div onClick={() => handleSectionChange("general",'Dombivali')} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                  <h1>Dombivali</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {domGeneralAppointments.length}
                  </span>
                </div>
                <div onClick={() => handleSectionChange("general",'Mulund')} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                  <h1>Mulund</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {mulGeneralAppointments.length}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => setIsRepeatMedicineHovered(true)} onMouseLeave={() => setIsRepeatMedicineHovered(false)}>
            {(domRepeatAppointments.length + mulRepeatAppointments.length) > 0 && (<div className='absolute w-5 h-5 left-28 bottom-3 flex items-center justify-center text-sm rounded-full bg-blue-500'>{domRepeatAppointments.length + mulRepeatAppointments.length}</div>)}
            <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Repeat Medicine</li>
            {isRepeatMedicineHovered && (
              <div className="absolute top-6 left-0 rounded-md border border-white bg-[#404858] w-40 flex flex-col h-auto">
                <div
                  onClick={() => handleSectionChange("repeat",'Dombivali')}
                  className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between"
                >
                  <h1>Dombivali</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {domRepeatAppointments.length}
                  </span>
                </div>
                <div onClick={() => handleSectionChange("repeat",'Mulund')} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                  <h1>Mulund</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {mulRepeatAppointments.length}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => setIsCourierMedicineHovered(true)} onMouseLeave={() => setIsCourierMedicineHovered(false)}>
            {((domCourierAppointments.length + mulCourierAppointments.length) > 0) && (<div className='absolute w-5 h-5 left-28 bottom-3 flex items-center justify-center text-sm rounded-full bg-blue-500'>{domCourierAppointments.length + mulCourierAppointments.length}</div>)}
            <li className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Courier Medicine</li>
            {isCourierMedicineHovered && (
              <div className="absolute top-6 left-0 rounded-md border border-white bg-[#404858] w-40 flex flex-col h-auto">
                <div
                  onClick={() => handleSectionChange("courier",'Dombivali')}
                  className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between"
                >
                  <h1>Dombivali</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {domCourierAppointments.length}
                  </span>
                </div>
                <div onClick={() => handleSectionChange("courier",'Mulund')} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                  <h1>Mulund</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {mulCourierAppointments.length}
                  </span>
                </div>
              </div>
            )}
          </div>
          <li onClick={() => navigate('/homeo-bhagwat')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Homeo Bhagwat Gita</li>
          {/* <li onClick={() => navigate('/doc-courier-mail')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Courier Mail</li> */}
          <li onClick={handleLogout} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Logout</li>
        </ul>
        <button onClick={() => setOpen(!isOpen)} class="lg:hidden cursor-pointer hover:text-gray-200 text-white font-semibold text-xl">☰</button>
        {isOpen && <div ref={menuRef} className='absolute lg:hidden border-white border-1 rounded-md w-40 z-10 bg-[#404858] p-4 text-white  right-5 "'>
          <p className='text-center  hover:text-gray-300 cursor-pointer'>Home</p>
          <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Dashboard</p>
          <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Balance History</p>
          <p onClick={() => handleSectionChange("Dombivali")} className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Medicine</p>
          <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Courier Mail</p>
          <p className='text-center pt-4 hover:text-gray-300 cursor-pointer'>Login</p>
        </div>}
      </div>
    </div>
  )
}

export default Docnavbar