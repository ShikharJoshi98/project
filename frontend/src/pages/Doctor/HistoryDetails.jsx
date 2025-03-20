import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import AppointmentSidebar from '../../components/Doctor/AppointmentSidebar'
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import History from './History';

const HistoryDetails = () => {
  const { getFollowUpImages, followUpImages, writeUp, getWriteUp } = docStore();
  const location = useParams();
  const [isHistoryModalOpen, setHistoryModalIsOpen] = useState(false);
  const [isSubmit, setSubmit] = useState(false);

  useEffect(() => {
    getFollowUpImages(location.id);
    getWriteUp(location.id);
  }, [getFollowUpImages, getWriteUp, isSubmit])



  return (
    <div>
      <Docnavbar />
      <div className="flex">
        <AppointmentSidebar />
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
          <div className="bg-[#e9ecef] w-auto p-5 mx-10 my-6 rounded-lg">
            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold mt-5 text-[#337ab7]'>
              HISTORY DETAILS
            </h1>
            <div className='flex flex-wrap gap-10 px-20 items-center mt-20'>
              {
                followUpImages.map((image, index) => (
                  <button onClick={()=>setHistoryModalIsOpen(true)} className='p-2 bg-blue-500 cursor-pointer rounded-lg text-white'>{image.date}</button>
                ))
              }
            </div>

          </div>

        </div>
      </div>
      {isHistoryModalOpen && <History onClose={() => setHistoryModalIsOpen(false)} />}

    </div>

  )
}

export default HistoryDetails