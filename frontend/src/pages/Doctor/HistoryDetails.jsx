import React, { useEffect, useState } from 'react'
import Docnavbar from '../../components/Doctor/DocNavbar'
import AppointmentSidebar from '../../components/Doctor/AppointmentSidebar'
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { Trash2 } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const HistoryDetails = () => {
  const { getFollowUpImages, followUpImages } = docStore();
  const location = useParams();
  const [isSubmit, setSubmit] = useState(false);

  console.log(followUpImages);
  useEffect(() => {
    getFollowUpImages(location.id);
  }, [getFollowUpImages,isSubmit])
  
  async function deleteImage(id) {
    try {
        await axios.delete(`${DOC_API_URL}/patient/${location.id}/followup-images/${id}`);
        setSubmit((prev) => !prev);
    } catch (error) {
        console.error("Delete request failed:", error.response?.data || error.message);
    }
}

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
            <div className='flex items-center gap-20 flex-wrap mt-10'>
                            {
                                followUpImages.map((image, idx) => (
                                    <div className='flex  items-center gap-2'>
                                        <img src={image?.follow_string} className='w-[80vw] rounded-md h-[40vh] md:h-[85vh]  bg-white' alt="" key={idx} />
                                        <div title='delete' onClick={async () => deleteImage(image?._id)} className='text-white bg-red-500 p-2 rounded-full cursor-pointer'><Trash2 /></div>
                                    </div>
                                ))

                            }
                        </div>

            </div>
            
          </div>
        </div>
        </div>
    
  )
}

export default HistoryDetails