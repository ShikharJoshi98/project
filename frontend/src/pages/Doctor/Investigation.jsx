import { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import AppointmentSidebar from '../../components/Doctor/AppointmentSidebar'
import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import MultiSelectDropdown from '../../components/Doctor/MultiSelectInput';
import { MdAssignmentAdd } from 'react-icons/md';
import InvestigationModal from '../../components/Doctor/InvestigationModal';
import axios from 'axios';
import { DOC_API_URL, docStore } from '../../store/DocStore';
import MultiSelectInput from '../../components/Doctor/MultiSelectInput';
import { Trash } from 'lucide-react';

const testArray = [{ title: 'Investigation Advised', color: 'blue' }, { title: 'Ultra-Sonography', color: 'red' }, { title: 'Doppler Studies', color: 'green' }, { title: 'Obstetrics(Pregnancy)', color: 'orange' }, { title: 'Sonography', color: 'black' }, { title: '16 Slice C.T Scan', color: 'brown' }, { title: '1.5 MRI Scan', color: 'purple' }];

const Investigation = () => { 
  const { id } = useParams();
  const navigate = useNavigate();
  const { getInvestigationAdvised, investigationAdvised,getTestInfo,testInfo } = docStore();
  const [selectedInvestigationOptions, setSelectedInvestigationOptions] = useState([]);
  const [isAddInvestigationModalOpen, setAddInvestigationModalIsOpen] = useState(false);
  const [investigationType, setInvestigationType] = useState('Investigation Advised')
  const [submit, setSubmit] = useState(false);
  // console.log(investigationType)
  useEffect(() => {    
    getInvestigationAdvised(investigationType);
    getTestInfo(id, investigationType);
  }, [getInvestigationAdvised, submit, investigationType]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${DOC_API_URL}/add-test/${id}`, {
      selectedInvestigationOptions,
      investigationType
    })
    setSubmit(prev => !prev);
    setSelectedInvestigationOptions([]);

  }
  const deleteTest = async (test, id) => {
     try {
       await axios.delete(`${DOC_API_URL}/delete-test/${investigationType}/${id}/${test}`);
       setSubmit(prev => !prev);
     } catch (error) {
       console.log(error.message);
     }
  }
  const investigationArray = investigationAdvised.map((investigation) => investigation?.inputData);

  console.log(testInfo);
  return (
    <div>
      <Docnavbar />
      <div className="flex">
        <AppointmentSidebar />
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
          <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
            <h1 onClick={() => navigate(`/appointment-details/${id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-5 text-[#337ab7]'>
              {investigationType}
            </h1>
            <ul className='flex items-center justify-center flex-wrap gap-1 w-full my-15 font-semibold'>
              {
                testArray.map((test, index) => (
                  <>
                    <li key={index} onClick={() => setInvestigationType(test.title)} style={{ color: `${test.color}` }} className='cursor-pointer'>{test.title}</li>
                    <li>|</li>
                  </>
                ))
              }
            </ul>
            <div className='flex sm:flex-row flex-col items-center sm:items-start w-full gap-10 mt-10 mb-2 pr-5'>
              <form onSubmit={handleSubmit} className='sm:w-1/2 w-full'>
                <h1 className='text-black text-2xl font-semibold mb-9'>{investigationType == 'Investigation Advised' ? 'Advice Investigation:' : (investigationType)} </h1>
                <h1 className='mb-5'>Select from the Dropdown</h1>
                <MultiSelectInput Options={investigationArray} selectedOptions={selectedInvestigationOptions} setSelectedOptions={setSelectedInvestigationOptions} />
                <div className='flex flex-col items-center'>
                  <button className="bg-blue-500 transition-all duration-300 cursor-pointer hover:bg-blue-600 px-5 py-2 rounded-lg mt-3 text-white">Add</button>
                </div>
                <div className='bg-white w-full h-64 overflow-y-auto mt-5 pt-2 rounded-md border border-gray-300'>
                  <h3 className='text-blue-500 text-xl mb-2 text-center font-bold'>{investigationType} Added</h3>
                  {
                    testInfo?.map((test, index) => (
                      <div className='py-2 px-3 flex justify-between'>
                        <p>{index+1}. {test}</p>
                          <Trash onClick={()=>deleteTest(test,id)} className='text-red-500 cursor-pointer'/>
                      </div>
                    ))
                  }
                </div>
              </form>
              <div className='sm:w-1/2 w-full'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-black text-xl font-semibold mb-4'>Recent List</h1>
                  <MdAssignmentAdd onClick={() => setAddInvestigationModalIsOpen(true)} size={30} className='text-blue-500 cursor-pointer' />
                </div>
                <div className='flex flex-col items-center h-[500px] overflow-y-auto gap-1 bg-gray-200 border rounded-2xl pt-3 mt-5'>
                  {investigationAdvised.map((investigation, index) => (
                    <>
                      <h1 className='text-xl p-1' key={index}>{investigation?.inputData}</h1>
                      <hr className='border-none h-[0.5px] w-full bg-gray-300' />
                    </>
                  ))}
                </div>
              </div>
            </div>
            <button className="bg-blue-500 block mx-auto transition duration-300 text-xl cursor-pointer hover:bg-blue-600 px-15 py-4 rounded-lg mt-8 text-white">Generate</button>
          </div>
        </div>
      </div>
      {isAddInvestigationModalOpen && <InvestigationModal type={investigationType} submit setSubmit={setSubmit} onClose={() => setAddInvestigationModalIsOpen(false)} />}
    </div>
  )
}

export default Investigation