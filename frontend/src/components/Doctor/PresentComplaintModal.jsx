import { Trash2, X } from 'lucide-react'
import { DOC_API_URL, docStore } from '../../store/DocStore'
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

const PresentComplaintModal = ({ date, onClose }) => {
    const { getPresentComplaintScribble, PresentComplaintScribble, getPresentComplaintWriteUp, PresentComplaintWriteUp } = docStore();
    const location = useParams();
    const [isSubmit, setSubmit] = useState(false);
    useEffect(() => {
        getPresentComplaintScribble(location.id);
        getPresentComplaintWriteUp(location.id);
    }, [getPresentComplaintScribble, getPresentComplaintWriteUp, isSubmit])
    const images = PresentComplaintScribble.filter((scribble) => scribble?.date === date);
    const text = PresentComplaintWriteUp.filter((data) => data?.date === date);

    async function deleteImage(id) {
    try {
      await axios.delete(`${DOC_API_URL}/patient/${location.id}/presentComplaint-images/${id}`);
      setSubmit(prev => !prev);
    } catch (error) {
      console.error("Delete request failed:", error.response?.data || error.message);
    }
  }
  async function deleteWriteUp(id) {
    try {
      await axios.delete(`${DOC_API_URL}/patient/${location.id}/presentComplaint-write-up-delete/${id}`);
      setSubmit(prev => !prev);
    } catch (error) {
      console.error("Delete request failed:", error.response?.data || error.message);
    }
    }
    
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[99vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                >
                    <X size={24} />
                </button>
                <h1 className="text-blue-500 text-2xl md:text-3xl mb-6 text-center font-semibold">{date}</h1>
                <div className='flex flex-col gap-5'>
                    {images.map((image, index) =>
                        <div key={index} className='flex gap-2'>
                            <img src={image?.follow_string} className='overflow-x-auto' alt="follow up image" />
                            <Trash2 onClick={() => deleteImage(image?._id)} />
                        </div>
                    )}
                    {text.map((data, index) =>
                        <div className='flex gap-2'>
                            <div key={index} className='p-3 bg-white w-full'>{data?.writeUp_value}</div>
                            <Trash2 onClick={() => deleteWriteUp(data?._id)} />
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default PresentComplaintModal