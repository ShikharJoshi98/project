import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import AppointmentSidebar from '../../components/Doctor/AppointmentSidebar'
import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleDoubleLeft } from 'react-icons/fa';
import MultiSelectDropdown from '../../components/Doctor/MultiSelectInput';
import { MdAssignmentAdd } from 'react-icons/md';
import InvestigationModal from '../../components/Doctor/InvestigationModal';
import axios from 'axios';
import { DOC_API_URL } from '../../store/DocStore';

const investigationList = ['CBC', 'ESR', 'PS for MP'];
const ultrasonographyList = ['Abdomen', 'Pelvis', 'KUB'];
const dopplerStudiesList = ['Cartoid & Vertebral Study', 'Upper Limbs Arterial Flow : Right', 'Upper Limbs Arterial Flow : Left'];
const ObstetricsList = ['For gestational age / Dating Scan', 'For growth assesment, liquor, Position', 'For Foetal Weight & liquor'];
const SonographyList = ['3D SONOGRAPHY', '4D SONOGRAPHY'];
const sliceList = ['Brain - Plain', 'Brain - Plain & Contrast', 'Brain - Cerebral Angiography'];
const mriList = ['Brain - Plain SOS Contrast', 'Brain - Plain & Contrast', 'Brain - Dynamic Pituitary Study'];
// const testArray = [{title:'Investigation Advised',color:'blue',list:investigationList}, {title:'Ultra-Sonography',color:'red',list:ultrasonographyList}, {title:'Doppler Studies',color:'green',list:dopplerStudiesList}, {title:'Obstetrics(Pregnancy)',color:'orange',list:ObstetricsList}, {title:'Sonography',color:'black',list:SonographyList}, {title:'16 Slice C.T Scan',color:'brown',list:sliceList}, {title:'1.5 MRI Scan',color:'purple',list:mriList}];

const Investigation = () => {
  const location = useParams();
  const navigate = useNavigate();
  const [data,setData] = useState({
    "investigationList": [],
    "ultrasonographyList":[],
    "dopplerStudiesList": [],
    "ObstetricsList":[],
    "SonographyList":[],
    "sliceList":[],
    "mriList":[],
  });
  const [selectedInvestigationOptions, setSelectedInvestigationOptions] = useState([]);
  const [isAddInvestigationModalOpen, setAddInvestigationModalIsOpen] = useState(false);
  const [investigationType, setInvestigationType] = useState('Investigation Advised')
  const [listType, setListType] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const fetchInvesigation = async () => {
    const response = await axios.get(`${DOC_API_URL}/getInvestigationAdvised`)
    const {investigationAdvised,ultraSonography,dopplerStudies,obstetrics,sonography,ctScan,mriScan} = response.data.inv;

    setData({
      "investigationList": investigationAdvised,
      "ultrasonographyList":ultraSonography,
      "dopplerStudiesList": dopplerStudies,
      "ObstetricsList":obstetrics,
      "SonographyList":sonography,
      "sliceList":ctScan,
      "mriList":mriScan
    });

    setListType(investigationAdvised);
  }
  useEffect(()=>{
    fetchInvesigation();
  },[]);

  const testArray = [{title:'Investigation Advised',color:'blue',list:data?.investigationList}, {title:'Ultra-Sonography',color:'red',list:data?.ultrasonographyList}, {title:'Doppler Studies',color:'green',list:data?.dopplerStudiesList}, {title:'Obstetrics(Pregnancy)',color:'orange',list:data?.ObstetricsList}, {title:'Sonography',color:'black',list:data?.SonographyList}, {title:'16 Slice C.T Scan',color:'brown',list:data?.sliceList}, {title:'1.5 MRI Scan',color:'purple',list:data?.mriList}];


  return (
    <div>
      <Docnavbar />
      <div className="flex">
        <AppointmentSidebar />
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
          <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
            <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-5 text-[#337ab7]'>
              {investigationType}
            </h1>
            <ul className='flex items-center justify-center flex-wrap gap-1 w-full my-15 font-semibold'>
              {
                testArray.map((test, index) => (
                  <>
                    <li key={index} onClick={() => {setInvestigationType(test.title); setListType(test.list)}} style={{color:`${test.color}`}} className='cursor-pointer'>{test.title}</li>
                    <li>|</li>
                  </>
                ))
              }
            </ul>
            <div className='flex sm:flex-row flex-col items-center sm:items-start w-full gap-10 mt-10 mb-2 pr-5'>
              <form onSubmit={handleSubmit} className='sm:w-1/2 w-full'>
                <h1 className='text-black text-2xl font-semibold mb-9'>{investigationType=='Investigation Advised'?'Advice Investigation:':(investigationType)} </h1>
                <h1 className='mb-5'>Select from the Dropdown</h1>
                <MultiSelectDropdown Options={listType} selectedOptions={selectedInvestigationOptions} setSelectedOptions={setSelectedInvestigationOptions} />
                <div className='flex flex-col items-center'>
                  <button className="bg-blue-500 transition-all duration-300 cursor-pointer hover:bg-blue-600 px-5 py-2 rounded-lg mt-3 text-white">Add</button>
                </div>
              </form>
              <div className='sm:w-1/2 w-full'>
                <div className='flex items-center justify-between'>
                  <h1 className='text-black text-xl font-semibold mb-4'>Recent List</h1>
                  <MdAssignmentAdd onClick={() => setAddInvestigationModalIsOpen(true)} size={30} className='text-blue-500 cursor-pointer' />
                </div>
                <div className='flex flex-col items-center h-[500px] overflow-y-auto gap-1 bg-gray-200 border rounded-2xl pt-3 mt-5'>
                  {listType.map((investigation, index) => (
                    <>
                      <h1 className='text-xl p-1' key={index}>{investigation}</h1>
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
      {isAddInvestigationModalOpen && <InvestigationModal type={investigationType} list={listType} onClose={() => setAddInvestigationModalIsOpen(false)} />}
    </div>
  )
}

export default Investigation