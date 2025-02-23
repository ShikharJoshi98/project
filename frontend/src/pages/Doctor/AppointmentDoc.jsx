import React, { useEffect, useState } from "react";
import Docnavbar from "../../components/Doctor/DocNavbar";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { Briefcase, Calendar, CalendarDays, ClipboardPlus, Clock, FileText, LayoutList, MapPin, Plus, User, Users } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import { useAuthStore } from "../../store/authStore";
import Input from "../../components/Input";
import { docStore } from "../../store/DocStore";
import { recStore } from "../../store/RecStore";
import { useNavigate, useParams } from "react-router-dom";
import AppointmentModal from "../../components/Doctor/AppointmentModal";
import UploadCase from "../../components/Doctor/UploadCase";
import DocSidebar from "../../components/Doctor/DocSidebar";

const AppointmentDoc = () => {
  const { user } = useAuthStore();
  const [currentDate, setCurrentDate] = useState("");
  const [isAppointmentModalOpen, setAppointmentModalIsOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalIsOpen] = useState(false);
  const { branch, setbranch } = docStore();
  const navigate = useNavigate();
  useEffect(() => {
      const savedSection = localStorage.getItem("selectedSection");
      if (savedSection) {
        setappointmentType(savedSection);
      }
    }, []);
  
    const handleSectionChange = (newSection) => {
      setappointmentType(newSection);
      localStorage.setItem("selectedSection", newSection); 
    };
  
  const [appointmentType, setappointmentType] = useState("general");

  useEffect(() => {
    const updateDate = () => {
      const date = new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        timeZone: "Asia/Kolkata",
      });
      setCurrentDate(date);
    };

    updateDate();
  }, []);
  useEffect(() => {
          const savedAppointmentState = localStorage.getItem("modalAppointmentState");
          const savedUploadState = localStorage.getItem("modalUploadState");

          if (savedAppointmentState === "open") {
            setAppointmentModalIsOpen(true);
    }
    if (savedUploadState === "open") {
      setUploadModalIsOpen(true);
}
      
          
  }, []);
  useEffect(() => {
           localStorage.setItem("modalAppointmentState", isAppointmentModalOpen ? "open" : "closed");    
           localStorage.setItem("modalUploadState", isUploadModalOpen ? "open" : "closed");    

         }, [isAppointmentModalOpen,isUploadModalOpen]);
  

 
  

  return (
    <div>
      <Docnavbar />
      <div className="flex">
        <DocSidebar/>

        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
          <div className="flex md:flex-row h-fit flex-col items-center justify-between"> 
          <h1 className="text-stone-800 w-fit text-lg sm:text-xl font-semibold md:text-3xl m-2 md:m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg">
              Welcome {user?.fullname}
            </h1>
            <h1 className="text-stone-800 flex text-lg sm:text-xl items-center gap-2 w-fit font-semibold md:text-3xl m-2 md:m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg">
              <span>
                <MapPin />
              </span>
              {user?.branch}
            </h1>
          </div>
          <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-10 text-[#337ab7]'>{
  appointmentType === "general"
    ? `GENERAL APPOINTMENT ${branch.toUpperCase()}`
    : appointmentType === "repeat medicine"
    ? `REPEAT MEDICINE ${branch.toUpperCase()}`
    : `${appointmentType.toUpperCase()} ${branch.toUpperCase()}`
}
            </h1>
          <h1 className="text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4">{currentDate}</h1>
            <hr className="h-[0.5px] px-5 border-none bg-blue-500" />
            <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-white font-semibold  gap-2 sm:gap-9  items-center justify-center md:gap-9 text-[8px] sm:text-base md:text-lg'>
            <button onClick={()=>setAppointmentModalIsOpen(true)}  className='cursor-pointer flex items-center md:justify-center justify-between sm:gap-2 hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Appointment <span><Plus/></span>  </button>
              <button onClick={()=>setUploadModalIsOpen(true)} className='cursor-pointer flex items-center md:justify-center justify-between sm:gap-2 hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Upload <span><Plus/></span></button>
            </div>
            <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-stone-800 font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[10px] sm:text-base md:text-lg'>
                      <button onClick={() => { handleSectionChange('general');   }}  className={`cursor-pointer border-1 hover:scale-102 transition-all duration-300 ${appointmentType==='general'?"bg-blue-500 text-white":"bg-blue-300"}  p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>GENERAL</button>
                          <button onClick={() => { handleSectionChange('repeat medicine'); }}   className={`cursor-pointer border-1 hover:scale-102 transition-all duration-300 ${appointmentType==='repeat medicine'?"bg-blue-500 text-white":"bg-blue-300"}  p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>REPEAT MEDICINE</button>
                          <button onClick={() => { handleSectionChange('courier medicine');  }}   className={`cursor-pointer border-1 hover:scale-102 transition-all duration-300 ${appointmentType==='courier medicine'?"bg-blue-500 text-white":"bg-blue-300"}  p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>COURIER MEDICINE</button>
            </div>
          </div>
        </div>
      </div>
      {isAppointmentModalOpen && <AppointmentModal onClose={() => setAppointmentModalIsOpen(false)} />}
      {isUploadModalOpen && <UploadCase onClose={() => setUploadModalIsOpen(false)} />}

    </div>
  );
};

export default AppointmentDoc;
