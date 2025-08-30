import { useEffect, useState } from 'react'
import Input from '../Input';
import ReactDOM from "react-dom";
import { FaUserDoctor } from 'react-icons/fa6';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { recStore } from '../../store/RecStore';
import axios from 'axios';
import { useStore } from '../../store/UpdateStore';
import { updateDate } from '../../store/todayDate';
import SearchSelect from '../SearchSelect';
import { RxCross2 } from "react-icons/rx";
import { toast, ToastContainer } from 'react-toastify';
import { CiCalendar, CiClock1 } from 'react-icons/ci';
import { useAuthStore } from '../../store/authStore';
import { useParams } from 'react-router-dom';

const AppointmentModal = ({ onClose }) => {
  const { appointmentSubmit, toggleAppointmentSubmit } = docStore();
  const { allBranchPatients, getAllPatients } = recStore();
  const { user } = useAuthStore();
  const { branch } = useParams();
  const { getDetails, employees } = useStore();
  const doctors = employees.filter(emp => emp?.role === 'doctor');
  const [selectedPatient, setSelectedPatient] = useState(null);
  const today = new Date().toLocaleDateString('en-CA');
  const todayDate = updateDate();
  const [formValues, setFormValues] = useState({
    date: today,
    time: "",
    PatientCase: "",
    Doctor: "",
    appointmentType: 'general'
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(true), 200);
    if (user?.role !== 'doctor') {
      getAllPatients(user?.branch).finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      });
    }
    else {
      getAllPatients(branch).finally(() => {
        clearTimeout(timeout);
        setLoading(false);
      })
    }
    getDetails();
  }, [getPatientDetails, getDetails])


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (selectedPatient === null) {
      toast("Select a Patient")
      return;
    }
    const updatedForm = {
      ...formValues,
      PatientCase: selectedPatient
    };
    const response = await axios.post(`${DOC_API_URL}/new-appointment`, updatedForm);
    await axios.patch(`${DOC_API_URL}/update-apppointment/${selectedPatient}`, {
      complete_appointment_flag: false,
      medicine_issued_flag: false,
      date: todayDate
    })
    if (response.data.message === 'Appointment exist') {
      toast("Appointment already exists for this date");
      setFormValues({
        date: today,
        time: "",
        PatientCase: "",
        Doctor: "",
        appointmentType: ""
      })
      return;
    }
    toggleAppointmentSubmit(!appointmentSubmit);
    setFormValues({
      date: today,
      time: "",
      PatientCase: "",
      Doctor: "",
      appointmentType: ""
    })
    toast("Appointment Created");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return ReactDOM.createPortal(
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <ToastContainer />
      <div className="bg-[#e9ecef] overflow-x-hidden max-h-[90vh] max-w-[80vw] overflow-y-auto flex flex-col w-full rounded-xl p-6 md:p-10 shadow-lg">
        <button onClick={() => onClose()} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
        <div className="bg-[#e9ecef] w-full sm:w-auto sm:mx-10 rounded-lg">
          <h1 className=" text-center font-semibold text-[#337ab7] text-xl sm:text-4xl">Create Appointment</h1>
          <form onSubmit={handleSubmit} className="mx-auto relative z-10 my-8 bg-white/80 h-auto p-8 md:max-w-[500px] w-full sm:max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg">
            <div className="flex flex-col gap-4 m-auto">
              <div className="flex flex-col gap-2">
                <h1>Date</h1>
                <Input icon={CiCalendar} type="date" name="date" value={formValues.date} onChange={handleInputChange} required />
              </div>
              <div className="flex flex-col gap-2">
                <h1>Time</h1>
                <Input icon={CiClock1} type="time" name="time" value={formValues.time} onChange={handleInputChange} />
              </div>
              <div className="flex flex-col gap-2">
                <h1>Patient Case Paper Number</h1>
                <SearchSelect options={allBranchPatients} loading={loading} setSelectedPatient={setSelectedPatient} />
              </div>
              <div className="flex flex-col gap-2">
                <h1>Doctor</h1>
                <div className="relative w-full">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <FaUserDoctor className="size-4 text-blue-500" />
                  </div>
                  <select name="Doctor" value={formValues.Doctor} onChange={handleInputChange} required className="py-2 pl-9 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900">
                    <option value="" disabled>Select Doctor</option>
                    {
                      doctors.map((doctor, index) =>
                        <option key={index} value={doctor?._id}>{doctor?.fullname}</option>
                      )
                    }
                  </select>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <h1>Appointment Type</h1>
                <select name="appointmentType" value={formValues.appointmentType} onChange={handleInputChange} required className="py-2 pl-3 rounded-lg border border-gray-400 w-full focus:outline-none focus:ring-2 focus:ring-blue-300 text-zinc-900">
                  <option value="" disabled>Please Select the type</option>
                  <option value="general">General</option>
                  <option value="repeat">Repeat Medicine</option>
                  <option value="courier">Courier Medicine</option>
                </select>
              </div>
              <div className="w-full flex items-center justify-center">
                <button className=" cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full" type="submit">Create</button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root")
  )
}

export default AppointmentModal