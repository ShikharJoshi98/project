import axios from 'axios';
import React, { useEffect } from 'react'
import { DOC_API_URL, docStore } from '../../store/DocStore';
import { Trash2, X } from 'lucide-react';
import { useParams } from 'react-router-dom';

const History = ({ date, onClose }) => {

  const { getFollowUpImages, followUpImages, writeUp, getWriteUp } = docStore();
  const location = useParams();
 useEffect(() => {
     getFollowUpImages(location.id);
     getWriteUp(location.id);
 }, [getFollowUpImages, getWriteUp])
  
  const Images = followUpImages.filter((image) => image.date === date);
  const Texts = writeUp.filter((data) => data.date === date);
  console.log(Texts);

  async function deleteImage(id) {
    try {
      console.log("I got hit",id);
      await axios.delete(`${DOC_API_URL}/patient/${location.id}/followup-images/${id}`);
      
    } catch (error) {
      console.error("Delete request failed:", error.response?.data || error.message);
    }
  }
  async function deleteWriteUp(id) {
    try {
      console.log("I got hit",id);
      await axios.delete(`${DOC_API_URL}/patient/${location.id}/write-up-delete/${id}`);
      
    } catch (error) {
      console.error("Delete request failed:", error.response?.data || error.message);
    }
  }

  return (
    <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
      <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
        <button
          onClick={onClose}
          className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
        >
          <X size={24} />
        </button>
        <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">
          {date}
        </h1>
        <div className='flex flex-col items-center gap-5'>
        {
          Images.map((image, idx) => (
            <>
              <div className='flex  items-center gap-2'>
                <img src={image?.follow_string} className='w-[80vw] rounded-md h-[40vh] md:h-[85vh]  bg-white' alt="" key={idx} />
                <div title='delete' onClick={() => deleteImage(image?._id)} className='text-white bg-red-500 p-2 rounded-full cursor-pointer'><Trash2 /></div>
              </div>
            </>
          ))

        }
          {
            Texts.map((data, idx) => (
              <>
                <div className='flex  items-center gap-2'>
                  <h1 className='w-[80vw] rounded-md p-5  bg-white' key={idx} >{data.writeUp_value}</h1>
                  <div title='delete' onClick={() => deleteWriteUp(data?._id)} className='text-white bg-red-500 p-2 rounded-full cursor-pointer'><Trash2 /></div>
                </div>
              </>
            ))

          }
        </div>
      </div>

    </div>
  )
}

export default History