import axios from 'axios'
import React from 'react'
import { RxCross2 } from 'react-icons/rx'
import { DOC_API_URL } from '../../store/DocStore'
import { useParams } from 'react-router-dom'
import { CiTrash } from 'react-icons/ci'

const ImagesModal = ({ onClose, setImageData, imageData, setSubmit, heading }) => {
    const location = useParams();

    const deleteImage = async (id) => {
        if (heading === 'Case Images') {
            await axios.delete(`${DOC_API_URL}/patient/${location.id}/case-images/${id}`)
            const updatedImages = imageData?.images.filter(item => item?.id !== id);

            setImageData({
                ...imageData,
                images: updatedImages,
            });
            setSubmit(prev => !prev);
        }
        else {
            await axios.delete(`${DOC_API_URL}/patient/${location.id}/diagnosis-images/${id}`)
            const updatedImages = imageData?.images.filter(item => item?.id !== id);

            setImageData({
                ...imageData,
                images: updatedImages,
            });
            setSubmit(prev => !prev);
        }
    }
    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[99vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className="text-blue-500 text-2xl mb-6 text-center font-semibold">{heading}</h1>
                {imageData?.images?.map((image, index) =>
                    <div key={index} className='flex gap-2'>
                        <img src={image?.images} className='overflow-x-auto' alt="follow up image" />
                        <CiTrash size={25} onClick={() => deleteImage(image?.id)} />
                    </div>
                )}
            </div>
        </div>
    )
}

export default ImagesModal