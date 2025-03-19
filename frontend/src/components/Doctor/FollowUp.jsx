import { KeyboardIcon, Pen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import ScribbleModal from './ScribbleModal';
import WritingModal from './WritingModal';
import axios from 'axios';
import { DOC_API_URL } from '../../store/DocStore';
import { useParams } from 'react-router-dom';

const FollowUp = () => {

    const location = useParams();
    const [isScribbleModalOpen, setScribbleModalIsOpen] = useState(false);
    const [isWritingModalOpen, setWritingModalIsOpen] = useState(false);
    const [followUpImages, setFollowUpImages] = useState([]);

    const fetchImageAPI = async () => {
        const response = await axios.get(`${DOC_API_URL}/get-follow-up-patient/${location.id}`)
        setFollowUpImages(response.data.followUpImages)
    }

    useEffect(()=>{
        fetchImageAPI();
    },[location.id]);


    useEffect(() => {
        const savedScribbleState = localStorage.getItem("modalScribbleState");
        const savedWritingState = localStorage.getItem("modalWritingState");
        if (savedScribbleState === "open") {
            setScribbleModalIsOpen(true);
        }
        if (savedWritingState === "open") {
            setWritingModalIsOpen(true);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("modalScribbleState", isScribbleModalOpen ? "open" : "closed");
        localStorage.setItem("modalWritingState", isWritingModalOpen ? "open" : "closed");
    }, [isScribbleModalOpen,isWritingModalOpen]);

    return (
        <div>
            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold my-10 text-[#337ab7]'>
                FOLLOW UP
            </h1>
            <div className='flex my-20 items-center justify-center gap-10'>
                <button onClick={()=>setScribbleModalIsOpen(true)} className='bg-blue-500 flex items-center gap-3 cursor-pointer text-lg font-semibold text-white hover:bg-blue-600 hover:scale-102 p-2 rounded-lg '>Scribble <Pen size={20} /> </button>
                <button onClick={()=>setWritingModalIsOpen(true)} className='bg-blue-500 flex items-center gap-3 cursor-pointer text-lg font-semibold text-white hover:bg-blue-600 hover:scale-102 p-2 rounded-lg '>Writing Pad <KeyboardIcon size={20} /> </button>
            </div>
            {isScribbleModalOpen && <ScribbleModal onClose={() => setScribbleModalIsOpen(false)} />}
            {isWritingModalOpen && <WritingModal onClose={() => setWritingModalIsOpen(false)} />}
            
            <div>
                {
                    followUpImages.length !== 0
                    ?
                    <div className='grid grid-cols-5 gap-5'>
                    {
                        followUpImages.map(value =>(
                            <img src={value.follow_string} alt="Follow-up Scribble" className="w-96 h-auto border"/>
                        ))
                    }
                    </div>
                    :
                    (<div className='flex justify-center'>
                        <p>No scribble saved yet.</p>

                    </div>
                    )
                }

            </div>

        </div>
    )
}

export default FollowUp