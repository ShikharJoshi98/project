import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';
import ApproveButton from '../../components/Doctor/ApproveButton';
import { FaCartPlus } from 'react-icons/fa6';
import { AiFillMedicineBox } from "react-icons/ai";
import { updateDate } from '../../store/todayDate';
import { LuLoaderCircle, LuMapPin } from 'react-icons/lu';
import { recStore } from '../../store/RecStore';
import { useEffect, useState } from 'react';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import axios from 'axios';

const DoctorDashboard = () => {
  const { user } = useAuthStore();
  const { getClinicDetails, clinicDetails, setSelectedBranch, isBranch } = docStore();
  const { isShift, toggleShiftUpdate, setShift, getShift, shiftToggle } = recStore();
  const navigate = useNavigate();
  const todayDate = updateDate();
  const [shiftLoading, setShiftLoading] = useState(false);
  const [shiftSubmit, setShiftSubmit] = useState(false);
  const [branchToggle, setBranchToggle] = useState(false);
  const [branchLoading, setBranchLoading] = useState(false);

  useEffect(() => {
    getClinicDetails();
  }, [shiftToggle, user]);
  const selected = clinicDetails.find(clinic => clinic?.selectedBranch === true);

  useEffect(() => {
    if (selected) {
      setSelectedBranch(selected.branch);
    }
  }, [selected]);

  useEffect(() => {
    getShift(user?.role, user?._id)
  }, [shiftToggle]);

  const changeShift = async (type = '', role, id) => {
    setShiftLoading(true);
    await setShift(type, role, id);
    setShiftLoading(false);
    setShiftSubmit(prev => !prev);
    toggleShiftUpdate(prev => !prev);
  }
  const changeBranch = async (id, branch) => {
    setBranchLoading(true);
    await axios.patch(`${DOC_API_URL}/changeBranch/${id}`);
    await setShift('', user?.role, user?._id);
    setSelectedBranch(branch)
    setBranchToggle(prev => !prev);
    toggleShiftUpdate(prev => !prev);
    setBranchLoading(false);
  }

  return (
    <div className='bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 p-10 overflow-hidden min-h-screen w-full'>
      <div className='flex md:flex-row gap-3 h-fit flex-col items-center justify-between '>
        <h1 className='text-stone-800 w-fit text:lg sm:text-2xl font-semibold bg-[#dae5f4] p-3 rounded-lg'>Welcome {user?.fullname}</h1>
        {
          (branchLoading === false ?
            (<div className='h-12 bg-[#c8c8ce] w-fit place-self-center md:place-self-end rounded-[18px]'>
              {
                clinicDetails?.map((branch, index) => (
                  <button key={index} onClick={() => changeBranch(branch?._id, branch?.branch)} className={`${branch?.selectedBranch
                    === true ? 'bg-blue-700 rounded-[18px] text-white' : ''} py-2.5 px-5 text-lg cursor-pointer`}>{branch?.branch}</button>
                ))
              }
            </div>)
            :
            <LuLoaderCircle className='animate-spin text-white' size={24} />
          )
        }
      </div>
      {
        (shiftLoading === false ?
          (<div className='h-12 bg-[#c8c8ce] w-fit mt-5 place-self-center md:place-self-end rounded-[18px]'>
            {
              clinicDetails?.filter((clinic, _) => clinic?.branch === isBranch).map((clinic, clinicIndex) => (
                clinic?.shifts?.length > 0 && clinic?.shifts?.map((shift, index) => (
                  <button key={index - clinicIndex} onClick={() => changeShift(shift, user?.role, user?._id)} className={`${isShift?.shift === shift ? 'bg-blue-700 rounded-[18px] text-white' : ''} py-2.5 px-5 text-lg cursor-pointer`}>{shift}</button>

                ))
              ))
            }
          </div>)
          :
          <LuLoaderCircle className='animate-spin text-white' size={24} />
        )
      }
      <div className='bg-[#e9ecef] w-auto p-5 my-6 rounded-lg '>
        <h1 className='p-4 text-center font-semibold text-[#337ab7] text-xl sm:text-4xl'>Dashboard</h1>
        <h1 className=' text-blue-500 font-semibold mb-3 text-lg mt-4'>{todayDate}</h1>
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