import React, { useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import AppointmentSidebar from '../../components/Doctor/AppointmentSidebar'
import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import MultiSelectDropdown from '../../components/Doctor/MultiSelectInput';
import { MdAssignmentAdd } from 'react-icons/md';
import InvestigationModal from '../../components/Doctor/InvestigationModal';

const investigationList = ['CBC', 'ESR', 'PS for MP']

const Investigation = () => {
  const location = useParams();
  const navigate = useNavigate();
  const [selectedInvestigationOptions, setSelectedInvestigationOptions] = useState([]);
  const [isAddInvestigationModalOpen, setAddInvestigationModalIsOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  return (
    <div>
      <Docnavbar />
      <div className="flex">
        <AppointmentSidebar />
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
          <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
            <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-5 text-[#337ab7]'>
              INVESTIGATION
            </h1>
            <div className='flex w-full gap-10 mt-10 mb-2 pr-5'>
              <form onSubmit={handleSubmit} className='w-1/2'>
                <h1 className='text-black text-xl font-semibold mb-9'>Advice Investigations : </h1>
                <MultiSelectDropdown Options={investigationList} selectedOptions={selectedInvestigationOptions} setSelectedOptions={setSelectedInvestigationOptions} />
                <div className='flex flex-col items-center'>
                  <button className="bg-blue-500 transition-all duration-300 cursor-pointer hover:bg-blue-600 px-5 py-2 rounded-lg mt-3 text-white">Add</button>
                </div>
              </form>
              <div className='w-1/2'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-black text-xl font-semibold mb-4'>Recent List</h1>
                  <MdAssignmentAdd onClick={() => setAddInvestigationModalIsOpen(true)} size={30} className='text-blue-500 cursor-pointer' />
                </div>
                <div className='flex flex-col items-center h-[500px] overflow-y-auto gap-1 bg-gray-200 border rounded-2xl pt-3 mt-5'>
                  {investigationList.map((investigation, index) => (
                    <>
                      <h1 className='text-xl p-1' key={index}>{investigation}</h1>
                      <hr className='border-none h-[0.5px] w-full bg-gray-300' />
                    </>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isAddInvestigationModalOpen && <InvestigationModal list={investigationList} onClose={() => setAddInvestigationModalIsOpen(false)} />}
    </div>
  )
}

export default Investigation