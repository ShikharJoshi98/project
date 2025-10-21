import { useEffect, useRef, useState } from 'react'
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import { docStore } from '../../store/DocStore';
import { CiHospital1 } from 'react-icons/ci';
import { recStore } from '../../store/RecStore';

const Docnavbar = () => {
  const [isOpen, setOpen] = useState(false);
  const { setAppointmentSection, appointmentSection, prescription, appointmentSubmit, getAppointmentCount, domGeneral, mulGeneral, domRepeat, mulRepeat, domCourier, mulCourier, prescriptionSubmit } = docStore();
  const { isShift, getShift } = recStore();
  const { user } = useAuthStore();
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const [isAppointmentHovered, setIsAppointmentHovered] = useState(false);
  const [isRepeatMedicineHovered, setIsRepeatMedicineHovered] = useState(false);
  const [isCourierMedicineHovered, setIsCourierMedicineHovered] = useState(false);

  useEffect(() => {
    if (!user?._id) return;
    getShift(user.role, user._id);
  }, [user?._id]);

  useEffect(() => {
    if (!user?._id || !isShift?.shift) return;
    getAppointmentCount(isShift.shift, user._id);
  }, [isShift?.shift, appointmentSubmit, prescriptionSubmit]);

  const menuRef = useRef(null);
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

  const handleSectionChange = (section, branch) => {
    setAppointmentSection(section);
    navigate(`/dashboard-DOCTOR/appointment-DOCTOR/${branch}`);
  };
  const handleLogout = () => {
    logout();
    navigate('/login');
  }

  return (
    <div className='bg-[#404858] w-full pl-20 pr-5 py-5 h-18 sticky top-0 z-50 flex items-center justify-between'>
      <div className='text-white cursor-pointer font-semibold text-sm md:text-xl flex items-center gap-2'>
        <CiHospital1 size={28} />
        <h1>Wings Classical Homeopathy</h1>
      </div>
      <div>
        <ul className='hidden lg:flex items-center gap-6 text-gray-200 text-[15px]'>
          <div className="relative" onMouseEnter={() => setIsAppointmentHovered(true)} onMouseLeave={() => setIsAppointmentHovered(false)}>
            {(domGeneral + mulGeneral) > 0 && (<div className='absolute w-5 h-5 left-22 bottom-3 flex items-center justify-center text-sm rounded-full bg-blue-500'>{(domGeneral + mulGeneral)}</div>)}
            <li className="hover:text-white cursor-pointer">Appointments</li>
            {isAppointmentHovered && (
              <div className="absolute top-6 left-0 rounded-md border border-white bg-[#404858] w-40 flex flex-col h-auto">
                <div onClick={() => handleSectionChange("general", 'Dombivali')} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                  <h1>Dombivali</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {domGeneral}
                  </span>
                </div>
                <div onClick={() => handleSectionChange("general", 'Mulund')} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                  <h1>Mulund</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {mulGeneral}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => setIsRepeatMedicineHovered(true)} onMouseLeave={() => setIsRepeatMedicineHovered(false)}>
            {(domRepeat + mulRepeat) > 0 && (<div className='absolute w-5 h-5 left-26 bottom-3 flex items-center justify-center text-sm rounded-full bg-blue-500'>{domRepeat + mulRepeat}</div>)}
            <li className="hover:text-white cursor-pointer">Repeat Medicine</li>
            {isRepeatMedicineHovered && (
              <div className="absolute top-6 left-0 rounded-md border border-white bg-[#404858] w-40 flex flex-col h-auto">
                <div
                  onClick={() => handleSectionChange("repeat", 'Dombivali')}
                  className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between"
                >
                  <h1>Dombivali</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {domRepeat}
                  </span>
                </div>
                <div onClick={() => handleSectionChange("repeat", 'Mulund')} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                  <h1>Mulund</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {mulRepeat}
                  </span>
                </div>
              </div>
            )}
          </div>
          <div className="relative" onMouseEnter={() => setIsCourierMedicineHovered(true)} onMouseLeave={() => setIsCourierMedicineHovered(false)}>
            {((domCourier + mulCourier) > 0) && (<div className='absolute w-5 h-5 left-26 bottom-3 flex items-center justify-center text-sm rounded-full bg-blue-500'>{domCourier + mulCourier}</div>)}
            <li className='hover:text-white cursor-pointer'>Courier Medicine</li>
            {isCourierMedicineHovered && (
              <div className="absolute top-6 left-0 rounded-md border border-white bg-[#404858] w-40 flex flex-col h-auto">
                <div
                  onClick={() => handleSectionChange("courier", 'Dombivali')}
                  className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between"
                >
                  <h1>Dombivali</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {domCourier}
                  </span>
                </div>
                <div onClick={() => handleSectionChange("courier", 'Mulund')} className="flex cursor-pointer hover:bg-gray-200/30 py-3 px-5 items-center justify-between">
                  <h1>Mulund</h1>
                  <span className="bg-blue-400 w-7 h-7 flex items-center justify-center rounded-full text-white font-semibold">
                    {mulCourier}
                  </span>
                </div>
              </div>
            )}
          </div>
          <li onClick={() => navigate('/dashboard-DOCTOR/homeo-bhagwat')} className="hover:text-white cursor-pointer">Homeo Bhagwat Gita</li>
          {/* <li onClick={() => navigate('/doc-courier-mail')} className="hover:text-gray-300 cursor-pointer relative after:content-[''] after:absolute after:left-1/2 after:bottom-[-2px] after:h-[2px] after:w-0 after:bg-gray-400 after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full">Courier Mail</li>  */}
          <li onClick={handleLogout} className="hover:text-white cursor-pointer">Logout</li>
        </ul>
        <button onClick={() => setOpen(!isOpen)} className="lg:hidden cursor-pointer hover:text-gray-200 text-white font-semibold text-xl">☰</button>
        {isOpen && (
          <div ref={menuRef} className="absolute lg:hidden right-5 top-16 bg-[#404858] border border-white rounded-md w-64 z-50 text-white p-4 space-y-3">
            <div>
              <p className="cursor-pointer flex items-center gap-2 font-semibold hover:text-gray-300" onClick={() => setIsAppointmentHovered((prev) => !prev)}>
                Appointments {(domGeneral + mulGeneral) > 0 && <span className="bg-blue-400 rounded-full w-7 h-7 flex items-center justify-center text-sm">{domGeneral + mulGeneral}</span>}
              </p>
              {isAppointmentHovered && (
                <div className="pl-4 space-y-2 mt-2">
                  <p onClick={() => handleSectionChange("general", "Dombivali")} className="cursor-pointer flex items-center gap-2 hover:text-gray-300">
                    Dombivali <span className="bg-blue-400 rounded-full w-7 h-7 flex items-center justify-center text-sm">{domGeneral}</span>
                  </p>
                  <p onClick={() => handleSectionChange("general", "Mulund")} className="cursor-pointer flex items-center gap-2 hover:text-gray-300">
                    Mulund <span className="bg-blue-400 rounded-full w-7 h-7 flex items-center justify-center text-sm">{mulGeneral}</span>
                  </p>
                </div>
              )}
            </div>
            <div>
              <p className="cursor-pointer flex items-center gap-2 font-semibold hover:text-gray-300" onClick={() => setIsRepeatMedicineHovered((prev) => !prev)}>
                Repeat Medicine {(domRepeat + mulRepeat) > 0 && <span className="bg-blue-400 rounded-full w-7 h-7 flex items-center justify-center text-sm">{domRepeat + mulRepeat}</span>}
              </p>
              {isRepeatMedicineHovered && (
                <div className="pl-4 space-y-2 mt-2">
                  <p onClick={() => handleSectionChange("repeat", "Dombivali")} className="cursor-pointer flex items-center gap-2 hover:text-gray-300">
                    Dombivali <span className="bg-blue-400 rounded-full w-7 h-7 flex items-center justify-center text-sm">{domRepeat}</span>
                  </p>
                  <p onClick={() => handleSectionChange("repeat", "Mulund")} className="cursor-pointer flex items-center gap-2 hover:text-gray-300">
                    Mulund <span className="bg-blue-400 rounded-full w-7 h-7 flex items-center justify-center text-sm">{mulRepeat}</span>
                  </p>
                </div>
              )}
            </div>
            <div>
              <p className="cursor-pointer flex items-center gap-2 font-semibold hover:text-gray-300" onClick={() => setIsCourierMedicineHovered((prev) => !prev)}>
                Courier Medicine {(domCourier + mulCourier) > 0 && <span className="bg-blue-400 rounded-full w-7 h-7 flex items-center justify-center text-sm">{domCourier + mulCourier}</span>}
              </p>
              {isCourierMedicineHovered && (
                <div className="pl-4 space-y-2 mt-2">
                  <p onClick={() => handleSectionChange("courier", "Dombivali")} className="cursor-pointer flex items-center gap-2 hover:text-gray-300">
                    Dombivali <span className="bg-blue-400 rounded-full w-7 h-7 flex items-center justify-center text-sm">{domCourier}</span>
                  </p>
                  <p onClick={() => handleSectionChange("courier", "Mulund")} className="cursor-pointer flex items-center gap-2 hover:text-gray-300">
                    Mulund <span className="bg-blue-400 rounded-full w-7 h-7 flex items-center justify-center text-sm">{mulCourier}</span>
                  </p>
                </div>
              )}
            </div>
            <p onClick={() => navigate('/dashboard-DOCTOR/homeo-bhagwat')} className="cursor-pointer font-semibold hover:text-gray-300">Homeo Bhagwat Gita</p>
            <p onClick={handleLogout} className="cursor-pointer font-semibold hover:text-gray-300">Logout</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Docnavbar