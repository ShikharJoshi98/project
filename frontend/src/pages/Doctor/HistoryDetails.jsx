import { useEffect, useState } from 'react';
import { docStore } from '../../store/DocStore';
import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleDoubleLeft } from "react-icons/fa";
import History from './History';
import PresentComplaintModal from '../../components/Doctor/PresentComplaintModal';

const HistoryDetails = () => {
  const { getHistoryDetails,historyDetails, getPresentComplaint,PresentComplaintData } = docStore();
  const location = useParams();
  const [isHistoryModalOpen, setHistoryModalIsOpen] = useState(false);
  const [isPresentComplaintModalOpen, setPresentComplaintModalOpen] = useState(false);
  const [selectedData, setSelectedData] = useState(null);
  const [submit, setSubmit] = useState(false);
  const navigate = useNavigate();
  const selectInfo = (data) => {
      setSelectedData(data)
    }

  useEffect(() => {
    getHistoryDetails(location.id);
    getPresentComplaint(location.id);    
  }, [getHistoryDetails,getPresentComplaint,submit]);  
 
  return (
    <div className="bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 overflow-hidden min-h-screen w-full">
      <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
        <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
        <h1 className='text-xl sm:text-4xl text-center font-semibold mt-5 text-[#337ab7]'>HISTORY DETAILS</h1>
        <h3 className='text-base sm:text-2xl text-center  font-semibold mt-15 text-[#598fbd]'>Follow Up History</h3>
        <div className='flex flex-wrap gap-10 px-20 items-center mt-20'>
          {historyDetails?.map((data, index) =>
            <button key={index} onClick={() => { setHistoryModalIsOpen(true); selectInfo(data) }} className='p-2 bg-blue-500 cursor-pointer rounded-lg text-white'>{data?.date}</button>
            )}
        </div>
        <h3 className='text-base sm:text-2xl text-center font-semibold mt-15 text-[#598fbd]'>Present Complaints History</h3>
        <div className='flex flex-wrap gap-10 px-20 items-center mt-20'>
          {PresentComplaintData?.map((data, index) =>
              <button key={index} onClick={() => { setPresentComplaintModalOpen(true); selectInfo(data) }} className='p-2 bg-blue-500 cursor-pointer rounded-lg text-white'>{data?.date}</button>
            )}
        </div>
      </div>
      {isHistoryModalOpen && <History data={selectedData} setSelectedData={setSelectedData} setSubmit={setSubmit} onClose={() => setHistoryModalIsOpen(false)} />}
      {isPresentComplaintModalOpen && <PresentComplaintModal data={selectedData} setSelectedData={setSelectedData} setSubmit={setSubmit} onClose={() => setPresentComplaintModalOpen(false)} />}
    </div>
  )
}

export default HistoryDetails