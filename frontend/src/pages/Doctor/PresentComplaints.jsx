import { useState } from 'react'
import WritingModal from '../../components/Doctor/WritingModal'
import { useNavigate, useParams } from 'react-router-dom'
import { FaAngleDoubleLeft, FaPen, FaRegKeyboard } from 'react-icons/fa'


const PresentComplaints = () => {
    const [isWritingModalOpen, setWritingModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useParams();

    return (
        <div>
            <h1 className='text-xl sm:text-4xl text-center font-semibold my-10 text-[#337ab7]'>PRESENT COMPLAINTS</h1>
            <div className='flex my-20 items-center justify-center gap-10'>
                <button onClick={() => (navigate(`/scribble-pad/present-complaints/${location.id}`))} className='bg-blue-500 flex items-center gap-3 cursor-pointer font-semibold text-white hover:bg-blue-600 p-2 rounded-lg '>Scribble <FaPen size={20} /> </button>
                <button onClick={() => setWritingModalIsOpen(true)} className='bg-blue-500 flex items-center gap-3 cursor-pointer font-semibold text-white hover:bg-blue-600 p-2 rounded-lg '>Writing Pad <FaRegKeyboard size={20} /> </button>
            </div>
            {isWritingModalOpen && <WritingModal writeUpType={'present complaints'} onClose={() => setWritingModalIsOpen(false)} />}
        </div>
    )
}

export default PresentComplaints