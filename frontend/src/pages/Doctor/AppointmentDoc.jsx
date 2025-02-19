import React, { useEffect, useState } from "react";
import Docnavbar from "../../components/Doctor/DocNavbar";
import Sidebar, { SidebarItem } from "../../components/Sidebar";
import { Briefcase, Calendar, CalendarDays, ClipboardPlus, Clock, FileText, LayoutList, MapPin, User, Users } from "lucide-react";
import { FaUserDoctor } from "react-icons/fa6";
import { useAuthStore } from "../../store/authStore";
import Input from "../../components/Input";
import { docStore } from "../../store/DocStore";

const AppointmentDoc = () => {
  const { user, logout } = useAuthStore();
  const [currentDate, setCurrentDate] = useState("");
  const {submitAppointment,appointment} = docStore()
  // State to store form values
  const [formValues, setFormValues] = useState({
    AppointmentDate: "",
    Time: "",
    PatientCase: "",
    Doctor: "",
    AppointmentType: "",
  });

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

  // Handle input change for all form fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
      await submitAppointment(formValues);
      alert("appointment created");
    // Add your API call or logic to save appointment data
  };

  return (
    <div>
      <Docnavbar />
      <div className="flex">
        <Sidebar>
          <SidebarItem onClick={() => navigate("/appointment-doctor")} active icon={<ClipboardPlus />} text={"APPOINTMENTS "} />
          <SidebarItem onClick={() => setTaskModalIsOpen(true)} icon={<LayoutList />} text={"ASSIGN TASK"} />
          <SidebarItem onClick={() => setLeaveModalIsOpen(true)} icon={<CalendarDays />} text={"LEAVE REPORTS "} />
          <SidebarItem icon={<Users />} text={"STAFF"} />
          <SidebarItem icon={<FileText />} text={"CERTIFICATES"} />
          <SidebarItem icon={<FaUserDoctor size={20} />} text={"DOCTOR FEES"} />
          <SidebarItem icon={<Briefcase />} text={"TODAYS COLLECTIONS"} />
        </Sidebar>

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
            <h1 className="p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl">Create Appointment</h1>
            <h1 className="text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4">{currentDate}</h1>
            <hr className="h-[0.5px] px-5 border-none bg-blue-500" />

            <form onSubmit={handleSubmit} className="mx-auto relative z-10 my-8 bg-white/80 h-auto p-8 md:max-w-[500px] max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg">
              <div className="flex flex-col gap-4 m-auto">
                {/* Date Input */}
                <div className="flex flex-col gap-2">
                  <h1>Date</h1>
                  <Input icon={Calendar} type="date" name="AppointmentDate" value={formValues.AppointmentDate} onChange={handleInputChange} required />
                </div>

                {/* Time Input */}
                <div className="flex flex-col gap-2">
                  <h1>Time</h1>
                  <Input icon={Clock} type="time" name="Time" value={formValues.Time} onChange={handleInputChange} required />
                </div>

                {/* Patient Case Paper Number */}
                <div className="flex flex-col gap-2">
                  <h1>Patient Case Paper Number</h1>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <User className="size-4 text-blue-500" />
                    </div>
                    <select
                      name="PatientCase"
                      value={formValues.PatientCase}
                      onChange={handleInputChange}
                      required
                      className="py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
                    >
                      <option value="" >
                        Select Case Paper No.
                                          </option>
                                          <option value="Mohan Sharma"  >
Mohan Sharma                      </option>
                      {/* Add dynamic options here */}
                    </select>
                  </div>
                </div>

                {/* Doctor Selection */}
                <div className="flex flex-col gap-2">
                  <h1>Doctor</h1>
                  <div className="relative w-full">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <FaUserDoctor className="size-4 text-blue-500" />
                    </div>
                    <select
                      name="Doctor"
                      value={formValues.Doctor}
                      onChange={handleInputChange}
                      required
                      className="py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
                    >
                      <option value="" disabled>
                        Select Doctor
                      </option>
                      <option value="Santosh K Yadav">Santosh K. Yadav</option>
                      <option value="Mohit">Mohit</option>
                    </select>
                  </div>
                </div>

                {/* Appointment Type */}
                <div className="flex flex-col gap-2">
                  <h1>Appointment Type</h1>
                  <select
                    name="AppointmentType"
                    value={formValues.AppointmentType}
                    onChange={handleInputChange}
                    required
                    className="py-2 pl-3 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900"
                  >
                    <option value="" disabled>
                      Please Select the type
                    </option>
                    <option value="general">General</option>
                    <option value="repeat">Repeat Medicine</option>
                    <option value="courier">Courier Medicine</option>
                  </select>
                </div>

                {/* Submit Button */}
                <div className="w-full">
                  <button className="ml-28 cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full" type="submit">
                    Create
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentDoc;
