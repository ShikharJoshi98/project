import { KeyboardIcon, Pen } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import AppointmentSidebar from "../../components/Doctor/AppointmentSidebar"
import Docnavbar from "../../components/Doctor/DocNavbar"
import ScribbleModal from '../../components/Doctor/ScribbleModal'
import WritingModal from '../../components/Doctor/WritingModal'


const PresentComplaints = () => {
    const [isScribbleModalOpen, setScribbleModalIsOpen] = useState(false);
    const [isWritingModalOpen, setWritingModalIsOpen] = useState(false);

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
    }, [isScribbleModalOpen, isWritingModalOpen]);
    return (
        <div>
            <Docnavbar />
            <div className="flex">
                <AppointmentSidebar />
                <div className="bg-opacity-50 backdrop-filter backdrop-blur-xl bg-gradient-to-br from-blue-300 via-blue-400 to-sky-700 min-h-screen w-full overflow-hidden">
                    <div className="bg-[#e9ecef] w-auto h-[80vh] p-5 mx-10 my-6 rounded-lg">
                            <h1 className='text-xl sm:text-3xl md:text-5xl text-center font-semibold my-10 text-[#337ab7]'>
                                PRESENT COMPLAINTS
                            </h1>
                            <div className='flex my-20 items-center justify-center gap-10'>
                                <button onClick={() => setScribbleModalIsOpen(true)} className='bg-blue-500 flex items-center gap-3 cursor-pointer text-lg font-semibold text-white hover:bg-blue-600 hover:scale-102 p-2 rounded-lg '>Scribble <Pen size={20} /> </button>
                                <button onClick={() => setWritingModalIsOpen(true)} className='bg-blue-500 flex items-center gap-3 cursor-pointer text-lg font-semibold text-white hover:bg-blue-600 hover:scale-102 p-2 rounded-lg '>Writing Pad <KeyboardIcon size={20} /> </button>
                            </div>
                            {isScribbleModalOpen && <ScribbleModal onClose={() => setScribbleModalIsOpen(false)} />}
                            {isWritingModalOpen && <WritingModal onClose={() => setWritingModalIsOpen(false)} />}                        
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PresentComplaints