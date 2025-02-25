import React, { useEffect, useState } from "react";
import Docnavbar from "../../components/Doctor/DocNavbar";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { Briefcase, Calendar, CalendarDays, ClipboardPlus, Clock, FileText, LayoutList, MapPin, Plus, Search, User, Users } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import { useAuthStore } from "../../store/authStore";
import Input from "../../components/Input";
import { docStore } from "../../store/DocStore";
import { useNavigate, useParams } from "react-router-dom";
import AppointmentModal from "../../components/Doctor/AppointmentModal";
import UploadCase from "../../components/Doctor/UploadCase";
import DocSidebar from "../../components/Doctor/DocSidebar";

const RepeatAppointment = () => {
  const { user } = useAuthStore();
  const [currentDate, setCurrentDate] = useState("");
  const [isAppointmentModalOpen, setAppointmentModalIsOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalIsOpen] = useState(false);
  const { branch, setbranch,getAppdetails,appointments } = docStore();
  const navigate = useNavigate();
  useEffect(() => {
      const savedType = localStorage.getItem("selectedType");
      if (savedType) {
        setappointmentType(savedType);
      }
    }, []);
  
    const handleSectionChange = (type,path) => {
      setappointmentType(type);
      localStorage.setItem("selectedType", type); 
      navigate(path);
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
  
  useEffect(() => {

    getAppdetails(appointmentType);
  }, [getAppdetails])
  const RepeatAppointments = appointments.filter((appointment) => (
     appointment.AppointmentType === "repeat"
  ));
console.log(RepeatAppointments);
  
    

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
`REPEAT MEDICINE ${branch.toUpperCase()}`
}
            </h1>
          <h1 className="text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4">{currentDate}</h1>
            <hr className="h-[0.5px] px-5 border-none bg-blue-500" />
            <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-white font-semibold  gap-2 sm:gap-9  items-center justify-center md:gap-9 text-[8px] sm:text-base md:text-lg'>
            <button onClick={()=>setAppointmentModalIsOpen(true)}  className='cursor-pointer flex items-center md:justify-center justify-between sm:gap-2 hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Appointment <span><Plus/></span>  </button>
              <button onClick={()=>setUploadModalIsOpen(true)} className='cursor-pointer flex items-center md:justify-center justify-between sm:gap-2 hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Upload <span><Plus/></span></button>
            </div>
            <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-stone-800 font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[10px] sm:text-base md:text-lg'>
                      <button onClick={() => { handleSectionChange('general','/general-appointment');   }}  className={`cursor-pointer border-1 hover:scale-102 transition-all duration-300 ${appointmentType==='general'?"bg-blue-500 text-white":"bg-blue-300"}  p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>GENERAL</button>
                          <button onClick={() => { handleSectionChange('repeat medicine','/repeat-appointment'); }}   className={`cursor-pointer border-1 hover:scale-102 transition-all duration-300 ${appointmentType==='repeat medicine'?"bg-blue-500 text-white":"bg-blue-300"}  p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>REPEAT MEDICINE</button>
                          <button onClick={() => { handleSectionChange('courier medicine','/courier-appointment'); }}   className={`cursor-pointer border-1 hover:scale-102 transition-all duration-300 ${appointmentType==='courier medicine'?"bg-blue-500 text-white":"bg-blue-300"}  p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>COURIER MEDICINE</button>
            </div>
            <div className="mt-10">
                <Input icon={Search}  placeholder="Search for Patient's Name/Case Paper No./Mobile No."/>
            </div>
            <div className="overflow-x-auto  mt-10">
            <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
                <thead>
                  <tr className=" bg-blue-500 text-white text-sm ">
                     <th className="py-2 px-4 border">TOKEN NO.</th>
                     <th className="py-2 px-4 border">PATIENT'S IMAGE</th>
                     <th className="py-2 px-4 border">CASE PAPER NO.</th>
                     <th className="py-2 px-4 border">CONTACT NO.</th>
                     <th className="py-2 px-4 border">PATIENT'S NAME</th>
                     <th className="py-2 px-4 border">STATUS</th>
                     <th className="py-2 px-4 border">BRANCH</th>
                     <th className="py-2 px-4 border">DETAILS</th>
                    <th className="py-2 px-4 border">MAIL STATUS</th>
                    </tr>
                </thead>
                <tbody className=" bg-gray-200  text-black  ">
                  {
                    RepeatAppointments.map((appointment, idx) => (
                      <tr key={idx}>
                        <td className="py-2 px-4 border">{ idx+1}</td>
                     <td  className="py-2 px-4 border">PATIENT'S IMAGE</td>
                        <td  className="py-2 px-4 border">{ appointment.PatientCase.casePaperNo}</td>
                     <td  className="py-2 px-4 border">{ appointment.PatientCase.phone}</td>
                     <td  className="py-2 px-4 border">{ appointment.PatientCase.fullname}</td>
                     <td  className="py-2 px-4 border">{ appointment.AppointmentType}</td>
                     <td  className="py-2 px-4 border">{ appointment.PatientCase.branch}</td>
                     <td className="py-2 px-4 border"><button className="bg-blue-500 p-2 rounded-md text-white cursor-pointer">Details</button></td>
                    <td  className="py-2 px-4 border">{ appointment.PatientCase.email}</td>
                      </tr>
                    ))
                  }
                </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
      {isAppointmentModalOpen && <AppointmentModal onClose={() => setAppointmentModalIsOpen(false)} />}
      {isUploadModalOpen && <UploadCase onClose={() => setUploadModalIsOpen(false)} />}

    </div>
  );
};

export default RepeatAppointment;
