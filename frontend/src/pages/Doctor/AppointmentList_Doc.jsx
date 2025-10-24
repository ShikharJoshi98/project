import { useEffect, useState } from 'react'
import { docStore } from '../../store/DocStore';
import AppointmentModal from '../../components/Doctor/AppointmentModal';
import UploadCase from '../../components/Doctor/UploadCase';
import Input from '../../components/Input';
import { useAuthStore } from '../../store/authStore';
import { useNavigate, useParams } from 'react-router-dom';
import { updateDate } from '../../store/todayDate';
import { BiPlus } from 'react-icons/bi';
import { CiSearch } from 'react-icons/ci';
import { LuLoaderCircle } from 'react-icons/lu';
import { recStore } from '../../store/RecStore';

const AppointmentList_Doc = () => {
  const { setAppointmentSection, appointmentSection, appointmentSubmit, getAppDetails, appointments, newAppointmentLength, followUpAppointmentLength, medicineIssuedLength, medicineNotIssuedLength } = docStore();
  const { isShift, shiftToggle } = recStore();
  const { branch } = useParams();
  const { user } = useAuthStore();
  const [isAppointmentModalOpen, setAppointmentModalIsOpen] = useState(false);
  const [isUploadModalOpen, setUploadModalIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentDate = updateDate();

  useEffect(() => {
    const timeout = setTimeout(() => setLoading(true), 200);
    getAppDetails(appointmentSection, branch, user?._id, isShift?.shift).finally(() => {
      clearTimeout(timeout);
      setLoading(false);
    });
  }, [getAppDetails, appointmentSection, branch, appointmentSubmit, shiftToggle, recStore.getState().isShift?.shift]);

  return (
    <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 p-8 overflow-hidden min-h-screen w-full">
      <div className="bg-[#e9ecef] w-auto p-5 rounded-lg">
        <h1 className='text-xl sm:text-2xl md:text-4xl text-center font-semibold mt-10 text-[#337ab7]'>{`${appointmentSection.toUpperCase()} APPOINTMENT ${branch.toUpperCase()}`}</h1>
        <h1 className="text-blue-500 font-semibold mb-3 text-lg mt-4">{currentDate}</h1>
        <hr className="h-[0.5px] px-5 border-none bg-blue-500" />
        <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-white font-semibold  gap-2 sm:gap-9  items-center justify-center md:gap-9 text-[8px] sm:text-base'>
          <button onClick={() => setAppointmentModalIsOpen(true)} className='cursor-pointer flex items-center md:justify-center justify-between sm:gap-2 hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Appointment <span><BiPlus /></span>  </button>
          <button onClick={() => setUploadModalIsOpen(true)} className='cursor-pointer flex items-center md:justify-center justify-between sm:gap-2 hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>Upload <span><BiPlus /></span></button>
        </div>
        <div className='sm:flex grid grid-cols-2 mt-8 sm:flex-row text-stone-800 font-semibold  gap-2 sm:gap-9 justify-center items-center md:gap-9 text-[10px] sm:text-base'>
          <button onClick={() => setAppointmentSection("general")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${appointmentSection === 'general' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>GENERAL </button>
          <button onClick={() => setAppointmentSection("repeat")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${appointmentSection === 'repeat' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>REPEAT MEDICINE </button>
          <button onClick={() => setAppointmentSection("courier")} className={`cursor-pointer border-1 border-black hover:scale-102 transition-all duration-300 ${appointmentSection === 'courier' ? 'bg-blue-500 text-white' : 'bg-blue-300 text-black'} p-2 hover:bg-blue-600 hover:text-white rounded-lg`}>COURIER MEDICINE</button>
        </div>
        <div className='mt-10'>
          <Input onChange={(e) => setSearchTerm(e.target.value)} value={searchTerm} icon={CiSearch} placeholder='Search for Patient&apos;s Name/Case Paper No./Mobile No.' />
        </div>
        {loading ? <LuLoaderCircle className='animate-spin mx-auto mt-10' size={24} /> : <div className="overflow-x-auto mt-10">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg">
            <thead>
              <tr className="bg-blue-500 text-white text-sm ">
                <th className="py-2 px-4 border">TOKEN NO.</th>
                <th className="py-2 px-4 border">CASE PAPER NO.</th>
                <th className="py-2 px-4 border">CONTACT NO.</th>
                <th className="py-2 px-4 border">PATIENT'S NAME</th>
                <th className="py-2 px-4 border">STATUS</th>
                <th className="py-2 px-4 border">BRANCH</th>
                <th className="py-2 px-4 border">DETAILS</th>
              </tr>
            </thead>
            <tbody className=" bg-gray-200 text-black text-sm">
              {
                appointments.filter((appointment) => appointment?.PatientCase?.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  appointment?.PatientCase?.casePaperNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                  appointment?.PatientCase?.phone?.toLowerCase().includes(searchTerm.toLowerCase())).map((appointment, index) => (
                    <tr key={index} className={`${appointment?.medicine_issued_flag === true ? 'bg-pink-200' : appointment?.complete_appointment_flag === true ? 'bg-blue-200' : appointment?.new_appointment_flag === true ? 'bg-yellow-200' : 'bg-green-200'} `}>
                      <td className="py-2 px-4 text-center border">{index + 1}</td>
                      <td className="py-2 px-4 text-center border">{appointment?.PatientCase?.casePaperNo}</td>
                      <td className="py-2 px-4 text-center border">{appointment?.PatientCase?.phone}</td>
                      <td className="py-2 px-4 text-center border">{appointment?.PatientCase?.fullname}</td>
                      <td className="py-2 px-4 text-center border">{appointment?.appointmentType}</td>
                      <td className="py-2 px-4 text-center border">{appointment?.PatientCase?.branch}</td>
                      <td onClick={() => navigate(`/appointment-details/${appointment?.PatientCase._id}`)} className="py-2 px-4 border"><button className="bg-blue-500 p-2 mx-auto block rounded-md text-white cursor-pointer">Details</button></td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>}
        <div className="flex mt-10 flex-col gap-5">
          <div className="flex text-sm gap-5"><div className="w-5 h-5 border-1 bg-yellow-200"></div><span>{appointmentSection === 'general' ? 'New Patient Appointment Due' : appointmentSection === 'repeat' ? 'New Repeat Medicine Appointment Due' : 'New Courier Appointment Due'}  ({newAppointmentLength})</span></div>
          <div className="flex text-sm gap-5"><div className="w-5 h-5 border-1 bg-green-200"></div><span>{appointmentSection === 'general' ? 'Follow Up Appointment Due' : appointmentSection === 'repeat' ? 'Follow up Repeat Medicine Appointment Due' : 'Follow Up Courier Appointment Due'}  ({followUpAppointmentLength})</span></div>
          <div className="flex text-sm gap-5"><div className="w-5 h-5 border-1 bg-blue-200"></div><span>Medicine Not Issued  ({medicineNotIssuedLength})</span></div>
          <div className="flex text-sm gap-5"><div className="w-5 h-5 border-1 bg-pink-200"></div><span>{appointmentSection === 'general' ? 'Medicine Issued' : appointmentSection === 'repeat' ? 'Repeat Medicine Issued' : 'Courier Medicine Issued'}  ({medicineIssuedLength})</span></div>
        </div>
      </div>
      {isAppointmentModalOpen && <AppointmentModal onClose={() => setAppointmentModalIsOpen(false)} />}
      {isUploadModalOpen && <UploadCase onClose={() => setUploadModalIsOpen(false)} />}
    </div>
  )
}

export default AppointmentList_Doc