import { useEffect, useState } from 'react'
import Input from '../Input';
import { Calendar, Clock, User, X } from 'lucide-react';
import { FaUserDoctor } from 'react-icons/fa6';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { recStore } from '../../store/RecStore';
import axios from 'axios';
import { useStore } from '../../store/UpdateStore';
import { useParams } from 'react-router-dom';
import { updateDate } from '../../store/todayDate';

const AppointmentModal = ({ onClose }) => {
  const { appointmentSubmit, toggleAppointmentSubmit } = docStore();
  const { patients, getPatientDetails } = recStore();
  const { getDetails, employees } = useStore();
  const doctors = employees.filter(emp => emp?.role === 'doctor');
  const [appointmentCreated, setAppointmentCreated] = useState('');
  const location = useParams();
  const today = new Date().toLocaleDateString('en-CA');
  const todayDate = updateDate();
  const [formValues, setFormValues] = useState({
    date: today,
    time: "",
    PatientCase: "",
    Doctor: "",
    appointmentType: 'general',
  });
    console.log(formValues);


  useEffect(() => {
    getPatientDetails();
    getDetails();
  }, [getPatientDetails, getDetails])
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(`${DOC_API_URL}/new-appointment`, formValues);
    await axios.patch(`${DOC_API_URL}/update-apppointment/${location.id}`, {
      complete_appointment_flag: false,  
      medicine_issued_flag:false,
      date:todayDate
    })
    if (response.data.message === 'Appointment exist') {
      alert("Appointment already exists for this date");
      setFormValues({
      time: "",
      PatientCase: "",
      Doctor: "",
      appointmentType: "",
    })
      return;
    }
    toggleAppointmentSubmit(!appointmentSubmit);

    setFormValues({
      time: "",
      PatientCase: "",
      Doctor: "",
      appointmentType: "",
    })
    setAppointmentCreated('Appointment Created');
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };
  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] overflow-x-hidden max-h-[90vh] max-w-[80vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
        <button
          onClick={() => { onClose(); setAppointmentCreated('')}}
          className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
        >
          <X size={24} />
        </button>

        <div className="bg-[#e9ecef] w-full sm:w-auto  sm:mx-10   rounded-lg">
          <h1 className=" text-center font-semibold  text-[#337ab7] text-xl sm:text-3xl md:text-5xl">Create Appointment</h1>
          {appointmentCreated.length>0 && <p className='border-2 border-blue-40 text-blue-500 font-semibold p-2 rounded-md w-fit mx-auto my-6'>{appointmentCreated}</p>}
          <form onSubmit={handleSubmit} className="mx-auto relative z-10 my-8 bg-white/80 h-auto p-8 md:max-w-[500px] w-full sm:max-w-72 border rounded-xl text-zinc-600 text-sm shadow-lg">
            <div className="flex flex-col gap-4 m-auto">
              <div className="flex flex-col gap-2">
                <h1>Date</h1>
                <Input icon={Calendar} type="date" name="date" value={formValues.date} onChange={handleInputChange} required />
              </div>

              <div className="flex flex-col gap-2">
                <h1>Time</h1>
                <Input icon={Clock} type="time" name="time" value={formValues.time} onChange={handleInputChange} />
              </div>

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
                    <option value="" disabled >
                      Select Case Paper No.
                    </option>
                    {
                      patients.map((patient, idx) => (
                        <option key={idx} value={patient._id} >
                          {patient?.fullname} / {patient?.casePaperNo} / {patient?.phone} (M)
                        </option>
                      ))
                    }
                  </select>
                </div>
              </div>

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
                <select
                  name="appointmentType"
                  value={formValues.appointmentType}
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
              <div className="w-full flex items-center justify-center">
                <button className=" cursor-pointer bg-blue-400 text-lg font-semibold hover:text-gray-200 hover:bg-blue-600 hover:scale-101 text-white mt-7 w-52 p-2 rounded-full" type="submit">
                  Create
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AppointmentModal