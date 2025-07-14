import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import ApproveButton from '../../components/Doctor/ApproveButton';
import { FaCartPlus } from 'react-icons/fa6';
import { AiFillMedicineBox } from "react-icons/ai";
import { updateDate } from '../../store/todayDate';

const DoctorDashboard = () => {
  const { user } = useAuthStore();
  const navigate = useNavigate();
  const todayDate = updateDate();

  return (
    <div className='bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700  min-h-screen  w-full overflow-hidden '>
      <div className='flex md:flex-row h-fit flex-col items-center justify-between '>
        <h1 className='text-stone-800 w-fit text:lg sm:text-xl font-semibold md:text-3xl m-2 md:m-10 bg-[#dae5f4] p-3 md:p-5 rounded-lg'>Welcome {user?.fullname}</h1>
      </div>
      <div className='bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg '>
        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-3xl md:text-5xl'>Dashboard</h1>
        <h1 className=' text-blue-500 font-semibold mb-3 text-lg md:text-2xl mt-4'>{todayDate}</h1>
        <hr className='h-[0.5px] px-5 border-none bg-blue-500' />
        <div className='sm:flex grid grid-cols-2 mt-5 sm:flex-row text-white font-semibold  gap-2 justify-between items-center text-[6px] sm:text-[8px] md:text-sm'>
          <button onClick={() => navigate('/dashboard-DOCTOR/balance-list/Dombivali')} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>BALANCE LIST DOMBIVALI</button>
          <button onClick={() => navigate('/dashboard-DOCTOR/balance-list/Mulund')} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>BALANCE LIST MULUND</button>
          <button onClick={() => navigate('/dashboard-DOCTOR/doctor-diagnose-history')} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>DIAGNOSE HISTORY</button>
          <button onClick={() => navigate('/dashboard-DOCTOR/view-courier-details/Dombivali')} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>COURIER LIST DOMBIVALI</button>
          <button onClick={() => navigate('/dashboard-DOCTOR/view-courier-details/Mulund')} className='cursor-pointer hover:scale-102 transition-all duration-300 bg-blue-500 p-2 hover:bg-blue-600 rounded-lg'>COURIER LIST MULUND</button>
        </div>
        <div className='mt-20 grid grid-cols-1 lg:grid-cols-2 w-fit mx-auto gap-x-56 gap-y-10'>
          <ApproveButton onClick={() => navigate('/dashboard-DOCTOR/approve-items/Dombivali')} title='Approve Items' icon={<FaCartPlus size={40} />} branch='Dombivali' bgColor='#60aeff' />
          <ApproveButton onClick={() => navigate('/dashboard-DOCTOR/approve-items/Mulund')} title='Approve Items' icon={<FaCartPlus size={40} />} branch='Mulund' bgColor='#ff7b91' />
          <ApproveButton onClick={() => navigate('/dashboard-DOCTOR/approve-medicines/Dombivali')} title='Approve Medicine' icon={<AiFillMedicineBox size={40} />} branch='Dombivali' bgColor='#4fdec1' />
          <ApproveButton onClick={() => navigate('/dashboard-DOCTOR/approve-medicines/Mulund')} title='Approve Medicine' icon={<AiFillMedicineBox size={40} />} branch='Mulund' bgColor='#f0a436' />
        </div>
      </div>
    </div>
  )
}

export default DoctorDashboard