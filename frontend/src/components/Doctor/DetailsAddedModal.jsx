import ReactDOM from "react-dom";
import { FaCheck } from 'react-icons/fa';
import { RxCross2 } from 'react-icons/rx';

const DetailsAddedModal = ({ onClose }) => {
    return ReactDOM.createPortal(
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[50vh] max-w-[50vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className="text-blue-500 text-2xl md:text-4xl mb-10 flex items-center gap-4 justify-center text-center font-semibold">Details Added <div className='bg-blue-500 text-white rounded-full flex items-center justify-center p-2'><FaCheck size={20} /></div></h1>
                <p className='text-center text-lg'>Now you can a generate a certificate.</p>
            </div>
        </div>,
    document.getElementById("modal-root")
    )
}

export default DetailsAddedModal