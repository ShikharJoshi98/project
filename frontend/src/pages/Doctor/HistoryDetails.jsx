import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import AppointmentSidebar from '../../components/Doctor/AppointmentSidebar'
import { docStore } from '../../store/DocStore';
import { useNavigate, useParams } from 'react-router-dom';
import { FaAngleDoubleLeft } from "react-icons/fa";
import History from './History';

const HistoryDetails = () => {
  const { getFollowUpImages, followUpImages, writeUp, getWriteUp } = docStore();
  const location = useParams();
  const [isHistoryModalOpen, setHistoryModalIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [isSubmit, setSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getFollowUpImages(location.id);
    getWriteUp(location.id);
  }, [getFollowUpImages, getWriteUp, isSubmit])
  let combineArray = []
  writeUp?.forEach(item => {
    if (!combineArray[item?.date]) {
      combineArray[item.date] = {
        date:item?.date,
        followUps: [],
        writeUps: []
      }
    }
    combineArray[item?.date].writeUps.push(item?.writeUp_value)
  })
  followUpImages?.forEach(item => {
    if (!combineArray[item?.date]) {
      combineArray[item.date] = {
        date:item?.date,
        followUps: [],
        writeUps: []
      }
    }
    combineArray[item?.date].followUps.push(item?.follow_string)
  })
  const historyData = Object.values(combineArray).reverse();
  console.log(historyData);
  
  return (
    <div>
      <Docnavbar />
      <div className="flex">
        <AppointmentSidebar />
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
          <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
            <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-5 text-[#337ab7]'>
              HISTORY DETAILS
            </h1>
            <div className='flex flex-wrap gap-10 px-20 items-center mt-20'>
              {
                historyData?.map((data, index) =>
                  <button key={index} onClick={() => { setHistoryModalIsOpen(true); setSelectedDate(data?.date)}} className='p-2 bg-blue-500 cursor-pointer rounded-lg text-white'>{data?.date}</button>
                )
              }
            </div>
          </div>
        </div>
      </div>
      {isHistoryModalOpen && <History date={selectedDate} onClose={() => setHistoryModalIsOpen(false)} />}
    </div>
  )
}

export default HistoryDetails