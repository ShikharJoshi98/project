import { RxCross2 } from "react-icons/rx";


const ConfirmDeleteModal = ({ onClose, message, onConfirm }) => {

    return (
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[60vw] overflow-y-auto   flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button onClick={onClose} className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"><RxCross2 size={24} /></button>
                <h1 className="text-blue-500 text-2xl md:text-4xl mb-10 text-center font-semibold">{message}</h1>
                <div className="flex items-center justify-center text-lg gap-5">
                    <button onClick={() => { onConfirm(); onClose(); }} className="bg-blue-500 text-white border-2 border-white p-1 px-3 cursor-pointer rounded-md" >Yes</button>
                    <button onClick={() => { onClose(); }} className="bg-white p-1 px-3 cursor-pointer border border-black rounded-md" >No</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmDeleteModal;