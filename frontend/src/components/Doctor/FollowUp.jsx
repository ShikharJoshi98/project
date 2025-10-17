import { useState } from 'react'
import WritingModal from './WritingModal';
import { useNavigate, useParams } from 'react-router-dom';
import { CiKeyboard } from 'react-icons/ci';
import { FaPen } from 'react-icons/fa';

const FollowUp = () => {
    const navigate = useNavigate();
    const location = useParams();
    const [isWritingModalOpen, setWritingModalIsOpen] = useState(false);

    return (
        <div>
            <h1 className='text-xl sm:text-4xl text-center font-semibold my-10 text-[#337ab7]'>
                FOLLOW UP
            </h1>
            <div className='flex sm:flex-row flex-col my-20 items-center justify-center gap-10'>
                <button onClick={() => navigate(`/scribble-pad/follow-up/${location.id}`)} className='bg-blue-500 flex items-center gap-3 cursor-pointer text-lg font-semibold text-white hover:bg-blue-600 hover:scale-102 p-2 rounded-lg '>Scribble <FaPen size={20} /> </button>
                <button onClick={() => setWritingModalIsOpen(true)} className='bg-blue-500 flex items-center gap-3 cursor-pointer text-lg font-semibold text-white hover:bg-blue-600 hover:scale-102 p-2 rounded-lg '>Writing Pad <CiKeyboard size={20} /> </button>
            </div>
            <button onClick={() => navigate(`/appointment-details/${location.id}/history-details`)} className='block cursor-pointer text-lg font-semibold mx-auto py-2 px-4 rounded-md bg-blue-500 text-white'>Previous History Details</button>
            {isWritingModalOpen && <WritingModal writeUpType={'follow up'} onClose={() => setWritingModalIsOpen(false)} />}
        </div>
    )
}

export default FollowUp