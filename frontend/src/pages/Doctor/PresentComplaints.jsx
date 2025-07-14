import { useState } from 'react'
import WritingModal from '../../components/Doctor/WritingModal'
import { useNavigate, useParams } from 'react-router-dom'
import { FaAngleDoubleLeft, FaPen, FaRegKeyboard } from 'react-icons/fa'


const PresentComplaints = () => {
    const [isWritingModalOpen, setWritingModalIsOpen] = useState(false);
    const navigate = useNavigate();
    const location = useParams();
    
    return (
        <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
            <div className="bg-[#e9ecef] w-auto h-[80vh] p-5 mx-10 my-6 rounded-lg">
                <h1 onClick={() => navigate(`/appointment-details/${location.id}`)} className='text-3xl cursor-pointer ml-10'><FaAngleDoubleLeft /></h1>
                <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold my-10 text-[#337ab7]'>
                    PRESENT COMPLAINTS
                </h1>
                <div className='flex my-20 items-center justify-center gap-10'>
                    <button onClick={() => (navigate(`/scribble-pad/present-complaints/${location.id}`))} className='bg-blue-500 flex items-center gap-3 cursor-pointer text-lg font-semibold text-white hover:bg-blue-600 hover:scale-102 p-2 rounded-lg '>Scribble <FaPen size={20} /> </button>
                    <button onClick={() => setWritingModalIsOpen(true)} className='bg-blue-500 flex items-center gap-3 cursor-pointer text-lg font-semibold text-white hover:bg-blue-600 hover:scale-102 p-2 rounded-lg '>Writing Pad <FaRegKeyboard size={20} /> </button>
                </div>
                {isWritingModalOpen && <WritingModal writeUpType={'present complaints'} onClose={() => setWritingModalIsOpen(false)} />}
            </div>
        </div>
    )
}

export default PresentComplaints