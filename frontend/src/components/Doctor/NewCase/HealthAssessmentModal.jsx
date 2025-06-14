import { X } from 'lucide-react'
import ReactDOM from "react-dom";
import HealthAssessment from '../HealthAssessment'

const HealthAssessmentModal = ({ onClose }) => {
  return  ReactDOM.createPortal(
        <div className="bg-black/50 z-60 fixed inset-0 flex items-center justify-center p-4">
            <div className="bg-[#e9ecef] max-h-[90vh] max-w-[90vw] overflow-y-auto flex flex-col w-full  rounded-xl p-6 md:p-10 shadow-lg">
                <button
                    onClick={onClose}
                    className="place-self-end cursor-pointer transition-all duration-300 hover:text-white hover:bg-red-500 rounded-md p-1"
                ><X size={24} /></button>
                <HealthAssessment />

            </div>
        </div>,
        document.getElementById("modal-root")
    );
}

export default HealthAssessmentModal